#!/usr/bin/env bash
# Re-download site assets if needed. Requires Referer for edmontonsquashclub.ca.
set -euo pipefail

DEST="$(cd "$(dirname "$0")/.." && pwd)/public/images"
REF="https://edmontonsquashclub.ca/"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

mkdir -p "$DEST"

fetch() {
  local out="$1"
  local url="$2"
  curl -fsSL -H "Referer: $REF" -A "$UA" -o "$DEST/$out" "$url"
  echo "OK $out"
}

fetch logo.png "https://edmontonsquashclub.ca/wp-content/uploads/2017/11/Edmonton-Squash-Club-Logo-Horz-outline-2col.png"
fetch hero.jpg "https://edmontonsquashclub.ca/wp-content/uploads/2017/12/GaultiervsGawad-header.jpg"
fetch intro.jpg "https://edmontonsquashclub.ca/wp-content/uploads/2019/02/canadian-nat-womens-tournament-1200px16.jpg"
fetch sponsor-pozniak.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Pozniak-HD-Field-Services-300x202.png"
fetch sponsor-bee-clean.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Bee-Clean-Logo-clean_logos_One-Colour-300x117.png"
fetch sponsor-oak-point.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Oakpoint-Logo-2021-Stacked-Slogan-2-300x215.png"
fetch sponsor-access-automotive.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Access-Automotive-Logo-2024-300x97.png"
fetch sponsor-task-concrete.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Task-Concrete-300x133.png"
fetch sponsor-timber-benefits.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Timber_Logo_CMYK-1-300x106.png"
fetch sponsor-cmb-insurance.png "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/cmb-logo-footer.png"
fetch sponsor-rotex-supply.jpg "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/New-Logo-Black-w-red-1-300x193.jpg"
