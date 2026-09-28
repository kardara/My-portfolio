#!/usr/bin/env bash
# Rebuild the CV PDF from cv/cv.html and the page previews used by the on-site viewer.
# Needs google-chrome and pdftoppm (poppler-utils).
set -euo pipefail
cd "$(dirname "$0")/.."

google-chrome --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf=public/Zakaria_CV.pdf cv/cv.html 2>/dev/null

rm -rf public/cv && mkdir -p public/cv
pdftoppm -jpeg -jpegopt quality=76 -scale-to-x 1400 -scale-to-y -1 public/Zakaria_CV.pdf public/cv/page
pdftoppm -jpeg -jpegopt quality=74 -scale-to-x 760 -scale-to-y -1 public/Zakaria_CV.pdf public/cv/page-sm

pages=$(ls public/cv/page-[0-9]*.jpg | wc -l)
echo "CV rebuilt: $pages page(s). If the count changed, update cvPages in src/data/profile.ts."
