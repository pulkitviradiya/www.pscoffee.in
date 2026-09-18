import test from 'node:test';
import assert from 'node:assert/strict';
import { alignSheetRow, validateLaunchForm } from '../api/launch-forms.js';

const base = { interest_type: 'pods', area: 'prahladnagar', contact_method: 'email', email: 'qa@example.com' };
test('email-only and WhatsApp-only signups are accepted', () => {
  assert.equal(validateLaunchForm('pod-waitlist', base), true);
  assert.equal(validateLaunchForm('app-waitlist', { ...base, email: '', contact_method: 'whatsapp', whatsapp: '+91 9999999999' }), true);
});
test('invalid contact choices and missing suggested area are rejected', () => {
  for (const invalid of [{ email: 'invalid' }, { contact_method: 'sms' }, { area: 'invented' }, { area: 'other' }, { contact_method: 'whatsapp', whatsapp: '--------' }]) {
    assert.equal(validateLaunchForm('pod-waitlist', { ...base, ...invalid }), false);
  }
  assert.equal(validateLaunchForm('pod-waitlist', { ...base, area: 'other', area_other: 'TEST ONLY: test area' }), true);
});
test('Pass interest validates its fixed choices', () => {
  assert.equal(validateLaunchForm('pack-enquiry', { ...base, pack: 'black', enquiry_type: 'individual' }), true);
  assert.equal(validateLaunchForm('pack-enquiry', { ...base, pack: 'invented', enquiry_type: 'individual' }), false);
});
test('cached original App and Pass forms retain compatibility', () => {
  assert.equal(validateLaunchForm('app-waitlist', { email: 'qa@example.com', whatsapp: '+91 9999999999' }), true);
  assert.equal(validateLaunchForm('pack-enquiry', { email: 'qa@example.com', pack: 'black' }), true);
});
test('existing sheet column order and historical extra columns are preserved', () => {
  const existing = ['Timestamp', 'email', 'whatsapp', 'qa_note'];
  const { headers, row } = alignSheetRow(existing, { whatsapp: '+91 9999999999', contact_method: 'whatsapp', area: 'sbr', interest_type: 'app' }, 'app-waitlist', 'TEST-TIME');
  assert.deepEqual(headers.slice(0, 4), existing);
  assert.deepEqual(row.slice(0, 4), ['TEST-TIME', '', '+91 9999999999', '']);
  assert.equal(row[headers.indexOf('area')], 'sbr');
});
test('first email and first WhatsApp submissions produce the same complete header', () => {
  const a = alignSheetRow([], base, 'pod-waitlist', 'T');
  const b = alignSheetRow([], { whatsapp: '+91 9999999999', area: 'sbr' }, 'pod-waitlist', 'T');
  assert.deepEqual(a.headers, b.headers);
  assert.equal(b.row[b.headers.indexOf('email')], '');
});
test('ordinary forms map reordered fields into existing columns', () => {
  const { row } = alignSheetRow(['Timestamp', 'name', 'email'], { email: 'qa@example.com', name: 'TEST ONLY' }, 'event-enquiry', 'T');
  assert.deepEqual(row, ['T', 'TEST ONLY', 'qa@example.com']);
});

// Exercise the real handler with only the Sheets transport replaced.
import { createHash } from 'node:crypto';
import handler from '../api/submit-form.js';
import { getSheetsClient } from '../api/google-sheets.js';
process.env.GOOGLE_CREDENTIALS_B64 = Buffer.from('{}').toString('base64');
process.env.GOOGLE_SHEETS_ID = 'local-test-only';
const sheets = getSheetsClient(['https://www.googleapis.com/auth/spreadsheets']);
let reads = 0;
const tabs = new Map([['app-waitlist', [['Timestamp','email','whatsapp','qa_note']]]]);
const tabName = range => range.split('!')[0].replaceAll("'", '');
sheets.spreadsheets.get = async () => { reads++; return { data: { sheets: [...tabs.keys()].map(title => ({ properties: { title } })) } }; };
sheets.spreadsheets.batchUpdate = async ({requestBody}) => { tabs.set(requestBody.requests[0].addSheet.properties.title, []); };
sheets.spreadsheets.values.get = async ({range}) => ({data:{values:tabs.get(tabName(range)).slice(0,1)}});
sheets.spreadsheets.values.update = async ({range,requestBody}) => { tabs.get(tabName(range))[0] = requestBody.values[0]; };
sheets.spreadsheets.values.append = async ({range,requestBody}) => { tabs.get(tabName(range)).push(...requestBody.values); };
let serial = 0;
async function submit(body, overrides = {}) {
  const ua = 'PS Launch local test';
  const timestamp = String(Date.now() - 3000);
  const hash = value => createHash('sha256').update(value).digest('hex');
  const fingerprint = hash('TEST-' + serial++);
  const data = { ...body, ps_company_url: '', ps_started_at: timestamp, ps_fingerprint: fingerprint, ps_form_token: hash([body.form_name,timestamp,fingerprint,ua].join('|')), ...overrides };
  const response = { setHeader(){},status(n){this.statusCode=n;return this;},json(value){this.body=value;return this;},end(){return this;} };
  await handler({method:'POST',headers:{'user-agent':ua,'x-forwarded-for':'192.0.2.'+serial},body:data},response);
  return response;
}
test('handler creates a new waitlist tab and preserves App historical columns', async () => {
  assert.equal((await submit({form_name:'pod-waitlist',...base})).statusCode,200);
  assert.equal(tabs.get('pod-waitlist').length,2);
  assert.equal((await submit({form_name:'app-waitlist',...base,contact_method:'whatsapp',email:'',whatsapp:'+1 202 555 0147'})).statusCode,200);
  const [headers,row] = tabs.get('app-waitlist');
  assert.deepEqual(headers.slice(0,4),['Timestamp','email','whatsapp','qa_note']);
  assert.equal(row[2],'+1 202 555 0147');
  assert.equal(row[3],'');
});
test('unknown forms, honeypots, invalid fields and oversized bodies never read Sheets', async () => {
  const before = reads;
  assert.equal((await submit({form_name:'unknown',...base})).statusCode,400);
  assert.equal((await submit({form_name:'pod-waitlist',...base},{ps_company_url:'spam'})).statusCode,400);
  assert.equal((await submit({form_name:'pod-waitlist',...base,email:'bad'})).statusCode,400);
  assert.equal((await submit({form_name:'pod-waitlist',...base,notes:'x'.repeat(70000)})).statusCode,413);
  assert.equal(reads,before);
});

import { readFileSync } from 'node:fs';
import vm from 'node:vm';
test('launch analytics excludes contact details and suggested-area text', () => {
  const source = readFileSync(new URL('../assets/ps.js', import.meta.url), 'utf8');
  const definition = source.slice(source.indexOf('  function trackConversion('), source.indexOf('\n  function forms()'));
  const events = [];
  const window = {location:{pathname:'/pods'},dataLayer:[],gtag:(...args)=>events.push(args)};
  const context = {window,PS_CONVERSION_EVENTS:{'pod-waitlist':{event:'sign_up',type:'pods',value:1}},PS_CONVERSION_CONTEXT_KEYS:[]};
  vm.createContext(context);
  vm.runInContext(definition+'; this.trackConversion=trackConversion;',context);
  context.trackConversion({getAttribute:()=> 'pod-waitlist'}, {interest_type:'pods',area:'other',area_other:'PRIVATE AREA',email:'PRIVATE EMAIL',whatsapp:'PRIVATE PHONE',name:'PRIVATE NAME'});
  const output=JSON.stringify([window.dataLayer,events]);
  assert.equal(output.includes('PRIVATE'),false);
  assert.equal(window.dataLayer[0].area,'other');
  assert.equal(window.dataLayer[0].interest_type,'pods');
  context.trackConversion({getAttribute:()=> 'pod-waitlist'}, {interest_type:'PRIVATE INTEREST',area:'PRIVATE AREA'});
  assert.equal(JSON.stringify([window.dataLayer,events]).includes('PRIVATE'),false);
});
