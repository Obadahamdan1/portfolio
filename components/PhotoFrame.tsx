import Image from "next/image";

/**
 * A dark "window-chrome" frame — a double-bezel card with a mono title bar and
 * traffic-light dots. Replaces the retro Mac; reads as a developer's window.
 */
export default function PhotoFrame({
  src,
  alt,
  filename = "~/obada/about.jpg",
}: {
  src: string;
  alt: string;
  filename?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[460px] select-none">
      {/* accent glow behind the frame */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-terracotta/10 blur-3xl" />

      {/* outer shell */}
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] backdrop-blur-sm">
        {/* title bar */}
        <div className="flex items-center gap-2 px-3 py-3">
          <span className="h-3 w-3 rounded-full bg-terracotta/80" />
          <span className="h-3 w-3 rounded-full bg-sage/70" />
          <span className="h-3 w-3 rounded-full bg-muted/40" />
          <span className="ml-2 font-mono text-[11px] tracking-tight text-muted">
            {filename}
          </span>
        </div>

        {/* inner core — the photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 460px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[1.15rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}
