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
//
// titel_en/tekst_en: Engelse vertaling voor de /en/-versie van de
// bereikbaarheidspagina — altijd samen met titel/tekst bijwerken.

export type BereikbaarheidUpdate = {
  titel: string;
  titel_en: string;
  tekst: string;
  tekst_en: string;
  vanaf: Date;
  tot?: Date;
};

export const updates: BereikbaarheidUpdate[] = [
  {
    titel: 'WorldPride 2026',
    titel_en: 'WorldPride 2026',
    tekst:
      'WorldPride Amsterdam vindt plaats van 25 juli tot 8 augustus 2026. De Canal Parade vaart via de Prinsengracht, vlak langs de Jordaan — houd rekening met drukte en omleidingen in de hele buurt.',
    tekst_en:
      'WorldPride Amsterdam takes place from 25 July to 8 August 2026. The Canal Parade sails along the Prinsengracht, right next to the Jordaan — expect crowds and diversions throughout the neighbourhood.',
    vanaf: new Date('2026-07-25'),
    tot: new Date('2026-08-08'),
  },
  {
    titel: 'Wegwerkzaamheden Oranje Loper',
    titel_en: 'Oranje Loper roadworks',
    tekst:
      'Vanaf maandag 3 augustus 2026 lopen er wegwerkzaamheden rond de Rozengracht in het kader van de Oranje Loper-herinrichting. Een deel van de straat kan tijdelijk lastiger bereikbaar zijn — de gemeente meldt een einddatum zodra die bekend is.',
    tekst_en:
      'From Monday 3 August 2026, roadworks are underway around the Rozengracht as part of the Oranje Loper redesign. Part of the street may be temporarily harder to access — the municipality will announce an end date once it is known.',
    vanaf: new Date('2026-08-03'),
  },
];

export function actueleUpdates(vandaag: Date = new Date()) {
  return updates
    .filter((u) => !u.tot || u.tot >= vandaag)
    .sort((a, b) => a.vanaf.valueOf() - b.vanaf.valueOf());
}
