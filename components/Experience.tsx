"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { EXPERIENCE } from "@/lib/content";

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = EXPERIENCE[active];

  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-surface/50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <Reveal>
          <p className="section-label mb-3">02 / Experience</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Where I&apos;ve worked.
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
          {/* Vertical company tabs */}
          <div
            role="tablist"
            aria-label="Companies"
            aria-orientation="vertical"
            className="flex gap-1 overflow-x-auto border-ink/10 md:flex-col md:overflow-visible md:border-l"
          >
            {EXPERIENCE.map((j, i) => {
              const selected = i === active;
              return (
                <button
                  key={j.company}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`focus-ring relative whitespace-nowrap px-4 py-3 text-left font-mono text-sm transition-colors md:-ml-px md:border-l-2 ${
                    selected
                      ? "border-terracotta text-terracotta md:bg-terracotta/5"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {j.company}
                </button>
              );
            })}
          </div>

          {/* Job detail */}
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-xl font-semibold text-ink">
                  {job.role}{" "}
                  <span className="text-terracotta">@ {job.company}</span>
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {job.period}
                </p>
                <ul className="mt-6 space-y-3.5">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
