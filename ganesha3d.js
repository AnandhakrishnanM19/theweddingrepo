(() => {
  const mount = document.querySelector('.ganesha-wrap');
  const canvas = document.querySelector('.ganesha-canvas');
  if (!mount || !canvas) return;

  // The inline sculpture is the instant-loading fallback. Upgrade it to a real
  // softly-lit 3D model when the renderer is available and the browser is idle.
  const start = async () => {
    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 40);
      camera.position.set(0, 0.05, 7.7);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      scene.add(new THREE.HemisphereLight(0xfff9ec, 0x8b7d68, 2.1));
      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(-3, 5, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xe5d2a7, 1.8);
      rim.position.set(4, 2, -3);
      scene.add(rim);

      const statue = new THREE.Group();
      scene.add(statue);
      const porcelain = new THREE.MeshStandardMaterial({ color: 0xf2eee5, roughness: 0.38, metalness: 0.02 });
      const shadowWhite = new THREE.MeshStandardMaterial({ color: 0xd9d0c0, roughness: 0.48 });
      const gold = new THREE.MeshStandardMaterial({ color: 0xb99a64, roughness: 0.4, metalness: 0.58 });
      const sphere = new THREE.SphereGeometry(1, 36, 28);
      const addBall = (x, y, z, sx, sy, sz, material = porcelain) => {
        const mesh = new THREE.Mesh(sphere, material);
        mesh.position.set(x, y, z);
        mesh.scale.set(sx, sy, sz);
        statue.add(mesh);
        return mesh;
      };
      const addTube = (points, radius, material = porcelain) => {
        const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
        const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, radius, 12, false), material);
        statue.add(mesh);
        return mesh;
      };
      const addRing = (x, y, z, rx, ry, rz, material = gold, thickness = 0.025) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1, thickness, 8, 52), material);
        ring.position.set(x, y, z);
        ring.scale.set(rx, ry, rz);
        statue.add(ring);
        return ring;
      };

      // Lotus plinth, seated form, broad ears and the gently curling trunk.
      addBall(0, -1.25, 0, 1.08, 0.17, 0.62, shadowWhite);
      addBall(0, -1.13, 0, 0.78, 0.22, 0.53, porcelain);
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const petal = addBall(Math.cos(a) * 0.73, -1.02, Math.sin(a) * 0.43, 0.36, 0.13, 0.23, shadowWhite);
        petal.rotation.y = -a;
      }
      addBall(0, -0.45, 0, 0.75, 0.73, 0.53);
      addBall(-0.78, -0.47, 0, 0.28, 0.49, 0.28, shadowWhite);
      addBall(0.78, -0.47, 0, 0.28, 0.49, 0.28, shadowWhite);
      addBall(-0.74, -0.78, 0.07, 0.34, 0.2, 0.37);
      addBall(0.74, -0.78, 0.07, 0.34, 0.2, 0.37);
      addBall(-0.56, -0.12, 0.19, 0.18, 0.32, 0.2);
      addBall(0.56, -0.12, 0.19, 0.18, 0.32, 0.2);

      const leftEar = addBall(-0.9, 0.72, -0.03, 0.53, 0.77, 0.18, shadowWhite);
      const rightEar = addBall(0.9, 0.72, -0.03, 0.53, 0.77, 0.18, shadowWhite);
      leftEar.rotation.z = 0.36;
      rightEar.rotation.z = -0.36;
      addBall(0, 0.72, 0.04, 0.61, 0.72, 0.48);
      addBall(-0.22, 0.79, 0.49, 0.055, 0.035, 0.04, shadowWhite);
      addBall(0.22, 0.79, 0.49, 0.055, 0.035, 0.04, shadowWhite);
      addTube([[0, 0.9, 0.48], [-0.015, 0.53, 0.57], [0.02, 0.28, 0.57], [0.22, 0.13, 0.5], [0.32, 0.27, 0.49]], 0.135, shadowWhite);
      addBall(-0.25, 0.38, 0.48, 0.09, 0.24, 0.08, porcelain);
      addBall(0.25, 0.38, 0.48, 0.09, 0.24, 0.08, porcelain);

      // Crown, restrained temple jewelry, and a small halo-like headpiece.
      addBall(0, 1.29, 0, 0.39, 0.13, 0.34, shadowWhite);
      addBall(0, 1.48, 0, 0.26, 0.24, 0.25, porcelain);
      addBall(0, 1.68, 0, 0.15, 0.19, 0.17, shadowWhite);
      addBall(0, 1.88, 0, 0.065, 0.07, 0.07, gold);
      addRing(0, 1.31, 0.015, 0.4, 0.11, 1, gold, 0.018);
      addRing(0, 1.54, 0.015, 0.24, 0.07, 1, gold, 0.014);
      addTube([[-0.48, 0.23, 0.36], [-0.23, 0.06, 0.51], [0, 0.01, 0.56], [0.23, 0.06, 0.51], [0.48, 0.23, 0.36]], 0.022, gold);
      for (let i = -2; i <= 2; i++) addBall(i * 0.17, 0.06 + Math.abs(i) * 0.04, 0.55 - Math.abs(i) * 0.025, 0.035, 0.045, 0.025, gold);
      addRing(0, -0.08, 0.47, 0.46, 0.16, 1, gold, 0.018);
      addRing(0, -0.88, 0.17, 0.7, 0.15, 1, gold, 0.018);

      const resize = () => {
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const sizeObserver = new ResizeObserver(resize);
      sizeObserver.observe(mount);
      resize();

      mount.classList.add('is-3d');
      let frame;
      let previous = 0;
      const animate = (time) => {
        frame = requestAnimationFrame(animate);
        if (time - previous < 40) return;
        previous = time;
        statue.rotation.y = Math.sin(time * 0.00022) * 0.09;
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(animate);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(frame);
        else frame = requestAnimationFrame(animate);
      });
    } catch {
      // Keep the local SVG sculpture visible when WebGL or the optional CDN is unavailable.
    }
  };

  const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 250));
  schedule(start, { timeout: 1500 });
})();
