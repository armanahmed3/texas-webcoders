/* Texas WebCoders: creates a Stripe Checkout session for a plan and returns its URL.
   POST /api/checkout  {"tab":"recep","name":"Starter"}  ->  {"url":"https://checkout.stripe.com/..."}
   Prices come from assets/plans.js on the server, so the browser can never change what is charged.
   Needs the STRIPE_SECRET_KEY environment variable in Vercel (sk_test_... while testing, sk_live_... to go live). */
const fs = require('fs');
const path = require('path');

let PLANS = null;
function plans() {
  if (!PLANS) {
    const src = fs.readFileSync(path.join(process.cwd(), 'public', 'assets', 'plans.js'), 'utf8');
    const win = {};
    new Function('window', src)(win);
    PLANS = win.PLANS;
  }
  return PLANS;
}

const TAB_LABELS = {
  recep: 'AI Receptionist', chat: 'AI Chatbot', web: 'Website', ecom: 'E-commerce Store',
  brand: 'Logo & Branding', graphic: 'Graphic Design', video: 'Video & 3D Animation', grow: 'SEO & Marketing'
};

// a plan is sold online only when it has a fixed price (see the note at the top of assets/plans.js)
const buyable = p => p && typeof p.price === 'number' && !p.from && !p.custom && !p.quote;

// Stripe's API takes form-encoded bodies with bracketed keys
function encode(obj, prefix, out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') encode(v, key, out);
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
  }
  return out.join('&');
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw || '{}');
}

const send = (res, status, data) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Use POST' }); }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return send(res, 503, { error: 'Online checkout is not set up yet' });

  let body;
  try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid request' }); }
  const tab = String(body.tab || ''), name = String(body.name || '');
  const list = plans()[tab];
  const plan = Array.isArray(list) && list.find(p => p.name === name);
  if (!buyable(plan)) return send(res, 400, { error: 'This plan is quoted individually' });

  const site = (process.env.SITE_URL || `https://${req.headers['x-forwarded-host'] || req.headers.host}`).replace(/\/$/, '');
  const title = `${TAB_LABELS[tab] || 'Texas WebCoders'}: ${plan.name}`;
  const monthly = plan.per === '/mo';

  const lineItems = [{
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: Math.round(plan.price * 100),
      product_data: { name: title, description: plan.desc },
      recurring: monthly ? { interval: 'month' } : undefined
    }
  }];
  // one-time setup fees are charged with the first monthly payment
  if (plan.setup) lineItems.push({
    quantity: 1,
    price_data: { currency: 'usd', unit_amount: Math.round(plan.setup * 100), product_data: { name: `${title} – one-time setup` } }
  });

  const params = {
    mode: monthly ? 'subscription' : 'payment',
    line_items: lineItems,
    success_url: `${site}/thank-you.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/pricing.html#${tab}`,
    allow_promotion_codes: 'true',
    billing_address_collection: 'auto',
    phone_number_collection: { enabled: 'true' },
    metadata: { tab, plan: plan.name },
    custom_text: { submit: { message: `By paying you agree to our Terms of Service (${site}/terms.html) and Refund Policy (${site}/refund.html). We’ll contact you within 1 business day to start.` } }
  };
  if (monthly) params.subscription_data = { metadata: { tab, plan: plan.name } };
  else { params.customer_creation = 'always'; params.invoice_creation = { enabled: 'true' }; }

  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(params)
    });
    const data = await r.json();
    if (!r.ok) { console.error('Stripe error', data.error); return send(res, 502, { error: 'Payment provider error' }); }
    return send(res, 200, { url: data.url });
  } catch (err) {
    console.error('Stripe request failed', err);
    return send(res, 502, { error: 'Payment provider unavailable' });
  }
};
