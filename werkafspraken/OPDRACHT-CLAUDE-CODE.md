# De opdracht voor Claude Code

Start Claude Code in de **projectmap**, niet in `site/`:

```bash
cd ~/Documents/Claude/Projects/Rozengracht\ website
claude
```

Waarom de projectmap: de worktrees komen in `werk/` te staan, naast `site/`.
Start je in `site/`, dan vallen die buiten het bereik van de sessie en moet je
steeds toestemming geven om een map omhoog te gaan.

Plak daarna de prompt hieronder. Eén sessie doet de vier codetopics
achter elkaar, elk in zijn eigen worktree en zijn eigen PR.

---

```
Je werkt aan de Rozengracht-website. Lees eerst CLAUDE.md hier, dan
site/CLAUDE.md, dan site/werkafspraken/00-WERKWIJZE.md,
site/werkafspraken/EIGENAARSCHAP.md en site/werkafspraken/CLAIMS.md. Die
werkafspraken zijn bindend: er werken ook gesprekken in Cowork aan deze site,
dus je raakt alleen bestanden aan die van jouw huidige topic zijn.

Jij doet de vier codetopics, in deze volgorde en één voor één:

  1. 01-fundament            (moet eerst en alleen, de rest bouwt hierop)
  2. 03-homepage-magazine
  3. 05-ondernemers-en-kaart
  4. 06-bereikbaarheid

Werkwijze per topic, steeds hetzelfde rondje:

  a. ./site/scripts/werkgesprek.sh start <topic>
  b. Lees site/werkafspraken/briefings/<topic>.md en werk uitsluitend in
     werk/<topic>/.
  c. Zet jezelf in CLAIMS.md op 'bezig', in een eigen kleine commit.
  d. Start de dev-server in die worktree (npm run dev) en geef mij de
     localhost-URL, zodat ik kan meekijken terwijl je bouwt. Dit is
     belangrijk: dit werk is grotendeels kijkwerk, dus laat het me zien in
     plaats van het te beschrijven.
  e. Bouw het uit in kleine commits met leesbare Nederlandse
     commitberichten.
  f. ./site/scripts/werkgesprek.sh publiceer <topic>, en open dan de PR naar
     main met: wat er wijzigt per punt uit de briefing, welke bestanden je
     hebt aangeraakt, screenshots, en wat er expliciet niet in zit.
  g. Zet jezelf in CLAIMS.md op 'in review'. Stop daar en vat samen wat er
     klaar is. Merge nooit zelf naar main: dat doet het coördinatiegesprek na
     goedkeuring van Cléo.

Regels waar je niet van afwijkt:

- Nooit werken in site/ zelf, nooit commiten op main, nooit een branch van
  een ander topic mergen.
- Staat een bestand niet bij jouw topic in EIGENAARSCHAP.md, dan wijzig je het
  niet. Heb je er toch iets nodig, zet het dan als verzoek in CLAIMS.md en
  meld het in je samenvatting.
- Na topic 01 is de gedeelde laag (global.css, BaseLayout, Nav, Footer,
  config.ts, categorieen.ts) gesloten gebied. Kom je er in 03, 05 of 06 toch
  niet omheen, stop dan en leg het aan mij voor.
- Paden en symlinks relatief houden. Deze map wordt ook gelezen door de
  Linux-VM van Cowork, die andere absolute paden ziet.
- Geen em-dash in zichtbare siteteksten; en-dash mag voor bereiken zoals
  10:00–18:00.
- Bij twijfel over wat Cléo bedoelt: vraag het aan mij, verzin het niet. De
  ruwe notities staan onbewerkt in
  site/werkafspraken/RUWE-NOTITIES-CLEO-2026-09-07.md en die zijn de bron,
  niet de briefing.

Waar het per topic om gaat, kort:

- 01 Fundament: quote-lettertype (twee varianten voor Cléo), zachtere
  fotoplaceholder, Verhalen wordt Historie inclusief redirects, tokens
  klaarzetten voor het magazine-beeld, cookiebanner-haak. Het categorieschema
  komt uit Cowork (topic 02) en kan later in een tweede kleine PR.
- 03 Homepage: van nieuwsoverzicht naar magazine-landing, met
  beethovenstraat.nl als referentie. Secties Nieuw op de Rozengracht
  (verdwijnt als er niets nieuws is) en Uitgelicht, bereikbaarheid en events
  als korte highlights, BIZ-sectie op het groene deel. Ondernemers komen hier
  juist niet als lijst in.
- 05 Ondernemers en kaart: kaart gezelliger, in een groene sectie linksboven
  op halve breedte, filters ernaast, eerste kaartjes direct eronder.
- 06 Bereikbaarheid: donkergroene achtergrond met genoeg contrast, tegels
  fiets/auto/ov kleiner en duidelijk klikbaar, kaart onderaan maar net boven
  de fold. Check ook mobiel.

Begin met 01. Zeg eerst in drie regels wat je gaat doen, en begin dan.
```

---

## Wat er in Cowork blijft

Topics 02 (categorieën), 04 (blog en redactie), 07 (contact en juridisch) en
08 (fotografie, want de Drive- en Lightroom-koppeling zit daar), plus het
coördinatiegesprek dat de PR's merget.

Wat beide kanten bij elkaar houdt: `CLAIMS.md`. Zolang die wordt bijgehouden,
ziet elke kant wat de andere doet.
