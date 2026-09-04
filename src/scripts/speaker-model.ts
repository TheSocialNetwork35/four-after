import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
/** Geometry and lighting render only when the view changes. */
export function createSpeakerModel(root: HTMLElement) {
  const room = root.querySelector<HTMLElement>(".speaker-room")!;
  const renderer = new T.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.VSMShadowMap;
  renderer.setClearColor(0xeee9df, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.className = "speaker-canvas";
  canvas.setAttribute("aria-hidden", "true");
  room.prepend(canvas);
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(36, 1, 0.1, 50);
  const model = new T.Group();
  scene.add(model);
  const carbon = new T.MeshStandardMaterial({
    color: 0x242426,
    roughness: 0.68,
    metalness: 0.16,
  });
  const dark = new T.MeshStandardMaterial({ color: 0x0d0d10, roughness: 0.85 });
  const rubber = new T.MeshStandardMaterial({
    color: 0x202023,
    roughness: 0.77,
  });
  const metal = new T.MeshStandardMaterial({
    color: 0x6a6a70,
    roughness: 0.32,
    metalness: 0.8,
  });
  const coneMaterial = new T.MeshStandardMaterial({
    color: 0x38383d,
    roughness: 0.82,
    side: T.DoubleSide,
  });
  const red = new T.MeshStandardMaterial({
    color: 0xc72520,
    roughness: 0.45,
    metalness: 0.2,
  });
  const mesh = (
    geometry: T.BufferGeometry,
    material: T.Material,
    x = 0,
    y = 0,
    z = 0,
    parent: T.Object3D = model,
  ) => {
    const m = new T.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const box = (
    w: number,
    h: number,
    d: number,
    r: number,
    mat: T.Material,
    x = 0,
    y = 0,
    z = 0,
  ) => mesh(new RoundedBoxGeometry(w, h, d, 3, r), mat, x, y, z);
  box(2.65, 4.1, 1.85, 0.13, carbon);
  box(2.48, 3.94, 0.14, 0.1, dark, 0, 0, 0.94);
  box(2.34, 3.8, 0.09, 0.07, carbon, 0, 0, 1.03);
  box(2.47, 0.07, 1.7, 0.025, red, 0, 2.025, 0);
  const driver = (y: number, r: number) => {
    const group = new T.Group();
    group.position.set(0, y, 1.1);
    model.add(group);
    const ring = (radius: number, tube: number, z: number, mat: T.Material) =>
      mesh(new T.TorusGeometry(radius, tube, 16, 64), mat, 0, 0, z, group);
    mesh(new T.CircleGeometry(r, 64), dark, 0, 0, -0.005, group);
    ring(r - 0.04, 0.045, 0.025, metal);
    ring(r * 0.87, r * 0.065, 0.07, dark);
    ring(r * 0.75, r * 0.085, 0.11, rubber);
    // A real recessed cone, turned around its axis, rather than a painted disc.
    const points = [
      new T.Vector2(r * 0.2, -0.12),
      new T.Vector2(r * 0.42, -0.1),
      new T.Vector2(r * 0.6, 0.01),
      new T.Vector2(r * 0.68, 0.09),
    ];
    const cone = mesh(
      new T.LatheGeometry(points, 64),
      coneMaterial,
      0,
      0,
      0,
      group,
    );
    cone.rotation.x = Math.PI / 2;
    for (let i = 0; i < 3; i++)
      ring(r * 0.48 + i * 0.07, 0.009, -0.055 + i * 0.025, rubber);
    const dome = mesh(
      new T.SphereGeometry(r * 0.32, 32, 16),
      rubber,
      0,
      0,
      -0.05,
      group,
    );
    dome.scale.z = 0.45;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const bolt = mesh(
        new T.CylinderGeometry(0.032, 0.032, 0.024, 12),
        metal,
        Math.cos(a) * (r - 0.07),
        Math.sin(a) * (r - 0.07),
        0.07,
        group,
      );
      bolt.rotation.x = Math.PI / 2;
    }
  };
  driver(-0.55, 0.96);
  driver(1, 0.43);
  // Recessed bass port with a thick elliptical lip and visible inner wall.
  const port = mesh(
    new T.TorusGeometry(0.32, 0.07, 12, 48),
    dark,
    0,
    -1.68,
    1.1,
  );
  port.scale.set(1.65, 0.38, 1);
  const opening = mesh(new T.CircleGeometry(0.32, 48), dark, 0, -1.68, 1.03);
  opening.scale.set(1.65, 0.38, 1);
  for (const x of [-1.04, 1.04])
    for (const y of [-1.77, 1.77]) {
      const s = mesh(
        new T.CylinderGeometry(0.035, 0.035, 0.025, 12),
        metal,
        x,
        y,
        1.095,
      );
      s.rotation.x = Math.PI / 2;
      box(0.041, 0.006, 0.005, 0.001, dark, x, y, 1.112);
    }
  // Separate isolation feet, rear connection panel and ventilation slots.
  for (const x of [-0.96, 0.96])
    for (const z of [-0.61, 0.61])
      box(0.35, 0.19, 0.35, 0.045, dark, x, -2.12, z);
  box(1.46, 1.85, 0.055, 0.04, dark, 0, -0.05, -0.948);
  for (let i = 0; i < 7; i++)
    box(1.04, 0.035, 0.027, 0.009, metal, 0, 0.58 - i * 0.115, -0.99);
  for (const x of [-0.3, 0.3]) {
    const jack = mesh(
      new T.TorusGeometry(0.09, 0.025, 12, 24),
      x < 0 ? red : metal,
      x,
      -0.68,
      -1.01,
    );
    jack.rotation.y = Math.PI;
  }
  // Layered handles on both sides are inset into a shaped mounting plate.
  for (const x of [-1, 1]) {
    box(0.035, 0.78, 0.45, 0.035, dark, x * 1.331, 0.3, 0);
    box(0.1, 0.51, 0.12, 0.035, metal, x * 1.365, 0.3, 0);
  }
  // Small printed label; all structural details above are meshes.
  const label = document.createElement("canvas");
  label.width = 512;
  label.height = 64;
  const ctx = label.getContext("2d")!;
  ctx.fillStyle = "#eee9df";
  ctx.font = "48px sans-serif";
  ctx.fillText("FOUR / AFTER", 20, 42);
  const texture = new T.CanvasTexture(label);
  texture.colorSpace = T.SRGBColorSpace;
  const labelMat = new T.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  mesh(new T.PlaneGeometry(0.99, 0.124), labelMat, -0.52, 1.67, 1.087);
  const ledMat = new T.MeshStandardMaterial({
    color: 0x862b20,
    emissive: 0xe63320,
    emissiveIntensity: 0,
  });
  mesh(new T.SphereGeometry(0.025, 12, 8), ledMat, 0.94, -1.76, 1.12);
  scene.add(new T.HemisphereLight(0xffffff, 0x9e9588, 2.6));
  const key = new T.DirectionalLight(0xfff5e7, 4.2);
  key.position.set(-3, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(512, 512);
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 8;
  key.shadow.blurSamples = 16;
  scene.add(key);
  const fill = new T.DirectionalLight(0xffffff, 1.6);
  fill.position.set(5, 2, -3);
  scene.add(fill);
  const floor = new T.Mesh(
    new T.PlaneGeometry(50, 50),
    new T.ShadowMaterial({ opacity: 0.19 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.3;
  floor.receiveShadow = true;
  scene.add(floor);
  // A subtle grounding contact shadow complements the directional geometry shadow.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sc = shadowCanvas.getContext("2d")!,
    gradient = sc.createRadialGradient(64, 64, 8, 64, 64, 64);
  gradient.addColorStop(0, "rgba(0,0,0,.22)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  sc.fillStyle = gradient;
  sc.fillRect(0, 0, 128, 128);
  const contactTexture = new T.CanvasTexture(shadowCanvas),
    contactMaterial = new T.MeshBasicMaterial({
      map: contactTexture,
      transparent: true,
      depthWrite: false,
    });
  const contact = new T.Mesh(new T.PlaneGeometry(4, 3), contactMaterial);
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = -2.295;
  scene.add(contact);
  let frame = 0,
    visible = true,
    disposed = false;
  const render = () => {
    frame = 0;
    if (!disposed && visible && !document.hidden)
      renderer.render(scene, camera);
  };
  const request = () => {
    if (!frame && !disposed) frame = requestAnimationFrame(render);
  };
  const update = () => {
    const yaw =
      (Number(
        (root.querySelector("#speaker-angle") as HTMLInputElement).value,
      ) *
        Math.PI) /
      180;
    const pitch =
      (Number((root.querySelector("#speaker-tilt") as HTMLInputElement).value) *
        Math.PI) /
      180;
    model.rotation.set(pitch, yaw, 0, "YXZ");
    // Keep every rotated orientation above the ground, including the back and underside.
    const bounds = new T.Box3().setFromObject(model);
    model.position.y += -2.16 - bounds.min.y;
    contact.scale.setScalar(1 + Math.abs(Math.sin(pitch)) * 0.3);
    ledMat.emissiveIntensity = root.classList.contains("speaker-is-playing")
      ? 2
      : 0;
    request();
  };
  const resize = () => {
    const w = room.clientWidth,
      h = room.clientHeight - 38;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.set(0, 2.55, Math.max(8.8, 6.6 / camera.aspect));
    camera.lookAt(0, 0.1, 0);
    camera.updateProjectionMatrix();
    update();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(room);
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) request();
  });
  io.observe(room);
  const mo = new MutationObserver(update);
  mo.observe(root, { attributes: true, attributeFilter: ["class"] });
  root.addEventListener("speaker-orientation", update);
  document.addEventListener("visibilitychange", request);
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    root.classList.remove("speaker-webgl");
  });
  canvas.addEventListener("webglcontextrestored", () => {
    root.classList.add("speaker-webgl");
    request();
  });
  root.classList.add("speaker-webgl");
  resize();
  addEventListener("pagehide", (e) => {
    if (e.persisted) return;
    disposed = true;
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
    mo.disconnect();
    scene.traverse((o) => {
      if (o instanceof T.Mesh) {
        o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m.dispose());
      }
    });
    texture.dispose();
    contactTexture.dispose();
    renderer.dispose();
  });
  addEventListener("pageshow", request);
}
