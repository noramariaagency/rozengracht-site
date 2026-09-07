# Rozengracht 01 - Fundament: huisstijl, navigatie en datamodel

**Gesprekstitel (gebruik exact deze):** `Rozengracht 01 - Fundament: huisstijl, navigatie en datamodel`
**Branch:** `topic/01-fundament` · **Werkmap:** `werk/01-fundament/`
**Bijzonder:** dit topic gaat als eerste en **alleen**. Alle andere topics
wachten tot dit gemerged is op `main`.

## Doel

De gedeelde laag in één keer goed zetten, zodat de zeven topics daarna
parallel kunnen werken zonder ooit nog aan dezelfde bestanden te zitten.

## Wat er in de notities over gaat

> - Ander lettertyp voor de quotes
> - Altijd foto's, placeholder minder hard die is nu heel sterk van kleur
> - "Verhalen" wordt "Historie"
> - Meer gevuld beeld beethovenstraat biz als voorbeeld https://www.beethovenstraat.nl/

## Opdracht

1. **Quote-lettertype.** Een tweede lettertype specifiek voor citaten, dat
   naast de huidige huisstijl staat. Leg twee varianten voor aan Cléo.
2. **Fotoplaceholder verzachten.** `FotoFallback.astro` is nu veel te sterk
   van kleur. Zachter, rustiger, mag niet met de echte foto's concurreren.
3. **Verhalen wordt Historie.** Routes `/verhalen/` → `/historie/` en
   `/en/verhalen/` → `/en/historie/`, plus navigatie, labels, en een redirect
   van de oude URL's. De inhoud van de verhalen zelf blijft van topic 04.
4. **Categorieschema implementeren** in `config.ts` en `categorieen.ts`,
   zodra Cléo het voorstel van topic 02 heeft goedgekeurd. Ondersteun een
   tweede label per ondernemer (Cléo: "dubbel label mag bij twijfel").
5. **Ruimte maken voor het magazine-beeld.** Kijk naar
   beethovenstraat.nl en zet de tokens (kleuren, typografie, ritme,
   witruimte, kaartformaten) klaar die topic 03 en 05 nodig hebben. Niet zelf
   de homepage bouwen, dat is 03.
6. **Cookiebanner-haak** in `BaseLayout.astro` klaarzetten; de teksten en de
   pagina's zelf zijn van topic 07.

## Jouw bestanden

Zie `EIGENAARSCHAP.md` onder 01. Kort: `global.css`, `BaseLayout.astro`,
`Nav.astro`, `Footer.astro`, `FotoFallback.astro`, `config.ts`,
`categorieen.ts`, `i18n.ts`, de verhalen/historie-routes, `public/`.

## Niet doen

Homepage, ondernemerspagina's, bereikbaarheid, contact, content. Alleen de
gedeelde laag. Hoe kleiner deze PR, hoe sneller de rest kan starten.

## Oplevering voor Cléo

Eén voorbeeldpagina die de nieuwe tokens toont: koppen, bodytekst, een
citaat in het nieuwe quote-lettertype, een kaartje met foto, een kaartje met
de nieuwe zachte placeholder, en de groene sectie. Twee varianten voor het
quote-lettertype.

## Afhankelijkheden

- Punt 4 wacht op het goedgekeurde categorievoorstel uit topic 02.
  Blokkeert dat te lang? Lever 01 dan zonder punt 4 op en doe het schema in
  een tweede kleine PR.
