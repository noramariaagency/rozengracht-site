// Haalt voor elke ondernemer met een huisnummer de locatie + openingstijden
// op via de Places API (New) Text Search, en schrijft het resultaat naar
// src/data/places.json. Ververst daarnaast ook een kleine vaste lijst
// bereikbaarheids-POI's (parkeergarage, tramhaltes, Dam als startpunt van
// de wandelroute) naar src/data/bereikbaarheid-places.json — zelfde API,
// zelfde reden om dit hier te doen i.p.v. in de gewone build (zie
// hieronder). Dit script draait NIET tijdens de normale build (die blijft
// snel en heeft geen live Google-afhankelijkheid) maar alleen via de
// aparte "Places verversen" GitHub Action (handmatig of periodiek), zodat
// de kosten voorspelbaar blijven en een gewone content-only build nooit
// een externe API nodig heeft.
//
// Vereist: env var GOOGLE_PLACES_API_KEY (alleen server-side, nooit in de
// client-bundel — zie de restricted key in Google Cloud Console).

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

// Hart van de Rozengracht — gebruikt als locationBias voor de
// bereikbaarheid-POI's hieronder, zodat een naamgelijke plek elders in
// Amsterdam (bv. een andere Marnixstraat-tramhalte) niet per ongeluk wordt
// gepakt.
const ROZENGRACHT_CENTRUM = { latitude: 52.3735, longitude: 4.8815 };

// Vaste, kleine lijst — geen ondernemer, dus los van de map hierboven.
// Namen/adressen zijn vooraf handmatig geverifieerd (Q-Park-website +
// Google Maps) zodat de zoekopdracht zelf al zo precies mogelijk is; de
// locationBias hierboven is de tweede vangrail. "dam-amsterdam" is geen
// bereikbaarheids-POI met een eigen pin, maar het startpunt van de
// wandelroute op het "Lopend"-kaartje (zie BereikbaarheidKaart.astro) —
// zelfde bron, dus hier meegenomen i.p.v. een handmatig getranscribeerd
// coördinaat.
const BEREIKBAARHEID_POIS = [
  { key: 'parkeergarage-marnix', query: 'Q-Park Europarking, Marnixstraat 250, Amsterdam' },
  { key: 'tram-westermarkt', query: 'Tramhalte Westermarkt, Amsterdam' },
  { key: 'tram-marnixstraat', query: 'Tramhalte Marnixstraat/Rozengracht, Amsterdam' },
  { key: 'dam-amsterdam', query: 'Dam, Amsterdam' },
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

  const resultaat = { ...bestaand };
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

  await writeFile(BEREIKBAARHEID_OUTPUT_PATH, JSON.stringify(resultaat, null, 2) + '\n', 'utf-8');
  console.log(`Bereikbaarheid: ${opgehaald} opgehaald, ${mislukt} mislukt.`);
}

async function main() {
  await verversOndernemers();
  await verversBereikbaarheid();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
