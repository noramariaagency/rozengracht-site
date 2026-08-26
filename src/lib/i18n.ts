// Kleine, gedeelde i18n-helpers. De taalconfiguratie zelf (locales,
// standaardtaal, wel/geen prefix) staat in astro.config.mjs — dit bestand
// bouwt daarbovenop verder waar Astro's eigen astro:i18n-module niet in
// voorziet (met name: "geef me het pad van de HUIDIGE pagina in de andere
// taal", voor de taalwissel-knop en de hreflang-tags).

export type Lang = 'nl' | 'en';

/**
 * Haalt het "kale" pad van een URL af, zonder site-base en zonder eventueel
 * /en/-voorvoegsel — bv. "/en/nieuws/foo/" -> "nieuws/foo/", "/nieuws/foo/"
 * -> "nieuws/foo/". Gebruikt om vanuit de huidige pagina (Astro.url.pathname)
 * de bijbehorende URL in de andere taal op te bouwen.
 */
export function kaalPad(pathname: string, base: string): string {
  let rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\/+/, '');
  if (rest === 'en' || rest.startsWith('en/')) {
    rest = rest.slice(2).replace(/^\/+/, '');
  }
  return rest;
}
