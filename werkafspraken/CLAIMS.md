# Claims: wie werkt nu waaraan

Bijwerken bij **elke** statuswijziging, in je eigen worktree, in een eigen
kleine commit ("claim: 03 op bezig"). Dit bestand is het enige plek waar we
zien of twee gesprekken elkaar in de weg zitten.

Statussen: `kan starten` → `bezig` → `in review` (PR open, wacht op
Cléo) → `klaar` (gemerged op main).

| # | Topic | Branch | Status | Sinds | Opmerking |
|---|---|---|---|---|---|
| 01 | Fundament: huisstijl, navigatie en datamodel | `topic/01-fundament` | klaar | 7 sep 2026 | **moet als eerste, alleen** · PR #1, categorieschema (punt 4) bewust nog niet gedaan |
| 02 | Categorieën en labels | `topic/02-categorieen` | in review | 7 sep 2026 | voorstel klaar, wacht op Cléo. Herlabelen van de velden gebeurt pas na goedkeuring |
| 03 | Homepage als magazine | `topic/03-homepage-magazine` | kan starten | – | |
| 04 | Blog, artikelen en events | `topic/04-blog-en-artikelen` | kan starten | – | |
| 05 | Ondernemersoverzicht en kaart | `topic/05-ondernemers-en-kaart` | kan starten | – | |
| 06 | Bereikbaarheid | `topic/06-bereikbaarheid` | kan starten | – | |
| 07 | Contact, de BIZ en juridisch | `topic/07-contact-biz-juridisch` | kan starten | – | |
| 08 | Fotografie en beeldpijplijn | `topic/08-fotografie` | kan starten | – | Drive/Lightroom-inventarisatie kan al wel |
| 00 | Coördinatie en release | `main` | bezig | 7 sep 2026 | opzet gemaakt |

## Openstaande verzoeken aan een ander topic

Zet hier neer wat je nodig hebt van iemand anders, in plaats van het zelf te
wijzigen. Formaat: `van → aan: wat, waarom`.

- 01 → 03: in `src/lib/items.ts`, functie `verhaalToItem`, staat een
  hardcoded link naar `verhalen/${entry.slug}/`. Dat pad bestaat nog wel (01
  heeft er een redirectpagina van gemaakt naar `historie/${slug}/`), dus niets
  is stuk, maar elke kaart/link die via dit item naar een verhaal wijst
  (homepage, ondernemerspagina's, nieuwspagina) maakt daardoor een onnodige
  extra sprong. Verander `verhalen/${entry.slug}/` in `historie/${entry.slug}/`
  zodra je in `items.ts` werkt. `items.ts` staat niet in EIGENAARSCHAP.md bij
  01, dus dit is bewust een verzoek en geen eigen wijziging.

## Wachtend op Cléo

- Definitieve lijst van ondernemers (blokkeert het afronden van 02, 05 en 08).
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

## Logboek

- **7 sep 2026** — Topic 01 gemerged op main (PR #1). Build onafhankelijk
  gecontroleerd in een losse clone: 280 pagina's, geen errors, oude
  /verhalen/-URL's redirecten naar /historie/. Cléo koos Petrona als
  citaat-lettertype. Topics 02 t/m 08 mogen nu gelijktijdig lopen.
- **7 sep 2026** — Meeting bij Cléo: nieuwswebsite wordt blog/magazine.
  Ruwe notities vastgelegd in `RUWE-NOTITIES-CLEO-2026-09-07.md`, opgesplitst
  in acht werktopics. Worktree-opzet en werkafspraken gemaakt.
