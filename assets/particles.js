/* Texas WebCoders: one particle cloud that morphs shape per section ([data-shape] keyframes). */
(function particles() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger) && !reduce;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  const canvas = document.getElementById('particles');
  if (!window.THREE || !canvas || !document.querySelector('[data-shape]')) return;
  let small = innerWidth < 900;
  const N = small ? 3200 : 6500;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 100);
  camera.position.set(0, 0, 9); camera.lookAt(0, 0, 0);
  const R = () => Math.random();

  // target shapes, all with N points
  const make = fn => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const p = fn(i); a[i*3] = p[0]; a[i*3+1] = p[1]; a[i*3+2] = p[2]; } return a; };
  const sphere = make(i => { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996, d = 2.25 + (R() - .5) * .12; return [Math.cos(t) * r * d, y * d, Math.sin(t) * r * d]; });
  const scatter = make(() => { const u = R() * Math.PI * 2, v = Math.acos(2 * R() - 1), d = 6 + R() * 6; return [Math.sin(v) * Math.cos(u) * d, Math.sin(v) * Math.sin(u) * d, Math.cos(v) * d - 3]; });
  const wave = make(() => { const b = Math.floor(R() * 72), x = -4.6 + b * (9.2 / 71); const amp = (.25 + .75 * Math.abs(Math.sin(b * .37) * Math.cos(b * .11))) * 1.25 * Math.exp(-x * x / 22); return [x + (R() - .5) * .05, (R() * 2 - 1) * amp, (R() - .5) * .3]; });
  const inBubble = (x, y) => { const w = 2.5, h = 1.55, r = .7; const dx = Math.max(Math.abs(x) - (w - r), 0), dy = Math.max(Math.abs(y) - (h - r), 0); if (dx * dx + dy * dy <= r * r) return true; return y < -h && y > -h - .9 && x > -1.6 && x < -1.6 + (y + h + .9) * .9; };
  const bubble = make(i => {
    const k = i / N;
    if (k < .16) { const c = Math.floor(k / .16 * 3), a = R() * Math.PI * 2, rr = Math.sqrt(R()) * .26; return [(c - 1) * .95 + Math.cos(a) * rr, Math.sin(a) * rr, (R() - .5) * .2]; }
    if (k < .7) { const per = R(); let x, y; const w = 2.5, h = 1.55; if (per < .3) { x = (R() * 2 - 1) * w; y = h; } else if (per < .6) { x = (R() * 2 - 1) * w; y = -h; } else if (per < .8) { x = -w; y = (R() * 2 - 1) * h; } else { x = w; y = (R() * 2 - 1) * h; } return [x * (.96 + R() * .04), y * (.96 + R() * .04), (R() - .5) * .25]; }
    let x, y; do { x = (R() * 2 - 1) * 2.5; y = -2.5 + R() * 4.1; } while (!inBubble(x, y)); return [x, y, (R() - .5) * .5];
  });
  const layers = make(i => { const L = i % 3, z = (L - 1) * 1.3, w = 2.3, h = 1.45; let x, y; if (R() < .55) { const s = R(); if (s < .5) { x = (R() * 2 - 1) * w; y = R() < .5 ? h : -h; } else { x = R() < .5 ? w : -w; y = (R() * 2 - 1) * h; } } else { const row = Math.floor(R() * 5); y = h - .45 - row * .55; x = -w + .3 + R() * (row === 0 ? 1.4 : 3.6); } return [x + L * .25, y + L * .2, z]; });
  const SHAPES = {sphere, wave, bubble, layers};
  const SPIN = {sphere:1, wave:0, bubble:0, layers:.25};

  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), phase = new Float32Array(N);
  const ink = new THREE.Color('#0D0D0D'), acc = new THREE.Color('#FF4F1A');
  for (let i = 0; i < N; i++) { const c = R() < .16 ? acc : ink; col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b; phase[i] = R() * Math.PI * 2; }
  pos.set(scatter);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const dot = document.createElement('canvas'); dot.width = dot.height = 64;
  const g = dot.getContext('2d'); g.beginPath(); g.arc(32, 32, 28, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
  const mat = new THREE.PointsMaterial({size: small ? .055 : .045, map: new THREE.CanvasTexture(dot), vertexColors: true, transparent: true, alphaTest: .01, depthWrite: false});
  const cloud = new THREE.Points(geo, mat);
  scene.add(cloud);

  // keyframes come from sections marked with data-shape
  let keys = [];
  const readKeys = () => {
    keys = [...document.querySelectorAll('[data-shape]')].map(el => {
      const box = el.closest('.pin-spacer') || el, top = box.getBoundingClientRect().top + scrollY;
      return {at: Math.max(0, top + box.offsetHeight / 2 - innerHeight / 2), shape: el.dataset.shape, x: +el.dataset.x, y: +el.dataset.y, s: +el.dataset.s, op: +el.dataset.op};
    }).sort((a, b) => a.at - b.at);
    keys[0].at = 0;
  };
  readKeys();
  addEventListener('load', readKeys);
  if (hasGSAP) ScrollTrigger.addEventListener('refresh', readKeys);

  let introStart = null;
  window.particleIntro = () => { introStart = performance.now(); };
  if (reduce) introStart = -1e9;
  let mx = 0, my = 0, tx = 0, ty = 0;
  if (finePointer) addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, {passive:true});
  addEventListener('resize', () => { small = innerWidth < 900; renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); readKeys(); });
  renderer.setSize(innerWidth, innerHeight, false);

  const ss = t => t * t * (3 - 2 * t);
  const easeOut = t => 1 - Math.pow(1 - t, 4);
  const clock = new THREE.Clock();
  (function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const t = clock.getElapsedTime(), y = scrollY;
    let a = keys[0], b = keys[0], k = 0;
    for (let i = 0; i < keys.length - 1; i++) { if (y >= keys[i].at) { a = keys[i]; b = keys[i + 1]; k = ss(Math.min(1, (y - a.at) / Math.max(1, b.at - a.at))); } }
    if (y >= keys[keys.length - 1].at) { a = b = keys[keys.length - 1]; k = 0; }
    const A = SHAPES[a.shape], B = SHAPES[b.shape];
    const intro = introStart === null ? 0 : easeOut(Math.min(1, (performance.now() - introStart) / 2600));
    const breathe = reduce ? 0 : .02;
    for (let i = 0, j = 0; i < N; i++, j += 3) {
      const w = Math.sin(t * 1.2 + phase[i]) * breathe;
      let x = A[j] + (B[j] - A[j]) * k, yy = A[j+1] + (B[j+1] - A[j+1]) * k, z = A[j+2] + (B[j+2] - A[j+2]) * k;
      if (intro < 1) { x = scatter[j] + (x - scatter[j]) * intro; yy = scatter[j+1] + (yy - scatter[j+1]) * intro; z = scatter[j+2] + (z - scatter[j+2]) * intro; }
      pos[j] = x + w; pos[j+1] = yy + w; pos[j+2] = z;
    }
    geo.attributes.position.needsUpdate = true;
    mx += (tx - mx) * .05; my += (ty - my) * .05;
    const lerp = (p, q) => p + (q - p) * k;
    const spin = lerp(SPIN[a.shape], SPIN[b.shape]);
    cloud.position.x = lerp(a.x, b.x) * (small ? 0 : 1);
    cloud.position.y = lerp(a.y, b.y) * (small ? .5 : 1);
    cloud.scale.setScalar(lerp(a.s, b.s) * (small ? .7 : 1) * (.85 + .15 * intro));
    cloud.rotation.y = spin * t * .18 + mx * .5;
    cloud.rotation.x = my * .3 + (1 - intro) * .6;
    mat.opacity = lerp(a.op, b.op) * (small ? .18 : 1) * Math.min(1, intro * 1.5);
    renderer.render(scene, camera);
  })();
  if (!document.querySelector('.loader')) window.particleIntro();
})();