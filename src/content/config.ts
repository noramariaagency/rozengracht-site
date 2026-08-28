import { defineCollection, reference, z } from 'astro:content';

const ondernemers = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // Verplicht
      naam: z.string(),
      categorie: z.enum([
        'eten-drinken',
        'winkels',
        'gezondheid-wellness',
        'diensten',
        'cultuur-vrije-tijd',
      ]),
      tekst_nl: z.string(),
      tekst_en: z.string(),
      // Optioneel: niet elke ondernemer heeft al een bevestigd huisnummer
      // (bv. net aangekondigd, adres nog niet definitief). Overal waar we
      // het adres tonen (kaartje, detailpagina, "Rozengracht X"-koppeling
      // vanuit nieuws/verhalen) vallen we netjes terug op "geen adres tonen"
      // in plaats van te verzinnen.
      huisnummer: z.string().optional(),
      // Foto's zijn bewust optioneel: veel ondernemers hebben nog geen
      // (goede) foto aangeleverd, en de site moet er ook zonder foto's al
      // goed uitzien zodat we niet op fotografie hoeven te wachten om live
      // te gaan. Waar een foto ontbreekt valt de site terug op een
      // categorie-icoon (zie FotoFallback.astro).
      fotos: z.array(image()).default([]),

      // Optioneel
      subcategorie: z.string().optional(),
      website: z.string().url().optional(),
      openingstijden: z
        .object({
          ma: z.string().optional(),
          di: z.string().optional(),
          wo: z.string().optional(),
          do: z.string().optional(),
          vr: z.string().optional(),
          za: z.string().optional(),
          zo: z.string().optional(),
        })
        .optional(),
      logo: image().optional(),
      oude_wp_url: z.string().optional(),
      // Datum waarop de ondernemer aan de Rozengracht is geopend — bepaalt de
      // volgorde in de homepage-sectie "Laatst geopend". Alleen invullen als
      // de datum echt bekend is; zonder deze datum valt de ondernemer terug
      // op de bestaande, handmatige volgorde.
      nieuw_sinds: z.coerce.date().optional(),
      // Kort citaat van de ondernemer zelf, getoond (samen met dat van andere
      // ondernemers) in de homepage-sectie "Ondernemers spreken". Eén zin,
      // in de eigen stem van de ondernemer — geen marketingtaal.
      quote_nl: z.string().optional(),
      // Engelse vertaling van quote_nl — alleen invullen als quote_nl ook is
      // ingevuld (de EN "Aan het woord"-sectie laat een ondernemer zonder
      // quote_en gewoon weg, net als NL dat doet zonder quote_nl).
      quote_en: z.string().optional(),
      meta_title_nl: z.string().optional(),
      meta_title_en: z.string().optional(),
      meta_description_nl: z.string().optional(),
      meta_description_en: z.string().optional(),

      // Intern (niet tonen op de site)
      status: z
        .enum(['klaar', 'deels-klaar', 'nog-te-doen', 'geen-interesse', 'overslaan'])
        .default('deels-klaar'),
      laatst_gecontroleerd: z.coerce.date().optional(),
      interne_opmerking: z.string().optional(),
    }),
});

const nieuws = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      titel_nl: z.string(),
      titel_en: z.string(),
      datum: z.coerce.date(),
      tekst_nl: z.string(),
      tekst_en: z.string(),
      // Elk nieuwsbericht hoort bij één categorie — "algemeen" (het
      // standaard nieuwsoverzicht) of "bereikbaarheid" (wegwerkzaamheden,
      // evenementen die de straat raken, etc.). Zo kan de
      // bereikbaarheidspagina hieruit filteren en alleen de meest actuele
      // bereikbaarheids-update tonen, terwijl /nieuws gewoon alles laat
      // zien — één contentmodel i.p.v. een apart, met de hand bijgehouden
      // lijstje ernaast.
      categorie: z.enum(['algemeen', 'bereikbaarheid']).default('algemeen'),
      // Einddatum, alleen relevant voor tijdelijke berichten (vooral
      // categorie "bereikbaarheid", bv. wegwerkzaamheden met een bekend
      // einde). Ontbreekt "tot", dan blijft het bericht als "actueel"
      // gelden totdat iemand een einddatum toevoegt of het bericht
      // verwijdert. Is "tot" wel bekend en inmiddels verstreken, dan
      // verdwijnt het bericht automatisch uit de "meest actuele
      // bereikbaarheids-update" op de bereikbaarheidspagina (het blijft wel
      // gewoon terug te vinden op /nieuws).
      tot: z.coerce.date().optional(),
      // Koppeling naar een ondernemer, zodat we op de ondernemerspagina kunnen
      // laten zien welk nieuws bij hen hoort. reference() valideert bij het
      // builden dat de opgegeven ondernemer-slug ook echt bestaat.
      gerelateerde_ondernemer: reference('ondernemers').optional(),
      // Losse locatie-vermelding (bv. "Rozengracht 45") voor artikelen die nog
      // geen eigen ondernemerspagina hebben. Zodra gerelateerde_ondernemer is
      // ingevuld, wint dat altijd — het adres komt dan automatisch van de
      // ondernemer zelf, zodat het nooit uit de pas kan lopen. Zie
      // src/lib/locatie.ts.
      locatie: z.string().optional(),
      // Foto is optioneel, net als bij ondernemers — zonder foto valt de
      // kaart terug op een kleurvlak met icoon (zie ContentCard.astro).
      foto: image().optional(),
      // Focuspunt voor de uitgesneden kaartfoto (object-position), bv.
      // "center 80%" om meer van de onderkant te tonen — alleen nodig als de
      // standaard centrale uitsnede (zie ContentCard.astro) het belangrijkste
      // deel van de foto wegsnijdt.
      fotoFocus: z.string().optional(),
    }),
});

const verhalen = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      titel_nl: z.string(),
      titel_en: z.string(),
      tekst_nl: z.string(),
      tekst_en: z.string(),
      // Zelfde koppeling als bij nieuws: een verhaal over een pand kan horen
      // bij de ondernemer die er nu in zit (bv. Rozentheater-verhaal <-> Boom Chicago-pagina).
      gerelateerde_ondernemer: reference('ondernemers').optional(),
      locatie: z.string().optional(),
      // Korte periode-aanduiding (bv. "1658–1669", "1913–nu") — geeft het
      // verhalenoverzicht een tijdlijn-achtige structuur i.p.v. een kale grid.
      periode: z.string().optional(),
      foto: image().optional(),
      // Focuspunt voor de uitgesneden kaartfoto (object-position), bv.
      // "center 80%" om meer van de onderkant te tonen — alleen nodig als de
      // standaard centrale uitsnede (zie ContentCard.astro) het belangrijkste
      // deel van de foto wegsnijdt.
      fotoFocus: z.string().optional(),
    }),
});

const events = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      titel_nl: z.string(),
      titel_en: z.string(),
      // Eén datum (dagevenement) of een periode (vanaf/tot, bv. een markt-
      // weekend). "Binnenkort" vs. "Terugblik" op de homepage wordt hieruit
      // afgeleid — net als bij de bereikbaarheidsupdates dus geen handmatige
      // "is dit al geweest"-vlag die kan gaan afwijken van de werkelijkheid.
      datum: z.coerce.date(),
      datum_tot: z.coerce.date().optional(),
      locatie: z.string().optional(),
      gerelateerde_ondernemer: reference('ondernemers').optional(),
      // Verplicht (niet optioneel): een event heeft zelf geen uitgebreide
      // tekst meer (zie hierboven, geen tekst_nl). De volledige uitleg over
      // een event staat altijd in een nieuwsartikel; dit veld koppelt het
      // event daaraan, en het event-kaartje linkt altijd door naar dat
      // artikel (zie eventToItem in src/lib/items.ts). Zo bestaat er nooit
      // twee plekken met detailinformatie over hetzelfde event.
      gerelateerd_nieuwsbericht: reference('nieuws'),
      foto: image().optional(),
      // Focuspunt voor de uitgesneden kaartfoto (object-position), bv.
      // "center 80%" om meer van de onderkant te tonen — alleen nodig als de
      // standaard centrale uitsnede (zie ContentCard.astro) het belangrijkste
      // deel van de foto wegsnijdt.
      fotoFocus: z.string().optional(),
    }),
});

export const collections = { ondernemers, nieuws, verhalen, events };
