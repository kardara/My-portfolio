import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Euler,
  Matrix4,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Quaternion,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { shapeNames, type ShapeName } from "./stageShapes";

/**
 * How each shape moves and its tint: 3D shapes spin, flat symbols sway so they stay readable,
 * the gear turns on its own axis. `tiltX` leans the shape towards the viewer.
 */
const motion: Record<ShapeName, { mode: "spin" | "sway" | "turn"; tiltX: number; colorVar: string }> = {
  network: { mode: "spin", tiltX: 0.2, colorVar: "--color-primary" },
  code: { mode: "sway", tiltX: 0, colorVar: "--color-secondary" },
  chip: { mode: "sway", tiltX: -0.45, colorVar: "--color-secondary" },
  globe: { mode: "spin", tiltX: 0.3, colorVar: "--color-accent" },
  arm: { mode: "spin", tiltX: 0.1, colorVar: "--color-primary" },
  gear: { mode: "turn", tiltX: -0.2, colorVar: "--color-secondary" },
  shield: { mode: "sway", tiltX: 0, colorVar: "--color-accent" },
  padlock: { mode: "sway", tiltX: 0, colorVar: "--color-primary" },
};

/* ── Sampling helpers ── */

type V = [number, number, number];
type Part = [weight: number, sample: () => V];

const TAU = Math.PI * 2;
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const add = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: V, s: number): V => [a[0] * s, a[1] * s, a[2] * s];
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V): V => scale(a, 1 / Math.hypot(...a));
const len = (a: V) => Math.hypot(...a);
const jitter = (p: V, s: number): V => [p[0] + rand(-s, s), p[1] + rand(-s, s), p[2] + rand(-s, s)];

/** Point on the straight segment a→b, slightly thickened. */
const seg = (a: V, b: V, thick = 0.02) => (): V => jitter(add(a, scale(sub(b, a), Math.random())), thick);

/** Point on the surface of a cylinder of radius r around a→b. */
const tube = (a: V, b: V, r: number) => {
  const d = sub(b, a);
  const dn = norm(d);
  const u = norm(cross(dn, Math.abs(dn[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
  const v = cross(dn, u);
  return (): V => {
    const ang = rand(0, TAU);
    return add(add(a, scale(d, Math.random())), add(scale(u, Math.cos(ang) * r), scale(v, Math.sin(ang) * r)));
  };
};

const ball = (c: V, r: number) => (): V => {
  const y = rand(-1, 1);
  const t = rand(0, TAU);
  const s = Math.sqrt(1 - y * y);
  return add(c, [Math.cos(t) * s * r, y * r, Math.sin(t) * s * r]);
};

/** Point on the surface of an axis-aligned box. */
const box = (c: V, size: V) => {
  const [w, h, d] = size;
  const areas = [h * d, w * d, w * h];
  const total = areas[0] + areas[1] + areas[2];
  return (): V => {
    const r = Math.random() * total;
    const axis = r < areas[0] ? 0 : r < areas[0] + areas[1] ? 1 : 2;
    const p: V = [rand(-w / 2, w / 2), rand(-h / 2, h / 2), rand(-d / 2, d / 2)];
    p[axis] = (Math.random() < 0.5 ? -1 : 1) * size[axis] / 2;
    return add(c, p);
  };
};

/** Point along a polyline, segments weighted by length. */
const polyline = (pts: V[], thick = 0.03): (() => V) => {
  const segs = pts.slice(1).map((p, i) => ({ a: pts[i], b: p, l: len(sub(p, pts[i])) }));
  const total = segs.reduce((s, x) => s + x.l, 0);
  return () => {
    let r = Math.random() * total;
    const s = segs.find((x) => (r -= x.l) <= 0) ?? segs[segs.length - 1];
    return seg(s.a, s.b, thick)();
  };
};

const BANDS = 48;

/**
 * Samples the shape, then orders the points bottom-to-top in horizontal bands and by angle
 * within each band. Every shape uses the same ordering, so particle i lands at roughly the same
 * height and bearing in every shape: morphs travel short paths instead of criss-crossing.
 */
const fill = (out: Float32Array, n: number, parts: Part[]) => {
  const total = parts.reduce((s, [w]) => s + w, 0);
  const pts: V[] = [];
  for (let i = 0; i < n; i++) {
    let r = Math.random() * total;
    const part = parts.find(([w]) => (r -= w) <= 0) ?? parts[parts.length - 1];
    pts.push(part[1]());
  }
  pts.sort((a, b) => a[1] - b[1]);
  const per = Math.ceil(n / BANDS);
  for (let b = 0; b < BANDS; b++) {
    const band = pts.slice(b * per, (b + 1) * per).sort((p, q) => Math.atan2(p[2], p[0]) - Math.atan2(q[2], q[0]));
    band.forEach((p, k) => out.set(p, (b * per + k) * 3));
  }
};

/* ── Shapes (all fit roughly in a radius of 2.5) ── */

/** AI: a small feed-forward network, layers of nodes joined by dotted connections. */
const network = (): Part[] => {
  const layers = [2, 3, 3, 2].map((side, li) => {
    const x = -2.4 + li * 1.6;
    const nodes: V[] = [];
    for (let a = 0; a < side; a++)
      for (let b = 0; b < side; b++) nodes.push([x, (a - (side - 1) / 2) * 1.15, (b - (side - 1) / 2) * 1.15]);
    return nodes;
  });
  const nodes = layers.flat();
  const edges: [V, V][] = [];
  for (let i = 0; i < layers.length - 1; i++) layers[i].forEach((a) => layers[i + 1].forEach((b) => edges.push([a, b])));
  return [
    ...nodes.map((c): Part => [0.38 / nodes.length, ball(c, 0.14)]),
    ...edges.map(([a, b]): Part => [0.62 / edges.length, seg(a, b, 0.012)]),
  ];
};

/** Software: the </> symbol. */
const code = (): Part[] => [
  [0.36, polyline([[-1.3, 1.2, 0], [-2.5, 0, 0], [-1.3, -1.2, 0]], 0.09)],
  [0.28, polyline([[0.55, 1.6, 0], [-0.55, -1.6, 0]], 0.09)],
  [0.36, polyline([[1.3, 1.2, 0], [2.5, 0, 0], [1.3, -1.2, 0]], 0.09)],
];

/** Hardware: a chip with pins on four sides and a die outline. */
const chip = (): Part[] => {
  const pins: Part[] = [];
  for (let i = 0; i < 6; i++) {
    const o = -1.0 + i * 0.4;
    pins.push(
      [1, seg([1.2, o, 0], [1.8, o, 0], 0.05)],
      [1, seg([-1.2, o, 0], [-1.8, o, 0], 0.05)],
      [1, seg([o, 1.2, 0], [o, 1.8, 0], 0.05)],
      [1, seg([o, -1.2, 0], [o, -1.8, 0], 0.05)],
    );
  }
  const d = 0.55;
  return [
    [0.5, box([0, 0, 0], [2.4, 2.4, 0.3])],
    ...pins.map(([, f]): Part => [0.35 / pins.length, f]),
    [0.15, polyline([[-d, -d, 0.17], [d, -d, 0.17], [d, d, 0.17], [-d, d, 0.17], [-d, -d, 0.17]], 0.03)],
  ];
};

/** Journey: wireframe globe with an arc from N'Djamena to Kigali. */
const globe = (): Part[] => {
  const R = 2.1;
  const ll = (lat: number, lon: number, r = R): V => {
    const la = (lat * Math.PI) / 180;
    const lo = (lon * Math.PI) / 180;
    return [r * Math.cos(la) * Math.cos(lo), r * Math.sin(la), r * Math.cos(la) * Math.sin(lo)];
  };
  const parts: Part[] = [];
  [-60, -30, 0, 30, 60].forEach((lat) =>
    parts.push([Math.cos((lat * Math.PI) / 180), () => jitter(ll(lat, rand(0, 360)), 0.01)]),
  );
  for (let lon = 0; lon < 180; lon += 20) parts.push([0.9, () => jitter(ll(rand(0, 360), lon), 0.01)]);
  const a = norm(ll(12.1, 15.0)); // N'Djamena
  const b = norm(ll(-1.9, 30.1)); // Kigali
  const route = (): V => {
    const t = Math.random();
    const p = norm(add(scale(a, 1 - t), scale(b, t)));
    return jitter(scale(p, R * (1 + 0.6 * Math.sin(Math.PI * t))), 0.02);
  };
  parts.push([1.6, route], [0.5, ball(scale(a, R), 0.1)], [0.5, ball(scale(b, R), 0.1)]);
  return parts;
};

/** Robotics: an articulated arm on a base, with a two-finger gripper. */
const arm = (): Part[] => {
  const base: V = [0, -2.1, 0];
  const j1: V = [0, -1.6, 0];
  const j2: V = [1.0, 0.3, 0];
  const j3: V = [-0.5, 1.4, 0];
  const f1: V = [-1.35, 1.7, 0.25];
  const f2: V = [-1.2, 0.95, -0.2];
  return [
    [0.12, () => { const t = rand(0, TAU); const r = Math.sqrt(Math.random()) * 1.0; return [Math.cos(t) * r, -2.15, Math.sin(t) * r]; }],
    [0.08, tube(base, j1, 0.4)],
    [0.08, ball(j1, 0.32)],
    [0.24, tube(j1, j2, 0.22)],
    [0.08, ball(j2, 0.28)],
    [0.2, tube(j2, j3, 0.18)],
    [0.06, ball(j3, 0.22)],
    [0.07, tube(j3, f1, 0.06)],
    [0.07, tube(j3, f2, 0.06)],
  ];
};

/** Engineering: a 12-tooth gear with a hub hole. */
const gear = (): Part[] => {
  const teeth = 12;
  const rIn = 1.75;
  const rOut = 2.2;
  const half = 0.22;
  const radius = (t: number) => (((t / TAU) * teeth) % 1 < 0.5 ? rOut : rIn);
  return [
    [0.4, () => { const t = rand(0, TAU); const r = radius(t); return [Math.cos(t) * r, Math.sin(t) * r, rand(-half, half)]; }],
    [0.15, () => { const k = Math.floor(rand(0, teeth * 2)); const t = (k / (teeth * 2)) * TAU; const r = rand(rIn, rOut); return [Math.cos(t) * r, Math.sin(t) * r, rand(-half, half)]; }],
    [0.3, () => { const t = rand(0, TAU); const r = rand(0.75, radius(t)); return [Math.cos(t) * r, Math.sin(t) * r, Math.random() < 0.5 ? -half : half]; }],
    [0.15, () => { const t = rand(0, TAU); return [Math.cos(t) * 0.7, Math.sin(t) * 0.7, rand(-half, half)]; }],
  ];
};

/** Security: a shield with a checkmark. */
const shield = (): Part[] => {
  const outline = (s: number): V[] => {
    const right: V[] = [];
    for (let i = 0; i <= 30; i++) {
      const y = 1.7 - (i / 30) * 3.9;
      const w = y >= 0.3 ? 1.75 : 1.75 * Math.cos(((0.3 - y) / 2.4) * (Math.PI / 2));
      right.push([w * s, y * s, 0]);
    }
    const top: V[] = [];
    for (let i = 0; i <= 20; i++) {
      const x = -1.75 + (i / 20) * 3.5;
      top.push([x * s, (1.7 - 0.25 * (1 - (x / 1.75) ** 2)) * s, 0]);
    }
    const left = right.map(([x, y, z]): V => [-x, y, z]).reverse();
    return [...top, ...right, ...left];
  };
  return [
    [0.42, polyline(outline(1), 0.05)],
    [0.23, polyline(outline(0.82), 0.03)],
    [0.35, polyline([[-0.75, 0.05, 0.1], [-0.15, -0.6, 0.1], [0.9, 0.75, 0.1]], 0.1)],
  ];
};

/** Security: a padlock with shackle and keyhole. */
const padlock = (): Part[] => {
  const shackleY = 0.85;
  return [
    [0.5, box([0, -0.75, 0], [2.6, 2.0, 0.6])],
    [0.25, () => {
      const t = rand(0, Math.PI);
      const a = rand(0, TAU);
      // circle of radius 0.15 around the arc, in the plane spanned by the radial and z axes
      const r = 0.85 + Math.cos(a) * 0.15;
      return [Math.cos(t) * r, shackleY + Math.sin(t) * r, Math.sin(a) * 0.15];
    }],
    [0.05, tube([0.85, shackleY, 0], [0.85, 0.25, 0], 0.15)],
    [0.05, tube([-0.85, shackleY, 0], [-0.85, 0.25, 0], 0.15)],
    [0.08, () => { const t = rand(0, TAU); return [Math.cos(t) * 0.22, -0.5 + Math.sin(t) * 0.22, 0.32]; }],
    [0.07, seg([0, -0.65, 0.32], [0, -1.2, 0.32], 0.05)],
  ];
};

const shapeParts: Record<ShapeName, () => Part[]> = { network, code, chip, globe, arm, gear, shield, padlock };

/** Shapes span roughly this many units across; used to size them in pixels. */
const SHAPE_SPAN = 4.8;
const CAMERA_Z = 8;
const FOV = 50;
/** Seconds a click-triggered morph takes to sweep through the cloud. */
const MORPH_SECONDS = 1.8;

export type ParticleScene = {
  /**
   * The stage element (`data-stage="<shape>"`). The cloud is centred on it, scrolls with it,
   * fades out as it leaves the screen, and morphs whenever its `data-stage` changes.
   */
  setStage: (el: HTMLElement | null) => void;
  refreshColor: () => void;
  dispose: () => void;
};

const TEXTY = "a, button, input, textarea, select, label, kbd, img, p, h1, span";

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export const createParticleScene = (canvas: HTMLCanvasElement, opts: { reduceMotion: boolean }): ParticleScene => {
  const small = window.innerWidth < 768;
  const count = small ? 2600 : 6000;
  const still = opts.reduceMotion;

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.z = CAMERA_Z;

  // One cached position buffer per shape
  const shapes = {} as Record<ShapeName, Float32Array>;
  shapeNames.forEach((k) => {
    shapes[k] = new Float32Array(count * 3);
    fill(shapes[k], count, shapeParts[k]());
  });

  const positions = new Float32Array(shapes.network);
  const velocity = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const heat = new Float32Array(count);
  // spring k ≈ 0.028 with velocity damping 0.70 is close to critical damping: particles glide in without overshoot
  const spring = new Float32Array(count).map(() => rand(0.024, 0.032));
  const phase = new Float32Array(count).map(() => rand(0, TAU));

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));

  const material = new PointsMaterial({
    size: small ? 0.05 : 0.04,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
  });
  const points = new Points(geometry, material);
  scene.add(points);

  /* ── Colour: one resolved colour per shape, re-read when the theme changes ── */
  const shapeColor = {} as Record<ShapeName, Color>;
  const hotColor = new Color();
  const baseColor = new Color();
  let dark = true;
  const refreshColor = () => {
    const css = getComputedStyle(document.documentElement);
    shapeNames.forEach((k) => {
      shapeColor[k] = new Color(css.getPropertyValue(motion[k].colorVar).trim() || "#58a6ff");
    });
    dark = document.documentElement.classList.contains("dark");
    hotColor.set(dark ? "#ffffff" : css.getPropertyValue("--color-accent").trim() || "#d9480f");
    material.blending = dark ? AdditiveBlending : NormalBlending;
    material.needsUpdate = true;
  };
  refreshColor();

  /* ── Layout ── */
  let stage: HTMLElement | null = null;
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  const resize = () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
    renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);
  const unitsPerPx = () => (2 * CAMERA_Z * Math.tan(((FOV / 2) * Math.PI) / 180)) / vh;

  /* ── Pointer, drag and clicks (only inside the stage's [data-stage-drag] area) ── */
  const pointer = { x: -1e4, y: -1e4, dx: 0, dy: 0, inside: false };
  const drag = { active: false, moved: 0, lastX: 0, lastY: 0 };
  // extra rotation from dragging / stirring; it relaxes back to zero so symbols end up readable again
  const nudge = { x: 0, y: 0, vx: 0, vy: 0 };
  let shock: { x: number; y: number } | null = null;

  const onPointerMove = (e: PointerEvent) => {
    if (pointer.x > -1e3) {
      pointer.dx += e.clientX - pointer.x;
      pointer.dy += e.clientY - pointer.y;
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.inside = e.pointerType === "mouse";
    if (drag.active) {
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      nudge.vy += dx * 0.0025;
      nudge.vx += dy * 0.0018;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
    }
  };
  const onPointerDown = (e: PointerEvent) => {
    const el = e.target instanceof Element ? e.target : null;
    if (!el?.closest("[data-stage-drag]") || el.closest(TEXTY)) return;
    drag.active = true;
    drag.moved = 0;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
  };
  const onPointerUp = () => {
    drag.active = false;
  };
  const onLeave = () => {
    pointer.inside = false;
  };
  const onClick = (e: MouseEvent) => {
    const el = e.target instanceof Element ? e.target : null;
    if (!el?.closest("[data-stage-drag]") || el.closest(TEXTY) || drag.moved > 6) return;
    shock = { x: e.clientX, y: e.clientY };
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerUp, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("click", onClick);

  /* ── Helpers for the frame loop ── */
  const raycaster = new Raycaster();
  const ndc = new Vector2();
  const inv = new Matrix4();
  const rayO = new Vector3();
  const rayD = new Vector3();
  const tmp = new Vector3();
  const qA = new Quaternion();
  const qB = new Quaternion();
  const qNudge = new Quaternion();
  const euler = new Euler();

  /** Ray through a screen point, expressed in the cloud's local space. */
  const localRay = (sx: number, sy: number) => {
    ndc.set((sx / vw) * 2 - 1, -(sy / vh) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    inv.copy(points.matrixWorld).invert();
    rayO.copy(raycaster.ray.origin).applyMatrix4(inv);
    tmp.copy(raycaster.ray.origin).add(raycaster.ray.direction).applyMatrix4(inv);
    rayD.copy(tmp).sub(rayO).normalize();
  };

  /** Resting orientation of a shape at time t: slow spin for 3D shapes, gentle sway for flat symbols. */
  const orient = (shape: ShapeName, t: number, q: Quaternion) => {
    const m = motion[shape];
    const time = still ? 0 : t;
    const bob = Math.sin(time * 0.8) * 0.05;
    if (m.mode === "spin") euler.set(m.tiltX + bob, 0.6 + time * 0.08, 0);
    else if (m.mode === "turn") euler.set(m.tiltX + bob, Math.sin(time * 0.35) * 0.25, time * 0.1);
    else euler.set(m.tiltX + bob, Math.sin(time * 0.35) * 0.35, 0);
    q.setFromEuler(euler);
  };

  /* Morph state: from → to, progress 0..1 */
  let from: ShapeName = "network";
  let to: ShapeName = "network";
  let progress = 1;
  let last = performance.now();
  let hidden = false;
  let raf = 0;

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const t = now / 1000;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    const r = stage?.getBoundingClientRect();
    // fade out as the stage scrolls away; once invisible, skip all work
    const visibleFraction = r ? smoothstep(0.15, 0.75, (r.bottom - vh * 0.1) / r.height) : 0;
    const opacity = (dark ? 0.6 : 0.5) * visibleFraction;
    if (!r || opacity < 0.01) {
      // hide the canvas rather than clearing it, so nothing can cover the page below the hero
      if (!hidden) {
        canvas.style.visibility = "hidden";
        hidden = true;
      }
      return;
    }
    if (hidden) {
      canvas.style.visibility = "";
      hidden = false;
    }

    const next = (stage?.dataset.stage as ShapeName) || to;
    if (next !== to) {
      from = progress < 0.5 ? from : to;
      to = next;
      progress = still ? 1 : 0;
    }
    progress = Math.min(1, progress + dt / MORPH_SECONDS);

    /* Placement: centred on the stage, sized to it */
    const upp = unitsPerPx();
    const sizePx = Math.min(r.width, r.height) * 0.9;
    points.position.set((r.left + r.width / 2 - vw / 2) * upp, -(r.top + r.height / 2 - vh / 2) * upp, 0);
    points.scale.setScalar((sizePx * upp) / SHAPE_SPAN);
    const localScale = points.scale.x;

    /* Orientation: blended across the morph, plus drag/stir nudges */
    orient(from, t, qA);
    orient(to, t, qB);
    qA.slerp(qB, smoothstep(0, 1, progress));
    if (!still) {
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (pointer.inside && !drag.active && Math.hypot(pointer.x - cx, pointer.y - cy) < sizePx / 2) {
        nudge.vy += pointer.dx * 0.0004;
        nudge.vx += pointer.dy * 0.0003;
      }
      nudge.x += nudge.vx;
      nudge.y += nudge.vy;
      nudge.vx *= 0.92;
      nudge.vy *= 0.92;
      if (!drag.active) {
        nudge.x *= 0.985;
        nudge.y *= 0.985;
      }
    }
    pointer.dx = pointer.dy = 0;
    euler.set(nudge.x, nudge.y, 0);
    qNudge.setFromEuler(euler);
    points.quaternion.copy(qNudge).multiply(qA);
    points.updateMatrixWorld();

    material.opacity = opacity;
    baseColor.copy(shapeColor[from]).lerp(shapeColor[to], smoothstep(0, 1, progress));

    /* Interaction rays, in local units */
    const hover = pointer.inside && !still;
    const hoverR = 0.75 / localScale;
    if (hover) localRay(pointer.x, pointer.y);
    const hx = rayO.x, hy = rayO.y, hz = rayO.z, hdx = rayD.x, hdy = rayD.y, hdz = rayD.z;

    let sxO = 0, syO = 0, szO = 0, sdx = 0, sdy = 0, sdz = 0, shockR = 0, shockP = 0;
    if (shock && !still) {
      localRay(shock.x, shock.y);
      sxO = rayO.x; syO = rayO.y; szO = rayO.z; sdx = rayD.x; sdy = rayD.y; sdz = rayD.z;
      shockR = 2.6 / localScale;
      shockP = 0.5 / localScale;
    }
    shock = null;

    const A = shapes[from];
    const B = shapes[to];
    // the morph sweeps through the cloud from top to bottom (points are ordered bottom-to-top)
    const SWEEP = 0.6;
    const spread = progress * (1 + SWEEP);
    for (let n = 0; n < count; n++) {
      const j = n * 3;
      const local = Math.min(1, Math.max(0, spread - SWEEP * (1 - n / count)));
      const e = local * local * (3 - 2 * local);
      const tx = A[j] + (B[j] - A[j]) * e;
      const ty = A[j + 1] + (B[j + 1] - A[j + 1]) * e;
      const tz = A[j + 2] + (B[j + 2] - A[j + 2]) * e;

      if (still) {
        positions[j] = tx;
        positions[j + 1] = ty;
        positions[j + 2] = tz;
      } else {
        let px = positions[j], py = positions[j + 1], pz = positions[j + 2];
        const k = spring[n];
        const br = Math.sin(t * 1.3 + phase[n]) * 0.012;
        velocity[j] += (tx - px) * k;
        velocity[j + 1] += (ty + br - py) * k;
        velocity[j + 2] += (tz - pz) * k;

        if (hover) {
          // distance from the particle to the pointer ray
          const vx = px - hx, vy = py - hy, vz = pz - hz;
          const along = vx * hdx + vy * hdy + vz * hdz;
          const cx = vx - hdx * along, cy = vy - hdy * along, cz = vz - hdz * along;
          const d = Math.sqrt(cx * cx + cy * cy + cz * cz);
          if (d < hoverR && d > 1e-4) {
            const push = (1 - d / hoverR) * 0.07;
            velocity[j] += (cx / d) * push;
            velocity[j + 1] += (cy / d) * push;
            velocity[j + 2] += (cz / d) * push;
            heat[n] = Math.max(heat[n], 1 - d / hoverR);
          }
        }
        if (shockP) {
          const vx = px - sxO, vy = py - syO, vz = pz - szO;
          const along = vx * sdx + vy * sdy + vz * sdz;
          const cx = vx - sdx * along, cy = vy - sdy * along, cz = vz - sdz * along;
          const d = Math.sqrt(cx * cx + cy * cy + cz * cz) + 1e-4;
          if (d < shockR) {
            const push = (1 - d / shockR) * shockP * rand(0.6, 1.2);
            velocity[j] += (cx / d) * push;
            velocity[j + 1] += (cy / d) * push;
            velocity[j + 2] += (cz / d) * push + rand(-0.05, 0.05);
            heat[n] = 1;
          }
        }
        velocity[j] *= 0.7;
        velocity[j + 1] *= 0.7;
        velocity[j + 2] *= 0.7;
        px += velocity[j];
        py += velocity[j + 1];
        pz += velocity[j + 2];
        positions[j] = px;
        positions[j + 1] = py;
        positions[j + 2] = pz;
      }

      const h = heat[n];
      heat[n] = h * 0.95;
      colors[j] = baseColor.r + (hotColor.r - baseColor.r) * h;
      colors[j + 1] = baseColor.g + (hotColor.g - baseColor.g) * h;
      colors[j + 2] = baseColor.b + (hotColor.b - baseColor.b) * h;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(tick);

  return {
    setStage: (el) => {
      stage = el;
      const shape = (el?.dataset.stage as ShapeName) || "network";
      from = to = shape;
      positions.set(shapes[shape]);
    },
    refreshColor,
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
};
