#!/usr/bin/env bash
set -euo pipefail

portfolio_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ ! -f "$portfolio_root/build/index.html" ]]; then
  echo "Run npm run build before deploying." >&2
  exit 1
fi

pages_remote="${PAGES_REMOTE:-$(git -C "$portfolio_root" remote get-url origin)}"
pages_directory="$(mktemp -d "${TMPDIR:-/tmp}/portfolio-pages.XXXXXX")"
trap 'rm -rf -- "$pages_directory"' EXIT

git clone --single-branch --branch gh-pages "$pages_remote" "$pages_directory"
for identity in user.name user.email; do
  if identity_value="$(git -C "$portfolio_root" config --get "$identity")"; then
    git -C "$pages_directory" config "$identity" "$identity_value"
  fi
done

git -C "$pages_directory" rm -r --ignore-unmatch .
cp -a "$portfolio_root/build/." "$pages_directory/"
touch "$pages_directory/.nojekyll"
git -C "$pages_directory" add --all
if git -C "$pages_directory" diff --cached --quiet; then
  echo "The published build is already up to date."
  exit 0
fi

git -C "$pages_directory" commit -m "chore: deploy portfolio"
git -C "$pages_directory" push origin HEAD:gh-pages
