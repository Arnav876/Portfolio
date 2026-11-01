import React, { useRef, useEffect } from 'react';

interface InteractiveWaveBackgroundProps {
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  waveSpeed?: number;
  waveAmplitude?: number;
  mouseInfluence?: number;
  lineSpacing?: number;
  seed?: number;
  resolution?: number;
  style?: React.CSSProperties;
}

function createSimplexNoise(seed = 0.5) {
  const t = 0.5 * (Math.sqrt(3) - 1);
  const n = (3 - Math.sqrt(3)) / 6;
  const r = (3 - Math.sqrt(3)) / 3;
  const i = new Uint8Array(256);
  for (let e = 0; e < 256; e++) i[e] = e;
  const a = (step: number) => {
    const val = Math.sin(step * 12.9898 + seed * 78.233) * 43758.5453;
    return val - Math.floor(val);
  };
  for (let e = 255; e > 0; e--) {
    const tIdx = Math.floor((e + 1) * a(e));
    const tmp = i[e];
    i[e] = i[tIdx];
    i[tIdx] = tmp;
  }
  const o = new Uint8Array(512);
  const s = new Uint8Array(512);
  for (let e = 0; e < 512; e++) {
    o[e] = i[e & 255];
    s[e] = o[e] % 12;
  }
  const c = new Float64Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1]);
  const l = (e: number) => Math.floor(e) | 0;

  return function (e: number, iVal: number) {
    const aVal = (e + iVal) * t;
    const u = l(e + aVal);
    const d = l(iVal + aVal);
    const f = (u + d) * n;
    const p = e - (u - f);
    const m = iVal - (d - f);
    let h: number, g: number;
    if (p > m) {
      h = 1;
      g = 0;
    } else {
      h = 0;
      g = 1;
    }
    const _ = p - h + n;
    const v = m - g + n;
    const y = p - 1 + r;
    const b = m - 1 + r;
    const x = u & 255;
    const S = d & 255;
    const C = s[x + o[S]];
    const w = s[x + h + o[S + g]];
    const T = s[x + 1 + o[S + 1]];
    let E = 0.5 - p * p - m * m;
    let D: number;
    if (E < 0) D = 0;
    else {
      E *= E;
      D = E * E * (c[C * 2] * p + c[C * 2 + 1] * m);
    }
    let O = 0.5 - _ * _ - v * v;
    let k: number;
    if (O < 0) k = 0;
    else {
      O *= O;
      k = O * O * (c[w * 2] * _ + c[w * 2 + 1] * v);
    }
    let A = 0.5 - y * y - b * b;
    let j: number;
    if (A < 0) j = 0;
    else {
      A *= A;
      j = A * A * (c[T * 2] * y + c[T * 2 + 1] * b);
    }
    return 70 * (D + k + j);
  };
}

interface PointData {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

export const InteractiveWaveBackground: React.FC<InteractiveWaveBackgroundProps> = ({
  strokeColor = 'rgba(0, 0, 0, 0.14)',
  strokeWidth = 1.25,
  backgroundColor = 'transparent',
  waveSpeed = 0.5,
  waveAmplitude = 0.6,
  mouseInfluence = 1,
  lineSpacing = 0.85,
  seed = 0.5,
  resolution = 0.7,
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const linesRef = useRef<SVGPathElement[]>([]);
  const pointsRef = useRef<PointData[][]>([]);
  const cursorRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false
  });
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null);
  const rafRef = useRef<number | null>(null);
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    noiseRef.current = createSimplexNoise(seed);
  }, [seed]);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const buildLines = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      linesRef.current.forEach((p) => p.remove());
      linesRef.current = [];
      pointsRef.current = [];

      const r = 8 + (1 - lineSpacing) * 159;
      const i = 4 + (1 - resolution) * 20;
      const o = w + 200;
      const s = h + 30;
      const l = Math.ceil(o / r);
      const u = Math.ceil(s / i);
      const d = (w - r * l) / 2;
      const f = (h - i * u) / 2;

      for (let lineIdx = 0; lineIdx < l; lineIdx++) {
        const linePoints: PointData[] = [];
        for (let ptIdx = 0; ptIdx < u; ptIdx++) {
          linePoints.push({
            x: d + r * lineIdx,
            y: f + i * ptIdx,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', strokeColor);
        path.setAttribute('stroke-width', String(strokeWidth));
        svg.appendChild(path);
        linesRef.current.push(path);
        pointsRef.current.push(linePoints);
      }
    };

    const getPtPos = (pt: PointData, applyCursor = true) => ({
      x: pt.x + pt.wave.x + (applyCursor ? pt.cursor.x : 0),
      y: pt.y + pt.wave.y + (applyCursor ? pt.cursor.y : 0)
    });

    const updatePhysics = (timestamp: number) => {
      const points = pointsRef.current;
      const cursor = cursorRef.current;
      const noise = noiseRef.current;
      if (!noise || !points || points.length === 0) return;

      const s = waveSpeed * 0.002;
      const c = waveAmplitude * 2;
      const l = mouseInfluence * 0.0007;
      const u = cursor.sx;
      const d = cursor.sy;
      const f = cursor.vs;
      const p = Math.max(175, f);

      for (let lineIdx = 0; lineIdx < points.length; lineIdx++) {
        const line = points[lineIdx];
        for (let ptIdx = 0; ptIdx < line.length; ptIdx++) {
          const pt = line[ptIdx];
          const noiseVal = noise(pt.x * 0.003, pt.y * 0.002) * 8;
          const angle = waveSpeed > 0 ? noiseVal + timestamp * s : noiseVal;

          pt.wave.x = Math.cos(angle) * 12 * c;
          pt.wave.y = Math.sin(angle) * 6 * c;

          const dx = pt.x - u;
          const dy = pt.y - d;
          const dist = Math.hypot(dx, dy);

          if (dist < p) {
            const falloff = 1 - dist / p;
            const force = Math.cos(dist * 0.001) * falloff * p * f * l;
            const dir = Math.atan2(dy, dx);
            pt.cursor.vx += Math.cos(dir) * force;
            pt.cursor.vy += Math.sin(dir) * force;
          }

          pt.cursor.vx += -pt.cursor.x * 0.01;
          pt.cursor.vy += -pt.cursor.y * 0.01;
          pt.cursor.vx *= 0.95;
          pt.cursor.vy *= 0.95;
          pt.cursor.x += pt.cursor.vx;
          pt.cursor.y += pt.cursor.vy;
          pt.cursor.x = Math.min(50, Math.max(-50, pt.cursor.x));
          pt.cursor.y = Math.min(50, Math.max(-50, pt.cursor.y));
        }
      }
    };

    const renderLines = () => {
      const points = pointsRef.current;
      const lines = linesRef.current;
      for (let n = 0; n < points.length; n++) {
        const line = points[n];
        const path = lines[n];
        if (!line || line.length < 2 || !path) continue;

        const p0 = getPtPos(line[0], false);
        let dStr = `M ${p0.x} ${p0.y}`;
        for (let i = 1; i < line.length; i++) {
          const pt = getPtPos(line[i], true);
          dStr += ` L ${pt.x} ${pt.y}`;
        }
        path.setAttribute('d', dStr);
      }
    };

    buildLines();
    updatePhysics(0);
    renderLines();

    const tick = (time: number) => {
      if (!isIntersectingRef.current) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);

      const c = cursorRef.current;
      c.sx += (c.x - c.sx) * 0.1;
      c.sy += (c.y - c.sy) * 0.1;
      const dx = c.x - c.lx;
      const dy = c.y - c.ly;
      const dist = Math.hypot(dx, dy);
      c.v = dist;
      c.vs += (dist - c.vs) * 0.1;
      c.vs = Math.min(100, c.vs);
      c.lx = c.x;
      c.ly = c.y;
      c.a = Math.atan2(dy, dx);

      updatePhysics(time);
      renderLines();
    };

    rafRef.current = requestAnimationFrame(tick);

    const handlePointer = (clientX: number, clientY: number) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const c = cursorRef.current;
      c.x = clientX - rect.left;
      c.y = clientY - rect.top;
      if (!c.set) {
        c.sx = c.x;
        c.sy = c.y;
        c.lx = c.x;
        c.ly = c.y;
        c.set = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const heroEl = container.closest('#hero') || container;
    heroEl.addEventListener('mousemove', onMouseMove as EventListener);
    heroEl.addEventListener('touchmove', onTouchMove as EventListener, { passive: true });

    const onResize = () => {
      buildLines();
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      heroEl.removeEventListener('mousemove', onMouseMove as EventListener);
      heroEl.removeEventListener('touchmove', onTouchMove as EventListener);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, [strokeColor, waveSpeed, waveAmplitude, mouseInfluence, lineSpacing, resolution]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: backgroundColor || 'transparent',
        position: 'absolute',
        inset: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style
      }}
    >
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
};

