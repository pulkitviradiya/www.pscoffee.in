# P.S. Coffee — Contributor Guide (Claude & Codex)

This file is the source of truth for both Claude Code and Codex when working on this repo.
Read it fully before making any change. Both agents push to the same GitHub repo → Vercel.

---

## Site overview

Static HTML/CSS/JS site. No framework, no build step. Files are served directly by Vercel.
Live at: **https://www.pscoffee.in**

**Always `git pull` before starting any work** — the other agent may have pushed since your last session.

**Vercel uses `cleanUrls: true`** — URLs are `/menu`, not `/menu.html`. Never hardcode `.html` extensions
in links between pages; use bare paths or relative `.html` refs (Vercel resolves both).

---

## Asset versions

Current version numbers are in memory (`project_pscoffee_mobile.md`). Always read the current N from any `*.html` file before bumping.

Bump pattern (run from repo root, replace N and M):
```bash
sed -i '' 's/mobile.css?v=N/mobile.css?v=M/g' $(find . -name "*.html" | grep -v node_modules)
```
All three files (`ps.js`, `wh.css`, `mobile.css`) are referenced in every `*.html` — bump all three in the same commit.

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

| File | Scope | Purpose |
|---|---|---|
| `assets/ps.css` | Site-wide | All shared styles: layout, nav, footer, FAQ, sections, etc. |
| `assets/wh.css` | Blog posts + misc | Blog post body styles, hero, cards |
| `assets/mobile.css` | Responsive | Mobile overrides |

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

Current section order values are in memory (`project_pscoffee_mobile.md`).

To change the mobile order: adjust the `order` values in `mobile.css`. Use more negative numbers to move a section earlier; remove a rule entirely to let it fall back into DOM sequence. When inserting a new pinned section, assign it a value between two existing ones and leave a gap so future insertions don't require renumbering.

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

- `.claude/` — Claude Code internal session config
- `.image-slots.state.json` — tool-generated state file
- `.DS_Store` — macOS metadata
- `node_modules/` — no dependencies exist, but just in case

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
