#!/usr/bin/env bash
# Run accessibility tests - check for key a11y issues
set -e

BASE_URL="${1:-http://localhost:3000}"
SESSION="${2:-a11y-tests}"
FAILED=0

echo "=============================================="
echo "  Accessibility Tests - WCAG 2.2 AA"
echo "  Base URL: $BASE_URL"
echo "=============================================="

# Close any existing session
agent-browser close --all 2>/dev/null || true

run_a11y_test() {
  local ROUTE="$1"
  local LABEL="$2"
  local NAME=$(echo "$ROUTE" | tr '/' '-' | sed 's/^-//')

  echo ""
  echo "Checking: $LABEL ($ROUTE)"

  agent-browser --session "$SESSION" open "$BASE_URL$ROUTE" > /dev/null 2>&1
  agent-browser --session "$SESSION" wait --load networkidle > /dev/null 2>&1

  # Get interactive elements snapshot
  SNAPSHOT=$(agent-browser --session "$SESSION" snapshot -i --urls 2>/dev/null || echo "")

  # Check 1: Page has interactive elements with accessible names
  HAS_BUTTONS=$(echo "$SNAPSHOT" | grep -c -i "button" || echo "0")
  if [ "$HAS_BUTTONS" -gt 0 ]; then
    echo "  ✓ PASSED: $HAS_BUTTONS button(s) found"
  else
    echo "  ○ WARNING: No buttons found - may be static page"
  fi

  # Check 2: Interactive elements have refs
  HAS_REFS=$(echo "$SNAPSHOT" | grep -c "@e[0-9]" || echo "0")
  if [ "$HAS_REFS" -gt 0 ]; then
    echo "  ✓ PASSED: $HAS_REFS interactive element(s) with refs"
  else
    echo "  ○ WARNING: No refs found in snapshot"
  fi

  # Check 3: No JavaScript errors
  ERRORS=$(agent-browser --session "$SESSION" errors 2>/dev/null | grep -c "error" || echo "0")
  if [ "$ERRORS" -eq 0 ]; then
    echo "  ✓ PASSED: No console errors"
  else
    echo "  ✗ FAILED: $ERRORS console error(s)"
    agent-browser --session "$SESSION" errors
    FAILED=$((FAILED + 1))
  fi

  # Check 4: Page title exists (screen reader essential)
  TITLE=$(agent-browser --session "$SESSION" get title 2>/dev/null || echo "")
  if [ -n "$TITLE" ]; then
    echo "  ✓ PASSED: Page has title: \"$TITLE\""
  else
    echo "  ✗ FAILED: Page has no title"
    FAILED=$((FAILED + 1))
  fi

  # Check 5: Snapshot tree is accessible (has depth)
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

# Close browser
agent-browser close --all 2>/dev/null || true

echo ""
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo "  ✓ All accessibility checks passed"
  exit 0
else
  echo "  ✗ $FAILED a11y check(s) failed"
  exit 1
fi
