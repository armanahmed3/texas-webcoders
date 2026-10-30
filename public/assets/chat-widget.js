/* Texas WebCoders: website chatbot. Answers with Claude through /api/chat when ANTHROPIC_API_KEY is set,
   otherwise from assets/chat-knowledge.js and assets/plans.js. Booking runs as a guided flow here and is sent by window.sendLead. */
(function () {
  const KEY = 'twc-chat', PHONE = '(903) 222-6022';
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch { return null; } },
    set(v) { try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch {} }
  };
  const load = src => new Promise(res => { const s = document.createElement('script'); s.src = src; s.onload = s.onerror = res; document.head.appendChild(s); });
  const ready = Promise.all([window.PLANS ? 0 : load('assets/plans.js'), window.TWC_KB ? 0 : load('assets/chat-knowledge.js')]);

  const icons = {
    chat: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'
  };
  const btn = document.createElement('button');
  btn.className = 'cw-btn'; btn.type = 'button'; btn.setAttribute('aria-label', 'Open chat with our AI assistant'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `<span class="cw-open">${icons.chat}</span><span class="cw-shut">${icons.close}</span>`;
  const box = document.createElement('section');
  box.className = 'cw'; box.setAttribute('aria-label', 'Chat with Texas WebCoders AI assistant'); box.hidden = true;
  box.innerHTML = `<div class="cw-top"><img src="assets/logo-mark-orange.png" alt=""><div><b>Texas WebCoders AI</b><small><i></i>Online · replies instantly</small></div>
      <a class="cw-voice" href="tel:+19032226022" data-talk aria-label="Talk to our AI by voice" title="Talk to our AI">${icons.mic}</a>
      <button type="button" class="cw-x" aria-label="Close chat">${icons.close}</button></div>
    <div class="cw-log" role="log" aria-live="polite" data-lenis-prevent></div>
    <div class="cw-chips"></div>
    <form class="cw-form"><input type="text" aria-label="Your message" placeholder="Ask anything…" maxlength="500" autocomplete="off"><button type="submit" aria-label="Send">${icons.send}</button></form>
    <p class="cw-note">AI assistant, can make mistakes. <a href="privacy.html">Privacy</a></p>`;
  document.body.append(box, btn);
  const log = box.querySelector('.cw-log'), chipsEl = box.querySelector('.cw-chips'), form = box.querySelector('.cw-form'), input = form.querySelector('input');

  const saved = store.get();
  let history = saved && saved.log || [], aiAvailable = true, flow = null, busy = false;
  const persist = () => store.set({log: history.slice(-30), open: !box.hidden});

  const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const format = t => esc(t)
    .replace(/\[([^\]]+)\]\(((?:[a-z-]+\.html(?:#[\w-]*)?)|https:\/\/[^\s)]+)\)/g, (m, l, u) => `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${l}</a>`)
    .replace(/\(903\) 222-6022/g, '<a href="tel:+19032226022">$&</a>')
    .replace(/info@texaswebcoders\.com/g, '<a href="mailto:$&">$&</a>')
    .replace(/\n/g, '<br>');
  const bubble = (role, text) => { const d = document.createElement('div'); d.className = `cw-m ${role}`; d.innerHTML = format(text); log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
  const add = (role, text) => { history.push({r: role, t: text}); bubble(role, text); persist(); };
  const chips = list => {
    chipsEl.innerHTML = '';
    list.forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.textContent = c; b.addEventListener('click', () => submit(c)); chipsEl.appendChild(b); });
  };
  const HOME_CHIPS = ['Book a free consultation', 'See pricing', 'AI receptionist', 'How long does it take?'];
  const typing = async ms => {
    const d = document.createElement('div'); d.className = 'cw-m bot cw-dots'; d.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(d); log.scrollTop = log.scrollHeight;
    if (ms) await new Promise(r => setTimeout(r, ms));
    return d;
  };

  /* ---------- built-in answers ---------- */
  const money = n => '$' + n.toLocaleString('en-US');
  const planLine = p => `${p.name}: ${p.custom ? 'custom quote' : `${p.from ? 'from ' : ''}${money(p.price)}${p.per || ''}`}${p.setup ? ` + ${money(p.setup)} setup` : ''}`;
  const PRICE_TABS = [
    ['recep', /receptionist|voice|calls?/], ['chat', /chat ?bot|whatsapp/], ['auto', /automat|workflow/], ['saas', /saas|software|mvp/],
    ['ecom', /e-?commerce|store|shop/], ['app', /\bapps?\b|mobile|ios|android/], ['web', /web ?site|landing|wordpress/], ['brand', /logo|brand/],
    ['graphic', /graphic|flyer|brochure|packag/], ['video', /video|animation|3d|reel/], ['grow', /seo|marketing|ads\b|social/]
  ];
  function priceAnswer(q) {
    if (!window.PLANS || !window.TWC_KB) return null;
    const hit = PRICE_TABS.find(([, re]) => re.test(q));
    if (!hit) return 'AI Receptionist plans start at $149/mo, AI Chatbots at $99/mo, websites at $499 and logos at $199. See every plan on the [pricing page](pricing.html), or tell me which service you need.';
    const [tab] = hit;
    return `${window.TWC_KB.tabs[tab]} pricing:\n${PLANS[tab].map(planLine).join('\n')}\n\nFull details are on the [pricing page](pricing.html).`;
  }
  // whole words, except keys ending in a space-free stem like "case stud"
  const matches = (q, key) => new RegExp(`(^|[^a-z])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(q) && (key.length > 4 || new RegExp(`(^|[^a-z])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z])`).test(q));
  function localAnswer(text) {
    const q = text.toLowerCase();
    if (/^(hi|hello|hey|salam|assalam|good (morning|afternoon|evening))\b/.test(q) && q.length < 30) return 'Hi! I can answer questions about our services and pricing, or book you a free consultation. What can I help with?';
    if (/^(thanks|thank you|thx|ok|okay|great|perfect)\b/.test(q) && q.length < 30) return `You’re welcome! Anything else I can help with?`;
    if (/price|pricing|cost|how much|plans?\b|package|rate\b|fee\b/.test(q)) { const p = priceAnswer(q); if (p) return p; }
    const kb = window.TWC_KB ? window.TWC_KB.items : [];
    let best = null, top = 0;
    kb.forEach(item => { const s = item.keys.reduce((sum, k) => sum + (matches(q, k) ? k.length : 0), 0); if (s > top) { top = s; best = item; } });
    return best ? best.a : `I’m not sure about that one. Our team can help at ${PHONE} or info@texaswebcoders.com, or I can book you a free consultation.`;
  }
  const wantsBooking = q => /\b(book|schedule|set ?up|arrange)\b.*\b(meeting|call|consult\w*|demo|appointment)\b|\b(free )?consultation\b|\bbook a\b|\b(talk|speak) to (a|an|your|someone|the team|sales|human)\b|\bmeeting\b|\bdemo\b/i.test(q) && !/\b(can|does|will) (it|the ai|your ai)\b/i.test(q);

  /* ---------- booking flow ---------- */
  const SERVICES = ['AI Receptionist', 'AI Chatbot', 'AI Automation', 'AI SaaS', 'Website or App', 'Marketing & SEO', 'Not sure yet'];
  const TIMES = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'];
  const fmtDay = d => d.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'});
  function nextDays() { // the next six weekdays, starting tomorrow
    const out = [], d = new Date();
    while (out.length < 6) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) out.push(new Date(d)); }
    return out;
  }
  const STEPS = {
    service: {ask: 'Happy to set that up. The consultation is free and takes about 30 minutes. What would you like to talk about?', chips: () => SERVICES, take: v => { flow.data.service = v; return 'name'; }},
    name: {ask: 'What’s your name?', take: v => { if (v.trim().length < 2) return 'Please type your name.'; flow.data.name = v.trim(); return 'email'; }},
    email: {ask: () => `Thanks, ${flow.data.name.split(' ')[0]}. What’s the best email for you?`, take: v => { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'That email doesn’t look right. Could you check it? Like you@company.com.'; flow.data.email = v.trim(); return 'phone'; }},
    phone: {ask: 'And a phone number? This is optional.', chips: () => ['Skip'], take: v => { if (!/^skip$/i.test(v.trim())) { if (v.replace(/\D/g, '').length < 7) return 'Please enter a valid phone number, or tap Skip.'; flow.data.phone = v.trim(); } return 'date'; }},
    date: {ask: 'Which day works best?', chips: () => (flow.days = nextDays()).map(fmtDay), take: v => { const d = flow.days.find(x => fmtDay(x).toLowerCase() === v.trim().toLowerCase()); if (!d) return 'Please tap one of the days below.'; flow.date = d; flow.data.date = d.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'}); return 'time'; }},
    time: {ask: 'What time? These are Central Time.', chips: () => TIMES, take: v => { const t = TIMES.find(x => x.toLowerCase() === v.trim().toLowerCase()); if (!t) return 'Please tap one of the times below.'; flow.data.time = `${t} CT`; flow.time = t; return 'confirm'; }},
    confirm: {ask: () => { const d = flow.data; return `Here’s your request:\n${d.service}\n${d.date} at ${d.time}\n${d.name}, ${d.email}${d.phone ? ', ' + d.phone : ''}\n\nShall I send it?`; }, chips: () => ['Yes, book it', 'Start over', 'Cancel'], take: v => /^y/i.test(v) ? 'send' : /start/i.test(v) ? 'service' : 'cancel'}
  };
  async function ask(step) {
    flow.step = step;
    const s = STEPS[step], d = await typing(350); d.remove();
    add('bot', typeof s.ask === 'function' ? s.ask() : s.ask);
    chips(s.chips ? s.chips() : ['Cancel']);
    input.placeholder = s.chips ? 'Or type here…' : 'Type your answer…';
  }
  function calendarLink() {
    const [h, m] = flow.time.replace(/ [AP]M/, '').split(':').map(Number), pm = /PM/.test(flow.time);
    const y = flow.date.getFullYear(), mo = String(flow.date.getMonth() + 1).padStart(2, '0'), day = String(flow.date.getDate()).padStart(2, '0');
    const hh = (pm && h !== 12 ? h + 12 : h), pad = n => String(n).padStart(2, '0');
    const end = m === 30 ? `${pad(hh + 1)}00` : `${pad(hh)}30`;
    const q = new URLSearchParams({action:'TEMPLATE', text:'Texas WebCoders consultation', details:'Requested free consultation. We will confirm by email or phone.', ctz:'America/Chicago', dates:`${y}${mo}${day}T${pad(hh)}${pad(m)}00/${y}${mo}${day}T${end}00`});
    return `https://calendar.google.com/calendar/render?${q}`;
  }
  async function finishBooking() {
    const transcript = history.slice(-12).map(m => `${m.r === 'user' ? 'Visitor' : 'AI'}: ${m.t}`).join('\n');
    const d = await typing(0);
    const res = await (window.sendLead ? window.sendLead({type:'booking', ...flow.data, message:`Booked through the website chatbot.\n\n${transcript}`}) : Promise.resolve({ok:false}));
    d.remove();
    if (res.ok) add('bot', `All set, ${flow.data.name.split(' ')[0]}! Your request for ${flow.data.date} at ${flow.data.time} is in. Our team will confirm within 1 business day.\n\n[Add it to Google Calendar](${calendarLink()})`);
    else add('bot', `Sorry, I couldn’t send that just now. Please call ${PHONE} or email info@texaswebcoders.com and we’ll get you booked.`);
    flow = null; chips(HOME_CHIPS); input.placeholder = 'Ask anything…';
  }
  async function stepAnswer(text) {
    if (/^cancel$/i.test(text.trim())) { flow = null; add('bot', 'No problem, I’ve cancelled that. Anything else I can help with?'); chips(HOME_CHIPS); input.placeholder = 'Ask anything…'; return; }
    const next = STEPS[flow.step].take(text);
    if (next === 'send') return finishBooking();
    if (next === 'cancel') { flow = null; add('bot', 'No problem. Anything else I can help with?'); chips(HOME_CHIPS); input.placeholder = 'Ask anything…'; return; }
    if (!STEPS[next]) { add('bot', next); return; } // a validation message: stay on this step
    return ask(next);
  }
  const startBooking = () => { flow = {step:'service', data:{}}; return ask('service'); };

  /* ---------- free-form questions ---------- */
  async function answer(text) {
    if (wantsBooking(text)) return startBooking();
    const dots = await typing(0);
    if (aiAvailable) {
      try {
        const r = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({messages: history.slice(-12).map(m => ({role: m.r === 'user' ? 'user' : 'assistant', text: m.t}))})});
        const d = await r.json();
        if (r.ok && d.reply) { dots.remove(); add('bot', d.reply); if (d.book) return startBooking(); return; }
        if (r.status === 503) aiAvailable = false;
      } catch { aiAvailable = false; } // no backend here: stay on built-in answers
    }
    await ready;
    await new Promise(r => setTimeout(r, 350));
    dots.remove();
    add('bot', localAnswer(text));
  }

  async function submit(raw) {
    const text = raw.trim();
    if (!text || busy) return;
    busy = true; chipsEl.innerHTML = '';
    add('user', text); input.value = '';
    try { await (flow ? stepAnswer(text) : answer(text)); }
    finally { busy = false; if (!flow && !chipsEl.children.length) chips(HOME_CHIPS); input.focus({preventScroll:true}); }
  }

  form.addEventListener('submit', e => { e.preventDefault(); submit(input.value); });
  function toggle(open) {
    box.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => box.classList.toggle('on', open)));
    if (!open) setTimeout(() => { if (!box.classList.contains('on')) box.hidden = true; }, 420);
    btn.classList.toggle('on', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close chat' : 'Open chat with our AI assistant');
    persist();
    if (open) {
      if (!history.length) { add('bot', 'Hi! I’m the Texas WebCoders AI assistant. Ask me about our services and pricing, or I can book you a free consultation.'); chips(HOME_CHIPS); }
      setTimeout(() => input.focus({preventScroll:true}), 350);
    } else btn.focus({preventScroll:true});
  }
  btn.addEventListener('click', () => toggle(!btn.classList.contains('on')));
  box.querySelector('.cw-x').addEventListener('click', () => toggle(false));
  addEventListener('keydown', e => { if (e.key === 'Escape' && btn.classList.contains('on')) toggle(false); });
  document.addEventListener('click', e => { const o = e.target.closest('[data-chat]'); if (o) { e.preventDefault(); if (!btn.classList.contains('on')) toggle(true); if (o.dataset.chat) submit(o.dataset.chat); } });

  if (history.length) { history.forEach(m => bubble(m.r, m.t)); chips(HOME_CHIPS); }
  if (saved && saved.open) toggle(true);
})();
