# Sahara Printer Website

## Development Commands
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Start production server:** `npm run start`
- **Deploy to Cloudflare:** `npm run deploy`

## Technology Stack
- Next.js 15 (App Router)
- React 19
- MUI v9.0.0 (@mui/material + @mui/icons-material)
- Tailwind CSS 3.4.1
- TypeScript 5+
- Redux Toolkit
- Framer Motion
- Zod for validation
- Wrangler for Cloudflare deployment

## Critical Rules

### MUI Icon Imports (Enforced)
- **ALWAYS** import icons as PascalCase without "Icon" suffix
- ❌ `import DeleteIcon from '@mui/icons-material/Delete'`
- ✅ `import Delete from '@mui/icons-material/Delete'`
- ❌ `import SettingsIcon from '@mui/icons-material/Settings'`
- ✅ `import Settings from '@mui/icons-material/Settings'`

### Build Cache
- If seeing stale React errors, delete `.next` folder and rebuild
- Build verification required before committing

## Project Structure
- Source code in `/src` directory
- Components and pages under `/src/app`
- Path alias: `@/*` → `/src/*`
- Global styles: `src/globals.css`

## Key Files
- Layout: `src/app/layout.tsx`
- CSS: `src/globals.css`
- Config: `tailwind.config.ts`, `postcss.config.js`
- TypeScript: `tsconfig.json`

## Node.js Requirement
- Node.js 20+ required

## Common Errors
- **MUI icon casing:** Always use PascalCase names without "Icon" suffix
- **Stale build:** Run `rm -rf .next` before `npm run build` if seeing React errors
