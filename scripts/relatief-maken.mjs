// Herschrijft root-relatieve links/assets ("/pad") in de statische build naar
// echt relatieve paden ("../pad/index.html"), zodat de export ook direct
// vanaf schijf (file://) te bekijken is, zonder lokale server.
//
// Alleen voor een handmatige preview-export — de live site (straks via
// Cloudflare Pages) heeft dit niet nodig, root-relatieve paden werken daar
// gewoon.

import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function walkHtml(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtml(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolveTarget(url) {
  // url begint met '/'
  let p = url;
  if (p.endsWith('/')) p = p.slice(0, -1);
  if (p === '') return 'index.html';
  const last = p.split('/').pop();
  const heeftExtensie = last.includes('.');
  return heeftExtensie ? p.slice(1) : p.slice(1) + '/index.html';
}

function maakRelatief(url, depth) {
  const target = resolveTarget(url);
  const prefix = depth > 0 ? '../'.repeat(depth) : './';
  return prefix + target;
}

// Chrome (en de meeste andere browsers) blokkeerden hier ooit alle
// client-scripts op file:// via een CORS-achtige beperking op
// <script type="module">. Astro hoist standaard-scripts naar precies zo'n
// module-script — daarom draaien alle interactieve scripts in dit project nu
// bewust als <script is:inline> (zie Nav.astro, index.astro,
// ondernemers/index.astro): geen gehoist bestand, dus geen CORS-blokkade, en
// dus werkt alles (filters, scroll-reveal, de scroll-transitie, het
// mobiele menu) ook in deze losse preview-export gewoon echt — geen
// CSS-noodoplossing meer nodig.
const files = walkHtml(distDir);
let vervangingen = 0;

for (const file of files) {
  const relFromDist = path.relative(distDir, file);
  const depth = relFromDist.split(path.sep).length - 1;
  let html = fs.readFileSync(file, 'utf8');

  // href="/..." en src="/..." in de HTML zelf (niet in //externe-urls).
  html = html.replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (match, attr, url) => {
    vervangingen++;
    return `${attr}="${maakRelatief(url, depth)}"`;
  });

  // De JSON-island met ondernemersdata (foto-veld) — geen HTML-attribuut,
  // dus apart afvangen.
  html = html.replace(/"foto":"(\/_astro\/[^"]*)"/g, (match, url) => {
    vervangingen++;
    return `"foto":"${maakRelatief(url, depth)}"`;
  });

  fs.writeFileSync(file, html);
}

console.log(`Klaar: ${files.length} HTML-bestanden verwerkt, ${vervangingen} root-relatieve verwijzingen omgezet.`);
