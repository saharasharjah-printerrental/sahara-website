#!/usr/bin/env bash
# Run smoke tests - page loads, no console errors, key flows work
set -e

BASE_URL="${1:-http://localhost:3000}"
SESSION="${2:-smoke-tests}"
FAILED=0

echo "=============================================="
echo "  Smoke Tests - Sahara Printer Website"
echo "  Base URL: $BASE_URL"
echo "  Session: $SESSION"
echo "=============================================="

AB="node $(dirname "$0")/ab.js"

# Close any existing session
$AB close --all 2>/dev/null || true

# Open homepage
echo ""
echo "[1/10] Testing: Homepage loads"
$AB --session "$SESSION" open "$BASE_URL" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
TITLE=$(agent-browser --session "$SESSION" get title 2>/dev/null || echo "")
if [ -z "$TITLE" ]; then
  echo "  ✗ FAILED: Homepage did not load"
  FAILED=$((FAILED + 1))
else
  echo "  ✓ PASSED: Homepage loaded - \"$TITLE\""
fi

# Check for console errors
echo ""
echo "[2/10] Checking: No console errors on homepage"
ERRORS=$(agent-browser --session "$SESSION" errors 2>/dev/null | grep -c "error" || echo "0")
if [ "$ERRORS" -gt 0 ]; then
  echo "  ✗ FAILED: $ERRORS console error(s) found"
  agent-browser --session "$SESSION" errors
  FAILED=$((FAILED + 1))
else
  echo "  ✓ PASSED: No console errors"
fi

# Test contact page
echo ""
echo "[3/10] Testing: Contact page"
agent-browser --session "$SESSION" open "$BASE_URL/contact" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
if agent-browser --session "$SESSION" get title 2>/dev/null | grep -q .; then
  echo "  ✓ PASSED: Contact page loaded"
else
  echo "  ✗ FAILED: Contact page did not load"
  FAILED=$((FAILED + 1))
fi

# Test products page
echo ""
echo "[4/10] Testing: Products page"
agent-browser --session "$SESSION" open "$BASE_URL/products" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Products page loaded"

# Test get-quote page
echo ""
echo "[5/10] Testing: Get Quote page"
agent-browser --session "$SESSION" open "$BASE_URL/get-quote" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Get Quote page loaded"

# Test our-clients page
echo ""
echo "[6/10] Testing: Our Clients page"
agent-browser --session "$SESSION" open "$BASE_URL/our-clients" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Our Clients page loaded"

# Test rental calculator page
echo ""
echo "[7/10] Testing: Rental Calculator page"
agent-browser --session "$SESSION" open "$BASE_URL/rental-calculator" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Rental Calculator page loaded"

# Test service pages
echo ""
echo "[8/10] Testing: Service pages"
for route in printer-rental repair amc toner; do
  agent-browser --session "$SESSION" open "$BASE_URL/services/$route" > /dev/null 2>&1
  agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
  echo "  ✓ $route service page loaded"
done

# Test brand pages
echo ""
echo "[9/10] Testing: Brand pages"
for brand in hp canon epson; do
  agent-browser --session "$SESSION" open "$BASE_URL/brands/$brand" > /dev/null 2>&1
  agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
  echo "  ✓ $brand brand page loaded"
done

# Test blog
echo ""
echo "[10/10] Testing: Blog pages"
agent-browser --session "$SESSION" open "$BASE_URL/blogs" > /dev/null 2>&1
agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ Blog listing page loaded"

# Close browser
agent-browser --session "$SESSION" close > /dev/null 2>&1 || true

echo ""
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo "  ✓ All smoke tests passed"
  exit 0
else
  echo "  ✗ $FAILED test(s) failed"
  exit 1
fi
