// chrono: chrono-node (English casual parser) plus an adapter to our DSL.
// chrono returns absolute dates for a reference instant. The adapter turns them back into
// relative DSL forms using chrono's known/implied components and the matched text.
import { casual } from "chrono-node";
import type { ParsedResult, ParsingComponents } from "chrono-node";
import { makeEngine, norm } from "./engine";

const WD = ["su", "mo", "tu", "we", "th", "fr", "sa"];
const p2 = (n: number) => String(n).padStart(2, "0");
const NUMW: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const REC = /\b(every|each|daily|weekly|monthly|yearly|annually|weekdays?|biweekly|everyday|alternate)\b/;
// Chrono has no recurrence. Any text with a recurrence cue gets `x`.

interface Pt {
  date?: string;
  time?: string;
}

function dayDiff(c: ParsingComponents, ref: Date): number {
  const a = Date.UTC(c.get("year")!, c.get("month")! - 1, c.get("day")!);
  const b = Date.UTC(ref.getFullYear(), ref.getMonth(), ref.getDate());
  return Math.round((a - b) / 86400000);
}

function datePart(c: ParsingComponents, text: string, ref: Date, input: string): string | undefined {
  let m: RegExpMatchArray | null;
  if ((m = text.match(/\b(this|next|last|previous|coming)\s+(week|month|year)\b/))) {
    const n = m[1] === "this" ? 0 : m[1] === "next" || m[1] === "coming" ? 1 : -1;
    return m[2]!.charAt(0).toUpperCase() + (n >= 0 ? "+" : "") + n;
  }
  if (/\bweekend\b/.test(text)) return "sa>su";
  if ((m = text.match(/\b(\d+|an?|one|two|three|four|five|six|seven|eight|nine|ten)\s*(day|week|month|year)s?\s*(ago|from now|later|from today)?/)) && (m[3] || /\bin\b/.test(text))) {
    const n = /^\d/.test(m[1]!) ? +m[1]! : NUMW[m[1]!]!;
    return `${m[3] === "ago" ? "-" : "+"}${n}${m[2]![0]}`;
  }
  const full = c.isCertain("day") && c.isCertain("month");
  if (/\b(today|tomorrow|tmrw|tmr|yesterday|tonight|now)\b/.test(text) && c.isCertain("day")) {
    const n = dayDiff(c, ref);
    return `${n >= 0 ? "+" : ""}${n}d`;
  }
  if (c.isCertain("weekday") && !full) {
    const wd = WD[c.get("weekday")!]!;
    if (/\b(next|nxt)\b/.test(input)) return wd + "+1";
    if (/\b(last|past|previous)\b/.test(input)) return wd + "-1";
    return wd;
  }
  if (full) {
    const md = `${p2(c.get("month")!)}-${p2(c.get("day")!)}`;
    return c.isCertain("year") ? `${c.get("year")}-${md}` : md;
  }
  if (c.isCertain("month")) return `M@${p2(c.get("month")!)}`;
  return undefined;
}

function timePart(c: ParsingComponents, text: string): string | undefined {
  if (!c.isCertain("hour")) return undefined;
  const h = c.get("hour")!;
  const mi = c.get("minute") ?? 0;
  if (c.isCertain("meridiem") || h > 12 || h === 0 || /\b0\d:\d\d/.test(text) || /noon|midnight|midday/.test(text)) return `${p2(h)}:${p2(mi)}`;
  const h12 = h % 12 || 12;
  return mi ? `${h12}:${p2(mi)}?` : `${h12}?`;
}

function point(c: ParsingComponents, text: string, ref: Date, input: string): Pt {
  return { date: datePart(c, text, ref, input), time: timePart(c, text) };
}

/** "5 to 9am": the end meridiem also applies to a start hour without one (flipped if start >= end). */
function inheritMeridiem(a: ParsingComponents, b: ParsingComponents, pa: Pt): void {
  if (!pa.time?.endsWith("?") || !b.isCertain("meridiem") || !b.isCertain("hour")) return;
  const h = a.get("hour")! % 12;
  const end = b.get("hour")!;
  let h24 = h + (b.get("meridiem") === 1 ? 12 : 0);
  if (h24 >= end) h24 = h + (b.get("meridiem") === 1 ? 0 : 12);
  pa.time = `${p2(h24)}:${p2(a.get("minute") ?? 0)}`;
}

export function chronoToDsl(text: string, today: string): string {
  text = norm(text);
  if (!text || REC.test(text)) return "x";
  const [y, m, d] = today.split("-").map(Number) as [number, number, number];
  const ref = new Date(y, m - 1, d, 12, 0, 0);
  const results: ParsedResult[] = casual.parse(text, ref, { forwardDate: true });
  const r0 = results[0];
  if (!r0) return "x";
  const r = r0 as unknown as { text: string; start: ParsingComponents; end?: ParsingComponents };
  if (r.text.length < 0.6 * text.replace(/[^\w:]/g, "").length) return "x";
  const a = point(r.start, r.text, ref, text);
  const b = r.end ? point(r.end, r.text, ref, text) : undefined;
  if (r.end) inheritMeridiem(r.start, r.end, a);
  const hasDate = !!(a.date || b?.date);
  const hasTime = !!(a.time || b?.time);
  if (!hasDate && !hasTime) return "x";
  const mode = hasDate && hasTime ? "dt" : hasDate ? "d" : "t";
  const fmt = (p: Pt, other?: Pt) => [p.date && p.date !== other?.date ? p.date : "", p.time ?? ""].filter(Boolean).join(" ");
  if (!b) return `${mode} ${fmt(a)}`;
  const same = (a.date ?? "") === (b.date ?? "");
  return `${mode} ${fmt(a)}>${same ? b.time ?? b.date : fmt(b)}`;
}

export const chronoEngine = makeEngine("chrono", (text, today) => chronoToDsl(text, today ?? "2026-11-03"));
export default chronoEngine;
