#!/usr/bin/env bash
# Run visual regression tests - compare screenshots against baselines
# Threshold: 3% pixel difference (moderate tolerance for anti-aliasing/fonts)
set -e

BASE_URL="${1:-http://localhost:3000}"
SESSION="${2:-visual-tests}"
THRESHOLD=0.03
BASELINES_DIR="tests/e2e/visual/baselines"
DIFFS_DIR="tests/e2e/visual/diffs"
FAILED=0

mkdir -p "$DIFFS_DIR"

echo "=============================================="
echo "  Visual Regression Tests"
echo "  Threshold: ${THRESHOLD}% pixel difference"
echo "  Baselines: $BASELINES_DIR"
echo "=============================================="

# Close any existing session
agent-browser close --all 2>/dev/null || true

run_test() {
  local ROUTE="$1"
  local LABEL="$2"
  local NAME=$(echo "$ROUTE" | tr '/' '-' | sed 's/^-//')

  echo ""
  echo "Testing: $LABEL ($ROUTE)"

  agent-browser --session "$SESSION" open "$BASE_URL$ROUTE" > /dev/null 2>&1
  agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1

  local BASELINE="$BASELINES_DIR/$NAME.png"
  local CURRENT="$DIFFS_DIR/${NAME}-current.png"
  local DIFF="$DIFFS_DIR/${NAME}-diff.png"

  # Capture current screenshot
  agent-browser --session "$SESSION" screenshot "$CURRENT" > /dev/null 2>&1

  if [ -f "$BASELINE" ]; then
    # Compare against baseline
    agent-browser --session "$SESSION" diff screenshot \
      --baseline "$BASELINE" \
      --threshold "$THRESHOLD" \
      -o "$DIFF" 2>/dev/null || true

    # Check diff ratio
    DIFF_OUTPUT=$(agent-browser --session "$SESSION" diff screenshot \
      --baseline "$BASELINE" \
      --threshold "$THRESHOLD" \
      -o /dev/null 2>&1 || true)

    if echo "$DIFF_OUTPUT" | grep -q "PASSED\|passed"; then
      echo "  ✓ PASSED: No visual regression"
    else
      echo "  ✗ FAILED: Visual regression detected"
      echo "  Diff saved to: $DIFF"
      FAILED=$((FAILED + 1))
    fi
  else
    # First run - capture baseline
    echo "  ○ BASELINE: No baseline found, capturing..."
    cp "$CURRENT" "$BASELINE"
    echo "  ✓ Baseline captured at $BASELINE"
    echo "  (This is expected on first run)"
  fi

  agent-browser --session "$SESSION" close > /dev/null 2>&1 || true
}

# Test key pages
run_test "/" "Homepage"
run_test "/contact" "Contact"
run_test "/products" "Products"
run_test "/get-quote" "Get Quote"
run_test "/our-clients" "Our Clients"
run_test "/services/printer-rental" "Printer Rental"
run_test "/brands/hp" "HP Brand"
run_test "/blogs" "Blog Listing"

# Close browser
agent-browser close --all 2>/dev/null || true

echo ""
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo "  ✓ All visual tests passed"
  exit 0
else
  echo "  ✗ $FAILED visual regression(s) detected"
  exit 1
fi
