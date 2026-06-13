"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import {
  CoffeeIcon,
  FilmIcon,
  ComputerIcon,
  HeadphonesIcon,
  ControllerIcon,
  BookIcon,
  PlanetIcon,
  StarIcon,
  RocketIcon,
} from "@/components/PixelIcons";

type Item = {
  icon: ReactNode;
  top: string;
  left: string;
  size: number;
  depth: number; // parallax strength
  color: string; // tailwind text color
  duration: number;
};

// Sparse, intentional placement — not a cluttered grid.
const ITEMS: Item[] = [
  { icon: <CoffeeIcon />, top: "14%", left: "8%", size: 44, depth: 120, color: "text-sage", duration: 7 },
  { icon: <ComputerIcon />, top: "26%", left: "84%", size: 52, depth: 200, color: "text-ink", duration: 9 },
  { icon: <FilmIcon />, top: "52%", left: "6%", size: 40, depth: 160, color: "text-terracotta", duration: 8 },
  { icon: <HeadphonesIcon />, top: "68%", left: "88%", size: 46, depth: 240, color: "text-sage", duration: 10 },
  { icon: <ControllerIcon />, top: "80%", left: "14%", size: 54, depth: 180, color: "text-ink", duration: 8.5 },
  { icon: <BookIcon />, top: "40%", left: "92%", size: 38, depth: 140, color: "text-terracotta", duration: 7.5 },
  { icon: <CoffeeIcon />, top: "90%", left: "70%", size: 36, depth: 220, color: "text-sage", duration: 9.5 },
  { icon: <PlanetIcon />, top: "18%", left: "60%", size: 52, depth: 170, color: "text-terracotta", duration: 11 },
  { icon: <StarIcon />, top: "60%", left: "40%", size: 28, depth: 260, color: "text-sage", duration: 6.5 },
  { icon: <StarIcon />, top: "10%", left: "30%", size: 22, depth: 300, color: "text-ink", duration: 5.5 },
  { icon: <RocketIcon />, top: "74%", left: "54%", size: 40, depth: 150, color: "text-ink", duration: 9 },
];

function FloatingItem({ item }: { item: Item }) {
  const { scrollY } = useScroll();
  // Parallax: drift up as the page scrolls, each at its own depth.
  const y = useTransform(scrollY, [0, 2000], [0, -item.depth]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute"
      style={{ top: item.top, left: item.left, y }}
    >
      <motion.div
        className={item.color}
        style={{ width: item.size, height: item.size, opacity: 0.1 }}
        animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {item.icon}
      </motion.div>
    </motion.div>
  );
}

export default function FloatingPixels() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
    >
      {ITEMS.map((item, i) => (
        <FloatingItem key={i} item={item} />
      ))}
    </div>
  );
}
