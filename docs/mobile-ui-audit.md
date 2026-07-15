# P.S. Coffee Mobile UI/UX Audit

Date: 13 July 2026
Scope: mobile web only
Implementation status: corrections applied in the current worktree; desktop rules were not intentionally changed.

## Test Coverage

- Audited all 33 public HTML routes at 320, 360, 375, 390, 393, 414, and 430 CSS px.
- Automated matrix: 231 portrait renders at 844 CSS px height in Chromium and another 231 in Playwright WebKit.
- Interaction checks used a touch-enabled WebKit browser context at 390 x 844.
- Landscape smoke check used 844 x 390.
- Checked navigation drawer focus management, carousel swipe from media, FAQ expansion, form labels and validation, newsletter controls, reduced motion, media loading, horizontal overflow, and console errors.
- Final matrix in both engines: 0 fatal views, 0 broken-media views, 0 unlabelled-control views, 0 undersized-control views, and 0 document-level horizontal-scroll failures.
- The 224 automated protrusion flags are intentionally off-canvas or horizontally clipped UI: the closed navigation drawer, announcement marquee, and native content rails. They do not increase the document scroll width.
- The seven WebKit local console-error views are the expected `form-status.html` API lookup returning 404 because Vercel functions are unavailable under `python3 -m http.server`. Chromium recorded the same seven plus one transient local connection reset; no page failed.
- WCAG text-spacing stress at 390 px produced 0 overflows, 0 undersized controls, 0 unlabelled controls, and 0 empty-content failures across all 33 routes. Duplicate IDs found in `blogs.html` were corrected.
- Software-keyboard viewport simulation kept the focused field visible on all eight form-bearing routes. Fields remained 45-52 px high; standard form fields resolve to 16 px to prevent iOS input zoom.
- Slow-network simulation on seven representative routes produced 0 broken media, 0 document overflow, and a cumulative layout shift score of 0.
- Form-state simulation verified a single request under double-submit, visible loading state, disabled submit control, server-confirmed success, recoverable error, and restored controls. Production API checks returned 401 for unauthorised status access, 400 for an unknown form, and 200 for a clearly labelled synthetic app-waitlist submission.

## A. Executive Summary

The site had a strong visual identity but its mobile behaviour was inconsistent across page families. The main problems were undersized controls, desktop-oriented spacing, incomplete semantics, autoplaying mobile heroes, gesture areas that did not include all media, form fields without durable label relationships, and footer controls that were difficult to tap.

The implemented mobile layer now provides a coherent 20/24 px gutter system, a 44 px minimum control target, 48 px primary controls and fields, safe-area spacing, consistent focus treatment, labelled and keyboard-aware forms, accessible drawers and dialogs, touch-first carousels, and reduced-motion handling. Mobile typography and section rhythm are compact without shrinking body copy below readable sizes.

Highest-priority corrections completed:

1. Added accessible navigation drawer state, focus trapping, Escape handling, focus restoration, and background scroll locking.
2. Standardised mobile button, field, carousel, tab, accordion, and icon hit areas.
3. Removed mobile hero autoplay and made the complete hero/media surface swipeable without blocking vertical scrolling.
4. Added permanent form labels, input purpose attributes, validation announcements, and invalid-field focus.
5. Added iOS safe-area handling and viewport-fit support to every route.
6. Reduced mobile layout density and aligned hero, card, form, and footer spacing through shared tokens.
7. Added lazy and asynchronous loading to below-the-fold Pass, pack, and app media.

Residual risk is limited to hardware-specific iPhone behaviour: VoiceOver rotor order, Dynamic Type, Dynamic Island/notch/home-indicator clearance, Safari browser-toolbar transitions, and the system back-swipe edge gesture. Chromium and WebKit browser engines validate the DOM, layout, touch events, focus, software-keyboard viewport response, and throttled-network states, but cannot certify physical sensors or operating-system assistive technology.

## B. Mobile Design System Findings

| Token or pattern | Mobile standard | Reason |
|---|---:|---|
| Page gutter | 24 px; 20 px at 350 px and below | Preserves the brand's editorial spacing while keeping 320 px layouts usable. |
| Section spacing | 54 px default; 32-96 px only where hierarchy requires it | Replaces unrelated one-off gaps with a predictable rhythm. |
| Card gap | 16 px compact; 24 px feature groups | Keeps horizontal collections scannable without crowding. |
| Hero H1 | 32-40 px typical mobile cap; line-height about 1.0-1.08 | Keeps the offer dominant without consuming the whole viewport. |
| Section H2 | 28-36 px; line-height about 1.05-1.15 | Maintains the existing bold display language. |
| Body | 14-16 px; line-height 1.5-1.6 | Matches the implemented body system and supports long-form reading. |
| Labels and metadata | 10-12 px, uppercase only for W4 eyebrows | Preserves W4 as a supporting voice, not body copy. |
| Button copy | 13-15 px, semibold/bold by hierarchy | Keeps labels readable at compact widths. |
| Standard target | 44 x 44 px minimum | Mobile accessibility baseline for all discrete controls. |
| Primary buttons and inputs | 48 px minimum height | Easier one-handed use and stable software-keyboard interaction. |
| Border radii | 6, 9, 12, 16, 22 px; pills only for semantic chips | Avoids accidental egg-shaped buttons and preserves established brand geometry. |
| Borders | 1 px surfaces; 1.5-2 px visible focus treatment | Keeps cards restrained while making keyboard focus clear. |
| Icons | 20-24 px visual inside a 44 px target | Separates icon appearance from touch ergonomics. |
| Header | 62 px navigation plus 28 px announcement and safe area | Compact enough for content while keeping the brand and menu accessible. |
| Bottom navigation | Not introduced | The site is informational; a second navigation system would add clutter. |
| Product media | 1:1 | Matches menu imagery and avoids unstable card heights. |
| Pass cards | 9:15 | Preserves the established vertical Pass format on desktop and mobile. |
| App motion media | Source ratio, normally 804:1750 | Prevents GIF cropping and layout shifts. |
| Motion | 150 ms tap/focus, 250 ms component, up to 400 ms hero | Keeps feedback immediate without adding decorative motion. |
| Reduced motion | Disable autoplay and transforms; retain short opacity feedback | Respects user preferences without removing state feedback. |

## C. Page-by-Page Audit

Status terms: **Fixed** means implemented in the current worktree. **Verify on device** means the code path is prepared but physical iOS validation remains.

| Page | Section | Issue | Severity | Why it is a problem | Exact recommended fix / status |
|---|---|---|---|---|---|
| `index.html` | Header and navigation | Menu state and tap areas were not fully communicated to assistive technology. | High | Users could lose context or focus when opening the drawer. | **Fixed:** 44 px trigger, expanded/hidden state, current-page state, focus trap, Escape close, focus restoration, and body scroll lock. |
| `index.html` | Hero carousel | Mobile autoplay competed with reading and media could intercept swipe. | High | Motion reduced comprehension and swipe behaviour was inconsistent. | **Fixed:** mobile autoplay removed; complete hero supports touch swipe with vertical disambiguation and visible 44 px controls. |
| `index.html` | Pass and app sections | Dense mobile cards, small controls, and eager media increased effort and loading cost. | Medium | Content was harder to scan and below-fold assets loaded too early. | **Fixed:** shared spacing/target rules, compact mobile composition, lazy async Pass images and app GIF. |
| `index.html` | Footer | Newsletter button, social icons, and link rows were undersized. | High | Core sign-up and support actions were difficult to tap. | **Fixed:** 48 px newsletter controls, permanent hidden label, labelled social links, safe-area bottom padding. |
| `about.html` | Hero and editorial sections | Shared hero/body styles did not maintain a consistent mobile hierarchy. | Medium | The page felt like a compressed desktop layout. | **Fixed:** standard mobile hero type, gutters, section rhythm, and action targets. |
| `about.html` | Founder, quality, and connect sections | Text blocks and links had inconsistent mobile spacing. | Medium | Related content did not share alignment lines. | **Fixed:** shared page-list and CTA spacing; no desktop rules changed. |
| `app.html` | Hero | Supporting copy and CTA hierarchy were too dense. | High | The primary app value and next action were not immediately scannable. | **Fixed:** standard body typography, 48 px hero CTA, aligned footer content, preserved media ratio. |
| `app.html` | Built for habit cards | Cards had unequal body height and CTA placement; the added caffeine card expanded the rail. | High | Horizontal scanning and one-handed selection were inconsistent. | **Fixed:** card body rhythm, bottom-aligned CTAs, target sizes, source-specific media behaviour. |
| `app.html` | App motion and caffeine tracker | GIF frames could crop and tracker content exceeded one screen. | Medium | Motion examples felt visually unstable and overlong. | **Fixed:** source-ratio media frames, rounded-edge alignment, compact tracker composition, lazy media. |
| `app.html` | Download and related cards | Store badges were dead anchors and overlays lacked consistent contrast. | High | Non-functional links looked interactive; text could become unreadable over imagery. | **Fixed:** badges are non-interactive spans, overlay type uses high-contrast system colours, CTAs use standard focus/target rules. |
| `blogs.html` | Feature carousel | Text contrast and complete-area swipe support were inconsistent. | High | Featured stories were difficult to read and swipe. | **Fixed:** Steam Cream overlay copy, full-area touch swipe, no mobile autoplay, 44 px dots. |
| `blogs.html` | Filters, cards, and sign-up | Filter links and newsletter controls were undersized. | High | Discovery and subscription were difficult to operate. | **Fixed:** 44 px filters/topics, 48 px newsletter field/button, permanent label and visible focus. |
| `events.html` | Hero and event cards | Event CTAs did not consistently reach the mobile target size. | Medium | Secondary event actions required precision tapping. | **Fixed:** 44 px event CTAs and shared card spacing. |
| `event-enquiry.html` | Enquiry form | Labels, keyboard purpose, validation feedback, and field sizing were inconsistent. | High | Mobile completion and error recovery were weak. | **Fixed:** associated labels, autocomplete/inputmode, 48 px fields, inline errors, aria-invalid and invalid-field focus. |
| `faq.html` | FAQ accordion | Questions lacked complete expanded/controls relationships and target size. | High | Screen-reader state and touch operation were ambiguous. | **Fixed:** IDs, aria-expanded/controls, region answers, 44 px summaries, keyboard support. |
| `feedback.html` | Feedback form | Shared form accessibility and mobile sizing were incomplete. | High | Users could not reliably identify or correct invalid fields. | **Fixed:** shared labelled form system and validation announcement. |
| `form-status.html` | Status lookup | Recheck action was undersized; local API requests return 404. | Medium | The recovery action was hard to tap and local preview could appear broken. | **Fixed:** 44 px action. **Verify on deployment:** Vercel function response and loading/error/success states. |
| `join.html` | Hero and role sections | Mobile role copy had edge pressure and uneven section padding. | Medium | Long copy became visually dense at 320-360 px. | **Fixed:** shared mobile gutters, section spacing, body line-height, and action targets. |
| `join.html` | Interest forms and direct email block | Six form paths did not share durable labels and input purpose metadata. | High | Keyboard choice, autofill, and validation were inconsistent. | **Fixed:** all forms inherit labelled 48 px controls, input purpose, errors, and focus behaviour. |
| `matcha.html` | Hero, profile, and product content | Image/text balance and CTA sizing varied from standard pages. | Medium | The page did not feel part of the same mobile system. | **Fixed:** shared hero/body tokens, responsive media, touch targets, and gutters. |
| `menu.html` | Hero, filters, and product cards | Filter chips and product links had inconsistent target sizes and selected semantics. | High | Menu browsing required precise taps and selection state was not exposed. | **Fixed:** 44 px chips/tabs, aria-pressed/selected state, keyboard activation, product CTA targets. |
| `pack.html` | Hero | Pack-specific overrides bypassed standard hero body and action rules. | High | The page diverged whenever shared hero styling changed. | **Fixed:** Pack hero now inherits the standard page hero system with only content-specific exceptions. |
| `pack.html` | Pass rails and detail accordions | Dense details and small toggles made cards overlong and hard to scan. | High | Users had to scroll through repeated detail blocks before comparing Packs. | **Fixed:** collapsible semantic details, 44 px summaries, compact tags, consistent Pass ratios and focus states. |
| `pack.html` | Offers, convenience, and fine print | Highlight wrapping and heading scale could overlap on narrow screens. | High | Text collided at 320-360 px. | **Fixed:** cloned line-box highlights, mobile heading caps, standard body rhythm. |
| `pack-enquiry.html` | Pack form | Shared form requirements were incomplete. | High | Pack conversion could fail silently or open the wrong keyboard. | **Fixed:** labelled fields, keyboard purpose, 48 px controls, error announcement and invalid focus. |
| `partnership.html` | Hero and content rails | Overlay contrast, card body padding, and hero CTA spacing varied. | High | Core partner actions were harder to read and scan. | **Fixed:** shared overlay contrast, mobile gutters, balanced card copy, 44/48 px actions. |
| `partnership.html` | Related cards and enquiry split | Image overlays looked interactive but lacked consistent focus and target treatment. | Medium | Tappable media did not provide predictable feedback. | **Fixed:** visible focus, constrained overlay copy, standard CTA treatment. |
| `partnership-enquiry.html` | Partnership form | Shared mobile form semantics and sizing were missing. | High | A high-value conversion path was not optimised for mobile input. | **Fixed:** shared label, autocomplete, keyboard, validation, and target rules. |
| `pods.html` | Hero | CTA and P.S. note did not consistently sit at the bottom of the copy panel. | Medium | The action hierarchy changed with viewport height. | **Fixed:** flex-based mobile hero footer and shared body typography. |
| `pods.html` | Place cards and format section | Repeated card body and CTA alignment varied. | Medium | The four use cases did not read as a coherent group. | **Fixed:** common card rhythm, bottom-aligned 44 px actions, responsive text columns. |
| `404.html` | Error state | Error action and safe-area layout were not part of the shared mobile system. | High | Recovery from a missing route could be difficult. | **Fixed:** standard gutters, readable hierarchy, and mobile action target. |
| `copyright.html` | Legal article and footer | Long-form text and footer links had dense mobile spacing. | Medium | Legal content needs sustained readability. | **Fixed:** shared body line-height, content gutter, heading rhythm, safe-area footer. |
| `disclaimer.html` | Legal article and footer | Same shared legal-page issues as copyright. | Medium | Dense paragraphs increase reading fatigue. | **Fixed:** shared long-form and footer mobile rules. |
| `privacy.html` | Legal article and footer | Inline links remain visually compact within prose. | Low | Expanding every inline link to a visible 44 px box would damage reading rhythm. | **Accepted:** discrete controls meet 44 px; editorial links retain native inline behaviour and visible focus/underline. |
| `survey-disclosure.html` | Legal article and footer | Shared legal spacing and footer target issues. | Medium | Inconsistent legal layouts reduce trust. | **Fixed:** shared long-form rhythm and safe footer controls. |
| `terms.html` | Legal article and footer | Shared legal spacing and footer target issues. | Medium | Terms must remain readable at 320 px. | **Fixed:** shared long-form typography and gutters. |
| `blog/building-specialty-coffee-brand-without-cafe.html` | Article, TOC, CTA, footer | TOC rows were small and a CTA had malformed HTML. | Critical | The malformed link could break navigation. | **Fixed:** valid href/class markup, 44 px TOC rows, shared article/footer rules. |
| `blog/india-coffee-market-2030-opportunity.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Long articles need stable rhythm and clear navigation. | **Fixed:** shared article typography, TOC targets, CTA and footer rules. |
| `blog/morning-coffee-ritual-vs-routine.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Reading and in-page navigation were uneven. | **Fixed:** shared article system. |
| `blog/pre-workout-coffee-gym-ahmedabad.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Reading and in-page navigation were uneven. | **Fixed:** shared article system. |
| `blog/what-is-arabica-coffee-india.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Reading and in-page navigation were uneven. | **Fixed:** shared article system. |
| `blog/what-is-cold-brew-coffee-india.html` | Article, CTA block, footer | CTA overlay contrast and navigation targets varied. | High | The primary article conversion block was hard to read. | **Fixed:** design-system contrast, 44/48 px actions, shared article/footer rules. |
| `blog/what-we-are-building-ps-coffee-gujarat.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Reading and in-page navigation were uneven. | **Fixed:** shared article system. |
| `blog/why-coworking-spaces-ahmedabad-need-better-coffee.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Reading and in-page navigation were uneven. | **Fixed:** shared article system. |
| `blog/why-specialty-coffee-costs-300-rupees-india.html` | Article, TOC, CTA, footer | A CTA had malformed href/class markup. | Critical | Navigation could fail or expose invalid attributes. | **Fixed:** valid HTML plus shared article targets. |
| `blog/why-we-built-pods-not-cafes.html` | Article, TOC, CTA, footer | Shared long-form mobile and target inconsistencies. | Medium | Reading and in-page navigation were uneven. | **Fixed:** shared article system. |

## D. Component Audit

| Component | Finding | Implemented correction | Remaining validation |
|---|---|---|---|
| Header | Mobile trigger and active state lacked complete semantics. | 44 px control, aria label/expanded/controls, current-page state, safe-area placement. | Confirm sticky behaviour on physical Safari during fast scroll. |
| Navigation drawer | Focus and background scroll were not managed. | Focus trap, Escape close, restore focus, hidden state, body lock, overscroll containment. | Confirm VoiceOver rotor order on device. |
| Footer | Desktop column density, small links, and a small newsletter action reduced usability. | Mobile grouping, 44 px discrete links, 48 px newsletter controls, labelled social icons, safe-area bottom padding. | Confirm at 200% Dynamic Type on Safari. |
| Buttons | One-off dimensions produced mixed heights. | 44 px minimum; 48 px primary/hero/form actions; unified focus-visible treatment. | Inline editorial links intentionally remain inline. |
| Forms | Label association, keyboard purpose, and error state were inconsistent. | IDs/htmlFor, required state, autocomplete, inputmode, autocapitalize, 16 px input text, aria-invalid, alert errors, invalid focus. | Test software keyboard and autofill on physical iPhone. |
| Cards | Repeated card families had uneven body and action placement. | Shared mobile gutters, body rhythm, media ratios, and bottom-aligned actions. | Test extreme translated copy before localisation. |
| Carousels | Media did not always participate in swipe and autoplay reduced control. | Entire-area touch swipe, passive listeners, vertical disambiguation, visible 44 px dots, no mobile autoplay. | Validate Safari momentum and back-swipe coexistence. |
| Modals | Focus, hidden state, and page scroll could leak. | Aria hidden state, focus trap, Escape close, restore focus, body lock, safe-area insets. | Trigger every production modal manually on device. |
| Bottom sheets | No persistent production bottom sheet is currently exposed. | Existing modal rules support safe-area and scroll containment. | Add dedicated sheet semantics only if a sheet is introduced. |
| Tabs and filters | Selected state was visual only in places. | Tablist/tab semantics, aria-selected or aria-pressed, 44 px targets, keyboard activation. | Confirm filter result announcements if dynamic filtering expands. |
| Accordions | FAQ and Pack details had incomplete state relationships. | Semantic details/summary or aria-expanded/controls, 44 px targets. | Confirm VoiceOver announces expanded/collapsed wording. |
| Toasts | Safe-area and announcement behaviour needed consistency. | Safe-area offsets and live/alert-compatible error surfaces. | Production submission responses require deployed API testing. |
| Search | No global search component exists. | No new pattern introduced. | Re-audit if search is added. |
| Empty states | 404 and form-status are the primary empty/recovery states. | Clear hierarchy and accessible recovery actions. | Validate server-returned no-result copy on deployment. |
| Loaders | Static pages have limited loading state; form submissions are network-bound. | Stable control dimensions and duplicate-submit prevention path retained. | Slow-network device test remains required. |

## E. Gesture and Scrolling Audit

- **Swipe conflict fixed:** homepage and blog carousels now listen on the complete interactive surface, including images and placeholders.
- **Vertical scroll preserved:** gesture direction is checked before changing slides; listeners are passive and do not call `preventDefault()`.
- **Image interception fixed:** mobile media is non-draggable where it participates in horizontal interaction.
- **Autoplay removed on mobile:** users retain control and reduced-motion behaviour is predictable.
- **Accessible alternative provided:** 44 px pagination controls expose the active slide through `aria-current`.
- **Navigation scroll fixed:** the drawer locks background scroll and contains its own overscroll.
- **Modal scroll fixed:** dialogs lock the page, trap focus, close with Escape, and restore focus.
- **No document overflow:** all 231 tested views kept the document width within the viewport. The announcement track is intentionally clipped inside its own marquee.
- **No nested-scroll blocker found:** horizontal rails remain native overflow regions and vertical page scrolling remains available around them.
- **Landscape:** 844 x 390 remains scrollable without clipping; content order stays text-first where applicable.

## F. Before-and-After Recommendations

| Major issue | Before | Corrected behaviour | User benefit | Technical approach |
|---|---|---|---|---|
| Mobile navigation | Drawer state and focus could escape. | Drawer announces state, traps focus, locks the page, and restores focus. | Predictable navigation for touch, keyboard, and assistive technology. | Shared vanilla JS accessibility controller. |
| Carousel interaction | Swipe could fail when started on media; autoplay moved content. | Swipe works across the whole surface and mobile autoplay is disabled. | Direct manipulation without surprise motion. | Passive touchstart/touchend with distance and direction thresholds. |
| Touch targets | Many controls were visually and physically small. | Discrete controls are 44 px minimum; high-value controls are 48 px. | Lower error rate and easier one-handed use. | Shared mobile control tokens and component selectors. |
| Forms | Placeholder-led fields and weak errors. | Permanent labels, correct keyboard hints, local errors, and invalid focus. | Faster completion and clearer recovery. | Runtime association for existing forms plus shared CSS. |
| Mobile rhythm | Multiple page families used unrelated gaps and overrides. | Standard 20/24 px gutters and 54 px section rhythm. | The site feels coherent rather than compressed from desktop. | Mobile custom properties and shared layout rules. |
| Footer | Crowded columns and small newsletter action. | Scannable groups, safe bottom space, 48 px subscribe action. | Better discoverability and conversion. | Mobile grid and safe-area overrides. |
| Media loading | Below-fold Pass/app media loaded eagerly. | Below-fold assets load lazily and asynchronously with stable ratios. | Faster initial rendering and lower memory/network use. | Native loading/decoding attributes and reserved aspect ratios. |

## G. Prioritised Action Plan

### 1. Critical fixes

- **Complete:** malformed blog CTA markup corrected.
- **Complete:** unlabelled controls, navigation focus leakage, and broken swipe surfaces corrected.
- **Complete:** no broken media or fatal mobile route remains in the automated matrix.

### 2. Structural UI fixes

- **Complete:** shared gutter, section, control, safe-area, hero, card, and footer mobile rules.
- **Complete:** Pack now inherits standard page hero/body rules rather than maintaining a separate mobile system.

### 3. Interaction fixes

- **Complete:** touch-first carousel swiping, visible controls, modal/drawer focus and scroll management.
- **Complete:** WebKit swipe, focus restoration, software-keyboard viewport, accordion state, and validation behaviour.
- **Device-only:** validate Safari's operating-system back-swipe edge gesture on a physical iPhone.

### 4. Visual consistency fixes

- **Complete:** mobile typography caps, highlight wrapping, overlay contrast, aligned card actions, and consistent radii.
- **Next:** run a final content QA when copy or media inventory changes.

### 5. Accessibility fixes

- **Complete:** labels, input purpose, validation announcement, current/selected states, focus visibility, and reduced motion.
- **Complete:** text-spacing stress, enlarged copy reflow, keyboard focus, duplicate-ID, heading, and control-label checks.
- **Device-only:** VoiceOver rotor and Dynamic Type QA on a physical device.

### 6. Performance fixes

- **Complete:** below-fold media lazy loading, mobile autoplay removal, passive gesture listeners, and stable media ratios.
- **Complete:** delayed font/media simulation on representative pages produced no broken media, overflow, or layout shift.
- **Device-only:** inspect long-session Safari memory pressure on physical hardware.

### 7. Final polish

- **Complete:** deployed API authentication, rejection, and successful submission paths; local loading, success, duplicate-submit, and error UI states.
- **Device-only:** confirm notch, Dynamic Island, home indicator, browser-toolbar transitions, VoiceOver, and Dynamic Type on at least one small iPhone and one Pro Max device.

## H. Final Validation Checklist

| Requirement | Result | Evidence / limitation |
|---|---|---|
| Every mobile page reviewed | PASS | 33 routes in the seven-width matrix. |
| Every defined mobile width tested | PASS | 320, 360, 375, 390, 393, 414, 430 px in Chromium and WebKit. |
| Portrait tested | PASS | 231 renders per engine at 844 px height; 462 total. |
| Landscape tested where applicable | PASS | 844 x 390 smoke check on high-interaction page. |
| Header and navigation | PASS | 44 px trigger; drawer state, focus, scroll, and current page verified. |
| Footer | PASS | Newsletter 48 x 48; mobile groups and safe-area spacing verified. |
| Hero hierarchy and CTA placement | PASS | Shared mobile hero rules applied, including Pack exceptions removed. |
| Typography hierarchy | PASS | Mobile type scale and body line-height applied across page families. |
| Spacing and alignment | PASS | Shared 20/24 px gutter and section rhythm; no body overflow. |
| Cards compact and aligned | PASS | Shared mobile card/action rules and semantic Pack details. |
| Buttons and discrete controls | PASS | 0 undersized-control views in both seven-width matrices; 44 px minimum and 48 px primary fields/actions. |
| Forms labelled and keyboard-aware | PASS | Runtime audit confirmed label, required, autocomplete, 16 px text, and 48 px height. |
| Validation announced and focused | PASS | aria-invalid and invalid-field focus verified. |
| Swipe from image/placeholder | PASS | TouchEvent verification changed both homepage and blog slides. |
| Vertical scrolling around sliders | PASS | Directional passive gesture handling; no preventDefault. |
| Reduced motion | PASS | Autoplay disabled and reduced-motion CSS applied. |
| Broken media | PASS | 0 views across 231 renders. |
| Unlabelled controls | PASS | 0 views across 231 renders. |
| Fatal route/render errors | PASS | 0 views across 231 renders. |
| Document horizontal overflow | PASS | No document scroll-width failure; marquee clipping is intentional. |
| Empty/error states | PASS | 404 and form-status layouts reviewed; production API returned the expected 401 and 400 error states. |
| Safe-area CSS | PASS | `viewport-fit=cover` and env-based top/bottom insets on all routes. |
| Physical notch/Dynamic Island/home indicator | PARTIAL | CSS support implemented; requires physical iPhone verification. |
| Software keyboard does not cover active controls | PASS | WebKit 390 x 480 keyboard simulation kept focused fields visible across all eight form-bearing routes; physical-device spot check remains recommended. |
| VoiceOver and Dynamic Type | PARTIAL | Semantics/focus implemented; requires device assistive-technology QA. |
| Slow network and deployed form states | PASS | Seven-route throttled-media test: 0 broken media, 0 overflow, CLS 0. Form UI and production 401/400/200 paths verified. |

## Verification Commands

```bash
# Static syntax and whitespace
git diff --check
node --check assets/ps.js
node --check assets/mobile.js

# Local preview
python3 -m http.server 4175

# The temporary Playwright audit used for this session covered all 33 routes
# at seven widths and wrote its structured output to /tmp/ps-mobile-audit.json.
```
