# P.S. Coffee — Contributor Guide (Codex & Codex)

This file is the source of truth for both Codex and Codex when working on this repo.
Both agents push directly to `main` on the same GitHub repo. Vercel normally auto-deploys, but use
the documented direct-deploy fallback while the GitHub integration is unhealthy.

P.S. Coffee (pscoffee.in) is a pre-launch specialty-coffee "Pod" brand's marketing website: a
static, framework-free multi-page HTML/CSS/JS site with two Vercel serverless functions handling
form submissions into Google Sheets. There is no build step — every page is deployed as-is.

---

## Tech stack
Static HTML (one file per page, flat at repo root) · plain CSS (`ps.css` tokens, `wh.css` layout,
`mobile.css` responsive) · vanilla JS (`ps.js`, `mobile.js`, `image-slot.js`) · self-hosted woff2
fonts · 2 Vercel serverless functions (Node ESM) · Google Sheets as the form-submission datastore
(`googleapis` npm package, the only dependency) · GA4 sitewide analytics (`G-5TS0QMZ55W`) ·
Vercel hosting/deploy. Full detail in
[docs/architecture.md](docs/architecture.md).

## Commands
```bash
git pull origin main     # ALWAYS run first — Codex also pushes here, local can be behind
python3 -m http.server 8080   # local preview, http://localhost:8080
npm install               # only dependency is googleapis
git push origin main       # push the committed source
vercel --prod --yes        # current fallback while GitHub-to-Vercel sync is unhealthy
vercel inspect <url>       # deployment is complete only when status is Ready
```
No test, lint, format, or build command exists in this repo.

---

## Reference Map
- Architecture and stack → @docs/architecture.md
- API routes and schemas → @docs/api-reference.md
- Naming and code conventions → @docs/conventions.md
- Current tasks and open items → @docs/tasks.md
- Session history and decisions → @MEMORY.md
- Brand voice, copy hierarchy, punctuation, pricing, and savings rules → @docs/copy-system.md
- Design System and typography (as implemented in this codebase) → @docs/design.md
- Full brand-kit reference, all 45 sections (voice, colour, type, logo, photography, digital,
  print) → @docs/design-system.md — audit against this directly; it does not need to be
  re-attached each session

Fetch only the doc relevant to the task at hand — don't re-read this whole file's history or
every doc for a routine change. Historical/superseded decisions live in @ARCHIVE.md (reference
only, never read at session start).

---

## Memory System

- **Always read MEMORY.md before making structural changes.** Use it silently to inform work —
  don't announce what you found.
- When told "remember this," write the information to MEMORY.md immediately and confirm you've
  done it.
- **Where things go:** does it prescribe behaviour ("always," "never," "before doing X, do Y")?
  → this file, under the right section, or the matching `docs/` file. Does it describe a fact
  about the world that could change (contact details, project status, a decision)? → MEMORY.md.
  When unsure, suggest which file it belongs in and ask to confirm.

**Memory hygiene rules:**
1. Keep each memory entry to two sentences max.
2. Keep root MEMORY.md under 150 lines; if it exceeds 150, compress verbose entries first, then
   archive the overflow to ARCHIVE.md.
3. Current-state content (active projects, contact info, working conventions) stays in MEMORY.md
   regardless of age.
4. When a project completes or an entry becomes outdated, move it from MEMORY.md to ARCHIVE.md
   automatically.
5. ARCHIVE.md is reference-only: never read at session start, only pulled up when asked about
   something historical.

---

## Standing instructions

- **Always check docs/conventions.md before adding new files, folders, modules, or components.**
- **Always `git pull origin main` before starting any work** — the other agent may have pushed
  since your last session.
- **Never commit:** `.claude/`/`.codex/` (session config), `.playwright-cli/`,
  `.image-slots.state.json`, `.DS_Store`, `node_modules/`, or a `*.xlsx` workbook (delete temporary
  copies before committing) — all
  already in `.gitignore`, don't force-add them.
- `output/prototype-exports/` and `output/prototype-mobile-exports/` are committed prototype
  reference artifacts, not normal page source. Do not regenerate or edit them unless the user
  explicitly asks for prototype output work or to include all pending artifacts.
- Asset versions (`ps.js`/`wh.css`/`mobile.css` cache-bust numbers) are tracked in MEMORY.md —
  always re-read the current N from a live HTML file before bumping; see
  [docs/conventions.md](docs/conventions.md) for the bump procedure.
- **When creating any new HTML page or form**, preserve the GA4 contract in
  [docs/conventions.md](docs/conventions.md): new pages need the `G-5TS0QMZ55W` Google tag in
  `<head>`, and new forms need a matching privacy-safe conversion entry in `assets/ps.js`.
- **When a new or updated design-system/brand-kit file is shared** (a `.dc.html` export, docx,
  zip, or anything described as "the design system"/"brand kit"), don't just use it for the
  current task — merge it into `docs/design-system.md`: diff section by section, update what
  changed, append what's new, leave what's unchanged alone. Never blindly overwrite that file.
  See its own "Keeping this file current" section for the exact procedure, and log the update in
  MEMORY.md.
