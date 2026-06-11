# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (defaults to http://localhost:5173, falls back to 5174 if busy).
- `npm run build` — type-checks with `tsc -b` then bundles via Vite.
- `npm run lint` — ESLint over the project (uses the new flat-config `eslint.config.js`).
- `npm run preview` — serves the production build.

There is no test runner configured.

## Design playbook

For anything visual — adding sections, products, tweaking layout/motion — read `DESIGN.md` in the repo root. It documents the type system, color/opacity scale, section skeleton, component patterns (badges, eyebrows, CTAs), motion playbook, copy voice, and per-task checklists.

## Stack

React 19 + Vite + TypeScript, Tailwind v3 (legacy `@tailwind` directives in `src/index.css`, not v4 `@import`), Zustand for cart state, Motion (the successor package to framer-motion, imported as `motion/react`) for animations, lucide-react for icons.

## Architecture

This is a single-page marketing site — `src/App.tsx` is just a vertical composition of section components in scroll order, plus the fixed `Header` and the slide-in `CartDrawer`. There is no router. Each section is self-contained and owns its own data and state.

Data lives in `src/data/` (`products.ts`, `notes.ts`). Sections import directly from there; there is no fetching layer. Local images go in `public/img/` and are referenced as absolute paths like `/img/chamba-chukh.png`.

### Cart state (`src/store/cart.ts`)

Single Zustand store holding both the cart contents AND the drawer's open/close state. Components subscribe with fine-grained selectors (`useCart(s => s.totalCount())`) to avoid full re-renders. Adding to cart from a product card automatically opens the drawer.

### Archive grid layout

The Archive section uses an asymmetric 12-column grid on `lg+`: featured product spans 6 cols × 2 rows, two smaller cards take 3 cols each on the right, the remaining wide card takes 6 cols below. On `sm` it's 2 columns, on mobile it stacks. The "featured" product is selected by the `featured: true` flag in `products.ts` — only one product should have it.

### Reveal component (important caveat)

`src/components/Reveal.tsx` is a **custom** IntersectionObserver-based fade-up wrapper, not Motion's `whileInView`. It exists specifically because Motion's `whileInView` doesn't fire IntersectionObserver during headless full-page screenshots, which made elements stay invisible in design reviews. Reveal additionally sets a 600ms `setTimeout` fallback that forces visibility even if the observer never fires.

**Do not replace Reveal with `motion.div whileInView` or `motion.section whileInView`** — that breaks screenshot review. Inline Motion components (`motion.h1` with `initial`/`animate`, no `whileInView`) are fine because they fire immediately on mount; those are used in the Hero for the entry choreography.

### Hero structure

The hero is `h-screen min-h-[640px]` with the image as a full-bleed `absolute inset-0`. The ticker, FIELD STAMP card, and content block all overlay the image as absolute children. Don't switch to a flex column layout with the ticker as a sibling — that left a thin cream strip at the bottom of the viewport because of the fixed-header offset math.

### Tailwind theme

Custom palette tokens in `tailwind.config.js` — use semantic names (`ink`, `wine`, `winedeep`, `cream`, `parchment`, `sand`, `rust`, `ember`, `bone`, `mutedink`) rather than raw hex. Font families are `font-display` (Playfair Display), `font-serif` (Cormorant Garamond), `font-sans` (Inter), `font-mono` (JetBrains Mono). Italic display variant is handled via the `.font-italic-display` utility class in `src/index.css` (Playfair Display italic).

The marquee ticker uses a custom `animate-marquee` keyframe defined in the Tailwind config.

### `.paper` and `.grain` utilities

Cream-background sections use `className="paper grain"` to get the warm gradient background plus a subtle dot-noise overlay (`.grain::after`). The grain effect requires `position: relative` on the parent, which `.grain` provides.

### Decorative `<br />` hint

Many display headings have `<br className="hidden md:block" />` so the line break only fires on desktop. Preserve this when editing copy.

## Conventions to maintain

- All eyebrow labels and meta strings use the pattern `font-mono text-[10px] uppercase tracking-[0.4em] text-{color}/55`. Match it for new section markers (`§ 05 — ...`).
- Product card taxonomy line is uppercase: `{CATEGORY} · {REGION}, {STATE}`.
- Buttons that look like CTAs use uppercase mono tracking-[0.25em] inside a `rounded-full` pill.
- Section IDs match the nav hrefs: `#archive`, `#field-notes`, `#culture`, `#join`.

## Image strategy

Lovable's preview CDN blocks hot-linking via an `auth-bridge` redirect (`net::ERR_BLOCKED_BY_ORB`), and `curl` also fails — it returns the auth HTML instead of the JPG. Use one of:
1. Unsplash URLs (the verified IDs in `products.ts`/`notes.ts`/`Hero.tsx`/`Culture.tsx` all return 200).
2. Local assets dropped into `public/img/` — reference as `/img/name.png` in data files.

When the user shares a macOS screenshot path containing `TemporaryItems/`, the drag-drop sandbox often expires before Bash can `cp` it. Have them save to `~/Desktop/` first, then copy via a glob like `Desktop/Screenshot*<time>*.png` because the filenames use a non-breaking thin space (U+202F) that breaks literal-quoted paths.

## Git

Remote: `https://github.com/ivarunchaudhary/khojdemo.git`, default branch `master`. `.gitignore` excludes `.reference/` (working screenshots from design reviews), `.claude/`, `.code-review-graph/`, and `src/assets/` (unused Vite scaffold leftovers — don't restore them).
