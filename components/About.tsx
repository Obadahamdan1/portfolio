import { Fragment } from "react";
import Reveal from "@/components/Reveal";
import PhotoFrame from "@/components/PhotoFrame";
import { ABOUT } from "@/lib/content";

// Wrap the given phrases in <strong> while leaving the rest as plain text.
function emphasize(text: string, phrases: string[]) {
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    phrases.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
    >
      <Reveal>
        <p className="section-label mb-3">01 / About</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          A bit about me.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
        {/* Left — bio + tech list */}
        <Reveal className="order-2 lg:order-1">
          {/* work bio */}
          <p className="text-lg leading-relaxed text-muted">
            {emphasize(ABOUT.bio[0], ["AI Engineer intern", "NourNet"])}
          </p>

          {/* tech list */}
          <div className="mt-10">
            <p className="section-label mb-4">Technologies I use</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {ABOUT.technologies.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-2.5 font-mono text-sm text-ink"
                >
                  <span className="text-terracotta">▸</span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* free-time bio */}
          {ABOUT.bio.slice(1).map((para, i) => (
            <p key={i} className="mt-10 text-lg leading-relaxed text-muted">
              {para}
            </p>
          ))}
        </Reveal>

        {/* Right — photo in Mac frame */}
        <Reveal className="order-1 flex items-start justify-center lg:order-2 lg:justify-center">
          <div className="w-full lg:animate-float-slow">
            <PhotoFrame src="/about-photo.jpg" alt="Obada holding the Arabic Blueprint of AI award" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
