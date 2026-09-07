#!/usr/bin/env bash
# werkgesprek.sh - elk gesprek zijn eigen worktree en branch, zodat twee
# gesprekken nooit in dezelfde bestanden werken.
#
#   ./scripts/werkgesprek.sh start 03-homepage-magazine
#   ./scripts/werkgesprek.sh status
#   ./scripts/werkgesprek.sh publiceer 03-homepage-magazine
#   ./scripts/werkgesprek.sh opruimen 03-homepage-magazine
#
# Zie werkafspraken/00-WERKWIJZE.md.

set -euo pipefail

SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WERK="$(dirname "$SITE")/werk"
g()  { git -C "$SITE" "$@"; }
gw() { git -C "$PAD" "$@"; }

TOPICS="01-fundament 02-categorieen 03-homepage-magazine 04-blog-en-artikelen \
05-ondernemers-en-kaart 06-bereikbaarheid 07-contact-biz-juridisch 08-fotografie"

fout() { printf '\n  FOUT: %s\n\n' "$1" >&2; exit 1; }
kop()  { printf '\n== %s ==\n' "$1"; }

check_slug() {
  local s="${1:-}"
  [ -n "$s" ] || fout "geef een topic mee. Beschikbaar:$(printf '\n    %s' $TOPICS)"
  for t in $TOPICS; do [ "$t" = "$s" ] && return 0; done
  fout "onbekend topic '$s'. Beschikbaar:$(printf '\n    %s' $TOPICS)"
}

cmd_start() {
  local slug="$1" branch="topic/$1" pad="$WERK/$1"
  check_slug "$slug"

  if [ -d "$pad" ]; then
    kop "Werkmap bestaat al"
    echo "  $pad"
    echo "  Ga daar verder. Eerst even bijwerken: git -C '$pad' fetch origin"
    exit 0
  fi

  kop "origin ophalen"
  g fetch origin --prune

  # main bijwerken waar dat veilig kan, en anders eerlijk melden dat er nog
  # lokale commits op main staan die nog niet op GitHub staan.
  if g merge-base --is-ancestor main origin/main 2>/dev/null; then
    g checkout --quiet main && g merge --ff-only origin/main --quiet
    echo "  main bijgewerkt naar origin/main"
  else
    local vooruit; vooruit=$(g rev-list --count origin/main..main 2>/dev/null || echo 0)
    [ "$vooruit" -gt 0 ] && cat <<TXT
  Let op: main staat $vooruit commit(s) voor op origin/main (nog niet gepusht).
  Je nieuwe branch takt af van de lokale main, dus die commits zitten erin.
  Zorg dat main gepusht wordt voor je een PR opent, anders lijken ze van jou.
TXT
  fi

  kop "Branch en werkmap aanmaken"
  mkdir -p "$WERK"
  if g show-ref --verify --quiet "refs/heads/$branch"; then
    echo "  branch $branch bestond al, hergebruikt"
    g worktree add "$pad" "$branch"
  else
    g worktree add -b "$branch" "$pad" main
  fi

  if [ -d "$SITE/node_modules" ] && [ ! -e "$pad/node_modules" ]; then
    ln -s "$SITE/node_modules" "$pad/node_modules"
    echo "  node_modules doorgekoppeld vanuit site/"
  else
    echo "  let op: geen node_modules gevonden, doe 'npm ci' in $pad"
  fi

  kop "Klaar"
  cat <<TXT
  Werkmap : $pad
  Branch  : $branch  (van main)

  Lees nu, in deze volgorde:
    werkafspraken/00-WERKWIJZE.md
    werkafspraken/briefings/$slug.md
    werkafspraken/EIGENAARSCHAP.md
    werkafspraken/CLAIMS.md

  Zet jezelf daarna in CLAIMS.md op 'bezig' en commit dat apart.
  Werk uitsluitend in de werkmap hierboven, nooit in site/.
TXT
}

cmd_status() {
  kop "Worktrees"
  g worktree list
  kop "Topic-branches tegenover origin/main"
  g fetch origin --quiet --prune || echo "  (fetch mislukt, cijfers kunnen verouderd zijn)"
  g for-each-ref --format='%(refname:short)' refs/heads/topic 2>/dev/null | while read -r b; do
    set -- $(g rev-list --left-right --count "origin/main...$b")
    printf '  %-34s %s commit(s) voor, %s achter\n' "$b" "$2" "$1"
  done
  [ -f "$SITE/werkafspraken/CLAIMS.md" ] && { kop "Claims"; sed -n '/^| #/,/^$/p' "$SITE/werkafspraken/CLAIMS.md"; }
}

cmd_publiceer() {
  local slug="$1" branch="topic/$1" pad="$WERK/$1"
  check_slug "$slug"
  [ -d "$pad" ] || fout "geen werkmap $pad. Eerst: $0 start $slug"
  PAD="$pad"

  kop "1/5 Werkmap schoon?"
  [ -z "$(gw status --porcelain)" ] || {
    gw status --short
    fout "commit of stash je wijzigingen eerst; publiceren doet dat niet voor je."
  }
  echo "  schoon"

  kop "2/5 Alleen eigen commits?"
  local n; n=$(gw rev-list --count "origin/main..$branch" 2>/dev/null || echo 0)
  [ "$n" -gt 0 ] || fout "geen commits op $branch bovenop origin/main. Niets te publiceren."
  echo "  $n commit(s):"
  gw log --oneline "origin/main..$branch" | sed 's/^/    /'
  echo
  echo "  Controleer dat hier geen werk van een ander topic tussen staat."

  kop "3/5 Rebasen op origin/main"
  gw fetch origin --prune
  gw rebase origin/main || fout "rebase-conflict. Los het op in $pad, dan opnieuw publiceren.
       Raakt het conflict een bestand dat niet van jouw topic is, neem dan
       eerst contact op via het coordinatiegesprek (topic 00)."

  kop "4/5 Build"
  ( cd "$pad" && npm run build ) || fout "de build faalt. Er wordt niets gepusht."
  echo "  build oke"

  kop "5/5 Pushen"
  if gw push -u origin "$branch" 2>/dev/null; then
    echo "  gepusht"
  else
    cat <<TXT

  Pushen lukt niet: deze shell heeft geen GitHub-inloggegevens.
  Dat is geen probleem, maar de laatste stap gaat dan via het gesprek.

  Zeg in het gesprek: "push deze branch en open de PR via de
  GitHub-koppeling". Deze bestanden zijn gewijzigd ten opzichte van main:

TXT
    gw diff --name-status "origin/main..$branch" | sed 's/^/    /'
    cat <<TXT

  Let op: via de koppeling gaan alleen tekstbestanden mee. Zitten er
  afbeeldingen bij (topic 08), dan is een GitHub-token in deze repo nodig.
  Zie werkafspraken/00-WERKWIJZE.md, paragraaf 6.
TXT
  fi

  kop "Klaar"
  cat <<TXT
  Branch $branch is klaar om te publiceren, main is niet aangeraakt.

  Nu nog, in het gesprek zelf:
    1. Open een pull request van $branch naar main via de GitHub-koppeling.
    2. Zet in de beschrijving: wat er wijzigt, welke bestanden, screenshots of
       voorbeeldontwerp voor Cleo, en wat er expliciet niet in zit.
    3. Zet jezelf in CLAIMS.md op 'in review'.

  Cleo reviewt op de PR. Pas na haar goedkeuring merget topic 00 naar main,
  en dan pas gaat het live.
TXT
}

cmd_opruimen() {
  local slug="$1" branch="topic/$1" pad="$WERK/$1"
  check_slug "$slug"
  g fetch origin --quiet --prune
  g merge-base --is-ancestor "$branch" origin/main 2>/dev/null \
    || fout "$branch zit nog niet in origin/main. Niet opruimen: er zou werk verdwijnen."
  [ -d "$pad" ] && g worktree remove "$pad"
  g branch -d "$branch"
  echo "  $slug opgeruimd (zat volledig in main)."
}

case "${1:-}" in
  start)     shift; cmd_start "${1:-}" ;;
  status)    cmd_status ;;
  publiceer) shift; cmd_publiceer "${1:-}" ;;
  opruimen)  shift; cmd_opruimen "${1:-}" ;;
  *) cat <<TXT
werkgesprek.sh - een werkmap per gesprek

  $0 start <topic>       nieuwe branch + eigen werkmap in ../werk/<topic>/
  $0 status              wie werkt waaraan, hoe ver voor of achter op main
  $0 publiceer <topic>   rebase op main, build, push eigen branch (main blijft ongemoeid)
  $0 opruimen <topic>    werkmap en branch weg, alleen als alles in main zit

Topics:$(printf '\n  %s' $TOPICS)

Lees eerst werkafspraken/00-WERKWIJZE.md.
TXT
  ;;
esac
