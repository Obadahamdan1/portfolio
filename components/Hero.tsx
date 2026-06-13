"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { PROFILE } from "@/lib/content";

// Canvas ASCII portrait — client-only, lazily loaded.
const AsciiPortrait = dynamic(() => import("@/components/AsciiPortrait"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full animate-pulse rounded-2xl bg-surface/60" />
  ),
});

const ease = [0.32, 0.72, 0, 1] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[100dvh] max-w-content flex-col items-center gap-10 px-6 pb-20 pt-32 lg:flex-row lg:gap-16 lg:px-10 lg:pt-28"
    >
      {/* Left — particle portrait, sitting in a soft glow */}
      <div className="order-2 w-full lg:order-1 lg:w-[48%]">
        <div className="relative mx-auto aspect-square w-full max-w-[480px]">
          <AsciiPortrait />
        </div>
      </div>

      {/* Right — intro copy */}
      <div className="order-1 w-full lg:order-2 lg:w-[52%]">
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          hi,{" "}
          <span className="text-terracotta text-glow">{PROFILE.name}</span> here.
          <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-terracotta align-middle animate-blink" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="mt-6 max-w-xl space-y-1.5 text-lg leading-relaxed text-muted"
        >
          <p>
            <strong className="font-semibold text-ink">
              {PROFILE.introLead}
            </strong>
            {PROFILE.introLines[0]}
          </p>
          {PROFILE.introLines.slice(1).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
          className="mt-9"
        >
          <a
            href={`mailto:${PROFILE.email}`}
            className="focus-ring group inline-flex items-center gap-3 rounded-full border border-terracotta/40 bg-terracotta/[0.07] py-2 pl-6 pr-2 font-mono text-sm tracking-tight text-ink transition-all duration-500 ease-spring hover:border-terracotta/70 hover:bg-terracotta/[0.12] active:scale-[0.98]"
          >
            Say hi!
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-cream transition-transform duration-500 ease-spring group-hover:translate-x-1 group-hover:scale-105">
              <Mail size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
