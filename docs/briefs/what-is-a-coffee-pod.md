# Content brief — "What is a coffee Pod, and how is it different from a cafe?"

**Status:** brief only, not written · **Type:** Journal post
**Proposed slug:** `/blog/what-is-a-coffee-pod`
**Owner:** unassigned · **Brief written:** 2026-09-22

---

## 1. Why this page exists

The Pod is the entity the whole brand rests on, and right now no page explains it to someone who
has never heard the word used this way. `pods.html` states what a Pod is in brand voice; this post
is the version a search engine or an AI assistant can quote back to someone who typed
"coffee kiosk" or "what is a coffee pod".

It is also where the **Pod-to-kiosk translation** does its most useful work. `pods.html` already
carries it as one FAQ question. This post is allowed to go further, because an explainer is the
one format where naming the word people search is not a positioning statement.

---

## 2. Target keywords

| Role | Term | Notes |
| --- | --- | --- |
| Primary | coffee pod (shop sense, not capsule) | Ambiguous term. The post must disambiguate from coffee capsules in the first hundred words or it will attract the wrong reader |
| Primary | coffee kiosk · coffee kiosk India | The word people actually search. Question text and comparison only, never self-description |
| Secondary | grab and go coffee · compact coffee format · coffee shop without seating · small format coffee shop | |
| Question form | "What is a coffee pod shop?" · "How is a Pod different from a cafe?" · "Is a coffee Pod the same as a kiosk?" | Use verbatim as FAQ question text |

**Intent:** informational, top of funnel, with a quiet commercial exit to `pods.html` and
`partnership.html`.

**The disambiguation problem is the brief's hardest constraint.** "Coffee pod" most commonly means
a capsule. Address it once, early, plainly, and move on. Do not build the post around the
confusion.

---

## 3. Governing copy rules

| Rule | Source | Applies here because |
| --- | --- | --- |
| Outlets are **always Pods, always capitalised**. Never kiosk, outlet, cafe, store, counter or branch as self-description | v4 §0.11 | This post says "kiosk" more than any other page will. It may only ever appear as someone else's word |
| The approved contrastive construction: *"A Pod is not a cafe. It is not a kiosk. It is a precision instrument for one outcome"* | v4 B3.02 | The brand's own template for handling the word. Follow it rather than inventing a new one |
| Placement: **in and around**, never "always inside" | v4 §0.9 | |
| Anti-format is allowed. Anti-competitor is banned | Handbook, failure mode 9 | Comparing against "a cafe" and "a pantry machine" is fine. Naming or implying a rival is not |
| No price argument. The format explains itself without one | v4 §0.7 | A writer will reach for "which is why it costs less". Do not |
| One P.S. sign-off, last | v4 §0.6 | |

**Banned words that specifically threaten this page:** premium, curated, revolutionary, disrupt,
concept, unique, "game changer", any price framing, any named competitor.

---

## 4. Structure

| Block | Content | Notes |
| --- | --- | --- |
| H1 | Plain and searchable. "What is a coffee Pod, and how is it different from a cafe?" works as written | Not a P.S. line |
| Lede, W2 | The answer in two sentences, before any story. Someone should be able to stop reading here and be right | This is the paragraph AI assistants will quote |
| H2 · First, the other kind of pod | Two or three sentences disambiguating from capsules. Then leave it alone | |
| H2 · What a Pod actually is | 50 to 200 sq ft, no seating, grab-and-go, under 90 seconds, in and around buildings | Source: v4 B3.02's spec list |
| H2 · What a Pod is not | A cafe, a kiosk, a vending machine. Use the contrastive construction | The kiosk sentence lives here |
| H2 · What gets removed, and what that buys | The subtraction: seating, Wi-Fi, table service, the dining room. What the saved space becomes | v4 A2 beat 3. Describe the trade, do not price it |
| H2 · Where a Pod goes | Offices, co-working floors, campuses, gyms, the corner outside | Link to the Tier-2 pages here |
| FAQ block, 5-6 Q | Standard Journal markup | `FAQPage` schema |
| Close | One P.S. sign-off. Link to `pods.html` | |

**Length:** 700-1,000 words.

---

## 5. FAQ questions to include

40-60 words each, mirrored exactly into `FAQPage` JSON-LD regenerated from the visible HTML.

- What is a coffee Pod?
- Is a coffee Pod the same as a coffee kiosk?
- How is a Pod different from a cafe?
- Is a coffee Pod the same as a coffee capsule or pod machine?
- How much space does a Pod need?
- Can I sit down at a Pod?

---

## 6. Internal links

**In:** `pods.html`, `blogs.html` index, `blog/why-we-built-pods-not-cafes.html`,
`blog/building-specialty-coffee-brand-without-cafe.html`

**Out:** `pods.html` (primary), `coffee-for-offices.html`, `coffee-for-coworking-spaces.html`,
`partnership.html`

This post should become the canonical internal destination for the phrase "what is a Pod".

---

## 7. The risk on this page

`blog/why-we-built-pods-not-cafes.html` already exists. **This post must not repeat it.** That
one is the argument for the decision; this one is the definition of the thing. If a draft starts
making the case for Pods rather than explaining what one is, it has drifted into the other post
and the two will compete with each other in search.

The test: could a facilities manager who has never heard of P.S. Coffee read this and correctly
describe a Pod to a colleague? That is the only job.

---

## 8. What this page must not do

- Adopt "kiosk" as a self-description anywhere outside a question or a contrast
- Claim a Pod is open, or name a location
- Argue price, or compare against what a cafe charges
- Name or imply a competitor
- Repeat the argument in `why-we-built-pods-not-cafes`
- Carry more than one P.S. sign-off

---

## 9. How to deliver

**Format:** plain prose, any format you already use. Not HTML. The markup and schema notes above
are build instructions for whoever ships the post.

**What to hand over:** the H1 and lede; the body with H2s marked in order; the FAQ as six
question-and-answer pairs, 40-60 words each, each written to stand alone because they are lifted
verbatim into schema; the single P.S. sign-off at the close.

**Word count:** 700-1,000 words, excluding the FAQ block.

**What not to try to write:** meta title, meta description, slug, kicker line, schema or
internal-link markup.
