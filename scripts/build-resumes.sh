#!/usr/bin/env bash
set -euo pipefail
portfolio_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
resume_compiler="${TECTONIC:-tectonic}"
cd "$portfolio_root/docs/resume"
for language in EN FR; do
  "$resume_compiler" --outdir "$portfolio_root/public" "StanleyAvril_CV_${language}.tex"
done
