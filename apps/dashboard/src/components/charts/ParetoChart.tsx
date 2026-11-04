import { m } from "motion/react";
import { scaleSqrt } from "d3-scale";
import { useMemo, useState } from "react";
import { fmtMs } from "@/lib/format";
import { frontPath, paretoFront, type AxisInfo, type Point, type XAxis, type YAxis } from "@/lib/pareto";
import { useSize } from "@/lib/useSize";
import { Marker } from "./Marker";
import { makeXScale, makeYScale } from "./scales";

const M = { top: 16, right: 24, bottom: 40, left: 62 };

function fmtX(axis: XAxis, v: number): string {
  if (axis === "latency") return fmtMs(v);
  if (axis === "memory") return `${+v.toFixed(0)} MB`;
  if (axis === "size") return v >= 1 ? `${+v.toFixed(1)} MB` : `${+(v * 1000).toFixed(0)} kB`;
  return v === 0 ? "none" : `${+v.toFixed(1)}M`;
}
const tickLabel = (axis: XAxis, v: number) => (axis === "latency" ? `${v}` : axis === "size" ? (v >= 1 ? `${v}` : `${v * 1000}k`) : `${v}`);

export function ParetoChart({
  points,
  xAxis,
  yAxis,
  xInfo,
  yInfo,
  onOpen,
  selected,
  height = 420,
}: {
  points: Point[];
  xAxis: XAxis;
  yAxis: YAxis;
  xInfo: AxisInfo<XAxis>;
  yInfo: AxisInfo<YAxis>;
  onOpen: (runId: string) => void;
  selected?: string;
  height?: number;
}) {
  const [ref, { w }] = useSize<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const iw = Math.max(0, w - M.left - M.right);
  const ih = height - M.top - M.bottom;

  const front = useMemo(() => paretoFront(points), [points]);
  const frontKeys = useMemo(() => new Set(front.map((p) => p.key)), [front]);
  const { x, y } = useMemo(() => {
    const xs = makeXScale(xAxis, points.map((p) => p.x), iw);
    const ys = makeYScale(points.map((p) => p.y), ih);
    return { x: xs, y: ys };
  }, [points, xAxis, iw, ih]);
  const rScale = useMemo(() => scaleSqrt().domain([0, 500]).range([4.5, 11]), []);
  const d = useMemo(() => frontPath(front, x.scale, y.scale), [front, x, y]);
  const frontSig = front.map((p) => p.key).join();
  const hp = points.find((p) => p.key === hover);

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {w > 0 && (
        <svg width={w} height={height} role="img" aria-label={`${yInfo.label} against ${xInfo.label}`}>
          <g transform={`translate(${M.left},${M.top})`}>
            {y.ticks.map((t) => (
              <g key={t} transform={`translate(0,${y.scale(t)})`}>
                <line x2={iw} stroke="var(--chart-grid)" strokeDasharray="1 4" strokeLinecap="round" />
                <text x={-10} dy="0.32em" textAnchor="end" className="num" fontSize={11} fill="var(--subtle)">{Math.round(t * 100)}%</text>
              </g>
            ))}
            {x.ticks.map((t) => (
              <g key={t} transform={`translate(${x.scale(t)},${ih})`}>
                <line y2={5} stroke="var(--border-strong)" />
                <text y={19} textAnchor="middle" className="num" fontSize={11} fill="var(--subtle)">{tickLabel(xAxis, t)}</text>
              </g>
            ))}
            <line x2={iw} y1={ih} y2={ih} stroke="var(--border-strong)" />
            <text x={iw / 2} y={ih + 36} textAnchor="middle" fontSize={11.5} fill="var(--muted)">{xInfo.label} ({xInfo.unit}{xAxis !== "params" ? ", log scale" : ""})</text>
            <text transform={`translate(-50,${ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={11.5} fill="var(--muted)">{yInfo.label}</text>

            {front.length > 1 && (
              <m.path
                key={frontSig}
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.75}
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9, d }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            {[...points].sort((a, b) => Number(frontKeys.has(a.key)) - Number(frontKeys.has(b.key))).map((p) => {
              const onFront = frontKeys.has(p.key);
              const px = x.scale(p.x);
              const py = y.scale(p.y);
              const r = p.kind === "baseline" ? 6 : rScale(p.paramsM);
              const active = hover === p.key || selected === p.runId;
              return (
                <m.g
                  key={p.key}
                  initial={{ x: px, y: py, opacity: 0 }}
                  animate={{ x: px, y: py, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ cursor: "pointer", outline: "none" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`exp ${p.number}, ${p.engine} ${p.backend}`}
                  onMouseEnter={() => setHover(p.key)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(p.key)}
                  onBlur={() => setHover(null)}
                  onClick={() => onOpen(p.runId)}
                  onKeyDown={(e) => e.key === "Enter" && onOpen(p.runId)}
                >
                  {active && <circle r={r + 5} fill="var(--accent)" opacity={0.14} />}
                  <Marker
                    kind={p.kind}
                    r={r}
                    fill={onFront ? "var(--accent)" : "var(--surface)"}
                    stroke={onFront ? "var(--accent)" : "var(--chart-dim)"}
                    opacity={onFront ? 0.92 : 1}
                  />
                  <text x={r + 4} y={-r - 1} fontSize={10.5} fontWeight={onFront ? 600 : 500} fill={onFront ? "var(--fg)" : "var(--muted)"} className="num" pointerEvents="none">
                    {p.label}
                  </text>
                </m.g>
              );
            })}
          </g>
        </svg>
      )}
      {hp && (
        <div
          className="pointer-events-none absolute z-10 w-52 rounded-card border border-border bg-surface p-3 text-[12px] shadow-pop"
          style={{
            left: M.left + x.scale(hp.x) + 14 + 208 > w ? Math.max(8, M.left + x.scale(hp.x) - 14 - 208) : M.left + x.scale(hp.x) + 14,
            top: Math.max(8, M.top + y.scale(hp.y) - 70),
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-fg">exp-{String(hp.number).padStart(3, "0")}</span>
            <span className="text-subtle">{hp.kind === "baseline" ? "baseline" : "model"}</span>
          </div>
          <div className="mt-0.5 text-muted">{hp.engine} {hp.backend !== "-" && `/ ${hp.backend}`}</div>
          <div className="dotted-t my-2" />
          <div className="flex justify-between"><span className="text-muted">{yInfo.label}</span><span className="num font-medium">{(hp.y * 100).toFixed(1)}%</span></div>
          <div className="flex justify-between"><span className="text-muted">{xInfo.label}</span><span className="num font-medium">{fmtX(xAxis, hp.x)}</span></div>
          <div className="mt-1.5 text-[11px] text-subtle">{frontKeys.has(hp.key) ? "On the Pareto front" : "Dominated"}. Click to open.</div>
        </div>
      )}
    </div>
  );
}
