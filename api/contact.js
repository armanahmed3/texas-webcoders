/* Texas WebCoders: contact form, chatbot bookings and newsletter sign-ups, delivered by SMTP.
   POST /api/contact  {"type":"contact|booking|newsletter","name","email","phone","service","budget","message","date","time","page"}
   Mail goes through sales@texaswebcoders.com; its password is the SMTP_PASS environment variable in Vercel.
   Without it this answers 503 and the browser falls back to FormSubmit (see sendLead in site.js). */
const nodemailer = require('nodemailer');
const { readBody, send, sameOrigin, limited, text, oneLine, validEmail } = require('./_util');

const SALES = 'sales@texaswebcoders.com';
const transport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_PASS } = process.env;
  if (!SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 465;
  return nodemailer.createTransport({ host: SMTP_HOST || 'mail.texaswebcoders.com', port, secure: SMTP_SECURE === 'true' || port === 465, auth: { user: SALES, pass: SMTP_PASS } });
};
const table = rows => rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Use POST' }); }
  if (!sameOrigin(req)) return send(res, 403, { error: 'Not allowed' });
  if (limited(req, 6)) return send(res, 429, { error: 'Too many requests. Please try again in a minute.' });

  let b;
  try { b = await readBody(req); } catch { return send(res, 400, { error: 'Invalid request' }); }
  if (b.website) return send(res, 200, { ok: true }); // honeypot field: bots fill it, people never see it

  const type = ['contact', 'booking', 'newsletter'].includes(b.type) ? b.type : 'contact';
  const name = oneLine(b.name, 120), email = oneLine(b.email, 160), phone = oneLine(b.phone, 40);
  const service = oneLine(b.service, 120), budget = oneLine(b.budget, 60), date = oneLine(b.date, 60), time = oneLine(b.time, 40);
  const message = text(b.message, 4000), page = oneLine(b.page, 200);

  if (!validEmail(email)) return send(res, 400, { error: 'Enter a valid email address.' });
  if (type !== 'newsletter' && name.length < 2) return send(res, 400, { error: 'Enter your name.' });
  if (type === 'booking' && (!date || !time)) return send(res, 400, { error: 'Pick a date and time.' });

  const mail = transport();
  if (!mail) return send(res, 503, { error: 'Email is not configured', fallback: true });

  const to = SALES;
  const from = SALES;
  const subject = type === 'booking' ? `New meeting request: ${name}, ${date} ${time}`
    : type === 'newsletter' ? `New newsletter subscriber: ${email}`
    : `New inquiry: ${service || 'General'} from ${name}`;
  const body = table([['Type', type], ['Name', name], ['Email', email], ['Phone', phone], ['Interested in', service], ['Budget', budget], ['Requested date', date], ['Requested time', time], ['Page', page]]) + (message ? `\n\n${message}` : '');

  try {
    await mail.sendMail({ from: `"Texas WebCoders Website" <${from}>`, to, replyTo: email, subject, text: body });
    if (type === 'booking') await mail.sendMail({
      from: `"Texas WebCoders" <${from}>`, to: email, replyTo: to,
      subject: `We received your meeting request for ${date}`,
      text: `Hi ${name},\n\nThanks for reaching out to Texas WebCoders. We received your request for a free consultation on ${date} at ${time} (Central Time).\n\nWe'll confirm by email or phone within 1 business day. Need to change something? Reply to this email or call (903) 222-6022.\n\nTexas WebCoders\n5221 S Broadway Ave, TX 75703\nhttps://texaswebcoders.com`
    }).catch(err => console.error('Booking confirmation failed', err.message));
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('SMTP send failed', err.code, err.responseCode, err.message);
    return send(res, 502, { error: 'Email could not be sent', fallback: true, code: err.code, smtp: err.responseCode });
  }
};
