#!/usr/bin/env bash
# Helper: wait for dev server to be ready
# Usage: bash tests/scripts/wait-for-server.sh [url] [max_wait]

SERVER_URL="${1:-http://localhost:3000}"
MAX_WAIT="${2:-60}"
ELAPSED=0

echo "Waiting for $SERVER_URL to be ready..."

while [ $ELAPSED -lt $MAX_WAIT ]; do
  if curl -sf --max-time 3 "$SERVER_URL" > /dev/null 2>&1; then
    echo "✓ Server is ready at $SERVER_URL"
    exit 0
  fi
  sleep 2
  ELAPSED=$((ELAPSED + 2))
  echo "  ... still waiting ($ELAPSED/${MAX_WAIT}s)"
done

echo "✗ Server at $SERVER_URL did not respond after ${MAX_WAIT}s"
exit 1
