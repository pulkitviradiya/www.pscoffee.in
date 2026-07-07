import { google } from 'googleapis';

const clientCache = new Map();

function getCredentials() {
  return JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS_B64, 'base64').toString('utf8')
  );
}

export function getSheetsClient(scopes) {
  const key = scopes.join(' ');
  if (clientCache.has(key)) return clientCache.get(key);

  const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes,
  });
  const sheets = google.sheets({ version: 'v4', auth });
  clientCache.set(key, sheets);
  return sheets;
}

export async function getSpreadsheetMeta(sheets, spreadsheetId) {
  return sheets.spreadsheets.get({ spreadsheetId });
}

export function getSheetTitles(meta) {
  return (meta.data.sheets || []).map(sheet => sheet.properties.title);
}
