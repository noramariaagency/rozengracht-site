import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.derozengracht.com',
  // Geen base: de site draait vanaf de root op Cloudflare (eerst op het
  // .workers.dev-adres, later op www.derozengracht.com). Het subpad hoorde bij
  // GitHub Pages, waar de site onder /rozengracht-site/ stond.
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
