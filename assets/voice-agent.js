/* Texas WebCoders: the floating call button starts a live web call with our Vapi voice agent.
   Until both values below are filled in, the button stays a normal phone link (tel:). */
const VAPI_CONFIG = {
  publicKey: '8ad28e50-594c-442a-9bea-a3eeaf7fcee8',   // Vapi public key (safe for websites; restrict allowed origins in the Vapi dashboard)
  assistantId: '24c99079-1889-4491-a9c2-d808f8e57a96', // Vapi assistant: Texas WebCoders calling agent
};
// 3.0.1 bundles daily-js 0.94; 2.7.1's daily-js 0.87 is retired by Daily and calls fail with it
const SDK_URL = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@3.0.1/+esm';
const PHONE = { href: 'tel:+19032226022', label: '(903) 222-6022' };

const fab = document.querySelector('.fab');
const configured = !/^YOUR_/.test(VAPI_CONFIG.publicKey) && !/^YOUR_/.test(VAPI_CONFIG.assistantId);

if (fab && configured) {
  const icons = {
    mic: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    end: '<svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    spin: '<svg class="icon va-spin" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9"/></svg>'
  };
  fab.setAttribute('href', PHONE.href);
  fab.setAttribute('role', 'button');
  fab.setAttribute('aria-label', 'Talk to our AI voice agent');
  fab.innerHTML = `<i>${icons.mic}</i><span class="va-label">Talk to our AI</span><span class="va-bars" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b></span><span class="va-time" aria-hidden="true">00:00</span>`;

  const panel = document.createElement('div');
  panel.className = 'va-panel';
  panel.setAttribute('role', 'status');
  panel.setAttribute('aria-live', 'polite');
  document.body.appendChild(panel);

  const iconEl = fab.querySelector('i'), labelEl = fab.querySelector('.va-label'), timeEl = fab.querySelector('.va-time'), bars = [...fab.querySelectorAll('.va-bars b')];
  let vapi = null, state = 'idle', timer = 0, started = 0, hideT = 0;

  const say = (html, ms) => {
    clearTimeout(hideT);
    panel.innerHTML = html;
    panel.classList.toggle('show', !!html);
    if (ms) hideT = setTimeout(() => panel.classList.remove('show'), ms);
  };
  const phoneLink = `<a href="${PHONE.href}">${PHONE.label}</a>`;

  function setState(next) {
    state = next;
    fab.dataset.state = next;
    fab.classList.toggle('live', next === 'live');
    if (next === 'idle') { iconEl.innerHTML = icons.mic; labelEl.textContent = 'Talk to our AI'; fab.setAttribute('aria-label', 'Talk to our AI voice agent'); }
    if (next === 'connecting') { iconEl.innerHTML = icons.spin; labelEl.textContent = 'Connecting…'; say('<b>Connecting you to our AI agent</b>Allow microphone access when your browser asks.'); }
    if (next === 'live') { iconEl.innerHTML = icons.end; labelEl.textContent = 'Live'; fab.setAttribute('aria-label', 'End the call with our AI voice agent'); say(`<b>You’re talking to our AI agent</b>Speak naturally. Tap the button to hang up. Prefer a person? Call ${phoneLink}.`, 6000); }
  }

  function tick() {
    const s = Math.floor((Date.now() - started) / 1000);
    timeEl.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  async function load() {
    const mod = await import(SDK_URL);
    // jsDelivr's +esm build wraps the CommonJS export, so the class can sit at default.default
    const Vapi = typeof mod.default === 'function' ? mod.default : mod.default.default;
    vapi = new Vapi(VAPI_CONFIG.publicKey);
    vapi.on('call-start', () => { setState('live'); started = Date.now(); tick(); timer = setInterval(tick, 1000); });
    vapi.on('call-end', () => { clearInterval(timer); setState('idle'); bars.forEach(b => b.style.transform = ''); say('<b>Call ended</b>Thanks for talking with us!', 3500); });
    vapi.on('speech-start', () => fab.classList.add('speaking'));
    vapi.on('speech-end', () => fab.classList.remove('speaking'));
    vapi.on('volume-level', v => bars.forEach((b, i) => { b.style.transform = `scaleY(${.25 + Math.min(1, v * (1.6 - Math.abs(i - 2) * .25))})`; }));
    // while connecting, start() decides what to do with errors; once live, an error ends the call
    vapi.on('error', err => { lastError = err; console.error('Vapi error', err); if (state === 'live') fail(err); });
    vapi.on('call-start-failed', err => { lastError = err; console.error('Vapi call-start-failed', err); });
  }
  let lastError = null, attemptId = 0;

  const describe = err => {
    const e = err && (err.error || err);
    return [err && err.type, e && e.status, e && (e.message && (e.message.message || e.message)), e && e.name]
      .filter(Boolean).map(String).join(' · ').slice(0, 160) || 'unknown error';
  };

  function fail(err) {
    clearInterval(timer);
    setState('idle');
    const micBlocked = /NotAllowed|Permission|denied/i.test(describe(err));
    say(micBlocked
      ? `<b>Microphone is blocked</b>Allow the microphone in your browser’s address bar, then tap the button again. Or call us at ${phoneLink}.`
      : `<b>We couldn’t start the call</b>Please try again, or call us at ${phoneLink}.<small class="va-err">${describe(err)}</small>`, 12000);
  }

  // website-call context for Sarah (see vapi-agent/system-prompt.txt)
  const WEBSITE_OVERRIDES = {
    firstMessage: 'Hi! I’m Sarah, the AI assistant for Texas WebCoders. What brings you to our site today?',
    variableValues: { call_type: 'website_visitor' }
  };

  async function tryStart(overrides) {
    lastError = null;
    try { return overrides ? await vapi.start(VAPI_CONFIG.assistantId, overrides) : await vapi.start(VAPI_CONFIG.assistantId); }
    catch (err) { lastError = err; console.error('Vapi start failed', err); return null; }
  }

  fab.addEventListener('click', async e => {
    e.preventDefault();
    if (state === 'connecting') return;
    if (state === 'live') { vapi && vapi.stop(); return; }
    setState('connecting');
    try { if (!vapi) await load(); } catch (err) { console.error('Vapi SDK failed to load', err); return fail(err); }
    // never leave the button stuck on "Connecting…"
    const attempt = ++attemptId;
    setTimeout(() => { if (state === 'connecting' && attempt === attemptId) { try { vapi.stop(); } catch {} fail(lastError || { type: 'timeout', message: 'No answer from the voice service after 25 seconds' }); } }, 25000);
    let call = await tryStart(WEBSITE_OVERRIDES);
    // if the assistant rejects the overrides, fall back to its plain dashboard settings
    if (!call && state === 'connecting' && !/NotAllowed|Permission|denied/i.test(describe(lastError))) {
      console.warn('Retrying Vapi call without website overrides');
      call = await tryStart(null);
    }
    if (!call && state === 'connecting') fail(lastError);
  });
  document.addEventListener('click', e => { if (e.target.closest('[data-talk]')) { e.preventDefault(); fab.click(); } });
  addEventListener('keydown', e => { if (e.key === 'Escape' && state === 'live') vapi && vapi.stop(); });
  addEventListener('pagehide', () => { if (state === 'live') vapi && vapi.stop(); });
}
