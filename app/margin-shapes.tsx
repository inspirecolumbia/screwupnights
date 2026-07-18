import type { CSSProperties } from "react";

type WedgeSpec = {
  top: string;
  height: string;
  /* How far the shape's own box extends past the rail's outer edge — the
     rail's overflow:hidden crops this off, giving the bled/cut-off look. */
  offset: string;
  width: string;
  color: string;
  clipPath: string;
};

const GREEN = "var(--hi)";
const PINK = "var(--red)";
const PURPLE = "var(--ink)";

// Pinned to the viewport (see .margin-shapes in globals.css) so these stay
// visible for the whole scroll, not just while the hero is in view. Top
// offsets and heights are all viewport-relative, spaced with generous gaps
// so a tall monitor's full 100vh reads as covered, not clustered up top.
// Each of the three colors appears exactly once per side.
const LEFT_WEDGES: WedgeSpec[] = [
  {
    // wide flat-topped wedge
    top: "0%",
    height: "32vh",
    offset: "-16%",
    width: "122%",
    color: GREEN,
    clipPath: "polygon(0 0, 60% 0, 35% 100%, 0 100%)",
  },
  {
    // steep narrow sliver
    top: "46%",
    height: "14vh",
    offset: "-8%",
    width: "55%",
    color: PINK,
    clipPath: "polygon(0 0, 100% 40%, 0 100%)",
  },
  {
    // straight edge parallel to the viewport edge
    top: "75%",
    height: "20vh",
    offset: "-12%",
    width: "85%",
    color: PURPLE,
    clipPath: "polygon(0 0, 82% 10%, 75% 100%, 0 92%)",
  },
];

const RIGHT_WEDGES: WedgeSpec[] = [
  {
    top: "3%",
    height: "30vh",
    offset: "-16%",
    width: "122%",
    color: PURPLE,
    clipPath: "polygon(100% 0, 40% 0, 65% 100%, 100% 100%)",
  },
  {
    top: "47%",
    height: "16vh",
    offset: "-8%",
    width: "55%",
    color: GREEN,
    clipPath: "polygon(100% 0, 0 40%, 100% 100%)",
  },
  {
    top: "77%",
    height: "20vh",
    offset: "-12%",
    width: "85%",
    color: PINK,
    clipPath: "polygon(100% 0, 18% 10%, 25% 100%, 100% 92%)",
  },
];

function Wedge({
  top,
  height,
  offset,
  width,
  color,
  clipPath,
  edge,
}: WedgeSpec & { edge: "left" | "right" }) {
  const style: CSSProperties = {
    top,
    height,
    width,
    background: color,
    clipPath,
    [edge]: offset,
  };
  return <div className="margin-shape" style={style} />;
}

export default function MarginShapes() {
  return (
    <div className="margin-shapes" aria-hidden="true">
      <div className="margin-shapes-col left">
        {LEFT_WEDGES.map((w, i) => (
          <Wedge key={i} {...w} edge="left" />
        ))}
      </div>
      <div className="margin-shapes-col right">
        {RIGHT_WEDGES.map((w, i) => (
          <Wedge key={i} {...w} edge="right" />
        ))}
      </div>
    </div>
  );
}
