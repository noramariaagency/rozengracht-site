import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.derozengracht.com',
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
