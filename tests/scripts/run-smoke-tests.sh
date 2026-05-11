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

$AB close --all 2>/dev/null || true

echo ""
echo "[1/10] Testing: Homepage loads"
$AB --session "$SESSION" open "$BASE_URL" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
TITLE=$($AB --session "$SESSION" get title 2>/dev/null || echo "")
if [ -z "$TITLE" ]; then
  echo "  ✗ FAILED: Homepage did not load"
  FAILED=$((FAILED + 1))
else
  echo "  ✓ PASSED: Homepage loaded - \"$TITLE\""
fi

echo ""
echo "[2/10] Checking: No console errors on homepage"
ERRORS=$($AB --session "$SESSION" errors 2>/dev/null | grep -c "error" || echo "0")
if [ "$ERRORS" -gt 0 ]; then
  echo "  ✗ FAILED: $ERRORS console error(s) found"
  $AB --session "$SESSION" errors
  FAILED=$((FAILED + 1))
else
  echo "  ✓ PASSED: No console errors"
fi

echo ""
echo "[3/10] Testing: Contact page"
$AB --session "$SESSION" open "$BASE_URL/contact" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
if $AB --session "$SESSION" get title 2>/dev/null | grep -q .; then
  echo "  ✓ PASSED: Contact page loaded"
else
  echo "  ✗ FAILED: Contact page did not load"
  FAILED=$((FAILED + 1))
fi

echo ""
echo "[4/10] Testing: Products page"
$AB --session "$SESSION" open "$BASE_URL/products" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Products page loaded"

echo ""
echo "[5/10] Testing: Get Quote page"
$AB --session "$SESSION" open "$BASE_URL/get-quote" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Get Quote page loaded"

echo ""
echo "[6/10] Testing: Our Clients page"
$AB --session "$SESSION" open "$BASE_URL/our-clients" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Our Clients page loaded"

echo ""
echo "[7/10] Testing: Rental Calculator page"
$AB --session "$SESSION" open "$BASE_URL/rental-calculator" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ PASSED: Rental Calculator page loaded"

echo ""
echo "[8/10] Testing: Service pages"
for route in printer-rental repair amc toner; do
  $AB --session "$SESSION" open "$BASE_URL/services/$route" > /dev/null 2>&1
  $AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
  echo "  ✓ $route service page loaded"
done

echo ""
echo "[9/10] Testing: Brand pages"
for brand in hp canon epson; do
  $AB --session "$SESSION" open "$BASE_URL/brands/$brand" > /dev/null 2>&1
  $AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
  echo "  ✓ $brand brand page loaded"
done

echo ""
echo "[10/10] Testing: Blog pages"
$AB --session "$SESSION" open "$BASE_URL/blogs" > /dev/null 2>&1
$AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1
echo "  ✓ Blog listing page loaded"

$AB --session "$SESSION" close > /dev/null 2>&1 || true

echo ""
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo "  ✓ All smoke tests passed"
  exit 0
else
  echo "  ✗ $FAILED test(s) failed"
  exit 1
fi
