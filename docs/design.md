# Design System

Canonical tokens live in `assets/ps.css`'s `:root` block (~lines 37-154) — that block is the
single source of truth for colour, spacing, radius, and type scale. Don't hardcode a hex/px value
if a token already exists for it. This file summarizes the *rules* around those tokens (not
obvious from the token names alone), as they're currently **implemented in this codebase**.

For the complete, un-abridged brand kit (all 45 sections — brand voice, full colour/type/spacing
specs, logo system, photography direction, digital/motion rules, print collateral) see
[design-system.md](design-system.md). That file is the spec this implementation is measured
against; audit against it directly rather than asking for the brand kit to be re-attached.

---

## Common (all viewports)

### Colour — two profiles, never mixed
- **Profile A (Coffee & Bakery)** — `--color-terracotta` (#E8400C) + Steam Cream. The default,
  everyday profile; leads on every page except matcha-specific ones.
- **Profile B (Matcha)** — `--color-ceremonial` (#3D6B4A) + Steam Cream. Reserved for matcha
  context only (`matcha.html`, `#menu-matcha`), with one standing exception: **the site-wide
  footer is always Deep Ceremonial on every page**, coffee or matcha — a fixed closing ritual,
  not a content decision.
- Never let the two profiles touch directly — a Steam Cream/Oat gap always separates a Terracotta
  panel from a Ceremonial one, even edge-to-edge in a photo grid.
- `--color-dark-roast` and `--color-espresso` are **type-only** — never a fill/background,
  anywhere, any size. Text in either colour sitting on a Terracotta or Ceremonial fill is the most
  common build error in this system; it fails contrast and reads as a bug.
- Never in the system: pure white, pure black, any blue, grey, or teal. Need something lighter
  than Steam Cream or darker than Dark Roast? It doesn't exist — reach for Terracotta instead.
- **Nectar** (`--color-nectar-gold` family) is the one accent allowed in either profile — a
  bridge, not a third brand colour. Never a hero/page fill, never the primary CTA, never the
  nav-bar background; avoid 3+ separate Nectar elements visible in one viewport (badges/highlights
  stacking together reads as noise, not hierarchy).
- **The Nectar highlight** ("signature move" — the honey-gold word/phrase highlight inside
  headlines) is applied automatically at runtime by `nectarSignature()` in `assets/ps.js`, never
  hand-authored per page. It walks every matched headline, checks a curated phrase list (or falls
  back to the sentence's last clause) for what to mark, and calls `sitsOnBoldGround()` to check
  the live computed background colour before wrapping anything — it silently skips highlighting on
  a Terracotta/Ceremonial/Dark-Roast fill instead of ever stamping a mismatched chip on reversed
  text. New bold-fill sections are covered automatically; nothing to register. Swaps to
  `--color-bright-whisk` on matcha pages. If a highlight looks wrong, fix the phrase list or the
  bold-ground colour list in `ps.js` — don't add a CSS-only exception (tried three times before
  landing on this runtime check).

### Typography — three fonts, no exceptions
- `--font-display` → **Bricolage Grotesque** — headlines, prices, hero numbers. Weight 800
  reserved for true heroes/page titles/the one number that matters on a card; ordinary section
  and card headings run 700 ("weight is a budget, not a default").
- `--font-body` → **Space Grotesk** — everything functional: nav, buttons, labels, body copy.
- `--font-accent` → **Instrument Serif, italic only** — pull-quotes/taglines, used sparingly.
- All three are self-hosted `.woff2` in `assets/fonts/brand/`. If you see `"Archivo"`,
  `"Hanken Grotesk"`, `'Lora'`, `'Inter'`, or any other family name hardcoded anywhere, it's a
  leftover from the original template — replace with the matching `var(--font-*)` token.
- Original Google Fonts source (variable `.ttf` + SIL OFL licence + readme) lives in
  `assets/fonts/source/` for provenance — not loaded by any CSS; regenerate the `brand/` woff2s
  from there if a different subset/format is ever needed.

### Spacing & radius scale
- Spacing: 8px-based scale, `--space-1`(4px) through `--space-16`(64px).
- Radius is chosen by element size, not by component type: `--radius-sm`(6px, highlight chip) ·
  `--radius-md`(9px, buttons/inputs) · `--radius-lg`(14px, cards) · `--radius-xl`(16px,
  panels/images) · `--radius-pill`(999px, badges/avatars/pills). Don't mix two radius steps on
  nested elements of similar size — it reads as a mistake, not a choice.

### Buttons & forms
- Primary buttons: solid Terracotta fill + Steam Cream label + `--radius-md`. On matcha pages the
  same shape mirrors in Deep Ceremonial (hover-darkens to `--color-ceremonial-deep`, never
  `--color-shade-grove` — that token is a lighter mid-tone for other uses).
- Forms: default state is a Linen border on Steam Cream; focus is a 1.5px Terracotta border
  (never a browser-default blue ring); error is a 1.5px `--color-chilli` border with small Chilli
  helper text below the field (never a generic/hardcoded red); disabled is Oat fill with muted
  text. Matcha-context forms swap the same states to Deep Ceremonial.

### Motion
All custom easing curves site-wide are consolidated to one curve: `cubic-bezier(.2,0,0,1)`.
Transition durations are capped at 400ms.

---

## Desktop

- No dedicated desktop breakpoint file — `ps.css` and the un-media-queried rules in `wh.css` are
  the desktop-first baseline; `mobile.css` layers overrides on top below 760px.
- Nav bar shows the `primary:true` pages from `ps.js`'s `PAGES` array horizontally; wordmark logo
  (not monogram) in the nav.
- Homepage sections render in DOM order (no CSS `order` needed — that's a mobile-only concern).

## Tablet
- No dedicated tablet-specific stylesheet or systematic breakpoint exists. A small number of
  ad-hoc `@media (max-width:1024px)` rules are scattered in `wh.css` for specific components, but
  the site has not been audited section-by-section for a 768-1024px range. **Consolidating these
  ad-hoc breakpoints to a documented 768/1024/1280 grid was evaluated and explicitly deferred**
  (2026-07-06) — high regression risk for a purely cosmetic-consistency gain, no live defect
  found. Flag this to the user before doing tablet-specific work; it may need fresh audit first.

## Mobile
- Single primary breakpoint: `@media (max-width:760px)`, entirely in `assets/mobile.css`.
- Logo swaps from wordmark to monogram below 480px width (both Terracotta/Ceremonial profile
  variants exist in `assets/icons/`), minimum on-screen size 32px.
- Nav collapses to a hamburger-triggered drawer (`#psDrawer`), populated from the same `PAGES`
  array as desktop (including `primary:false` entries, which only appear here).
- True header height on mobile = 90px (62px nav + 28px announce-bar ribbon) — see the header
  height trap in [conventions.md](conventions.md).
- Homepage sections are reordered via flexbox `order` (see conventions.md) rather than
  reordering the HTML — current order values documented there, re-read before editing.
- Bold (non-`.is-light`) mobile heroes render edge-to-edge rather than card-inset.

## App (native mobile app — iOS/Android)
This section is reserved for the design system of the actual P.S. Coffee **native mobile app**
(the ordering app promoted on `app.html`'s marketing page) — a distinct product from this
repo's responsive website. **No native app codebase exists in this repo yet**, so there are no
real app-specific tokens, components, or platform (iOS/Android) conventions to document here —
nothing below is invented. Once app design work starts, its tokens/components/platform rules
belong here, not in the Mobile (web) section above, which covers the responsive breakpoint of
*this* website, not the app.

_(empty — fill in once native app design work begins)_

> Note: `app.html` itself (the marketing page advertising the app) is a normal content page of
> this website, not the app — see [README.md](../README.md#pages) for that page's description.
> Don't confuse the two: "Mobile" above = this site's small-viewport responsive layout; "App"
> here = the separate native product that doesn't exist in this codebase yet.
