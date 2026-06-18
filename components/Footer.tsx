import { Mail, Github, Linkedin } from "lucide-react";
import { PROFILE } from "@/lib/content";
import LetterboxdIcon from "@/components/LetterboxdIcon";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-ink/10 bg-surface/40"
    >
      <div className="mx-auto max-w-content px-6 py-14 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="section-label mb-2">Let&apos;s talk</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="focus-ring rounded font-display text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-terracotta sm:text-3xl"
            >
              {PROFILE.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FooterIcon href={`mailto:${PROFILE.email}`} label="Email">
              <Mail size={20} />
            </FooterIcon>
            <FooterIcon href={PROFILE.github} label="GitHub" external>
              <Github size={20} />
            </FooterIcon>
            <FooterIcon href={PROFILE.linkedin} label="LinkedIn" external>
              <Linkedin size={20} />
            </FooterIcon>
            <FooterIcon href={PROFILE.letterboxd} label="Letterboxd" external>
              <LetterboxdIcon size={20} />
            </FooterIcon>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-ink/10 pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p>
            have a nice day <span className="text-terracotta">&gt;3</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({
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
      className="focus-ring rounded-md border border-ink/15 p-2.5 text-muted transition-colors hover:border-terracotta hover:text-terracotta"
    >
      {children}
    </a>
  );
}
