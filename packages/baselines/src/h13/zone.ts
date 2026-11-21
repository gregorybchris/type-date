// h13 zone layer: finds the time zone in the text, cuts conversions, lets h12 parse the rest, appends `@ZONE`.
// Rules: specs/dsl.md, "Time zones". Tables: src/h13/zones.json (rendered in specs/tz-zones.md).
import zones from "./zones.json";

export interface ZoneContext {
  /** The user's IANA zone, for example from `Intl.DateTimeFormat().resolvedOptions().timeZone`. */
  zone?: string;
  /** The user's locale, for example `navigator.language`. */
  locale?: string;
}

const ABBR = zones.abbr as Record<string, string[]>;
const COUNTRY = zones.country as Record<string, string>;
const NAMES = zones.names as Record<string, string>;
const CITIES = zones.cities as Record<string, string>;

const COUNTRY_WORDS: Record<string, RegExp> = {
  US: /\b(?:us|usa|u\.s\.|united states|america|american)\b/,
  CN: /\b(?:china|chinese|beijing|shanghai|prc)\b/,
  CU: /\b(?:cuba|cuban|havana)\b/,
  AU: /\b(?:australia|australian|sydney|melbourne|aus)\b/,
  PH: /\b(?:philippines?|filipino|manila|pinoy)\b/,
  CA: /\b(?:canada|canadian|halifax|atlantic)\b/,
  SA: /\b(?:saudi|arabia|arabian|riyadh)\b/,
  GB: /\b(?:british|britain|uk|u\.k\.|london|england)\b/,
  BD: /\b(?:bangladesh|dhaka)\b/,
  IN: /\b(?:india|indian|mumbai|delhi|kolkata|bangalore|chennai)\b/,
  IE: /\b(?:ireland|irish|dublin|eire)\b/,
  IL: /\b(?:israel|israeli|jerusalem|tel aviv)\b/,
  PE: /\bperu\b/,
};

// ---------- zone names ----------
let ianaByLower: Map<string, string> | null = null;
function canonicalIana(raw: string): string {
  const low = raw.toLowerCase();
  if (!ianaByLower) {
    ianaByLower = new Map();
    try {
      for (const z of (Intl as unknown as { supportedValuesOf(k: string): string[] }).supportedValuesOf("timeZone")) ianaByLower.set(z.toLowerCase(), z);
    } catch {
      /* no Intl.supportedValuesOf */
    }
  }
  return ianaByLower.get(low) ?? low.replace(/(^|[/_-])([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
}

function etcOffset(raw: string): string | null {
  const m = raw.match(/^etc\/gmt([+-])(\d{1,2})$/i);
  return m ? `${m[1] === "+" ? "-" : "+"}${m[2]!.padStart(2, "0")}:00` : null; // Etc/GMT+8 is UTC-8
}

function fmtOffset(sign: string, h: string, m = "00"): string | null {
  if (+h > 14 || +m > 59) return null;
  if (+h === 0 && +m === 0) return "UTC"; // a zero offset is UTC
  return `${sign}${h.padStart(2, "0")}:${m}`;
}

// ---------- ambiguity ----------
const ABBR_LOCALES = ["en-US", "en-GB", "en-AU", "en-IN", "en-CA", "en-IE", "en-NZ"];
const hasAbbrCache = new Map<string, boolean>();
/** Does this IANA zone print `abbr` as its short name in some English locale, in winter or summer? */
function zoneHasAbbr(zone: string, abbr: string): boolean {
  const key = `${zone}|${abbr}`;
  const hit = hasAbbrCache.get(key);
  if (hit !== undefined) return hit;
  let ok = false;
  try {
    for (const loc of ABBR_LOCALES) {
      for (const d of [new Date("2026-01-15T12:00:00Z"), new Date("2026-07-15T12:00:00Z")]) {
        const part = new Intl.DateTimeFormat(loc, { timeZone: zone, timeZoneName: "short" }).formatToParts(d).find((p) => p.type === "timeZoneName");
        if (part?.value === abbr) ok = true;
      }
    }
  } catch {
    /* unknown zone */
  }
  hasAbbrCache.set(key, ok);
  return ok;
}

function regionOf(locale: string | undefined): string | undefined {
  if (!locale) return undefined;
  try {
    return new Intl.Locale(locale).maximize().region;
  } catch {
    return undefined;
  }
}

/** The zone an abbreviation means: a hint word in the text, then the user's zone, then the locale's region, then the default. */
function pickAbbr(abbr: string, text: string, ctx: ZoneContext): string {
  const cands = ABBR[abbr]!;
  if (cands.length === 1) return cands[0]!;
  for (const z of cands) {
    const cc = COUNTRY[z];
    if (cc && COUNTRY_WORDS[cc]?.test(text)) return z;
  }
  if (ctx.zone) {
    if (cands.includes(ctx.zone)) return ctx.zone;
    if (zoneHasAbbr(ctx.zone, abbr)) return ctx.zone;
  }
  const region = regionOf(ctx.locale);
  if (region) {
    const z = cands.find((c) => COUNTRY[c] === region);
    if (z) return z;
  }
  return cands[0]!;
}

// ---------- mentions ----------
interface Mention {
  start: number;
  end: number;
  zone: string;
  /** a zone or name that needs a clock time next to it */
  loose: boolean;
}

const CLOCK_BEFORE = /(?:\d(?:\s*[ap]\.?m\.?)?|noon|midnight|\b[ap]\.?m\.?|\bhou?rs?)[\s,(\[\-:@]*$/;
const CLOCK_BEFORE_IN = /(?:\d(?:\s*[ap]\.?m\.?)?|noon|midnight)\s+in\s+$/;
const CLOCK_AFTER = /^[\s:,\-)\]@]*(?:\d{1,2}(?::\d{2})?(?!\d)|noon|midnight)/;
const BLOCKED_AFTER = /^\s+(?:rim|ocean|park|market|team|street|st\b|avenue|ave\b|view|dew|union|city|station|office|europe|village|coast|beach|shore|bridge|square|time zone|zone)/;
const adjacent = (t: string, m: { start: number; end: number }) => CLOCK_BEFORE.test(t.slice(0, m.start)) || CLOCK_BEFORE_IN.test(t.slice(0, m.start)) || CLOCK_AFTER.test(t.slice(m.end));

const ABBR_KEYS = Object.keys(ABBR).filter((k) => k !== "Z" && k !== "ZULU").sort((a, b) => b.length - a.length);
const ABBR_RE = new RegExp(`(?<![a-z0-9])(${ABBR_KEYS.map((k) => k.toLowerCase()).join("|")})(?![a-z0-9])`, "g");
const NAME_KEYS = Object.keys(NAMES).sort((a, b) => b.length - a.length);
const NAME_RE = new RegExp(`(?<![a-z])(${NAME_KEYS.join("|")})(?:\\s+(?:standard|daylight|summer))?(?:\\s+time)?(?![a-z])`, "g");
const CITY_KEYS = Object.keys(CITIES).sort((a, b) => b.length - a.length);
const CITY_ALT = CITY_KEYS.map((k) => k.replace(/[.]/g, "\\.")).join("|");
const CITY_TIME_RE = new RegExp(`(?<![a-z])(${CITY_ALT})\\s+(?:local\\s+)?time(?![a-z])`, "g");
const IN_CITY_RE = new RegExp(`(?<=(?:\\d(?:\\s*[ap]\\.?m\\.?)?|noon|midnight)\\s+)in\\s+(${CITY_ALT})(?![a-z])`, "g");

/** Spaced or dotted abbreviations ("p.s.t", "e s t") and abbreviations glued to a time ("5pmest"). */
function tidy(t: string): string {
  // a unicode minus or dash is a minus only inside an offset ("utc\u221206:00"); elsewhere it stays as typed
  let s = t.toLowerCase().replace(/\u2212/g, "-").replace(/((?:utc|gmt)\s*)[\u2013\u2014]/g, "$1-").replace(/\s+/g, " ").trim();
  s = s.replace(/\b([a-z])\.\s?([a-z])\.\s?([a-z])\.?(?![a-z])/g, (m, a, b, c) => (ABBR[(a + b + c).toUpperCase()] ? a + b + c : m));
  s = s.replace(/\b([a-z]) ([a-z]) ([a-z])(?![a-z])/g, (m, a, b, c) => (ABBR[(a + b + c).toUpperCase()] ? a + b + c : m));
  s = s.replace(/\b([a-z])\.([a-z])\.(?![a-z])/g, (m, a, b) => (ABBR[(a + b).toUpperCase()] ? a + b : m));
  s = s.replace(/(\d(?:am|pm)?)(utc|gmt|[a-z]{2,4})(?![a-z])/g, (m, a, z) => (ABBR[z.toUpperCase()] ? `${a} ${z}` : m));
  s = s.replace(/\bgreenwich ?mean ?time\b/g, "gmt");
  return s;
}

function mentions(t: string, ctx: ZoneContext): Mention[] {
  const out: Mention[] = [];
  // IANA names, with or without brackets
  for (const m of t.matchAll(/\[?\b((?:america|europe|asia|africa|australia|pacific|atlantic|indian|antarctica|arctic|etc)\/[a-z_+\-0-9/]+)\]?/g)) {
    const off = etcOffset(m[1]!);
    out.push({ start: m.index!, end: m.index! + m[0].length, zone: off ?? canonicalIana(m[1]!), loose: false });
  }
  // utc+5:30, gmt-8, utc, gmt, zulu
  for (const m of t.matchAll(/(?<![a-z])(?:utc|gmt|ut)\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?(?!\d)/g)) {
    const z = fmtOffset(m[1]!, m[2]!, m[3]);
    if (z) out.push({ start: m.index!, end: m.index! + m[0].length, zone: z, loose: false });
  }
  // an ISO offset: after seconds (21:00:57+0800), after a T time (2026-11-30T09:07-08:00), or spaced after a time (05:17 am +0000).
  // "01:00-03:00" is a range, not an offset.
  const isoOff = [
    /(?<=\d:\d{2}:\d{2}(?:[.,]\d+)?)\s?([+-])(\d{1,2})(?::?(\d{2}))?(?![\d:])/g,
    /(?<=\d{4}-\d\d-\d\dt\d{1,2}(?::\d{2})?)([+-])(\d{2})(?::?(\d{2}))?(?![\d:])/g,
    /(?<=\d:\d{2}(?::\d{2})?(?:\s?[ap]m)?) ([+-])(\d{2})(\d{2})(?!\d)/g,
    /(?<=\d:\d{2}(?::\d{2})?(?:\s?[ap]m)?)\s?(\+)(\d{2}):(\d{2})(?![\d:])/g,
    /(?<=\d:\d{2}(?::\d{2})?(?:\s?[ap]m)?) (-)(\d{2}):(\d{2})(?![\d:])(?!\s*(?:to|-|until))/g,
  ];
  for (const re of isoOff) {
    for (const m of t.matchAll(re)) {
      const z = fmtOffset(m[1]!, m[2]!, m[3]);
      if (z) out.push({ start: m.index!, end: m.index! + m[0].length, zone: z, loose: false });
    }
  }
  // an offset right after a named abbreviation: "pdt -07:00", "est -05:00"
  for (const m of t.matchAll(new RegExp(`(?<=(?:${ABBR_KEYS.map((k) => k.toLowerCase()).join("|")})\\s)([+-])(\\d{2}):(\\d{2})(?![\\d:])`, "g"))) {
    const z = fmtOffset(m[1]!, m[2]!, m[3]);
    if (z) out.push({ start: m.index!, end: m.index! + m[0].length, zone: z, loose: false });
  }
  // a basic-format ISO offset: 20161001T1430+0530
  for (const m of t.matchAll(/(?<=\d{8}t\d{4,6}(?:[.,]\d+)?)([+-])(\d{2})(\d{2})(?!\d)/g)) {
    const z = fmtOffset(m[1]!, m[2]!, m[3]);
    if (z) out.push({ start: m.index!, end: m.index! + m[0].length, zone: z, loose: false });
  }
  // a bracketed offset: [+01:00]
  for (const m of t.matchAll(/\[([+-])(\d{2}):(\d{2})\]/g)) out.push({ start: m.index!, end: m.index! + m[0].length, zone: `${m[1]}${m[2]}:${m[3]}`, loose: false });
  // a Z right after digits: 14:00Z, 0330Z, 2016-09-23T02:54:32.845Z
  for (const m of t.matchAll(/(?<=\d)z(?![a-z])/g)) out.push({ start: m.index!, end: m.index! + 1, zone: "UTC", loose: false });
  // anywhere on earth
  for (const m of t.matchAll(/(?<![a-z])(?:aoe|anywhere on earth)(?![a-z])/g)) out.push({ start: m.index!, end: m.index! + m[0].length, zone: "-12:00", loose: false });
  // abbreviations (need a clock time next to them, except UTC and GMT)
  for (const m of t.matchAll(ABBR_RE)) {
    const key = m[1]!.toUpperCase();
    const mm = { start: m.index!, end: m.index! + m[0].length };
    if (BLOCKED_AFTER.test(t.slice(mm.end)) && key !== "UTC" && key !== "GMT") continue;
    const negPair = /^\s*(?:not|or|\/)\s*[a-z]{2,5}[\s,?:]*(?:\d|noon|midnight)/.test(t.slice(mm.end));
    const paired = negPair || /^\s*[\/,=]\s*(?:utc|gmt)\s*[+-]\d/.test(t.slice(mm.end)) || /(?:utc|gmt)\s*[+-]\d{1,2}(?::\d{2})?\s*[\/,=]\s*$/.test(t.slice(0, mm.start));
    if (!adjacent(t, mm) && !paired) continue;
    // "pst" is a common typo of "past": "half pst 6", "ten pst 3", "pst 3 weeks", "pst 2 wkends"
    if (key === "PST") {
      const before = t.slice(0, mm.start);
      const after = t.slice(mm.end);
      if (/\b(?:half|quarter|\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|twenty[- ]five)\s+$/.test(before) && /^\s*\d/.test(after)) continue;
      if (/^\s*(?:the\s+)?\d+\s*(?:weeks?|wks?|days?|months?|mos?|years?|yrs?|hours?|hrs?|minutes?|mins?|wkends?|wknds?|weekends?)\b/.test(after)) continue;
      if (/\bthe\s+$/.test(before) && /^\s*\d/.test(after)) continue;
    }
    // "est not edt": a negated abbreviation is not the zone
    if (/\bnot\s*$/.test(t.slice(0, mm.start))) continue;
    out.push({ ...mm, zone: key === "UT" ? "UTC" : pickAbbr(key, t, ctx), loose: true });
  }
  // zone words: pacific, eastern time, central european time
  for (const m of t.matchAll(NAME_RE)) {
    const mm = { start: m.index!, end: m.index! + m[0].length };
    const withTime = /\b(?:time|standard|daylight)\b/.test(m[0]);
    if (BLOCKED_AFTER.test(t.slice(mm.end))) continue;
    if (!withTime && !adjacent(t, mm)) continue;
    if (withTime && !adjacent(t, mm) && !/(?:time|standard|daylight)$/.test(m[0])) continue;
    const key = m[1]!;
    const place = CITIES[key]; // "singapore time", "hong kong time" also match the zone words
    if (!withTime && NAMES[key] === undefined && !place) continue;
    out.push({ ...mm, zone: NAMES[key]!, loose: true });
  }
  // "<place> time" and "in <place>" after a time
  for (const m of t.matchAll(CITY_TIME_RE)) out.push({ start: m.index!, end: m.index! + m[0].length, zone: CITIES[m[1]!]!, loose: true });
  for (const m of t.matchAll(IN_CITY_RE)) out.push({ start: m.index!, end: m.index! + m[0].length, zone: CITIES[m[1]!]!, loose: true });
  // a bare city right after a clock time is a zone when the phrase compares places: "9am sydney = 6pm prev day la", "9am london = what in nyc"
  const bare = [...t.matchAll(new RegExp(`(?<=(?:\\d(?:\\s*[ap]\\.?m\\.?)?|noon|midnight)\\s+)(${CITY_ALT})(?![a-z])`, "g"))];
  const cmpA = new RegExp(`(?:=|->|/|\\bvs\\.?|\\bwhat\\b)[^.]*\\b(?:in|at)\\s+(?:${CITY_ALT})\\b`);
  const cmpB = new RegExp(`(?:=|->|/|\\bvs\\.?|\\bwhat\\b)\\s*[^.]*\\d(?:\\s*[ap]m)?\\s+(?:prev day |next day )?(?:${CITY_ALT})\\b`);
  const compares = bare.length >= 2 || (bare.length === 1 && (out.length > 0 || cmpA.test(t) || cmpB.test(t)));
  if (compares) for (const m of bare) out.push({ start: m.index!, end: m.index! + m[0].length, zone: CITIES[m[1]!]!, loose: true });
  // bare words next to a clock time are noise unless the zone is stated, so drop overlaps (keep the longest)
  out.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const kept: Mention[] = [];
  for (const m of out) if (!kept.some((k) => m.start < k.end && m.end > k.start)) kept.push(m);
  return kept;
}

const JOINER = /\s*(?:\(|\[|=|\||->|<->|\u2192|\u21d4|\/|,|;|\bvs\.?\b|\bin\b|\bis\b|\band\b|\bor\b)\s*/;

const NO_ZONE_PHRASES = new RegExp(
  "\\b(?:local(?: venue)?|your(?: local)?|my(?: local)?|their|his|her|our|server|game|host(?:'s)?|home|venue|office|candidate(?:'s)?|speaker(?:'s)?|user(?:'s)?) (?:local )?time\\b" +
    "|\\b(?:my|your|their|our) (?:tz|time ?zone)\\b|\\bwhere (?:you|u) (?:are|r)\\b|(?<=\\d(?:am|pm)?\\s)here\\b",
  "g",
);

/** A 24-hour time for h12: hours 10 to 12 need the "hours" suffix to be known, the others read as 24-hour from HH:MM. */
const h24 = (h: string, mi: string) => (+h >= 10 && +h <= 12 ? `${h}${mi} hours` : `${h.padStart(2, "0")}:${mi}`);

export type Parse = (text: string) => string;

const RANGE_CONNECTOR = /^\s*(?:to|until|till|thru|through|and|-(?!>)|\u2013)\s*/;
const TIME_ONLY = /^[\s:,-]*(?:\d{1,2}(?::\d{2}(?::\d{2})?)?\s*(?:a\.?m\.?|p\.?m\.?)?|noon|midnight)[\s:,-]*$/;
const TIME_WORDS = /^(?:\s*(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|noon|midnight)\s*(?:a\.?m\.?|p\.?m\.?)?\s*)$/;

/** Out of scope: JavaScript Date.toString dumps, iCalendar lines, GNU TZ strings. */
const OUT_OF_SCOPE = /\bgmt[+-]\d{4}\s*\(|\bdtstart;tzid=|\btz="|\bdtstart:|^[+-]\d{2}:\d{2}$/;

/** Parse `text` with `parse` (h12) after taking the zone out. */
export function withZone(text: string, ctx: ZoneContext, parse: Parse): string {
  let t = tidy(text);
  if (OUT_OF_SCOPE.test(t)) return "x";
  // a bracketed zone after an offset says the same thing; the name is the better label
  t = t.replace(/(?<=\d)(?:[+-]\d{2}(?::?\d{2})?|z)(?=\[)/g, "");
  const stripped = t.replace(NO_ZONE_PHRASES, " ").replace(/\s+/g, " ").trim();
  const ms = mentions(stripped, ctx);
  if (typeof process !== "undefined" && process.env.TZDEBUG) console.error(JSON.stringify({ stripped, ms }));
  if (!ms.length) return postFix(parse(stripped === t.replace(/\s+/g, " ").trim() && stripped === text.trim().toLowerCase() ? text : stripped), stripped);
  // collect the mentions that belong to the first moment
  const first = ms[0]!;
  const remove: [number, number][] = [[first.start, first.end]];
  let cut = stripped.length;
  let zone = first.zone;
  for (let i = 1; i < ms.length; i++) {
    const prev = remove[remove.length - 1]!;
    const m = ms[i]!;
    const seg = stripped.slice(prev[1], m.start);
    const sameMoment = (TIME_ONLY.test(seg) || TIME_WORDS.test(seg)) && prev === remove[0]; // "Nigeria time: 7pm WAT"
    // a named zone with its own offset: "PDT / UTC-7", "UTC +00:00", "+0000 UTC": the name is the label
    const isOffset = (z: string) => /^[+-]\d\d:\d\d$/.test(z);
    if (/^[\s,/=\-+]*$/.test(seg) && (isOffset(m.zone) !== isOffset(zone))) {
      if (isOffset(zone)) zone = m.zone;
      remove.push([m.start, m.end]);
      continue;
    }
    if (m.zone === zone && (RANGE_CONNECTOR.test(seg) || sameMoment || /^\s*\(?\s*$/.test(seg) || /^\s*[+\-/]?\s*$/.test(seg))) {
      remove.push([m.start, m.end]); // the same zone again: "17:00 UTC to 19:00 UTC", "UTC +00:00", "(MDT)"
      continue;
    }
    if (sameMoment) {
      remove.push([m.start, m.end]);
      continue;
    }
    // different zones joined by a range word: a range across zones has no label
    if (/^\s*(?:to|until|till|thru|through|-|\u2013)\s*[\d(]/.test(seg) && m.zone !== zone) return "x";
    const j = seg.match(JOINER);
    if (j && j.index !== undefined) cut = prev[1] + j.index;
    else {
      const time = stripped.slice(0, m.start).match(/(?:\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?|noon|midnight)\s*$/);
      cut = time ? m.start - time[0].length : m.start;
    }
    break;
  }
  // a conversion target after the first zone: "5pm IST in EST", "what is 5pm GMT in india"
  const lastEnd = remove[remove.length - 1]![1];
  const conv = stripped.slice(lastEnd).match(/^[^,;()]*?\s(?:in|to|into)\s(?!the\b|a\b|an\b|\d)[a-z .]+\??$/);
  if (conv && cut === stripped.length) cut = lastEnd + conv.index!;
  // build the working text: drop the removed mentions, keep everything before the cut
  let working = "";
  let pos = 0;
  for (const [a, b] of remove.sort((x, y) => x[0] - y[0])) {
    if (a >= cut) break;
    // 1500 utc, 0000z - 2359z: a four-digit time right before a zone is a 24-hour time
    working += stripped.slice(pos, a).replace(/\b([01]\d|2[0-3])([0-5]\d)\s*$/, (_m, h: string, mi: string) => h24(h, mi) + " ") + " ";
    pos = Math.max(pos, b);
  }
  working += stripped.slice(pos, cut);
  // a parenthesized duplicate of the zone: "Mountain Daylight Time (MDT) 4 am", "pacific time (pdt)"
  working = working.replace(/\(\s*(?:[a-z]{2,5}|(?:utc|gmt)\s*[+-]\d{1,2}(?::\d{2})?)\s*\)/g, " ");
  // two ISO date-times joined by a slash are a range
  working = working.replace(/(\d\d:\d\d)[a-z]?\s*\/\s*(\d{4}-\d\d-\d\d)/g, "$1 to $2");
  // a time with seconds, or one that follows an ISO date, is a 24-hour time
  working = working.replace(/\b(\d{1,2}):(\d{2}):\d{2}(?:[.,]\d+)?(?!\d)/g, (_m, h: string, mi: string) => h24(h, mi));
  working = working.replace(/(\d{4}-\d\d-\d\d)t(\d{2})(?![\d:.])/g, (_m, d: string, h: string) => `${d} ${h24(h, "00")}`);
  working = working.replace(/(\d{4}-\d\d-\d\d)[ t](\d{1,2}):(\d{2})(?![\d:])(?!\s*(?:am|pm|a\.m|p\.m))/g, (_m, d: string, h: string, mi: string) => `${d} ${h24(h, mi)}`);
  // a four-digit time right before the zone: 1500 utc, 0330z
  working = working.replace(/\b([01]\d|2[0-3])([0-5]\d)\s*$/, "$1:$2");
  // "9-5 moscow time": a bare range next to a zone is a time range
  working = working.replace(/(?<![\d/:.-])(\d{1,2})\s*-\s*(\d{1,2})(?![\d/:.])\s*$/, "$1 to $2");
  working = working.replace(/\(\s*\)|\[\s*\]/g, " ").replace(/\s+/g, " ").replace(/[,;(\[\s-]+$/, "").trim();
  let out = parse(working);
  // never worse than h12: when taking the zone out leaves nothing to parse, use the text as it was
  if (out === "x") {
    const alt = parse(stripped);
    if (alt !== "x") out = alt;
  }
  if (!/^(?:t|dt) /.test(out)) return out; // a line with no time takes no zone
  return `${postFix(out, stripped)} @${zone}`;
}

/** A cadence in parentheses ("(biweekly)") that h12 leaves as weekly. */
function postFix(out: string, text: string): string {
  if (/\b(?:biweekly|bi-weekly|fortnightly)\b/.test(text)) return out.replace(/^((?:d|dt) R )w\/1\b/, "$1w/2");
  return out;
}
