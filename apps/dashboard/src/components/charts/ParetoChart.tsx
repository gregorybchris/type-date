import { m } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { fmtBytes, fmtMs } from "@/lib/format";
import { frontPath, paretoFront, type AxisInfo, type Point, type XAxis, type YAxis } from "@/lib/pareto";
import { useSize } from "@/lib/useSize";
import { Marker } from "./Marker";
import { makeXScale, makeYScale } from "./scales";

interface LabelPos {
  dx: number;
  dy: number;
  anchor: "start" | "end" | "middle";
  text: string;
}

/** Greedy label placement. Front points go first. A label that fits nowhere is dropped (the tooltip still names the point). */
function placeLabels(items: Array<{ key: string; px: number; py: number; r: number; text: string; short: string; front: boolean }>, bounds: { w: number; h: number }): Map<string, LabelPos> {
  const out = new Map<string, LabelPos>();
  type Rect = [number, number, number, number];
  const used: Rect[] = items.map((i) => [i.px - i.r - 1, i.py - i.r - 1, i.px + i.r + 1, i.py + i.r + 1]);
  const hit = (a: Rect, b: Rect) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
  const order = [...items].sort((a, b) => Number(b.front) - Number(a.front) || a.px - b.px);
  for (const it of order) {
   for (const text of it.text === it.short ? [it.text] : [it.text, it.short]) {
    const wTxt = text.length * 6.3 + 2;
    const cands: Array<[number, number, LabelPos["anchor"]]> = [
      [it.r + 4, -it.r + 2, "start"],
      [it.r + 4, it.r + 10, "start"],
      [-(it.r + 4), -it.r + 2, "end"],
      [-(it.r + 4), it.r + 10, "end"],
      [0, -it.r - 5, "middle"],
      [0, it.r + 14, "middle"],
    ];
    for (const [dx, dy, anchor] of cands) {
      const x0 = anchor === "start" ? it.px + dx : anchor === "end" ? it.px + dx - wTxt : it.px - wTxt / 2;
      const rect: Rect = [x0, it.py + dy - 10, x0 + wTxt, it.py + dy + 3];
      if (rect[0] < -4 || rect[2] > bounds.w + 20 || rect[1] < -14 || rect[3] > bounds.h + 4) continue;
      if (used.some((u) => hit(rect, u))) continue;
      used.push(rect);
      out.set(it.key, { dx, dy, anchor, text });
      break;
    }
    if (out.has(it.key)) break;
   }
  }
  return out;
}

const MD = { top: 16, right: 24, bottom: 40, left: 62 };
const MS = { top: 24, right: 30, bottom: 38, left: 40 };

function fmtX(axis: XAxis, v: number): string {
  return axis === "size" ? fmtBytes(v * 1e3) : fmtMs(v);
}
const tickLabel = (_axis: XAxis, v: number) => `${v}`;

export function ParetoChart({
  points,
  xAxis,
  yAxis,
  xInfo,
  yInfo,
  onOpen,
  version,
  selected,
  height: heightProp = 420,
}: {
  points: Point[];
  xAxis: XAxis;
  yAxis: YAxis;
  xInfo: AxisInfo<XAxis>;
  yInfo: AxisInfo<YAxis>;
  onOpen: (runId: string) => void;
  /** Eval version shown in the axis caption. */
  version: string;
  selected?: string;
  height?: number;
}) {
  const [ref, { w }] = useSize<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  /** Tapped point on touch devices. Its tooltip has an Open button. */
  const [pin, setPin] = useState<string | null>(null);
  const touch = useRef(false);
  const M = w < 560 ? MS : MD;
  const height = w < 560 ? Math.min(heightProp, 340) : heightProp;
  const iw = Math.max(0, w - M.left - M.right);
  const ih = height - M.top - M.bottom;

  const front = useMemo(() => paretoFront(points), [points]);
  const frontKeys = useMemo(() => new Set(front.map((p) => p.runId)), [front]);
  const { x, y } = useMemo(() => {
    const xs = makeXScale(points.map((p) => p.x), iw);
    const ys = makeYScale(points.map((p) => p.y), ih);
    return { x: xs, y: ys };
  }, [points, xAxis, iw, ih]);
  const many = points.length > 20;
  const radius = (p: Point) => (p.library ? (many ? 5 : 6) : many ? 5 : 6.5);
  const labels = useMemo(() => {
    const wide = w >= 700;
    return placeLabels(
      points.map((p) => ({ key: p.runId, px: x.scale(p.x), py: y.scale(p.y), r: radius(p), text: p.label, short: p.label, front: frontKeys.has(p.runId) })),
      { w: iw, h: ih },
    );
  }, [points, x, y, frontKeys, iw, ih, w, many]);
  const d = useMemo(() => frontPath(front, x.scale, y.scale), [front, x, y]);
  const frontSig = front.map((p) => p.runId).join();
  const hp = points.find((p) => p.runId === (pin ?? hover));

  return (
    <div ref={ref} className="relative w-full" style={{ height }} onPointerLeave={() => {}}>
      {w > 0 && (
        <svg width={w} height={height} role="img" onPointerDown={(e) => { if (e.target === e.currentTarget) setPin(null); }} aria-label={`${yInfo.label} on ${version} against ${xInfo.label}`}>
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
            <text x={iw / 2} y={ih + 36} textAnchor="middle" fontSize={11.5} fill="var(--muted)">{xInfo.label} ({xInfo.unit}, log scale)</text>
            {w < 560 ? (
              <text x={-M.left + 6} y={-10} fontSize={11.5} fill="var(--muted)">{yInfo.label} ({version})</text>
            ) : (
              <text transform={`translate(${-M.left + 14},${ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={11.5} fill="var(--muted)">{yInfo.label} ({version})</text>
            )}

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

            {[...points].sort((a, b) => Number(frontKeys.has(a.runId)) - Number(frontKeys.has(b.runId))).map((p) => {
              const onFront = frontKeys.has(p.runId);
              const px = x.scale(p.x);
              const py = y.scale(p.y);
              const r = radius(p);
              const lab = labels.get(p.runId);
              const active = hover === p.runId || selected === p.runId || pin === p.runId;
              return (
                <m.g
                  key={p.runId}
                  initial={{ x: px, y: py, opacity: 0 }}
                  animate={{ x: px, y: py, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ cursor: "pointer", outline: "none" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.label}`}
                  onPointerDown={(e) => { touch.current = e.pointerType !== "mouse"; }}
                  onMouseEnter={() => !touch.current && setHover(p.runId)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(p.runId)}
                  onBlur={() => setHover(null)}
                  onClick={() => {
                    if (touch.current && pin !== p.runId) setPin(p.runId);
                    else onOpen(p.runId);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && onOpen(p.runId)}
                >
                  <circle r={Math.max(r + 6, 18)} fill="transparent" />
                  {(active || pin === p.runId) && <circle r={r + 5} fill="var(--accent)" opacity={0.14} />}
                  <Marker
                    kind={p.library ? "baseline" : "model"}
                    r={r}
                    fill={onFront ? "var(--accent)" : "var(--surface)"}
                    stroke={onFront ? "var(--accent)" : "var(--chart-dim)"}
                    opacity={onFront ? 0.92 : 1}
                  />
                  {lab && (
                    <text x={lab.dx} y={lab.dy} textAnchor={lab.anchor} fontSize={10.5} fontWeight={onFront ? 600 : 500} fill={onFront ? "var(--fg)" : "var(--muted)"} className="num" pointerEvents="none">
                      {lab.text}
                    </text>
                  )}
                </m.g>
              );
            })}
          </g>
        </svg>
      )}
      {hp && (
        <div
          className={`absolute z-10 w-56 rounded-card border border-border bg-surface p-3 text-[12px] shadow-pop ${pin ? "" : "pointer-events-none"}`}
          style={{
            left: M.left + x.scale(hp.x) + 14 + 224 > w ? Math.max(8, M.left + x.scale(hp.x) - 14 - 224) : M.left + x.scale(hp.x) + 14,
            top: Math.max(8, Math.min(height - 190, M.top + y.scale(hp.y) - 70)),
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-fg">{hp.label}</span>
            <span className="text-subtle">{hp.library ? "library" : "heuristic"}</span>
          </div>
          {hp.description && <div className="mt-0.5 line-clamp-3 text-[11.5px] text-muted">{hp.description}</div>}
          <div className="dotted-t my-2" />
          <div className="flex justify-between"><span className="text-muted">{yInfo.label} {version}</span><span className="num font-medium">{(hp.y * 100).toFixed(1)}%</span></div>
          <div className="flex justify-between"><span className="text-muted">{xInfo.label}</span><span className="num font-medium">{fmtX(xAxis, hp.x)}</span></div>
          <div className="mt-1.5 text-[11px] text-subtle">{frontKeys.has(hp.runId) ? "On the Pareto front" : "Dominated"}.{!pin && " Click to open."}</div>
          {pin && (
            <button onClick={() => onOpen(hp.runId)} className="mt-2 h-9 w-full cursor-pointer rounded-field bg-primary text-[13px] font-medium text-primary-fg">Open {hp.label}</button>
          )}
        </div>
      )}
    </div>
  );
}
