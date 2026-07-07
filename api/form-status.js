import { getSheetsClient, getSheetTitles, getSpreadsheetMeta } from './google-sheets.js';

export default async function handler(req, res) {
  // Debug-only endpoint — must be called with the admin key
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || req.headers['x-admin-key'] !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const sheets = getSheetsClient(['https://www.googleapis.com/auth/spreadsheets.readonly']);
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    const meta = await getSpreadsheetMeta(sheets, spreadsheetId);
    const tabNames = getSheetTitles(meta);

    return res.status(200).json({
      status: 'connected',
      spreadsheet: meta.data.properties.title,
      tabs: tabNames,
    });

  } catch (err) {
    console.error('form-status error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}
