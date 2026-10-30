/* Texas WebCoders: opening scene. The camera flies down a tunnel of light streaks, past orbit rings, toward the logo. */
window.introScene = canvas => {
  if (!window.THREE) return null;
  const small = innerWidth < 900, N = small ? 500 : 1100;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false, powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setClearColor(0x0D0D0D, 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0D0D0D, 12, 70);
  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, .1, 120);
  camera.position.z = 6;

  // each streak is one line segment: x, y stay fixed and z moves toward the camera
  const pos = new Float32Array(N * 6), col = new Float32Array(N * 6), xy = new Float32Array(N * 2), zs = new Float32Array(N);
  const white = new THREE.Color('#E9E9EC'), orange = new THREE.Color('#FF4F1A');
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, r = 2.2 + Math.random() * 11;
    xy[i*2] = Math.cos(a) * r; xy[i*2+1] = Math.sin(a) * r; zs[i] = -Math.random() * 80;
    const c = Math.random() < .28 ? orange : white;
    col[i*6] = col[i*6+3] = c.r; col[i*6+1] = col[i*6+4] = c.g; col[i*6+2] = col[i*6+5] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const tunnel = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({vertexColors:true, transparent:true, opacity:.9}));
  tunnel.frustumCulled = false;
  scene.add(tunnel);

  // rings the camera passes through on the way in
  const rings = [0, 1, 2, 3, 4].map(i => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(3.4 + i * .5, .012, 8, 120), new THREE.MeshBasicMaterial({color: i % 2 ? 0xffffff : 0xFF4F1A, transparent:true, opacity:.75}));
    m.position.z = -8 - i * 11; m.rotation.set(.5 - i * .24, i * .4, 0);
    scene.add(m);
    return m;
  });

  let speed = 10, target = 26, last = performance.now(), raf = 0, t = 0;
  const step = dt => {
    t += dt;
    speed += (target - speed) * Math.min(1, dt * 2.2);
    const len = .25 + speed * .045;
    for (let i = 0; i < N; i++) {
      zs[i] += speed * dt;
      if (zs[i] > 7) { zs[i] = -80 + Math.random() * 8; }
      const j = i * 6, x = xy[i*2], y = xy[i*2+1];
      pos[j] = pos[j+3] = x; pos[j+1] = pos[j+4] = y; pos[j+2] = zs[i]; pos[j+5] = zs[i] - len;
    }
    geo.attributes.position.needsUpdate = true;
    rings.forEach((r, i) => {
      r.position.z += speed * dt * .55;
      r.rotation.x += dt * (.5 + i * .12); r.rotation.y += dt * (.35 - i * .1);
      if (r.position.z > 7) r.position.z = -46;
    });
    camera.rotation.z = Math.sin(t * .7) * .14;
    camera.fov = 70 + Math.min(40, Math.max(0, speed - 26) * .42);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  const frame = now => { raf = requestAnimationFrame(frame); const dt = Math.min(.05, (now - last) / 1000); last = now; step(dt); };
  step(.016);
  raf = requestAnimationFrame(frame);
  return {
    step,
    burst() { target = 130; }, // final jump to light speed as the iris opens
    stop() { cancelAnimationFrame(raf); geo.dispose(); renderer.dispose(); }
  };
};
