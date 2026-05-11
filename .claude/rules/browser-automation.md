# Browser Automation Rules - for Claude Code, OpenCode, and VS Code AI Extension

## agent-browser Quick Reference

agent-browser is a CLI tool for browser automation. All three AI tools (Claude Code, OpenCode, VS Code) connect to it via MCP.

### Core Commands

```bash
agent-browser open <url>          # Open URL
agent-browser snapshot            # Get accessibility tree with element refs
agent-browser click @e1           # Click element by ref (from snapshot)
agent-browser fill @e2 "text"     # Fill form field by ref
agent-browser screenshot          # Take screenshot
agent-browser wait --load networkidle  # Wait for page load
agent-browser close               # Close browser
```

### Element References

After running `snapshot`, elements are referenced as `@e1`, `@e2`, `@e3`, etc.
Use these refs instead of CSS selectors for reliable automation.

```bash
agent-browser snapshot -i              # Interactive elements only
agent-browser snapshot --urls          # Include link URLs
agent-browser snapshot -c             # Compact output
agent-browser snapshot -d 3           # Limit depth
```

### Session Isolation

Always use `--session <name>` to isolate tests. Never run without a session.

```bash
agent-browser --session my-test open http://localhost:3000
agent-browser --session my-test snapshot
agent-browser --session my-test click @e1
agent-browser --session my-test close
```

### Visual Diff

```bash
# Capture baseline (first run)
agent-browser screenshot tests/e2e/visual/baselines/homepage.png

# Compare against baseline
agent-browser diff screenshot --baseline tests/e2e/visual/baselines/homepage.png --threshold 0.03

# Scoped diff
agent-browser diff screenshot --baseline baseline.png --selector "#main" --threshold 0.03
```

### Authenticated Routes (Admin)

```bash
# Login to admin (you provide credentials)
agent-browser auth login admin

# Then navigate to protected routes
agent-browser --session admin open http://localhost:3000/admin/dashboard
```

### Naming Conventions

| Purpose | Path Pattern |
|---------|-------------|
| Baseline screenshots | `tests/e2e/visual/baselines/[route-name].png` |
| Current screenshots | `tests/e2e/visual/diffs/[route-name]-current.png` |
| Diff output | `tests/e2e/visual/diffs/[route-name]-diff.png` |
| SEO screenshots | `tests/e2e/screenshots/[route-name]-[device].png` |
| Test sessions | `--session smoke`, `--session visual`, `--session admin` |
| Element refs | `@e1`, `@e2`, ... (from `snapshot` output) |

### Test Scripts

```bash
npm run test:smoke       # Run all smoke tests
npm run test:visual      # Run visual regression tests
npm run test:a11y        # Run accessibility tests
npm run test:screenshots # Capture SEO screenshots
npm run test:e2e         # Run all test suites

npx tsx tests/scripts/smoke-tests.ts   # TypeScript smoke flows
```

### Key Patterns

**Always use refs from snapshot:**
```
1. agent-browser --session test open <url>
2. agent-browser --session test snapshot -i
3. Use @eN refs from output for interactions
```

**Always wait for page to load:**
```bash
agent-browser --session test wait --load networkidle
```

**Close session when done:**
```bash
agent-browser --session test close
```

**Multiple commands in batch:**
```bash
agent-browser batch "open http://localhost:3000" "wait --load networkidle" "snapshot -i" "screenshot"
```

### Troubleshooting

```bash
agent-browser doctor                    # Diagnose install issues
agent-browser doctor --fix             # Auto-repair
agent-browser console                  # View browser console
agent-browser errors                   # View page errors
agent-browser screenshot --annotate   # Labeled screenshot with refs
```
