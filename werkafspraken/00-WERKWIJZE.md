# Werkwijze: meerdere gesprekken tegelijk aan deze site

> **Lees dit bestand als eerste, elk gesprek, voordat je iets aanraakt.**
> Elk gesprek is één medewerker. Je werkt nooit in `site/` zelf en je raakt
> nooit bestanden aan die van een ander topic zijn.

Vastgesteld 7 september 2026, na de meeting met Cléo over de omslag van
nieuwswebsite naar blog/magazine.

## 1. De kern in vijf regels

1. **Je eigen werkmap.** Elk topic werkt in `werk/<slug>/`, een eigen git
   worktree met een eigen branch `topic/<slug>`. Twee gesprekken kunnen
   daardoor letterlijk niet in dezelfde bestanden zitten.
2. **Je eigen bestanden.** `EIGENAARSCHAP.md` zegt per topic welke paden
   jouw eigendom zijn. Wat daar niet bij jou staat, wijzig je niet, ook niet
   "even snel".
3. **Je meldt je aan en af.** Bij de start zet je jezelf in `CLAIMS.md` op
   `bezig`, bij oplevering op `in review` en na merge op `klaar`.
4. **Publiceren = jouw branch, niets anders.** Je rebaset op `origin/main`,
   bouwt, pusht je eigen branch en opent een PR. Je merget nooit de branch
   van een ander topic en je commit nooit direct op `main`.
5. **Twijfel je of iets van jou is? Dan is het niet van jou.** Zet het als
   verzoek in `CLAIMS.md` onder "Openstaande verzoeken aan een ander topic"
   en ga door met de rest.

## 2. Een gesprek starten

Nieuw gesprek, duidelijke titel (zie `briefings/`), en dan als eerste:

```bash
cd ~/Documents/Claude/Projects/Rozengracht\ website/site
./scripts/werkgesprek.sh start 03-homepage-magazine
```

Dat script doet: `git fetch`, branch `topic/03-homepage-magazine` van
`origin/main`, worktree in `../werk/03-homepage-magazine`, en het koppelt
`node_modules` door zodat je meteen kunt bouwen. Daarna werk je uitsluitend
in die map.

### Pakketten: gaat automatisch

Komt er in een gesprek een pakket bij (zoals de lettertypen), dan ontbreekt
dat aan de andere kant en faalt daar de build op een import die niemand fout
heeft getypt. `start` en `oplever` controleren daarom zelf of alles uit
`package.json` aanwezig is en installeren wat ontbreekt, aan de juiste kant:
op de Mac in `site/`, in Cowork in `werk-cowork/.deps-linux/`. Draai `npm`
nooit handmatig aan de andere kant dan waar je zit; npm installeert
platformspecifieke binaries en dan breekt de ene kant de build van de andere.

### Twee omgevingen, twee worktree-mappen

De codetopics (01, 03, 05, 06) lopen in Claude Code op de Mac, de content- en
beeldtopics (02, 04, 07, 08) en de coordinatie in Cowork. Worktrees kunnen
niet gedeeld worden tussen die twee: git slaat absolute paden op in
`.git/worktrees/<naam>/gitdir` en in `<worktree>/.git`, en macOS en de
Linux-VM van Cowork zien andere absolute paden voor dezelfde map. Een worktree
die op de ene kant is gemaakt, is op de andere kant stuk.

Het script regelt dat zelf: op macOS komen de worktrees in `werk/`, in Cowork
in `werk-cowork/`. Je hoeft er niets voor te doen, behalve dit: **repareer of
prune nooit de worktrees van de andere kant.** Zie je in `git worktree list`
een pad dat je niet kent, laat het staan. Om dezelfde reden moeten symlinks in
een worktree relatief zijn, nooit absoluut.

Lees dan in deze volgorde:
`00-WERKWIJZE.md` (dit bestand) → je eigen `briefings/<nr>-<slug>.md` →
`EIGENAARSCHAP.md` → `CLAIMS.md` (wat doen de anderen nu?).

## 3. Volgorde: fundament eerst

**Topic 01 (Fundament) gaat als enige eerst en alleen.** Dat gesprek zet de
gedeelde laag vast: kleuren, lettertypes (ook het aparte quote-lettertype),
de zachtere fotoplaceholder, het categorieschema in `config.ts`, de
navigatie en de hernoeming Verhalen → Historie.

Zolang 01 nog niet gemerged is op `main`, staan de andere topics op
`wacht op fundament` in `CLAIMS.md`. Zodra 01 binnen is, mogen 02 tot en met
08 gelijktijdig lopen. Reden: die gedeelde bestanden zijn de enige plek waar
merge-conflicten echt pijn doen, en na 01 raakt niemand ze meer aan.

## 4. Gedeelde bestanden

Na 01 is `src/styles/global.css`, `src/layouts/BaseLayout.astro`,
`src/components/Nav.astro`, `src/components/Footer.astro`,
`src/content/config.ts` en `src/lib/categorieen.ts` **gesloten gebied**.
Heb je daar toch iets nodig (een extra CSS-variabele, een veld in het
schema, een cookiebanner in de layout), dan:

1. Zet het verzoek in `CLAIMS.md` onder "Openstaande verzoeken".
2. Meld het in het coördinatiegesprek (topic 00).
3. Topic 01 wordt kort heropend, doet die ene wijziging, en die gaat via een
   eigen kleine PR naar `main`.
4. Jij rebaset daarna op `origin/main` en gaat verder.

Dat kost een halve dag doorlooptijd en voorkomt de situatie waarin twee
gesprekken dezelfde CSS-variabele anders definiëren.

## 5. Bestanden die meerdere topics raken: veldeigenaarschap

De 104 bestanden `src/content/ondernemers/*/index.md` worden door twee
topics aangeraakt. Dat mag, maar alleen per veld:

| Veld in de frontmatter | Eigenaar |
|---|---|
| `categorie`, `subcategorie` | topic 02 (Categorieën) |
| `fotos`, plus de `foto_*.jpg`-bestanden in de map | topic 08 (Fotografie) |
| al het overige (`naam`, `tekst_nl`, `quote_*`, `meta_*`, `status`) | topic 00, alleen op verzoek |

Harde regels hierbij:

- Raak **alleen jouw eigen regels** aan. Git merget per regel, dus zolang
  jij niets anders aanraakt, botsen 02 en 08 nooit.
- **Herformatteer niets.** Geen velden herordenen, geen aanhalingstekens
  omzetten, geen YAML "opschonen", geen bulk-reformat over alle 104
  bestanden. Eén onschuldige herformattering maakt van een schone merge een
  conflict in 104 bestanden.
- Doe je bulkwijziging met een script dat gericht één veld aanpast, niet met
  een parse-en-herschrijf-de-hele-file-aanpak.

## 6. Opleveren

**Geen pull requests, geen goedkeuringsrondes.** Het echte domein
(www.derozengracht.com) staat nog niet aan: `main` is nu een testomgeving die
alleen wij bekijken. Een PR-gate daarbovenop kost alleen tijd en levert niets
op. Dus:

```bash
cd ~/Documents/Claude/Projects/Rozengracht\ website
./site/scripts/werkgesprek.sh oplever <topic>
```

Dat doet in één keer: rebasen op de laatste `main`, bouwen (faalt de build,
dan stopt het en gaat er niets in), mergen naar `main`, pushen, en wachten tot
de deploy klaar is.

**En dan het belangrijkste: geef Nora een link en zeg waar ze moet kijken.**
Niet "de PR staat klaar", niet "het is gemerged", maar:

> Klaar. Kijk hier: https://noramariaagency.github.io/rozengracht-site/ondernemers/
> Onderaan de kaart staan de filters nu per groep. Klik op "Restaurants" en
> je ziet dat Chin Chin Club ook meekomt.

Dus: de link, plus in gewone woorden welke pagina en waar op die pagina het
verschil zit. Verandert er iets op meerdere pagina's, geef dan per pagina een
link met een regel erbij. Wat er technisch onder water gebeurde, hoeft er niet
bij, tenzij er iets stuk is of er een keuze gemaakt moet worden.

Zit het echte domein er wel op, dan gaat dit veranderen en komt er weer een
reviewstap voor livegang. Tot die tijd niet.

## 6b. Eenmalig: het pushtoken

De shell op de Mac heeft geen GitHub-inloggegevens, en in Cowork loopt alles
via een HTTPS-proxy zonder naamresolutie (SSH en `gh` vallen dus af). Eenmalig
oplossen met `./site/scripts/token-instellen.sh`; dat script vraagt een
fijnmazig token zonder het te tonen en zet het buiten de repo. Is dat al
gedaan, dan hoef je hier niets meer mee.

## 7. Waar Cléo naar kijkt

Per topic leveren we haar iets zichtbaars, geen code. Ze kijkt op de
testsite (noramariaagency.github.io/rozengracht-site/), niet in GitHub. Twee
vormen:

- **Voorbeeldontwerp** voor de topics waar het uiterlijk verandert (01, 03,
  05, 06): een losse pagina of afbeelding die ze naast de huidige site kan
  leggen, met desgewenst twee varianten om uit te kiezen.
- **Voorstel op papier** voor de topics waar de inhoud verandert (02, 04,
  07, 08): het categorieschema, de rubrieken, de contactteksten, de
  fotoregels.

Referentie voor de hele omslag: <https://www.beethovenstraat.nl/> (en de
ondernemersvereniging daar). Dat is waar we op uitgekomen zijn: een gevuld,
magazine-achtig beeld, geen nieuwsoverzicht.

## 8. Let op: `main` beweegt ook zonder ons

De workflow `.github/workflows/fetch-places.yml` commit zelf op `main`
(verse `places.json` en `bereikbaarheid-*.json`). Ga er dus nooit van uit
dat `origin/main` nog staat waar je hem gisteren zag. Altijd `git fetch`
en rebasen voor je pusht; het script doet dat voor je.

## 9. Vaste huisstijlregels (blijven gelden)

- **Geen em-dash (—)** in zichtbare tekst. En-dash (–) mag voor bereiken
  ("10:00–18:00").
- NL + EN, warme journalistieke toon, geen AI-clichés. Zie de skill
  `rozengracht-copywriter`.
- Altijd foto's bij content; interieur, mensen, producten, **geen** exterieur.
- Een event bestaat nooit los: altijd gekoppeld aan een nieuwsartikel, en de
  detailtekst staat alleen in dat artikel.
