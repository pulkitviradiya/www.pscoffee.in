# P.S. Coffee — Contributor Guide (Codex & Codex)

This file is the source of truth for both Codex and Codex when working on this repo.
Read it fully before making any change. Both agents push to the same GitHub repo → Vercel.

---

## Memory & session rules

At the start of every session, read MEMORY.md before responding. Use what you find to inform your work. Don't announce what you found, just be informed by it.

When told "remember this," write the information to MEMORY.md immediately and confirm you've done it.

**Where things go:** Apply two tests when deciding where to save something.
- Test 1: Does it prescribe behaviour? Look for words like "always," "never," "before doing X, do Y." If yes, add it to this file (AGENTS.md) under the appropriate section.
- Test 2: Does it describe a fact about the world that could change? Contact details, project status, decisions, things explicitly asked to be remembered. If yes, add it to MEMORY.md. When unsure, suggest which file you think it belongs in and ask to confirm.

**Memory hygiene rules:**
1. Keep each memory entry to two sentences max.
2. Keep root MEMORY.md under 150 lines; if it exceeds 150, compress verbose entries first, then archive the overflow to ARCHIVE.md.
3. Current-state content (active projects, contact info, working conventions) stays in MEMORY.md regardless of age.
4. When a project completes or an entry becomes outdated, move it from MEMORY.md to ARCHIVE.md automatically.
5. ARCHIVE.md is reference-only: never read at session start, only pulled up when asked about something historical.

---

## Site overview

Static HTML/CSS/JS site. No framework, no build step. Files are served directly by Vercel.
Live at: **https://www.pscoffee.in**

**Always `git pull` before starting any work** — the other agent may have pushed since your last session.

**Vercel uses `cleanUrls: true`** — URLs are `/menu`, not `/menu.html`. Never hardcode `.html` extensions
in links between pages; use bare paths or relative `.html` refs (Vercel resolves both).

---

## Asset versions

Current version numbers are in `MEMORY.md` under **Asset Versions (current)**. Always read the current N from any `*.html` file before bumping — MEMORY.md can lag by one commit if a fix landed without updating it.

Bump pattern (run from repo root, replace N and M):
```bash
sed -i '' 's/mobile.css?v=N/mobile.css?v=M/g' $(find . -name "*.html" | grep -v node_modules)
```
Only bump the file(s) you actually edited in that commit — `ps.js`, `wh.css`, and `mobile.css` each carry their own independent version number; there's no need to bump all three just because one changed. `ps.css` is **not** cache-bust versioned (no `?v=N` anywhere) — it never needs a bump.

---

## Navigation — single source of truth

**`assets/ps.js` is the only place to edit navigation.** The `PAGES` array at the top of `ps.js` drives
both the desktop nav bar and the mobile drawer. Every page (except legal pages) that should appear in
the nav must be listed here.

```js
var PAGES = [
  {href:"pack.html",  label:"P.S. Pass", n:"01", primary:true, cls:"pack-link"},
  {href:"menu.html",  label:"Menu",      n:"02", primary:true},
  ...
];
```

- `primary:true` → appears in the top nav bar
- `primary:false` → only in the mobile drawer
- `cls:"pack-link"` → adds that class to BOTH the desktop nav `<a>` and the mobile drawer `<a>`
  (the drawer rendering was fixed in v19 to pass `cls` through — do not revert)
- Footer-only pages (faq, privacy, terms, disclaimer, copyright, survey-disclosure) live in the
  **footer only** — do not add them to `PAGES`

---

## CSS architecture — critical rules

Three stylesheets load in this order on every page:

| File | Size | Purpose |
|---|---|---|
| `assets/ps.css` | ~600 lines | **Canonical design-system layer.** The `:root` block at the top (lines ~37-154) is the single source of truth for every colour, spacing, radius, and type-scale token — read it before asking "what colour is X." Also holds nav/footer base structure, buttons, badges, forms. |
| `assets/wh.css` | ~7,700 lines | **The dominant stylesheet — not just blog styles.** Despite the name (leftover from the "WatchHouse" template this site was originally built on), it drives most real page layout: hero sections, page cards, menu, footer overrides, blog posts, matcha-context colour swaps, everything. Treat "wh.css" as "the main stylesheet," not "the blog stylesheet." See the cascade-gotchas subsection below before editing it. |
| `assets/mobile.css` | ~1,400 lines | Responsive overrides, `@media (max-width: 760px)` for most rules. |

### The #1 rule: ps.css bleeds into blog pages

`ps.css` has rules that affect class names also used in blog posts — spacing, FAQ heights, and
visibility. All known conflicts are already fixed in `wh.css` using `.journal-post-body`-scoped
overrides. Do not re-add inline `padding-block`, `max-height`, or `overflow` overrides to blog
files — wh.css handles them.

### wh.css version bumping

`wh.css` is cache-busted with a `?v=N` query string in every blog HTML file:
```html
<link rel="stylesheet" href="../assets/wh.css?v=N">
```

**Every time you edit `wh.css`, bump the version number by 1 in all blog files** (`blog/*.html`).
Check the current version in any `blog/*.html` before editing. Failing to bump means users see a
cached old version.

### wh.css cascade gotchas — read this before trusting any rule you find

`wh.css` was iteratively rebuilt several times without removing earlier passes, so it contains:
- **Multiple `:root` blocks** (currently 5) redefining the same custom properties — e.g. `--wh-gut`,
  `--wh-ink`, `--wh-serif` are each declared 2-4 times at different points in the file, sometimes
  with wrong/legacy values (a stale `:root` block once silently overwrote `--wh-gut`, the site's
  core side-padding token, breaking desktop/mobile padding site-wide for an unknown period — see
  MEMORY.md's 2026-07-07 entry). **Never assume the first (or only) declaration you find for a
  custom property is the one that wins — grep for every occurrence.**
- **The same selector re-declared 2-5 times** across the file (e.g. `.wh-page-card a`,
  `.menu-filter-wh button`), sometimes contradicting each other. A rule with `!important` **always**
  beats a rule without it, regardless of specificity or file order. Among two rules that both have
  `!important`, the one with **higher specificity** wins regardless of order; if specificity is
  equal, the **later one in the file** wins.
- **Practical rule:** before concluding "the site does X," grep the selector across `ps.css`,
  `wh.css`, and `mobile.css`, read every match, and work out which one actually wins using the two
  rules above. Cross-check with a live `getComputedStyle()` check in the browser if unsure — several
  real bugs this session (invisible button text, unreadable text-over-photo, a broken padding token)
  were caused by a later blanket rule silently overriding an earlier component-specific one that
  looked correct in isolation.

---

## Design system — reference

All tokens live in `assets/ps.css`'s `:root` block (~lines 37-154) — that block is the single
source of truth for colour, spacing, radius, and type scale. Don't hardcode a hex/px value if a
token already exists for it. This section summarizes the *rules* around those tokens (not obvious
from the token names alone), distilled from a full brand-kit audit done 2026-07-06/07 — see
MEMORY.md for the detailed per-fix history.

### Colour — two profiles, never mixed
- **Profile A (Coffee & Bakery):** `--color-terracotta` (#E8400C) + Steam Cream. The default,
  everyday profile — leads on every page except matcha-specific ones.
- **Profile B (Matcha):** `--color-ceremonial` (#3D6B4A) + Steam Cream. Reserved for matcha
  context only (`matcha.html`, `#menu-matcha`), with one standing exception: **the site-wide footer
  is always Deep Ceremonial, on every page, coffee or matcha** — it's a fixed closing ritual, not a
  content decision.
- **Never let the two profiles touch directly** — a Steam Cream/Oat gap always separates a
  Terracotta panel from a Ceremonial one, even edge-to-edge in a photo grid.
- **`--color-dark-roast` and `--color-espresso` are type-only — never a fill/background**, anywhere,
  any size. Text in either colour sitting on a Terracotta or Ceremonial fill is the single most
  common build error in this system; it fails contrast and reads as a bug.
- **Never in the system:** pure white, pure black, any blue, grey, or teal. Need something lighter
  than Steam Cream or darker than Dark Roast? It doesn't exist — reach for Terracotta instead.
- **Nectar** (`--color-nectar-gold` family) is the one accent allowed in *either* profile — a bridge,
  not a third brand colour. Rules: never a hero/page fill, never the primary CTA, never the nav-bar
  background, and avoid 3+ separate Nectar elements visible in one viewport (badges/highlights
  stacking together reads as visual noise, not a hierarchy).
- **The Nectar highlight ("signature move")** — the honey-gold word/phrase highlight inside
  headlines — is applied automatically at runtime by `nectarSignature()` in `assets/ps.js`, not
  hand-authored per page. It walks every matched headline, checks a curated phrase list (or falls
  back to the sentence's last clause) for what to mark, and calls `sitsOnBoldGround()` to check the
  live computed background colour before wrapping anything — it silently skips highlighting on a
  Terracotta/Ceremonial/Dark-Roast fill instead of ever stamping a mismatched chip on top of reversed
  text. If you add a new bold-fill section with a headline, you don't need to register it anywhere —
  the runtime check covers it automatically. On matcha pages the highlight fill swaps to
  `--color-bright-whisk`. If a highlight looks wrong, fix the phrase list or the bold-ground colour
  list in `ps.js`, don't add a new CSS-only exception (that was tried three times before landing on
  this runtime check — see MEMORY.md).

### Typography — three fonts, no exceptions
`--font-display` (Bricolage Grotesque, headlines/prices/hero numbers), `--font-body` (Space Grotesk,
everything functional: nav, buttons, labels, body copy), `--font-accent` (Instrument Serif, **italic
only** — pull-quotes/taglines, used sparingly). If you see `"Archivo"`, `"Hanken Grotesk"`, or any
other family name hardcoded anywhere, it's a leftover from the original WatchHouse template and
should be replaced with `var(--font-display)` or `var(--font-body)` — both were fully purged from
`ps.css` in 2026-07-06/07 but could resurface if copied from an old snippet. Bricolage 800 is
reserved for true heroes/page titles/the one number that matters on a card — ordinary section and
card headings should run 700, not a blanket 800 ("weight is a budget, not a default").

### Spacing & radius scale
Spacing is an 8px-based scale: `--space-1`(4) through `--space-16`(64). Radius is chosen by element
size, not by component type: `--radius-sm`(6px, highlight chip) · `--radius-md`(9px, buttons/inputs)
· `--radius-lg`(14px, cards) · `--radius-xl`(16px, panels/images) · `--radius-pill`(999px, badges/
avatars/pills). Don't mix two radius steps on nested elements of similar size — it reads as a
mistake, not a choice.

### Buttons & forms
Primary buttons are solid Terracotta fill + Steam Cream label + `--radius-md`; on matcha pages the
same shape mirrors in Deep Ceremonial (hover-darkens to `--color-ceremonial-deep`, **not**
`--color-shade-grove` — that token is a lighter mid-tone for other uses, a real bug once wired it
into the wrong hover rule). Forms: default state is a Linen border on Steam Cream; focus is a 1.5px
Terracotta border (never a browser-default blue ring); error is a 1.5px `--color-chilli` border with
small Chilli helper text below the field (never a generic/hardcoded red); disabled is Oat fill with
muted text. Matcha-context forms swap the same states to Deep Ceremonial.

---

## Mobile CSS — architecture & rules

### All mobile changes go in `assets/mobile.css` only

Zero desktop impact. The breakpoint is `@media (max-width: 760px)` for most rules.
`@keyframes` blocks must live **outside** any `@media` block (browsers discard them otherwise).

### Header height trap — critical

`--wh-header-h` (62px) only captures the nav height. The announce bar above it adds **28px**.
The true header bottom = **90px**. All `.page-top` spacers must account for both:

```css
/* Generic pages — inside @media (max-width: 760px) */
.page-top {
  height: calc(var(--wh-header-h) + 28px) !important;  /* 62 + 28 = 90px */
}
```

The menu page has a competing rule in `wh.css` at higher specificity — it is overridden in
`mobile.css` with a matching `body[data-page="menu"]` scoped rule. If you add a new page and
the hero content is hidden under the header, check `wh.css` for a `body[data-page="X"] .page-top`
rule and add a corresponding override in `mobile.css`.

### wh.css specificity trap

`wh.css` contains page-scoped rules like:
```css
body[data-page="menu"] .page-top { height: var(--wh-header-h) !important; }
```
This has specificity 0,2,0 — higher than mobile.css's `.page-top` (0,1,0) — so it wins even
against `!important`. To beat it from mobile.css, match the specificity:
```css
body[data-page="menu"] .page-top { height: calc(var(--wh-header-h) + 28px) !important; }
```

### Mobile homepage section order

The homepage body uses `display: flex; flex-direction: column` on mobile so sections can be
reordered with `order` without touching the HTML (desktop unaffected).

Current order values (`assets/mobile.css`, inside `@media (max-width: 760px)`, all scoped to
`body[data-page="home"]`) — always re-read this block before adding to it, it changes:
```
#ps-nav -10 · .page-top -9 · .wh-banners -8 · .wh-modern -7 · .wh-home-shop -6 ·
.wh-favourites -5 · .wh-subscription -4 · .wh-locations -3 · .ps-app-callout -2 ·
.ps-section-buffer -1 · .ps-our-story 0
```
Everything after this list falls back to default DOM order (all order:0, sorted by source position).

To change the mobile order: adjust the `order` values in `mobile.css`. Use more negative numbers to
move a section earlier; remove a rule entirely to let it fall back into DOM sequence. **When
inserting a new pinned section (including a plain spacer/buffer div), it MUST get an explicit
`order` value placed between its intended neighbours — a section with no `order` rule defaults to
`0` and will render after every negative-ordered section, not where its DOM position suggests.**
This exact mistake shipped once already (a cream buffer div rendered after `.ps-our-story` instead
of between `.ps-app-callout` and `.ps-our-story` because it had no `order` rule) — leave a numeric
gap between values so future insertions don't require renumbering everything.

---

## Blog posts — rules

### Structure
Each blog post in `blog/` follows this structure:
- Inline `<style>` block for post-specific overrides (font sizes, colours)
- Body wrapped in `<div class="journal-post-body">`
- Sections in `<div class="section">` divs
- FAQ at the bottom in `<div class="faqs">` with `.faq-item / .faq-q / .faq-a` elements

### FAQ toggle
The FAQ toggle is handled by `assets/ps.js` (`faq()` function). It adds/removes the `.open` class on
`.faq-item`. **Do not add an inline `<script>` in blog posts to handle FAQ clicks** — it will fire
twice and break the toggle. This bug was fixed; don't reintroduce it.

### Blog kicker line
Every blog post has a kicker paragraph that reads: `The P.S. Blog. · [category] · [topic]`
Use "The P.S. Blog." — not "The P.S. Journal." (renamed).

### Naming
- "Blogs" / "Blog" everywhere user-visible — not "Journal"
- CSS class names still use `journal-` prefix internally (`.journal-post-body`, `.journal-faq`, etc.)
  — do not rename these, it would break all styles

---

## Photos — rules

All site images live in `assets/photos/site/` (webp format, naming convention:
`{page}-{description}-{desktop|mobile}.webp`).

- Every image added must be referenced in an HTML file. **No orphan images.**
- When replacing a hero image with a cropped version, **delete the old file** — don't just add the new one.
- `assets/photos/*.webp` (root level, no `/site/` subfolder) = P.S. Pass product images used on `pack.html`.
- Images in `assets/photos/site/` are cached immutably by Vercel for 1 year. If you replace a file,
  **rename it** — Vercel will serve the old cached version otherwise.

---

## Never commit these

Already in `.gitignore` — but do not force-add them:

- `.Codex/` — Codex internal session config
- `.image-slots.state.json` — tool-generated state file
- `.DS_Store` — macOS metadata
- `node_modules/` — no dependencies exist, but just in case
- `*.xlsx` — financial workbooks copied temporarily for reading; delete before committing

---

## Sitemap

`sitemap.xml` must be updated when adding or removing pages. Each `<url>` entry uses the clean URL
(no `.html`). Legal pages (privacy, terms, disclaimer, copyright, survey-disclosure) are intentionally
excluded from the sitemap.

---

## Vercel & deployment

- Push to `main` → Vercel auto-deploys. No manual deploy needed.
- `vercel.json` sets: `cleanUrls: true`, `trailingSlash: false`, cache headers.
- The `/story` and `/story.html` URLs redirect to `/about` (legacy redirects — do not remove).

---

## Menu — rules

### Source of truth for items and prices
The COGS_Master xlsx is authoritative for menu items and selling prices. Before any menu update, read `MEMORY.md` for the file path. Codex sandbox cannot read from `~/Documents` directly — copy the xlsx to the repo root, use it, then delete it before committing.

### Adding or removing a menu filter category
Do all five steps in one commit:
1. Add/remove the `<section class="menu-category-wh" data-cat="X" id="menu-X">` block in `menu.html`
2. Add/remove the `<button data-filter="X">` in the `.menu-filter-wh` nav in `menu.html`
3. Bump `grid-template-columns` in `.menu-filter-wh` in `wh.css` — one `auto` per button, plus `1fr` at the end for the span (e.g. 5 buttons = `auto auto auto auto auto 1fr`)
4. Add/remove the `<a data-fav-cat="X">` tab in `.wh-favourites nav` in `index.html`
5. Add/remove `'X'` in the `['coffee','matcha','protein','food']` fetch array in `index.html`
6. Add a colour rule for `button[data-filter="X"]` and `#menu-X h2` in the theme block in `wh.css`

### Card P.S. note alignment
`margin-top: auto` must be on `.menu-product-note`, **not** `.menu-product-price`. This pins the P.S. note + price row to the bottom of every card, keeping adjacent cards visually level regardless of title or recipe text length.

---

## What NOT to do

- **Do not edit `ps.css` for blog-only fixes** — use `.journal-post-body`-scoped overrides in `wh.css` instead
- **Do not make mobile fixes in `ps.css`** — all responsive overrides belong in `mobile.css`; `ps.css` is desktop-only truth
- **Do not add FAQ click handlers inline in blog posts** — `ps.js` handles it
- **Do not hardcode `padding-block` on `.section` in blog inline CSS** — wh.css already resets it
- **Do not use `story.html`** — that page no longer exists; the URL is `about.html`
- **Do not add footer-only pages to the top nav** — FAQ and legal pages belong in the footer only
  (already wired in `ps.js` `footHTML()`)
- **Do not forget to bump `wh.css?v=N`** when editing `wh.css`
- **Do not rename CSS classes** like `.journal-post-body`, `.journal-faq` — they are used across
  wh.css, mobile.css, and all blog HTML files
- **Do not set `.page-top` to `var(--wh-header-h)` alone** — the announce bar (28px) is not included
  in that variable; always use `calc(var(--wh-header-h) + 28px)`
- **Do not put `@keyframes` inside `@media` blocks** — they are silently ignored by browsers
- **Do not make homepage section order changes in the HTML** — use CSS `order` in mobile.css;
  the flex reorder system is already in place
- **Do not add a new homepage section (or spacer/buffer div) without giving it an explicit `order`
  value** in mobile.css's flex-reorder block — an un-ordered element defaults to `order:0` and will
  render after every negative-ordered section regardless of its actual DOM position
- **Do not write a component's text/background colour rule without `!important`** if it sits inside
  `wh.css` — a later, broader blanket rule (e.g. `p{color:espresso!important}`) will silently win
  over an earlier, correct, non-important component rule. This has caused real invisible-text bugs;
  check the rule actually renders via `getComputedStyle()`, don't trust the source alone
- **Do not bundle unrelated selectors into a `body[data-page="X"] .wh-page-kicker{color:...}`-style
  rule** just because they happen to want the same colour in one instance — `.wh-page-card a` was
  once accidentally grouped into a kicker-colour rule, which fought its own (correct) button
  background rule and made the button text invisible. Give each component its own rule even if the
  value is identical today
- **Do not assume a screenshot from the preview tool is accurate** if it contradicts a
  `getComputedStyle()`/`getBoundingClientRect()` check on the same element — the local preview has
  shown stale/incorrect renders in this session even after a cache-busted reload. Trust direct DOM
  measurement over the screenshot when they disagree, and re-fetch with a `?_cb=<timestamp>` query
  param if a CSS change doesn't seem to be taking effect
