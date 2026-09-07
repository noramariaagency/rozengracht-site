# Rozengracht 07 - Contact, de BIZ en juridisch

**Gesprekstitel:** `Rozengracht 07 - Contact, de BIZ en juridisch`
**Branch:** `topic/07-contact-biz-juridisch` · **Werkmap:** `werk/07-contact-biz-juridisch/`

## Doel

Duidelijk maken wat de BIZ is, waar je iets kunt melden, en bij wie je moet
zijn. Plus de juridische pagina's die er nog niet zijn.

## Wat er in de notities over gaat

> - Contact pagina, wat is een/de bizz waar melden, (Niet "wordt lid")
> - Contact pagina: Contact straatmanager info (telefoon) Moheb Alecozy - 0652556066. Geen form maar linkje om te mailen zeker als je nieuwe odnernemer bent
> - Cookies/Privacy maken
> - Sectie over "de bizz" toevoegen op home op groene deel "de bizz/de ondernemervereniging". zie ook homepage beethoven straat die hebben ook zon tekst

## Opdracht

1. **Contactpagina herschrijven.** Leg uit wat een BIZ is en wat déze BIZ
   doet, en waar je iets kunt melden. **Niet** framen als "word lid": een BIZ
   werkt niet met lidmaatschap, dus die toon moet eruit.
2. **Straatmanager.** Moheb Alecozy, 0652556066. Als contactpersoon op de
   pagina, met telefoonnummer.
3. **Geen formulier.** Een mailtolink in plaats van een contactformulier, en
   maak expliciet duidelijk dat nieuwe ondernemers vooral even moeten mailen.
4. **Cookies en privacy.** Beide pagina's staan nu op een placeholdertekst.
   Schrijf ze echt, en kijk eerst wat de site feitelijk doet: welke kaart,
   welke fonts, welke statistieken, zet iets een cookie? Als er niets
   trackt, zeg dat dan gewoon; dan is de cookiepagina kort en klopt hij.
   Is er wel een banner nodig, dan is de haak in `BaseLayout.astro` een
   verzoek aan topic 01.
5. **BIZ-tekst voor de homepage.** Schrijf de tekst voor de groene
   BIZ-sectie op de homepage (topic 03 plaatst hem). Kijk naar de vergelijkbare
   tekst op beethovenstraat.nl. Lever hem aan als los bestand of via het
   coördinatiegesprek.
6. Bekijk ook `over-ons.astro`; die overlapt met "wat is de BIZ" en moet niet
   hetzelfde twee keer zeggen.

## Jouw bestanden

`src/pages/contact.astro`, `over-ons.astro`, `privacy.astro`,
`cookies.astro`, en de vier Engelse equivalenten in `src/pages/en/`.

## Niet doen

De homepage aanpassen (topic 03). De layout of de banner-component zelf
(verzoek aan topic 01).

## Oplevering voor Cléo

De teksten op papier voordat ze in de pagina's staan: contact, wat is de BIZ,
de BIZ-tekst voor de homepage, en de cookie- en privacytekst. Vraag haar
expliciet of de rol van de straatmanager zo goed beschreven staat.

## Afhankelijkheden

- Wacht op topic 01.
- Juridische teksten: geen advies, wel eerlijk beschrijven wat de site doet.
  Bij twijfel over verplichtingen: aan Cléo voorleggen, niet zelf beslissen.
