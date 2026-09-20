# About and Pods letter redesign preservation checklist

This inventory freezes the content contract for the letter-concept previews. The exact legacy HTML is retained in `about-legacy.html` and `pods-legacy.html`; the checklist below records the required sections, assets, links, anchors, and form behaviour so redesign work cannot silently omit them.

The live `about.html` and `pods.html` pages remain unchanged until the preview pages are approved.

## About page contract

### Metadata and shared infrastructure

- [ ] Preserve the title, description, canonical URL, Open Graph fields, Twitter fields, GA4 tag, AboutPage structured data, favicon links, shared navigation mount, shared footer mount, `image-slot.js`, `ps.js`, and `mobile.js`.
- [ ] Preserve the organisation details in structured data: P.S. Coffee name and alternate name, Ahmedabad/Gujarat/India address, logo, social links, and breadcrumb.

### 01 — Opening letter

- [ ] Preserve kicker `About.`; headline `We take coffee very seriously, as well as the drama.`; supporting line `The serious part is the cup. The drama is everything we do with it.`; `Read the story` link to `#model`.
- [ ] Preserve image slot `story-hero`, desktop `story-hero-cafe-crop-desktop.webp`, mobile `story-hero-cafe-crop-mobile.webp`, and its placeholder/alternative description.

### 02 — The founding subtraction (`#model`)

- [ ] Preserve kicker `The founding subtraction.` and headline `The price of a coffee. Not the price of a cafe.`
- [ ] Preserve all three explanatory paragraphs: the daily-price-point argument, the room/cafe-cost argument, and the statement that the bean standard is not being lowered.
- [ ] Preserve image slot `story-cup-not-broken` and `story-cup-not-broken-v4-desktop.jpg` with its full description.

### 03 — The daily habit (`#who`)

- [ ] Preserve kicker `The daily habit.` and headline `We want to be your habit. Not your obligation.`
- [ ] Preserve all three stages and every attached label: `Chosen / Not automatic / The cup you choose`; `Week one / Trust starts / Serious about the cup`; `Month three / The daily habit / Same time. More than one way.`
- [ ] Preserve each stage's explanatory paragraph, including the routine-versus-ritual distinction and the original/rotating-slate relationship.

### 04 — Why P.S.? (`#psychology`)

- [ ] Preserve kicker `The postscript.`, headline `Why P.S.?`, all three postscript paragraphs, and the exact signature statement `The day is the letter. The coffee is the P.S.`
- [ ] Preserve the `Plain & Simple.` panel and its no-jargon/no-origin-lecture explanation.

### 05 — Mission and vision

- [ ] Preserve image slot `story-founder-portrait`, both desktop and mobile portrait assets, and its description.
- [ ] Preserve the Mission label, ninety-second mission statement, its ordinary-Tuesday paragraph, the Vision label, the full vision statement, and the final supporting paragraph.

### 06 — Quality commitments

- [ ] Preserve the headline `We will never mix your milk with instant coffee.`
- [ ] Preserve all three promise rows and descriptions: `Never instant.`, `Ground at order.`, and `Nothing hidden.`

### 07 — Three readings (`#day`)

- [ ] Preserve kicker `Your daily postscript.`, headline `Three readings. One P.S.`, and all three readings with their definitions: Postscript, Pretty Serious, Plain & Simple.

### 08 — Three pillars (`#pillars`)

- [ ] Preserve headline `Spot on where it matters.` and the Quality/Range/Reachability introduction.
- [ ] Preserve all three card numbers, headings, full descriptions, and destinations.
- [ ] Preserve `pillar-quality` with both assets; `pillar-pricing` with both v4 assets; `pillar-reachability` with both v4 assets.
- [ ] Preserve links to `menu.html`, `menu.html#menu-ps`, and `pods.html#waitlist` (retarget the final link to the Pods preview while previews are under review).

### 09 — Manifesto (`#manifesto`)

- [ ] Preserve kicker `The sign-off.`, headline `Ahmedabad first. Watch this space.`, all three numbered statements, and the existing terracotta monogram asset.

### 10 — Serious cup / serious drama

- [ ] Preserve the complete `Serious about the cup.` panel, `story-split-origin` desktop/mobile assets, its quality-standard copy, and label.
- [ ] Preserve the complete `Serious about the drama.` panel, `story-split-partner` v4 desktop/mobile assets, its range copy, and link to `menu.html#menu-ps`.

### 11 — Connect (`#connect`)

- [ ] Preserve the `Connect with us.` heading and the full Press & media, Investors, Vendors & suppliers, and Consultants & advisors paragraphs.
- [ ] Preserve every `hello@pscoffee.in` mail link.

## Pods page contract

### Metadata and shared infrastructure

- [ ] Preserve the title, description, canonical URL, Open Graph fields, Twitter fields, GA4 tag, WebPage structured data, favicon links, shared navigation mount, shared footer mount, `image-slot.js`, `ps.js`, and `mobile.js`.
- [ ] Preserve the Ahmedabad-first/planned-status language in metadata and structured data.

### 01 — Opening postcard

- [ ] Preserve kicker `Pods. Coming soon.`, headline `Your next daily stop.`, the complete planned-locations paragraph, CTA to `#waitlist`, and P.S. location-suggestion note.
- [ ] Preserve image slot `pods-hero`, both hero assets, and its description.

### 02 — Reachability statement

- [ ] Preserve `Spot On Reachability.` and `Your building could be part of the plan.`

### 03 — What is a P.S. Pod? (`#format`)

- [ ] Preserve the kicker, headline `A small space. A serious cup.`, both explanatory paragraphs, and The Letter/The P.S. distinction.
- [ ] Preserve image slot `pods-format-visual`, both `pods-what-is-a-pod` assets, and its description.

### 04 — Pod format specification

- [ ] Preserve all six rows and full descriptions: Size `50–200 sq ft`; Service; Format including no seating; Technology including planned app pre-orders; Quality; Missing on purpose including no seating and table service.

### 05 — Why Pods?

- [ ] Preserve `Why Pods?`, headline `Small on purpose. Inside your day.`, and the complete four-drinks/rotating-handful/everyday-cup paragraph.

### 06 — Where Pods belong

- [ ] Preserve the heading and planned-status introduction.
- [ ] Preserve all four location cards, their full copy, and CTA destinations: co-working/Host a Pod; corporate/Bring P.S. to work; university/View menu; gym/View coffee.
- [ ] Preserve all eight desktop/mobile location assets and the four image-slot IDs: `pods-place-coworking`, `pods-place-corporate`, `pods-place-university`, `pods-place-gym`.

### 07 — Planned areas (`#pods`)

- [ ] Preserve the heading, complete Ahmedabad/Gandhinagar disclaimer, main waitlist CTA, and all six planned rows: Prahladnagar, SG Highway, Gift City, TCS, SBR, Makarba.
- [ ] Preserve each city label and area query value. Preview links must use `pods-letter.html?area=...#waitlist` so preview testing stays within the preview.

### 08 — Waitlist (`#waitlist`)

- [ ] Preserve wrapper attributes `data-form-wrap`, form classes, `data-ps-form="pod-waitlist"`, and `data-launch-form`.
- [ ] Preserve hidden `interest_type=pods`.
- [ ] Preserve required `area` select and values: empty, `prahladnagar`, `sg-highway`, `gift-city`, `tcs`, `sbr`, `makarba`, `other`.
- [ ] Preserve conditional `area_other`, `maxlength=120`, disabled/hidden initial state, label, placeholder, and validation message.
- [ ] Preserve `contact_method` with `email` and `whatsapp` options.
- [ ] Preserve email input name/type/autocomplete/required state/placeholder/error.
- [ ] Preserve WhatsApp input name/type/autocomplete/disabled initial state/placeholder/pattern/error.
- [ ] Preserve privacy copy and link, submit-button copy, success heading and paragraphs, no-booking/no-payment clarification, and feedback link.
- [ ] Preserve existing submission, validation, privacy-safe analytics, API allowlist, and Google Sheets column mapping without creating a new form identity.

### 09 — Continue the story

- [ ] Preserve the App panel, `pods-split-app` desktop/mobile assets, heading, paragraph, and link to `app.html`.
- [ ] Preserve the Host panel, `pods-split-host` desktop/mobile assets, heading, paragraph, and link to `partnership.html`.

## Preview acceptance checks

- [ ] `about-letter.html` and `pods-letter.html` have `noindex,nofollow`, are absent from navigation/sitemap, and do not replace the live pages before approval.
- [ ] Every checklist item above is present and readable at desktop and mobile widths.
- [ ] Coffee and Matcha moods retain readable contrast; decorative Hindi text uses `lang="hi"` and does not replace English meaning.
- [ ] Keyboard focus, 44px touch targets, pause-motion control, and `prefers-reduced-motion` behaviour are verified.
- [ ] All local links, assets, anchors, structured data, and browser console output are checked.
- [ ] Pods area-prefill, email branch, WhatsApp branch, Other-area branch, validation, success state, analytics contract, and API/Sheets mapping are verified locally.
- [ ] A real Google Sheets write is reported only after an actual deployed/API-backed submission and sheet confirmation; local validation alone is labelled as local validation.
