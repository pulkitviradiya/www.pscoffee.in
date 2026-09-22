# SEO keyword database

**Rows:** 336 · **Built:** 2026-09-22 · **File:** [`data/seo-keyword-database.csv`](data/seo-keyword-database.csv)

The tracked sheet the research promised. It uses the column schema agreed in
[seo-keyword-strategy.md](seo-keyword-strategy.md) §9, unchanged, so the CSV can be pasted
straight into Sheets or a rank tracker without remapping anything.

---

## What the numbers are, and what they are not

**Demand, Competition, Opportunity and Commercial value are High/Medium/Low judgement calls, not
tool data.** No paid keyword tool was used. They come from the two research passes in
[seo-keyword-strategy.md](seo-keyword-strategy.md), the competitor scan in its §2, and manual
SERP reasoning about a pre-launch brand in Ahmedabad. Treat them as a prioritisation aid, and
overwrite them the moment real Search Console or Ahrefs data exists. The columns that are
*not* estimates, and that carry the actual decisions, are **Recommended page**, **Schema type**,
**Brand-voice check** and **Priority**.

## The column that stops this becoming a brand problem

**Brand-voice check** is the guard rail that lets an SEO sheet and a locked copy system coexist.
It records, per keyword, where the term is allowed to appear:

| Value | Rows |
| --- | --- |
| Clear | 286 |
| Never name a third-party brand in visible copy | 20 |
| Do not publish franchise claims without brand-owner sign-off | 15 |
| Meta and FAQ question text only | 14 |
| FAQ question text only, never self-description | 1 |

- **Clear** — the term can appear in visible copy if the sentence is otherwise in voice.
- **Meta and FAQ question text only** — the keyword is banned from visible brand copy by Master
  Copy v4 (kiosk, affordable, best, price framing). It may live in `<title>`, meta description,
  schema and FAQ *question* text. This is the rule set in
  [seo-implementation-plan.md](seo-implementation-plan.md) §0.
- **FAQ question text only, never self-description** — the `kiosk` pattern already shipped on
  `pods.html`: the word appears in the question, and the answer never adopts it.
- The Ecosystem and Franchise rows carry their own warnings: never name a third-party vendor in
  visible copy, and no franchise claims without brand-owner sign-off.

## Clusters

| Cluster | Rows |
| --- | --- |
| Consumer | 175 |
| B2B | 55 |
| GEO/AEO | 35 |
| Ecosystem | 20 |
| Campus | 18 |
| High-footfall | 18 |
| Franchise | 15 |

## Where the 53 P0 keywords land

| Recommended page | P0 rows | Examples |
| --- | --- | --- |
| Coffee for offices | 11 | can my office get a coffee counter, coffee for offices, coffee kiosk for corporate office, coffee vendor for office, corporate coffee Ahmedabad, corporate coffee service India … |
| Journal post | 10 | ceremonial grade matcha, ceremonial vs culinary matcha, matcha Ahmedabad, protein coffee, protein coffee India, what are The Letter and The P.S. … |
| Homepage | 9 | P.S. Coffee, P.S. Coffee Ahmedabad, P.S. Coffee Pods, P.S. Coffee host a Pod, P.S. Coffee menu, PS Coffee … |
| FAQ | 9 | coffee kiosk, coffee kiosk India, grab and go coffee, grab and go coffee India, grab and go specialty coffee, is P.S. Coffee open yet … |
| GIFT City locality page | 7 | coffee GIFT City, coffee for offices GIFT City, coffee near GIFT City, is there good coffee in GIFT City, is there specialty coffee in Gandhinagar, specialty coffee Gandhinagar … |
| Coffee for co-working | 5 | can a coworking space add specialty coffee, coffee for coworking space, coffee kiosk for coworking space, coworking coffee amenity, coworking space Ahmedabad coffee |
| Pods | 2 | how is a Pod different from a cafe, is a P.S. Pod a coffee kiosk |

Two of those destination pages now exist (`/coffee-for-offices`,
`/coffee-for-coworking-spaces`). The GIFT City page and the Journal posts are briefed but not
written — see [`briefs/`](briefs/).

## How to work this sheet

1. **Do not build a page per row.** Rows map to pages, many to one. A page per keyword variant is
   the doorway-page pattern the plan warns about in §5.
2. **Filter by Recommended page, not by Priority**, when planning a piece of work. The question is
   always "what does this page need to answer", never "what keywords can we fit".
3. **GEO/AEO rows are question phrasings.** They belong in FAQ blocks as question text, verbatim,
   with the answer at 40-60 words and mirrored into `FAQPage` schema regenerated from the visible
   HTML.
4. **Re-score after launch.** Every Demand and Competition value here is a pre-launch guess. Once
   Search Console has 90 days of data, replace the estimates with impressions and average
   position, and let the Opportunity column be arithmetic rather than opinion.
