# DESIGN.md

Design playbook for the Khoj marketing site. Read this before adding sections, products, or any visual work — `CLAUDE.md` covers architecture, this covers aesthetics.

## Visual language at a glance

Editorial print magazine, not a SaaS landing page. Cream paper + ink type for warm sections, deep ink + cream type for dark sections, accents in `ember` (orange) and `rust`/`wine` (red-browns). Display serif for headings, mono caps for labels, garamond for body prose.

Mental model: every section is a **spread in a printed travel journal**. Eyebrows are the dateline, italic accents are the underlined word in a handwritten title, mono caps are stamps and field-note annotations.

## Type system

| Use | Class | Notes |
|---|---|---|
| Hero / section heading | `font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]` | Playfair Display, tight tracking |
| Italic accent inside heading | `font-italic-display text-rust` (on cream) / `text-ember/95` (on ink) | One or two accent words per heading, never the whole line |
| Eyebrow / section marker | `font-mono text-[10px] uppercase tracking-[0.4em] text-{ink/cream}/{50-55}` | Always prefixed `§ 0X — LABEL` |
| Sub-eyebrow (card label) | `font-mono text-[9px-10px] uppercase tracking-[0.25em-0.3em]` | Used for CHANNEL, FIELD STAMP, KHOJ'ED IN, PRICE, POSTAGE |
| Body prose | `font-serif text-base sm:text-lg leading-relaxed text-{ink/cream}/{65-80}` | Cormorant Garamond |
| Meta / taxonomy | `font-mono text-[9px-10px] uppercase tracking-[0.25em]` | `CATEGORY · REGION, STATE` pattern on product cards |
| Buttons | `font-mono text-[10px] uppercase tracking-[0.25em] rounded-full` | Always a pill |

**Rule of thumb on tracking:** the smaller the text, the wider the tracking. `0.4em` for top-level eyebrows, `0.3em` for sub-labels, `0.25em` for buttons and meta.

## Color usage

All tokens defined in `tailwind.config.js`. Never hardcode hex.

- **Dark sections** (`bg-ink`): Hero, FieldNotes, Footer. Cream text. Ember/wine for accents.
- **Light sections** (`paper grain`): Archive, Culture, Newsletter. Ink text. Rust/wine for accents.
- **Cards on light**: `bg-bone/85` with `border-ink/10`.
- **Cards on dark**: `bg-winedeep/40` with `border-cream/10`.
- **Accents on dark**: prefer `ember` (orange).
- **Accents on light**: prefer `rust` (warm red-brown) or `wine` (deep red).

Opacity scale is load-bearing — `/70` for body, `/55` for meta, `/40` for subtle dividers. Don't reach for `/100` on text or it loses the printed-paper softness.

## Section anatomy

Every section follows the same skeleton. Reproducing this exactly is what keeps the site feeling like one document.

```tsx
<section id="..." className="paper grain relative">  {/* or bg-ink */}
  <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
    <Reveal>
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/50">
        § 0X — SECTION LABEL
      </p>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05]">
        Plain heading words{" "}
        <span className="font-italic-display text-rust">italic accent</span>.
      </h2>
      <p className="mt-6 text-ink/70 font-serif text-base sm:text-lg max-w-md leading-relaxed">
        One or two sentences of warm voice copy.
      </p>
    </Reveal>
    {/* content */}
  </div>
</section>
```

Section padding is `py-16 sm:py-20 lg:py-24`. Container is always `max-w-7xl px-6 lg:px-10`. Section IDs match nav hrefs: `#archive`, `#field-notes`, `#culture`, `#join`.

Section markers go in order: `§ 01` Hero, `§ 02` Archive, `§ 03` Field Notes, `§ 04` Culture, `§ 05` Newsletter. Renumber if you insert one.

## Component patterns

### KHOJ'ED IN badge
Bottom-left of product image. `absolute bottom-3 left-3 bg-ink/80 text-cream font-mono text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm`. Text: `KHOJ'ED IN {REGION}.` (trailing period).

### HERO DISCOVERY badge
Top-left, featured product only. `bg-wine text-cream`. Same mono/sizing.

### CTA buttons
Pill shape, mono caps. Primary on dark: `bg-cream text-ink`. Primary on light: `bg-wine text-cream`. Always include the trailing `→` inside a `group-hover:translate-x-1` span.

### Eyebrow + italic-accent heading
Two-line pattern is the visual signature. Never use a plain heading without an eyebrow; never use an italic accent on more than ~2 words.

### Card hover
Cards: `hover:-translate-y-1 transition-transform duration-300`. Images inside cards: `group-hover:scale-105 transition-transform duration-[1200ms] ease-out`. The slow image zoom is intentional — quick zooms feel like a SaaS dashboard.

## Motion playbook

| Where | What | Why |
|---|---|---|
| Hero | Inline `motion.h1` / `motion.p` with `initial`/`animate` + staggered `delay` (0.2 → 0.35 → 0.6 → 0.8) | Entry choreography — fires on mount |
| Section reveals | Custom `<Reveal>` wrapper | IntersectionObserver + 600ms fallback. **Do not use Motion's `whileInView`** — breaks headless screenshot reviews |
| Horizontal-scroll cards (FieldNotes) | `motion.article` with `whileInView` + staggered delay | Sibling layout where Reveal would be awkward; OK because not screenshot-critical |
| Card hover | `hover:-translate-y-1` on card, `group-hover:scale-105 duration-[1200ms]` on image, `group-hover:translate-x-1` on arrow | Three-part hover language |
| Ticker | `animate-marquee` keyframe in tailwind config | Infinite horizontal scroll |

Easing curve to reuse: `[0.22, 1, 0.36, 1]` (the "expo-out" feel used everywhere).

## Copy voice

- Warm, slightly literary, never marketing-speak. "Collected discoveries, one jar at a time" not "Shop our curated collection."
- Em-dashes and ellipses are encouraged. Apostrophes use `&rsquo;` not straight `'`.
- Section eyebrows: `§ 0X — LABEL IN ALL CAPS`.
- Region tags: `KHOJ'ED IN {STATE}.` with a period.
- Meta lines on product cards: `CATEGORY · REGION, STATE` with middle dot.
- Italic accent words tend toward the evocative: *discoveries*, *the road*, *modern India*, *Taste Archive*.

## Adding a new section — checklist

1. Pick the next `§ 0X` number; update neighbouring sections if inserting.
2. Decide dark (`bg-ink`) or light (`paper grain`). Match nearby section flow — alternating is fine, three darks in a row is not.
3. Use the section skeleton above (container, padding, eyebrow, heading, body).
4. Wrap the heading block in `<Reveal>`. Wrap distinct sub-blocks in `<Reveal direction="..." delay={0.15}>` for staggered entry.
5. Add a nav entry in `Header.tsx` with matching `#id`.
6. Test at mobile (375px), tablet (768px), desktop (1280px). The `<br className="hidden md:block" />` pattern in headings is the standard way to break long titles only on desktop.

## Adding a new product — checklist

1. Add to `src/data/products.ts`. Required: `id`, `name`, `category`, `region`, `state`, `khojedIn`, `blurb`, `price`, `image`.
2. Only one product gets `featured: true` (currently Chamba Chukh). If promoting a new one, demote the old.
3. Image: drop into `public/img/` as PNG (matches existing local assets) and reference as `/img/name.png`. If using Unsplash, verify the photo ID returns 200 — don't trust IDs from the Lovable preview.
4. `blurb` is ~2 sentences, warm voice. Mention one ingredient detail and one place/people detail.
5. `khojedIn` is the state name in title case (e.g. `Haryana`, `Himachal Pradesh`). The badge uppercases it.
6. Grid placement is automatic: featured → first two non-featured fill the right column → remaining fill wide slots below.

## Image sourcing

Order of preference: local `public/img/` → verified Unsplash IDs → never Lovable CDN (auth-bridge blocks hot-linking, see CLAUDE.md). When the user pastes a macOS screenshot path with `TemporaryItems/`, ask them to save to `~/Desktop/` first; filenames will use U+202F (non-breaking thin space), so glob with `Desktop/Screenshot*<time>*.png` rather than literal quotes.

## Things to NOT do

- Don't replace `<Reveal>` with `motion.div whileInView` (see CLAUDE.md caveat).
- Don't switch the Hero to a flex column with the ticker as a sibling — leaves a cream strip at the bottom.
- Don't drop the `§ 0X — LABEL` eyebrow pattern; it's the spine of the page.
- Don't use raw hex; use the named Tailwind tokens.
- Don't add a second `featured: true` product.
- Don't introduce a new font family. Four is already the ceiling.
- Don't use straight quotes/apostrophes in JSX copy — use HTML entities.
- Don't add shadows heavier than `shadow-lg`; the design relies on borders + grain, not drop shadows.
