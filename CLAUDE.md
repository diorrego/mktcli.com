# CLAUDE.md

## Project

This is the marketing website for mkt-cli, a Rust CLI tool for managing ad campaigns across Meta, Google Ads, TikTok and LinkedIn. It is a single-page React app built with Vite, TypeScript and Tailwind CSS.

## Commands

- Install: `npm install`
- Dev server: `npm run dev` (runs on port 8080)
- Build: `npm run build`
- Lint: `npm run lint`
- Test all: `npm run test`
- Test watch: `npm run test:watch`
- Preview build: `npm run preview`

## Code style

- Functional components with arrow functions
- Use the `@/` alias for all imports from `src/`
- Tailwind for styling, no inline style objects unless truly necessary
- shadcn/ui components live in `src/components/ui/`
- Custom components go directly in `src/components/`
- Pages go in `src/pages/`
- Hooks go in `src/hooks/`
- Utility functions go in `src/lib/`

## Design tokens

All colors use HSL CSS variables defined in `src/index.css`. Never use hardcoded hex or RGB values in components. The main brand tokens are `--violet`, `--blue`, `--cyan`, and `--green-neon`. The site is dark theme only.

## Fonts

- Body: Inter (sans-serif)
- Code / terminal: JetBrains Mono (monospace)

Both are loaded via Google Fonts in `src/index.css`.

## Writing style

All user-facing copy on the site must be in English. Write in a natural, human tone. Avoid em dashes. Keep it clear and direct.

## Key conventions

- This is a static marketing site with no backend or API calls
- All content is hardcoded in components, there is no CMS
- The site uses React Router but currently only has one page (Index)
- Animations use Tailwind keyframes and CSS classes defined in `src/index.css`
- Glass effects use the `.glass` and `.glass-dark` utility classes
- Gradient text uses the `.gradient-text` class
