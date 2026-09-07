# Rozengracht 05 - Ondernemersoverzicht en kaart

**Gesprekstitel:** `Rozengracht 05 - Ondernemersoverzicht en kaart`
**Branch:** `topic/05-ondernemers-en-kaart` · **Werkmap:** `werk/05-ondernemers-en-kaart/`

## Doel

De ondernemerspagina is de plek waar de straat compleet staat. Nu is het een
lijst met een kaart; het moet een pagina worden waar je in wil rondkijken.

## Wat er in de notities over gaat

> - Kaart op ondernemers pagina "gezellig maken", kaart op groene achtergrond sectie zetten links boven kaart 1/2 breedte, daarnaast filters en alvast beginnen met de eerste ondernemers kaartjes.
> - Definitieve lijst van ondernemers.  gaat van cleo komen
> - Home wordt dus een blog (ondernemers pagina's niet in opnemen).

## Opdracht

1. **Kaart gezelliger.** Nu is het een functionele kaart. Hij moet warmer
   worden en bij de huisstijl passen: kaartstijl, pinnen, hover, het gevoel
   van een straat in plaats van een dataset.
2. **Nieuwe indeling bovenaan.** De kaart in een sectie met groene
   achtergrond, linksboven, op halve breedte. Daarnaast de filters. En direct
   daaronder al de eerste ondernemerskaartjes, zodat je onder de fold meteen
   ziet dat er meer is en niet eerst een lege pagina met alleen een kaart
   ziet.
3. **Filters op het nieuwe categorieschema** uit topic 02. Bouw de filterbalk
   zo dat een categorie erbij of eraf geen herbouw vraagt, want het schema
   staat nog niet vast.
4. **Ondernemerskaartjes** altijd met foto, en met de zachtere placeholder
   van topic 01 waar een foto ontbreekt.
5. **Losse ondernemerspagina's**: kijk of de detailpagina meegaat in de
   magazine-lijn (citaat in het nieuwe quote-lettertype, beeldgebruik).

## Jouw bestanden

`src/pages/ondernemers/index.astro`, `src/pages/en/ondernemers/index.astro`,
`src/pages/ondernemers/[...slug].astro`,
`src/pages/en/ondernemers/[...slug].astro`,
`src/components/OndernemersKaart.astro`, `src/components/OndernemerKaart.astro`.

## Niet doen

Ondernemersteksten of foto's wijzigen (topic 08 en 00). Het categorieschema
bepalen (topic 02). De ondernemers op de homepage zetten: die horen daar
juist niet.

## Oplevering voor Cléo

Een voorbeeldontwerp van het bovenste deel van de pagina (groene sectie,
kaart halve breedte, filters ernaast, eerste kaartjes eronder), plus een
voorbeeld van hoe de kaart er "gezellig" uitziet tegenover de huidige.

## Afhankelijkheden

- Wacht op topic 01.
- Filters wachten op het categorievoorstel uit topic 02; bouw op de huidige
  vijf categorieën en houd het uitwisselbaar.
- De definitieve ondernemerslijst komt van Cléo.
