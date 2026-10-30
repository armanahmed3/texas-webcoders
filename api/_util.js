/* Shared helpers for the /api functions (files starting with _ are not routes). */
async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 50000) throw new Error('Body too large'); }
  return JSON.parse(raw || '{}');
}

const send = (res, status, data) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
};

// browsers always send Origin on these POSTs; a different site must not use our email or AI quota
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  try { return new URL(origin).host === (req.headers['x-forwarded-host'] || req.headers.host); } catch { return false; }
}

// per-instance limiter: stops bursts, not a determined attacker
const hits = new Map();
function limited(req, max, windowMs = 60000) {
  const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  const now = Date.now(), list = (hits.get(ip) || []).filter(t => now - t < windowMs);
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

const text = (v, max) => String(v == null ? '' : v).replace(/\u0000/g, '').trim().slice(0, max);
const oneLine = (v, max) => text(v, max).replace(/[\r\n]+/g, ' ');
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

module.exports = { readBody, send, sameOrigin, limited, text, oneLine, validEmail };
