# P.S. Coffee — Contributor Guide (Claude & Codex)

This file is the source of truth for both Claude Code and Codex when working on this repo.
Both agents push directly to `main` on the same GitHub repo → Vercel auto-deploy.

P.S. Coffee (pscoffee.in) is a pre-launch specialty-coffee "Pod" brand's marketing website: a
static, framework-free multi-page HTML/CSS/JS site with two Vercel serverless functions handling
form submissions into Google Sheets. There is no build step — every page is deployed as-is.

---

## Tech stack
Static HTML (one file per page, flat at repo root) · plain CSS (`ps.css` tokens, `wh.css` layout,
`mobile.css` responsive) · vanilla JS (`ps.js`, `mobile.js`, `image-slot.js`) · self-hosted woff2
fonts · 2 Vercel serverless functions (Node ESM) · Google Sheets as the form-submission datastore
(`googleapis` npm package, the only dependency) · Vercel hosting/deploy. Full detail in
[docs/architecture.md](docs/architecture.md).

## Commands
```bash
git pull origin main     # ALWAYS run first — Codex also pushes here, local can be behind
python3 -m http.server 8080   # local preview, http://localhost:8080
npm install               # only dependency is googleapis
git push origin main       # → triggers Vercel auto-deploy, no manual deploy step exists
```
No test, lint, format, or build command exists in this repo.

---

## Reference Map
- Architecture and stack → @docs/architecture.md
- API routes and schemas → @docs/api-reference.md
- Naming and code conventions → @docs/conventions.md
- Current tasks and open items → @docs/tasks.md
- Session history and decisions → @MEMORY.md
- Design System and typography → @docs/design.md

Fetch only the doc relevant to the task at hand — don't re-read this whole file's history or
every doc for a routine change. Historical/superseded decisions live in @ARCHIVE.md (reference
only, never read at session start).

---

## Standing instructions

- **Always read MEMORY.md before making structural changes.** Use it silently to inform work —
  don't announce what you found.
- **Always check docs/conventions.md before adding new files, folders, modules, or components.**
- **Always `git pull origin main` before starting any work** — the other agent may have pushed
  since your last session.
- When told "remember this," write the information to MEMORY.md immediately and confirm you've
  done it.
- **Where things go:** does it prescribe behaviour ("always," "never," "before doing X, do Y")?
  → this file, under the right section, or the matching `docs/` file. Does it describe a fact
  about the world that could change (contact details, project status, a decision)? → MEMORY.md.
  When unsure, suggest which file it belongs in and ask to confirm.
- **Memory hygiene:** keep each MEMORY.md entry to two sentences max; keep MEMORY.md under 150
  lines — compress verbose entries first, then move overflow to ARCHIVE.md; current-state content
  (active projects, contact info, working conventions) stays in MEMORY.md regardless of age; move
  an entry to ARCHIVE.md once its project/decision is outdated or completed.
- **Never commit:** `.claude/`/`.codex/` (session config), `.image-slots.state.json`, `.DS_Store`,
  `node_modules/`, or a `*.xlsx` workbook (delete temporary copies before committing) — all
  already in `.gitignore`, don't force-add them.
- Asset versions (`ps.js`/`wh.css`/`mobile.css` cache-bust numbers) are tracked in MEMORY.md —
  always re-read the current N from a live HTML file before bumping; see
  [docs/conventions.md](docs/conventions.md) for the bump procedure.
