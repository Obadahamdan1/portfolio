import Image from "next/image";

/**
 * A recreated 1984 Macintosh, built in CSS/SVG.
 * The supplied photo sits "inside" the screen with a CRT/scanline overlay.
 */
export default function MacFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[440px] select-none">
      {/* Beige body */}
      <div
        className="rounded-[26px] p-5 pb-7 shadow-[0_24px_50px_-18px_rgba(42,38,34,0.45)]"
        style={{
          background:
            "linear-gradient(160deg, #ded3bd 0%, #d2c6ac 55%, #c4b698 100%)",
          border: "1px solid rgba(42,38,34,0.18)",
        }}
      >
        {/* Screen bezel */}
        <div
          className="rounded-[14px] p-4"
          style={{
            background: "linear-gradient(160deg, #cabda3 0%, #bdae90 100%)",
            boxShadow:
              "inset 0 2px 6px rgba(42,38,34,0.35), inset 0 -1px 2px rgba(255,255,255,0.35)",
          }}
        >
          {/* The screen itself */}
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[6px] bg-[#1d1f1a] shadow-[inset_0_0_22px_rgba(0,0,0,0.7)]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
              style={{ filter: "contrast(1.05) saturate(0.92)" }}
            />
            {/* CRT scanline + tint overlay */}
            <div className="crt-overlay pointer-events-none absolute inset-0" />
            {/* Soft screen vignette + glass glare */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.55)]" />
          </div>

          {/* Screen label line */}
          <div className="mt-3 flex items-center justify-between px-0.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
              Macintosh
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-sage/70" />
          </div>
        </div>

        {/* Lower body details: disk-drive slot + vents */}
        <div className="mt-5 px-1">
          {/* Disk drive slot */}
          <div className="ml-auto h-1.5 w-2/5 rounded-full bg-ink/15 shadow-[inset_0_1px_2px_rgba(42,38,34,0.4)]" />
          {/* Vent lines */}
          <div className="mt-3 flex flex-col gap-[3px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="h-[2px] w-full rounded-full bg-ink/8"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Little foot / base shadow to ground it */}
      <div className="mx-auto mt-1 h-2 w-3/4 rounded-b-[18px] bg-ink/10 blur-[2px]" />
    </div>
  );
}
