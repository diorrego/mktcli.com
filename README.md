# mktcli.com

Marketing website for [mkt-cli](https://github.com/diorrego/mkt-cli), a Rust-based command line tool for managing ad campaigns across Meta, Google Ads, TikTok and LinkedIn from the terminal.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router

## Getting started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

The site runs at `http://localhost:8080`.

## Scripts

| Command              | What it does                 |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start dev server             |
| `npm run build`      | Production build             |
| `npm run preview`    | Preview the production build |
| `npm run lint`       | Run ESLint                   |
| `npm run test`       | Run tests once               |
| `npm run test:watch` | Run tests in watch mode      |

## Project structure

```
src/
  components/    # UI components (Navbar, Hero, Features, etc.)
  hooks/         # Custom React hooks
  lib/           # Utility functions
  pages/         # Route pages
  index.css      # Global styles, design tokens, animations
public/
  favicon.svg    # SVG favicon (preferred)
  favicon.ico    # ICO fallback
  og-image.png   # Open Graph image for social sharing
```

## Design

Dark theme with a violet-to-blue gradient palette. Uses Inter for body text and JetBrains Mono for code. Glassmorphism cards with subtle glow effects.

Key colors:

- Violet: `hsl(263 70% 57%)`
- Blue: `hsl(217 91% 55%)`
- Cyan: `hsl(191 97% 43%)`
- Background: `hsl(240 20% 4%)`

## License

MIT
