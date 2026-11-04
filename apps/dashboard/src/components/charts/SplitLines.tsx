import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { useMemo, useState } from "react";
import { cellFor, pc, splitColor, splitLabel } from "@/lib/compare";
import { useSize } from "@/lib/useSize";
import type { Run } from "@/lib/types";
import { ChartTip } from "./ChartTip";

const M = { top: 12, right: 16, bottom: 64, left: 56 };
const HEIGHT = 340;

/** Accuracy against engine generation, one line per split. A line breaks where the engine has no result. */
export function SplitLines({ runs, allSplits, active, version, min }: { runs: Run[]; allSplits: string[]; active: string[]; version: string; min: number }) {
  const [ref, { w }] = useSize<HTMLDivElement>();
  const [sel, setSel] = useState<number | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const iw = Math.max(0, w - M.left - M.right);
  const ih = HEIGHT - M.top - M.bottom;
  const n = runs.length;
  const x = (i: number) => (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = useMemo(() => scaleLinear().domain([min, 1]).range([ih, 0]), [min, ih]);
  const ticks = useMemo(() => {
    const step = min >= 0.5 ? 0.1 : 0.2;
    const t: number[] = [];
    for (let v = min; v <= 1.0001; v += step) t.push(+v.toFixed(2));
    return t;
  }, [min]);
  const path = useMemo(() => line<number | null>().defined((v) => v !== null).x((_, i) => x(i)).y((v) => y(Math.max(min, v!))), [x, y, min]);
  const colW = n > 1 ? iw / (n - 1) : iw;

  return (
    <div ref={ref} className="relative w-full" style={{ height: HEIGHT }}>
      {w > 0 && (
        <svg width={w} height={HEIGHT} role="img" aria-label={`Resolved accuracy by engine generation on eval ${version}, one line per split`} onPointerLeave={() => setHot(null)}>
          <g transform={`translate(${M.left},${M.top})`}>
            {ticks.map((t) => (
              <g key={t} transform={`translate(0,${y(t)})`}>
                <line x2={iw} stroke="var(--chart-grid)" strokeDasharray="1 4" strokeLinecap="round" />
                <text x={-8} dy="0.32em" textAnchor="end" className="num" fontSize={11} fill="var(--subtle)">{Math.round(t * 100)}%</text>
              </g>
            ))}
            {runs.map((r, i) => (
              <g key={r.config.id} transform={`translate(${x(i)},${ih})`}>
                <line y2={5} stroke="var(--border-strong)" />
                <text transform="translate(0,14) rotate(-35)" textAnchor="end" fontSize={10.5} fill={sel === i ? "var(--fg)" : "var(--muted)"} fontWeight={sel === i ? 600 : 400}>{r.config.id}</text>
              </g>
            ))}
            <line x2={iw} y1={ih} y2={ih} stroke="var(--border-strong)" />
            {sel !== null && <line x1={x(sel)} x2={x(sel)} y2={ih} stroke="var(--accent)" strokeOpacity={0.4} />}
            {active.map((s) => {
              const ci = allSplits.indexOf(s);
              const vals = runs.map((r) => cellFor(r, version, s)?.acc ?? null);
              const dim = hot !== null && hot !== s;
              return (
                <g key={s} opacity={dim ? 0.18 : 1} onPointerEnter={() => setHot(s)}>
                  <path d={path(vals) ?? ""} fill="none" stroke={splitColor(ci)} strokeWidth={hot === s ? 2.6 : 1.7} strokeLinejoin="round" strokeLinecap="round" />
                  {vals.map((v, i) => v !== null && <circle key={i} cx={x(i)} cy={y(Math.max(min, v))} r={2.6} fill="var(--surface)" stroke={splitColor(ci)} strokeWidth={1.5} />)}
                </g>
              );
            })}
            {runs.map((r, i) => (
              <rect key={r.config.id} x={x(i) - colW / 2} y={-M.top} width={Math.max(24, colW)} height={ih + M.top + 20} fill="transparent" style={{ cursor: "pointer" }} onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)} onClick={() => setSel(sel === i ? null : i)} />
            ))}
          </g>
        </svg>
      )}
      {sel !== null && runs[sel] && (
        <ChartTip left={M.left + x(sel)} top={20} bound={w} onClose={() => setSel(null)} width={244}>
          <div className="font-semibold text-fg">{runs[sel]!.config.id} <span className="font-normal text-subtle">{version}</span></div>
          <div className="dotted-t my-1.5" />
          <div className="flex max-h-60 flex-col gap-0.5 overflow-y-auto">
            {active.map((s) => {
              const c = cellFor(runs[sel]!, version, s);
              return (
                <div key={s} className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: splitColor(allSplits.indexOf(s)) }} />
                  <span className="min-w-0 flex-1 truncate text-muted">{splitLabel(s)}{c?.small && <span className="text-warn"> n={c.n}</span>}</span>
                  <span className="num font-medium text-fg">{c ? pc(c.acc) : "none"}</span>
                </div>
              );
            })}
          </div>
        </ChartTip>
      )}
    </div>
  );
}
