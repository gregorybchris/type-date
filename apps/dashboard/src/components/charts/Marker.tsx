/** Circle for models, diamond for non-model baselines. Drawn at the origin. */
export function Marker({ kind, r, fill, stroke, strokeWidth = 1.5, opacity = 1 }: { kind: "model" | "baseline"; r: number; fill: string; stroke: string; strokeWidth?: number; opacity?: number }) {
  if (kind === "baseline") {
    const s = r * 1.25;
    return <path d={`M0,${-s}L${s},0L0,${s}L${-s},0Z`} fill={fill} stroke={stroke} strokeWidth={strokeWidth} opacity={opacity} strokeLinejoin="round" />;
  }
  return <circle r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} opacity={opacity} />;
}
