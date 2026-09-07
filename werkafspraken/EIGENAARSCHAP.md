# Eigenaarschap per topic

Eén regel: **een bestand heeft precies één eigenaar.** Staat een pad niet bij
jouw topic, dan wijzig je het niet, ook niet als het "erbij hoort".
Uitzondering: de ondernemersbestanden, die gaan per veld (zie onderaan).

## 01 — Fundament: huisstijl, navigatie en datamodel
*Gaat als eerste en alleen. Daarna gesloten gebied voor iedereen.*

```
src/styles/global.css
src/layouts/BaseLayout.astro
src/components/Nav.astro
src/components/Footer.astro
src/components/FotoFallback.astro
src/content/config.ts
src/lib/categorieen.ts
src/lib/i18n.ts
src/pages/verhalen/          -> hernoemen naar historie
src/pages/en/verhalen/       -> hernoemen naar historie
public/                      (fonts, robots.txt, redirects)
```

## 02 — Categorieën en labels
```
werkafspraken/voorstellen/categorieen.md      (nieuw, het voorstel voor Cléo)
src/content/ondernemers/*/index.md            ALLEEN de velden categorie + subcategorie
```
De implementatie van het schema zelf (`config.ts`, `categorieen.ts`) doet
topic 01, op basis van het door Cléo goedgekeurde voorstel.

## 03 — Homepage als magazine
```
src/pages/index.astro
src/pages/en/index.astro
src/components/ContentCard.astro
src/components/home/                          (nieuw: alle homepage-secties)
src/lib/items.ts
```

## 04 — Blog, artikelen en events (inclusief redactie en toon)
```
src/pages/nieuws/**
src/pages/en/nieuws/**
src/content/nieuws/**
src/content/events/**
src/content/verhalen/*.md                      (inhoud; het hernoemen van de route doet 01)
src/components/EventDetails.astro
src/lib/tekst.ts
werkafspraken/voorstellen/rubrieken-en-toon.md (nieuw)
```

## 05 — Ondernemersoverzicht en kaart
```
src/pages/ondernemers/index.astro
src/pages/en/ondernemers/index.astro
src/pages/ondernemers/[...slug].astro
src/pages/en/ondernemers/[...slug].astro
src/components/OndernemersKaart.astro
src/components/OndernemerKaart.astro
```

## 06 — Bereikbaarheid
```
src/pages/bereikbaarheid.astro
src/pages/en/bereikbaarheid.astro
src/components/BereikbaarheidKaart.astro
src/data/bereikbaarheid-places.json
src/data/bereikbaarheid-routes.json
src/lib/locatie.ts
```

## 07 — Contact, de BIZ en juridisch
```
src/pages/contact.astro
src/pages/over-ons.astro
src/pages/privacy.astro
src/pages/cookies.astro
src/pages/en/contact.astro
src/pages/en/over-ons.astro
src/pages/en/privacy.astro
src/pages/en/cookies.astro
```
De cookiebanner zelf hoort in `BaseLayout.astro` en is dus een verzoek aan 01.
De tekst voor de BIZ-sectie op de homepage schrijft 07, maar 03 plaatst hem.

## 08 — Fotografie en beeldpijplijn
```
src/content/ondernemers/*/foto_*.jpg           (bestanden toevoegen/vervangen)
src/content/ondernemers/*/index.md             ALLEEN het veld fotos
src/content/nieuws/*/foto_*.jpg
werkafspraken/voorstellen/fotobeleid.md        (nieuw)
```

## 00 — Coördinatie en release
```
werkafspraken/00-WERKWIJZE.md
werkafspraken/EIGENAARSCHAP.md
werkafspraken/CLAIMS.md
werkafspraken/briefings/**
scripts/werkgesprek.sh
main                                            (de enige die merget)
```

---

## Bestanden die niemand aanraakt zonder overleg in topic 00

```
package.json / package-lock.json      (een dependency erbij raakt alle worktrees)
astro.config.mjs
.github/workflows/**
src/data/places.json                  (wordt automatisch bijgewerkt door de workflow)
docs/                                 (oude build-output, staat nog in git; niet aanraken)
_to_delete/                           (opruimmap, geen bron)
```

## Veldeigenaarschap in `src/content/ondernemers/*/index.md`

| Veld | Eigenaar |
|---|---|
| `categorie`, `subcategorie` | 02 |
| `fotos` | 08 |
| `naam`, `huisnummer`, `openingstijden`, `quote_*`, `meta_*`, `tekst_*`, `status`, `interne_opmerking` | 00, alleen op verzoek |

Niet herformatteren, niet herordenen, geen bulk-opschoning. Alleen jouw veld.
