// Eén gedeeld "item"-model voor nieuws, verhalen én events. Alle drie zijn
// inhoudelijk verschillend (een nieuwsbericht heeft een exacte datum, een
// verhaal een eeuwenoude periode, een event soms een tijdstip), maar in de
// site-structuur zijn het hetzelfde: een kaart met een titel, een korte
// tekst, een locatie en een link naar meer — met een eigen kleur/label per
// soort. Door ze hier op één vorm te normaliseren kan overal dezelfde
// <ContentCard /> gebruikt worden, en kunnen de drie soorten ook gemixed
// getoond worden (bv. op een ondernemerspagina, of in het nieuws-blok op de
// homepage).

import type { CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { bepaalLocatie } from './locatie';
import { eersteAlinea } from './tekst';

// Kleine helper om het herhaalde "foto er, geoptimaliseerde versie ophalen;
// foto niet er, null" patroon niet op elke pagina opnieuw te moeten
// uitschrijven — gebruikt vóór nieuwsToItem/verhaalToItem/eventToItem.
export async function resolveFoto(
  foto: unknown,
  width = 640
): Promise<FeedItem['image']> {
  if (!foto) return null;
  const geoptimaliseerd = await getImage({ src: foto as any, width });
  return {
    src: geoptimaliseerd.src,
    width: geoptimaliseerd.attributes.width,
    height: geoptimaliseerd.attributes.height,
  };
}

export type FeedItem = {
  kind: 'nieuws' | 'verhaal' | 'event';
  kindLabel: string;
  accent: 'rose' | 'ochre' | 'green';
  href: string;
  title: string;
  excerpt: string | null;
  locationLabel: string | null;
  dateLabel: string | null;
  dateBlock: { day: string; month: string } | null;
  sortValue: number;
  // Optioneel, al geoptimaliseerd via getImage() door de aanroepende pagina
  // (image-verwerking is async, dus dat gebeurt niet hier). Foto is bewust
  // optioneel op alle drie de soorten — zonder foto valt ContentCard terug
  // op een kleurvlak met icoon.
  image: { src: string; width: number; height: number } | null;
};

// timeZone: 'Europe/Amsterdam' expliciet meegeven bij elke datumweergave in
// dit bestand — zonder dat leest een bouwserver die niet toevallig in
// Amsterdamse tijd draait (bv. UTC, zoals de meeste CI/build-omgevingen) een
// datum/tijd soms verkeerd af (zie ook src/components/EventDetails.astro).
function dagMaand(d: Date) {
  return {
    day: d.toLocaleDateString('nl-NL', { day: 'numeric', timeZone: 'Europe/Amsterdam' }),
    month: d.toLocaleDateString('nl-NL', { month: 'short', timeZone: 'Europe/Amsterdam' }).replace('.', ''),
  };
}

export function nieuwsToItem(
  entry: CollectionEntry<'nieuws'>,
  ondernemer: CollectionEntry<'ondernemers'> | null,
  image: FeedItem['image'] = null
): FeedItem {
  return {
    kind: 'nieuws',
    kindLabel: 'Nieuws',
    accent: 'rose',
    href: `${import.meta.env.BASE_URL}nieuws/${entry.slug}/`,
    title: entry.data.titel_nl,
    excerpt: eersteAlinea(entry.data.tekst_nl, 150),
    locationLabel: bepaalLocatie(entry.data, ondernemer),
    dateLabel: entry.data.datum.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam' }),
    // Geen dateBlock (het grote datumblokje) voor nieuws — dat is voorbehouden
    // aan events, zodat de twee visueel niet op elkaar lijken. Nieuws toont de
    // publicatiedatum als kleine tekst (zie ContentCard.astro).
    dateBlock: null,
    sortValue: entry.data.datum.valueOf(),
    image,
  };
}

export function verhaalToItem(
  entry: CollectionEntry<'verhalen'>,
  ondernemer: CollectionEntry<'ondernemers'> | null,
  image: FeedItem['image'] = null
): FeedItem {
  // Periode-label (bv. "1913 – nu") staat los van de sortering op huisnummer
  // die de verhalenpagina zelf doet — hier alleen het vaste label tonen.
  return {
    kind: 'verhaal',
    kindLabel: 'Verhaal',
    accent: 'ochre',
    href: `${import.meta.env.BASE_URL}verhalen/${entry.slug}/`,
    title: entry.data.titel_nl,
    excerpt: eersteAlinea(entry.data.tekst_nl, 150),
    locationLabel: bepaalLocatie(entry.data, ondernemer),
    dateLabel: entry.data.periode ?? null,
    dateBlock: null,
    sortValue: 0,
    image,
  };
}

export function eventToItem(
  entry: CollectionEntry<'events'>,
  nieuwsEntry: CollectionEntry<'nieuws'>,
  ondernemer: CollectionEntry<'ondernemers'> | null,
  image: FeedItem['image'] = null
): FeedItem {
  return {
    kind: 'event',
    kindLabel: 'Event',
    accent: 'green',
    // Een event heeft geen eigen pagina: de volledige uitleg staat in het
    // gekoppelde nieuwsartikel (gerelateerd_nieuwsbericht, verplicht in het
    // schema), dus een klik op het kaartje gaat daar altijd direct naartoe.
    href: `${import.meta.env.BASE_URL}nieuws/${nieuwsEntry.slug}/`,
    title: entry.data.titel_nl,
    excerpt: eersteAlinea(nieuwsEntry.data.tekst_nl, 150),
    locationLabel: entry.data.locatie ?? bepaalLocatie(entry.data, ondernemer),
    dateLabel: entry.data.datum.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam' }),
    dateBlock: dagMaand(entry.data.datum),
    sortValue: entry.data.datum.valueOf(),
    image,
  };
}
