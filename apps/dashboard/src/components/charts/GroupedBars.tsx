import { scaleLinear } from "d3-scale";
import { useMemo, useState } from "react";
import { cellFor, pc, splitLabel } from "@/lib/compare";
import { useSize } from "@/lib/useSize";
import type { Run } from "@/lib/types";
import { ChartTip } from "./ChartTip";

const M = { top: 12, right: 12, bottom: 78, left: 40 };
const HEIGHT = 340;

/** Accuracy per split, one bar per engine in each group. Tap a group to list every engine. */
export function GroupedBars({ runs, splits, version, colors, min }: { runs: Run[]; splits: string[]; version: string; colors: Map<string, string>; min: number }) {
  const [ref, { w }] = useSize<HTMLDivElement>();
  const [sel, setSel] = useState<string | null>(null);
  const k = Math.max(1, runs.length);
  const groupW = k * 6 + 16;
  const need = M.left + M.right + splits.length * groupW;
  const width = Math.max(w, need);
  const iw = width - M.left - M.right;
  const ih = HEIGHT - M.top - M.bottom;
  const gw = splits.length ? iw / splits.length : iw;
  const bw = Math.max(2, Math.min(14, (gw - 14) / k - 1));
  const y = useMemo(() => scaleLinear().domain([min, 1]).range([ih, 0]), [min, ih]);
  const ticks = useMemo(() => {
    const step = min >= 0.5 ? 0.1 : 0.2;
    const t: number[] = [];
    for (let v = min; v <= 1.0001; v += step) t.push(+v.toFixed(2));
    return t;
  }, [min]);
  const selIdx = sel ? splits.indexOf(sel) : -1;
  const rows = sel
    ? runs.map((r) => ({ r, c: cellFor(r, version, sel) })).sort((a, b) => (b.c?.acc ?? -1) - (a.c?.acc ?? -1))
    : [];

  return (
    <div ref={ref} className="relative w-full overflow-x-auto" style={{ height: HEIGHT }}>
      {w > 0 && (
        <svg width={width} height={HEIGHT} role="img" aria-label={`Resolved accuracy per split on eval ${version}, one bar per engine`}>
          <g transform={`translate(${M.left},${M.top})`}>
            {ticks.map((t) => (
              <g key={t} transform={`translate(0,${y(t)})`}>
                <line x2={iw} stroke="var(--chart-grid)" strokeDasharray="1 4" strokeLinecap="round" />
                <text x={-8} dy="0.32em" textAnchor="end" className="num" fontSize={11} fill="var(--subtle)">{Math.round(t * 100)}%</text>
              </g>
            ))}
            {splits.map((s, gi) => {
              const gx = gi * gw;
              const x0 = gx + (gw - (k * bw + (k - 1))) / 2;
              const on = sel === s;
              return (
                <g key={s}>
                  {on && <rect x={gx + 1} y={0} width={gw - 2} height={ih} rx={6} fill="var(--accent)" opacity={0.08} />}
                  {runs.map((r, i) => {
                    const c = cellFor(r, version, s);
                    const bx = x0 + i * (bw + 1);
                    if (!c) {
                      return <line key={r.config.id} x1={bx + bw / 2} x2={bx + bw / 2} y1={ih - 3} y2={ih} stroke="var(--warn)" strokeWidth={1.5} opacity={0.7}><title>{`${r.config.id}: no result on ${s}`}</title></line>;
                    }
                    if (c.acc < min) {
                      return <path key={r.config.id} d={`M${bx},${ih - 7}L${bx + bw},${ih - 7}L${bx + bw / 2},${ih - 1}Z`} fill="var(--danger)"><title>{`${r.config.id}: ${pc(c.acc)}, below the axis`}</title></path>;
                    }
                    const top = y(c.acc);
                    return <rect key={r.config.id} x={bx} y={top} width={bw} height={Math.max(1, ih - top)} rx={Math.min(2, bw / 2)} fill="transparent" style={{ fill: colors.get(r.config.id) }} opacity={c.small ? 0.55 : 1} />;
                  })}
                  <text transform={`translate(${gx + gw / 2},${ih + 12}) rotate(-38)`} textAnchor="end" fontSize={11} fill={on ? "var(--fg)" : "var(--muted)"} fontWeight={on ? 600 : 400}>{splitLabel(s)}</text>
                  <rect x={gx} y={-M.top} width={gw} height={ih + M.top + M.bottom - 6} fill="transparent" style={{ cursor: "pointer" }} onPointerEnter={(e) => e.pointerType === "mouse" && setSel(s)} onClick={() => setSel(on ? null : s)} />
                </g>
              );
            })}
            <line x2={iw} y1={ih} y2={ih} stroke="var(--border-strong)" />
          </g>
        </svg>
      )}
      {sel && selIdx >= 0 && (
        <ChartTip left={M.left + (selIdx + 0.5) * gw} top={24} bound={width} onClose={() => setSel(null)} width={236}>
          <div className="font-semibold text-fg">{sel} <span className="font-normal text-subtle">{version}</span></div>
          <div className="num text-[11px] text-subtle">n={rows.find((x) => x.c)?.c?.n.toLocaleString() ?? "-"}{rows.some((x) => x.c?.small) && ", under 30 rows: unreliable"}</div>
          <div className="dotted-t my-1.5" />
          <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto">
            {rows.map(({ r, c }) => (
              <div key={r.config.id} className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-sm" style={{ background: colors.get(r.config.id) }} />
                <span className="min-w-0 flex-1 truncate text-muted">{r.config.id}</span>
                <span className="num font-medium text-fg">{c ? pc(c.acc) : "none"}</span>
              </div>
            ))}
          </div>
        </ChartTip>
      )}
    </div>
  );
}
