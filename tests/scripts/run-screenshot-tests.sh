#!/usr/bin/env bash
# Capture SEO/marketing screenshots
set -e

BASE_URL="${1:-http://localhost:3000}"
SESSION="${2:-screenshots}"
OUTPUT_DIR="tests/e2e/screenshots"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AB="node \"$SCRIPT_DIR/ab.js\""

mkdir -p "$OUTPUT_DIR"

echo "=============================================="
echo "  Screenshot Capture for SEO/Marketing"
echo "  Output: $OUTPUT_DIR"
echo "=============================================="

$AB close --all 2>/dev/null || true

capture() {
  local ROUTE="$1"
  local FILENAME="$2"
  local DESC="$3"

  echo ""
  echo "Capturing: $DESC"
  $AB --session "$SESSION" open "$BASE_URL$ROUTE" > /dev/null 2>&1
  $AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
  $AB --session "$SESSION" set viewport 1440 900 > /dev/null 2>&1
  $AB --session "$SESSION" screenshot "$OUTPUT_DIR/${FILENAME}-desktop.png" > /dev/null 2>&1
  $AB --session "$SESSION" set viewport 375 812 > /dev/null 2>&1
  $AB --session "$SESSION" screenshot "$OUTPUT_DIR/${FILENAME}-mobile.png" > /dev/null 2>&1
  echo "  ✓ Saved: ${FILENAME}-desktop.png, ${FILENAME}-mobile.png"
}

capture "/" "homepage" "Homepage"
capture "/contact" "contact" "Contact Page"
capture "/products" "products" "Products Page"
capture "/services/printer-rental" "printer-rental" "Printer Rental"
capture "/get-quote" "get-quote" "Get Quote"
capture "/our-clients" "our-clients" "Our Clients"
capture "/brands/hp" "brand-hp" "HP Brand Page"
capture "/brands/canon" "brand-canon" "Canon Brand Page"
capture "/blogs" "blogs" "Blog Listing"

$AB close --all 2>/dev/null || true

echo ""
echo "=============================================="
echo "  ✓ All screenshots captured"
echo "=============================================="
