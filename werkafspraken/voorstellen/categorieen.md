# Voorstel categorieën ondernemers

Voor Cléo, 7 september 2026. Tegenvoorstel op de voorzet uit de meeting.
Gebaseerd op alle 104 ondernemers die nu op de site staan, niet op aannames:
elke zaak is expliciet toegewezen, de volledige toewijzing staat in
`categorieen-toewijzing.json` naast dit bestand.

## Wat we voorstellen

**15 categorieën, verdeeld in 3 groepen.** Jouw voorzet had 14, dus qua aantal
zitten we er vlak bij; de verdeling is anders. Elke categorie heeft minstens
drie zaken, en er is geen restgroep waar de rest in valt.

De drie groepen zijn er voor het filter op de ondernemerspagina: een bezoeker
kiest eerst waarvoor hij komt, en pas daarna hoe specifiek.

### Eten & uitgaan

| Categorie | Zaken | Voorbeelden |
|---|---|---|
| Restaurants & eetcafés | 22 | Moeders, Akitsu, Long Pura, Pesca |
| Bakkers, snacks & to-go | 13 | Bbrood, FEBO, Shoarma Mesut, Maijard Smashburgers |
| Uitgaan: bar, café, club & theater | 5 | Café de Oude Wester, Boom Chicago, Bar Brandstof |
| Boodschappen & delicatessen | 5 | Super Roos Market, Alex Wijnen, Wegewijs, Urban Cacao |

### Winkelen

| Categorie | Zaken | Voorbeelden |
|---|---|---|
| Hobby, klussen & creatief | 10 | Meijer IJzerwaren, Coppenhagen 1001 Kralen, Van der Linde, Party Balloon |
| Wonen & huishouden | 5 | Représentable, Studio HENK, Wulf Meubelen, Blokker |
| Cadeaus, tabak & gemak | 5 | Babylon Kadoshop, Fabula Rosa, SK Tabakzaak |
| Boeken, muziek & platen | 4 | De Kinderboekwinkel, Velvet Music Amsterdam, Dijkman Muziek |
| Mode & sport | 3 | Behind the Pines, Fjallraven, Bisque Golf |

### Verzorging & diensten

| Categorie | Zaken | Voorbeelden |
|---|---|---|
| Haar, huid & nagels | 13 | Theatre de Coiffure, MapPy Nails, Calma Clinic |
| Sport, massage & lichaam | 7 | Equal Yoga, TRIB3, TOPCHIRO Amsterdam, Acupunctuur Centrum Amsterdam |
| Zorg & apotheek | 3 | Apotheek BENU Rozengracht, Tandartspraktijk Rozengracht, DierenDokters Amsterdam |
| Vervoer & fietsen | 3 | Fietstop, Amstel Bike, Scooterrent |
| Reparatie & stomerij | 3 | De Rozengracht Kledingreparatie & Stomerij, Wasserette Quick & Clean, Elmer Repairs |
| Coffeeshop & speelhal | 3 | Coffeeshop Flower Power, African Blackstar Coffeeshop, Lucky Jack |

De losse omschrijving per zaak (nu het veld `subcategorie`, bijvoorbeeld
"Argentijns restaurant & mezcaleria") blijft staan. Dat is waar het echte
detail zit; de categorie is alleen om te filteren.

## Waar we afwijken van jouw voorzet, en waarom

1. **"Uitgaan" hebben we gesplitst.** In jouw voorzet zaten restaurants,
   theater, bar, café en club bij elkaar. Dat wordt in de praktijk 40 van de
   104 zaken in één hokje, dus bijna vier op de tien. Precies dat waar
   bezoekers het meest op zoeken, wordt dan het minst bruikbaar. Nu drie
   categorieën: waar je aan tafel gaat, waar je iets meeneemt, en waar je een
   avond blijft.
2. **Sport gesplitst in winkel en dienst.** Jouw punt bundelde
   sport/wellness/detailhandel sport. Iemand die een yogales zoekt en iemand
   die golfclubs zoekt, zoeken niet hetzelfde. Vandaar Mode & sport (winkel)
   naast Sport, massage & lichaam (dienst).
3. **Kappers, nagels en huid zaten niet in je voorzet**, maar zijn met 13
   zaken de tweede grootste groep van de straat. Die hebben een eigen
   categorie gekregen.
4. **Zorg zat er ook niet in.** Apotheek, tandarts en dierenarts zijn een
   eigen reden om naar de Rozengracht te komen.
5. **Boeken (1 zaak) en Muziek (3 zaken) samengevoegd.** Als losse categorie
   is Boeken één winkel, en een filter met één zaak erin is geen filter.
6. **Stomerij samengevoegd met reparatie** (3 zaken), om dezelfde reden.
7. **IJzerwaren stond bij jou in twee punten** (bij "IJzerwaren/Mac repair/
   borduren" en bij "Hobby en klussen"). Nu één categorie: Hobby, klussen &
   creatief. "Mac repair" is Elmer Repairs geworden onder Reparatie, en
   borduren is Vakhuis onder Hobby met Reparatie als tweede label.
8. **Tabak en souvenirs is verbreed** naar Cadeaus, tabak & gemak, zodat
   Babylon Kadoshop en Fabula Rosa er ook in vallen. Alleen tabak zijn drie
   zaken.
9. **Coffeeshop & speelhal is precies overgenomen** zoals je het voorstelde.
   Drie zaken, en het is een duidelijk eigen reden om er te zijn.

## Het tweede label

Je zei: dubbel label mag bij twijfel. We hebben dat spaarzaam gebruikt, 15
keer, en alleen waar de zaak echt twee dingen is. Niet als vluchtroute voor
categorieën die niet kloppen.

De vier soorten twijfel die we tegenkwamen:

- **Restaurant dat ook to-go is:** Döner Palace, Spang Makandra, Tuk Tuk Thai,
  Broodje Mokum, Chamuyero, Effendy.
- **Restaurant dat ook uitgaansplek is:** Chin Chin Club, Salmuera, Bar Theo.
- **Behandeling die ook zorg is:** TOPCHIRO, Acupunctuur Centrum.
- **Winkel die ook een dienst levert:** Fietstop (verkoop en reparatie),
  Vakhuis (borduren), Sabina Handicraft (winkel en atelier), TARA (nagels en
  massage).

Voorstel voor de weergave: de eerste categorie is de categorie waaronder de
zaak wordt getoond, het tweede label doet alleen mee in het filter. Dus Chin
Chin Club staat onder Uitgaan, maar komt ook naar boven als je op Restaurants
filtert.

## Vragen aan jou

1. **Tattoo.** Je wilde het als eigen categorie, maar er is op de hele straat
   één tattoozaak (Antiek Tattoo, die zich ook als kunstgalerie profileert).
   Nu staat hij onder Haar, huid & nagels. Wil je toch een eigen categorie,
   ook als die maar één zaak bevat?
2. **Is 15 te veel?** Als je korter wil: Zorg & apotheek kan bij Sport,
   massage & lichaam (wordt 14), en Boodschappen kan bij Cadeaus, tabak &
   gemak (wordt 13). Beide vinden wij zwakker, maar het kan.
3. **Uitgaan is nu klein** (5 primair). Zie jij Chin Chin Club, Salmuera en
   Bar Theo eerder als uitgaan dan als restaurant? Dan wordt het 8 en 19.
4. **Snackbars.** Zaken als FEBO en Cafetaria Super Star staan nu bij
   "Bakkers, snacks & to-go", samen met Bbrood en Effendy. Vind je dat één
   groep, of horen bakkers apart?
5. **De definitieve ondernemerslijst.** Dit voorstel is getoetst aan de 104
   zaken die nu op de site staan. Zodra jouw definitieve lijst er is, lopen we
   het opnieuw na; komen er zaken bij in een hoek die we nu niet hebben, dan
   kan er een categorie bijkomen.

## Daarna

Zodra je dit goedkeurt: topic 01 zet het schema in de code (inclusief het
tweede label), topic 02 werkt de velden in alle ondernemersbestanden bij, en
topic 05 bouwt de filterbalk op deze indeling. De toewijzing per zaak ligt al
vast in `categorieen-toewijzing.json`, dus dat is dan mechanisch werk.
