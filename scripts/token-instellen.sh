#!/usr/bin/env bash
# Eenmalig: een GitHub-token instellen zodat pushen werkt vanuit deze repo.
#
# Draai dit zelf in Terminal op je Mac. Het token wordt niet gevraagd via een
# argument en wordt niet weergegeven, dus het komt niet in je shell-historie
# terecht en hoeft nooit in een chat geplakt te worden.
#
#   cd ~/Documents/Claude/Projects/Rozengracht\ website/site
#   ./scripts/token-instellen.sh
#
# Maak eerst een fijnmazig token aan:
#   https://github.com/settings/personal-access-tokens/new
#   Resource owner : noramariaagency
#   Repository     : alleen noramariaagency/rozengracht-site
#   Permissions    : Contents = Read and write
#                    Pull requests = Read and write
#   Verder niets aanvinken.

set -euo pipefail

SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT="$(dirname "$SITE")"
CRED="$PROJECT/.github-token"
HOST="github.com"
USER_NAAM="noramariaagency"

printf '\nToken instellen voor %s/rozengracht-site\n\n' "$USER_NAAM"
printf 'Plak je fijnmazige GitHub-token (je ziet niets terwijl je typt): '
read -rs TOKEN
printf '\n\n'

[ -n "$TOKEN" ] || { echo "Geen token ingevoerd, gestopt."; exit 1; }
case "$TOKEN" in
  github_pat_*|ghp_*) : ;;
  *) echo "Let op: dit lijkt geen GitHub-token (verwacht github_pat_... of ghp_...)."
     printf 'Toch doorgaan? [j/N] '; read -r ja; [ "$ja" = "j" ] || exit 1 ;;
esac

umask 077
printf 'https://%s:%s@%s\n' "$USER_NAAM" "$TOKEN" "$HOST" > "$CRED"
chmod 600 "$CRED"
unset TOKEN

git -C "$SITE" config credential.helper "store --file=$CRED"
git -C "$SITE" config user.name  "Nora Maria Agency"
git -C "$SITE" config user.email "info@noramaria.nl"

printf 'Opgeslagen in %s (alleen leesbaar voor jou).\n' "$CRED"
printf 'Deze map staat buiten de git-repo, dus het token gaat nooit mee in een commit.\n\n'

printf 'Verbinding testen... '
if git -C "$SITE" ls-remote --heads origin >/dev/null 2>&1; then
  echo "ophalen werkt."
else
  echo "ophalen mislukt."; exit 1
fi

printf 'Pushrechten testen... '
if git -C "$SITE" push --dry-run origin HEAD:refs/heads/main >/dev/null 2>&1; then
  printf 'in orde.\n\nKlaar. Pushen werkt nu, ook voor afbeeldingen (topic 08).\n\n'
else
  printf 'geweigerd.\n\n'
  cat <<'TXT'
Het token werkt voor ophalen maar niet voor pushen. Bijna altijd een van deze:
  - Contents staat op Read in plaats van Read and write
  - de repository is niet aangevinkt bij "Only select repositories"
  - Resource owner staat verkeerd
Pas het token aan op github.com/settings/personal-access-tokens en draai dit
script opnieuw.
TXT
  exit 1
fi

cat <<'TXT'
Nog even opletten:
  - Het token verloopt op de datum die je bij het aanmaken koos. Verloopt het,
    dan geeft pushen weer een foutmelding: nieuw token, dit script opnieuw.
  - Kwijt of gelekt? Trek het in op github.com/settings/personal-access-tokens
    en draai dit script met een nieuw token.
TXT
