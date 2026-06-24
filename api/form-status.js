import { google } from 'googleapis';

export default async function handler(req, res) {
  // Debug-only endpoint — must be called with the admin key
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || req.headers['x-admin-key'] !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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
    console.error('form-status error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}
