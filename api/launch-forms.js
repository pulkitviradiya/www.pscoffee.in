// Fixed choices are shared by the form contract, validation and aggregate reporting.
export const LAUNCH_AREAS = ['prahladnagar', 'sg-highway', 'gift-city', 'tcs', 'sbr', 'makarba', 'other'];
export const LAUNCH_FORM_FIELDS = {
  'pod-waitlist': ['interest_type', 'area', 'area_other', 'contact_method', 'email', 'whatsapp'],
  'app-waitlist': ['email', 'whatsapp', 'interest_type', 'area', 'area_other', 'contact_method'],
  'newsletter': ['email', 'interest_type'],
  'pack-enquiry': ['pack', 'enquiry_type', 'name', 'mobile', 'email', 'city', 'company_name', 'team_size', 'company_address', 'business_need', 'notes', 'interest_type', 'area', 'area_other', 'contact_method'],
};

export function validateLaunchForm(formName, data) {
  const emailValid = value => typeof value === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
  const phoneValid = value => typeof value === 'string' && /^[+0-9() .-]{8,24}$/.test(value) && value.replace(/\D/g, '').length >= 8;
  if (formName === 'newsletter') return emailValid(data.email);
  if (!['pod-waitlist', 'app-waitlist', 'pack-enquiry'].includes(formName)) return true;
  // Old cached App/Pass pages continue to submit their original fields.
  if (!data.contact_method && formName !== 'pod-waitlist') return emailValid(data.email);
  if (!LAUNCH_AREAS.includes(data.area)) return false;
  if (data.area === 'other' && (typeof data.area_other !== 'string' || !data.area_other.trim() || data.area_other.length > 120)) return false;
  if (!['email', 'whatsapp'].includes(data.contact_method)) return false;
  if (data.contact_method === 'email' && !emailValid(data.email)) return false;
  if (data.contact_method === 'whatsapp' && !phoneValid(data.whatsapp || data.mobile)) return false;
  if (formName === 'pack-enquiry') {
    if (!['black','starter','habit','full-pour','daily','open-tab','first-sip','week','green','team','office-tab','ps-note','not-sure'].includes(data.pack)) return false;
    if (!['individual','business','gift'].includes(data.enquiry_type)) return false;
  }
  return true;
}

// Preserve existing column positions. Append new columns without shifting past rows.
export function alignSheetRow(existingHeaders, fields, formName, timestamp) {
  const headers = existingHeaders.length ? [...existingHeaders] : ['Timestamp'];
  const expected = LAUNCH_FORM_FIELDS[formName] || Object.keys(fields);
  for (const key of expected) if (!headers.includes(key)) headers.push(key);
  return {
    headers,
    row: headers.map(key => key === 'Timestamp' ? timestamp : (Object.hasOwn(fields, key) ? fields[key] : '')),
  };
}
