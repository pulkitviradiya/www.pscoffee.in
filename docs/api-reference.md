# API Reference

Two Vercel serverless functions under `api/`. Both are Node ESM (`export default async function
handler(req, res)`), no framework (no Express). No other API surface exists in this repo.

---

## `POST /api/submit-form`

File: `api/submit-form.js`

Generic form-submission endpoint used by every form on the site (newsletter, enquiry forms, join
forms). Writes a row to a Google Sheet tab named after `form_name`.

### CORS
Allowed origins: `https://pscoffee.in`, `https://www.pscoffee.in` (falls back to
`https://pscoffee.in` if the request origin isn't in the allowlist). Allowed methods: `POST`,
`OPTIONS`.

### Request
`Content-Type: application/json`

```jsonc
{
  "form_name": "pack-enquiry",   // required — must be one of the allowlisted form names below
  "ps_company_url": "",          // honeypot — must be empty
  "ps_started_at": "1787654321000",
  "ps_fingerprint": "<sha256 browser fingerprint>",
  "ps_form_token": "<sha256 form token>",
  "...":  "...any other fields the HTML form sends, become sheet columns"
}
```

Allowlisted `form_name` values (adding a new form requires adding it here):
`newsletter`, `pod-waitlist`, `app-waitlist`, `feedback`, `event-enquiry`, `join-barista`, `join-ops`, `join-craft`,
`join-trade`, `join-founders`, `join-investor`, `pack-enquiry`, `partnership-enquiry`.

Adding a new conversion form also requires updating `PS_CONVERSION_EVENTS` in `assets/ps.js` and
bumping `ps.js?v=N` across every HTML page. The client-side success handler pushes a privacy-safe
`ps_form_submit_success` object to `window.dataLayer`; when GA4 is available, it also fires the
configured `gtag` event. Never add PII or free-text field values to analytics payloads.

Input caps enforced server-side: max 30 stored fields per submission, field keys truncated to 64
chars, field values truncated to 2000 chars. The `form_name` key and anti-abuse fields are dropped
before the row is written; `form_name` only selects the destination tab.

Abuse controls run before any Google Sheets client is created:
- request body size is capped at 64KB by default in `middleware.js` and rechecked in the function;
- submission identity is rate-limited by IP plus browser fingerprint and by aggregate `form_name`;
- `ps_company_url` honeypot must be empty;
- `ps_started_at` must be within the accepted form-age window;
- `ps_form_token` must match the request's form name, timestamp, fingerprint, and user agent;
- abnormal per-`form_name` submission rates are logged and can optionally be posted to an alert
  webhook.

High-value forms (`event-enquiry`, `join-founders`, `join-investor`, `pack-enquiry`,
`partnership-enquiry`) can require Cloudflare Turnstile and/or reCAPTCHA verification by setting
the corresponding secret environment variable. If the secret is unset, the CAPTCHA check is
skipped so the current static forms continue to work without visible challenge widgets.

### Launch form contract

`pod-waitlist`, `app-waitlist`, and `pack-enquiry` accept a fixed `area` choice, optional `area_other` (required for `other`, max 120 characters), and `contact_method` (`email` or `whatsapp`). Only the selected contact channel is required. Pass uses `mobile` for WhatsApp to preserve its historical column. Pass choice and enquiry type are validated against fixed options. Newsletter requires a valid email. Validation runs after abuse checks and before Sheets access. Cached original App/Pass forms without `contact_method` remain supported with a valid email.

`interest_type` is set by each form (`pods`, `app`, `pass`, or `launch`). Analytics includes only fixed area codes and fixed interest values; suggested areas and contact details remain out of analytics. Successful submission hides the form, announces an inline confirmation, and does not redirect to the feedback survey.

### Response
| Status | Body | Meaning |
|---|---|---|
| 200 | `{"status":"ok"}` | Row appended successfully |
| 400 | `{"error":"Unknown form"}` | Missing or non-allowlisted `form_name` |
| 400 | `{"error":"Invalid submission"}` | Honeypot, timestamp, token, or optional CAPTCHA verification failed |
| 400 | `{"error":"Please check the required fields"}` | Launch form contact, area or Pass choice is invalid |
| 413 | `{"error":"Request too large"}` | JSON body exceeds the configured request-size cap |
| 429 | `{"error":"Too many submissions"}` | Rate limit exceeded for the identity or form |
| 405 | `{"error":"Method not allowed"}` | Non-POST, non-OPTIONS request |
| 500 | `{"status":"error","message":"Internal server error"}` | Google Sheets API call failed (see server logs — error is never leaked to the client) |

### Behaviour notes
- Creates the sheet tab on first use if it doesn't already exist (`addSheet`).
- Reads the existing header row and maps values by field name, preserving historical column positions. New fields are appended to the header without shifting existing rows.
- Launch forms use deterministic headers in `api/launch-forms.js`, including both contact channels even when one is blank.
- Every row's first column is `new Date().toISOString()`.
- Analytics is client-side only: successful form submissions are tracked in `assets/ps.js`, not in
  this serverless function. Server-side Sheets writes must remain independent from GA4 so form
  capture still works if analytics is blocked.

### Required environment variables
- `GOOGLE_CREDENTIALS_B64` — base64-encoded Google service-account JSON credentials
- `GOOGLE_SHEETS_ID` — target spreadsheet ID
- `PS_MAX_FORM_BODY_BYTES` — optional request-body cap, default `65536`
- `PS_MIN_FORM_AGE_MS` / `PS_MAX_FORM_AGE_MS` — optional form timestamp window, defaults `2000`
  and `7200000`
- `PS_RATE_WINDOW_MS`, `PS_RATE_MAX_BY_IDENTITY`, `PS_RATE_MAX_BY_FORM` — optional rate-limit
  tuning, defaults `600000`, `8`, and `40`
- `PS_ABUSE_ALERT_WINDOW_MS`, `PS_ABUSE_ALERT_THRESHOLD_BY_FORM`,
  `PS_ABUSE_ALERT_WEBHOOK_URL` — optional abnormal-rate alert tuning and webhook
- `TURNSTILE_SECRET_KEY`, `RECAPTCHA_SECRET_KEY` — optional verification secrets for high-value
  forms

---

## `GET /api/form-status`

File: `api/form-status.js`

Debug/admin-only endpoint. Confirms the Sheets connection is alive and lists existing tabs.
Not called from any page in the site — operator/debugging use only.

### Request
Header required: `x-admin-key: <value matching process.env.ADMIN_KEY>`

### Response
| Status | Body | Meaning |
|---|---|---|
| 200 | `{"status":"connected","spreadsheet":"<title>","tabs":["newsletter","pack-enquiry",...]}` | Connected, tab list returned |
| 401 | `{"error":"Unauthorized"}` | Missing/wrong `x-admin-key`, or `ADMIN_KEY` env var unset |
| 405 | `{"error":"Method not allowed"}` | Non-GET request |
| 500 | `{"status":"error","message":"Internal server error"}` | Google Sheets API call failed |

### Required environment variables
- `GOOGLE_CREDENTIALS_B64`, `GOOGLE_SHEETS_ID` (same as above, read-only scope)
- `ADMIN_KEY` — shared secret compared against the `x-admin-key` request header
