// Haalt voor elke ondernemer met een huisnummer de locatie + openingstijden
// op via de Places API (New) Text Search, en schrijft het resultaat naar
// src/data/places.json. Dit script draait NIET tijdens de normale build
// (die blijft snel en heeft geen live Google-afhankelijkheid) maar alleen
// via de aparte "Places verversen" GitHub Action (handmatig of periodiek),
// zodat de kosten voorspelbaar blijven en een gewone content-only build
// nooit een externe API nodig heeft.
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

async function zoekPlaats(query) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.location,places.regularOpeningHours,places.displayName',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'nl' }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places API ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.places?.[0] ?? null;
}

async function main() {
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
    `\nKlaar: ${opgehaald} opgehaald, ${overgeslagenGeenAdres} overgeslagen (geen huisnummer), ${mislukt} mislukt.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
