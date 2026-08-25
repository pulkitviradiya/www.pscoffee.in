import { createHash, timingSafeEqual } from 'node:crypto';

const HIGH_VALUE_FORMS = new Set([
  'event-enquiry',
  'join-founders',
  'join-investor',
  'pack-enquiry',
  'partnership-enquiry',
]);

export const ABUSE_FIELD_NAMES = new Set([
  'ps_company_url',
  'ps_started_at',
  'ps_fingerprint',
  'ps_form_token',
  'cf-turnstile-response',
  'g-recaptcha-response',
]);

const MAX_BODY_BYTES = Number(process.env.PS_MAX_FORM_BODY_BYTES || 64 * 1024);
const MIN_FORM_AGE_MS = Number(process.env.PS_MIN_FORM_AGE_MS || 2000);
const MAX_FORM_AGE_MS = Number(process.env.PS_MAX_FORM_AGE_MS || 2 * 60 * 60 * 1000);
const RATE_WINDOW_MS = Number(process.env.PS_RATE_WINDOW_MS || 10 * 60 * 1000);
const RATE_MAX_BY_IDENTITY = Number(process.env.PS_RATE_MAX_BY_IDENTITY || 8);
const RATE_MAX_BY_FORM = Number(process.env.PS_RATE_MAX_BY_FORM || 40);
const ALERT_WINDOW_MS = Number(process.env.PS_ABUSE_ALERT_WINDOW_MS || 60 * 1000);
const ALERT_THRESHOLD_BY_FORM = Number(process.env.PS_ABUSE_ALERT_THRESHOLD_BY_FORM || 12);

const buckets = new Map();
const formStats = new Map();

function now() {
  return Date.now();
}

function sha256(value) {
  return createHash('sha256').update(String(value)).digest('hex');
}

function safeCompare(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function requestIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();
  return req.socket?.remoteAddress || 'unknown';
}

function requestBodyBytes(req, data) {
  const headerValue = req.headers['content-length'];
  const headerBytes = Number(Array.isArray(headerValue) ? headerValue[0] : headerValue);
  if (Number.isFinite(headerBytes) && headerBytes > 0) return headerBytes;
  return Buffer.byteLength(JSON.stringify(data || {}), 'utf8');
}

function incrementBucket(key, limit, windowMs) {
  const t = now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= t) {
    buckets.set(key, { count: 1, resetAt: t + windowMs });
    return { allowed: true, count: 1, resetAt: t + windowMs };
  }
  bucket.count += 1;
  return { allowed: bucket.count <= limit, count: bucket.count, resetAt: bucket.resetAt };
}

async function alertAbuse(event) {
  console.warn('submit-form abuse control:', event);

  const webhookUrl = process.env.PS_ABUSE_ALERT_WEBHOOK_URL;
  if (!webhookUrl || typeof fetch !== 'function') return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (err) {
    console.warn('submit-form abuse alert failed:', err.message);
  }
}

function noteFormRate(formName, identityHash) {
  const t = now();
  const stat = formStats.get(formName);
  if (!stat || stat.resetAt <= t) {
    formStats.set(formName, {
      count: 1,
      resetAt: t + ALERT_WINDOW_MS,
      alerted: false,
      identities: new Set([identityHash]),
    });
    return null;
  }

  stat.count += 1;
  stat.identities.add(identityHash);
  if (!stat.alerted && stat.count >= ALERT_THRESHOLD_BY_FORM) {
    stat.alerted = true;
    return {
      type: 'abnormal_form_submission_rate',
      form_name: formName,
      count: stat.count,
      unique_identities: stat.identities.size,
      window_ms: ALERT_WINDOW_MS,
    };
  }
  return null;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const result = await response.json().catch(() => ({}));
  return !!result.success;
}

async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const result = await response.json().catch(() => ({}));
  return !!result.success;
}

export async function enforceAbuseControls(req, data, formName) {
  const bodyBytes = requestBodyBytes(req, data);
  if (bodyBytes > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: 'Request too large' };
  }

  const honeypot = String(data.ps_company_url || '').trim();
  if (honeypot) {
    return { ok: false, status: 400, error: 'Invalid submission' };
  }

  const startedAt = Number(data.ps_started_at);
  const ageMs = now() - startedAt;
  if (!Number.isFinite(startedAt) || ageMs < MIN_FORM_AGE_MS || ageMs > MAX_FORM_AGE_MS) {
    return { ok: false, status: 400, error: 'Invalid submission' };
  }

  const fingerprint = String(data.ps_fingerprint || '').slice(0, 128);
  const token = String(data.ps_form_token || '').slice(0, 128);
  const userAgent = String(req.headers['user-agent'] || '');
  const expected = sha256(`${formName}|${data.ps_started_at}|${fingerprint}|${userAgent}`);
  if (!safeCompare(token, expected)) {
    return { ok: false, status: 400, error: 'Invalid submission' };
  }

  const ip = requestIp(req);
  const identityHash = sha256(`${ip}|${fingerprint}`);
  const formIdentityBucket = incrementBucket(`id:${formName}:${identityHash}`, RATE_MAX_BY_IDENTITY, RATE_WINDOW_MS);
  const formBucket = incrementBucket(`form:${formName}`, RATE_MAX_BY_FORM, RATE_WINDOW_MS);
  const abnormalRate = noteFormRate(formName, identityHash);

  if (abnormalRate) await alertAbuse(abnormalRate);

  if (!formIdentityBucket.allowed || !formBucket.allowed) {
    await alertAbuse({
      type: 'rate_limited_submission',
      form_name: formName,
      identity_hash: identityHash,
      identity_count: formIdentityBucket.count,
      form_count: formBucket.count,
      window_ms: RATE_WINDOW_MS,
    });
    return { ok: false, status: 429, error: 'Too many submissions' };
  }

  if (HIGH_VALUE_FORMS.has(formName)) {
    const turnstileOk = await verifyTurnstile(data['cf-turnstile-response'], ip);
    const recaptchaOk = await verifyRecaptcha(data['g-recaptcha-response'], ip);
    if (!turnstileOk || !recaptchaOk) {
      return { ok: false, status: 400, error: 'Invalid submission' };
    }
  }

  return { ok: true };
}
