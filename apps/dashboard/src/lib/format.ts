import { resolveDsl, type Resolved } from "@type-date/core";

export const pct = (x: number, d = 1) => `${(x * 100).toFixed(d)}%`;

export function fmtBytes(b: number): string {
  if (b >= 1e6) return `${(b / 1e6).toFixed(b >= 1e8 ? 0 : 1)} MB`;
  if (b >= 1e3) return `${(b / 1e3).toFixed(b >= 1e5 ? 0 : 1)} kB`;
  return `${b} B`;
}

export function fmtParams(p: number): string {
  if (p === 0) return "none";
  if (p >= 1e9) return `${(p / 1e9).toFixed(1)}B`;
  if (p >= 1e6) return `${+(p / 1e6).toFixed(p >= 1e8 ? 0 : 1)}M`;
  return `${+(p / 1e3).toFixed(0)}k`;
}

export function fmtMs(ms: number): string {
  return ms < 10 ? `${ms.toFixed(2)} ms` : `${ms.toFixed(ms < 100 ? 1 : 0)} ms`;
}

export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, m! - 1, d!));
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function fmtTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hh = h! % 12 === 0 ? 12 : h! % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${h! >= 12 ? "PM" : "AM"}`;
}

const pt = (p?: { date?: string; time?: string }) =>
  p ? [p.date && fmtDate(p.date), p.time && fmtTime(p.time)].filter(Boolean).join(" ") : "";

/** One-line summary of a resolved result. */
export function fmtResolved(r: Resolved): string {
  if (r.kind === "none") return "none";
  if (r.kind === "recurrence" && r.recurrence) {
    const x = r.recurrence;
    const every = x.interval === 1 ? `every ${x.freq}` : `every ${x.interval}${x.freq}`;
    const days = x.days?.length ? ` ${x.days.join(",")}` : x.monthDays?.length ? ` d${x.monthDays.join(",")}` : "";
    const time = x.time ? ` ${fmtTime(x.time.start)}${x.time.end ? "-" + fmtTime(x.time.end) : ""}` : "";
    const lim = x.count ? ` x${x.count}` : x.until ? ` until ${fmtDate(x.until)}` : "";
    return `${every}${days}${time} from ${fmtDate(x.dtstart)}${lim}`;
  }
  const s = pt(r.start);
  const e = pt(r.end);
  return (e ? `${s} to ${e}` : s) + (r.ambiguous ? " (am/pm guessed)" : "");
}


/** Resolve a DSL line and format it. Returns "invalid" if the resolver throws. */
export function resolveText(dsl: string, today: string): string {
  try {
    return fmtResolved(resolveDsl(dsl, { today }));
  } catch {
    return "invalid";
  }
}
