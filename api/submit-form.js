import { google } from 'googleapis';

const ALLOWED_ORIGINS = new Set([
  'https://pscoffee.in',
  'https://www.pscoffee.in',
]);

// Allowlist of every form name used in the HTML. Prevents user-supplied
// strings from becoming arbitrary Google Sheet tab names.
const ALLOWED_FORMS = new Set([
  'newsletter',
  'app-waitlist',
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

  // Sanitise: drop form_name key, cap field count and value length
  const fields = Object.fromEntries(
    Object.entries(data)
      .filter(([k]) => k !== 'form_name')
      .slice(0, MAX_FIELDS)
      .map(([k, v]) => [String(k).slice(0, 64), String(v ?? '').slice(0, MAX_VALUE_LENGTH)])
  );

  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_B64, 'base64').toString('utf8')
    );
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const existing = meta.data.sheets.map(s => s.properties.title);

    if (!existing.includes(formName)) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: formName } } }] },
      });
    }

    const keys = Object.keys(fields);

    const check = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${formName}!A1`,
    });
    if (!check.data.values || check.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${formName}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [['Timestamp', ...keys]] },
      });
    }

    const row = [new Date().toISOString(), ...keys.map(k => fields[k])];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${formName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('submit-form error:', err.message);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
