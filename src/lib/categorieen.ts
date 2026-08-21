// Eén centrale plek voor categorie-labels en -iconen, zodat ze niet langer
// in drie losse pagina's gedupliceerd staan (en dus ook niet uit de pas
// kunnen lopen als er ooit een categorie bijkomt of een label wijzigt).

export const categorieLabels: Record<string, string> = {
  'eten-drinken': 'Eten & drinken',
  winkels: 'Winkels',
  'gezondheid-wellness': 'Gezondheid & wellness',
  diensten: 'Diensten',
  'cultuur-vrije-tijd': 'Cultuur & vrije tijd',
};

// Duidelijk herkenbare lijn-iconen (stijl: Lucide) die letterlijk verbeelden
// waar de categorie over gaat, in plaats van abstracte vormen die niemand
// zonder bijschrift zou herkennen — vork+lepel voor eten & drinken, een
// boodschappentas voor winkels, een hart voor gezondheid & wellness, een
// moersleutel voor diensten, en een ticket voor cultuur & vrije tijd.
export const categorieIconen: Record<string, string> = {
  'eten-drinken':
    '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />',
  winkels:
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />',
  'gezondheid-wellness':
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />',
  diensten:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />',
  'cultuur-vrije-tijd':
    '<path d="M2 9a3 3 0 1 0 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />',
};
