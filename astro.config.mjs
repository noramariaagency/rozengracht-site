import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.derozengracht.com',
  // PREVIEW-FASE: www.derozengracht.com wijst nog niet naar deze build (de
  // domeinoverdracht is een latere, losse stap) — tot die tijd is de site
  // alleen te bekijken op noramariaagency.github.io/rozengracht-site/, een
  // subpad. Zonder deze base zouden alle absolute paden (CSS, afbeeldingen,
  // links) naar de root van het domein wijzen i.p.v. naar dat subpad, en zo
  // stuk gaan. Verwijder deze regel (of zet 'm op '/') zodra het echte domein
  // is aangesloten.
  base: '/rozengracht-site',
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
