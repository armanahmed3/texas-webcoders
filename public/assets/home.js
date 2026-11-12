/* Texas WebCoders home page: hero, demos, pricing and scroll choreography. Loaded as a module after the deferred libraries. */
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const hasGSAP = !!(window.gsap && window.ScrollTrigger) && !reduce;
if (hasGSAP) { gsap.registerPlugin(ScrollTrigger); gsap.ticker.lagSmoothing(0); } // real-time clock: intros finish on time even on slow devices
const MEDIA = 'https://texaswebcoders.com/portfolio-media/texaswebcoders/';
const DIMS = {'Website/website_solex_sneaker_store.webp':[656,1024],'app/mobile_app_dentacare_clinic.webp':[576,1024],'wordpress/wp_furnicasa_modern_furniture.webp':[682,1024],'Website/website_flipmart_grocery_supermarket.webp':[682,1024],'uiux/uiux_1_vr_fitness.webp':[335,1024],'wordpress/wp_summit_auto_group_dealership.webp':[682,1024],'Website/website_nexora_tech_store.webp':[682,1024],'ecommerce/ecom_1_nature_outerwear.webp':[274,1024],'Website/website_brew_haven_coffee_roastery.webp':[576,1024],'app/mobile_app_shipping_logistics.webp':[683,1024],'Website/website_famsworld_lifestyle_store.webp':[682,1024],'wordpress/wp_velvetique_beauty_skincare.webp':[576,1024],'Website/5.webp':[616,1280],'ecommerce/ecom_2_dailysteals_deals.webp':[275,1024],'uiux/uiux_2_crypto_web3.webp':[289,1024],'wordpress/wp_bedetailing_car_customizing.webp':[426,1024],'Website/screencapture-allcountystaffingdade-2025-05-08-22_31_15.webp':[682,1280],'wordpress/wp_interior_studio_furniture.webp':[682,1024],'Website/4.webp':[333,1280],'ecommerce/ecom_3_ocean_gift_purpose.webp':[212,790],'uiux/uiux_3_gts300_motorsport.webp':[289,1024],'Graphic/packaging_herbelis_tea_trio.webp':[698,1024],'logo/logo_bluline_tech.webp':[736,552],'software/software_crm_eeoz_seo_analytics.webp':[574,1024]};
const dimAttr = p => DIMS[p] ? ` width="${DIMS[p][0]}" height="${DIMS[p][1]}"` : '';


/* ---------- small generated pieces ---------- */
const bars = (el, n, max = 95) => { for (let i = 0; i < n; i++) { const b = document.createElement('i'); b.style.setProperty('--n', i); b.style.setProperty('--h', `${30 + Math.round(Math.abs(Math.sin(i * 1.7)) * (max - 30))}%`); el.appendChild(b); } };
bars(document.getElementById('phbars'), 16);
const words = ['AI Receptionist', 'AI Chatbots', 'AI SaaS', 'Automation', 'Voice Agents', 'Lead Agents'];
const mqHTML = words.map(w => `<span>${w}</span>`).join('');
document.getElementById('mq').innerHTML = mqHTML + mqHTML;
const tools = ['Google Calendar','Outlook','Calendly','HubSpot','Salesforce','Zoho CRM','GoHighLevel','Zapier','Make','Twilio'];
const tools2 = ['WhatsApp','Slack','Stripe','Shopify','WordPress','QuickBooks','Google Sheets','Airtable','Gmail','Microsoft Teams'];
const pill = t => `<span>${t}</span>`;
['ig1', 'ig2'].forEach((id, k) => { const el = document.getElementById(id); if (el) el.innerHTML = ((k ? tools2 : tools).map(pill).join('')).repeat(2); });

/* split headings into words (for 3D word reveals) */
const splitWords = el => {
  const out = [];
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
        const w = document.createElement('span'); w.className = 'w';
        const i = document.createElement('i'); i.textContent = part; w.appendChild(i); frag.appendChild(w); out.push(i);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) walk(n);
  });
  walk(el); return out;
};

/* work wall from real portfolio images */
(function buildWall() {
  const shots = [
    ['Website/website_solex_sneaker_store.webp','Website'],['app/mobile_app_dentacare_clinic.webp','Mobile app'],['wordpress/wp_furnicasa_modern_furniture.webp','WordPress'],['Website/website_flipmart_grocery_supermarket.webp','Website'],['uiux/uiux_1_vr_fitness.webp','UI/UX'],
    ['wordpress/wp_summit_auto_group_dealership.webp','WordPress'],['Website/website_nexora_tech_store.webp','Website'],['ecommerce/ecom_1_nature_outerwear.webp','E-commerce'],['Website/website_brew_haven_coffee_roastery.webp','Website'],['app/mobile_app_shipping_logistics.webp','Mobile app'],
    ['Website/website_famsworld_lifestyle_store.webp','Website'],['wordpress/wp_velvetique_beauty_skincare.webp','WordPress'],['Website/5.webp','Website'],['ecommerce/ecom_2_dailysteals_deals.webp','E-commerce'],['uiux/uiux_2_crypto_web3.webp','UI/UX'],
    ['wordpress/wp_bedetailing_car_customizing.webp','WordPress'],['Website/screencapture-allcountystaffingdade-2025-05-08-22_31_15.webp','Website'],['wordpress/wp_interior_studio_furniture.webp','WordPress'],['Website/4.webp','Website'],['ecommerce/ecom_3_ocean_gift_purpose.webp','E-commerce']
  ];
  const hs = [380, 320, 430, 350, 400];
  const world = document.getElementById('wworld');
  for (let c = 0; c < 4; c++) {
    const col = document.createElement('div'); col.className = 'w-col'; col.dataset.dir = c % 2 ? 1 : -1;
    col.innerHTML = shots.slice(c * 5, c * 5 + 5).map(([s, l], i) => `<figure class="shot" style="--h:${hs[(i + c) % 5]}px"><img loading="lazy" decoding="async" data-src="${MEDIA + s}"${dimAttr(s)} alt="${l} project by Texas WebCoders"><figcaption>${l}</figcaption></figure>`).join('');
    world.appendChild(col);
  }
  // native lazy loading never fires on this tilted 3D wall, so images load as the section approaches
  new IntersectionObserver((es, io) => { if (es.some(e => e.isIntersecting)) { io.disconnect(); world.querySelectorAll('img').forEach(i => { i.loading = 'eager'; i.src = i.dataset.src; }); } }, {rootMargin:'900px 0px'}).observe(document.getElementById('work'));
})();


/* ---------- loader → hero intro ---------- */
const heroLines = [...document.querySelectorAll('.hx-l:not(.hx-rot)')], heroRot = [...document.querySelectorAll('.rw')];
const lineChars = window.wordSplit ? heroLines.map(wordSplit) : [], rotChars = window.wordSplit ? heroRot.map(wordSplit) : [];
const heroPills = [...document.querySelectorAll('.hx-pill')];
function rotateWords() {
  let cur = 0;
  const next = () => {
    const a = rotChars[cur]; cur = (cur + 1) % rotChars.length; const b = rotChars[cur];
    gsap.to(a, {rotateX:90, y:-36, opacity:0, transformPerspective:700, duration:.5, ease:'power3.in', stagger:{each:.014, from:'center'}});
    gsap.fromTo(b, {rotateX:-90, y:44, opacity:0, transformPerspective:700}, {rotateX:0, y:0, opacity:1, duration:.9, delay:.55, ease:'back.out(1.7)', stagger:{each:.02, from:'center'}});
    gsap.delayedCall(2.8, next);
  };
  gsap.delayedCall(3.6, next);
}
function heroIntro() {
  window.particleIntro && particleIntro();
  if (!hasGSAP) return;
  const R = gsap.utils.random;
  if (performance.now() > 1200) { rotateWords(); return; } // slower loads: keep the first screen still
  window.scrambleText && scrambleText(document.getElementById('hero-tag'));
  const tl = gsap.timeline({defaults:{ease:'expo.out'}});
  tl.fromTo([lineChars[0], rotChars[0], lineChars[1]].flat(), {z:() => R(-900, -300), x:() => R(-160, 160), y:() => R(-90, 120), rotateX:() => R(-120, 120), rotateY:() => R(-120, 120), transformPerspective:900},
      {z:0, x:0, y:0, rotateX:0, rotateY:0, duration:1.7, stagger:{each:.016, from:'center'}}, .15)
    .fromTo('.h-in', {y:36, z:-120, rotateX:-18, transformPerspective:900}, {y:0, z:0, rotateX:0, duration:1.3, stagger:.09}, .75)
    .fromTo(heroPills, {scale:.3, z:-500, rotateY:() => R(-70, 70), transformPerspective:900}, {scale:1, z:0, rotateY:0, duration:1.3, stagger:.1, ease:'back.out(1.6)'}, .95);
  rotateWords();
}
if (!reduce && hasGSAP) { gsap.set('.rw', {opacity:1}); gsap.set(rotChars.slice(1).flat(), {opacity:0}); }
root.classList.remove('booting');
const bootEl = document.querySelector('.boot'); bootEl && bootEl.remove();
if (reduce) heroIntro();
else setTimeout(heroIntro, window.navArrival ? 760 : 0); // arriving from another page: the slats play first
/* ---------- nav ---------- */
const hdr = document.getElementById('hdr'), burger = document.querySelector('.burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  hdr.classList.toggle('scrolled', y > 20);
  hdr.classList.toggle('hide', y > 700 && y > lastY && !menu.classList.contains('open'));
  lastY = y;
}, {passive:true});

/* ---------- missed-call calculator ---------- */
(function roi() {
  const calls = document.getElementById('r-calls'), value = document.getElementById('r-value'), rate = document.getElementById('r-rate');
  const out = {m:document.getElementById('roi-m'), y:document.getElementById('roi-y'), bar:document.getElementById('roi-bar')};
  const fmt = n => '$' + Math.round(n).toLocaleString();
  let shown = 7794;
  const paint = v => { out.m.textContent = fmt(v); out.y.textContent = fmt(v * 12); };
  function update(e) {
    [calls, value, rate].forEach(r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%'));
    document.getElementById('v-calls').textContent = calls.value;
    document.getElementById('v-value').textContent = fmt(+value.value);
    document.getElementById('v-rate').textContent = rate.value + '%';
    const monthly = calls.value * 4.33 * value.value * (rate.value / 100);
    out.bar.style.width = Math.min(100, monthly / 600) + '%';
    if (!e || reduce || !hasGSAP) { shown = monthly; return paint(monthly); }
    const o = {v: shown};
    gsap.to(o, {v: monthly, duration: .6, ease: 'power3.out', onUpdate: () => { shown = o.v; paint(o.v); }});
    gsap.fromTo(out.m, {rotateX: -60}, {rotateX: 0, duration: .5, ease: 'back.out(2)', overwrite: 'auto'});
  }
  [calls, value, rate].forEach(r => r.addEventListener('input', update));
  update();
  if (finePointer && !reduce) {
    const card = document.getElementById('roicard');
    card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); card.style.transform = `rotateY(${((e.clientX - r.left) / r.width - .5) * 14}deg) rotateX(${((e.clientY - r.top) / r.height - .5) * -12}deg)`; });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  }
})();

/* ---------- AI chatbot demo (scripted sample conversation) ---------- */
(function chatDemo() {
  const body = document.getElementById('wgbody');
  const script = [
    ['u', 'Hi! Do you install tankless water heaters?'],
    ['a', 'Yes, we install both tank and tankless water heaters. Want me to book a free on-site estimate?'],
    ['u', 'Sure, tomorrow afternoon?'],
    ['a', 'Tomorrow at 3:00 PM is open. Shall I lock it in?'],
    ['u', 'Yes please!'],
    ['a', 'Booked ✓ Tomorrow at 3:00 PM. A confirmation text is on its way.'],
    ['lc', '⚡ New lead sent to your CRM · estimate booked']
  ];
  let run = 0;
  const add = (cls, text) => { const d = document.createElement('div'); d.className = 'wm ' + cls; d.textContent = text; body.appendChild(d); while (body.children.length > 7) body.firstChild.remove(); return d; };
  async function play() {
    const id = ++run; body.innerHTML = '';
    if (reduce) { script.forEach(([w, t]) => add(w, t)); return; }
    const wait = ms => new Promise(r => setTimeout(r, ms));
    for (const [who, text] of script) {
      if (id !== run) return;
      if (who === 'a') { const t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(t); await wait(1100); t.remove(); }
      else await wait(who === 'lc' ? 500 : 900);
      if (id !== run) return;
      add(who, text);
    }
  }
  let started = false;
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; play(); } }, {threshold:.35}).observe(body);
  document.getElementById('replay').addEventListener('click', play);
})();

/* ---------- creative studio: 8-sided 3D prism ---------- */
const STUDIO = [
  {t:'Websites & E-commerce', img:'Website/website_solex_sneaker_store.webp', d:'Custom websites and online stores built for speed, SEO and sales, on Next.js, WordPress or Shopify.', c:['Next.js','WordPress','Shopify'], from:'$499'},
  {t:'Mobile Apps', img:'app/mobile_app_dentacare_clinic.webp', d:'iOS and Android apps your customers keep on their home screen, with bookings, payments and AI built in.', c:['Swift','Kotlin','React Native'], from:'$4,999'},
  {t:'UI/UX Design', img:'uiux/uiux_3_gts300_motorsport.webp', d:'Figma prototypes and design systems that make products easy and enjoyable to use.', c:['Figma','Prototypes','Design systems'], from:'Custom quote'},
  {t:'Graphic Design', img:'Graphic/packaging_herbelis_tea_trio.webp', d:'Packaging, brochures, pitch decks, flyers and social graphics that look sharp everywhere.', c:['Packaging','Print','Social'], from:'$199'},
  {t:'Logo & Branding', img:'logo/logo_bluline_tech.webp', fit:true, d:'Logos, brand style guides and stationery, up to animated 3D logo reveals.', c:['Logos','Style guides','Stationery'], from:'$199'},
  {t:'Video Editing', editor:true, d:'Short-form edits for Reels, TikTok, YouTube and ads, with captions, color and sound.', c:['Reels','YouTube','Ads'], from:'$399'},
  {t:'3D Video Animation', video:'animation/animation_stoic_philosophy_motion.mp4', d:'Photoreal 3D product animations, logo reveals and cinematic brand films rendered in 4K.', c:['Blender','4K render','Motion graphics'], from:'$2,499'},
  {t:'Digital Marketing & SEO', img:'software/software_crm_eeoz_seo_analytics.webp', d:'Local SEO, Google and Meta ads, social media and AI follow-up that turn traffic into customers.', c:['Local SEO','Google Ads','Social'], from:'$499/mo'}
];
let studioScroll = () => {};
(function studio() {
  const prism = document.getElementById('prism'), info = document.getElementById('stinfo'), dots = document.getElementById('stdots');
  const n = STUDIO.length, step = 360 / n;
  STUDIO.forEach((s, i) => {
    const f = document.createElement('figure'); f.className = 'pf';
    const media = s.video ? `<video data-src="${MEDIA + s.video}" muted loop playsinline autoplay preload="none"></video>`
      : s.editor ? '<div class="ed"><div class="ed-prev"><span class="ed-play"></span><span class="ed-tc">00:00:12:08</span></div><div class="ed-tracks"><span class="ed-ph"></span><div class="tr"><i style="left:2%;width:30%"></i><i style="left:35%;width:22%"></i><i style="left:60%;width:36%"></i></div><div class="tr v2"><i style="left:10%;width:18%"></i><i style="left:44%;width:28%"></i></div><div class="tr au"><i style="left:0;width:96%"></i></div><div class="tr au2"><i style="left:20%;width:40%"></i><i style="left:66%;width:22%"></i></div></div></div>'
      : `<img${s.fit ? ' class="fit"' : ''} data-src="${MEDIA + s.img}"${dimAttr(s.img)} alt="${s.t} sample by Texas WebCoders" loading="lazy" decoding="async">`;
    f.innerHTML = `${media}<figcaption><span>${s.t}</span><i>${/^\$/.test(s.from) ? 'From ' : ''}${s.from}</i></figcaption>`;
    prism.appendChild(f);
    dots.appendChild(document.createElement('i'));
  });
  // the prism faces load as the section approaches (native lazy loading never fires on 3D faces)
  new IntersectionObserver((es, io) => { if (es.some(e => e.isIntersecting)) { io.disconnect(); prism.querySelectorAll('[data-src]').forEach(m => { if (m.tagName === 'IMG') m.loading = 'eager'; m.src = m.dataset.src; if (m.tagName === 'VIDEO') m.play().catch(() => {}); }); } }, {rootMargin:'900px 0px'}).observe(document.getElementById('studio'));
  const faces = [...prism.children];
  const depth = () => Math.round((prism.offsetWidth / 2) / Math.tan(Math.PI / n));
  const layout = () => { const z = depth(); faces.forEach((f, i) => f.style.transform = `rotateY(${i * step}deg) translateZ(${z}px)`); prism.dataset.z = z; };
  new ResizeObserver(layout).observe(prism); layout();
  let cur = -1, angle = 0, target = 0, scrollDriven = false;
  function show(i) {
    if (i === cur) return; cur = i;
    const s = STUDIO[i];
    info.classList.remove('swap'); void info.offsetWidth; info.classList.add('swap');
    info.innerHTML = `<span class="big-n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d}</p><div class="chips">${s.c.map(c => `<span>${c}</span>`).join('')}</div><p class="from">Starting at <b>${s.from}</b></p>`;
    [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
  }
  const go = i => { const k = ((i % n) + n) % n; target = -k * step; if (scrollDriven && hasGSAP) { const st = ScrollTrigger.getAll().find(t => t.trigger && t.trigger.id === 'studio'); if (st) { const top = st.start + (st.end - st.start) * (k / (n - 1)); return window.lenis ? lenis.scrollTo(top) : scrollTo({top, behavior: 'smooth'}); } } show(k); };
  studioScroll = p => { scrollDriven = true; target = -p * (n - 1) * step; show(Math.round(p * (n - 1))); };
  document.getElementById('stnext').addEventListener('click', () => go(cur + 1));
  document.getElementById('stprev').addEventListener('click', () => go(cur - 1));
  show(0);
  let vis = false, last = performance.now();
  new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(prism);
  (function loop(now) {
    requestAnimationFrame(loop);
    if (!vis) return;
    // auto-advance on small screens, where the section isn't pinned
    if (!scrollDriven && !reduce && now - last > 3600) { last = now; target -= step; show(((Math.round(-target / step) % n) + n) % n); }
    angle += (target - angle) * .09;
    prism.style.transform = `translateZ(${-prism.dataset.z}px) rotateX(-6deg) rotateY(${angle}deg)`;
  })(last);
  addEventListener('resize', () => { if (innerWidth < 901) scrollDriven = false; });
})();

/* ---------- AI stack: 3D cylinder ---------- */
(function cylinder() {
  const cyl = document.getElementById('cyl');
  if (!cyl) return;
  const tiles = [['OpenAI GPT','Language models'],['Anthropic Claude','Reasoning & writing'],['Google Gemini','Multimodal AI'],['Meta Llama','Open-source models'],['ElevenLabs','Natural voices'],['Deepgram','Speech to text'],['Twilio','Phone & SMS'],['LangChain','AI orchestration'],['Pinecone','Vector memory'],['Supabase','Database & auth'],['Vercel','Edge hosting'],['AWS','Cloud infrastructure']];
  const n = tiles.length, step = 360 / n;
  tiles.forEach(([b, s]) => { const t = document.createElement('div'); t.className = 'tl'; t.innerHTML = `<b>${b}</b><span>${s}</span>`; cyl.appendChild(t); });
  const els = [...cyl.children];
  const R = () => Math.round((cyl.offsetWidth / 2) / Math.tan(Math.PI / n) + 46);
  let vis = false, a = 0, mx = 0, tmx = 0, last = performance.now();
  new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(cyl);
  if (finePointer) cyl.parentElement.addEventListener('pointermove', e => { const r = cyl.parentElement.getBoundingClientRect(); tmx = ((e.clientX - r.left) / r.width - .5) * 60; });
  (function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(64, now - last); last = now;
    if (!vis) return;
    if (!reduce) a += dt * .012;
    mx += (tmx - mx) * .05;
    const r = R(), rot = a + scrollY * .06 + mx;
    cyl.style.transform = `translateZ(${-r}px) rotateX(-10deg) rotateY(${-rot}deg)`;
    els.forEach((el, i) => { const ang = i * step; el.style.transform = `rotateY(${ang}deg) translateZ(${r}px)`; const c = Math.cos((ang - rot) * Math.PI / 180); el.style.opacity = .22 + .78 * (c + 1) / 2; });
  })(last);
})();


/* ---------- counters ---------- */
const counters = [...document.querySelectorAll('[data-count]')];
const runCount = el => {
  const end = +el.dataset.count, dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', sup = el.dataset.sup ? `<sup>${el.dataset.sup}</sup>` : (dec ? '' : '<sup>+</sup>');
  const t0 = performance.now(), dur = reduce ? 0 : 1800;
  (function tick(now) { const k = dur ? Math.min(1, (now - t0) / dur) : 1, v = end * (1 - Math.pow(1 - k, 4)); el.innerHTML = pre + v.toFixed(dec) + sup; if (k < 1) requestAnimationFrame(tick); })(t0);
};
// numbers already on screen when the page opens stay as they are; the rest count up when scrolled into view
const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cio.unobserve(e.target); if (performance.now() > 2500) runCount(e.target); } }), {threshold:.4});
counters.forEach(c => cio.observe(c));

/* ---------- GSAP scroll choreography (set up on first interaction) ---------- */
if (hasGSAP) whenActive(() => {
  // 3D word reveals on every section heading
  // whole-heading rise (splitting every heading into word spans added ~100 DOM nodes)
  document.querySelectorAll('.split').forEach(h => {
    gsap.from(h, {y:56, rotateX:-24, transformPerspective:800, transformOrigin:'50% 100%', duration:1.1, ease:'expo.out', scrollTrigger:{trigger:h, start:'top 88%'}});
  });
  // generic 3D rise for leads, tags, cards
  gsap.utils.toArray('.head .lead, .tag:not(.h-in), .post, .ind a, .step, .q, .cinfo > *, .form').forEach(el => {
    gsap.from(el, {y:50, rotateX:10, transformPerspective:900, opacity:0, duration:1.1, ease:'expo.out', scrollTrigger:{trigger:el, start:'top 90%'}});
  });

  // hero exit: content drifts up and blurs as you leave
  gsap.timeline({scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}, defaults:{ease:'none'}})
    .to(heroLines[0], {xPercent:-34, rotateY:26, transformPerspective:1100, opacity:0}, 0)
    .to(heroLines[1], {xPercent:34, rotateY:-26, transformPerspective:1100, opacity:0}, 0)
    .to('.hx-rot', {scale:1.7, opacity:0}, 0)
    .to('.hx-sub, .hx-bottom', {y:-90, opacity:0}, 0)
    .to('.hx-pills', {scale:1.5, opacity:0}, 0);
  const pointerPills = heroPills.map(p => ({x:gsap.quickTo(p, 'x', {duration:1, ease:'power3'}), y:gsap.quickTo(p, 'y', {duration:1, ease:'power3'}), d:+p.dataset.d}));
  if (finePointer) addEventListener('pointermove', e => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; pointerPills.forEach(p => { p.x(x * p.d); p.y(y * p.d); }); }, {passive:true});

  // marquee speeds up and skews with scroll velocity
  const mq = gsap.to('#mq', {xPercent:-50, repeat:-1, duration:34, ease:'none'});
  const skew = gsap.quickTo('#mq', 'skewX', {duration:.5, ease:'power3'});
  ScrollTrigger.create({onUpdate: self => { const v = self.getVelocity(); mq.timeScale(gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 300)); skew(gsap.utils.clamp(-10, 10, v / -250)); }});
  ScrollTrigger.addEventListener('scrollEnd', () => { gsap.to(mq, {timeScale:1, duration:1}); skew(0); });

  // sections tilt up out of the depth as they arrive (3D camera push)
  gsap.utils.toArray('.plans, .posts, .ind, .roi-stage, .cyl-stage').forEach(el => {
    gsap.from(el, {y:60, ease:'expo.out', duration:1.1, scrollTrigger:{trigger:el, start:'top 88%'}});
  });

  // chatbot browser swings in 3D with scroll
  gsap.fromTo('#browser3d', {rotateY:24, rotateX:10, z:-120}, {rotateY:-10, rotateX:-2, z:0, ease:'none', scrollTrigger:{trigger:'#chatbot', start:'top bottom', end:'bottom top', scrub:true}});

  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    // AI receptionist: pinned scene, the call plays out as you scroll
    const msgs = gsap.utils.toArray('.msg');
    gsap.set(msgs, {opacity:0, y:70, z:-320, rotateX:-48, transformPerspective:800, transformOrigin:'50% 100%'});
    gsap.set('.booked', {opacity:0, y:60, z:-260, rotateX:60, transformPerspective:800});
    const tl = gsap.timeline({scrollTrigger:{trigger:'#receptionist', start:'top top', end:'+=2200', pin:true, scrub:1, anticipatePin:1}});
    tl.fromTo('#phone', {rotateY:-32, rotateX:14, rotateZ:-4, y:80, scale:.9}, {rotateY:0, rotateX:0, rotateZ:0, y:0, scale:1, duration:1.2, ease:'power2.out'})
      .from('.feat li', {opacity:.25, x:-20, stagger:.25, duration:.6}, 0)
      .to(msgs, {opacity:1, y:0, z:0, rotateX:0, stagger:.55, duration:.6, ease:'back.out(1.4)'}, .9)
      .to('.booked', {opacity:1, y:0, z:0, rotateX:0, duration:.7, ease:'back.out(1.6)'})
      .to('#phone', {rotateY:16, rotateX:-4, duration:1, ease:'power1.inOut'});

    // services: pinned horizontal 3D carousel
    const track = document.getElementById('htrack'), cards = gsap.utils.toArray('.svc');
    const dist = () => track.scrollWidth - innerWidth + 80;
    const shape = () => cards.forEach(c => { const r = c.getBoundingClientRect(), off = (r.left + r.width / 2 - innerWidth / 2) / innerWidth; c.style.transform = `perspective(1400px) rotateY(${gsap.utils.clamp(-40, 40, off * -38)}deg) translateZ(${-Math.abs(off) * 220}px)`; });
    gsap.to(track, {x: () => -dist(), ease:'none', scrollTrigger:{trigger:'#services', start:'top top', end: () => '+=' + dist(), pin:true, scrub:1, invalidateOnRefresh:true, onUpdate: self => { shape(); document.getElementById('hsprog').style.transform = `scaleX(${.12 + self.progress * .88})`; document.getElementById('hscount').textContent = `${String(Math.min(8, 1 + Math.floor(self.progress * 8))).padStart(2, '0')} / 08`; }}});
    shape();

    // creative studio: pinned, scroll turns the 3D prism one face per step
    ScrollTrigger.create({trigger:'#studio', start:'top top', end:'+=' + (STUDIO.length - 1) * 520, pin:true, scrub:1, anticipatePin:1,
      onUpdate: self => studioScroll(self.progress)});

    // SaaS: stacked cards tilt back as the next one slides over
    const sc = gsap.utils.toArray('.scard');
    sc.forEach((card, i) => {
      if (i === sc.length - 1) return;
      gsap.to(card, {scale:.9, rotateX:-8, transformPerspective:1200, ease:'none', scrollTrigger:{trigger:sc[i + 1], start:'top bottom', end:`top ${104 + (i + 1) * 22}px`, scrub:true}});
    });
  });

  // numbers band: cinematic clip-path reveal
  gsap.fromTo('#band', {clipPath:'inset(10% 6% 10% 6% round 48px)'}, {clipPath:'inset(0% 0% 0% 0% round 0px)', ease:'none', scrollTrigger:{trigger:'#band', start:'top 95%', end:'top 25%', scrub:true}});
  gsap.from('.nums div', {y:80, opacity:0, rotateX:-30, transformPerspective:900, stagger:.12, duration:1.2, ease:'expo.out', scrollTrigger:{trigger:'.nums', start:'top 85%'}});

  // process line draws as you scroll
  const steps = gsap.utils.toArray('.step');
  gsap.to('#stepline', {scaleX:1, ease:'none', scrollTrigger:{trigger:'#steps', start:'top 75%', end:'bottom 55%', scrub:true, onUpdate: self => steps.forEach((s, i) => s.classList.toggle('on', self.progress >= i / 4 + .02))}});

  // integrations drift in opposite directions with scroll
  gsap.fromTo('#ig1', {x:0}, {x:-500, ease:'none', scrollTrigger:{trigger:'.integ', start:'top bottom', end:'bottom top', scrub:true}});
  gsap.fromTo('#ig2', {x:-500}, {x:0, ease:'none', scrollTrigger:{trigger:'.integ', start:'top bottom', end:'bottom top', scrub:true}});

  // work wall: camera swings as you scroll through it
  gsap.fromTo('#wworld', {rotateX:64, rotateZ:-40, z:-420}, {rotateX:34, rotateZ:-22, z:40, ease:'none', scrollTrigger:{trigger:'#work', start:'top bottom', end:'bottom top', scrub:true}});
  gsap.utils.toArray('.w-col').forEach(c => gsap.fromTo(c, {yPercent: c.dataset.dir * 12}, {yPercent: c.dataset.dir * -18, ease:'none', scrollTrigger:{trigger:'#work', start:'top bottom', end:'bottom top', scrub:true}}));

  // CTA headline scales in with depth

  // footer giant wordmark letters rise
  const gw = splitWords(document.getElementById('giant'));
  gsap.from(gw, {yPercent:100, rotateX:-60, transformPerspective:800, duration:1.4, ease:'expo.out', stagger:.08, scrollTrigger:{trigger:'#giant', start:'top 95%'}});

  ScrollTrigger.refresh();
});

const plans = window.PLANS;
const plansEl = document.getElementById('plans');
const money = n => '$' + n.toLocaleString();
const planHTML = (p, i, key) => `<div class="plan${p.best ? ' best' : ''}" style="--d:${i}">${p.best ? '<span class="ribbon">MOST POPULAR</span>' : ''}<h3>${p.name}</h3><p class="desc">${p.desc}</p><div class="price">${p.custom ? '<strong>Custom</strong>' : `${p.from ? '<span class="from-l">From</span>' : ''}<strong>${money(p.price)}</strong>${p.per ? `<span class="per">${p.per}</span>` : ''}${p.was ? `<s aria-label="was ${money(p.was)}">${money(p.was)}</s>` : ''}`}</div>${p.note ? `<p class="note">${p.note}</p>` : ''}<ul>${p.items.map(t => `<li class="ic-check">${t}</li>`).join('')}</ul><a class="btn btn-dark" href="#contact" data-plan="${p.name}"${PLAN_BUYABLE(p) ? ` data-checkout="${key}|${p.name}"` : ''}>${p.custom || p.quote ? 'Request a quote' : 'Get started'} <span class="dot"><svg class="icon"><use href="#i-ne"/></svg></span></a></div>`;
function renderPlans(key, animate) {
  const draw = () => {
    plansEl.innerHTML = plans[key].map((p, i) => planHTML(p, i, key)).join('');
    if (animate && !reduce) { const cs = [...plansEl.children]; cs.forEach(c => c.classList.add('flipout')); requestAnimationFrame(() => requestAnimationFrame(() => cs.forEach(c => c.classList.remove('flipout')))); }
  };
  if (!animate || reduce) return draw();
  [...plansEl.children].forEach(c => c.classList.add('flipout'));
  setTimeout(draw, 380);
}
if (plansEl && plans) renderPlans('recep', false);
document.querySelectorAll('.ptabs button').forEach(b => b.addEventListener('click', () => {
  if (b.getAttribute('aria-selected') === 'true') return;
  document.querySelectorAll('.ptabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  renderPlans(b.dataset.t, true);
}));
plansEl && plansEl.addEventListener('click', e => {
  const a = e.target.closest('[data-plan]'); if (!a) return;
  const tab = document.querySelector('.ptabs [aria-selected="true"]').textContent.replace('AI', '').trim();
  const msg = document.getElementById('f-msg');
  if (!msg.value) msg.value = `I'm interested in the ${tab} – ${a.dataset.plan} plan.`;
});

/* ---------- FAQ ---------- */
document.querySelectorAll('.q button').forEach(b => b.addEventListener('click', () => {
  const q = b.parentElement, open = !q.classList.contains('open');
  q.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
}));
