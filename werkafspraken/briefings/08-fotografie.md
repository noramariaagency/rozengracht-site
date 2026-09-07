# Rozengracht 08 - Fotografie en beeldpijplijn

**Gesprekstitel:** `Rozengracht 08 - Fotografie en beeldpijplijn`
**Branch:** `topic/08-fotografie` · **Werkmap:** `werk/08-fotografie/`

## Doel

"Altijd foto's" is de kern van het magazine-idee. Er staat beeld op de Drive
en in Lightroom, maar niet geordend per ondernemer. Dat moet een werkende
pijplijn worden, niet een eenmalige zoektocht.

## Wat er in de notities over gaat

> - Foto's op drive, uitzoeken pe rondernemer. (ook uit lightroom) alles gaan organiseren)
> - Foto's per ondernemer, Interieur, mensen, producten, GEEN exterieur. Liefste NM foto's van lightroom eerst gebruiken. Drive is er met fotos van de fotograaf (oude ondernemers die er niet meer zitten archiveren).
> - Altijd foto's, placeholder minder hard die is nu heel sterk van kleur

## Opdracht

1. **Inventariseren.** Wat staat er op de Drive, wat staat er in Lightroom,
   en welke ondernemer hoort bij welke map of shoot? Leg dat vast in
   `werkafspraken/voorstellen/fotobeleid.md` als werkbare koppeling, niet als
   losse aantekening.
2. **Selectieregels.** Interieur, mensen en producten. **Geen exterieur.**
   Nora Maria-foto's uit Lightroom hebben voorrang boven het materiaal van de
   fotograaf op de Drive. Leg ook vast hoeveel foto's een ondernemerspagina
   idealiter heeft en in welke volgorde.
3. **Archiveren.** Ondernemers die er niet meer zitten gaan naar het archief,
   niet in de actieve set. Bepaal wat "archiveren" hier concreet betekent
   (map, status, of van de site af) en leg dat aan Cléo voor.
4. **Doorvoeren.** Foto's plaatsen in `src/content/ondernemers/<slug>/` en
   uitsluitend het veld `fotos` in de frontmatter bijwerken. Optimaliseer
   formaat en gewicht; 104 pagina's met zware foto's maakt de site traag.
5. **Rechten.** In `te-controleren-met-cleo.md` staat een lijst zaken waar
   bewust géén foto is gebruikt (geen bron, of herkenbare mensen zonder
   aantoonbare toestemming). Die lijn blijft: geen beeld van derden en geen
   herkenbare personen zonder toestemming.

## Jouw bestanden

`src/content/ondernemers/*/foto_*.jpg`, in
`src/content/ondernemers/*/index.md` **uitsluitend** het veld `fotos`,
`src/content/nieuws/*/foto_*.jpg`, en
`werkafspraken/voorstellen/fotobeleid.md`.

Let op: topic 02 zit gelijktijdig in de velden `categorie` en `subcategorie`
van dezelfde bestanden. Raak die niet aan en herformatteer de frontmatter
niet.

## Niet doen

Teksten, categorieën, of paginaontwerp. Alleen beeld en de velden die
daarbij horen.

## Oplevering voor Cléo

Het fotobeleid op papier, plus drie afgemaakte ondernemerspagina's als
voorbeeld van hoe het eruitziet als het beeld op orde is. En de lijst
ondernemers waarvoor nog geen bruikbaar beeld bestaat, met de vraag of er een
shoot nodig is.

## Afhankelijkheden

- Wacht op topic 01 voor de nieuwe placeholder, maar het inventariseren en
  ordenen van de Drive kan direct beginnen.
- Toegang tot de juiste Drive-mappen en Lightroom-export: bij Nora en Cléo
  navragen.
- De definitieve ondernemerslijst bepaalt wie er archief in gaat.
