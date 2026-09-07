# Rozengracht-site: eerst dit lezen

Aan deze site wordt met **meerdere gesprekken tegelijk** gewerkt. Elk gesprek
is één medewerker met een eigen branch en een eigen werkmap. Voordat je iets
wijzigt:

1. Lees `werkafspraken/00-WERKWIJZE.md`. Geen uitzonderingen.
2. Kijk in `werkafspraken/CLAIMS.md` waar de anderen nu mee bezig zijn.
3. Kijk in `werkafspraken/EIGENAARSCHAP.md` of dit bestand van jouw topic is.
   Staat het er niet bij jou, dan wijzig je het niet, maar zet je een verzoek
   in `CLAIMS.md`.

## Harde regels

- **Nooit werken in `site/` zelf** en **nooit commiten op `main`.** Werk in
  je eigen worktree: `./scripts/werkgesprek.sh start <topic>` maakt hem aan
  in `../werk/<topic>/`.
- Opleveren gaat via `./scripts/werkgesprek.sh oplever <topic>`: rebase,
  build, merge naar `main`, push, wachten op de deploy. **Geen pull requests
  en geen goedkeuringsrondes**: het echte domein staat nog niet aan, dus
  `main` is een testomgeving.
- **Sluit altijd af met een link en waar te kijken**, in gewone woorden. Dus
  "kijk op .../ondernemers/, de filters staan nu per groep", niet "de PR is
  gemerged". Git-termen horen niet in het antwoord.
- Je merget nooit de branch van een ander topic mee.
- In `src/content/ondernemers/*/index.md` geldt eigenaarschap **per veld**.
  Niet herformatteren, niet herordenen, geen bulk-opschoning.

## Schrijfregels voor alle zichtbare tekst

- Geen em-dash (—). En-dash (–) mag voor bereiken, zoals "10:00–18:00".
- **Geen markdown in contentvelden.** `tekst_nl`, `tekst_en`, `quote_*` en
  `meta_*` worden niet als markdown gerenderd: `naarParagrafen()` in
  `src/lib/tekst.ts` splitst alleen op dubbele newlines en zet elke alinea in
  een `<p>`. Schrijf je daar `**vet**`, dan staan die sterretjes letterlijk op
  de site. Dus geen `**`, `*`, `_`, `` ` ``, `#`-koppen, `- `-bullets of
  `[tekst](url)` in die velden. Wil je nadruk, schrijf de zin dan zo dat de
  nadruk uit de woorden komt.
- NL en EN, warme journalistieke toon, geen AI-clichés. Zie de skill
  `rozengracht-copywriter`.
- Altijd foto's: interieur, mensen, producten. Geen exterieur.
- Een event bestaat nooit los, altijd gekoppeld aan een nieuwsartikel; de
  detailtekst staat alleen in dat artikel.

## Stack

Astro 4, statische build, GitHub Pages via `.github/workflows/deploy.yml`.
Een push naar `main` gaat dus live. De workflow `fetch-places.yml` commit
zelf ook op `main`, dus `origin/main` beweegt ook zonder ons: altijd fetchen
en rebasen voor je pusht.

## Pushen

De shell op de Mac kan alleen ophalen, niet pushen, tenzij het token is
ingesteld: `./scripts/token-instellen.sh` (eenmalig, zie paragraaf 6 van
`werkafspraken/00-WERKWIJZE.md`). Is dat niet gedaan, publiceer dan
tekstbestanden via de GitHub-koppeling en meld dat afbeeldingen niet mee
kunnen.
