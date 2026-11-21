// Shared patterns for the h12 rules.
export type P = (s: string) => string;

export const WD_SRC = "(sun(?:day)?|mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nesday|s)?|thu(?:r(?:s(?:day)?)?|rs)?|thr|fri(?:day)?|sat(?:urday)?)";
export const WD_ORDER = ["mo", "tu", "we", "th", "fr", "sa", "su"];
export const code = (w: string) => w.slice(0, 2);
export const FULL: Record<string, string> = { mo: "monday", tu: "tuesday", we: "wednesday", th: "thursday", fr: "friday", sa: "saturday", su: "sunday" };
export const byWeekday = (a: string, b: string) => WD_ORDER.indexOf(a) - WD_ORDER.indexOf(b);

/** A weekday word is plural when it ends in "days" or is a 3-letter form plus s ("mons", "weds"). */
export const PLURAL = /\b(?:mon|tues?|wednes|thurs?|fri|satur|sun)days\b|\b(?:mons|fris|sats|suns)\b/;
export const RECURRENCE_CUE = /\b(?:every|each|weekly|biweekly|bi-weekly|fortnightly|alternate)\b/;

const START_TOKEN = /^s(?:\d|[+-]\d|[MWYQ][+@-]|D[@\d]|E[+@-]|(?:mo|tu|we|th|fr|sa|su)(?:[+-]\d|[#&@]|$)|(?:mo|tu|we|th|fr)$)/;
/** A recurrence start bound token (`sM@06`, `s03-03`, `smo`, `ssa`), not a weekday list like `sa,su` or an nth token like `su#1`. */
export const isStartTok = (t: string) => START_TOKEN.test(t) && !/^su#|^sa#/.test(t) && !/^s[ua],/.test(t);

/** Canonical recurrence token order: frequency, days and filters, count, until, time, start. */
export function canonRec(dsl: string): string {
  const t = dsl.split(" ");
  if (t[1] !== "R" || t.length < 4) return dsl;
  const cls = (x: string) => (isStartTok(x) ? 4 : /^n\d+$/.test(x) ? 1 : /^u\S/.test(x) ? 2 : /[:?>]/.test(x) ? 3 : 0);
  const head = t.slice(0, 3);
  const rest = t.slice(3).map((x, i) => ({ x, i, c: cls(x) }));
  rest.sort((a, b) => a.c - b.c || a.i - b.i);
  return [...head, ...rest.map((r) => r.x)].join(" ");
}
