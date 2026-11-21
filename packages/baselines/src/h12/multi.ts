// h12 rules, loaded on demand by src/h12.ts. Each rule rewrites the text so h11 can parse the shared part (bounds, time of day,
// noise words), then puts the multi-part form back into h11's DSL line.
import { normalize } from "../h8/normalize";
import { parseH11 } from "../h11";
import { withBounds } from "./bounds";

const WD_SRC = "(sun(?:day)?|mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nesday|s)?|thu(?:r(?:s(?:day)?)?|rs)?|fri(?:day)?|sat(?:urday)?)";
const WD_ORDER = ["mo", "tu", "we", "th", "fr", "sa", "su"];
const code = (w: string) => w.slice(0, 2);
const FULL: Record<string, string> = { mo: "monday", tu: "tuesday", we: "wednesday", th: "thursday", fr: "friday", sa: "saturday", su: "sunday" };

const ORD_SRC = "(first|second|third|fourth|fifth|last|1st|2nd|3rd|4th|5th)";
const ORD: Record<string, number> = { first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5, last: -1 };
const SEP = "\\s*(?:,|;|&|\\band\\b|\\bplus\\b)\\s*";

/** Several nth weekdays joined by "and": "every third tuesday and second monday of each month". */
function nthConjunction(text: string, p: (s: string) => string): string | null {
  const group = new RegExp(`(?:the\\s+)?((?:${ORD_SRC})(?:${SEP}(?:the\\s+)?${ORD_SRC})*)\\s+${WD_SRC}s?\\b`, "g");
  const hits = [...text.matchAll(group)];
  if (hits.length < 2) return null;
  // the groups must be one run joined by separators
  for (let i = 1; i < hits.length; i++) {
    const gap = text.slice(hits[i - 1]!.index! + hits[i - 1]![0].length, hits[i]!.index!);
    if (!new RegExp(`^${SEP}(?:every\\s+|each\\s+)?$`).test(gap)) return null;
  }
  const items: { wd: string; k: number }[] = [];
  for (const h of hits) {
    const ks = [...h[1]!.matchAll(new RegExp(ORD_SRC, "g"))].map((m) => ORD[m[1]!]!);
    const wd = code(h[hits.length ? 0 : 0]!.match(new RegExp(`${WD_SRC}s?\\b$`))![1]!);
    for (const k of ks) items.push({ wd, k });
  }
  if (new Set(items.map((i) => i.wd)).size < 2) return null; // one weekday: h11 handles it
  const cue = /\b(?:every|each|monthly|a month|per month|of the month|of every month|of each month)\b/.test(text);
  if (!cue) return null;
  const first = hits[0]!;
  const last = hits[hits.length - 1]!;
  const pre = text.slice(0, first.index!).replace(/\b(?:every|each|on|the)\s*$/, " ");
  const post = text
    .slice(last.index! + last[0].length)
    .replace(/\b(?:of|in)\s+(?:every|each|the|every single)\s+month\b/, " ")
    .replace(/\b(?:every|each)\s+month\b|\bmonthly\b|\ba month\b|\bper month\b/, " ");
  const stub = `${pre} first ${FULL[items[0]!.wd]} of every month ${post}`.replace(/\s+/g, " ").trim();
  const out = p(stub);
  const tok = `${items[0]!.wd}#1`;
  const toks = out.split(" ");
  const i = toks.indexOf(tok);
  if (toks[1] !== "R" || toks[2] !== "m/1" || i < 0) return null;
  toks[i] = items.map((x) => `${x.wd}#${x.k}`).join(",");
  return toks.join(" ");
}

const TIME_ATOM = "(?:noon|midnight|\\d{1,2}(?:[:.]\\d{2})?\\s*(?:am|pm|a|p)?\\b)";
const TIME_SRC = `${TIME_ATOM}(?:\\s*(?:-|to|until|till)\\s*${TIME_ATOM})?`;

/** A separate time per weekday: "tuesdays at 1:30 and thursdays at 3". */
function dayTimes(text: string, p: (s: string) => string): string | null {
  const clause = new RegExp(`(?:(?:every|each)\\s+)?${WD_SRC}(s)?\\s*(?:at|@|from)?\\s*(${TIME_SRC})`, "g");
  const hits = [...text.matchAll(clause)];
  if (hits.length < 2) return null;
  for (let i = 1; i < hits.length; i++) {
    const gap = text.slice(hits[i - 1]!.index! + hits[i - 1]![0].length, hits[i]!.index!);
    if (!new RegExp(`^(?:${SEP})?$`).test(gap)) return null;
  }
  const wds = hits.map((h) => code(h[1]!));
  if (new Set(wds).size !== wds.length) return null;
  // a recurrence needs a cue: every, each, weekly, or a plural weekday
  const plural = hits.some((h) => h[2] === "s" && !/(?:tues|weds|thurs)$/.test(h[0].replace(/\s.*$/, "")));
  if (!plural && !/\b(?:every|each|weekly|biweekly|fortnightly)\b/.test(text)) return null;
  const times: string[] = [];
  for (const h of hits) {
    const t = p(`every ${FULL[code(h[1]!)]} at ${h[3]}`).match(/^dt R w\/1 \w\w (\S+)$/);
    if (!t) return null;
    times.push(t[1]!);
  }
  const first = hits[0]!;
  const last = hits[hits.length - 1]!;
  const days = [...wds].sort((a, b) => WD_ORDER.indexOf(a) - WD_ORDER.indexOf(b));
  const names = days.map((d) => FULL[d]).join(" and ");
  const pre = text.slice(0, first.index!);
  const post = text.slice(last.index! + last[0].length);
  const lead = /\b(?:every|each)(?:\s+(?:other|2nd|second|3rd|third|4th|fourth))?\s*$/.test(pre) ? "" : "every ";
  const stub = `${pre} ${lead}${names} ${post}`.replace(/\s+/g, " ").trim();
  const out = p(stub);
  const toks = out.split(" ");
  if (toks[0] !== "d" || toks[1] !== "R" || !/^w\/\d+$/.test(toks[2]!) || toks[3] !== days.join(",")) return null;
  toks[0] = "dt";
  if (new Set(times).size === 1) {
    const si = toks.findIndex((t, j) => j > 3 && /^s(?!a$|u$)\S+/.test(t));
    toks.splice(si < 0 ? toks.length : si, 0, times[0]!);
  } else {
    const byDay = new Map(wds.map((w, i) => [w, times[i]!]));
    toks[3] = days.map((d) => `${d}@${byDay.get(d)}`).join(",");
  }
  return toks.join(" ");
}

export const runH12 = (text: string, today?: string): string => {
  const p0 = (s: string) => parseH11(s, today);
  // a bound-aware parse: start and until clauses are cut out, the skeleton is parsed, the bounds are put back
  const p = (s: string) => withBounds(s, p0) ?? p0(s);
  const nz = normalize(text.toLowerCase().replace(/\s+/g, " ").trim()).toLowerCase();
  return nthConjunction(nz, p) ?? dayTimes(nz, p) ?? withBounds(nz, p0) ?? p0(text);
};
