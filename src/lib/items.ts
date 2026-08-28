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
import { getRelativeLocaleUrl } from 'astro:i18n';
import { bepaalLocatie } from './locatie';
import { eersteAlinea } from './tekst';
import type { Lang } from './i18n';

// Kleine helper om het herhaalde "foto er, geoptimaliseerde versie ophalen;
// foto niet er, null" patroon niet op elke pagina opnieuw te moeten
// uitschrijven — gebruikt vóór nieuwsToItem/verhaalToItem/eventToItem.
export async function resolveFoto(
  foto: unknown,
  width = 640,
  // Optioneel focuspunt (bv. "center 80%"), rechtstreeks doorgezet als
  // CSS object-position op de uitgesneden kaartfoto in ContentCard.astro.
  // Alleen nodig wanneer de standaard centrale uitsnede het belangrijkste
  // deel van de foto wegsnijdt (zie fotoFocus in content/config.ts) — een
  // situatie die vaker voorkomt bij hoge/liggende bronfoto's die in een
  // bredere kaartverhouding worden uitgesneden.
  focus?: string | null
): Promise<FeedItem['image']> {
  if (!foto) return null;
  const geoptimaliseerd = await getImage({ src: foto as any, width });
  return {
    src: geoptimaliseerd.src,
    width: geoptimaliseerd.attributes.width,
    height: geoptimaliseerd.attributes.height,
    focus: focus ?? null,
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
  image: { src: string; width: number; height: number; focus: string | null } | null;
};

const KIND_LABELS: Record<Lang, { nieuws: string; verhaal: string; event: string }> = {
  nl: { nieuws: 'Nieuws', verhaal: 'Verhaal', event: 'Event' },
  en: { nieuws: 'News', verhaal: 'Story', event: 'Event' },
};

// timeZone: 'Europe/Amsterdam' expliciet meegeven bij elke datumweergave in
// dit bestand — zonder dat leest een bouwserver die niet toevallig in
// Amsterdamse tijd draait (bv. UTC, zoals de meeste CI/build-omgevingen) een
// datum/tijd soms verkeerd af (zie ook src/components/EventDetails.astro).
function dagMaand(d: Date, lang: Lang) {
  const locale = lang === 'en' ? 'en-GB' : 'nl-NL';
  return {
    day: d.toLocaleDateString(locale, { day: 'numeric', timeZone: 'Europe/Amsterdam' }),
    month: d.toLocaleDateString(locale, { month: 'short', timeZone: 'Europe/Amsterdam' }).replace('.', ''),
  };
}

function langDateLabel(d: Date, lang: Lang) {
  const locale = lang === 'en' ? 'en-GB' : 'nl-NL';
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam' });
}

export function nieuwsToItem(
  entry: CollectionEntry<'nieuws'>,
  ondernemer: CollectionEntry<'ondernemers'> | null,
  image: FeedItem['image'] = null,
  lang: Lang = 'nl'
): FeedItem {
  return {
    kind: 'nieuws',
    kindLabel: KIND_LABELS[lang].nieuws,
    accent: 'rose',
    href: getRelativeLocaleUrl(lang, `nieuws/${entry.slug}/`),
    title: lang === 'en' ? entry.data.titel_en : entry.data.titel_nl,
    excerpt: eersteAlinea(lang === 'en' ? entry.data.tekst_en : entry.data.tekst_nl, 150),
    locationLabel: bepaalLocatie(entry.data, ondernemer),
    dateLabel: langDateLabel(entry.data.datum, lang),
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
  image: FeedItem['image'] = null,
  lang: Lang = 'nl'
): FeedItem {
  // Periode-label (bv. "1913 – nu") staat los van de sortering op huisnummer
  // die de verhalenpagina zelf doet — hier alleen het vaste label tonen.
  return {
    kind: 'verhaal',
    kindLabel: KIND_LABELS[lang].verhaal,
    accent: 'ochre',
    href: getRelativeLocaleUrl(lang, `verhalen/${entry.slug}/`),
    title: lang === 'en' ? entry.data.titel_en : entry.data.titel_nl,
    excerpt: eersteAlinea(lang === 'en' ? entry.data.tekst_en : entry.data.tekst_nl, 150),
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
  image: FeedItem['image'] = null,
  lang: Lang = 'nl'
): FeedItem {
  return {
    kind: 'event',
    kindLabel: KIND_LABELS[lang].event,
    accent: 'green',
    // Een event heeft geen eigen pagina: de volledige uitleg staat in het
    // gekoppelde nieuwsartikel (gerelateerd_nieuwsbericht, verplicht in het
    // schema), dus een klik op het kaartje gaat daar altijd direct naartoe.
    href: getRelativeLocaleUrl(lang, `nieuws/${nieuwsEntry.slug}/`),
    title: lang === 'en' ? entry.data.titel_en : entry.data.titel_nl,
    excerpt: eersteAlinea(lang === 'en' ? nieuwsEntry.data.tekst_en : nieuwsEntry.data.tekst_nl, 150),
    locationLabel: entry.data.locatie ?? bepaalLocatie(entry.data, ondernemer),
    dateLabel: langDateLabel(entry.data.datum, lang),
    dateBlock: dagMaand(entry.data.datum, lang),
    sortValue: entry.data.datum.valueOf(),
    image,
  };
}
