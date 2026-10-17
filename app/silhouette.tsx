// Placeholder speaker portrait: grey photo-booth backdrop, a dark silhouette
// with one of a few hair shapes, and two little chalk doodles.
type Hair = "short" | "long" | "bun" | "crop";

export default function Silhouette({ hair }: { hair: Hair }) {
  return (
    <svg
      className="silhouette"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Speaker to be announced"
    >
      <defs>
        <radialGradient id={`bg-${hair}`} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#d9d5dc" />
          <stop offset="100%" stopColor="#77707f" />
        </radialGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#bg-${hair})`} />
      <g fill="#1b1325">
        {hair === "long" && (
          <path d="M36 52c0-20 10-32 24-32s24 12 24 32v34H36z" />
        )}
        {hair === "bun" && <circle cx="60" cy="22" r="9" />}
        <ellipse cx="60" cy="50" rx="17" ry="20" />
        {hair === "short" && <path d="M42 46c0-14 8-22 18-22s18 8 18 22c-6-6-12-9-18-9s-12 3-18 9z" />}
        {hair === "crop" && <path d="M43 44c2-12 9-18 17-18s15 6 17 18c-5-4-11-6-17-6s-12 2-17 6z" />}
        <path d="M18 120c2-26 20-40 42-40s40 14 42 40z" />
      </g>
      <g stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M20 14l5 10M28 12l5 10M36 12l4 9" />
        <path d="M96 16v12M90 22h12M92 18l8 8M100 18l-8 8" />
      </g>
    </svg>
  );
}
