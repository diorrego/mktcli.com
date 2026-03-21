
# mkt-cli Landing Page

A single-page website for mkt-cli, built for marketing professionals and frontend developers who live in the terminal.

## Visual Style

Dark background (#0a0a0f), violet to blue gradients (#7c3aed to #2563eb), with subtle glassmorphism cards and glowing accents. Inter for body text and JetBrains Mono for code blocks. The whole thing should feel premium but not overdesigned.

## What We're Building

**Navbar**
Sticky nav with backdrop blur. Logo in monospace with gradient color. Links to Features, Platforms, Install, and GitHub. A "Get Started" CTA button with gradient and glow on hover.

**Hero**
Large headline: "Marketing automation from the terminal." Subheadline about managing Meta, Google, TikTok and LinkedIn with one tool. Animated terminal that cycles through real commands with a typewriter effect. Two buttons: Install via Cargo and View on GitHub. Background has a soft animated radial gradient glow in violet and blue.

**Why mkt Section**
Three glassmorphism cards side by side explaining the core value: one command for all platforms, scriptable and automatable workflows, and safe dry-run mode for testing before shipping.

**Features Grid**
Six feature tiles in a 3x2 grid. Each has an icon and short text. Features come from the actual README: campaign management, audience creation, organic publishing, analytics, multiple output formats (table / JSON / CSV), and multi-account config via profiles. Hover shows a gradient border with a soft glow.

**Platforms Roadmap**
Four big cards showing Meta (Available in green), Google Ads, TikTok, and LinkedIn (all "Coming Soon" in gray). The Meta card has a subtle glow to signal it's live.

**Command Reference**
Tabs for each subcommand group: campaign, audience, insight, post, creative, raw. Each tab shows a dark terminal block with the real commands from the README, styled with color-coded pseudo syntax highlighting using CSS classes.

**Installation**
Two code blocks side by side: cargo install mkt-cli and binary download instructions. Below that, a numbered quick start in 3 steps.

**Architecture**
A visual section for developers showing the 7 Rust crates as badge chips with tooltips. A short explanation of the MarketingProvider trait and how the workspace is structured.

**Footer**
Logo, one-line description, links to GitHub, CONTRIBUTING, CHANGELOG, and LICENSE. Dual license note (MIT / Apache). "Built with Rust" at the bottom.

## Technical Details

All sections use scroll-triggered fade-in animations via Intersection Observer. The typewriter terminal cycles through 5 real mkt commands. Glassmorphism uses `backdrop-blur` with `bg-white/5` and `border-white/10`. Gradient text uses `bg-clip-text text-transparent`. Glow on buttons uses a box-shadow with rgba violet. Fully responsive, mobile-first.

## Files to Create or Edit

- `src/pages/Index.tsx` - main page shell
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx` - includes animated terminal
- `src/components/WhySection.tsx`
- `src/components/FeaturesGrid.tsx`
- `src/components/Platforms.tsx`
- `src/components/CommandReference.tsx`
- `src/components/Installation.tsx`
- `src/components/Architecture.tsx`
- `src/components/Footer.tsx`
- `src/index.css` - add font imports and custom CSS vars for the dark theme
