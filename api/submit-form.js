import { getSheetsClient, getSheetTitles, getSpreadsheetMeta } from './google-sheets.js';
import { alignSheetRow, validateLaunchForm } from './launch-forms.js';
import { ABUSE_FIELD_NAMES, enforceAbuseControls } from './abuse-controls.js';

const ALLOWED_ORIGINS = new Set([
  'https://pscoffee.in',
  'https://www.pscoffee.in',
]);

// Allowlist of every form name used in the HTML. Prevents user-supplied
// strings from becoming arbitrary Google Sheet tab names.
const ALLOWED_FORMS = new Set([
  'newsletter',
  'pod-waitlist',
  'app-waitlist',
  'feedback',
  'event-enquiry',
  'join-barista',
  'join-ops',
  'join-craft',
  'join-trade',
  'join-founders',
  'join-investor',
  'pack-enquiry',
  'partnership-enquiry',
]);

const MAX_FIELDS = 30;
const MAX_VALUE_LENGTH = 2000;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : 'https://pscoffee.in';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body || {};
  const formName = data.form_name;

  if (!formName || !ALLOWED_FORMS.has(formName)) {
    return res.status(400).json({ error: 'Unknown form' });
  }

  const abuseCheck = await enforceAbuseControls(req, data, formName);
  if (!abuseCheck.ok) {
    return res.status(abuseCheck.status).json({ error: abuseCheck.error });
  }

  if (!validateLaunchForm(formName, data)) {
    return res.status(400).json({ error: 'Please check the required fields' });
  }

  // Sanitise: drop form_name key, cap field count and value length
  const fields = Object.fromEntries(
    Object.entries(data)
      .filter(([k]) => k !== 'form_name' && !ABUSE_FIELD_NAMES.has(k))
      .slice(0, MAX_FIELDS)
      .map(([k, v]) => [String(k).slice(0, 64), String(v ?? '').slice(0, MAX_VALUE_LENGTH)])
  );

  try {
    const sheets = getSheetsClient(['https://www.googleapis.com/auth/spreadsheets']);
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    const meta = await getSpreadsheetMeta(sheets, spreadsheetId);
    const existing = getSheetTitles(meta);

    if (!existing.includes(formName)) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: formName } } }] },
      });
    }

    const check = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${formName}'!1:1`,
    });
    const existingHeaders = check.data.values?.[0] || [];
    const { headers, row } = alignSheetRow(existingHeaders, fields, formName, new Date().toISOString());
    if (headers.length !== existingHeaders.length) {
      // New forms have a complete, deterministic header even when optional fields are absent.
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `'${formName}'!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${formName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('submit-form error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}
