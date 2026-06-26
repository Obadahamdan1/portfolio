"use client";

import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-cream/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#home"
          className="focus-ring rounded-md font-display text-base font-semibold tracking-tight text-ink"
        >
          {PROFILE.fullName}
          <span className="text-terracotta">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="focus-ring rounded font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social icons */}
        <div className="hidden items-center gap-1 md:flex">
          <IconLink href={`mailto:${PROFILE.email}`} label="Email">
            <Mail size={18} />
          </IconLink>
          <IconLink href={PROFILE.github} label="GitHub" external>
            <Github size={18} />
          </IconLink>
          <IconLink href={PROFILE.linkedin} label="LinkedIn" external>
            <Linkedin size={18} />
          </IconLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="focus-ring rounded-md p-2 text-ink md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/10 bg-cream/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-content flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-md px-2 py-3 font-mono text-sm uppercase tracking-[0.15em] text-muted hover:bg-surface hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-2 px-2 py-2">
              <IconLink href={`mailto:${PROFILE.email}`} label="Email">
                <Mail size={20} />
              </IconLink>
              <IconLink href={PROFILE.github} label="GitHub" external>
                <Github size={20} />
              </IconLink>
              <IconLink href={PROFILE.linkedin} label="LinkedIn" external>
                <Linkedin size={20} />
              </IconLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="focus-ring rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-terracotta"
    >
      {children}
    </a>
  );
}
