# Sahara Printer Website - Agent Guidelines

## Development Commands
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`

## Project Structure
- Next.js 14 app with App Router
- Source code in `/src` directory
- Components and pages under `/src/app`
- TypeScript with path alias `@/*` mapping to `/src/*`
- Styling with Tailwind CSS 3.4.1
- Global styles in `src/globals.css`

## Key Files
- Layout: `src/app/layout.tsx` (root HTML structure, fonts, metadata)
- CSS: `src/globals.css` (Tailwind imports, custom colors)
- Config: `tailwind.config.js`, `postcss.config.js`
- TypeScript: `tsconfig.json` (includes path aliases, Next.js plugin)

## Testing & Linting

### Browser Automation (agent-browser)
Installed as dev dependency. MCP server enabled — Claude Code, OpenCode, and VS Code AI extension all connect automatically.

**Setup once per machine:**
```bash
npm run browser:install        # Download Chrome for Testing
```

**Setup once per project (MCP connection):**
```bash
# Claude Code
claude mcp add agent-browser -- npx -y @agent-browser-io/browser mcp

# OpenCode & VS Code
# Already configured in .vscode/mcp.json and tests/mcp.json
```

**Run tests (dev server must be running):**
```bash
npm run dev                     # Start dev server first
npm run test:smoke              # Smoke tests (page loads, key flows)
npm run test:visual             # Visual regression (3% threshold)
npm run test:a11y               # Accessibility checks (WCAG 2.2 AA)
npm run test:screenshots         # Capture SEO/marketing screenshots
npm run test:e2e                # Run ALL test suites sequentially
```

**Quick manual check:**
```bash
npx tsx tests/scripts/smoke-tests.ts  # TypeScript smoke flows
bash tests/scripts/run-smoke-tests.sh  # Shell smoke tests
```

**Browser troubleshooting:**
```bash
npm run browser:doctor          # Diagnose browser install issues
npm run browser:doctor --fix    # Auto-repair
```

**Rules file:** `.claude/rules/browser-automation.md` — read this for element refs, naming conventions, and CLI patterns.

### Test Artifacts
- **Baselines:** `tests/e2e/visual/baselines/` (committed to repo)
- **Diffs:** `tests/e2e/visual/diffs/` (gitignored)
- **Screenshots:** `tests/e2e/screenshots/` (gitignored)

## Environment
- Node.js 20+ (from @types/node version)
- TypeScript 5+
- No environment variables visible in config

## Available Skills

### Image Generation (Antigravity Skills)
These skills are installed at `C:\Users\SAHARA\.gemini\antigravity\skills\skills\`:

| Skill | Description |
|-------|-------------|
| `imagen` | AI image generation using Google Gemini |
| `image-studio` | Intelligent routing between image generators |
| `stability-ai` | Stability AI image generation (SD3, Ultra, Core) |
| `fal-generate` / `fal-image-edit` | FAL AI image tools |
| `ai-studio-image` | AI Studio image generation |

### SEO Skills
| Skill | Description |
|-------|-------------|
| `seo-audit` | SEO audit and diagnostics |
| `seo-image-gen` | SEO image generation (requires banana extension) |

### Usage
To use Antigravity skills, reference them in prompts:
- "Use imagen to generate an image of..."
- "Use image-studio to create..."

See `C:\Users\SAHARA\.gemini\antigravity\skills\skills\<skill-name>\SKILL.md` for details.