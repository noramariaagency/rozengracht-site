// Eén centrale plek voor categorie-labels, groepen, kleuren en iconen, zodat
// ze niet in losse pagina's gedupliceerd staan (en dus ook niet uit de pas
// kunnen lopen als er een categorie bijkomt of een label wijzigt).
//
// Indeling vastgesteld 7 september 2026 op basis van alle ondernemers die op
// de site staan: 15 categorieën in 3 groepen. Achtergrond en de afwegingen
// per categorie staan in werkafspraken/voorstellen/categorieen.md.

export type Groep = 'eten-uitgaan' | 'winkelen' | 'verzorging-diensten';

export const groepLabels: Record<Groep, string> = {
  'eten-uitgaan': 'Eten & uitgaan',
  winkelen: 'Winkelen',
  'verzorging-diensten': 'Verzorging & diensten',
};

export const groepLabelsEn: Record<Groep, string> = {
  'eten-uitgaan': 'Food & going out',
  winkelen: 'Shopping',
  'verzorging-diensten': 'Care & services',
};

// De categorieën in de volgorde waarin ze in het filter horen te staan:
// per groep, en binnen een groep van groot naar klein.
export const categorieGroep: Record<string, Groep> = {
  restaurants: 'eten-uitgaan',
  'bakkers-snacks-togo': 'eten-uitgaan',
  uitgaan: 'eten-uitgaan',
  boodschappen: 'eten-uitgaan',

  'hobby-klussen': 'winkelen',
  wonen: 'winkelen',
  'cadeaus-tabak': 'winkelen',
  'boeken-muziek': 'winkelen',
  'mode-sport': 'winkelen',

  'haar-huid-nagels': 'verzorging-diensten',
  'sport-lichaam': 'verzorging-diensten',
  zorg: 'verzorging-diensten',
  vervoer: 'verzorging-diensten',
  reparatie: 'verzorging-diensten',
  'coffeeshop-speelhal': 'verzorging-diensten',
};

export const categorieLabels: Record<string, string> = {
  restaurants: 'Restaurants & eetcafés',
  'bakkers-snacks-togo': 'Bakkers, snacks & to-go',
  uitgaan: 'Uitgaan',
  boodschappen: 'Boodschappen & delicatessen',
  'hobby-klussen': 'Hobby, klussen & creatief',
  wonen: 'Wonen & huishouden',
  'cadeaus-tabak': 'Cadeaus, tabak & gemak',
  'boeken-muziek': 'Boeken, muziek & platen',
  'mode-sport': 'Mode & sport',
  'haar-huid-nagels': 'Haar, huid & nagels',
  'sport-lichaam': 'Sport, massage & lichaam',
  zorg: 'Zorg & apotheek',
  vervoer: 'Vervoer & fietsen',
  reparatie: 'Reparatie & stomerij',
  'coffeeshop-speelhal': 'Coffeeshop & speelhal',
};

// Engelse vertaling, zelfde keys zodat ze altijd gelijk oplopen.
export const categorieLabelsEn: Record<string, string> = {
  restaurants: 'Restaurants & cafés',
  'bakkers-snacks-togo': 'Bakeries, snacks & takeaway',
  uitgaan: 'Nightlife',
  boodschappen: 'Groceries & delicatessen',
  'hobby-klussen': 'Hobby, DIY & crafts',
  wonen: 'Home & household',
  'cadeaus-tabak': 'Gifts, tobacco & convenience',
  'boeken-muziek': 'Books, music & records',
  'mode-sport': 'Fashion & sport',
  'haar-huid-nagels': 'Hair, skin & nails',
  zorg: 'Health & pharmacy',
  'sport-lichaam': 'Sport, massage & body',
  vervoer: 'Transport & bicycles',
  reparatie: 'Repairs & dry cleaning',
  'coffeeshop-speelhal': 'Coffeeshop & arcade',
};

export function getCategorieLabels(lang: 'nl' | 'en'): Record<string, string> {
  return lang === 'en' ? categorieLabelsEn : categorieLabels;
}

export function getGroepLabels(lang: 'nl' | 'en'): Record<Groep, string> {
  return lang === 'en' ? groepLabelsEn : groepLabels;
}

// De categorieën gegroepeerd, in filtervolgorde. Gebruikt door de filterbalk
// op de ondernemerspagina, zodat een bezoeker eerst ziet waarvoor hij komt.
export function categorieenPerGroep(
  lang: 'nl' | 'en',
): { groep: Groep; groepLabel: string; categorieen: [string, string][] }[] {
  const labels = getCategorieLabels(lang);
  const gLabels = getGroepLabels(lang);
  const groepen: Groep[] = ['eten-uitgaan', 'winkelen', 'verzorging-diensten'];
  return groepen.map((groep) => ({
    groep,
    groepLabel: gLabels[groep],
    categorieen: Object.keys(categorieGroep)
      .filter((k) => categorieGroep[k] === groep)
      .map((k) => [k, labels[k]] as [string, string]),
  }));
}

// Kleur per GROEP, niet per categorie. Vijftien onderscheidbare kleuren
// bestaan niet: bij die aantallen gaat kleur juist betekenis kosten in plaats
// van geven, en zeker voor wie kleuren anders ziet. Drie groepskleuren uit een
// gevalideerde categorische set (Okabe-Ito-achtig) blijven onderscheidbaar bij
// de gangbare vormen van kleurenblindheid. De precieze categorie staat er
// altijd als tekst bij, dus kleur is nooit de enige drager van betekenis.
export const groepKleuren: Record<Groep, string> = {
  'eten-uitgaan': '#E69F00',
  winkelen: '#0072B2',
  'verzorging-diensten': '#009E73',
};

// Per categorie doorgezet, zodat bestaande code (kaartpinnen) niets hoeft te
// weten over groepen.
export const categorieKleuren: Record<string, string> = Object.fromEntries(
  Object.entries(categorieGroep).map(([cat, groep]) => [cat, groepKleuren[groep]]),
);

// Eén duidelijk lijn-icoon per groep (stijl: Lucide): vork+lepel voor eten en
// uitgaan, een boodschappentas voor winkelen, een hart voor verzorging en
// diensten. Bewust per groep en niet per categorie: vijftien iconen die
// zonder bijschrift van elkaar te onderscheiden zijn, bestaan niet, en een
// icoon dat het verkeerde suggereert is slechter dan een neutraal icoon. Het
// label staat er altijd naast.
const groepIconen: Record<Groep, string> = {
  'eten-uitgaan':
    '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />',
  winkelen:
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />',
  'verzorging-diensten':
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />',
};

export const categorieIconen: Record<string, string> = Object.fromEntries(
  Object.entries(categorieGroep).map(([cat, groep]) => [cat, groepIconen[groep]]),
);

// Voor plekken die een icoon nodig hebben zonder bekende categorie
// (bijvoorbeeld FotoFallback bij een onbekende waarde).
export const standaardIcoon = groepIconen.winkelen;
