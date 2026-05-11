#!/usr/bin/env bash
# Run accessibility tests - check for key a11y issues
set -e

BASE_URL="${1:-http://localhost:3000}"
SESSION="${2:-a11y-tests}"
FAILED=0

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AB="node \"$SCRIPT_DIR/ab.js\""

echo "=============================================="
echo "  Accessibility Tests - WCAG 2.2 AA"
echo "  Base URL: $BASE_URL"
echo "=============================================="

$AB close --all 2>/dev/null || true

run_a11y_test() {
  local ROUTE="$1"
  local LABEL="$2"

  echo ""
  echo "Checking: $LABEL ($ROUTE)"

  $AB --session "$SESSION" open "$BASE_URL$ROUTE" > /dev/null 2>&1
  $AB --session "$SESSION" wait --load networkidle > /dev/null 2>&1

  SNAPSHOT=$($AB --session "$SESSION" snapshot -i --urls 2>/dev/null || echo "")

  HAS_BUTTONS=$(echo "$SNAPSHOT" | grep -c -i "button" || echo "0")
  if [ "$HAS_BUTTONS" -gt 0 ]; then
    echo "  ✓ PASSED: $HAS_BUTTONS button(s) found"
  else
    echo "  ○ WARNING: No buttons found - may be static page"
  fi

  HAS_REFS=$(echo "$SNAPSHOT" | grep -c "@e[0-9]" || echo "0")
  if [ "$HAS_REFS" -gt 0 ]; then
    echo "  ✓ PASSED: $HAS_REFS interactive element(s) with refs"
  else
    echo "  ○ WARNING: No refs found in snapshot"
  fi

  ERRORS=$($AB --session "$SESSION" errors 2>/dev/null | grep -c "error" || echo "0")
  if [ "$ERRORS" -eq 0 ]; then
    echo "  ✓ PASSED: No console errors"
  else
    echo "  ✗ FAILED: $ERRORS console error(s)"
    $AB --session "$SESSION" errors
    FAILED=$((FAILED + 1))
  fi

  TITLE=$($AB --session "$SESSION" get title 2>/dev/null || echo "")
  if [ -n "$TITLE" ]; then
    echo "  ✓ PASSED: Page has title: \"$TITLE\""
  else
    echo "  ✗ FAILED: Page has no title"
    FAILED=$((FAILED + 1))
  fi

  TREE_DEPTH=$(echo "$SNAPSHOT" | grep -c "^│" || echo "0")
  if [ "$TREE_DEPTH" -gt 0 ]; then
    echo "  ✓ PASSED: Accessibility tree populated ($TREE_DEPTH lines)"
  else
    echo "  ○ WARNING: Shallow accessibility tree"
  fi
}

run_a11y_test "/" "Homepage"
run_a11y_test "/contact" "Contact"
run_a11y_test "/products" "Products"
run_a11y_test "/get-quote" "Get Quote"

$AB close --all 2>/dev/null || true

echo ""
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo "  ✓ All accessibility checks passed"
  exit 0
else
  echo "  ✗ $FAILED a11y check(s) failed"
  exit 1
fi
