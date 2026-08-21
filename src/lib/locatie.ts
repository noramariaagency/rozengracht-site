import type { CollectionEntry } from 'astro:content';

/**
 * Bepaalt de locatietekst voor een nieuws- of verhaal-artikel.
 *
 * Is er een gerelateerde ondernemer gekoppeld? Dan komt het adres altijd
 * daarvandaan (Rozengracht + huisnummer van de ondernemer) — dat adres kan
 * dan nooit uit de pas lopen met de ondernemerspagina zelf. Alleen als er
 * geen koppeling is, gebruiken we het losse `locatie`-veld op het artikel
 * (voor bedrijven die nog geen eigen ondernemerspagina hebben).
 *
 * `ondernemer` moet al opgehaald zijn door de aanroepende pagina (via
 * getEntry) — deze functie doet zelf geen content-lookup, om dubbel werk te
 * voorkomen.
 */
export function bepaalLocatie(
  data: { locatie?: string },
  ondernemer: CollectionEntry<'ondernemers'> | null
): string | null {
  // Een gekoppelde ondernemer zonder (nog) bevestigd huisnummer levert geen
  // adres op — dan valt dit terug op het losse `locatie`-veld van het
  // artikel zelf, net als wanneer er helemaal geen koppeling is.
  if (ondernemer?.data.huisnummer) return `Rozengracht ${ondernemer.data.huisnummer}`;
  if (data.locatie) return data.locatie;
  return null;
}
