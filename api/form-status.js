const { google } = require('googleapis');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      },
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
