const { google } = require('googleapis');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body || {};
    const formName = data.form_name || 'submissions';
    delete data.form_name;

    // Authenticate with service account
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_B64, 'base64').toString('utf8')
    );
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Get existing sheet names
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const existing = meta.data.sheets.map(s => s.properties.title);

    // Create tab if it doesn't exist
    if (!existing.includes(formName)) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: formName } } }],
        },
      });
    }

    const keys = Object.keys(data);

    // Write header row if sheet is empty
    const check = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${formName}!A1`,
    });
    const isEmpty = !check.data.values || check.data.values.length === 0;
    if (isEmpty) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${formName}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [['Timestamp', ...keys]] },
      });
    }

    // Append data row
    const row = [new Date().toISOString(), ...keys.map(k => String(data[k] || ''))];
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
