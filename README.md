# P.S. Coffee Website

Static multi-page website for [pscoffee.in](https://pscoffee.in).

No framework, no dependencies, no build step. Push files to GitHub → Vercel deploys automatically.
See `CLAUDE.md` (or `AGENTS.md` — same content, mirrored for the two agents that work on this repo)
for the full contributor guide, and `MEMORY.md` for current project state and asset versions.

## Pages

```
index.html               Home
menu.html                Menu (coffee, matcha, protein, food)
matcha.html              Matcha landing
pack.html                P.S. Pack subscription
pack-enquiry.html        Pack enquiry form
app.html                 App page
pods.html                Pod model / locations
about.html               Brand story
partnership.html         Partner / host a Pod
partnership-enquiry.html Partnership enquiry form
join.html                Join the team
events.html              Events & collaborations
event-enquiry.html       Event enquiry form
blogs.html               Blog listing
feedback.html            Feedback form
faq.html                 Frequently asked questions
form-status.html         Shared post-submit status page for all forms
privacy.html             Privacy policy
terms.html               Terms of service
copyright.html           Copyright & IP notice
disclaimer.html          General disclaimer
survey-disclosure.html   Survey disclosure
404.html                 Not-found page (Vercel serves this automatically)
blog/                    Individual blog posts (10 posts)
```

## Assets

```
assets/
  ps.css            Canonical design-system layer — colour/spacing/radius/type tokens, nav,
                     footer, buttons, badges, forms (~600 lines)
  wh.css            The dominant stylesheet — most page layout, hero sections, cards, menu,
                     blog posts, matcha-context colour swaps (~7,700 lines; despite the name,
                     not blog-specific — see CLAUDE.md's CSS architecture section)
  mobile.css        Responsive overrides, @media (max-width: 760px) (~1,400 lines)
  ps.js             Site-wide behaviour: nav, footer, forms, the Nectar auto-highlight system
  mobile.js         Mobile-only scripts
  image-slot.js     Image slot utility (responsive image loading)
  fonts/brand/      Self-hosted Bricolage Grotesque, Space Grotesk, Instrument Serif (woff2)
  photos/site/      Optimised site images (webp)
  photos/           P.S. Pass product images (webp)
  icons/            Favicons, app icons, logo/monogram lockups (Terracotta + Ceremonial profiles)
```

## Vercel Settings

- Framework Preset: Other / No Framework
- Build Command: leave empty
- Output Directory: leave empty or `./`
- Root Directory: repository root

`vercel.json` enables clean URLs (`/menu` not `/menu.html`) and cache headers.

## Local Preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.
