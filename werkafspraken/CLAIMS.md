# Claims: wie werkt nu waaraan

Bijwerken bij **elke** statuswijziging, in je eigen worktree, in een eigen
kleine commit ("claim: 03 op bezig"). Dit bestand is het enige plek waar we
zien of twee gesprekken elkaar in de weg zitten.

Statussen: `kan starten` → `bezig` → `in review` (PR open, wacht op
Cléo) → `klaar` (gemerged op main).

| # | Topic | Branch | Status | Sinds | Opmerking |
|---|---|---|---|---|---|
| 01 | Fundament: huisstijl, navigatie en datamodel | `topic/01-fundament` | klaar | 7 sep 2026 | **moet als eerste, alleen** · PR #1, categorieschema (punt 4) bewust nog niet gedaan |
| 02 | Categorieën en labels | `topic/02-categorieen` | klaar | 7 sep 2026 | 15 categorieen in 3 groepen, doorgevoerd op main |
| 03 | Homepage als magazine | `topic/03-homepage-magazine` | klaar | 7 sep 2026 | tweede ronde na feedback: homepage is één blog-wall (max 12, "Meer artikelen"), nieuwe archiefpagina /lezen/, Nav.astro's "Nieuws" werd "Lezen" (op verzoek van Nora, zie hieronder) |
| 04 | Blog, artikelen en events | `topic/04-blog-en-artikelen` | kan starten | – | |
| 05 | Ondernemersoverzicht en kaart | `topic/05-ondernemers-en-kaart` | kan starten | – | |
| 06 | Bereikbaarheid | `topic/06-bereikbaarheid` | kan starten | – | |
| 07 | Contact, de BIZ en juridisch | `topic/07-contact-biz-juridisch` | kan starten | – | |
| 08 | Fotografie en beeldpijplijn | `topic/08-fotografie` | kan starten | – | Drive/Lightroom-inventarisatie kan al wel |
| 00 | Coördinatie en release | `main` | bezig | 7 sep 2026 | opzet gemaakt |
| 00b | Ondernemerslijst doorvoeren | `topic/00-ondernemerslijst` | klaar | 8 sep 2026 | definitieve lijst van Cleo doorgevoerd: 18 vertrokken, 15 nieuw, 2 geen interesse, naam- en adrescorrecties |

## Openstaande verzoeken aan een ander topic

Zet hier neer wat je nodig hebt van iemand anders, in plaats van het zelf te
wijzigen. Formaat: `van → aan: wat, waarom`.

- ~~01 → 03: in `src/lib/items.ts`, functie `verhaalToItem`, staat een
  hardcoded link naar `verhalen/${entry.slug}/`.~~ Opgelost door 03: nu
  `historie/${entry.slug}/`.

- 07 → 03 (BIZ-tekst): 03 zet een duidelijk gemarkeerde tijdelijke tekst in de
  nieuwe BIZ-sectie op de homepage. Definitieve tekst volgt van 07.

- 03 → 01: `src/content/verhalen`-schema (config.ts, gesloten gebied) heeft
  geen publicatiedatum, alleen een vrije "periode"-tekst ("1913 tot nu").
  Op verzoek van Nora staan historie-verhalen daarom nu even helemaal NIET
  in de blog-wall/`/lezen/` (eerder probeerde 03 ze evenredig te verdelen
  over de wall, maar dat gokt een volgorde die niet klopt) — zodra een
  verhaal een echte publicatiedatum heeft, hoort het er gewoon tussen te
  staan op die datum. Verzoek: een `gepubliceerd: z.coerce.date().optional()`
  op het verhalen-schema (naam vrij te kiezen), los van `periode` dat de
  historische periode blijft aanduiden.

- 03 → 04: de homepage is nu een blog-wall die alleen bestaande content
  (nieuws + historie) toont, geen aparte "ondernemer"-kaarten meer. Cléo's
  eis dat elke ondernemer minstens één keer in een blogartikel voorkomt is
  daarmee een contentvraag geworden (welk artikel verwijst naar wie via
  `gerelateerde_ondernemer`), niet iets wat de code kan afdwingen. Vermoedelijk
  al bekend bij 04, hier voor de zekerheid genoemd.

- 03 → 04: de archiefpagina `/lezen/` (en `/en/lezen/`) filtert nu op de 15
  ondernemer-categorieën, zoals Nora vroeg: een artikel neemt de
  categorie(ën) over van zijn gekoppelde ondernemer via
  `gerelateerde_ondernemer` (inclusief het tweede label, dus multi kan).
  Bereikbaarheid is geen ondernemer-categorie en blijft een eigen chip.
  Dekking is nu wel nog dun: maar 3 van de 7 nieuwsartikelen hebben een
  `gerelateerde_ondernemer`; de rest matcht geen enkele categorie-chip en is
  alleen zichtbaar onder "Alles". Geen actie nodig in code, wel iets om aan
  te denken bij het schrijven van nieuwe artikelen: een `gerelateerde_ondernemer`
  invullen waar relevant maakt het artikel ook vindbaar op categorie.

**Uitzondering op "gesloten gebied na topic 01":** Nora vroeg in het gesprek
zelf direct om de "Nieuws"-link in de hoofdnavigatie te vervangen door
"Lezen" (wijzend naar de nieuwe archiefpagina). Dat raakt `Nav.astro`, een
bestand van topic 01. Op haar expliciete akkoord aangepast door topic 03,
i.p.v. het alleen als verzoek neer te zetten — verder niets anders in dat
bestand gewijzigd. Ook `src/pages/lezen/` en `src/pages/en/lezen/` zijn
nieuw en staan niet in EIGENAARSCHAP.md; die zijn hier neergezet omdat ze
rechtstreeks voortbouwen op de homepage-blog-wall (dezelfde databron en
kaartcomponent), niet omdat topic 03 ze blijvend claimt.

- 03 → 00: de nieuwe homepage-sectie "Nieuw op de Rozengracht" is
  datum-gedreven op `nieuw_sinds` (ondernemers geopend binnen een half jaar).
  Dat veld is alleen gezet bij Panke; Behind the Pines en De Kinderboekwinkel
  (Cléo's eigen voorbeelden in de briefing) hebben nog geen `nieuw_sinds`,
  dus ze verschijnen nu niet in die sectie. Er staan al wel nieuwsartikelen
  over allebei: "Outdoormerk Behind the Pines huurt pand op de Rozengracht"
  (14 juli) en "De Kinderboekwinkel verhuist na 50 jaar naar een groter pand"
  (18 juni) — die datums lijken een redelijk uitgangspunt voor `nieuw_sinds`,
  maar de exacte openingsdatum kan afwijken van de publicatiedatum van het
  artikel. `nieuw_sinds` staat bij topic 00 in EIGENAARSCHAP.md (veld "al het
  overige", alleen op verzoek), vandaar dit verzoek i.p.v. het zelf te zetten.

## Besluiten van Nora, 10 september 2026

- **Redactie (topic 04):** Cléo heeft voorbeelden aangeleverd; Nora deelt die in
  het gesprek en ze worden tot artikelen verwerkt. De "Jordaan"-lijn wordt eerst
  samen met Nora bepaald voordat er tekst omheen wordt geschreven.
- **Shoot-transcripten:** worden een scheduled task. De transcripten zijn
  Fireflies-documenten in Google Drive; de links naar Drive/doc staan in
  Airtable (base "Nora Maria Agency", tabel `Playbook` — veld "Playbook doc" is
  het playbook zelf, tabel `Planning` heeft "Drive folder link"). Welk veld de
  Fireflies-transcriptlink bevat is nog niet vastgesteld; in Drive is op
  10 sep 2026 geen document met "transcript" of "Fireflies" in de titel
  gevonden.
- **Fotografie (topic 08):** doet Iggy zelf. De klantmappen staan klaar en de
  Nora Maria-foto's staan in Lightroom. Geen actie voor de andere topics.
- **Livegang:** komt later; `base`/CNAME blijven dus zoals ze nu staan, zie
  `public/DOMEIN-LEES-MIJ.txt`.
- **Cloudflare: opgelost op 10 sep 2026.** De GitHub-app "Cloudflare Workers
  and Pages" stond op "All repositories" en had dus ook deze repo. Nu op
  "Only select repositories" met de drie andere repo's van het account
  (`noramaria-agency`, `nm-content-selector`, `nm-content-selector-version`),
  zodat `rozengracht-site` eruit valt en de rode "Workers Builds"-check hier
  niet meer verschijnt. De app zelf is niet verwijderd, dus wat er in
  Cloudflare aan die andere projecten hangt blijft werken. Oorspronkelijke
  bevinding:
- **Cloudflare:** mag weg. De rode check heet "Workers Builds:
  rozengracht-site" en komt van de GitHub-app "Cloudflare Workers and Pages",
  niet uit dit project (er staat geen wrangler-config in de repo). Weghalen kan
  alleen in het Cloudflare-dashboard of in de GitHub-app-instellingen; beide
  vragen om Nora's eigen inlog.

## Wachtend op Cléo

- ~~Definitieve lijst van ondernemers (blokkeert het afronden van 02, 05 en 08).~~
  **Binnen op 8 september 2026** en doorgevoerd door topic 00b, zie het logboek
  hieronder. 02, 05 en 08 kunnen hierop verder.
- Goedkeuring categorieschema (blokkeert de implementatie in 01 en de
  herlabeling in 02).
- Foto's op de Drive: welke mappen horen bij welke ondernemer, en welke oude
  ondernemers mogen naar het archief.
- Review op de voorbeeldontwerpen per topic.

## Eenmalige technische randvoorwaarde

Pushen vanaf de Mac vereist een GitHub-token, zie paragraaf 6 van
`00-WERKWIJZE.md` en `scripts/token-instellen.sh`. Zolang dat niet gedaan is,
kunnen alleen tekstbestanden gepubliceerd worden via de GitHub-koppeling in
het gesprek, en kan topic 08 geen foto's pushen.

## Bevindingen uit de review van topic 01 (topic 00, 7 sep)

Twee dingen gevonden bij het controleren van PR #1, geen van beide veroorzaakt
door topic 01:

- **Cloudflare Workers-build faalt.** Er hangt een Cloudflare Workers-Git-
  integratie aan de repo die bij elke commit rood wordt, ook op main van voor
  topic 01. De echte deploy loopt via GitHub Actions naar GitHub Pages en die
  is groen. Uitzoeken of die integratie nog ergens voor bedoeld is of
  weggehaald kan; dit is infrastructuur, dus topic 00.
- **De em-dash-sanering is niet volledig.** Er staat nog minstens een
  zichtbare em-dash op de bereikbaarheidspagina ("de dichtstbijzijnde garage
  — de kaart hieronder..."). Verzoek aan topic 06 om die mee te nemen, en aan
  ieder topic om in eigen bestanden te controleren in plaats van aan te nemen
  dat het al gedaan is.

## Al gedaan op de kaart (dus niet opnieuw doen in topic 05)

- Google's eigen bedrijfslabels en POI-icoontjes staan uit op de
  ondernemerskaart. Ze trokken meer aandacht dan onze eigen pinnen en bleven
  staan bij filteren.
- Onze pinnen krijgen de naam van de ondernemer eronder zodra er 15 of minder
  zichtbaar zijn (Google schuift labels niet uit elkaar, dus met alles aan
  wordt het een kluwen). Drempel staat als LABEL_DREMPEL in
  components/OndernemersKaart.astro.
- Het filter werkt ook op het tweede label, voor de kaartjes en de pinnen.

Wat op de kaart nog open staat voor topic 05: de kaart "gezelliger" maken, in
een groene sectie linksboven op halve breedte met de filters ernaast.

## Logboek

- **8 sep 2026** — De definitieve ondernemerslijst van Cleo is doorgevoerd
  (topic 00b, op verzoek van Nora). Wat er is gebeurd:
  - **18 ondernemers op `status: vertrokken`.** Nieuwe statuswaarde in
    `config.ts`: de zaak verdwijnt uit het overzicht, de kaart, de homepage en
    krijgt geen eigen pagina meer, maar tekst en foto's blijven in de repo
    staan. Terugzetten is dus één regel. Vertrokken: Toni & Guy (13),
    Wegewijs (32), Koud Kunstje (49), Apotheek Benu (57), Gebroeders Winter
    (62), Recover (231), Amigo Grill (5), Tuk Tuk Thai (22), Interline & Go
    (51), Witbaard (63), Nature Skin (72), TRIB3 (88), Henny's Homemade (91),
    Ton Ton Shoarma (137), Glori Amsterdam (194), Urban Cacao (200), Spang
    Makandra (214) en Ben Cohen (239).
  - **15 nieuwe ondernemerspagina's**, geschreven met de skill
    `rozengracht-copywriter`: Uno Mas (5), Sneakerdistrict (21), Dong Son (22),
    Mokum Vintage (25), Café de Gouden Florijn (28, in verbouwing), Scoops &
    Bubbles (51), Supermarkt Jordaan (56), PTA Multistore (63), Haku Specialty
    Coffee (69), Sabai Thai Wellness (72), Rush (88), Grillroom Hilal (154),
    Bakkerij Wolf (200), Eethuis Ali Baba (214) en Bánh Mì Bà Mỹ (239). Alle
    vijftien staan op `deels-klaar`: geen foto's en geen citaat.
  - **Twee naamswijzigingen**: Tandartspraktijk Rozengracht heet nu
    Mondzorggilde (68-70) en Panke heet nu Fanke (91, huisnummer bevestigd).
    Beide mappen zijn hernoemd, dus de URL is mee veranderd. Bij Fanke bleek
    de oude beschrijving ook feitelijk fout (geen Grieks dagrestaurant maar een
    Griekse deli met koffiebar); die tekst is herschreven.
  - **Adrescorrecties** volgens de lijst: Backstage van 101-103 naar 107,
    Dijkman van 107-115 naar 115, Studio HENK naar 202-210, Ma Baker heeft nu
    huisnummer 343.
  - **Twee op `geen-interesse`**: DierenDokters (226) en Fit Well (241). Alleen
    wat op de laatste lijst als geen interesse staat, telt; oudere tabbladen
    niet. Deze status haalt nu ook de eigen pagina weg, niet alleen de
    vermelding in het overzicht.
  - **Citaten weggehaald** bij alle nieuwe pagina's en bij Fanke en
    Mondzorggilde. Die quotes waren door ons opgeschreven op basis van online
    bronnen, niet uitgesproken door de ondernemer. Ophalen bij de ondernemer
    zelf, dan kunnen ze terug.
  - **Archief**: van alle 18 vertrekkers plus de hernoemde tandartspraktijk
    staat een volledig dossier in Drive, in "Website Rozengracht /
    Archief ondernemers 2026-09-08", met de complete pagina-inhoud, de
    fotonamen en de laatst bekende contactgegevens. Pas daarna is er iets van
    de site gehaald.
  - **Nog te bevestigen bij Cleo**: Behind the Pines (34) staat niet op de
    lijst maar blijft op verzoek van Nora staan, Sneakerdistrict (21) staat op
    de nieuwe lijst als actief terwijl een ouder tabblad "GESLOTEN FAILLIET"
    zegt, en bij Mondzorggilde staat het veld `website` nog op
    leuketandarts.nl.

  Uitzonderingen op het eigenaarschap, met instemming van Nora: dit topic
  raakte `src/content/config.ts` (topic 01, één statuswaarde erbij),
  `src/pages/ondernemers/[...slug].astro` en de Engelse variant (topic 05, een
  filter in `getStaticPaths`), `src/pages/ondernemers/index.astro` en de
  Engelse variant plus de drie homepage-componenten van topic 03 (één
  filterregel uitgebreid) en `scripts/werkgesprek.sh` (topic 00, een negende
  topic toegevoegd). In al die bestanden is niets anders gewijzigd.

- **7 sep 2026** — Topic 03, vierde ronde (kleine bijstellingen): de
  blog-wall en `/lezen/` zijn nu breder dan de standaard leescontainer, via
  het al bestaande `--max-width-breed` (1440px) uit global.css — dat stond
  al klaar sinds topic 01 voor precies dit soort magazine-secties, hier
  voor het eerst gebruikt (geen wijziging aan global.css zelf nodig). De
  blogkaartjes hebben geen kader en geen ronde hoeken meer: alleen foto +
  tekst, geen los "doosje" erop (nieuwe `bordered`-prop op ContentCard,
  standaard nog aan voor ander gebruik zoals de nieuwspagina van topic 04).
- **7 sep 2026** — Topic 03, derde ronde na feedback van Nora op de tweede
  ronde: de wall stond nog als een grid met wisselend brede vakken (2/3/4
  van de 6 kolommen), waardoor een bereikbaarheid-artikel er soms uitzag als
  een losse zijkolom naast een groot artikel i.p.v. gewoon "ertussen".
  Vervangen door echte masonry (CSS columns, drie gelijke kolommen, de
  foto's variëren in hoogte) — zelfde idee, andere techniek, dichter bij
  beethovenstraat.nl. Titel en tekst staan nu ook onder de foto in plaats
  van eroverheen met een donkere gradient. Excerpt-lengte omhoog (150 naar
  280 tekens) zodat er echt wat te lezen staat op een kaartje. BIZ-tekst
  inhoudelijk verdubbeld naar twee alinea's (dat bedoelde Nora met "groter",
  niet een groter lettertype — dat is weer wat teruggezet). Categorie-filter
  op `/lezen/` gebruikt nu echt de 15 ondernemer-categorieën (via
  `gerelateerde_ondernemer`, multi kan) i.p.v. het voorlopige
  Nieuws/Bereikbaarheid/Historie-onderscheid. Historie-verhalen staan er
  voorlopig helemaal niet in (zie het verzoek aan topic 01 hieronder over
  een publicatiedatum) i.p.v. ze te gokken tussen het nieuws door.
- **7 sep 2026** — Topic 03, tweede ronde na feedback van Nora: de homepage
  had nog "Nieuws & updates"- en "Uitgelicht"-koppen; dat is nu één
  ongetitelde blog-wall direct onder de bereikbaarheidsbalk, met wisselende
  kaartformaten (groter kaartje bij meer tekst) naar het voorbeeld van
  beethovenstraat.nl. Ook: kleur-bug op "Nieuw op de Rozengracht" gefixt
  (onleesbaar zwart op donkergroen), BIZ-sectie flink vergroot en de link
  eronder weggehaald, de homepage toont nu maar 12 artikelen met een link
  naar de nieuwe archiefpagina `/lezen/` (filter op Nieuws/Bereikbaarheid/
  Historie), en de "Nieuws"-navlink is op Nora's verzoek "Lezen" geworden.
- **7 sep 2026** — Topic 03 opgeleverd op main via `oplever` (geen PR meer,
  zie de nieuwe werkwijze). Onderweg gerebaset op de 15-categorieen-omzetting
  van topic 02: de homepage-filterchips in de kaart-CTA stonden nog plat (15
  op een rij), nu net als op /ondernemers per groep met een kopje erboven.
  Ook een `&mdash;`-entity in de event-highlight vervangen door `&middot;`,
  zelfde fix als eerder al op de oude homepage was toegepast.
- **7 sep 2026** — Categorieen doorgevoerd en zichtbaar op de site, plus
  kaartfixes na feedback van Nora. Tattoo blijft onder Haar, huid & nagels:
  goedgekeurd.
- **7 sep 2026** — Topic 01 gemerged op main (PR #1). Build onafhankelijk
  gecontroleerd in een losse clone: 280 pagina's, geen errors, oude
  /verhalen/-URL's redirecten naar /historie/. Cléo koos Petrona als
  citaat-lettertype. Topics 02 t/m 08 mogen nu gelijktijdig lopen.
- **7 sep 2026** — Meeting bij Cléo: nieuwswebsite wordt blog/magazine.
  Ruwe notities vastgelegd in `RUWE-NOTITIES-CLEO-2026-09-07.md`, opgesplitst
  in acht werktopics. Worktree-opzet en werkafspraken gemaakt.
