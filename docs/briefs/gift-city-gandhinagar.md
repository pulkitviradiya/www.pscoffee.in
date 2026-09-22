# Content brief — GIFT City & Gandhinagar locality page

**Status:** brief only, not written · **Type:** Tier-2 landing page (indexed, not in main nav)
**Proposed slug:** `/coffee-gift-city-gandhinagar`
**Owner:** unassigned · **Brief written:** 2026-09-22

---

## 1. Why this page exists

GIFT City is the strongest single locality opportunity found in the keyword research
([seo-keyword-strategy.md](../seo-keyword-strategy.md) §3): a dense, growing Global Capability
Centre cluster with almost no specialty coffee supply in search results. Nobody owns
"coffee GIFT City" today.

It is also the page most at risk of becoming a **doorway page**. The whole value of this brief is
§7 — what makes this page genuinely different from a Prahlad Nagar page with the name swapped.
If the writer cannot satisfy §7, **do not publish it.**

---

## 2. Target keywords

| Role | Term | Notes |
| --- | --- | --- |
| Primary | coffee GIFT City | Near-zero competition, low volume, high intent |
| Primary | specialty coffee Gandhinagar | Slightly broader, still thin supply |
| Secondary | coffee near GIFT City · grab and go coffee GIFT City · coffee for offices GIFT City | |
| Secondary | GCC amenities coffee partner · coffee kiosk tech park Gujarat | B2B crossover, see §6 |
| Question form | "Where can I get coffee in GIFT City?" · "Is there specialty coffee in Gandhinagar?" | Use as FAQ question text verbatim |

**Intent mix:** roughly 60% informational (what's there now), 40% commercial (join waitlist /
host a Pod). Write for the person who works in a GIFT City tower and is tired of their options.

---

## 3. Governing copy rules

| Rule | Source | Applies here because |
| --- | --- | --- |
| Placement language: **"in and around the places your day already runs through"**, concrete version **"inside your building, or the corner you pass on the way in"**. Never claim every Pod is inside. | v4 §0.9 | A locality page is exactly where a writer will over-claim |
| Pre-launch framing throughout. No confirmed address, no date, no live ordering. | v4 Part I | Nothing is open. "Planned" and "exploring" are the operative words |
| Pods, always capitalised. Never kiosk/outlet/cafe/store/counter/branch in visible copy. | v4 §0.11, Handbook | The one exception is the FAQ pattern used on `pods.html` — see §6 |
| Specialty grade, never a species claim. | v4 §0.8 | |
| No price argument. The number lives on the Menu as data. | v4 §0.7 | A locality page invites "cheaper than the tower cafe" comparisons. Do not |
| Max three P.S. sign-offs on the page, each last in its section, never a headline. | v4 §0.6 | |
| English UK, no em dashes, no exclamation marks, no emoji. | Handbook | |

**Banned words that specifically threaten this page:** affordable, cheap, budget, convenient
(as a value claim), premium, hub, ecosystem, destination, "best coffee in GIFT City".

---

## 4. Structure

| Block | Content | Schema |
| --- | --- | --- |
| H1 | Written to the place, in the salutation pattern: *Dear GIFT City.* style is available here (v4 §0.12) and is the strongest option — it is the letter device doing real work | — |
| Intro, W2 | Two or three sentences. What GIFT City's coffee situation is now, plainly. No pitch yet | — |
| H2 · What's there now | The honest state of play: towers, canteens, what a 9am cup currently means there | — |
| H2 · What a Pod would change | Format, footprint, the walk-up. Ties to `pods.html` | — |
| H2 · Where a Pod could sit | In and around: tower lobbies, the corner on the way in. **Never** claim a specific tower | — |
| H2 · For building and facilities teams | Short B2B block, 3-4 sentences, links to `partnership.html` | `Service` |
| FAQ block, 4-5 Q | Use the `.faq` / `.faq-item` / `.faq-q` + `.pm` markup — `ps.css` styles it globally, `ps.js` binds it. See `pods.html` for the exact pattern | `FAQPage` |
| CTA | **`pods.html?area=gift-city#waitlist`** — deep-links the waitlist with the area pre-selected. Use this exact URL, not a bare `/pods` | — |

**Length:** 600-900 words. Long enough to be substantive, short enough not to pad. If it needs
padding to reach 900, it is not ready.

---

## 5. FAQ questions to include

Each answer 40-60 words, mirrored exactly into `FAQPage` JSON-LD (regenerate the schema from the
visible HTML — never hand-maintain two copies).

- Is there specialty coffee in GIFT City?
- Will P.S. Coffee open a Pod in GIFT City?
- What about the rest of Gandhinagar?
- Can a GIFT City building host a Pod?
- How will I know when a Pod opens near GIFT City?

---

## 6. Internal links

**In (required — otherwise this is an orphan and will not rank):**
- `pods.html` — from the planned-areas section, on the GIFT City entry
- `blog/what-we-are-building-ps-coffee-gujarat.html` — contextual link in the areas paragraph
- Footer "Pods & people" column (see [seo-implementation-plan.md](../seo-implementation-plan.md) §6)

**Out:** `pods.html`, `partnership.html`, `menu.html`, `pods.html?area=gift-city#waitlist`

---

## 7. What makes this page different — mandatory

The writer must be able to fill all four before publishing. If two or more come back generic,
kill the page and fold the content into `pods.html` instead.

1. **Who is actually there.** GIFT City's working population skews to financial services, GCC
   back-office and IT. That is a different daily rhythm from Prahlad Nagar's mixed retail and
   office crowd. Name that difference concretely.
2. **What the coffee situation actually is.** Requires real research: what exists in and around
   the towers today, what the canteen/pantry situation is. Do not guess. If it cannot be
   verified, describe the category gap rather than inventing specifics.
3. **Why the format fits this place specifically.** Tower density and controlled access change
   what "in and around" means here versus a street-facing corner in Ahmedabad.
4. **One thing true only of GIFT City.** The Gandhinagar/Ahmedabad split, the commute pattern,
   the mandated-hours rhythm — something a reader who works there would nod at.

---

## 8. What this page must not do

- Claim a Pod is opening in GIFT City, or imply a date
- Name a specific tower, developer or company as a confirmed site
- Compare against a named competitor or a specific existing cafe
- Argue price, or use the word affordable
- Duplicate paragraphs from `pods.html` or the Gujarat blog post
- Ship without the §7 answers

---

## 9. Note for the writer: spelling

**Resolved 2026-09-22.** The site previously wrote **"Gift City"** in the waitlist dropdowns and
**"GIFT City"** elsewhere. The official name is GIFT City (Gujarat International Finance Tec-City),
an acronym, and every visible label now uses it. The form option value stays `gift-city`, and so
does the `?area=gift-city` deep link — only the label changed.

---

## 10. How to deliver

**Format:** plain prose in whatever you already write in — Google Doc, Word, Markdown, email
body. Do not write HTML. The markup notes in §4 (`.faq-item`, `FAQPage` JSON-LD, the deep-linked
CTA URL) are build instructions for whoever ships the page, not for you.

**What to hand over:**

1. The H1, exactly as you want it to read.
2. The body copy, with the H2s marked so section order is unambiguous.
3. The FAQ block as five question-and-answer pairs, answers 40-60 words each. Write the answers
   as standalone paragraphs: they are lifted verbatim into schema, so an answer that only makes
   sense after reading the section above it will not work.
4. The P.S. sign-offs, marked where they belong. Maximum three, each last in its section.

**Word count:** 600-900 words, excluding the FAQ block.

**What not to try to write:** meta title, meta description, slug, schema, or internal-link
markup. Those are handled separately and are deliberately not brand-voice territory.

**If §7 point 2 cannot be researched:** say so in the handover rather than filling the gap. The
brief's own permitted fallback is to describe the category gap instead of inventing specifics,
and a flagged gap is fixable. An invented detail about a real building is not.

---

## 11. Note on the GIFT City Journal post (plan §4, post 6)

The implementation plan lists **both** this Tier-2 page and a Journal post,
"Coffee in GIFT City and Gandhinagar: what's there, what isn't", on almost the same keyword set.
**Do not write both at the same time.** Two pages on `coffee GIFT City`, published together, by
the same site, is self-competition at best and the doorway-page pattern at worst.

The split, if both ever ship:

| | This page | The Journal post |
| --- | --- | --- |
| Job | Convert. What a Pod there would be, and how to ask for one | Explain. What the coffee situation in GIFT City actually is today |
| Voice | Locality page, salutation H1, CTA-led | Journal, observational, no CTA beyond a link |
| Keyword | `coffee GIFT City`, `specialty coffee Gandhinagar` | `what's there, what isn't` long-tail and question forms |

**Sequence:** ship this page first, leave it four to six weeks, and write the post only if the
page indexes and the research in §7 turned up enough real material to say something the page did
not. If §7 came back thin, the post should not exist at all.
