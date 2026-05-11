#!/usr/bin/env bash
# Install Chrome for Testing - run once before any tests
set -e

echo "Installing Chrome for agent-browser..."
agent-browser install --with-deps
echo "✓ Chrome installed successfully"
agent-browser doctor --offline --quick
