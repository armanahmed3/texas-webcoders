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
  const renderer = new THREE.WebGLRenderer({canvas, antialias:false, alpha:true, powerPreference:'high-performance'});
  let ratio = Math.min(devicePixelRatio, 1.75);
  renderer.setPixelRatio(ratio);
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

  // thin orbit rings with moons around the cloud
  const orbits = new THREE.Group();
  const rings = [[2.95, .5, .2, acc], [3.45, -.75, .55, ink], [3.95, 1.15, -.4, acc]].map(([r, tx, tz, color], n) => {
    const pts = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) { const a = i / 120 * Math.PI * 2; pts[i*3] = Math.cos(a) * r; pts[i*3+1] = Math.sin(a) * r; }
    const ringGeo = new THREE.BufferGeometry(); ringGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const line = new THREE.LineLoop(ringGeo, new THREE.LineBasicMaterial({color, transparent:true, depthWrite:false}));
    const moon = new THREE.Mesh(new THREE.SphereGeometry(.07 + n * .02, 14, 14), new THREE.MeshBasicMaterial({color, transparent:true}));
    const holder = new THREE.Group(); holder.rotation.set(tx, 0, tz); holder.add(line, moon); orbits.add(holder);
    return {r, line, moon, speed:.5 - n * .13};
  });
  scene.add(orbits);

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
  // scroll speed bends the camera; slow machines drop to 1x resolution instead of stuttering
  let sy = scrollY, warp = 0, last = performance.now(), slow = 0;
  (function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) { last = performance.now(); return; }
    const now = performance.now(), dt = now - last; last = now;
    if (ratio > 1) { slow = dt > 26 ? slow + 1 : Math.max(0, slow - 1); if (slow > 40) { ratio = 1; renderer.setPixelRatio(1); renderer.setSize(innerWidth, innerHeight, false); } }
    const t = clock.getElapsedTime(), v = scrollY - sy;
    sy += v * .14;
    warp += (Math.max(-1, Math.min(1, v / 260)) - warp) * .1;
    const y = sy;
    let a = keys[0], b = keys[0], k = 0;
    for (let i = 0; i < keys.length - 1; i++) { if (y >= keys[i].at) { a = keys[i]; b = keys[i + 1]; k = ss(Math.min(1, (y - a.at) / Math.max(1, b.at - a.at))); } }
    if (y >= keys[keys.length - 1].at) { a = b = keys[keys.length - 1]; k = 0; }
    const A = SHAPES[a.shape], B = SHAPES[b.shape];
    const intro = introStart === null ? 0 : easeOut(Math.min(1, (performance.now() - introStart) / 2600));
    const breathe = reduce ? 0 : .02;
    const morph = reduce ? 0 : Math.sin(k * Math.PI); // 0 at a shape, 1 halfway between two shapes
    for (let i = 0, j = 0; i < N; i++, j += 3) {
      const w = Math.sin(t * 1.2 + phase[i]) * breathe;
      let x = A[j] + (B[j] - A[j]) * k, yy = A[j+1] + (B[j+1] - A[j+1]) * k, z = A[j+2] + (B[j+2] - A[j+2]) * k;
      if (morph > .001) { // points spiral around the centre on their way to the next shape
        const ang = morph * (1.1 + phase[i] * .16), c = Math.cos(ang), s = Math.sin(ang), rx = x * c - z * s;
        z = x * s + z * c; x = rx;
        yy += Math.sin(phase[i] * 3) * morph * .5;
      }
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
    cloud.rotation.z = morph * .35 + warp * .25;
    mat.opacity = lerp(a.op, b.op) * (small ? .18 : 1) * Math.min(1, intro * 1.5);
    orbits.position.copy(cloud.position);
    orbits.scale.setScalar(cloud.scale.x * (1 + morph * .55));
    orbits.rotation.set(my * .4 + warp * .5, t * .12 + mx * .7, 0);
    rings.forEach(o => {
      const a = t * o.speed; o.moon.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
      o.line.material.opacity = mat.opacity * .4; o.moon.material.opacity = mat.opacity * .9;
    });
    camera.position.z = 9 - morph * 2.4; // the camera dollies through the cloud between shapes
    camera.fov = 45 + Math.abs(warp) * 16;
    camera.updateProjectionMatrix();
    if (mat.opacity > .004) renderer.render(scene, camera);
  })();
  if (!document.querySelector('.loader')) window.particleIntro();
})();