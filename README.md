# P.S. Coffee Website

Static multi-page website for P.S. Coffee.

No framework, no dependencies, no build step. Upload these files to a GitHub repository root, then import the repository into Vercel.

## Files

```
index.html
menu.html
pack.html
matcha.html
app.html
story.html          # About page
about.html          # Pods / locations page
partnership.html
vercel.json
.image-slots.state.json
assets/
  image-slot.js
  ps.css
  ps.js
  wh.css
```

## Vercel Settings

- Framework Preset: Other / No Framework
- Build Command: leave empty
- Output Directory: leave empty or `./`
- Root Directory: repository root

`vercel.json` enables clean URLs and asset caching.

## Local Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

