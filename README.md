# Portfolio

A single-page personal portfolio — warm cream/beige editorial design with a 3D particle-portrait hero, a recreated 1984 Macintosh frame around the about photo, and a floating pixel-art icon field.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — all styling, custom warm palette
- **react-three-fiber** + **three** — particle portrait hero
- **Framer Motion** — scroll reveals + floating animations
- **Lenis** (`lenis/react`) — smooth scrolling
- **lucide-react** — icons

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Fill in your content

All placeholder copy lives in one file: **[`lib/content.ts`](lib/content.ts)**.
Edit it to set your name, intro, bio, technologies, experience, and project cards.

## Swap the images

- `public/portrait.jpg` — sampled into particles for the hero. Use a high-contrast
  head-and-shoulders shot; the background is dropped automatically for bright pixels.
- `public/about-photo.jpg` — shown inside the Macintosh screen.
- `public/projects/placeholder-*.svg` — project thumbnails (replace with real images
  and update the `image` paths in `lib/content.ts`).

> The current images were auto-converted from the HEIC photos in this folder as
> placeholders — replace them with whatever you like.

## Structure

```
app/
  layout.tsx          fonts, smooth-scroll wrapper, metadata
  page.tsx            section composition
  globals.css         palette vars, CRT overlay, scrollbar
components/
  Navbar / Hero / About / Experience / Software / Footer
  ParticlePortrait    r3f point-cloud sampled from portrait.jpg (special feature 1)
  FloatingPixels      parallax pixel-art icon field        (special feature 2)
  PixelIcons          crisp-edged pixel-art SVG icons
  MacFrame            CSS/SVG 1984 Macintosh + CRT overlay (special feature 3)
  SmoothScroll        Lenis wrapper
  Reveal              Framer Motion scroll-reveal helper
lib/content.ts        ← all editable content
```

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com/new) — zero config.

## Notes

- Fully responsive: the hero stacks on mobile and the particle canvas is replaced
  with a tinted still below 768px; the floating icon field is hidden on small screens.
- Respects `prefers-reduced-motion`.
