"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { PROJECTS, PROFILE } from "@/lib/content";

const ease = [0.32, 0.72, 0, 1] as const;

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
};

export default function Software() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const count = PROJECTS.length;
  const active = ((index % count) + count) % count;
  const project = PROJECTS[active];

  const paginate = useCallback(
    (d: number) => setState(([i]) => [i + d, d]),
    []
  );
  const goTo = useCallback(
    (target: number) => setState(([i]) => [target, target > i ? 1 : -1]),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  return (
    <section
      id="software"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
    >
      <Reveal>
        <div>
          <p className="section-label mb-3">03 / Work</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {"Stuff I've been building "}
            <span className="text-terracotta">&lt;3</span>
          </h2>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface sm:aspect-[16/9]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
                priority={active === 0}
              />
              {/* readability overlay — darkens the bottom band where the caption sits */}
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-transparent" />

              {/* bottom-anchored caption */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-10 text-center">
                <h3 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/80 sm:text-base">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-sage">
                  {project.tags.join(" · ")}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {project.links.source && (
                    <a
                      href={project.links.source}
                      aria-label={`${project.title} source code`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring rounded-full border border-white/15 bg-white/5 p-2.5 text-ink backdrop-blur-sm transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      aria-label={`${project.title} live site`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring rounded-full border border-white/15 bg-white/5 p-2.5 text-ink backdrop-blur-sm transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* arrows (only when there's more than one project) */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous project"
                className="focus-ring absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-ink/70 transition-all hover:bg-white/10 hover:text-ink sm:left-5"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next project"
                className="focus-ring absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-ink/70 transition-all hover:bg-white/10 hover:text-ink sm:right-5"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        {/* dots (only when there's more than one project) */}
        {count > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${p.title}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-terracotta"
                    : "w-4 bg-muted/40 hover:bg-muted/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* the rest lives on GitHub */}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group mx-auto mt-8 flex w-max items-center gap-2 rounded text-center font-mono text-sm text-muted transition-colors hover:text-terracotta"
        >
          The rest is in my GitHub
          <ArrowRight
            size={16}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </Reveal>
    </section>
  );
}
