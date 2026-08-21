// Kleine tekst-helpers die op meerdere content-types (nieuws, verhalen,
// ondernemers) hergebruikt worden.

/**
 * Zet met dubbele newlines gescheiden alinea's om naar geldige HTML: elke
 * alinea in zijn eigen <p>. De eerdere aanpak (`tekst.replace(/\n\n/g,
 * '</p><p>')`) leverde ongeldige HTML op — geen openende <p> vóór de eerste
 * alinea en geen sluitende </p> na de laatste.
 */
export function naarParagrafen(tekst: string): string {
  return tekst
    .trim()
    .split(/\n\n+/)
    .map((alinea) => `<p>${alinea.trim()}</p>`)
    .join('');
}

/**
 * Eerste alinea van een tekst, voor gebruik als excerpt/meta-description.
 * Optioneel afgekapt op maxLength (op woordgrens) voor meta descriptions.
 */
export function eersteAlinea(tekst: string, maxLength?: number): string {
  const eerste = tekst.trim().split(/\n\n+/)[0].trim();
  if (!maxLength || eerste.length <= maxLength) return eerste;
  const afgekapt = eerste.slice(0, maxLength);
  return afgekapt.slice(0, afgekapt.lastIndexOf(' ')) + '…';
}
