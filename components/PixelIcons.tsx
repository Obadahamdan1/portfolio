// Tiny pixel-art icons drawn as crisp-edged SVG rects.
// All use currentColor so they tint with the palette.

type Rect = [x: number, y: number, w: number, h: number];

function Pixels({
  view,
  rects,
}: {
  view: [number, number];
  rects: Rect[];
}) {
  return (
    <svg
      viewBox={`0 0 ${view[0]} ${view[1]}`}
      width="100%"
      height="100%"
      shapeRendering="crispEdges"
      className="pixelated"
      aria-hidden="true"
    >
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="currentColor" />
      ))}
    </svg>
  );
}

export function CoffeeIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [4, 0, 1, 2],
        [6, 1, 1, 2],
        [2, 3, 7, 6],
        [9, 4, 2, 1],
        [10, 5, 1, 2],
        [9, 6, 2, 1],
        [1, 9, 9, 1],
      ]}
    />
  );
}

export function FilmIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [1, 1, 10, 2],
        [2, 0, 1, 1],
        [4, 0, 1, 1],
        [6, 0, 1, 1],
        [8, 0, 1, 1],
        [1, 4, 10, 7],
      ]}
    />
  );
}

export function ComputerIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [1, 1, 10, 7],
        [5, 8, 2, 2],
        [3, 10, 6, 1],
      ]}
    />
  );
}

export function HeadphonesIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [3, 1, 6, 1],
        [2, 2, 1, 1],
        [9, 2, 1, 1],
        [1, 3, 1, 3],
        [10, 3, 1, 3],
        [1, 6, 2, 4],
        [9, 6, 2, 4],
      ]}
    />
  );
}

export function ControllerIcon() {
  return (
    <Pixels
      view={[14, 12]}
      rects={[
        [1, 4, 12, 5],
        [0, 5, 1, 3],
        [13, 5, 1, 3],
        [3, 5, 1, 3],
        [2, 6, 3, 1],
        [9, 5, 1, 1],
        [11, 5, 1, 1],
        [10, 6, 1, 1],
      ]}
    />
  );
}

export function BookIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [2, 1, 8, 10],
        [2, 1, 1, 10],
        [4, 3, 4, 1],
        [4, 5, 4, 1],
        [4, 7, 4, 1],
      ]}
    />
  );
}

// Ringed planet (the 🪐 — Saturn)
export function PlanetIcon() {
  return (
    <Pixels
      view={[14, 12]}
      rects={[
        // round body
        [5, 2, 4, 1],
        [4, 3, 6, 1],
        [3, 4, 8, 1],
        [3, 5, 8, 1],
        [3, 6, 8, 1],
        [4, 7, 6, 1],
        [5, 8, 4, 1],
        // tilted ring tips
        [0, 7, 4, 1],
        [10, 4, 4, 1],
      ]}
    />
  );
}

// Four-point sparkle / star
export function StarIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [5, 0, 2, 3],
        [5, 9, 2, 3],
        [0, 5, 3, 2],
        [9, 5, 3, 2],
        [4, 4, 4, 4],
      ]}
    />
  );
}

export function RocketIcon() {
  return (
    <Pixels
      view={[12, 12]}
      rects={[
        [5, 0, 2, 2], // nose
        [4, 2, 4, 5], // body
        [3, 5, 1, 3], // left fin
        [8, 5, 1, 3], // right fin
        [5, 7, 2, 2], // flame
        [5, 10, 2, 1], // flame tip
      ]}
    />
  );
}
