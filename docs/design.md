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

## The current page design language: the letter concept

**Read this before building any new public page.** Since the 2026-09 redesign, every primary
marketing page on this site is built in the **letter concept**, not the older `.wh-page` system.
A new page built on `.wh-page` will look like a legal page next to the rest of the site — this
happened once already, with the first three Tier-2 pages, and they had to be rebuilt.

### Which system a page uses

| System | Pages | Recognise it by |
|---|---|---|
| **Letter concept — current** | `index`, `menu`, `pods`, `partnership`, `about`, `app`, `matcha`, `pack`, `join`, `events`, `blogs`, every blog post, and the Tier-2 solution/locality pages | `<body data-page="letter-concept" data-mood="coffee">`, an `lc-nav` header, a per-page `*-letter.css` |
| **`.wh-page` — legacy, retained** | `faq`, `privacy`, `terms`, `disclaimer`, `copyright`, `survey-disclosure`, `404`, the enquiry forms | `<body data-page="faq">` etc., `<div id="ps-nav">`, `main.wh-page`, `mobile.css` |

Do not migrate the legacy pages; they are long-form text and the system suits them. Do not build
anything new on it.

### The letter-concept scaffold

```html
<link rel="stylesheet" href="assets/ps.css">
<link rel="stylesheet" href="assets/wh.css?v=N">
<link rel="stylesheet" href="assets/home-letter.css?v=N">   <!-- shared lc-* base, always -->
<link rel="stylesheet" href="assets/<page>-letter.css?v=N"> <!-- this page's furniture -->
...
<body data-page="letter-concept" data-mood="coffee">
  <a class="lc-skip" href="#letter">…</a>
  <header class="lc-nav">…</header>
  <button class="lc-motion-toggle" …>Pause motion</button>
  <main id="letter" class="<prefix>-main"> … </main>
  <div class="lc-paths">…</div>
  <footer class="lc-footer lc-footer-full">…</footer>
  <script src="assets/ps.js?v=N"></script>
  <script src="assets/letter-pages.js?v=N"></script>
```

`mobile.css` is **not** loaded on letter-concept pages; each `*-letter.css` carries its own
`@media(max-width:900px)` and `@media(max-width:850px)` blocks. The 850px block is also where the
nav collapses to the drawer.

### Shared `lc-*` primitives (from `home-letter.css`, never redefine)

`lc-nav` · `lc-mood` (the Coffee/Matcha toggle) · `lc-menu-toggle` · `a.lc-button` / `a.lc-small`
· `lc-text-link` · `lc-faq` (the FAQ section frame) · `lc-paths` (the two-up closing links) ·
`lc-footer lc-footer-full` · `lc-motion-toggle` · `lc-section-label`.

Tokens: `--lc-gutter`, `--lc-rule`, `--lc-accent` / `--lc-accent-hover` (these flip to Ceremonial
under `data-mood="matcha"`), `--lc-opening`.

### Per-page furniture and its prefix

Each page owns a two-to-four letter prefix and one stylesheet: `plp-` (pods), `ptlp-`
(partnership), `aplp-` (app), `mlp-` (menu), `alp-` (home), `slp-`
(`assets/solutions-letter.css`, shared by the Tier-2 solution and locality pages). A new page
either reuses `slp-` if it is a solution or locality page, or gets its own prefix and file.

The recurring section vocabulary, in the order pages tend to use it:

1. **Letterhead** — three small caps spans across the top: from, to, and a section number.
2. **Hero** — kicker, a rotated sticker, a two-line display `h1` whose second line is in
   `<em>` (Instrument Serif italic), one paragraph, one `lc-button`, and a photo or a type-led
   card beside it.
3. **Ticker** — a rotated marquee band in the accent colour, glyphs separated by `✳`.
4. **Statement** — a centred full-bleed statement on Oat.
5. **Numbered rows** — a two-column section, heading left, numbered `article`s right.
6. **A note band** — a quieter full-width block, usually Pale Froth.
7. **`lc-faq`** — the shared accordion.
8. **A closing band** — Dark Roast, cream type, one CTA.
9. **`lc-paths`** then the footer.

### Motion and reveals

`letter-pages.js` observes `.alp-reveal, .plp-reveal, .aplp-reveal, .mlp-reveal` and adds
`.alp-visible`. A new prefix must **piggyback on one of those four** — the established pattern is
`class="<prefix>-reveal plp-reveal"` — and define its own reveal CSS, including the
`body.lc-motion-paused` and `prefers-reduced-motion` overrides. Editing the JS selector list is
not necessary and has not been done for any page since pods.

### Two deviations from the sections below, recorded honestly

- **Dark Roast as a fill.** The colour rules below say Dark Roast and Espresso are type-only.
  Every letter-concept page uses a full-bleed Dark Roast closing band with Steam Cream type, and
  has since the redesign. Treat the band as the established exception; everything else in the
  colour system still holds, including never putting Dark Roast type on Terracotta.
- **Auto-highlights land on the first clause.** `nectarSignature()` marks the first text node of a
  display `h1`, which on a two-line letter-concept headline means the first line rather than the
  argument. This is sitewide (`pods.html`'s "Your next" is the same) and is not something a new
  page should try to fix locally. Where the highlight must be deliberate, author it as
  `<em class="plp-highlight">` instead.

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
- Any inline text highlight/mark with background + padding must include both
  `box-decoration-break:clone` and `-webkit-box-decoration-break:clone`. This is mandatory, not a
  polish detail: without it, a wrapped highlight paints as one merged box and bleeds vertically
  into adjacent lines.
- Price currency has its own colour rule: wrap only the `₹` glyph in a span and leave the
  numeric price colour untouched. On Steam Cream, Oat, and other light neutral grounds, the glyph
  is Deep Ceremonial `#3D6B4A`; on Dark Roast, Terracotta, Deep Ceremonial, or other bold/dark
  grounds, it is Steam Cream `#FAF6EE`. Existing all-Steam-Cream price lines on dark panels are
  already compliant and do not need extra wrapping.

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
- Solid Terracotta buttons must keep Steam Cream text and arrow/icon pseudo-elements in both
  default and hover/active states; hover changes the fill to the Terracotta hover token, not the
  label colour. This was a real cascade bug on the app feature cards, so verify button text and
  `::after` colour with computed styles when touching CTA rules.
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
- Coffee-profile marketing page heroes and bold panels (`about.html`, `app.html`, `pack.html`,
  quality/promise panels, download strips) use Terracotta fills with Steam Cream text. Display
  headings use `--font-display` at 700/800; functional text, labels, CTAs, form labels, and card
  copy use `--font-body`; never leave Espresso/Dark Roast text on Terracotta just because an
  earlier `.wh-page` rule appears correct in source.
- The footer is always Deep Ceremonial, with the footer wordmark served from
  `assets/icons/ps-coffee_wordmark_steam cream.png`. The about manifesto uses the served
  Terracotta circle-outline monogram from
  `assets/icons/ps-coffee_monogram_terracotta_Circle-outline.png`; do not substitute live text
  for that first manifesto mark.

## Tablet
- Portrait tablet is an active QA surface, especially the 820x1180 browser-review viewport and the
  wider 768-1024px range. When a browser annotation says tablet or tablet portrait, verify the
  affected section at that size and use targeted page/component rules instead of assuming desktop or
  the 760px mobile breakpoint covers it.
- No dedicated tablet-specific stylesheet exists. A small number of ad-hoc
  `@media (max-width:1024px)` rules are scattered in `wh.css` for specific components.
  Consolidating these ad-hoc breakpoints to a documented 768/1024/1280 grid was evaluated and
  explicitly deferred (2026-07-06); keep tablet fixes targeted unless a fresh audit justifies a
  broader breakpoint system.

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

## Audit Lock Rules

### Mobile Footer

The canonical mobile footer is the older July 14 reference: a Deep Ceremonial rounded container,
P.S. Coffee wordmark, brand links balanced in two compact columns, Pods and Help & Info as two
compact columns, four-thumbnail strip, `@pscoffee`, email capture, and compact legal/social bottom
row. Keep list gaps tight and symmetrical. Do not convert the lists into large evenly spaced grids,
do not add oversized bottom padding, and do not stretch legal links into sparse rows.

### Tablet Footer

Tablet portrait footer should use the compact all-page footer layout: balanced brand links, Pods,
Help & Info, image strip, email capture, compact legal/social row, reduced vertical height, and
`|| राधे राधे ||` shown at the right-side/footer-corner position where space allows.

### Pass/Packs Card Placeholder

The same pass placeholder visual system applies on the homepage pass showcase and the Pack page pass
explorer. Pack-page details may be collapsible below the placeholder, but the placeholder itself does
not change.

Card base: `300px x 476px`, `border-radius: 22px`, `border: 7px solid #E8DCC8`, and
`box-shadow: 0 18px 46px rgba(42,26,14,.18)`.
Inner frame: `position: absolute; inset: 0; border-radius: 15px; border: 2px solid rgba({rgb},.55)`.
Default pass colour is Terracotta `rgb(232,64,12)` / `#E8400C`. Matcha/photoGreen uses Deep
Ceremonial `rgb(61,107,74)` / `#3D6B4A`.

Bottom gradient scrim:

```css
linear-gradient(180deg,
  rgba({rgb},0) 0%,
  rgba({rgb},0) 74%,
  rgba({rgb},.4) 92%,
  rgba({rgb},.6) 100%)
```

Pack name: label `26px/800` plus name text with
`font: 800 46px/.8 'Bricolage Grotesque'`, `letter-spacing: -.055em`, `color: {hex}`,
`-webkit-text-stroke: 2.5px #FAF6EE`, `paint-order: stroke fill`, `max-width: 7ch`, and
`text-wrap: balance`.
Price: `font: 400 italic 46px/.86 'Instrument Serif'`, `letter-spacing: -.01em`, `color: {hex}`,
`-webkit-text-stroke: 2px #FAF6EE`, and `paint-order: stroke fill`.
Tags stay compact: `background: #FAF6EE`, `color: {hex}`,
`font: 800 8.5px/1.05 'Space Grotesk'`, uppercase, `border-radius: 6px`.

### Blog Index Cards

Blog index metadata is semantic and compact: serial number on the left corner, category on the right
corner, and read time as a slim chip/ribbon below. CTAs sit in a fixed bottom row with the arrow far
right, aligned across every card. Section headings stay on one line on desktop; tablet and mobile
may wrap. The newsletter/signup headline is constrained to two or three lines on desktop and wraps
naturally on smaller screens. Email fields and arrow buttons use shared button sizing, centred text,
and documented hover/focus states.

### Homepage Favourites Mobile Menu

The homepage favourites header must reuse the Menu page mobile category/filter pattern. It needs the
same type scale, compact rows, active/hover/focus colours, and no broken word wrapping. If space is
tight, use a separate full-width `View all` row instead of inventing a second category grid.

### Hero and Overlay Body Copy

Hero and overlay body paragraphs across all `.wh-page` pages use the shared Body scale and weight.
Page-specific oversized or bold body copy is not allowed unless it is a display heading. Where a hero
or overlay has a PS line and CTA, keep them in the shared bottom-anchored layout for that component
family.

### Visible Copy Punctuation

Visible site copy uses English UK punctuation and avoids em dashes. P.S. lines should use
`P.S.: ...` or another colon-based construction. Replace em dashes with a colon, comma, semicolon,
or full stop as appropriate for the sentence.
