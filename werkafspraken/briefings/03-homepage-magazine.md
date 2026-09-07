# Rozengracht 03 - Homepage als magazine

**Gesprekstitel:** `Rozengracht 03 - Homepage als magazine`
**Branch:** `topic/03-homepage-magazine` · **Werkmap:** `werk/03-homepage-magazine/`

## Doel

De homepage is nu een nieuwsoverzicht. Hij wordt een magazine-landing: een
gevuld beeld waar je in wil scrollen, met bereikbaarheid en evenementen als
korte highlights in plaats van als hoofdmoot.

## Wat er in de notities over gaat

> - Meer gevuld beeld beethovenstraat biz als voorbeeld https://www.beethovenstraat.nl/ dit gaat samen met het initiatief om Blog idee als landing te hebben op home ipv nieuws en updates aanpak. Nieuws en upadtes zijn dus de blogs.
> - Home wordt dus een blog (ondernemers pagina's niet in opnemen). (geen nieuwswebsite meer maar een blog)
> - Nieuw op de rozengracht (max half jaar) Panke, behind the pine, Kinderboekenwinkel.
> - Verberg de categorie niuew op de rozengracht als er geen nieuwe zijn
> - "Uitgelicht category" samenvatting per verhaal of ondernemers.
> - Sectie over "de bizz" toevoegen op home op groene deel "de bizz/de ondernemervereniging". zie ook homepage beethoven straat die hebben ook zon tekst
> - Altijd foto's, placeholder minder hard die is nu heel sterk van kleur

Uit het gesprek: bereikbaarheid en evenementen wel als highlight op de
homepage, de rest magazine.

## Opdracht

1. **Homepage wordt blog-landing.** Artikelen zijn de hoofdmoot. Ondernemers
   komen hier niet in als lijst; die hebben hun eigen pagina.
2. **Sectie "Nieuw op de Rozengracht"**, alleen zaken die er maximaal een
   half jaar zitten (nu: Panke, Behind the Pines, De Kinderboekwinkel). De
   sectie verdwijnt volledig zodra er niets nieuws is, dus geen lege kop en
   geen "geen nieuwe ondernemers"-tekst. Maak de half-jaargrens
   datum-gedreven, niet handmatig.
3. **Sectie "Uitgelicht"** met per item een korte samenvatting, of dat een
   verhaal/historie-artikel of een ondernemer is.
4. **Highlights bereikbaarheid en evenementen**: compact, doorklikkend naar
   de bereikbaarheidspagina en naar het nieuwsartikel bij het event. Niet
   dominant.
5. **Sectie over de BIZ** op het groene deel ("de BIZ / de
   ondernemersvereniging"), zoals beethovenstraat.nl dat heeft. De tekst
   komt van topic 07, de plaatsing is van jou.
6. **Gevuld beeld.** Altijd foto's bij items, en de zachtere placeholder van
   topic 01 waar een foto ontbreekt.

## Jouw bestanden

`src/pages/index.astro`, `src/pages/en/index.astro`,
`src/components/ContentCard.astro`, een nieuwe map
`src/components/home/` voor de secties, en `src/lib/items.ts`.

## Niet doen

De artikelen zelf schrijven of de rubrieken bepalen (topic 04). De
ondernemerspagina en de kaart (topic 05). De bereikbaarheidspagina zelf
(topic 06). De BIZ-tekst schrijven (topic 07).

## Oplevering voor Cléo

Twee voorbeeldontwerpen van de nieuwe homepage naast een screenshot van de
huidige, zodat het verschil zichtbaar is. Laat de secties met echte content
zien, niet met blindtekst.

## Afhankelijkheden

- Wacht op topic 01 (tokens, quote-lettertype, placeholder).
- BIZ-tekst van topic 07: zet er een duidelijk gemarkeerde tijdelijke tekst
  in en zet het verzoek in `CLAIMS.md`.
