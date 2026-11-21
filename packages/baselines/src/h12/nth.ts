// Nth weekdays joined by "and": "every third tuesday and second monday of each month", "1st & 3rd saturday monthly".
import { FULL, PLURAL, WD_SRC, canonRec, code, type P } from "./common";

const ORD_SRC = "(first|frist|second|seccond|secound|third|thrid|fourth|forth|fourh|fifth|last|1st|2nd|3rd|4th|5th)";
const ORD: Record<string, number> = { first: 1, frist: 1, "1st": 1, second: 2, seccond: 2, secound: 2, "2nd": 2, third: 3, thrid: 3, "3rd": 3, fourth: 4, forth: 4, fourh: 4, "4th": 4, fifth: 5, "5th": 5, last: -1 };
const SEP = "\\s*(?:,|;|&|/|\\+|\\band\\b|\\bn\\b|\\bplus\\b)\\s*";
const MONTH_CUE = /\b(?:monthly|(?:a|per|each|every|the) month|of the month|of every month|of each month)\b/;

export function nthConjunction(text: string, p: P): string | null {
  const group = new RegExp(`(?:the\\s+)?((?:${ORD_SRC})(?:${SEP}(?:the\\s+)?${ORD_SRC})*)\\s+${WD_SRC}s?\\b`, "g");
  const hits = [...text.matchAll(group)];
  if (!hits.length) return null;
  for (let i = 1; i < hits.length; i++) {
    const gap = text.slice(hits[i - 1]!.index! + hits[i - 1]![0].length, hits[i]!.index!);
    if (!new RegExp(`^${SEP}(?:every\\s+|each\\s+)?$`).test(gap)) return null;
  }
  const items: { wd: string; k: number }[] = [];
  for (const h of hits) {
    const ks = [...h[1]!.matchAll(new RegExp(ORD_SRC, "g"))].map((m) => ORD[m[1]!]!);
    const wd = code(h[0].match(new RegExp(`${WD_SRC}s?\\b$`))![1]!);
    for (const k of ks) items.push({ wd, k });
  }
  const wds = new Set(items.map((i) => i.wd));
  const cue = MONTH_CUE.test(text) || /\b(?:every|each)\b/.test(text);
  const plural = hits.some((h) => PLURAL.test(h[0]));
  // several ordinals of one weekday are monthly without a cue; different weekdays need a cue; one ordinal needs a plural weekday
  if (items.length === 1 && (!plural || /\b(?:of|in)\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(text))) return null;
  if (items.length > 1 && wds.size > 1 && !cue && !plural) return null;
  if (items.length === 1 && cue && !MONTH_CUE.test(text) && /\bevery\b/.test(text) && !plural) return null;
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
  return canonRec(toks.join(" "));
}
