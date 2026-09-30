#!/usr/bin/env bash
# Rebuilds the ũ/Ũ font subsets in app/assets/fonts from the Fontsource packages.
# Needs fontTools with brotli:  python3 -m pip install fonttools brotli
set -euo pipefail
cd "$(dirname "$0")/.."
for pkg in inter-tight bitter; do
  pyftsubset "node_modules/@fontsource-variable/$pkg/files/$pkg-latin-ext-wght-normal.woff2" \
    --unicodes="U+0168-0169" --flavor=woff2 --layout-features='*' \
    --output-file="app/assets/fonts/$pkg-u-tilde-wght.woff2"
done
echo "Subsets written to app/assets/fonts"
