import { m } from "motion/react";
import { useMemo } from "react";

/** Small line of values with the last point marked. Values are 0..1 accuracies. */
export function Sparkline({ values, width = 76, height = 22, className }: { values: number[]; width?: number; height?: number; className?: string }) {
  const { d, last } = useMemo(() => {
    if (values.length === 0) return { d: "", last: null as null | [number, number] };
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const span = hi - lo || 1;
    const pad = 3;
    const pts = values.map((v, i) => [
      pad + (values.length === 1 ? (width - 2 * pad) / 2 : (i / (values.length - 1)) * (width - 2 * pad)),
      height - pad - ((v - lo) / span) * (height - 2 * pad),
    ] as [number, number]);
    return { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(""), last: pts[pts.length - 1]! };
  }, [values, width, height]);
  return (
    <svg width={width} height={height} className={className} aria-hidden>
      <m.path d={d} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
      {last && <circle cx={last[0]} cy={last[1]} r={2.5} fill="var(--accent)" />}
    </svg>
  );
}
