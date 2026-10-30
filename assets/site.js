/* Texas WebCoders: shared behaviour for inner pages (and page transitions on the home page). */
(function () {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger) && !reduce;
  if (hasGSAP) { gsap.registerPlugin(ScrollTrigger); gsap.ticker.lagSmoothing(0); }
  const isHome = document.body.dataset.page === 'home';
  const MEDIA = 'https://texaswebcoders.com/portfolio-media/texaswebcoders/';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ---------- Stripe checkout for fixed-price plans (api/checkout.js); falls back to the plan's contact link ---------- */
  document.addEventListener('click', async e => {
    const a = e.target.closest('[data-checkout]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    e.stopImmediatePropagation(); // keep the page-transition handler below from navigating away
    if (a.classList.contains('busy')) return;
    a.classList.add('busy'); a.setAttribute('aria-busy', 'true');
    const [tab, name] = a.dataset.checkout.split('|');
    try {
      const r = await fetch('/api/checkout', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({tab, name})});
      const d = await r.json();
      if (r.ok && d.url) { location.href = d.url; return; }
      throw new Error(d.error || r.status);
    } catch (err) {
      console.warn('Online checkout unavailable, opening the contact form instead', err);
      a.classList.remove('busy'); a.removeAttribute('aria-busy');
      location.href = a.href;
    }
  });

  /* ---------- smooth scrolling; ScrollTrigger reads the same position, so scrubs stay locked to it ---------- */
  if (hasGSAP && window.Lenis) {
    const lenis = window.lenis = new Lenis({lerp:.1, wheelMultiplier:1, anchors:{offset:-90}});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
  }

  /* ---------- page transitions: 3D slats fold shut before leaving and fold open on load ---------- */
  const curtain = document.createElement('div');
  curtain.className = 'pt' + (isHome || reduce ? ' pt-out pt-instant' : '');
  curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = Array.from({length:7}, (_, i) => `<b style="--i:${i}"></b>`).join('') + '<img src="assets/logo-mark-orange.png" alt="">';
  document.body.appendChild(curtain);
  if (!isHome && !reduce) setTimeout(() => curtain.classList.add('pt-out'), 120);
  // fetch the next page on hover so it opens as the slats finish
  const prefetched = new Set();
  if (finePointer) document.addEventListener('pointerover', e => {
    const a = e.target.closest && e.target.closest('a[href$=".html"]');
    if (!a || a.origin !== location.origin || prefetched.has(a.href)) return;
    prefetched.add(a.href);
    const l = document.createElement('link'); l.rel = 'prefetch'; l.href = a.href; document.head.appendChild(l);
  }, {passive:true});
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || reduce || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    const url = new URL(a.href); // a.href is already resolved against <base>, which blog posts use
    if (url.origin !== location.origin || url.pathname === location.pathname || !/(\.html|\/)$/.test(url.pathname)) return;
    e.preventDefault();
    curtain.classList.remove('pt-instant', 'pt-out');
    const main = $('main');
    if (main) { main.style.transformOrigin = `50% ${scrollY + innerHeight / 2}px`; main.classList.add('pt-leave'); }
    window.lenis && lenis.stop();
    setTimeout(() => { location.href = url.href; }, 640);
  });
  addEventListener('pageshow', e => { if (e.persisted) { curtain.classList.add('pt-out'); const main = $('main'); main && main.classList.remove('pt-leave'); window.lenis && lenis.start(); } });

  /* ---------- text: paragraphs light up word by word with the scroll ---------- */
  const wordSpans = el => {
    const out = [];
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 1) return walk(n);
      if (n.nodeType !== 3 || !n.textContent.trim()) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
        const w = document.createElement('span'); w.className = 'tw'; w.textContent = part; frag.appendChild(w); out.push(w);
      });
      n.replaceWith(frag);
    });
    walk(el); return out;
  };
  if (hasGSAP) addEventListener('load', () => {
    $$('main .lead, .srv p, .value p, .step p, .big-quote').forEach(el => {
      if (el.closest('.hero, .phero, .pin-spacer, .svc, .scard, .plan') || el.matches('.h-in, .p-in')) return;
      const words = wordSpans(el);
      if (words.length) gsap.fromTo(words, {opacity:.12, y:16, rotateX:-55, transformPerspective:600, transformOrigin:'50% 100%'}, {opacity:1, y:0, rotateX:0, ease:'none', stagger:.05, scrollTrigger:{trigger:el, start:'top 90%', end:'top 58%', scrub:true}});
    });
  });

  /* ---------- text: links and buttons roll over in 3D on hover ---------- */
  if (finePointer && !reduce) document.addEventListener('pointerover', e => {
    const el = e.target.closest && e.target.closest('.menu a, footer ul a, .btn');
    if (!el || el.dataset.rolled) return;
    const n = [...el.childNodes].find(c => c.nodeType === 3 && c.textContent.trim());
    if (!n) return;
    el.dataset.rolled = '1';
    const text = n.textContent.trim(), roll = document.createElement('span');
    roll.className = 'roll'; roll.dataset.t = text; roll.innerHTML = '<span></span>'; roll.firstChild.textContent = text;
    n.replaceWith(roll);
  }, {passive:true});

  /* ---------- sections sink back in 3D as the next one arrives (desktop; skips pinned and sticky sections) ---------- */
  if (hasGSAP) addEventListener('load', () => gsap.matchMedia().add('(min-width: 901px)', () => {
    $$('main > section').forEach(sec => {
      if (sec.matches('.hero, .phero, .band, .cta, [id="band"]') || sec.querySelector('.pin-spacer, .scard')) return;
      if (sec.closest('.pin-spacer') || sec.offsetHeight < innerHeight * .5) return;
      gsap.to(sec, {rotateX:7, z:-140, opacity:.55, transformPerspective:1700, transformOrigin:'50% 100%', ease:'none', scrollTrigger:{trigger:sec, start:'bottom 62%', end:'bottom 8%', scrub:true}});
    });
    // card grids fly in from depth, one after another (the home page animates its own cards)
    if (!isHome && $('.post, .pitem, .ind a')) {
      gsap.set('.post, .pitem, .ind a', {y:90, z:-260, rotateY:-22, rotateX:14, transformPerspective:1300, opacity:0});
      ScrollTrigger.batch('.post, .pitem, .ind a', {start:'top 94%', once:true, onEnter: els => gsap.to(els, {y:0, z:0, rotateY:0, rotateX:0, opacity:1, duration:1.2, ease:'expo.out', stagger:.07})});
    }
    ScrollTrigger.refresh();
  }));

  if (isHome) return; // the home page runs its own scripts for everything else

  /* ---------- nav ---------- */
  const hdr = $('#hdr'), burger = $('.burger'), menu = $('#menu');
  burger && burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
  menu && menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    hdr.classList.toggle('scrolled', y > 20);
    hdr.classList.toggle('hide', y > 700 && y > lastY && !menu.classList.contains('open'));
    lastY = y;
  }, {passive:true});

  /* ---------- split words for 3D heading reveals ---------- */
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

  /* ---------- page hero intro ---------- */
  if (hasGSAP) {
    const tl = gsap.timeline({delay:.45, defaults:{ease:'expo.out'}});
    if ($('.phero h1 .ln > span')) tl.from('.phero h1 .ln > span', {yPercent:115, rotateX:-70, transformPerspective:800, transformOrigin:'50% 100%', duration:1.5, stagger:.1});
    tl
      .from('.phero .p-in', {y:30, z:-120, rotateX:-18, transformPerspective:900, opacity:0, duration:1.3, stagger:.08}, .2);
    if ($('.phero .p-card')) tl.from('.phero .p-card', {opacity:0, rotateY:-40, rotateX:18, z:-300, x:60, transformPerspective:1200, duration:1.8}, .3);
    // headings without line wrappers (e.g. blog posts) rise in as a whole
    $$('.phero h1').forEach(h => { if (!h.querySelector('.ln')) gsap.from(h, {y:40, opacity:0, rotateX:-30, transformPerspective:800, duration:1.3, delay:.45, ease:'expo.out'}); });
    gsap.to('.phero .wrap', {yPercent:-10, opacity:.15, ease:'none', scrollTrigger:{trigger:'.phero', start:'top top', end:'bottom top', scrub:true}});

    // 3D word reveals on section headings
    $$('.split').forEach(h => {
      const ws = splitWords(h);
      gsap.from(ws, {yPercent:110, rotateX:-85, transformPerspective:700, transformOrigin:'50% 100%', opacity:0, duration:1.3, ease:'expo.out', stagger:.045, scrollTrigger:{trigger:h, start:'top 86%'}});
    });
    $$('.rise, .value, .form, .office, .srv-media').forEach(el => gsap.from(el, {y:60, rotateX:12, transformPerspective:900, opacity:0, duration:1.1, ease:'expo.out', scrollTrigger:{trigger:el, start:'top 90%'}}));
    const gw = $('#giant') ? splitWords($('#giant')) : [];
    if (gw.length) gsap.from(gw, {yPercent:100, rotateX:-60, transformPerspective:800, duration:1.4, ease:'expo.out', stagger:.08, scrollTrigger:{trigger:'#giant', start:'top 95%'}});
    $$('.cin').forEach(el => gsap.fromTo(el, {rotateX:16, z:-160, opacity:.35, transformPerspective:1400, transformOrigin:'50% 0%'}, {rotateX:0, z:0, opacity:1, ease:'none', scrollTrigger:{trigger:el, start:'top bottom', end:'top 55%', scrub:true}}));
    if ($('.band')) gsap.fromTo('.band', {clipPath:'inset(10% 6% 10% 6% round 48px)'}, {clipPath:'inset(0% 0% 0% 0% round 0px)', ease:'none', scrollTrigger:{trigger:'.band', start:'top 95%', end:'top 25%', scrub:true}});
    if ($('#stepline')) {
      const steps = $$('.step');
      gsap.to('#stepline', {scaleX:1, ease:'none', scrollTrigger:{trigger:'#steps', start:'top 75%', end:'bottom 55%', scrub:true, onUpdate: s => steps.forEach((st, i) => st.classList.toggle('on', s.progress >= i / steps.length + .02))}});
    }

    // pinned sample call (AI receptionist page)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      if (!$('#phone') || !$('.recep')) return;
      const msgs = $$('.msg');
      gsap.set(msgs, {opacity:0, y:24, scale:.94});
      gsap.set('.booked', {opacity:0, y:30, scale:.9});
      gsap.timeline({scrollTrigger:{trigger:'.recep', start:'top top', end:'+=2000', pin:true, scrub:1, anticipatePin:1}})
        .fromTo('#phone', {rotateY:-32, rotateX:14, rotateZ:-4, y:80, scale:.9}, {rotateY:0, rotateX:0, rotateZ:0, y:0, scale:1, duration:1.2, ease:'power2.out'})
        .to(msgs, {opacity:1, y:0, scale:1, stagger:.55, duration:.5, ease:'back.out(1.6)'}, .9)
        .to('.booked', {opacity:1, y:0, scale:1, duration:.6, ease:'back.out(1.8)'})
        .to('#phone', {rotateY:16, rotateX:-4, duration:1, ease:'power1.inOut'});
    });
    addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ---------- extruded 3D logo mark (stacked layers) ---------- */
  $$('[data-logo3d]').forEach(box => {
    for (let i = 0; i < 18; i++) {
      const im = document.createElement('img');
      im.src = 'assets/logo-mark-orange.png'; im.alt = '';
      im.style.transform = `translateZ(${(9 - i) * 1.6}px)`;
      if (i > 0 && i < 17) im.style.filter = `brightness(${.55 + i * .01})`;
      box.appendChild(im);
    }
  });

  /* ---------- generated sound bars ---------- */
  $$('[data-bars]').forEach(el => { const n = +el.dataset.bars; for (let i = 0; i < n; i++) { const b = document.createElement('i'); b.style.setProperty('--n', i); b.style.setProperty('--h', `${30 + Math.round(Math.abs(Math.sin(i * 1.7)) * 65)}%`); el.appendChild(b); } });

  /* ---------- 3D tilt on cards ---------- */
  if (finePointer && !reduce) $$('[data-tilt]').forEach(el => {
    const t = el.querySelector('.in') || el;
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); t.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 14}deg`); t.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - .5) * -12}deg`); });
    el.addEventListener('pointerleave', () => { t.style.setProperty('--ry', '0deg'); t.style.setProperty('--rx', '0deg'); });
  });
  const pc = $('.p-card');
  if (pc && finePointer && !reduce) addEventListener('pointermove', e => { pc.style.transform = `perspective(1000px) rotateX(${(e.clientY / innerHeight - .5) * -12}deg) rotateY(${(e.clientX / innerWidth - .5) * 16}deg)`; }, {passive:true});

  /* ---------- counters ---------- */
  const runCount = el => {
    const end = +el.dataset.count, dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', sup = el.dataset.sup ? `<sup>${el.dataset.sup}</sup>` : (dec ? '' : '<sup>+</sup>');
    const t0 = performance.now(), dur = reduce ? 0 : 1800;
    (function tick(now) { const k = dur ? Math.min(1, (now - t0) / dur) : 1, v = end * (1 - Math.pow(1 - k, 4)); el.innerHTML = pre + v.toFixed(dec) + sup; if (k < 1) requestAnimationFrame(tick); })(t0);
  };
  const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cio.unobserve(e.target); runCount(e.target); } }), {threshold:.4});
  $$('[data-count]').forEach(c => cio.observe(c));

  /* ---------- FAQ ---------- */
  $$('.q button').forEach(b => b.addEventListener('click', () => {
    const q = b.parentElement, open = !q.classList.contains('open');
    q.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
  }));

  /* ---------- missed-call calculator ---------- */
  if ($('#r-calls')) {
    const calls = $('#r-calls'), value = $('#r-value'), rate = $('#r-rate'), fmt = n => '$' + Math.round(n).toLocaleString();
    let shown = 0;
    const paint = v => { $('#roi-m').textContent = fmt(v); $('#roi-y').textContent = fmt(v * 12); };
    const update = e => {
      [calls, value, rate].forEach(r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%'));
      $('#v-calls').textContent = calls.value; $('#v-value').textContent = fmt(+value.value); $('#v-rate').textContent = rate.value + '%';
      const monthly = calls.value * 4.33 * value.value * (rate.value / 100);
      $('#roi-bar').style.width = Math.min(100, monthly / 600) + '%';
      if (!e || !hasGSAP) { shown = monthly; return paint(monthly); }
      const o = {v: shown};
      gsap.to(o, {v: monthly, duration:.6, ease:'power3.out', onUpdate: () => { shown = o.v; paint(o.v); }});
      gsap.fromTo('#roi-m', {rotateX:-60}, {rotateX:0, duration:.5, ease:'back.out(2)', overwrite:'auto'});
    };
    [calls, value, rate].forEach(r => r.addEventListener('input', update));
    update();
  }

  /* ---------- pricing ---------- */
  const plansEl = $('#plans');
  if (plansEl && window.PLANS) {
    const money = n => '$' + n.toLocaleString();
    const tabLabel = key => { const b = $(`.ptabs [data-t="${key}"]`); return b ? b.firstChild.textContent.trim() : (plansEl.dataset.label || ''); };
    const hasForm = !!$('#quote');
    const planHTML = (p, i, key) => {
      const label = `${tabLabel(key)} – ${p.name}`;
      const href = hasForm ? '#quote' : `contact.html?plan=${encodeURIComponent(label)}`;
      const buy = window.PLAN_BUYABLE && PLAN_BUYABLE(p) ? ` data-checkout="${key}|${p.name}"` : '';
      return `<article class="plan${p.best ? ' best' : ''}" style="--d:${i}">${p.best ? '<span class="ribbon">MOST POPULAR</span>' : ''}<h3>${p.name}</h3><p class="desc">${p.desc}</p><div class="price">${p.custom ? '<strong>Custom</strong>' : `${p.from ? '<span class="from-l">From</span>' : ''}<strong>${money(p.price)}</strong>${p.per ? `<span class="per">${p.per}</span>` : ''}${p.was ? `<s aria-label="was ${money(p.was)}">${money(p.was)}</s>` : ''}`}</div>${p.note ? `<p class="note">${p.note}</p>` : ''}<ul>${p.items.map(t => `<li><svg class="icon"><use href="#i-check"/></svg>${t}</li>`).join('')}</ul><a class="btn btn-dark" href="${href}" data-plan="${label}"${buy}>${p.custom || p.quote ? 'Request a quote' : 'Get started'} <span class="dot"><svg class="icon"><use href="#i-ne"/></svg></span></a></article>`;
    };
    const render = (key, animate) => {
      const draw = () => {
        plansEl.innerHTML = PLANS[key].map((p, i) => planHTML(p, i, key)).join('');
        if (animate && !reduce) { const cs = [...plansEl.children]; cs.forEach(c => c.classList.add('flipout')); requestAnimationFrame(() => requestAnimationFrame(() => cs.forEach(c => c.classList.remove('flipout')))); }
      };
      if (!animate || reduce) return draw();
      [...plansEl.children].forEach(c => c.classList.add('flipout'));
      setTimeout(draw, 380);
    };
    const tabs = $$('.ptabs button');
    const select = (key, animate) => { tabs.forEach(x => x.setAttribute('aria-selected', x.dataset.t === key)); render(key, animate); };
    const fromHash = location.hash.slice(1);
    select(PLANS[fromHash] && tabs.length ? fromHash : (plansEl.dataset.only || (tabs[0] && tabs[0].dataset.t)), false);
    tabs.forEach(b => b.addEventListener('click', () => { if (b.getAttribute('aria-selected') !== 'true') { select(b.dataset.t, true); history.replaceState(null, '', '#' + b.dataset.t); } }));
    plansEl.addEventListener('click', e => { const a = e.target.closest('[data-plan]'); const msg = $('#f-msg'); if (a && msg && !msg.value) msg.value = `I'm interested in the ${a.dataset.plan} plan.`; });
  }

  /* ---------- portfolio grid + 3D lightbox ---------- */
  const grid = $('#pgrid');
  if (grid) {
    const cats = {web:'Websites', wp:'WordPress', ecom:'E-commerce', soft:'Software & SaaS', app:'Mobile apps', ux:'UI/UX', graphic:'Graphic design', logo:'Logos'};
    const items = [
      ['web','Website/website_solex_sneaker_store.png','Solex footwear store'],['web','Website/website_famsworld_lifestyle_store.png','Famsworld lifestyle store'],['web','Website/website_flipmart_grocery_supermarket.png','Flipmart grocery'],['web','Website/website_nexora_tech_store.png','Nexora tech store'],['web','Website/website_brew_haven_coffee_roastery.png','Brew Haven coffee roastery'],['web','Website/screencapture-allcountystaffingdade-2025-05-08-22_31_15.png','All County Staffing'],['web','Website/screencapture-firstalerthhc-2025-05-08-22_30_13.png','First Alert home health'],['web','Website/screencapture-goglobe-2025-05-09-01_04_44.png','GoGlobe'],['web','Website/5.png','Business website'],['web','Website/4.png','Business website'],
      ['wp','wordpress/wp_bedetailing_car_customizing.png','BeDetailing auto care'],['wp','wordpress/wp_summit_auto_group_dealership.png','Summit Auto Group'],['wp','wordpress/wp_furnicasa_modern_furniture.png','Furnicasa furniture'],['wp','wordpress/wp_interior_studio_furniture.png','Interior Studio'],['wp','wordpress/wp_velvetique_beauty_skincare.png','Velvetique skincare'],
      ['ecom','ecommerce/ecom_1_nature_outerwear.png','Terra Outfitters'],['ecom','ecommerce/ecom_2_dailysteals_deals.png','DailySteals marketplace'],['ecom','ecommerce/ecom_3_ocean_gift_purpose.png','Ocean gift store'],
      ['soft','software/software_crm_dreamsai_agent_studio.png','DreamsAI agent studio'],['soft','software/software_crm_nexora_sales_pipeline.png','Nexora sales CRM'],['soft','software/software_crm_smarthr_workforce_erp.png','SmartHR workforce ERP'],['soft','software/software_crm_skillsphere_edtech_lms.png','SkillSphere LMS'],['soft','software/software_crm_eeoz_seo_analytics.png','EEOZ SEO analytics'],
      ['app','app/mobile_app_dentacare_clinic.png','DentaCare clinic app'],['app','app/mobile_app_shipping_logistics.png','Shipping & logistics app'],['app','app/mobile_app_luxe_handbag.png','Luxe handbag store app'],['app','app/mobile_app_perfume_store.png','Perfume store app'],['app','app/mobile_app_burger_delivery.png','Burger delivery app'],['app','app/mobile_app_fine_dining_menu.png','Fine dining menu app'],['app','app/mobile_app_artisan_bistro.png','Artisan bistro app'],['app','app/mobile_app_airpods_audio.png','Audio store app'],
      ['ux','uiux/uiux_1_vr_fitness.png','VR fitness UI'],['ux','uiux/uiux_2_crypto_web3.png','Crypto Web3 UI'],['ux','uiux/uiux_3_gts300_motorsport.png','GTS300 motorsport UI'],
      ['graphic','Graphic/packaging_herbelis_tea_trio.png','Herbelis tea packaging'],['graphic','Graphic/packaging_sebtal_luxury_box.jpg','Sebtal luxury box'],['graphic','Graphic/packaging_kanzaw_herbal_oil.jpg','Kanzaw herbal oil'],['graphic','Graphic/deck_engineerox_automotive.png','Engineerox pitch deck'],['graphic','Graphic/deck_nutrient_healthy_food.png','Nutrient pitch deck'],['graphic','Graphic/flyer_flight_centre_travel.png','Flight Centre flyer'],['graphic','Graphic/brochure_bookingagora_travel.jpg','BookingAgora brochure'],['graphic','Graphic/card_akhavan_law_firm.png','Akhavan law firm card'],['graphic','Graphic/typography_rako_sushi.png','Rako Sushi typography'],['graphic','Graphic/book_the_end_of_a_legend.png','Book cover design'],
      ['logo','logo/logo_bluline_tech.png','Bluline Tech'],['logo','logo/logo_bekevich_construction.png','Bekevich Construction'],['logo','logo/logo_cypress_auto_spa.png','Cypress Auto Spa'],['logo','logo/logo_banditz_pizza.png','Banditz Pizza'],['logo','logo/logo_rugby_genevois.png','Rugby Genevois'],['logo','logo/logo_lichurie_dragon_mascot.png','Lichurie dragon mascot']
    ];
    grid.innerHTML = items.map(([c, src, name]) => `<button class="pitem" data-c="${c}" data-tilt type="button" aria-label="Open ${name}"><span class="in"><img loading="lazy" decoding="async" src="${MEDIA + src}" alt="${name}"><span class="cap">${name}<span>${cats[c]}</span></span></span></button>`).join('');
    // drop any image that fails to load
    $$('.pitem img').forEach(im => im.addEventListener('error', () => im.closest('.pitem').remove()));
    const filters = $('#pfilters');
    const counts = items.reduce((m, [c]) => (m[c] = (m[c] || 0) + 1, m), {});
    filters.innerHTML = `<button aria-pressed="true" data-f="all">All<span>${items.length}</span></button>` + Object.entries(cats).map(([k, v]) => `<button aria-pressed="false" data-f="${k}">${v}<span>${counts[k] || 0}</span></button>`).join('');
    filters.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#pfilters button').forEach(x => x.setAttribute('aria-pressed', x === b));
      const shown = $$('.pitem').filter(p => { const on = b.dataset.f === 'all' || p.dataset.c === b.dataset.f; p.classList.toggle('hide', !on); return on; });
      if (hasGSAP) gsap.fromTo(shown, {opacity:0, y:40, rotateX:-25, transformPerspective:900}, {opacity:1, y:0, rotateX:0, duration:.8, stagger:.03, ease:'expo.out'});
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
    if (finePointer && !reduce) $$('.pitem').forEach(el => {
      const t = el.querySelector('.in');
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); t.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 12}deg`); t.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - .5) * -10}deg`); });
      el.addEventListener('pointerleave', () => { t.style.setProperty('--ry', '0deg'); t.style.setProperty('--rx', '0deg'); });
    });
    const lb = $('#lb'), lbImg = $('#lb img'), lbCap = $('#lb p'), lbClose = $('#lb button');
    document.body.appendChild(lb); // escape <main>'s stacking context so it covers the header
    let opener = null;
    lb.setAttribute('data-lenis-prevent', '');
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; window.lenis && lenis.start(); opener && opener.focus(); };
    grid.addEventListener('click', e => {
      const it = e.target.closest('.pitem'); if (!it) return;
      opener = it; const im = it.querySelector('img');
      lbImg.src = im.src; lbImg.alt = im.alt; lbCap.textContent = im.alt;
      lb.classList.add('open'); document.body.style.overflow = 'hidden'; window.lenis && lenis.stop(); lbClose.focus();
    });
    lbClose.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }

  /* ---------- blog: category filter + reading progress ---------- */
  const bf = $('#bfilters');
  bf && bf.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#bfilters button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('.blog-list .post').forEach(p => p.classList.toggle('hide', b.dataset.f !== 'all' && p.dataset.cat !== b.dataset.f));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
  const rb = $('.read-bar i'), prose = $('.prose');
  if (rb && prose) addEventListener('scroll', () => {
    const r = prose.getBoundingClientRect();
    rb.style.transform = `scaleX(${Math.max(0, Math.min(1, (innerHeight * .4 - r.top) / r.height))})`;
  }, {passive:true});

  /* ---------- quote form: validate, then open the email app ---------- */
  const quote = $('#quote');
  if (quote) {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan'), service = params.get('service');
    if (plan) $('#f-msg').value = `I'm interested in the ${plan} plan.`;
    if (service) [...$('#f-service').options].forEach(o => { if (o.text.toLowerCase().includes(service.toLowerCase())) o.selected = true; });
    quote.addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target, checks = [
        ['f-name', v => v.trim().length > 1, 'Enter your name.'],
        ['f-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email, like you@company.com.'],
        ['f-msg', v => v.trim().length > 9, 'Tell us a little more (at least 10 characters).']
      ];
      let first = null;
      checks.forEach(([id, ok, m]) => { const el = document.getElementById(id), wrap = el.closest('.field'), bad = !ok(el.value); wrap.classList.toggle('bad', bad); wrap.querySelector('.err').textContent = bad ? m : ''; el.setAttribute('aria-invalid', bad); if (bad && !first) first = el; });
      if (first) return first.focus();
      const extra = f.budget ? `\nBudget: ${f.budget.value}` : '';
      const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\nPhone: ${f.phone.value || '-'}\nInterested in: ${f.service.value}${extra}\n\n${f.message.value}`;
      location.href = `mailto:info@texaswebcoders.com?subject=${encodeURIComponent('Project inquiry: ' + f.service.value)}&body=${encodeURIComponent(body)}`;
    });
  }
  const sub = $('#subForm');
  sub && sub.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#email').value.trim(), m = $('#subMsg'), ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    m.style.color = ok ? '' : '#FF8A6B';
    m.textContent = ok ? 'Thanks, you’re subscribed.' : 'Enter a valid email, like you@company.com.';
  });
})();
