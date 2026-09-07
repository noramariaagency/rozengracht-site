# Rozengracht 06 - Bereikbaarheidspagina

**Gesprekstitel:** `Rozengracht 06 - Bereikbaarheidspagina`
**Branch:** `topic/06-bereikbaarheid` · **Werkmap:** `werk/06-bereikbaarheid/`

## Doel

Deze pagina is belangrijk zolang de wegwerkzaamheden duren. Hij moet er
duidelijker uitzien en meteen bruikbaar zijn zonder scrollen.

## Wat er in de notities over gaat

> - Donkergroene achtergrond voor bereikbaarheid pagina.
> - Tegels met fiets/auto/ov duidelijker maken dat het clikcbaar is en iets kleiner zodat de kaart deels boven de fold valt.
> - Kaart onder op de bereikbaarheid pagina.

Uit het gesprek: bereikbaarheid blijft wel als highlight op de homepage staan
(dat bouwt topic 03).

## Opdracht

1. **Donkergroene achtergrond** voor de pagina. Let op leesbaarheid: tekst en
   links moeten voldoende contrast houden, ook de routebeschrijvingen.
2. **Tegels fiets/auto/ov kleiner en duidelijk klikbaar.** Nu ziet niemand
   dat het knoppen zijn. Ze mogen ook compacter, zodat de kaart deels boven
   de fold komt.
3. **Kaart onderaan de pagina**, maar wel zo dat je hem net ziet beginnen
   zonder te scrollen. Dat is precies waarom de tegels kleiner moeten.
4. Check de bestaande route- en plaatsdata (`bereikbaarheid-routes.json`,
   `bereikbaarheid-places.json`) nog op actualiteit: er rijdt twee jaar geen
   tram over de Rozengracht en er zijn parkeerplaatsen verdwenen.

## Jouw bestanden

`src/pages/bereikbaarheid.astro`, `src/pages/en/bereikbaarheid.astro`,
`src/components/BereikbaarheidKaart.astro`,
`src/data/bereikbaarheid-places.json`, `src/data/bereikbaarheid-routes.json`,
`src/lib/locatie.ts`.

## Niet doen

De bereikbaarheid-highlight op de homepage (topic 03). `src/data/places.json`
aanraken: dat bestand wordt automatisch bijgewerkt door een workflow.

## Oplevering voor Cléo

Een voorbeeldontwerp van de pagina op donkergroen, met de kleinere klikbare
tegels en de kaart net in beeld. Laat zien hoe het er op mobiel uitziet: daar
is "boven de fold" het lastigst.

## Afhankelijkheden

- Wacht op topic 01 (het donkergroen en de contrastregels horen in de tokens).
