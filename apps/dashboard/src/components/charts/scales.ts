import { scaleLinear, scaleLog, scaleSymlog } from "d3-scale";
import type { XAxis } from "@/lib/pareto";

/** 1-2-5 ticks inside [lo, hi]. */
export function logTicks(lo: number, hi: number): number[] {
  const out: number[] = [];
  const start = Math.floor(Math.log10(Math.max(lo, 1e-9)));
  const end = Math.ceil(Math.log10(hi));
  for (let e = start; e <= end; e++) {
    for (const k of [1, 2, 5]) {
      const v = k * 10 ** e;
      if (v >= lo && v <= hi) out.push(+v.toPrecision(3));
    }
  }
  return out;
}

/** On narrow charts keep decade ticks (1, 10, 100) so labels do not collide. */
function thin(ticks: number[], width: number): number[] {
  if (width >= 420) return ticks;
  const lead = (t: number) => String(t).replace(/^0\.0*/, "")[0];
  const decades = ticks.filter((t) => t === 0 || lead(t) === "1");
  return decades.length >= 3 ? decades : ticks.filter((t) => t === 0 || lead(t) === "1" || lead(t) === "5");
}

export function makeXScale(axis: XAxis, values: number[], width: number) {
  const hasZero = values.some((v) => v <= 0);
  const lo = Math.min(...values, Infinity);
  const hi = Math.max(...values, 1e-6);
  if (axis === "params" || hasZero) {
    const s = scaleSymlog().constant(2).domain([0, hi * 1.15]).range([0, width]);
    const ticks = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000].filter((t) => t <= hi * 1.15);
    return { scale: s as (v: number) => number, ticks: thin(ticks, width) };
  }
  const s = scaleLog().domain([lo * 0.8, hi * 1.25]).range([0, width]);
  return { scale: s as (v: number) => number, ticks: thin(logTicks(lo * 0.8, hi * 1.25), width) };
}

export function makeYScale(values: number[], height: number) {
  const lo = Math.max(0, Math.floor((Math.min(...values, 1) - 0.04) * 10) / 10);
  const hi = Math.min(1, Math.ceil((Math.max(...values, 0) + 0.02) * 20) / 20);
  const s = scaleLinear().domain([lo, hi]).range([height, 0]);
  const ticks: number[] = [];
  const step = hi - lo > 0.4 ? 0.1 : 0.05;
  for (let v = lo; v <= hi + 1e-9; v += step) ticks.push(+v.toFixed(2));
  return { scale: s as (v: number) => number, ticks, domain: [lo, hi] as [number, number] };
}
