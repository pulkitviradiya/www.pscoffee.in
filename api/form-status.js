import { google } from 'googleapis';

const ALLOWED_ORIGINS = new Set([
  'https://pscoffee.in',
  'https://www.pscoffee.in',
]);

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : 'https://pscoffee.in';
  res.setHeader('Access-Control-Allow-Origin', allowed);

  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_B64, 'base64').toString('utf8')
    );
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const tabNames = meta.data.sheets.map(s => s.properties.title);

    return res.status(200).json({
      status: 'connected',
      spreadsheet: meta.data.properties.title,
      tabs: tabNames,
    });

  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
