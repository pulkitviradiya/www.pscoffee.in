# P.S. Coffee — SEO/GEO Implementation Plan (Phase 2)

Built on [seo-keyword-strategy.md](seo-keyword-strategy.md) (phase 1 research). This file answers
"where does each keyword actually go," page by page and surface by surface. Compiled 2026-09-21.

---

## 0. The governing principle that makes this safe

Audited both documents against each other. The result:

| Layer | Governed by | Keyword freedom |
| --- | --- | --- |
| **H1 / hero headline** | Master Copy v4 specifies a W1 headline for every page (B1.02, B2.01, B3.01, B5.01, B6.01, B7.01, B8.01, B9.01, B10.01) | **None. Locked.** Do not rewrite an H1 to chase a keyword. |
| **Visible body copy** | Master Copy v4 + Brand Language Handbook (banned words, two registers, P.S. density) | **None.** Brand voice wins outright. |
| **`<title>` tag** | Nothing. Master Copy v4 has zero coverage of meta titles. | **Full.** This is the primary keyword surface. |
| **`<meta name="description">`** | Nothing. | **Full**, within voice-adjacent tone. |
| **URL slug** | Nothing (existing slugs are frozen by redirect risk, not by copy) | Full for **new** pages; existing slugs stay. |
| **JSON-LD / schema** | Nothing | **Full.** Invisible to readers, read by AI. |
| **`alt` text** | Conventions (descriptive, unique) | Moderate — descriptive first, keyword second. |
| **FAQ question text** | Voice applies (it's visible copy) but questions can be phrased the way people actually search | **High.** Best of both. |

**So: never rewrite an approved H1 for SEO.** If a keyword can't live in a title tag, a meta
description, a FAQ question, schema, or a new page, it doesn't get forced onto an existing page.
That single rule keeps this whole plan from breaking the copy system.

---

## 1. Metadata audit — all 15 live, indexed root pages

Current state audited 2026-09-21. Three inconsistent title formats are in use
(`X · P.S. Coffee`, `P.S. Coffee. | X.`, `X P.S. Coffee`) — standardising on
**`Keyword-led phrase | P.S. Coffee`** (50-60 chars). No banned words used; no H1 changes.

| Page | Current title | Proposed title | Why |
| --- | --- | --- | --- |
| `index.html` | P.S. Coffee \| Specialty Coffee Pods, Ahmedabad | **Grab-and-Go Specialty Coffee, Ahmedabad \| P.S. Coffee** | Adds the category term ("grab-and-go") the whole category is searched by; keeps location |
| `menu.html` | The Menu · P.S. Coffee | **Menu & Prices · Specialty Coffee, Matcha \| P.S. Coffee** | Currently zero keyword value. "Menu & prices" is high-intent; adds matcha |
| `matcha.html` | P.S. Coffee. \| Matcha. | **Ceremonial Grade Matcha in Ahmedabad \| P.S. Coffee** | Real low-competition, rising-demand term with near-zero Gujarat supply |
| `pack.html` | The P.S. Pass · P.S. Coffee | **The P.S. Pass · Coffee Subscription Plans \| P.S. Coffee** | Captures "coffee subscription"; body copy keeps "still taking shape" prelaunch framing |
| `app.html` | P.S. Coffee App | **Order-Ahead Coffee App · Pick-Up Time \| P.S. Coffee** | "Order ahead" and "pick up" are the actual search behaviours |
| `faq.html` | P.S. Coffee. \| FAQ. | **FAQ: Pods, Menu, The Pass & Openings \| P.S. Coffee** | FAQ pages are AI-citation gold; title should say what's answered |
| `about.html` | About P.S. Coffee | **About P.S. Coffee · Specialty Coffee Pods, Gujarat** | Adds state-level term; About pages carry entity weight for AI |
| `pods.html` | P.S. Coffee Pods | **What Is a P.S. Pod? Coffee Kiosks in Ahmedabad** | Captures the Pod→kiosk translation *and* a question phrasing in one |
| `events.html` | P.S. Coffee Events | **Coffee Catering & Pop-Up Carts, Ahmedabad \| P.S. Coffee** | "Coffee catering Ahmedabad" / "coffee cart" are genuine medium-volume terms |
| `join.html` | Join the P.S. Team | **Careers · Barista & Ops Jobs in Ahmedabad \| P.S. Coffee** | "Barista jobs Ahmedabad" is a real recruitment search |
| `partnership.html` | Partner with P.S. Coffee | **Coffee Kiosk for Offices & Co-Working, Ahmedabad** | **Biggest single win on the site.** Highest commercial-value page currently has zero B2B keywords |
| `partnership-enquiry.html` | P.S. Coffee. \| Host a Pod Enquiry. | **Host a Coffee Pod at Your Site · Enquiry \| P.S. Coffee** | Format fix + "host a coffee pod" intent |
| `event-enquiry.html` | P.S. Coffee. \| Event Enquiry. | **Book Coffee Catering for Your Event \| P.S. Coffee** | Transactional phrasing |
| `pack-enquiry.html` | Register Pass interest \| P.S. Coffee | **Register P.S. Pass Interest \| P.S. Coffee** | Format/caps consistency only |
| `blogs.html` | The P.S. Journal. \| P.S. Coffee | **The P.S. Journal · Coffee Notes from Ahmedabad** | Adds topical + location signal |

### Meta descriptions
Current descriptions are already decent and on-voice. Rule for revision: keep the first ~120
characters doing the keyword work, keep the whole thing under 160, never use a banned word, never
put a P.S. sign-off in a meta description (a meta description is not a "surface" that earns one —
it's metadata, and a sign-off there reads as a slogan, which the Handbook warns against).

### H1s — no changes
All 15 H1s stay exactly as approved in Master Copy v4. Verified they match.

### URL slugs — no changes to existing pages
Every existing slug is in `sitemap.xml` and some carry legacy redirects in `vercel.json`.
Changing them costs redirect complexity for near-zero gain. New pages (§5) get keyword slugs.

### Bug found during audit
`blog/why-coworking-spaces-ahmedabad-need-better-coffee.html` is **live and indexable but missing
from `sitemap.xml`** (13 of 14 blog posts are listed). Add it.

---

## 2. FAQ page (`faq.html`) — the single highest-leverage AI-search surface

FAQPage schema is the most-cited structure by AI systems, and `faq.html` is the only page whose
entire purpose is question-answer pairs. Two rules from the research apply directly:

- **Answers 40-60 words.** Long enough to be a complete answer, short enough to be lifted whole.
  This is also almost exactly Master Copy v4's W3 body discipline, so it costs no voice compromise.
- **Question text should mirror how people actually phrase it**, including in AI prompts.

### Questions to add (each maps to a keyword cluster)

| Question to add | Keyword cluster it captures |
| --- | --- |
| What is a P.S. Pod? | coffee pod, coffee kiosk, compact coffee format |
| How is a coffee Pod different from a cafe? | coffee kiosk vs cafe, grab and go coffee |
| Where can I find grab-and-go specialty coffee in Ahmedabad? | grab and go coffee Ahmedabad |
| Will there be a P.S. Pod in Gandhinagar or GIFT City? | coffee Gandhinagar, coffee GIFT City |
| Can a company put a P.S. Pod inside its office? | coffee kiosk for corporate office |
| Can a co-working space add a P.S. Pod? | coffee kiosk for coworking space |
| Can a university or college campus host a Pod? | coffee kiosk for university, campus coffee |
| Does P.S. Coffee do coffee catering for events? | coffee catering Ahmedabad, coffee cart |
| What is ceremonial grade matcha? | ceremonial grade matcha |
| What is The Letter and what is The P.S.? | brand-entity term, unclaimed GEO opportunity |
| Is the coffee specialty grade? | specialty grade coffee (never species — see voice rules) |

Every answer must also exist in the page's FAQPage JSON-LD, matching the visible text exactly
(schema/visible mismatch is penalised).

---

## 3. Existing blog posts — keyword + FAQ additions (no rewrites)

The 14 existing posts were just restored to full content and should not be rewritten. The
low-risk, high-return move is **adding 2-3 FAQ entries to each post's existing `.faqs` block**
(and its FAQPage JSON-LD), targeting keywords the post already half-covers.

| Existing post | FAQ questions to add | Keywords captured |
| --- | --- | --- |
| `building-specialty-coffee-brand-without-cafe` | "How big is a coffee Pod?" · "Can my building host one?" | coffee kiosk size, host a coffee pod |
| `why-we-built-pods-not-cafes` | "What is the difference between a coffee kiosk and a cafe?" | coffee kiosk vs cafe |
| `why-coworking-spaces-ahmedabad-need-better-coffee` | "How does a co-working space add a coffee counter?" · "What does it cost a co-working operator?" | coffee for coworking space, coworking amenity |
| `pre-workout-coffee-gym-ahmedabad` | "Is coffee good before a workout?" · "Can a gym host a coffee Pod?" | pre workout coffee, gym coffee partner |
| `what-is-arabica-coffee-india` | "What does specialty grade mean?" | specialty grade coffee — **note: this post's title carries a species claim that v4 retires; see §7** |
| `what-is-cold-brew-coffee-india` | "Where can I get cold brew in Ahmedabad?" | cold brew Ahmedabad |
| `india-coffee-market-2030-opportunity` | "Is there specialty coffee in Gujarat?" | specialty coffee Gujarat |
| `what-we-are-building-ps-coffee-gujarat` | "Which areas of Ahmedabad will have Pods?" | coffee Prahlad Nagar / SG Highway / GIFT City |
| `morning-coffee-ritual-vs-routine` | "What is the best coffee for everyday drinking?" | daily coffee, everyday coffee |
| `specialty-vs-regular-coffee-no-jargon` | "What makes coffee specialty grade?" | specialty grade |
| `ps-pass-coffee-subscription-india` | "How does a coffee subscription work?" | coffee subscription India |
| `what-is-a-barista-history-word-craft` | "Are baristas trained at every Pod?" | barista training |
| `join-ps-coffee-team-cofounder` | "Are there barista jobs in Ahmedabad?" | barista jobs Ahmedabad |

---

## 4. New blog posts — titles and target keywords

Eight posts covering genuine keyword gaps. Each is first-party, business-model-specific content
(not generic "types of coffee" filler, which §8 of the research warns against).

| # | Proposed title | Primary keyword | Secondary keywords | Priority |
| --- | --- | --- | --- | --- |
| 1 | **The Letter and The P.S., explained** | The Letter The P.S. menu | coffee menu structure, rotating coffee menu | P0 — unclaimed brand entity, best GEO asset available |
| 2 | **What is a coffee Pod, and how is it different from a cafe?** | coffee pod | coffee kiosk, grab and go coffee, compact coffee format | P0 — the Pod→kiosk translation, anchors the whole entity |
| 3 | **Ceremonial grade matcha: what it means and why we whisk it** | ceremonial grade matcha | matcha Ahmedabad, whisked matcha, matcha vs powder | P0 — rising demand, near-zero Gujarat supply |
| 4 | **Coffee near the office: what the 9am rush actually needs** | coffee near office | quick coffee before work, coffee without queue | P1 |
| 5 | **Protein coffee: 20g of protein without wrecking the cup** | protein coffee India | gym coffee, post workout coffee | P1 |
| 6 | **Coffee in GIFT City and Gandhinagar: what's there, what isn't** | coffee GIFT City | specialty coffee Gandhinagar, coffee near GIFT City | P1 — GCC growth, almost no competition |
| 7 | **What a co-working space actually needs from a coffee counter** | coffee for coworking space | coworking amenity, specialty coffee coworking | P1 — B2B lead magnet |
| 8 | **The pantry machine and the counter: an honest comparison** | office coffee solution | vending machine alternative, corporate coffee | P2 — anti-format (allowed) not anti-competitor (banned) |

**Voice note for all eight:** the brand bans announcement voice, species claims, price arguments
and competitor references. Post 8 compares *formats* (machine vs counter), which the Handbook
explicitly permits — it must never name or imply a rival brand.

---

## 5. Visible vs. "invisible" pages — the architecture, and an honest warning

### What you asked for, and the risk in it

The ask: pages that are live and indexed, but not reachable from the nav/header/footer, so only
someone with the URL or a matching search lands there.

**This works — with one hard condition.** Pages built only to capture keyword variants, with thin
or near-duplicate content, are **doorway pages**, which is an explicit Google spam-policy
violation and can draw a manual action against the whole domain. The difference between a
legitimate landing page and a doorway page is not visibility — it's whether the page carries
genuinely unique, useful information.

Two rules that keep this on the right side of the line:

1. **Each page must say something different**, not the same paragraph with the city swapped. A
   GIFT City page should talk about GIFT City specifically — which towers, what's actually there
   now, what a Pod there would serve.
2. **"Invisible" must mean "not in the primary nav," not "zero inbound links."** A page with no
   internal links anywhere is an orphan: crawled rarely, weighted poorly, and it won't rank
   regardless of how good the keywords are. Each one should be linked from at least one
   contextual place (a relevant blog post, or a compact "areas and spaces" index), plus
   `sitemap.xml`.

### Recommended architecture

**Tier 1 — Visible (in nav/footer), metadata-optimised only.** The 15 pages in §1. No new keyword
pages needed here; these carry brand and convert.

**Tier 2 — Indexed, linked contextually, NOT in the main nav.** The real SEO expansion. Each is a
genuine solution/locality page with unique content, linked from relevant blog posts and the
Partnership page, listed in `sitemap.xml`:

| Proposed page | Slug | Primary keyword cluster |
| --- | --- | --- |
| Coffee for offices | `/coffee-for-offices` | coffee kiosk for corporate office, office coffee counter, coffee vendor for office |
| Coffee for co-working | `/coffee-for-coworking-spaces` | coffee kiosk for coworking space, coworking coffee amenity |
| Coffee for campuses | `/coffee-for-campus` | coffee kiosk for university, campus coffee vendor, college coffee counter |
| Coffee for gyms | `/coffee-for-gyms` | gym coffee partner, pre-workout coffee counter |
| Coffee catering, Ahmedabad | `/coffee-catering-ahmedabad` | corporate coffee catering Ahmedabad, coffee cart, coffee pop-up |
| GIFT City & Gandhinagar | `/coffee-gift-city-gandhinagar` | coffee GIFT City, specialty coffee Gandhinagar |

**Tier 3 — Noindex, not in sitemap.** The ~24 existing `-legacy` / `-letter` / `-story` variants.
Already correctly noindexed. Leave them.

### Phasing — do not ship all six at once

Six thin pages launched together is the doorway-page pattern. Ship **two first**
(`/coffee-for-offices` and `/coffee-for-coworking-spaces` — the highest commercial value per §5 of
the research), each with real, specific content. Measure for 4-6 weeks. Expand only if they index
and hold.

---

## 6. Surface-by-surface keyword placement

### Footer
The footer appears on every page, so it's the highest-frequency internal-linking surface — but
Master Copy v4 and the mobile/tablet footer lock in `design.md` govern its *layout and copy*.
Safe additions that don't touch the locked structure:

- Link the Tier-2 pages from the existing **"Pods & people"** footer column (it already carries
  "Planned locations," "Host a Pod," "Partner with us") — adding "Coffee for offices" and "Coffee
  for co-working" there is a natural fit and solves the orphan-page problem in one move.
- Do **not** keyword-stuff the footer or add a link farm. Two to four contextual links maximum.
- The footer's P.S. sign-off and blessing line stay exactly as they are.

### Partnership page (`partnership.html`) — biggest commercial opportunity on the site
- **Title:** rewrite per §1 (currently has zero B2B keywords).
- **Body copy:** stays in Master Copy v4's approved B7 wording — which already uses the
  facilities-manager vocabulary ("we bring the counter, the barista and the beans," "50-100 sq ft,"
  "no setup complexity"). Nothing to fix in voice.
- **Add an FAQ block** with the B2B questions from §2 — this is where the keyword density can
  legitimately live, in question text, inside FAQPage schema.
- **Add the complementary-vendor line** from the research: something to the effect that a Pod sits
  alongside an existing cafeteria or catering vendor rather than replacing one — this is what makes
  the page findable next to MealPe/GoKhana/HungerBox/SmartQ/KhanePe searches.
- **Link out** to the Tier-2 solution pages (offices / co-working / campus / gyms).

### Enquiry pages (`partnership-enquiry`, `event-enquiry`, `pack-enquiry`)
Transactional, bottom-of-funnel. Metadata only (§1). Do not add FAQ blocks or keyword content —
these pages convert, and anything that delays the form hurts the first rule in the precedence
order (speed). Keep them clean.

### Schema / JSON-LD (invisible to readers, read by AI)
- `Organization` schema on the homepage carrying the corrected entity definition from
  `seo-keyword-strategy.md` §1 — **specialty grade, never species; range, never price.**
- `FAQPage` on `faq.html`, `partnership.html`, and every blog post that has a visible FAQ.
- `LocalBusiness` per Pod, once addresses exist (not yet — pre-launch).
- `Service` schema on each Tier-2 solution page.

---

## 6b. Google sitelinks — what is and isn't controllable

The expanded list of sub-pages under a brand search result (the thing abCoffee and First Coffee
both have) is called **sitelinks**. Worth stating plainly, because it is easy to promise:

**Sitelinks cannot be forced.** Google generates them algorithmically. There is no markup that
creates them, no tag that nominates a page, and no Search Console setting that adds one. They also
tend to require established brand-search volume, which a pre-launch brand does not yet have.

What *is* controllable, and was implemented 2026-09-21:

| Lever | Why it matters |
| --- | --- |
| `Organization` + `WebSite` + `SiteNavigationElement` schema on the **homepage** | How Google builds the brand entity and understands site structure |
| Unique, front-loaded `<title>` per page | Becomes the sitelink's visible label |
| Unique `<meta name="description">` per page | **Becomes the sitelink's description.** Sitelinks truncate around 65 characters, so the first sentence has to work standalone |
| Clean internal nav with descriptive anchor text | Already in place via `ps.js` `PAGES` and the footer |
| Accurate `sitemap.xml` | Already in place |

### The bug this surfaced

All five brand schema blocks (`Organization`, `WebSite`, `SiteNavigationElement`,
`CafeOrCoffeeShop`, `DataFeed`) were sitting on **`home-legacy.html`, which is
`noindex,nofollow`** — while the live `index.html` had **zero structured data**. When the
letter-led redesign replaced the homepage, the schema did not come with it, so Google could not
see any of it. Fixed by adding a consolidated `@graph` to `index.html`.

### Two things deliberately not ported

- **`SearchAction` / sitelinks searchbox** — the legacy markup claimed a site search at
  `/blogs?q=`. No such search exists; `blogs.html` has no query handling at all. Claiming a
  search feature that does not work is false markup, so it was dropped. Add it back only if a
  real search results page is built.
- **`CafeOrCoffeeShop`** — a `LocalBusiness` subtype with no street address, no hours and no open
  location. Consistent with §6's rule: `LocalBusiness` schema ships per Pod, once addresses
  exist. Thin LocalBusiness markup on a pre-launch brand is a liability, not a win.

---

## 7. Two conflicts to resolve before implementing

1. **`blog/what-is-arabica-coffee-india.html`** — the slug, title and content carry a species
   claim ("Arabica") that Master Copy v4 explicitly retires. The page is indexed and has real
   search demand behind it. Options: (a) leave the slug, soften the copy toward "specialty grade"
   framing; (b) retire the post and 301 it to a new "what specialty grade means" post. **(a) is
   safer** — the slug keeps its search equity, and the copy can stop making the claim. Needs your
   call, not mine.
2. **`matcha.html` H1 is "Matcha tonight. Coffee tomorrow."** which is an H8 flagship P.S. line
   used as a headline. The Handbook says a P.S. line is "always last, never the headline." Worth
   flagging to the brand owner — it may be a deliberate exception, but it reads as a rule
   violation and I shouldn't silently "fix" approved copy.

---

## 8. Implementation sequence

| Step | Scope | Risk | Status |
| --- | --- | --- | --- |
| 1 | Title rewrites, 15 live pages (§1) | Low — metadata only, no visible copy, no voice conflict | **Done** 2026-09-21 |
| 2 | Add missing blog post to `sitemap.xml` | None — bug fix | **Done** 2026-09-21 |
| 3 | FAQ expansion on `faq.html` + matching JSON-LD (§2) | Low | **Done** — 10 questions added (25→35), schema regenerated from visible HTML |
| 4 | FAQ additions to existing blog posts (§3) | Low | **Done** — 20 questions across the 10 posts that have FAQ blocks. See note below on the other 4 |
| 5 | `partnership.html` FAQ block + complementary-vendor line + internal links (§6) | Low-medium — touches approved page copy, needs voice review | **Done** 2026-09-22 — FAQ block shipped 2026-09-22; complementary-vendor line added under the "Where Pods work" grid, carrying the two Tier-2 links |
| 6 | Two Tier-2 pages: `/coffee-for-offices`, `/coffee-for-coworking-spaces` (§5) | Medium — new pages, doorway risk if thin | **Done** 2026-09-22 — both live, unique content, 5-question FAQ each, `Service` + `FAQPage` schema, in `sitemap.xml`, linked from the footer and the Partnership page |
| 7 | Eight new blog posts (§4) | Medium — volume of new copy, each needs voice review | In progress — briefs written for the writer, posts not yet written. See [`briefs/`](briefs/) |
| 8 | Remaining four Tier-2 pages, only if step 6 indexes and holds | Medium | Deferred — measure step 6 for 4-6 weeks first |

Steps 1-6 are done. Step 7 is with the writer and step 8 is deliberately held back until step 6
has been measured. The visible copy added in steps 5 and 6 still wants a brand-owner read, per the
Handbook's escalation rule — it was written to Master Copy v4 and the Handbook, but it was not
written by the brand owner.

### Step 9 — supporting artefacts (done 2026-09-22)

- **Keyword database** — 336 rows on the §9 schema: [`seo-keyword-database.md`](seo-keyword-database.md)
  and [`data/seo-keyword-database.csv`](data/seo-keyword-database.csv). Demand and competition are
  labelled estimates; the load-bearing columns are Recommended page, Schema type, Brand-voice check
  and Priority.
- **Ecosystem outreach angle** — [`partner-ecosystem-outreach.md`](partner-ecosystem-outreach.md):
  KhanePe/RoomPe first, MealPe/GoKhana after one live Pod, HungerBox/SmartQ/Pluxee later. Plan
  only, not authorised to send.
- **`robots.txt`** — AI and answer-engine crawlers (GPTBot, OAI-SearchBot, Google-Extended,
  ClaudeBot, PerplexityBot, Applebot-Extended) now allowed explicitly rather than by wildcard.

### Step 4b — the four posts that had no FAQ block (done 2026-09-21)

`join-ps-coffee-team-cofounder`, `ps-pass-coffee-subscription-india`,
`specialty-vs-regular-coffee-no-jargon` and `what-is-a-barista-history-word-craft` — the four
written fresh after Master Copy v4 — carried **no FAQ section and no FAQPage schema**, leaving
them invisible to the entire AI-citation path.

Each now has a 3-question FAQ block plus its own FAQPage schema, placed between `.psline` and
`.ctab-box` to match the rich template's block order (`psline → faqs → tags → pnnav → ctab-box`).
No CSS was needed: `.journal-post-body .faqs` and `.faq-item` already exist globally in `wh.css`,
and `ps.js` binds `.faq-item` at load, so the accordion works with markup alone.

**All 14 blog posts now carry FAQPage schema** — 94 questions across the blog, 128 sitewide
including `faq.html`.

### Method note worth keeping

For both step 3 and step 4, the FAQPage JSON-LD was **regenerated from the visible HTML** rather
than maintained as a second hand-written list. Schema that disagrees with visible text is
penalised, and hand-maintaining two copies guarantees drift. Reuse this approach for any future
FAQ work.
