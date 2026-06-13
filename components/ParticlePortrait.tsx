"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Image from "next/image";

const SRC = "/portrait.png";
const TARGET_COLS = 196; // sampling resolution (columns of particles)
const PLANE = 4.2; // world size the portrait is fit into

// Palette targets: deep teal in the shadows → bright mint in the highlights,
// so the cloud reads as a glowing portrait on the dark navy background.
const CHARCOAL = new THREE.Color("#15564A"); // shadow
const SAGE = new THREE.Color("#7DF9D6"); // highlight (mint)

type SampledData = {
  positions: Float32Array; // original resting positions
  colors: Float32Array;
  scatter: Float32Array; // per-particle random direction for scroll dissolve
  count: number;
};

/** Cheap, dependency-free pseudo value-noise — enough for a subtle wobble. */
function noise(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.7 + t) * 0.5 +
    Math.sin(y * 2.3 - t * 0.8) * 0.3 +
    Math.sin((x + y) * 1.1 + t * 1.3) * 0.2
  );
}

function PointCloud({ data }: { data: SampledData }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const { pointer } = useThree();
  const scroll = useRef(0); // 0..1 progress through the hero

  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / Math.max(window.innerHeight, 1);
      scroll.current = Math.min(Math.max(p, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const live = useMemo(() => Float32Array.from(data.positions), [data]);

  useFrame((state) => {
    const geom = geomRef.current;
    if (!geom) return;
    const t = state.clock.elapsedTime;
    const base = data.positions;
    const scat = data.scatter;
    const arr = (geom.attributes.position as THREE.BufferAttribute)
      .array as Float32Array;

    const mx = pointer.x * (PLANE / 2);
    const my = pointer.y * (PLANE / 2);
    const sp = scroll.current;
    // Ease in the dissolve so a small scroll keeps the portrait readable.
    const scatterAmt = sp * sp * 0.7;

    for (let i = 0; i < data.count; i++) {
      const ix = i * 3;
      const ox = base[ix];
      const oy = base[ix + 1];

      const n = noise(ox * 1.2, oy * 1.2, t * 0.6);
      let z = n * 0.12;

      // mouse-follow distortion: particles near the cursor get pushed forward
      const dx = ox - mx;
      const dy = oy - my;
      const dist2 = dx * dx + dy * dy;
      const influence = Math.exp(-dist2 * 1.6);
      z += influence * 0.55;

      // scroll dissolve: each particle drifts along its own random vector
      arr[ix] = ox + n * 0.015 + scat[ix] * scatterAmt;
      arr[ix + 1] = oy + n * 0.015 + scat[ix + 1] * scatterAmt;
      arr[ix + 2] = base[ix + 2] + z + scat[ix + 2] * scatterAmt;
    }
    (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // gentle idle rotation toward the pointer + a touch of scroll spin
    if (pointsRef.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        pointer.x * 0.25 + sp * 0.4,
        0.06
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -pointer.y * 0.18,
        0.06
      );
    }

    // fade out as it dissolves
    const mat = (pointsRef.current?.material as THREE.PointsMaterial) || null;
    if (mat) mat.opacity = 0.95 - sp * sp * 0.4;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          count={data.count}
          array={live}
          itemSize={3}
          args={[live, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={data.count}
          array={data.colors}
          itemSize={3}
          args={[data.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function useSampledImage(src: string) {
  const [data, setData] = useState<SampledData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const step = Math.max(1, Math.floor(img.width / TARGET_COLS));
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const { data: px } = ctx.getImageData(0, 0, img.width, img.height);

      const aspect = img.height / img.width;
      const planeW = PLANE;
      const planeH = PLANE * aspect;

      const xs: number[] = [];
      const ys: number[] = [];
      const lums: number[] = [];
      const tmp = new THREE.Color();

      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity,
        lumMin = Infinity,
        lumMax = -Infinity;

      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const idx = (y * img.width + x) * 4;
          const a = px[idx + 3];
          // Transparent background → skip. Clean cut-out, no luminance guessing.
          if (a < 130) continue;

          const r = px[idx] / 255;
          const g = px[idx + 1] / 255;
          const b = px[idx + 2] / 255;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          const wx = (x / img.width - 0.5) * planeW;
          const wy = -(y / img.height - 0.5) * planeH;
          xs.push(wx);
          ys.push(wy);
          lums.push(lum);

          if (wx < minX) minX = wx;
          if (wx > maxX) maxX = wx;
          if (wy < minY) minY = wy;
          if (wy > maxY) maxY = wy;
          if (lum < lumMin) lumMin = lum;
          if (lum > lumMax) lumMax = lum;
        }
      }

      // Center the subject and scale it to fill the plane nicely.
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const span = Math.max(maxX - minX, maxY - minY) || 1;
      const scale = (PLANE * 0.92) / span;
      // Histogram stretch: backlit / low-contrast photos otherwise read as a
      // flat silhouette. Map the subject's own tonal range across the palette.
      const lumRange = lumMax - lumMin || 1;

      const count = xs.length;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scatter = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        // normalize → punchy S-curve → gentle gamma
        let t = (lums[i] - lumMin) / lumRange;
        t = Math.min(Math.max((t - 0.5) * 1.6 + 0.5, 0), 1);
        t = Math.pow(t, 0.82);

        positions[ix] = (xs[i] - cx) * scale;
        positions[ix + 1] = (ys[i] - cy) * scale;
        positions[ix + 2] = (t - 0.5) * 0.35; // depth relief: highlights pop forward

        tmp.copy(CHARCOAL).lerp(SAGE, t);
        colors[ix] = tmp.r;
        colors[ix + 1] = tmp.g;
        colors[ix + 2] = tmp.b;

        scatter[ix] = (Math.random() - 0.5) * 2;
        scatter[ix + 1] = (Math.random() - 0.5) * 2;
        scatter[ix + 2] = (Math.random() - 0.5) * 2;
      }

      if (!cancelled) {
        setData({ positions, colors, scatter, count });
      }
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  return data;
}

function PortraitScene() {
  const data = useSampledImage(SRC);
  if (!data) return null;
  return <PointCloud data={data} />;
}

export default function ParticlePortrait() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={SRC}
          alt="Portrait of Obada"
          fill
          sizes="80vw"
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!touch-none"
    >
      <PortraitScene />
    </Canvas>
  );
}
