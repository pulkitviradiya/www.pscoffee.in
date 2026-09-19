# Conventions

Read this before adding any new file, page, component, or CSS rule. Everything here is an
observed, established pattern in the codebase — not aspirational.

---

## File & folder naming

- **Pages**: flat `.html` files at repo root, lowercase-hyphenated (`event-enquiry.html`,
  `partnership-enquiry.html`). Vercel's `cleanUrls:true` means the live URL has no `.html`
  (`/menu`, not `/menu.html`) — never hardcode the `.html` extension in a link between pages;
  bare paths and relative `.html` refs both resolve correctly.
- **Blog posts**: flat files under `blog/`, filename = SEO slug
  (`why-specialty-coffee-costs-300-rupees-india.html`).
- **Images**: `assets/photos/site/{page}-{description}-{desktop|mobile}.webp`. Every image added
  must be referenced in an HTML file — no orphan images. When replacing a hero image with a
  cropped version, delete the old file rather than adding a new one alongside it.
  Before committing a deleted image asset, search the repo for its filename; do not commit the
  deletion if any live HTML, CSS, or JS still references it.
  Every image, GIF, and video slot outside the Menu and House Favourites must have a unique
  page-and-section-specific slot ID, placeholder name, and asset filename. House Favourites may
  reuse Menu assets because it is populated directly from the Menu. When the mobile crop or ratio
  differs, desktop and mobile assets must also have distinct names. Never reuse one generic asset
  across unrelated live slots.
  `assets/photos/*.webp` (root level, no `/site/` subfolder) is reserved for P.S. Pass product
  images used on `pack.html` only.
  Images in `assets/photos/site/` are cached immutably by Vercel for 1 year — if you replace a
  file's contents, **rename it** (Vercel will keep serving the old cached bytes at the old name).
- **CSS classes**: blog/journal components keep the `journal-` prefix internally
  (`.journal-post-body`, `.journal-faq`) with "The P.S. Journal" as the user-visible name under Master Copy v4 — do not rename these classes, it would break
  styling across wh.css, mobile.css, and every blog HTML file.
- **Branches**: single `main` branch only at present; both Claude and Codex push directly to it.

---

## Module / component structure patterns

### Navigation — single source of truth
`assets/ps.js`'s `PAGES` array (top of the file) is the **only** place to edit site navigation —
it drives both the desktop nav bar and the mobile drawer.
```js
var PAGES = [
  {href:"pack.html", label:"P.S. Pass", n:"01", primary:true, cls:"pack-link"},
  {href:"menu.html", label:"Menu", n:"02", primary:true},
  ...
];
```
- `primary:true` → appears in the top nav bar; `primary:false` → mobile drawer only.
- `cls:"pack-link"` → adds that class to BOTH the desktop `<a>` and the mobile drawer `<a>` (the
  drawer must pass `cls` through — do not revert this).
- Footer-only pages (`faq`, `privacy`, `terms`, `disclaimer`, `copyright`,
  `survey-disclosure`) live in the footer only — never add them to `PAGES`.

### Blog post structure
Every file in `blog/` follows:
- An inline `<style>` block for post-specific overrides (font sizes, local colour shadow-tokens).
- Body wrapped in `<div class="journal-post-body">`.
- Content sections in `<div class="section">`.
- FAQ block at the bottom: `<div class="faqs">` containing `.faq-item` / `.faq-q` / `.faq-a`.
- A prev/next nav block: `<div class="pnnav">` with 1-2 `.pncard` links (or `.pncard.disabled`
  at the start/end of the series). This already has full inline CSS in every post that includes
  it — don't assume it's unstyled without checking.
- The FAQ toggle is handled centrally by `ps.js`'s `faq()` function (adds/removes `.open` on
  `.faq-item`). **Never add an inline `<script>` in a blog post to handle FAQ clicks** — it will
  fire twice and break the toggle (this bug shipped once already).
- Kicker line reads `The P.S. Journal. · [category] · [topic]` under Master Copy v4.

### Menu — adding or removing a filter category
Do all steps in one commit:
1. Add/remove the `<section class="menu-category-wh" data-cat="X" id="menu-X">` block in `menu.html`.
2. Add/remove the `<button data-filter="X">` in `.menu-filter-wh` nav in `menu.html`.
3. Update `grid-template-columns` on `.menu-filter-wh` in `wh.css` — one `auto` per button, plus
   `1fr` at the end (5 buttons = `auto auto auto auto auto 1fr`).
4. Add/remove the `<a data-fav-cat="X">` tab in `.wh-favourites nav` in `index.html`.
5. Add/remove `'X'` in the `['letter','ps','food']` fetch array in `index.html`.
6. Add a colour rule for `button[data-filter="X"]` and `#menu-X h2` in the theme block in `wh.css`.

Menu card layout rule: `margin-top:auto` must be on `.menu-product-note`, **not**
`.menu-product-price` — this pins the P.S. note + price row to the bottom of every card so
adjacent cards stay level regardless of title/recipe text length.

### Forms
All forms POST to `/api/submit-form` with a `form_name` field — see
[api-reference.md](api-reference.md) for the exact contract and the allowlist you must extend
when adding a new form.

### Analytics and GA4
GA4 is live sitewide with measurement ID `G-5TS0QMZ55W`. Every new public HTML page, including
every new blog post, landing page, legal page, enquiry page, or utility page that can be opened in
a browser, must include the standard Google tag in `<head>` before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5TS0QMZ55W"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());

  gtag("config", "G-5TS0QMZ55W");
</script>
```

When creating a new form or conversion path:
- Add the `form_name` to the server allowlist in `api/submit-form.js` and document it in
  [api-reference.md](api-reference.md).
- Add the same `form_name` to `PS_CONVERSION_EVENTS` in `assets/ps.js` with a sensible
  `event`, `type`, and estimated `value`; then bump `ps.js?v=N` across every HTML file.
- Keep analytics payloads privacy-safe. Do not send names, email addresses, phone numbers,
  message text, addresses, company names, or any free-text user input to `dataLayer`, `gtag`, or
  third-party pixels. Only send the form name, conversion type, value, currency, page path, and
  non-PII context keys already allowlisted in `PS_CONVERSION_CONTEXT_KEYS`.
- Existing successful submissions push `ps_form_submit_success` to `dataLayer`; if `gtag` is
  available, they also fire the configured GA4 event (`generate_lead` or `sign_up`).

---

## CSS cascade conventions — read before editing `wh.css`

`wh.css` was iteratively rebuilt several times without removing earlier passes:
- **Multiple `:root` blocks** (currently 5) redefine the same custom properties
  (`--wh-gut`, `--wh-ink`, `--wh-serif`, etc.) at different points, sometimes with stale/legacy
  values. **Never assume the first declaration you find for a custom property is the one that
  wins — grep every occurrence in the file and read them in order.**
- **The same selector is re-declared 2-5 times** across the file, sometimes contradicting itself.
  Resolution order: (1) a rule with `!important` always beats one without, regardless of
  specificity or file order; (2) among rules that both have `!important`, higher specificity wins
  regardless of order; (3) if specificity is equal, the later rule in the file wins.
- **Practical rule**: before concluding "the site does X," grep the selector across `ps.css`,
  `wh.css`, and `mobile.css`, read every match, and apply the resolution order above. Cross-check
  with a live `getComputedStyle()`/`getBoundingClientRect()` call in the browser when unsure —
  several real bugs (invisible button text, unreadable text-over-photo, a broken padding token)
  were a later blanket rule silently overriding an earlier component-specific one that looked
  correct in isolation. Don't trust a screenshot alone if it disagrees with a computed-style
  check — this local preview setup has shown stale renders even after a cache-busted reload.
- **Page-polish pattern**: when fixing browser-reviewed typography/colour bugs on `about.html`,
  `app.html`, `pack.html`, or similar shared `.wh-page` screens, expect earlier component rules to
  be overridden later in `wh.css`. Use narrowly page-scoped final-layer selectors such as
  `body[data-page="about"] ...` and verify the exact selected elements with computed styles before
  declaring the slice done.
- **Shared page heroes**: all marketing-page heroes, including `pack.html`, use the shared
  `.wh-page-hero` typography contract: W1 display heading, W3 Space Grotesk Body at the standard
  body size/weight/line-height, and W4 CTA plus P.S. line grouped in the hero footer. Page-specific
  rules may change layout, imagery, and colour profile, but must not redefine body typography.
  Where the hero has sufficient height, the CTA and P.S. line sit at the bottom. Do not create a
  separate Pack hero typography system.

### Asset version bumping
`wh.css`, `mobile.css`, `ps.js`, and `image-slot.js` are each cache-busted independently with
their own `?v=N` (`ps.css` is not versioned — it never needs a bump). **Every time you edit one
of those four versioned assets, bump only that file's version number by 1 across every HTML file
that references it**:
```bash
sed -i '' 's/wh.css?v=N/wh.css?v=M/g' $(find . -name "*.html" | grep -v node_modules)
```
Always read the current N from any live `*.html` file first — [MEMORY.md](../MEMORY.md)'s
version table can lag by one commit if a fix landed without updating it. Don't bump unrelated
versioned files just because one changed.

---

## Mobile CSS conventions

- **All mobile changes go in `assets/mobile.css` only** — zero desktop impact intended. Breakpoint
  is `@media (max-width:760px)` for most rules. `ps.css` is desktop-only truth; never make a
  responsive fix there.
- **`@keyframes` blocks must live outside any `@media` block** — browsers silently discard
  `@keyframes` declared inside one.
- **Header height trap**: `--wh-header-h` (62px) captures only the nav; the announce bar above it
  adds another 28px, so the true header bottom is 90px. Any `.page-top` spacer must use
  `calc(var(--wh-header-h) + 28px)`, never the bare variable.
- **wh.css specificity trap**: page-scoped rules like
  `body[data-page="menu"] .page-top{height:var(--wh-header-h)!important;}` have specificity 0,2,0
  — higher than mobile.css's bare `.page-top` (0,1,0) — so they win even against `!important`
  from a lower-specificity mobile.css rule. To override from mobile.css, match the specificity
  with the same `body[data-page="X"]` prefix.
- **Homepage section order**: the homepage body is `display:flex;flex-direction:column` on
  mobile so sections can be reordered via CSS `order` without touching the HTML. Always re-read
  the current order block in `mobile.css` (`body[data-page="home"]`, inside the 760px query)
  before adding to it — it changes. **Any new pinned section (including a bare spacer/buffer div)
  must get an explicit `order` value placed between its intended neighbours** — an unordered
  element defaults to `order:0` and renders after every negative-ordered section regardless of its
  DOM position. Leave numeric gaps between values so future insertions don't require renumbering.
  Never make homepage section-order changes in the HTML — always via `order` in mobile.css.

---

## What NOT to do

- Do not edit `ps.css` for blog-only fixes — use `.journal-post-body`-scoped overrides in `wh.css`.
- Do not make mobile fixes in `ps.css` — all responsive overrides belong in `mobile.css`.
- Do not add FAQ click handlers inline in blog posts — `ps.js` already handles it.
- Do not hardcode `padding-block` on `.section` in blog inline CSS — `wh.css` already resets it.
- Do not use `story.html` — that page no longer exists; the URL is `about.html` (with legacy
  `/story` → `/about` redirects kept in `vercel.json`, don't remove them).
- Do not add footer-only pages (faq/legal pages) to the top nav — they're wired into `ps.js`'s
  `footHTML()` only.
- Do not forget to bump the relevant `?v=N` when editing `wh.css`, `mobile.css`, or `ps.js`.
- Do not rename CSS classes like `.journal-post-body`, `.journal-faq` — used across 3 stylesheets
  and every blog HTML file.
- Do not set `.page-top` to `var(--wh-header-h)` alone — always `calc(var(--wh-header-h) + 28px)`.
- Do not put `@keyframes` inside `@media` blocks.
- Do not add a new homepage section/spacer without an explicit mobile `order` value.
- Do not write a component's text/background colour rule without `!important` inside `wh.css` — a
  later, broader blanket rule (e.g. `p{color:espresso!important}`) will silently win over an
  earlier, correct, non-important component rule. Verify via `getComputedStyle()`, don't trust
  the source alone.
- Do not bundle unrelated selectors into a shared colour rule (e.g. a kicker-colour rule) just
  because they want the same value today — give each component its own rule even when the value
  is currently identical; a shared rule can silently fight a more specific rule later.
- Do not force-add anything in `.gitignore` (`.claude/`, `.image-slots.state.json`, `.DS_Store`,
  `node_modules/`) or leave a `*.xlsx` workbook committed — delete temporary xlsx copies before
  committing.
- `sitemap.xml` must be updated when adding/removing a page (clean URL, no `.html`); legal pages
  (privacy/terms/disclaimer/copyright/survey-disclosure) are intentionally excluded from it.
- `output/prototype-exports/` and `output/prototype-mobile-exports/` are generated prototype
  reference artifacts, not normal site source. Do not regenerate or edit them casually; commit
  them only when the user explicitly asks to include all pending artifacts or to preserve a new
  prototype export.

---

## Design-system conventions
Colour, typography, spacing/radius, and button/form rules are documented in
[design.md](design.md) — check it before hardcoding a hex value, font name, or px value that
already has a token.

### Inline highlights

Any inline text highlight/mark with a background and padding must include both
`box-decoration-break:clone` and `-webkit-box-decoration-break:clone` in the rule or inline style
that owns the highlight. This is non-negotiable: once a marked phrase wraps, browsers without
these properties paint one merged background box that bleeds into adjacent lines.

### Price currency glyphs

When a visible price needs the rupee symbol styled independently, wrap only the `₹` glyph and leave
the rest of the number in its original price colour. Use the shared currency class where possible:

```html
<strong><span class="ps-price-currency">₹</span>89</strong>
```

On light neutral grounds (`#FAF6EE`, `#F2EBD9`, or equivalent), the glyph is Deep Ceremonial
`#3D6B4A`. On dark or bold grounds (`#3D2010`, `#E8400C`, `#3D6B4A`, or equivalent), the glyph is
Steam Cream `#FAF6EE`. If the entire price line is already Steam Cream on a dark background, leave
it unchanged.

## Mobile QA completion gate

A mobile audit is not complete until the touched pages have been checked at both the normal mobile
width (around 393px) and the narrow mobile width (336-360px). Verify the rendered header/nav,
category/filter bars, hero body copy, CTA alignment and hover/focus states, horizontal overflow,
footer columns/legal row, and every annotated section. If one visible mobile section is still
broken, do not mark the audit or rectification as complete.

## Pack page shared-rule ownership

`pack.html` is a standard `.wh-page` page like Menu, App, About, Pods, Join, and Partnership.
Pack-specific CSS may define only the pass/pack explorer cards and collapsible pass details; shared
hero/body typography, PS-note styling, CTA behaviour, hover/focus colour, mobile Body scale, and
section spacing must come from the shared page rules unless `docs/design.md` records an explicit
component exception. This prevents Pack from drifting into its own typography system.
