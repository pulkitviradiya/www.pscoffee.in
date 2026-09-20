# Master Copy v4 audit — 19 September 2026

The audit covered all 37 public root and Journal HTML pages, shared navigation/footer copy,
visible form messages, accessible image descriptions, social/search metadata and nested JSON-LD.
The previous draft missed nested FAQ schema and text baked into images. Production was still
serving the earlier release at the start of this audit.

## Page and section checklist

| Page | Sections corrected |
| --- | --- |
| Home | Positioning, category cards, Letter/P.S. menu preview, planned locations, app concept, story, waitlist |
| About | Founding story, habit, postscript readings, mission/vision, preparation standard, quality/range/reachability, sign-off, enquiry copy, graphics |
| Menu | Four families, Letter/P.S. variants, recipe copy, proposed-price context, app and waitlist CTAs; all 43 original names and prices retained |
| Pods | Hero, four location types, compact format, future locations, host enquiry and waitlist |
| App | Prelaunch hero, features, editable concept previews, routine tracker concept, ordering plan and waitlist |
| Matcha | Green family, recipe language, preparation, app and menu links |
| Pass and Pass enquiry | User correction: restored all 12 proposed options, original groups, prices, validity, details and Pass-specific interest form; retained Still taking shape headline |
| Partners and enquiry | Site fit, in-and-around location language, planned operations, enquiry labels and success messages |
| Events and enquiry | Future enquiry language, format cards, enquiry and success messages |
| Join | Ahmedabad-first team brief, role descriptions, supplier and contact copy, success states |
| Journal index | Journal name, editorial pillars, titles, summaries, subscription copy and structured data |
| Journal articles | Retired species/competitor/cost arguments and Pass promises replaced; matching titles, descriptions and schema; legacy URLs retained |
| FAQ | Prelaunch answers and matching structured data |
| Feedback | Plain labels, removed unsupported reward promise, correct receipt message |
| Legal and utility pages | Shared brand surfaces and asset versions; operative legal terms retained |

## Artwork

27 page/viewport-specific replacement files are saved in `assets/photos/site/*-v4-*.jpg`.
The built-in image generation tool edited 12 source compositions; JPEG conversion used ffmpeg.
New filenames avoid immutable-cache reuse. The prior GIFs contained retired app/Pass claims;
their existing preview containers now display editable HTML concept screens. Page structure,
colour tokens and typography remain in the existing system.

Prompt set: preserve each source's composition, lighting and visual style while replacing only
outdated text. App phone: App preview / Your usual / Cappuccino / P.S. White / Pods in development.
Pod boards: HONEST SPECIALTY COFFEE and THE LETTER / Black / White / Green / Strong.
Reachability panel: IN AND AROUND YOUR DAY. Cup plaque: The Letter.
About graphic: Built around the cup / Fresh preparation / Ground at order / A daily format /
In and around your day; remove prices, comparisons and capsule imagery.
Bean graphic: Honest specialty coffee / The coffee / The preparation; no species comparison.
City graphic: Ahmedabad first / Workplaces / Campuses / Gyms and corners / Locations in development;
remove all other promotional paragraphs. Slate phone: four family cards and Concept preview.
Range graphic: Your usual. More than one way / four families / The Letter. The starting four.
Journal Pod: four-family board and Pod concept. Journal app: Cortado / Espresso and warm milk /
Your drink / Your pick-up time / Your usual / Coming soon. Map: conceptual Ahmedabad only,
no location pins or announced addresses; Opening dates and addresses are not confirmed.

## Validation

- 13 automated tests pass: 10 existing form tests and 3 new copy/inventory regressions.
- All 43 menu names and exact price markup match the original inventory.
- All 37 pages have parseable JSON-LD and no missing checked local links, anchors or image-slot assets.
- Shared and inline JavaScript syntax checks pass; git whitespace check passes.
- OCR of all 27 replacements finds no retired species, Pass/Pack, tap-count, price or percentage claims.
- Fifteen main pages checked at 393px and 360px: no horizontal document overflow or retired species/tap copy.
- Menu filters verified: Letter 4, P.S. 33, Food 6.
- About and App reviewed visually on desktop/mobile. Raster and Pod illustrations remain concepts.
- Form tests verify Sheets mapping with mocked Sheets calls. This copy audit did not create fresh production test submissions.

## App media correction

At the user’s request, the original six App-page GIFs, app photographs and landing-page app GIF/photo are restored. Updated surrounding copy remains; the prototypes retain their original in-image copy. This supersedes the editable concept-screen replacement described above. Restoration is local pending approval to publish.
