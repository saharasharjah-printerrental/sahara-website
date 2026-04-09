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
No test or lint scripts defined in package.json. Add as needed.

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