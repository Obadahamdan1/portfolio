"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Lightweight canvas constellation — drifting nodes joined by hairlines that
 * fade with distance, with a soft cursor-repulse. Sits fixed behind content.
 */
export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;

    // Fresh consts with non-null inferred types so closures stay type-safe.
    const view: HTMLCanvasElement = el;
    const g: CanvasRenderingContext2D = context;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const LINK_DIST = 130;
    const ACCENT = "95, 227, 192"; // mint rgb

    function build() {
      width = view.clientWidth;
      height = view.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      view.width = Math.floor(width * dpr);
      view.height = Math.floor(height * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        Math.round((width * height) / 16000),
        prefersReduced ? 40 : 110
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function step() {
      g.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          const f = (120 - d) / 120;
          n.x += (dx / d) * f * 1.4;
          n.y += (dy / d) * f * 1.4;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.32;
            g.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            g.lineWidth = 1;
            g.beginPath();
            g.moveTo(a.x, a.y);
            g.lineTo(b.x, b.y);
            g.stroke();
          }
        }
      }

      for (const n of nodes) {
        g.fillStyle = `rgba(${ACCENT}, 0.7)`;
        g.beginPath();
        g.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        g.fill();
      }

      raf = requestAnimationFrame(step);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (!prefersReduced) raf = requestAnimationFrame(step);
      else step(); // draw a single static frame
    }

    function onResize() {
      build();
      start();
    }
    function onMove(e: MouseEvent) {
      const r = view.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    }

    build();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
