"use client";

import { useEffect, useRef } from "react";

const SRC = "/portrait.png";
// brightness ramp, dark → bright
const RAMP = ".:-=+*#%@";
const CHAR_ASPECT = 0.55; // monospace cell width / height
const LO = [21, 86, 74]; // deep teal
const HI = [125, 249, 214]; // mint

/**
 * Canvas ASCII portrait. Samples the cut-out photo into a character grid and
 * tints each glyph teal→mint by brightness. Static by default — it only reacts
 * to the cursor (smoothly eased), never to scroll.
 */
export default function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const c = el.getContext("2d");
    if (!c) return;
    const view: HTMLCanvasElement = el;
    const g: CanvasRenderingContext2D = c;

    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let fontSize = 0;
    let lum: Float32Array = new Float32Array(0); // 0..1, or -1 for transparent
    let rnd: Float32Array = new Float32Array(0); // per-cell random vector (stable)
    let raf = 0;
    let running = false;

    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let intensity = 0; // eased 0..1 hover strength
    let targetIntensity = 0;

    const img = new Image();
    img.crossOrigin = "anonymous";

    function buildGrid() {
      const W = view.clientWidth;
      const H = view.clientHeight;
      if (!W || !H || !img.width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      view.width = Math.floor(W * dpr);
      view.height = Math.floor(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = 4.5; // smaller cell → more detail
      cols = Math.max(60, Math.min(220, Math.round(W / cell)));
      cellW = W / cols;
      cellH = cellW / CHAR_ASPECT;
      rows = Math.max(24, Math.floor(H / cellH));
      fontSize = Math.ceil(cellH);

      // Resample the photo into a cols×rows offscreen buffer (contain + center).
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const og = off.getContext("2d", { willReadFrequently: true });
      if (!og) return;

      const imgAspect = img.width / img.height;
      const boxAspect = (cols * cellW) / (rows * cellH);
      let dw = cols;
      let dh = rows;
      if (imgAspect > boxAspect) {
        dh = Math.round((cols / imgAspect) * (cellW / cellH));
      } else {
        dw = Math.round(rows * imgAspect * (cellH / cellW));
      }
      const dx = Math.floor((cols - dw) / 2);
      const dy = Math.floor((rows - dh) / 2);
      og.clearRect(0, 0, cols, rows);
      og.imageSmoothingEnabled = true;
      og.imageSmoothingQuality = "high";
      og.drawImage(img, dx, dy, dw, dh);
      const data = og.getImageData(0, 0, cols, rows).data;

      // luminance + histogram stretch over opaque cells
      const raw = new Float32Array(cols * rows);
      let lmin = Infinity;
      let lmax = -Infinity;
      for (let i = 0; i < cols * rows; i++) {
        const a = data[i * 4 + 3];
        if (a < 110) {
          raw[i] = -1;
          continue;
        }
        const r = data[i * 4] / 255;
        const gg = data[i * 4 + 1] / 255;
        const b = data[i * 4 + 2] / 255;
        const l = 0.299 * r + 0.587 * gg + 0.114 * b;
        raw[i] = l;
        if (l < lmin) lmin = l;
        if (l > lmax) lmax = l;
      }
      const range = lmax - lmin || 1;
      lum = new Float32Array(cols * rows);
      rnd = new Float32Array(cols * rows * 2);
      for (let i = 0; i < raw.length; i++) {
        rnd[i * 2] = Math.random() * 2 - 1;
        rnd[i * 2 + 1] = Math.random() * 2 - 1;
        if (raw[i] < 0) {
          lum[i] = -1;
          continue;
        }
        let t = (raw[i] - lmin) / range;
        t = Math.min(Math.max((t - 0.5) * 1.85 + 0.5, 0), 1); // punchier contrast
        lum[i] = Math.pow(t, 0.78);
      }
    }

    function render() {
      const W = view.clientWidth;
      const H = view.clientHeight;
      g.clearRect(0, 0, W, H);
      g.font = `${fontSize}px ui-monospace, "SF Mono", Menlo, monospace`;
      g.textBaseline = "top";

      const R = 110; // cursor influence radius
      const active = intensity > 0.001;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const idx = gy * cols + gx;
          let t = lum[idx];
          if (t < 0) continue;

          let px = gx * cellW;
          let py = gy * cellH;

          if (active) {
            const rx = rnd[idx * 2];
            const ry = rnd[idx * 2 + 1];
            // whole portrait gently comes alive on hover
            px += rx * intensity * 1.1;
            py += ry * intensity * 1.1;

            const ccx = gx * cellW + cellW / 2;
            const ccy = gy * cellH + cellH / 2;
            const dx = ccx - cur.x;
            const dy = ccy - cur.y;
            const dist = Math.hypot(dx, dy);
            if (dist < R) {
              const u = 1 - dist / R;
              const f = u * u * (3 - 2 * u) * intensity; // smoothstep
              const d = dist || 1;
              // gentle repel away from the cursor + a little random scatter
              px += (dx / d) * f * 11 + rx * f * 6;
              py += (dy / d) * f * 11 + ry * f * 6;
              t = Math.min(1, t + f * 0.45); // brighten / densify
            }
          }

          const ri = Math.min(
            RAMP.length - 1,
            Math.max(0, Math.floor(t * (RAMP.length - 1)))
          );
          const r = (LO[0] + (HI[0] - LO[0]) * t) | 0;
          const gn = (LO[1] + (HI[1] - LO[1]) * t) | 0;
          const b = (LO[2] + (HI[2] - LO[2]) * t) | 0;
          g.fillStyle = `rgb(${r},${gn},${b})`;
          g.fillText(RAMP[ri], px, py);
        }
      }
    }

    function loop() {
      intensity += (targetIntensity - intensity) * 0.12;
      if (cur.x < -9000) {
        cur.x = target.x;
        cur.y = target.y;
      } else {
        cur.x += (target.x - cur.x) * 0.22;
        cur.y += (target.y - cur.y) * 0.22;
      }
      render();

      if (intensity > 0.002 || targetIntensity > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        intensity = 0;
        running = false;
        render(); // settle to the clean static portrait
      }
    }

    function ensureRunning() {
      if (!running) {
        running = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    }

    function onMove(e: MouseEvent) {
      const rect = view.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      targetIntensity = 1;
      ensureRunning();
    }
    function onLeave() {
      targetIntensity = 0; // eases out, then loop settles to static
      ensureRunning();
    }
    function onResize() {
      buildGrid();
      render();
    }

    img.onload = () => {
      buildGrid();
      render();
    };
    img.src = SRC;

    view.addEventListener("mousemove", onMove);
    view.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      view.removeEventListener("mousemove", onMove);
      view.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="ASCII portrait of Obada"
      role="img"
      className="h-full w-full"
    />
  );
}
