// Eén plek die bepaalt of een nieuwsbericht al gepubliceerd is.
//
// Achtergrond: sinds september 2026 schrijven we artikelen vooruit. Een stuk
// over Moederdag of over een jubileum in november krijgt de datum waarop het
// hoort te verschijnen, niet de datum waarop het geschreven is. Zonder deze
// filter zou zo'n artikel meteen bovenaan de blog-wall staan, want daar wordt
// op datum gesorteerd en de toekomst sorteert vooraan.
//
// De site is een statische build, dus "vandaag" is de dag waarop gebouwd
// wordt. Daarom loopt de deploy-workflow sinds 10 september 2026 ook elke
// nacht op een schema (zie .github/workflows/deploy.yml), niet alleen bij een
// push. Zonder die nachtelijke build zou een vooruit geschreven artikel
// blijven wachten tot iemand toevallig iets pusht: de workflow "Places
// verversen" draait maar één keer per week (maandagnacht), dus daar kun je
// niet op leunen.
//
// De detailpagina van een vooruit geschreven artikel wordt wél gebouwd. Dat is
// bewust: zo kunnen we een concept nakijken op de echte pagina voordat hij in
// de overzichten opduikt. Hij is alleen niet te vinden zonder de directe URL.

export function isGepubliceerd(datum: Date): boolean {
  // Vergelijken op kalenderdag, niet op tijdstip: een artikel van vandaag
  // hoort vandaag zichtbaar te zijn, ook als de build 's ochtends liep.
  const nu = new Date();
  const vandaag = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate());
  const dag = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate());
  return dag.valueOf() <= vandaag.valueOf();
}

export function alleenGepubliceerd<T extends { data: { datum: Date } }>(
  items: T[],
): T[] {
  return items.filter((item) => isGepubliceerd(item.data.datum));
}
