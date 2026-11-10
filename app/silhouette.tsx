// Placeholder speaker portrait: the generic flat profile icon (round head,
// rounded shoulders) in brand ink on a warm paper backdrop.
export default function Silhouette() {
  return (
    <svg
      className="silhouette"
      viewBox="0 0 512 512"
      role="img"
      aria-label="Speaker to be announced"
    >
      <rect width="512" height="512" fill="#e6dcc4" />
      <g fill="#2a1a3e" transform="translate(56 64) scale(0.78)">
        <circle cx="256" cy="143" r="128" />
        <path d="M150 265Q256 335 362 265C440 305 496 380 496 452V468Q496 496 468 496H44Q16 496 16 468V452C16 380 72 305 150 265Z" />
      </g>
    </svg>
  );
}
