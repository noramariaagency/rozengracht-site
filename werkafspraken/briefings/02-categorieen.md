# Rozengracht 02 - Categorieën en labels ondernemers

**Gesprekstitel:** `Rozengracht 02 - Categorieen en labels ondernemers`
**Branch:** `topic/02-categorieen` · **Werkmap:** `werk/02-categorieen/`

## Doel

Een categorie-indeling die fijnmaziger is dan de huidige vijf, maar geen
honderd hokjes wordt. Cléo vraagt expliciet om een tegenvoorstel.

## Wat er in de notities over gaat

> Categorieen moeten met meer detail. hieronder waar we aan hadden gedacht
> maar doe ons een voorstel wat duidelikk is meer detail heeft en toen niet
> 100.000 categorieen (dubbel label mag bij twijfel)

De volledige voorzet van Cléo en Nora staat in
`../RUWE-NOTITIES-CLEO-2026-09-07.md`. Lees die letterlijk; er zitten
bewuste keuzes in (bijvoorbeeld: to-go valt onder eten dat je níet ter
plaatse opeet, en uitgaan bundelt restaurant, theater, bar, café en club).

## Huidige situatie

Vijf categorieën in `src/lib/categorieen.ts`: eten-drinken, winkels,
gezondheid-wellness, diensten, cultuur-vrije-tijd. Elke ondernemer heeft
`categorie` plus een vrij tekstveld `subcategorie`. 104 ondernemersmappen in
`src/content/ondernemers/`.

## Opdracht

1. Inventariseer wat er feitelijk op de Rozengracht zit: loop de 104
   ondernemers langs met hun huidige `categorie` en `subcategorie`. Dat is de
   werkelijke verdeling waar het schema op moet passen.
2. Maak het voorstel in `werkafspraken/voorstellen/categorieen.md`: de
   categorieën, wat er wel en niet in valt, en waar je afwijkt van de voorzet
   met de reden erbij. Houd het aantal beheersbaar en werk met een tweede
   label voor twijfelgevallen, in plaats van met een extra categorie.
3. Denk het filter mee: dit schema wordt de filterbalk op de
   ondernemerspagina (topic 05). Een categorie waarop niemand ooit filtert,
   is een categorie te veel.
4. Na goedkeuring: de velden `categorie` en `subcategorie` in alle
   ondernemersbestanden bijwerken, gericht per veld, met een script.

## Jouw bestanden

`werkafspraken/voorstellen/categorieen.md` (nieuw), en in
`src/content/ondernemers/*/index.md` **uitsluitend** de velden `categorie` en
`subcategorie`. Niets anders in die bestanden, niet herformatteren: topic 08
zit gelijktijdig in het veld `fotos` van dezelfde bestanden.

## Niet doen

Het schema zelf in `config.ts` of `categorieen.ts` zetten, dat doet topic 01.
De filter-UI bouwen, dat doet topic 05.

## Oplevering voor Cléo

Het voorstel op papier, met per categorie een paar echte Rozengracht-zaken
als voorbeeld, en een lijstje twijfelgevallen met de vraag hoe zij het ziet.

## Afhankelijkheden

- De definitieve ondernemerslijst komt van Cléo. Begin op de huidige 104 en
  reken erop dat er nog zaken bij of af gaan.
