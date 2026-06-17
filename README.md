# P.S. Coffee Website

Static multi-page website for [pscoffee.in](https://pscoffee.in).

No framework, no dependencies, no build step. Push files to GitHub → Vercel deploys automatically.

## Pages

```
index.html          Home
menu.html           Menu (coffee, matcha, food)
matcha.html         Matcha landing
pack.html           P.S. Pack subscription
app.html            App page
pods.html           Pod model / locations
about.html          Brand story
partnership.html    Partner / host a Pod
join.html           Join the build (investors, co-founders, etc.)
events.html         Events (planned)
blogs.html          Blog listing (planned)
privacy.html        Privacy policy
terms.html          Terms of service
survey-disclosure.html  Survey disclosure
blog/               Individual blog posts (6 posts)
```

## Assets

```
assets/
  ps.css            Site-wide styles
  ps.js             Site-wide scripts
  wh.css            Blog/journal-specific styles
  mobile.css        Mobile overrides
  mobile.js         Mobile scripts
  image-slot.js     Image slot utility
  photos/site/      Optimised site images (webp)
  photos/           P.S. Pass product images (webp)
  icons/            App store badge icons
```

## Vercel Settings

- Framework Preset: Other / No Framework
- Build Command: leave empty
- Output Directory: leave empty or `./`
- Root Directory: repository root

`vercel.json` enables clean URLs (`/menu` not `/menu.html`) and cache headers.

## Local Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.
