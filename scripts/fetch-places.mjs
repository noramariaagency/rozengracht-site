// Haalt voor elke ondernemer met een huisnummer de locatie + openingstijden
// op via de Places API (New) Text Search, en schrijft het resultaat naar
// src/data/places.json. Ververst daarnaast ook een kleine vaste lijst
// bereikbaarheids-POI's (parkeergarage, tramhaltes, Dam als startpunt van
// de wandelroute) naar src/data/bereikbaarheid-places.json, plus alle
// tram- en bushaltes binnen 100m van de twee bekende Rozengracht-haltes via
// een Nearby Search, en de twee route-lijnen (wandelroute Dam->Rozengracht,
// looproute parkeergarage->Rozengracht) via de Directions API naar
// src/data/bereikbaarheid-routes.json — zelfde soort API, zelfde reden om
// dit hier te doen i.p.v. in de gewone build (zie hieronder).
//
// De routes komen bewust uit de Directions API i.p.v. een handmatige keten
// van los opgezochte plekken: een paar named places op een rij zetten geeft
// alleen een paar rechte stukken die dwars door blokken/grachten snijden
// zodra de straat zelf bocht (precies wat er eerst gebeurde). De Directions
// API kent het echte stratenpatroon en levert een polyline die wél de weg
// volgt — nog steeds één keer opgehaald bij het verversen, dus geen live
// Google-afhankelijkheid in de normale pageload.
//
// Dit script draait NIET tijdens de normale build (die blijft snel en
// heeft geen live Google-afhankelijkheid) maar alleen via de aparte
// "Places verversen" GitHub Action (handmatig of periodiek), zodat de
// kosten voorspelbaar blijven en een gewone content-only build nooit een
// externe API nodig heeft.
//
// Vereist: env var GOOGLE_PLACES_API_KEY (alleen server-side, nooit in de
// client-bundel — zie de restricted key in Google Cloud Console). Moet
// zowel de Places API (New) als de Directions API mogen aanroepen.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error('GOOGLE_PLACES_API_KEY ontbreekt — script gestopt.');
  process.exit(1);
}

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const ONDERNEMERS_DIR = path.join(ROOT, 'src/content/ondernemers');
const OUTPUT_PATH = path.join(ROOT, 'src/data/places.json');
const BEREIKBAARHEID_OUTPUT_PATH = path.join(ROOT, 'src/data/bereikbaarheid-places.json');
const BEREIKBAARHEID_ROUTES_OUTPUT_PATH = path.join(ROOT, 'src/data/bereikbaarheid-routes.json');

// Hart van de Rozengracht — gebruikt als locationBias voor de
// bereikbaarheid-POI's hieronder, zodat een naamgelijke plek elders in
// Amsterdam (bv. een andere Marnixstraat-tramhalte) niet per ongeluk wordt
// gepakt.
const ROZENGRACHT_CENTRUM = { latitude: 52.3735, longitude: 4.8815 };

// Straal (in meter) waarbinnen een tram- of bushalte nog als "bij de
// Rozengracht" telt voor de OV-kaart — zie de Nearby Search hieronder.
const OV_HALTE_STRAAL = 100;

// Vaste, kleine lijst — geen ondernemer, dus los van de map hierboven.
// Namen/adressen zijn vooraf handmatig geverifieerd (Q-Park-website +
// Google Maps) zodat de zoekopdracht zelf al zo precies mogelijk is; de
// locationBias hierboven is de tweede vangrail.
//
// "dam-amsterdam" en "rozengracht-straat" zijn geen bereikbaarheids-POI's
// met een eigen pin, maar start-/eindpunten voor de twee route-lijnen
// hieronder (BEREIKBAARHEID_ROUTES) — de Directions API tekent de route
// daartussen, dus hier is alleen het eind van de keten nodig, geen losse
// tussenpunten meer.
const BEREIKBAARHEID_POIS = [
  { key: 'parkeergarage-marnix', query: 'Q-Park Europarking, Marnixstraat 250, Amsterdam' },
  { key: 'tram-westermarkt', query: 'Tramhalte Westermarkt, Amsterdam' },
  { key: 'tram-marnixstraat', query: 'Tramhalte Marnixstraat/Rozengracht, Amsterdam' },
  { key: 'dam-amsterdam', query: 'Dam, Amsterdam' },
  { key: 'rozengracht-straat', query: 'Rozengracht, Amsterdam' },
];

// Route-lijnen die via de Directions API (modus "walking" voor allebei —
// ook de autoroute is een looproute van garage naar straat, geen
// rijroute) opgehaald worden, met vanKey/naarKey wijzend naar de
// hierboven opgehaalde punten. "auto" verwijst hier naar de filter-
// categorie op de bereikbaarheidspagina, niet naar het vervoersmiddel van
// de route zelf.
const BEREIKBAARHEID_ROUTES = [
  { key: 'lopend', vanKey: 'dam-amsterdam', naarKey: 'rozengracht-straat' },
  { key: 'auto', vanKey: 'parkeergarage-marnix', naarKey: 'rozengracht-straat' },
];

// Google's dag-index (0 = zondag ... 6 = zaterdag) naar onze eigen ma..zo-sleutels
// (zelfde sleutels als het bestaande handmatige openingstijden-veld in
// content/config.ts, zodat de pagina-template beide door dezelfde lus kan
// renderen).
const DAG_KEYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

function tijd(h, m) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function periodesNaarUren(periods) {
  if (!periods || periods.length === 0) return null;
  const perDag = {};
  for (const p of periods) {
    if (!p.open) continue;
    const key = DAG_KEYS[p.open.day];
    const open = tijd(p.open.hour ?? 0, p.open.minute ?? 0);
    const close = p.close ? tijd(p.close.hour ?? 0, p.close.minute ?? 0) : '24:00';
    const stuk = `${open}-${close}`;
    perDag[key] = perDag[key] ? `${perDag[key]}, ${stuk}` : stuk;
  }
  return Object.keys(perDag).length > 0 ? perDag : null;
}

async function zoekPlaats(query, locationBias) {
  const body = { textQuery: query, languageCode: 'nl' };
  if (locationBias) {
    body.locationBias = { circle: { center: locationBias, radius: 800 } };
  }
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.location,places.regularOpeningHours,places.displayName',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const body2 = await res.text();
    throw new Error(`Places API ${res.status}: ${body2.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.places?.[0] ?? null;
}

// Nearby Search i.p.v. Text Search: hiermee vragen we Google letterlijk
// "welke halte-achtige plekken liggen er binnen X meter van dit punt" i.p.v.
// zelf te moeten raden welke tram/bushaltes er allemaal in de buurt zijn.
// Dat is de enige manier om "alle haltes binnen 100m" te tonen zonder ze
// met de hand te verzinnen of te missen.
async function zoekDichtbij(center, straal, types) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.location,places.displayName,places.types',
    },
    body: JSON.stringify({
      includedTypes: types,
      maxResultCount: 20,
      locationRestriction: { circle: { center, radius: straal } },
    }),
  });
  if (!res.ok) {
    const body2 = await res.text();
    throw new Error(`Places API (nearby) ${res.status}: ${body2.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.places ?? [];
}

// Decodeert Google's "encoded polyline"-formaat (zoals geretourneerd door
// de Directions API) naar een gewone lijst {lat,lng}-punten. Standaard
// algoritme (zie Google's polyline-documentatie) — geen library nodig voor
// zoiets kleins en dit voorkomt weer een extra dependency in een script dat
// toch al maar één keer per "Places verversen"-run draait.
function decodeerPolyline(encoded) {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const punten = [];
  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    punten.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return punten;
}

// Haalt de echte, over-het-stratennet lopende route tussen twee punten op
// via de Directions API — in tegenstelling tot Places, retourneert deze
// legacy API status/foutmeldingen altijd met HTTP 200 (de fout zit in het
// "status"-veld, bv. "REQUEST_DENIED" of "ZERO_RESULTS"), dus die wordt
// hier expliciet gecontroleerd i.p.v. alleen op res.ok te vertrouwen.
async function haalRoute(van, naar, modus) {
  const url = new URL('https://maps.googleapis.com/maps/api/directions/json');
  url.searchParams.set('origin', `${van.lat},${van.lng}`);
  url.searchParams.set('destination', `${naar.lat},${naar.lng}`);
  url.searchParams.set('mode', modus);
  url.searchParams.set('key', API_KEY);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Directions API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const data = await res.json();
  if (data.status !== 'OK') {
    throw new Error(`Directions API status ${data.status}: ${data.error_message ?? '(geen foutmelding)'}`);
  }
  const polyline = data.routes?.[0]?.overview_polyline?.points;
  if (!polyline) return null;
  return decodeerPolyline(polyline);
}

async function verversOndernemers() {
  const slugs = await readdir(ONDERNEMERS_DIR, { withFileTypes: true });
  let bestaand = {};
  try {
    bestaand = JSON.parse(await readFile(OUTPUT_PATH, 'utf-8'));
  } catch {
    // nog geen bestand — start leeg
  }

  const resultaat = { ...bestaand };
  let opgehaald = 0;
  let overgeslagenGeenAdres = 0;
  let mislukt = 0;

  for (const dirent of slugs) {
    if (!dirent.isDirectory()) continue;
    const slug = dirent.name;
    const indexPad = path.join(ONDERNEMERS_DIR, slug, 'index.md');
    let front;
    try {
      const ruw = await readFile(indexPad, 'utf-8');
      front = matter(ruw).data;
    } catch {
      continue; // geen index.md, geen ondernemer-map
    }

    if (!front.huisnummer) {
      overgeslagenGeenAdres++;
      continue;
    }

    const query = `${front.naam}, Rozengracht ${front.huisnummer}, Amsterdam`;
    try {
      const plek = await zoekPlaats(query);
      if (!plek) {
        console.warn(`  geen resultaat voor "${query}"`);
        mislukt++;
        continue;
      }
      resultaat[slug] = {
        placeId: plek.id,
        lat: plek.location?.latitude ?? null,
        lng: plek.location?.longitude ?? null,
        hoursByDay: periodesNaarUren(plek.regularOpeningHours?.periods),
        fetchedAt: new Date().toISOString(),
      };
      opgehaald++;
      console.log(`  ok: ${slug}`);
    } catch (err) {
      console.warn(`  mislukt voor "${query}": ${err.message}`);
      mislukt++;
    }

    // kleine pauze om de API niet te bruuskeren
    await new Promise((r) => setTimeout(r, 150));
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(resultaat, null, 2) + '\n', 'utf-8');
  console.log(
    `\nOndernemers: ${opgehaald} opgehaald, ${overgeslagenGeenAdres} overgeslagen (geen huisnummer), ${mislukt} mislukt.`
  );
}

async function verversBereikbaarheid() {
  let bestaand = {};
  try {
    bestaand = JSON.parse(await readFile(BEREIKBAARHEID_OUTPUT_PATH, 'utf-8'));
  } catch {
    // nog geen bestand — start leeg
  }

  // Alle vorige "ov-"-sleutels (dynamisch gevonden tram/bushaltes) eerst
  // weggooien i.p.v. samenvoegen: als een halte inmiddels is verdwenen of
  // verplaatst, moet 'ie ook uit de site verdwijnen i.p.v. voor altijd te
  // blijven hangen als "laatst bekende stand".
  const resultaat = {};
  for (const [key, waarde] of Object.entries(bestaand)) {
    if (!key.startsWith('ov-')) resultaat[key] = waarde;
  }

  let opgehaald = 0;
  let mislukt = 0;

  for (const poi of BEREIKBAARHEID_POIS) {
    try {
      const plek = await zoekPlaats(poi.query, ROZENGRACHT_CENTRUM);
      if (!plek) {
        console.warn(`  geen resultaat voor "${poi.query}"`);
        mislukt++;
        continue;
      }
      resultaat[poi.key] = {
        placeId: plek.id,
        naamGevonden: plek.displayName?.text ?? null,
        lat: plek.location?.latitude ?? null,
        lng: plek.location?.longitude ?? null,
        fetchedAt: new Date().toISOString(),
      };
      opgehaald++;
      console.log(`  ok: ${poi.key} -> ${plek.displayName?.text ?? '(geen naam)'}`);
    } catch (err) {
      console.warn(`  mislukt voor "${poi.query}": ${err.message}`);
      mislukt++;
    }

    await new Promise((r) => setTimeout(r, 150));
  }

  // Alle tram- en bushaltes binnen OV_HALTE_STRAAL meter van de twee
  // bekende Rozengracht-tramhaltes — dat zijn de twee plekken waar
  // Rozengracht een kruising heeft en dus waar haltes normaal clusteren.
  // Eén cirkel rond het midden van de straat zou een straat van ~800m
  // lang niet dekken; dit dekt in elk geval beide uiteinden echt.
  const ankerpunten = ['tram-westermarkt', 'tram-marnixstraat']
    .map((key) => resultaat[key])
    .filter((plek) => plek && plek.lat != null && plek.lng != null);

  const bekendeIds = new Set(
    BEREIKBAARHEID_POIS.map((poi) => resultaat[poi.key]?.placeId).filter(Boolean)
  );
  const gevondenOvIds = new Set();
  let ovOpgehaald = 0;

  for (const anker of ankerpunten) {
    try {
      const plekken = await zoekDichtbij(
        { latitude: anker.lat, longitude: anker.lng },
        OV_HALTE_STRAAL,
        ['bus_stop', 'tram_stop']
      );
      for (const plek of plekken) {
        if (!plek.id || bekendeIds.has(plek.id) || gevondenOvIds.has(plek.id)) continue;
        if (plek.location?.latitude == null || plek.location?.longitude == null) continue;
        gevondenOvIds.add(plek.id);
        // Sleutel op basis van het Google place-ID (niet op naam): zo krijgt
        // dezelfde halte bij een volgende run weer dezelfde sleutel i.p.v.
        // een nieuwe naast de oude te worden.
        const key = `ov-${plek.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16)}`;
        resultaat[key] = {
          placeId: plek.id,
          naamGevonden: plek.displayName?.text ?? null,
          lat: plek.location.latitude,
          lng: plek.location.longitude,
          vervoerswijze: 'ov',
          types: plek.types ?? [],
          fetchedAt: new Date().toISOString(),
        };
        ovOpgehaald++;
        console.log(`  ok: ${key} -> ${plek.displayName?.text ?? '(geen naam)'}`);
      }
    } catch (err) {
      console.warn(`  mislukt voor haltes rond ${anker.naamGevonden ?? '?'}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  await writeFile(BEREIKBAARHEID_OUTPUT_PATH, JSON.stringify(resultaat, null, 2) + '\n', 'utf-8');
  console.log(
    `Bereikbaarheid: ${opgehaald} opgehaald, ${mislukt} mislukt, ${ovOpgehaald} tram/bushalte(s) binnen ${OV_HALTE_STRAAL}m gevonden.`
  );
  return resultaat;
}

// Haalt de twee route-lijnen op (zie BEREIKBAARHEID_ROUTES hierboven) en
// schrijft ze naar een apart bestand — andere vorm dan de POI's hierboven
// (een lijst punten i.p.v. één placeId/lat/lng), dus een eigen bestand i.p.v.
// erbij in bereikbaarheid-places.json. bereikbaarheidResultaat bevat de net
// (in verversBereikbaarheid) opgehaalde/bestaande POI's, zodat van-/naarKey
// altijd de meest actuele coördinaten gebruiken. Mislukt een route (bv. API
// niet ingeschakeld, quota), dan blijft de vorige versie van die ene route
// gewoon staan i.p.v. dat de hele kaart zonder routes komt te zitten.
async function verversRoutes(bereikbaarheidResultaat) {
  let bestaand = {};
  try {
    bestaand = JSON.parse(await readFile(BEREIKBAARHEID_ROUTES_OUTPUT_PATH, 'utf-8'));
  } catch {
    // nog geen bestand — start leeg
  }

  const resultaat = { ...bestaand };
  let opgehaald = 0;
  let mislukt = 0;

  for (const route of BEREIKBAARHEID_ROUTES) {
    const van = bereikbaarheidResultaat[route.vanKey];
    const naar = bereikbaarheidResultaat[route.naarKey];
    if (!van || van.lat == null || !naar || naar.lat == null) {
      console.warn(`  route "${route.key}": van/naar-punt nog onbekend, overgeslagen`);
      mislukt++;
      continue;
    }
    try {
      const punten = await haalRoute(van, naar, 'walking');
      if (!punten || punten.length < 2) {
        console.warn(`  route "${route.key}": geen bruikbare polyline in het antwoord`);
        mislukt++;
        continue;
      }
      resultaat[route.key] = punten;
      opgehaald++;
      console.log(`  ok: route "${route.key}" (${punten.length} punten)`);
    } catch (err) {
      console.warn(`  mislukt voor route "${route.key}": ${err.message}`);
      mislukt++;
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  await writeFile(BEREIKBAARHEID_ROUTES_OUTPUT_PATH, JSON.stringify(resultaat, null, 2) + '\n', 'utf-8');
  console.log(`Routes: ${opgehaald} opgehaald, ${mislukt} mislukt.`);
  return resultaat;
}

async function main() {
  await verversOndernemers();
  const bereikbaarheidResultaat = await verversBereikbaarheid();
  await verversRoutes(bereikbaarheidResultaat);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
