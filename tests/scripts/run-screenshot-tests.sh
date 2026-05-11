#!/usr/bin/env bash
# Capture SEO/marketing screenshots
set -e

BASE_URL="${1:-http://localhost:3000}"
SESSION="${2:-screenshots}"
OUTPUT_DIR="tests/e2e/screenshots"

mkdir -p "$OUTPUT_DIR"

echo "=============================================="
echo "  Screenshot Capture for SEO/Marketing"
echo "  Output: $OUTPUT_DIR"
echo "=============================================="

# Close any existing session
agent-browser close --all 2>/dev/null || true

capture() {
  local ROUTE="$1"
  local FILENAME="$2"
  local DESC="$3"

  echo ""
  echo "Capturing: $DESC"
  agent-browser --session "$SESSION" open "$BASE_URL$ROUTE" > /dev/null 2>&1
  agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
  agent-browser --session "$SESSION" set viewport 1440 900 > /dev/null 2>&1
  agent-browser --session "$SESSION" screenshot "$OUTPUT_DIR/${FILENAME}-desktop.png" > /dev/null 2>&1
  agent-browser --session "$SESSION" set viewport 375 812 > /dev/null 2>&1  # iPhone size
  agent-browser --session "$SESSION" screenshot "$OUTPUT_DIR/${FILENAME}-mobile.png" > /dev/null 2>&1
  echo "  ✓ Saved: ${FILENAME}-desktop.png, ${FILENAME}-mobile.png"
}

# Homepage
capture "/" "homepage" "Homepage"

# Contact
capture "/contact" "contact" "Contact Page"

# Products
capture "/products" "products" "Products Page"

# Services
capture "/services/printer-rental" "printer-rental" "Printer Rental"

# Get Quote
capture "/get-quote" "get-quote" "Get Quote"

# Our Clients
capture "/our-clients" "our-clients" "Our Clients"

# Brands
capture "/brands/hp" "brand-hp" "HP Brand Page"
capture "/brands/canon" "brand-canon" "Canon Brand Page"

# Blog
capture "/blogs" "blogs" "Blog Listing"

# Close browser
agent-browser close --all 2>/dev/null || true

echo ""
echo "=============================================="
echo "  ✓ All screenshots captured"
ls -la "$OUTPUT_DIR/"
echo "=============================================="
