export interface BuildUi { stage: number; level: number; pct: number; done: boolean }
export interface BuildOptions {
  hero: HTMLElement;
  canvas: HTMLCanvasElement;
  /** CSS font-family string for canvas labels (canvas cannot read CSS variables). */
  monoFont?: string;
  onUi: (ui: BuildUi) => void;
}

type Vec = number[];
type Panel = { i: number; pts: Vec[]; n: Vec; kind: 'glass' | 'white' | 'dark'; lit: number; win?: Vec[] | null };
type Palm = { x: number; z: number; h: number; lean: number; fr: number[] };

export function startBuildHero({ hero, canvas, monoFont = 'ui-monospace, monospace', onUi }: BuildOptions): () => void {
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  const ctx: CanvasRenderingContext2D = context;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  hero.classList.add('is-live');

  /* ---------- small maths ---------- */
  const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const out = (t: number) => 1 - Math.pow(1 - t, 3);
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;
  const hex = (h: string): Vec => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mixc = (a: Vec, b: Vec, t: number): Vec => a.map((v, i) => v + (b[i] - v) * t);
  const shade = (c: Vec, k: number): Vec => c.map(v => v * k);
  const rgba = (c: Vec, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const lerp3 = (a: Vec, b: Vec, t: number): Vec => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
  let seed = 7;
  const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  /* ---------- palette ---------- */
  const C = {
    skyTop: hex('#161A15'), skyLow: hex('#2C3429'),
    duskTop: hex('#0A1720'), duskMid: hex('#20404A'), duskGlow: hex('#E9A46E'),
    line: hex('#E4ECDE'), lineDusk: hex('#1A211C'),
    lime: hex('#CDDC39'), green: hex('#5AB947'), greenDusk: hex('#3F8F33'),
    white: hex('#E9ECE6'), whiteDusk: hex('#BDB7AE'),
    dark: hex('#394039'), darkDusk: hex('#1E2427'),
    glass: hex('#6E8B8C'), shop: hex('#F4B66B'),
    win: hex('#4B6670'), winDusk: hex('#18252D'), lit: hex('#FFC983'),
    sand: hex('#C9B48E'), sandDusk: hex('#8F7C62'), paving: hex('#D8CBB2'), pavingDusk: hex('#A2927A'),
    lagoon: hex('#1E7A7C'), lagoonDeep: hex('#0E3C46'), foam: hex('#F3EEE2'),
    solar: hex('#22344C'), palm: hex('#10241D'),
  };

  /* ---------- the building ---------- */
  const LV: number[] = [0, 3.6, 7.2]; for (let i = 0; i < 8; i++) LV.push(+(7.2 + 3.2 * (i + 1)).toFixed(2)); // 11 levels, roof 32.8
  const TOP = LV[10];
  const POD = { x: 17, z: 9, xs: [-17, -8.5, 0, 8.5, 17], zs: [-9, 0, 9] };
  const TWR = { x: 14, z: 6.5, xs: [-14, -7, 0, 7, 14], zs: [-6.5, 0, 6.5] };
  const fp = (i: number) => (i < 2 ? POD : TWR);
  const frameWin = (i: number): [number, number] => [0.2 + i * 0.034, 0.2 + i * 0.034 + 0.06];   // columns then slab
  const envWin = (i: number): [number, number] => [0.55 + i * 0.02, 0.55 + i * 0.02 + 0.06];     // panels fill
  const STAGES = [0, 0.08, 0.2, 0.56, 0.78, 1];

  // Facade panels: one quad per bay per floor, each with an optional window and a light-up time.
  const panels: Panel[] = [];
  const addFace = (i: number, axis: 'x' | 'z', sign: number, from: number, to: number, bays: number, kindOf: (b: number, bays: number) => Panel['kind']) => {
    const y0 = LV[i], y1 = LV[i + 1], f = fp(i), w = (to - from) / bays;
    for (let b = 0; b < bays; b++) {
      const a0 = from + b * w, a1 = a0 + w;
      const P = (a: number, y: number): Vec => (axis === 'z' ? [a, y, sign * f.z] : [sign * f.x, y, a]);
      const pts = axis === 'z' ? (sign > 0 ? [P(a0, y0), P(a1, y0), P(a1, y1), P(a0, y1)] : [P(a1, y0), P(a0, y0), P(a0, y1), P(a1, y1)])
                               : (sign > 0 ? [P(a1, y0), P(a0, y0), P(a0, y1), P(a1, y1)] : [P(a0, y0), P(a1, y0), P(a1, y1), P(a0, y1)]);
      const n = axis === 'z' ? [0, 0, sign] : [sign, 0, 0];
      const kind = kindOf(b, bays);
      const r = rnd();
      panels.push({ i, pts, n, kind, lit: r < 0.72 ? 0.84 + rnd() * 0.12 : 9 });
    }
  };
  for (let i = 0; i < 10; i++) {
    const f = fp(i);
    if (i < 2) {
      const k = (): Panel['kind'] => (i === 0 ? 'glass' : 'white');
      addFace(i, 'z', 1, -f.x, f.x, 4, k); addFace(i, 'z', -1, -f.x, f.x, 4, k);
      addFace(i, 'x', 1, -f.z, f.z, 3, k); addFace(i, 'x', -1, -f.z, f.z, 3, k);
    } else {
      const front = (b: number): Panel['kind'] => (b === 0 || b === 6 || b === 3 ? 'dark' : 'white');
      const side = (b: number): Panel['kind'] => (b === 1 ? 'white' : 'dark');
      addFace(i, 'z', 1, -f.x, f.x, 7, front); addFace(i, 'z', -1, -f.x, f.x, 7, front);
      addFace(i, 'x', 1, -f.z, f.z, 3, side); addFace(i, 'x', -1, -f.z, f.z, 3, side);
    }
  }
  const quadAt = (q: Vec[], u0: number, u1: number, v0: number, v1: number): Vec[] => { // sub-rectangle of a panel in (u, v) panel coordinates
    const [a, b, , d] = q, at = (u: number, v: number): Vec => [a[0] + (b[0] - a[0]) * u + (d[0] - a[0]) * v, a[1] + (b[1] - a[1]) * u + (d[1] - a[1]) * v, a[2] + (b[2] - a[2]) * u + (d[2] - a[2]) * v];
    return [at(u0, v0), at(u1, v0), at(u1, v1), at(u0, v1)];
  };
  for (const p of panels) {
    p.win = p.kind === 'white' ? quadAt(p.pts, 0.16, 0.84, 0.3, 0.8) : p.kind === 'dark' ? quadAt(p.pts, 0.36, 0.64, 0.14, 0.86) : null;
  }

  // Island coastline and palms (fixed, seeded).
  const coast: Vec[] = [];
  for (let k = 0; k < 48; k++) {
    const a = (k / 48) * Math.PI * 2, wob = 1 + 0.06 * Math.sin(a * 3 + 1) + 0.04 * Math.sin(a * 7) + (rnd() - 0.5) * 0.03;
    coast.push([Math.cos(a) * 52 * wob, 0, Math.sin(a) * 34 * wob]);
  }
  const palms = [[-26, 17, 8.5, 0.3], [-20.5, 21, 7, -0.2], [23, 16, 9, 0.25], [28.5, 20, 7.5, -0.3], [-33, 5, 8, 0.4], [34, 3, 8.8, -0.35], [-9, 23, 6.5, 0.1]]
    .map(([x, z, h, lean]): Palm => ({ x, z, h, lean, fr: Array.from({ length: 8 }, (_, k) => (k / 8) * Math.PI * 2 + rnd() * 0.5) }));
  const piles: number[][] = [];
  for (const x of POD.xs) for (const z of POD.zs) piles.push([x, z]);
  for (const x of [-12.75, -4.25, 4.25, 12.75]) for (const z of [-4.5, 4.5]) piles.push([x, z]);

  /* ---------- camera and projection ---------- */
  let W = 0, H = 0, dpr = 1, narrow = false;
  const cam: { C: Vec; r: Vec; u: Vec; f: Vec; F: number; cx: number; cy: number } = { C: [0, 0, 0], r: [1, 0, 0], u: [0, 1, 0], f: [0, 0, -1], F: 1, cx: 0, cy: 0 };
  const NEAR = 1;
  const setCamera = (p: number, t: number, mx: number) => {
    const k = ease(p);
    const yaw = mix(0.98, 0.5, k) + mx * 0.06 + (reduce.matches ? 0 : Math.sin(t * 0.00025) * 0.018);
    const pitch = mix(0.5, 0.17, k);
    const dist = mix(78, 104, k);
    const T = [0, mix(2, 15.5, k), 0];
    const cp = Math.cos(pitch);
    cam.C = [T[0] + dist * Math.sin(yaw) * cp, T[1] + dist * Math.sin(pitch), T[2] + dist * Math.cos(yaw) * cp];
    const f = [T[0] - cam.C[0], T[1] - cam.C[1], T[2] - cam.C[2]], fl = Math.hypot(...f);
    cam.f = f.map(v => v / fl);
    const r = [-cam.f[2], 0, cam.f[0]], rl = Math.hypot(...r);       // cross(f, up)
    cam.r = r.map(v => v / rl);
    cam.u = [cam.r[1] * cam.f[2] - cam.r[2] * cam.f[1], cam.r[2] * cam.f[0] - cam.r[0] * cam.f[2], cam.r[0] * cam.f[1] - cam.r[1] * cam.f[0]];
    cam.F = narrow ? W * 1.5 : Math.min(H * 1.22, W * 0.82);
    cam.cx = narrow ? W * 0.5 : W * 0.655;
    cam.cy = narrow ? H * (0.6 - 0.17 * ease(ramp(p, 0.84, 1))) : H * 0.57;
  };
  const toCam = (P: Vec): Vec => {
    const v0 = P[0] - cam.C[0], v1 = P[1] - cam.C[1], v2 = P[2] - cam.C[2];
    return [v0 * cam.r[0] + v1 * cam.r[1] + v2 * cam.r[2], v0 * cam.u[0] + v1 * cam.u[1] + v2 * cam.u[2], v0 * cam.f[0] + v1 * cam.f[1] + v2 * cam.f[2]];
  };
  const scr = (q: Vec): Vec => [cam.cx + (q[0] * cam.F) / q[2], cam.cy - (q[1] * cam.F) / q[2]];
  const proj = (P: Vec): Vec | null => { const q = toCam(P); return q[2] > NEAR ? scr(q) : null; };
  const sees = (n: Vec, P: Vec) => n[0] * (cam.C[0] - P[0]) + n[1] * (cam.C[1] - P[1]) + n[2] * (cam.C[2] - P[2]) > 0;

  // Paths are batched: open a path, add segments/polygons, then stroke or fill once.
  const seg = (a: Vec, b: Vec, frac = 1) => {
    if (frac <= 0) return;
    let A = toCam(a), B = toCam(frac < 1 ? lerp3(a, b, frac) : b);
    if (A[2] <= NEAR && B[2] <= NEAR) return;
    if (A[2] <= NEAR || B[2] <= NEAR) { // clip to the near plane
      const t = (NEAR - A[2]) / (B[2] - A[2]), X = [mix(A[0], B[0], t), mix(A[1], B[1], t), NEAR + 1e-3];
      if (A[2] <= NEAR) A = X; else B = X;
    }
    const s = scr(A), e = scr(B);
    ctx.moveTo(s[0], s[1]); ctx.lineTo(e[0], e[1]);
  };
  const poly = (pts: Vec[]): boolean => {
    let q = pts.map(toCam);
    if (q.some(v => v[2] <= NEAR)) { // Sutherland–Hodgman against z = NEAR
      const o = [];
      for (let k = 0; k < q.length; k++) {
        const a = q[k], b = q[(k + 1) % q.length], ain = a[2] > NEAR, bin = b[2] > NEAR;
        if (ain) o.push(a);
        if (ain !== bin) { const t = (NEAR - a[2]) / (b[2] - a[2]); o.push([mix(a[0], b[0], t), mix(a[1], b[1], t), NEAR + 1e-3]); }
      }
      q = o;
    }
    if (q.length < 3) return false;
    q.forEach((v, k) => { const s = scr(v); k ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]); });
    ctx.closePath();
    return true;
  };
  const rect = (x0: number, x1: number, y: number, z0: number, z1: number): Vec[] => [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]];
  const outline = (pts: Vec[], frac = 1) => { // draws a closed outline progressively by perimeter
    const n = pts.length, tot = frac * n;
    for (let k = 0; k < n; k++) seg(pts[k], pts[(k + 1) % n], clamp(tot - k));
  };
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, col: Vec, alpha: number, shadeK = 1) => { // filled convex box, visible faces only
    const faces: [Vec, Vec[], number][] = [
      [[0, 1, 0], [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], 1],
      [[0, 0, 1], [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], 0.86],
      [[0, 0, -1], [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], 0.6],
      [[1, 0, 0], [[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]], 0.7],
      [[-1, 0, 0], [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], 0.6],
    ];
    for (const [n, pts, k] of faces) {
      if (!sees(n, pts[0])) continue;
      ctx.beginPath(); if (poly(pts)) { ctx.fillStyle = rgba(shade(col, k * shadeK), alpha); ctx.fill(); }
    }
  };
  const label = (P: Vec, text: string, col: Vec, a: number) => {
    const s = proj(P); if (!s || a <= 0) return;
    ctx.fillStyle = rgba(col, a); ctx.fillText(text, s[0], s[1]);
  };

  /* ---------- one frame ---------- */
  let t0 = 0;
  function draw(p: number, t: number) {
    if (!t0) t0 = t;
    const intro = reduce.matches ? 1 : ramp(t - t0, 150, 1900);
    setCamera(p, t, mouse.x);
    const dusk = ease(ramp(p, 0.76, 0.93));                 // the colourise moment
    const lineCol = mixc(C.line, C.lineDusk, dusk);

    // Sky, horizon, lagoon.
    const fwd = [cam.f[0], 0, cam.f[2]], fl = Math.hypot(fwd[0], fwd[2]);
    const hz = proj([cam.C[0] + (fwd[0] / fl) * 4000, 0, cam.C[2] + (fwd[2] / fl) * 4000]);
    const hy = hz ? clamp(hz[1], -H, H * 2) : H * 0.5;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, rgba(mixc(C.skyTop, C.duskTop, dusk)));
    g.addColorStop(clamp(hy / H * 0.62, 0.05, 0.9), rgba(mixc(C.skyLow, C.duskMid, dusk)));
    g.addColorStop(clamp(hy / H, 0.06, 0.98), rgba(mixc(C.skyLow, C.duskGlow, dusk)));
    g.addColorStop(1, rgba(mixc(C.skyLow, C.duskGlow, dusk)));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (dusk > 0) {
      const sun = ctx.createRadialGradient(W * 0.2, hy, 0, W * 0.2, hy, W * 0.55);
      sun.addColorStop(0, `rgba(255,190,130,${0.55 * dusk})`); sun.addColorStop(1, 'rgba(255,190,130,0)');
      ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);
      const lg = ctx.createLinearGradient(0, hy, 0, H);
      lg.addColorStop(0, rgba(mixc(C.lagoon, C.duskGlow, 0.35), dusk));
      lg.addColorStop(0.35, rgba(C.lagoon, dusk));
      lg.addColorStop(1, rgba(C.lagoonDeep, dusk));
      ctx.fillStyle = lg; ctx.fillRect(0, hy, W, H - hy);
      ctx.strokeStyle = `rgba(255,226,190,${0.35 * dusk})`; ctx.lineWidth = 1; ctx.beginPath();
      for (let k = 0; k < 26; k++) { // shimmer on the water
        const y = hy + 4 + ((k * 37) % 120) * (1 + k / 40), x = ((k * 211 + t * 0.012 * (1 + (k % 3))) % (W + 200)) - 100, w = 14 + (k % 5) * 9;
        if (y < H) { ctx.moveTo(x, y); ctx.lineTo(x + w, y); }
      }
      ctx.stroke();
      // Island, then the plaza.
      ctx.beginPath(); if (poly(coast)) { ctx.fillStyle = rgba(mixc(C.sand, C.sandDusk, 0.6), dusk); ctx.fill(); ctx.strokeStyle = rgba(C.foam, 0.65 * dusk); ctx.lineWidth = 1.6; ctx.stroke(); }
      ctx.beginPath(); if (poly(rect(-24, 24, 0.02, -15, 15))) { ctx.fillStyle = rgba(mixc(C.paving, C.pavingDusk, 0.55), dusk); ctx.fill(); }
    }

    // Drafting grid (fades as the scene comes alive).
    const gridA = Math.max(intro, ramp(p, 0, 0.05)) * (1 - dusk) * 0.16;
    if (gridA > 0.005) {
      ctx.strokeStyle = rgba(C.line, gridA); ctx.lineWidth = 1; ctx.beginPath();
      for (let x = -44; x <= 44; x += 4) seg([x, 0, -30], [x, 0, 30]);
      for (let z = -30; z <= 30; z += 4) seg([-44, 0, z], [44, 0, z]);
      ctx.stroke();
    }

    // 01 Survey: plot boundary, footprint, dimension lines.
    const survey = Math.max(ease(intro), ramp(p, 0, 0.07)), surveyA = 1 - ramp(p, 0.3, 0.45);
    if (survey > 0 && surveyA > 0) {
      ctx.lineWidth = 1.2; ctx.strokeStyle = rgba(C.line, 0.75 * surveyA); ctx.setLineDash([6, 5]);
      ctx.beginPath(); outline(rect(-30, 30, 0, -20, 20), survey); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = rgba(C.lime, 0.9 * surveyA); ctx.beginPath(); outline(rect(-17, 17, 0, -9, 9), Math.max(ramp(intro, 0.35, 1), ramp(p, 0.02, 0.08))); ctx.stroke();
      const d = Math.max(ramp(intro, 0.5, 1), ramp(p, 0.03, 0.08));
      ctx.strokeStyle = rgba(C.line, 0.6 * surveyA); ctx.beginPath();
      seg([-30, 0, 24], [30, 0, 24], d); seg([-30, 0, 22.5], [-30, 0, 25.5], d); seg([30, 0, 22.5], [30, 0, 25.5], d);
      seg([34, 0, -20], [34, 0, 20], d); seg([32.5, 0, -20], [35.5, 0, -20], d); seg([32.5, 0, 20], [35.5, 0, 20], d);
      ctx.stroke();
      ctx.font = `500 12px ${monoFont}`; ctx.textAlign = 'center';
      label([0, 0, 26.5], '60.00 m', C.line, d * surveyA); label([37, 0, 0], '40.00 m', C.line, d * surveyA);
      label([0, 0, 11.5], 'BLOCK A · 10 LEVELS', C.lime, Math.max(ramp(intro, 0.7, 1), ramp(p, 0.05, 0.08)) * surveyA);
    }

    // 02 Piling and raft (below ground fades when the lagoon arrives).
    const below = 1 - dusk;
    if (below > 0) {
      ctx.strokeStyle = rgba(C.line, 0.7 * below); ctx.lineWidth = 1.1; ctx.beginPath();
      piles.forEach(([x, z], k) => {
        const f = ramp(p, 0.08 + k * 0.004, 0.13 + k * 0.004);
        seg([x, 0, z], [x, -9, z], f);
        if (f > 0) { seg([x - 0.8, 0, z], [x + 0.8, 0, z]); seg([x, 0, z - 0.8], [x, 0, z + 0.8]); }
      });
      const raft = ramp(p, 0.15, 0.21);
      outline(rect(-17.6, 17.6, 0, -9.6, 9.6), raft); outline(rect(-17.6, 17.6, -1.2, -9.6, 9.6), raft);
      if (raft > 0.98) for (const [x, z] of [[-17.6, -9.6], [17.6, -9.6], [17.6, 9.6], [-17.6, 9.6]]) seg([x, 0, z], [x, -1.2, z]);
      ctx.stroke();
    }

    // Current build height (for the crane and the survey laser).
    let h = 0;
    for (let i = 0; i < 10; i++) { const [a, b] = frameWin(i), f = ramp(p, a, a + (b - a) * 0.6); if (f > 0) h = Math.max(h, mix(LV[i], LV[i + 1], f)); }

    // Tower crane (behind the block, drawn before the fills so the building covers it).
    const craneA = ramp(p, 0.16, 0.22) * (1 - ramp(p, 0.8, 0.88));
    if (craneA > 0) {
      const sink = ramp(p, 0.8, 0.88) * 30, bx = -27, bz = -15, Hm = Math.max(22, h + 12) - sink;
      const lc = C.lime;
      ctx.strokeStyle = rgba(lc, craneA); ctx.lineWidth = 1.3; ctx.beginPath();
      const c4 = [[bx - 1, bz - 1], [bx + 1, bz - 1], [bx + 1, bz + 1], [bx - 1, bz + 1]];
      for (const [x, z] of c4) seg([x, -sink, z], [x, Hm, z]);
      for (let y = -sink; y < Hm - 2.5; y += 3) { // lattice bracing
        seg([bx - 1, y, bz + 1], [bx + 1, y + 3, bz + 1]); seg([bx + 1, y, bz - 1], [bx + 1, y + 3, bz + 1]);
        seg([bx - 1, y, bz + 1], [bx + 1, y, bz + 1]);
      }
      const a = 2.35 + p * 5.2 + (reduce.matches ? 0 : Math.sin(t * 0.0004) * 0.05), d = [Math.cos(a), 0, Math.sin(a)];
      const top = [bx, Hm, bz], apex = [bx, Hm + 6, bz], at = (s: number, y = Hm): Vec => [bx + d[0] * s, y, bz + d[2] * s];
      seg(at(-11), at(34)); seg(at(-11, Hm + 1.3), at(34, Hm + 1.3));
      for (let s = -11; s < 34; s += 2.5) seg(at(s), at(s + 2.5, Hm + 1.3));
      seg(apex, at(34, Hm + 1.3)); seg(apex, at(-11, Hm + 1.3)); seg(top, apex);
      ctx.stroke();
      box(bx - d[0] * 11 - 1.6, bx - d[0] * 11 + 1.6, Hm - 2.2, Hm, bz - d[2] * 11 - 1.6, bz - d[2] * 11 + 1.6, lc, craneA * 0.9, 0.8); // counterweight
      const s = 13 + 15 * (0.5 + 0.5 * Math.sin(p * 13)), hookY = Math.max(h + 3.5, 5) + (reduce.matches ? 0 : Math.sin(t * 0.0017) * 0.4);
      ctx.strokeStyle = rgba(lc, craneA * 0.85); ctx.lineWidth = 1; ctx.beginPath(); seg(at(s), at(s, hookY + 1.8)); ctx.stroke();
      const L = at(s, hookY);
      box(L[0] - 2, L[0] + 2, L[1], L[1] + 1.8, L[2] - 0.2, L[2] + 0.2, C.white, craneA * (1 - dusk), 0.9); // hanging facade panel
    }

    // 03 Frame: columns then slab edges, floor by floor; the core rises with it.
    const frameA = 0.9 * (1 - dusk * 0.85);
    ctx.strokeStyle = rgba(lineCol, frameA); ctx.lineWidth = 1.1; ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const [a, b] = frameWin(i), f = fp(i), cols = ramp(p, a, a + (b - a) * 0.6), slab = ramp(p, a + (b - a) * 0.4, b);
      if (cols > 0) for (const x of f.xs) for (const z of f.zs) seg([x, LV[i], z], [x, LV[i + 1], z], cols);
      if (slab > 0) {
        outline(rect(-f.x, f.x, LV[i + 1], -f.z, f.z), slab);
        if (i === 1 && slab > 0.5) outline(rect(-TWR.x, TWR.x, LV[2], -TWR.z, TWR.z), ramp(slab, 0.5, 1)); // podium transfer slab
      }
    }
    const coreH = Math.min(h + (h > 0 ? 2.8 : 0), TOP + 2.8);
    if (h > 0) for (const [x, z] of [[-3, -2.5], [3, -2.5], [3, 2.5], [-3, 2.5]]) seg([x, 0, z], [x, coreH, z]);
    ctx.stroke();

    // Survey laser at the working level.
    const laserA = ramp(p, 0.2, 0.24) * (1 - ramp(p, 0.54, 0.6));
    if (laserA > 0) {
      const f = h < LV[2] ? POD : TWR;
      ctx.save(); ctx.shadowColor = rgba(C.lime, 0.9); ctx.shadowBlur = 14;
      ctx.strokeStyle = rgba(C.lime, laserA); ctx.lineWidth = 1.6; ctx.beginPath(); outline(rect(-f.x - 0.8, f.x + 0.8, h, -f.z - 0.8, f.z + 0.8)); ctx.stroke();
      ctx.restore();
    }

    // 04 Envelope: panels fill floor by floor (podium, then the tower).
    const fillPanel = (pn: Panel, a: number) => {
      if (!sees(pn.n, pn.pts[0])) return;
      const k = pn.n[2] > 0 ? 0.94 : pn.n[0] > 0 ? 0.74 : 0.6;
      const day = pn.kind === 'white' ? C.white : pn.kind === 'dark' ? C.dark : C.glass;
      const night = pn.kind === 'white' ? C.whiteDusk : pn.kind === 'dark' ? C.darkDusk : C.shop;
      ctx.beginPath();
      if (poly(pn.pts)) { ctx.fillStyle = rgba(shade(mixc(day, night, dusk), pn.kind === 'glass' ? mix(k, 1, dusk) : k), a); ctx.fill(); }
      if (pn.win) {
        const lit = ramp(p, pn.lit, pn.lit + 0.02);
        ctx.beginPath();
        if (poly(pn.win)) { ctx.fillStyle = rgba(mixc(shade(mixc(C.win, C.winDusk, dusk), k + 0.1), C.lit, lit), a); ctx.fill(); }
      }
    };
    const env = (i: number) => ramp(p, ...envWin(i));
    const podA = Math.min(env(0), env(1));
    for (const pn of panels) if (pn.i < 2) { const a = env(pn.i); if (a > 0) fillPanel(pn, a); }
    if (podA > 0) { ctx.beginPath(); if (poly(rect(-POD.x, POD.x, LV[2], -POD.z, POD.z))) { ctx.fillStyle = rgba(mixc(C.paving, C.pavingDusk, dusk), podA); ctx.fill(); } }
    for (const pn of panels) if (pn.i >= 2) { const a = env(pn.i); if (a > 0) fillPanel(pn, a); }
    const roofA = env(9);
    if (roofA > 0) {
      ctx.beginPath(); if (poly(rect(-TWR.x, TWR.x, TOP, -TWR.z, TWR.z))) { ctx.fillStyle = rgba(mixc(hex('#CFCBC3'), hex('#8E8A84'), dusk), roofA); ctx.fill(); }
      box(-3, 3, TOP, TOP + 2.8, -2.5, 2.5, mixc(C.white, C.whiteDusk, dusk), roofA, 0.95);
    }
    // Panel joints, so the facade reads as panels rather than flat colour.
    ctx.strokeStyle = rgba(mixc(hex('#2A302A'), hex('#0F1412'), dusk), 0.35); ctx.lineWidth = 0.8; ctx.beginPath();
    for (const pn of panels) if (env(pn.i) > 0.6 && sees(pn.n, pn.pts[0])) outline(pn.pts);
    ctx.stroke();

    // Roof garden and solar (Build green), then the green entrance beam.
    const roofKit = out(ramp(p, 0.79, 0.88));
    if (roofKit > 0) {
      box(-12.5, -4.5, TOP, TOP + 0.6 * roofKit, -5, 5, mixc(C.green, C.greenDusk, dusk), 1, 1);
      for (const z0 of [-5, -1.4, 2.2]) box(1.5, 12.5, TOP + 0.2, TOP + 0.2 + 0.45 * roofKit, z0, z0 + 2.4, C.solar, 1, 1.15);
    }
    const beam = out(ramp(p, 0.6, 0.68));
    if (beam > 0) {
      const lift = (1 - beam) * 7;
      ctx.save();
      if (dusk > 0) { ctx.shadowColor = `rgba(205,220,57,${0.7 * dusk})`; ctx.shadowBlur = 24; }
      box(-12, 12, 3 + lift, 3.9 + lift, 9, 12.6, mixc(C.green, hex('#7BD066'), dusk * 0.5), beam, 1);
      ctx.restore();
    }

    // Window glow (additive) once the lights come on.
    if (dusk > 0.2) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (const pn of panels) {
        if (!pn.win || !sees(pn.n, pn.pts[0])) continue;
        const lit = ramp(p, pn.lit, pn.lit + 0.03) * dusk;
        if (lit <= 0) continue;
        ctx.beginPath(); if (poly(quadAt(pn.pts, 0.02, 0.98, 0.1, 0.98))) { ctx.fillStyle = `rgba(255,170,90,${0.16 * lit})`; ctx.fill(); }
      }
      ctx.restore();
    }

    // Palms grow in at handover (world-space fronds, so they turn with the camera).
    const grow = out(ramp(p, 0.8, 0.93));
    if (grow > 0) {
      for (const pm of palms) {
        const base = [pm.x, 0, pm.z], crown = [pm.x + pm.lean * pm.h * 0.5, pm.h * grow, pm.z + pm.lean * 1.5];
        const bs = proj(base), cs = proj(crown); if (!bs || !cs) continue;
        const z = toCam(crown)[2], px = cam.F / z;
        ctx.strokeStyle = rgba(C.palm, 0.95); ctx.lineCap = 'round';
        ctx.lineWidth = Math.max(1, 0.45 * px); ctx.beginPath(); ctx.moveTo(bs[0], bs[1]);
        const mid = proj([pm.x + pm.lean * pm.h * 0.15, pm.h * grow * 0.55, pm.z]);
        if (!mid) continue;
        ctx.quadraticCurveTo(mid[0], mid[1], cs[0], cs[1]); ctx.stroke();
        ctx.lineWidth = Math.max(1, 0.32 * px);
        for (const a of pm.fr) {
          const L = 3.6 * grow, dx = Math.cos(a), dz = Math.sin(a);
          const m = proj([crown[0] + dx * L * 0.55, crown[1] + 0.5 * grow, crown[2] + dz * L * 0.55]);
          const e = proj([crown[0] + dx * L, crown[1] - 1.9 * grow, crown[2] + dz * L]);
          if (!m || !e) continue;
          ctx.beginPath(); ctx.moveTo(cs[0], cs[1]); ctx.quadraticCurveTo(m[0], m[1], e[0], e[1]); ctx.stroke();
        }
      }
      ctx.lineCap = 'butt';
    }
  }

  /* ---------- sizing, scroll, loop ---------- */
  const mouse = { x: 0, tx: 0 };
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height; narrow = W < 760;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  let lastKey = '';
  const updateUI = (p: number) => {
    hero.style.setProperty('--p', p.toFixed(4));
    const stage = Math.max(0, STAGES.findIndex((s, k) => p >= s && p < (STAGES[k + 1] ?? 2)));
    let level = 0; for (let i = 0; i < 10; i++) if (p >= frameWin(i)[1]) level = i + 1;
    const pct = Math.round(p * 100), done = p > 0.9;
    const key = `${Math.min(stage, 4)}|${level}|${pct}|${done}`;
    if (key === lastKey) return; // only tell React when something visible changed
    lastKey = key;
    hero.classList.toggle('is-done', done);
    onUi({ stage: Math.min(stage, 4), level, pct, done });
  };

  let target = 0, shown = 0, last = 0, raf = 0, onScreen = true;
  const readScroll = () => {
    const r = hero.getBoundingClientRect(), vh = innerHeight, travel = Math.max(1, r.height - 2 * vh);
    target = clamp(-r.top / travel);
    hero.style.setProperty('--exit', clamp((-r.top - travel) / vh).toFixed(4));
  };
  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min(64, now - (last || now)); last = now;
    shown += (target - shown) * (1 - Math.exp(-dt * 0.0065));
    if (Math.abs(target - shown) < 0.0004) shown = target;
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 0.004));
    ctx.clearRect(0, 0, W, H);
    draw(shown, now);
    updateUI(shown);
    if (onScreen) raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!raf && onScreen) { last = 0; raf = requestAnimationFrame(frame); } };

  const still = () => { // reduced motion: the finished building, no pinning, no drift
    target = shown = 1; resize(); ctx.clearRect(0, 0, W, H); draw(1, 0); updateUI(1);
  };
  const boot = () => {
    if (reduce.matches) { cancelAnimationFrame(raf); raf = 0; still(); return; }
    resize(); readScroll(); shown = target; start();
  };

  const ro = new ResizeObserver(() => { resize(); if (reduce.matches) still(); });
  ro.observe(canvas);
  const onScroll = () => { if (!reduce.matches) { readScroll(); start(); } };
  const onPointer = (e: PointerEvent) => { if (e.pointerType === 'mouse') mouse.tx = (e.clientX / innerWidth - 0.5) * 2; };
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen && !reduce.matches) start(); });
  io.observe(hero);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', readScroll);
  hero.addEventListener('pointermove', onPointer);
  reduce.addEventListener('change', boot);
  boot();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect(); io.disconnect();
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', readScroll);
    hero.removeEventListener('pointermove', onPointer);
    reduce.removeEventListener('change', boot);
    hero.classList.remove('is-live', 'is-done');
  };
}
