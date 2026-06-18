// Letterboxd brand mark — three overlapping dots (orange / green / blue).
export default function LetterboxdIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
    >
      {/* outer dots first, green drawn last so it sits centered on top */}
      <circle cx="6" cy="12" r="3.7" fill="#FF8000" />
      <circle cx="18" cy="12" r="3.7" fill="#40BCF4" />
      <circle cx="12" cy="12" r="3.7" fill="#00E054" />
    </svg>
  );
}
