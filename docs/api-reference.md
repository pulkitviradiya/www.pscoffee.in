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
  "...":  "...any other fields the HTML form sends, become sheet columns"
}
```

Allowlisted `form_name` values (adding a new form requires adding it here):
`newsletter`, `app-waitlist`, `feedback`, `event-enquiry`, `join-barista`, `join-ops`, `join-craft`,
`join-trade`, `join-founders`, `join-investor`, `pack-enquiry`, `partnership-enquiry`.

Input caps enforced server-side: max 30 fields per submission, field keys truncated to 64 chars,
field values truncated to 2000 chars. The `form_name` key itself is dropped before the row is
written (it only selects the destination tab).

### Response
| Status | Body | Meaning |
|---|---|---|
| 200 | `{"status":"ok"}` | Row appended successfully |
| 400 | `{"error":"Unknown form"}` | Missing or non-allowlisted `form_name` |
| 405 | `{"error":"Method not allowed"}` | Non-POST, non-OPTIONS request |
| 500 | `{"status":"error","message":"Internal server error"}` | Google Sheets API call failed (see server logs — error is never leaked to the client) |

### Behaviour notes
- Creates the sheet tab on first use if it doesn't already exist (`addSheet`).
- Writes a header row (`Timestamp`, then each field key) only if the tab is currently empty.
- Every row's first column is `new Date().toISOString()`.

### Required environment variables
- `GOOGLE_CREDENTIALS_B64` — base64-encoded Google service-account JSON credentials
- `GOOGLE_SHEETS_ID` — target spreadsheet ID

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
