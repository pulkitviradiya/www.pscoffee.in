# P.S. Coffee — Contributor Guide (Claude & Codex)

This file is the source of truth for both Claude Code and Codex when working on this repo.
Read it fully before making any change. Both agents push to the same GitHub repo → Vercel.

---

## Site overview

Static HTML/CSS/JS site. No framework, no build step. Files are served directly by Vercel.
Live at: **https://www.pscoffee.in**

**Always `git pull` before starting any work** — the other agent may have pushed since your last session.

---

## Page map

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Home |
| `menu.html` | `/menu` | Menu (coffee, matcha, food) |
| `matcha.html` | `/matcha` | Matcha landing |
| `pack.html` | `/pack` | P.S. Pack subscription |
| `app.html` | `/app` | App page |
| `pods.html` | `/pods` | Pod model / locations |
| `about.html` | `/about` | Brand story |
| `partnership.html` | `/partnership` | Partner / host a Pod |
| `join.html` | `/join` | Join the build |
| `events.html` | `/events` | Events & collaborations |
| `event-enquiry.html` | `/event-enquiry` | Event enquiry form |
| `blogs.html` | `/blogs` | Blog listing page |
| `faq.html` | `/faq` | Frequently asked questions |
| `blog/*.html` | `/blog/slug` | Individual blog posts (6 posts) |
| `privacy.html` | `/privacy` | Privacy policy |
| `terms.html` | `/terms` | Terms of service |
| `disclaimer.html` | `/disclaimer` | General disclaimer |
| `copyright.html` | `/copyright` | Copyright notice |
| `survey-disclosure.html` | `/survey-disclosure` | Survey disclosure |

**Vercel uses `cleanUrls: true`** — URLs are `/menu`, not `/menu.html`. Never hardcode `.html` extensions in links between pages; use bare paths or relative `.html` refs (Vercel resolves both).

---

## Navigation — single source of truth

**`assets/ps.js` is the only place to edit navigation.** The `PAGES` array at the top of `ps.js` drives both the desktop nav bar and the mobile drawer. Every page (except legal pages) that should appear in the nav must be listed here.

```js
var PAGES = [
  {href:"pack.html",        label:"Subscribe",  n:"01", primary:true, cls:"pack-link"},
  {href:"menu.html",        label:"Menu",       n:"02", primary:true},
  ...
];
```

- `primary:true` → appears in the top nav bar
- `primary:false` → only in the mobile drawer
- Footer-only pages (faq, privacy, terms, disclaimer, copyright, survey-disclosure) live in the **footer only** — do not add them to `PAGES`

---

## CSS architecture — critical rules

Three stylesheets load in this order on every page:

| File | Scope | Purpose |
|---|---|---|
| `assets/ps.css` | Site-wide | All shared styles: layout, nav, footer, FAQ, sections, etc. |
| `assets/wh.css` | Blog posts + misc | Blog post body styles, hero, cards |
| `assets/mobile.css` | Responsive | Mobile overrides |

### The #1 rule: ps.css bleeds into blog pages

`ps.css` has rules that affect class names also used in blog posts. Known conflicts:

| ps.css rule | Effect on blogs | Override in wh.css |
|---|---|---|
| `.section { padding-block: clamp(64px,9vw,124px) }` | Huge spacing on every `.section` div | `.journal-post-body .section { padding: 0 }` ✓ already in wh.css |
| `.faq-q { padding: 24px 4px }` | FAQ rows too tall | `.journal-post-body .faq-q { padding: 8px 0 }` ✓ already in wh.css |
| `.faq-a { max-height:0; overflow:hidden }` | FAQ answers invisible even when open | `.journal-post-body .faq-a { max-height:none; overflow:visible }` ✓ already in wh.css |

**These are already fixed in wh.css.** Do not re-add inline `padding-block`, `max-height`, or `overflow` overrides to blog files — wh.css handles them.

### wh.css version bumping

`wh.css` is cache-busted with a `?v=N` query string in every blog HTML file:
```html
<link rel="stylesheet" href="../assets/wh.css?v=16">
```

**Every time you edit `wh.css`, bump the version number by 1 in all 6 blog files** (`blog/*.html`). Current version: **v=16**. Failing to bump means users see a cached old version.

---

## Blog posts — rules

### Structure
Each blog post in `blog/` follows this structure:
- Inline `<style>` block for post-specific overrides (font sizes, colours)
- Body wrapped in `<div class="journal-post-body">`
- Sections in `<div class="section">` divs
- FAQ at the bottom in `<div class="faqs">` with `.faq-item / .faq-q / .faq-a` elements

### FAQ toggle
The FAQ toggle is handled by `assets/ps.js` (`faq()` function). It adds/removes the `.open` class on `.faq-item`. **Do not add an inline `<script>` in blog posts to handle FAQ clicks** — it will fire twice and break the toggle. This bug was fixed; don't reintroduce it.

### Blog kicker line
Every blog post has a kicker paragraph that reads: `The P.S. Blog. · [category] · [topic]`
Use "The P.S. Blog." — not "The P.S. Journal." (renamed).

### Naming
- "Blogs" / "Blog" everywhere user-visible — not "Journal"
- CSS class names still use `journal-` prefix internally (`.journal-post-body`, `.journal-faq`, etc.) — do not rename these, it would break all styles

---

## Photos — rules

All site images live in `assets/photos/site/` (webp format, naming convention: `{page}-{description}-{desktop|mobile}.webp`).

- Every image added must be referenced in an HTML file. **No orphan images.**
- When replacing a hero image with a cropped version, **delete the old file** — don't just add the new one.
- `assets/photos/*.webp` (root level, no `/site/` subfolder) = P.S. Pass product images used on `pack.html`.
- Images in `assets/photos/site/` are cached for 1 year by Vercel (immutable). If you replace a file, rename it or Vercel will serve the old cached version.

---

## Never commit these

Already in `.gitignore` — but do not force-add them:

- `.claude/` — Claude Code internal session config
- `.image-slots.state.json` — tool-generated state file
- `.DS_Store` — macOS metadata
- `node_modules/` — no dependencies exist, but just in case

---

## Sitemap

`sitemap.xml` must be updated when adding or removing pages. Each `<url>` entry uses the clean URL (no `.html`). Legal pages (privacy, terms, disclaimer, copyright, survey-disclosure) are intentionally excluded from the sitemap.

---

## Vercel & deployment

- Push to `main` → Vercel auto-deploys. No manual deploy needed.
- `vercel.json` sets: `cleanUrls: true`, `trailingSlash: false`, cache headers.
- Cache headers: HTML = `max-age=0, must-revalidate` (always fresh). Photos/icons = `max-age=31536000, immutable` (1 year).
- The `/story` and `/story.html` URLs redirect to `/about` (legacy redirects — do not remove).

---

## What NOT to do

- **Do not edit `ps.css` for blog-only fixes** — use `.journal-post-body`-scoped overrides in `wh.css` instead
- **Do not add FAQ click handlers inline in blog posts** — `ps.js` handles it
- **Do not hardcode `padding-block` on `.section` in blog inline CSS** — wh.css already resets it
- **Do not use `story.html`** — that page no longer exists; the URL is `about.html`
- **Do not add footer-only pages to the top nav** — FAQ and legal pages belong in the footer only (already wired in `ps.js` `footHTML()`)
- **Do not forget to bump `wh.css?v=N`** when editing `wh.css`
- **Do not rename CSS classes** like `.journal-post-body`, `.journal-faq` — they are used across wh.css, mobile.css, and all blog HTML files
