// Kleine, handmatig bijgehouden lijst met actuele bereikbaarheids-updates
// (wegwerkzaamheden, evenementen die de straat raken, etc). Bewust geen
// content-collection: dit wisselt te weinig en te onregelmatig om daar een
// hele workflow voor op te zetten — gewoon bijwerken in dit bestand.
//
// "tot" mag leeg blijven als het einde nog niet bekend is (dan blijft de
// update gewoon zichtbaar tot iemand een einddatum toevoegt of het item
// hier weghaalt). Is "tot" wel bekend en inmiddels verstreken, dan verdwijnt
// de update automatisch van de bereikbaarheidspagina — er worden dus nooit
// verlopen meldingen getoond.

export type BereikbaarheidUpdate = {
  titel: string;
  tekst: string;
  vanaf: Date;
  tot?: Date;
};

export const updates: BereikbaarheidUpdate[] = [
  {
    titel: 'WorldPride 2026',
    tekst:
      'WorldPride Amsterdam vindt plaats van 25 juli tot 8 augustus 2026. De Canal Parade vaart via de Prinsengracht, vlak langs de Jordaan — houd rekening met drukte en omleidingen in de hele buurt.',
    vanaf: new Date('2026-07-25'),
    tot: new Date('2026-08-08'),
  },
  {
    titel: 'Wegwerkzaamheden Oranje Loper',
    tekst:
      'Vanaf maandag 3 augustus 2026 lopen er wegwerkzaamheden rond de Rozengracht in het kader van de Oranje Loper-herinrichting. Een deel van de straat kan tijdelijk lastiger bereikbaar zijn — de gemeente meldt een einddatum zodra die bekend is.',
    vanaf: new Date('2026-08-03'),
  },
];

export function actueleUpdates(vandaag: Date = new Date()) {
  return updates
    .filter((u) => !u.tot || u.tot >= vandaag)
    .sort((a, b) => a.vanaf.valueOf() - b.vanaf.valueOf());
}
