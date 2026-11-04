import { m } from "motion/react";
import { scalePoint } from "d3-scale";
import { useMemo, useRef, useState } from "react";
import { bestSoFar, isBaseline } from "@/lib/pareto";
import type { Run } from "@/lib/types";
import { useSize } from "@/lib/useSize";
import { Marker } from "./Marker";
import { makeYScale } from "./scales";

const MD = { top: 12, right: 16, bottom: 28, left: 44 };
const MS = { top: 12, right: 12, bottom: 28, left: 36 };

/** Best resolved accuracy so far by experiment number, with each experiment as a dot. */
export function ProgressChart({ runs, version, onOpen, height: heightProp = 220 }: { runs: Run[]; version?: string; onOpen: (id: string) => void; height?: number }) {
  const [ref, { w }] = useSize<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const touch = useRef(false);
  const height = w < 560 ? 190 : heightProp;
  const M = w < 560 ? MS : MD;
  const iw = Math.max(0, w - M.left - M.right);
  const ih = height - M.top - M.bottom;
  const series = useMemo(() => bestSoFar(runs, version), [runs, version]);
  const kinds = useMemo(() => new Map(runs.map((r) => [r.config.id, isBaseline(r)])), [runs]);
  const xs = useMemo(() => scalePoint<number>().domain(series.map((s) => s.number)).range([0, iw]).padding(0.4), [series, iw]);
  const ys = useMemo(() => makeYScale(series.map((s) => s.score), ih), [series, ih]);
  const stepD = series
    .map((s, i) => {
      const px = xs(s.number) ?? 0;
      const py = ys.scale(s.best);
      return i === 0 ? `M${px},${py}` : `H${px}V${py}`;
    })
    .join("");
  const hs = series.find((s) => s.number === hover);

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {w > 0 && (
        <svg width={w} height={height} onPointerDown={(e) => { if (e.target === e.currentTarget) setHover(null); }}>
          <g transform={`translate(${M.left},${M.top})`}>
            {ys.ticks.map((t) => (
              <g key={t} transform={`translate(0,${ys.scale(t)})`}>
                <line x2={iw} stroke="var(--chart-grid)" strokeDasharray="1 4" strokeLinecap="round" />
                <text x={-8} dy="0.32em" textAnchor="end" fontSize={11} className="num" fill="var(--subtle)">{Math.round(t * 100)}%</text>
              </g>
            ))}
            {series.map((s) => (
              <text key={s.number} x={xs(s.number)} y={ih + 18} textAnchor="middle" fontSize={11} className="num" fill={hover === s.number ? "var(--fg)" : "var(--subtle)"}>
                {s.number}
              </text>
            ))}
            <m.path d={stepD} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
            {series.map((s) => (
              <g key={s.number} transform={`translate(${xs(s.number)},${ys.scale(s.score)})`} style={{ cursor: "pointer" }} onPointerDown={(e) => { touch.current = e.pointerType !== "mouse"; }} onMouseEnter={() => !touch.current && setHover(s.number)} onMouseLeave={() => !touch.current && setHover(null)} onClick={() => (touch.current && hover !== s.number ? setHover(s.number) : onOpen(s.id))}>
                <circle r={16} fill="transparent" />
                <Marker kind={kinds.get(s.id) ? "baseline" : "model"} r={hover === s.number ? 5 : 3.5} fill={s.score === s.best ? "var(--accent)" : "var(--surface)"} stroke={s.score === s.best ? "var(--accent)" : "var(--chart-dim)"} />
              </g>
            ))}
            {hs && (
              <line x1={xs(hs.number)} x2={xs(hs.number)} y1={0} y2={ih} stroke="var(--border-strong)" strokeDasharray="2 3" pointerEvents="none" />
            )}
          </g>
        </svg>
      )}
      {hs && (
        <div className="pointer-events-none absolute z-10 rounded-field border border-border bg-surface px-2.5 py-1.5 text-[12px] shadow-pop" style={{ left: Math.max(4, Math.min(w - 230, M.left + (xs(hs.number) ?? 0) + 10)), top: 4 }}>
          <div className="font-medium">{hs.id} <span className="font-normal text-muted">{hs.title}</span></div>
          <div className="num text-muted">resolved {(hs.score * 100).toFixed(1)}%, best {(hs.best * 100).toFixed(1)}%</div>
          <div className="text-[11px] text-subtle">{touch.current ? "Tap again to open" : "Click to open"}</div>
        </div>
      )}
    </div>
  );
}
