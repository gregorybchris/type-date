// Generates synthetic sample data in fixtures/ (runs, datasets, errors). Not real results.
// Usage: pnpm fixtures
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, "../fixtures");

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type R = () => number;
const pick = <T>(r: R, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;
const int = (r: R, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
const pad = (n: number, w = 2) => String(n).padStart(w, "0");

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MON3 = MONTHS.map((m) => m.slice(0, 3));
const WDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const WD2 = ["su", "mo", "tu", "we", "th", "fr", "sa"];
const WD_ABBR = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
const ORD = ["", "1st", "2nd", "3rd"];
const ordinal = (n: number) => (n <= 3 ? ORD[n]! : n >= 21 && n % 10 >= 1 && n % 10 <= 3 ? `${n}${ORD[n % 10]!.slice(1)}` : `${n}th`);
const NUMW = ["zero", "one", "two", "three", "four", "five", "six"];

interface Gen {
  text: string;
  dsl: string;
  mods: string[];
}
type GenFn = (r: R, alt: boolean) => Gen;

const mname = (r: R, m: number, mods: string[]) => (r() < 0.5 ? MON3[m - 1]! : MONTHS[m - 1]!);
const t12 = (h: number, m = 0) => `${h > 12 ? h - 12 : h === 0 ? 12 : h}${m ? ":" + pad(m) : ""}${h >= 12 ? "pm" : "am"}`;
const t24 = (h: number, m = 0) => `${pad(h)}:${pad(m)}`;

const GENS: Record<string, GenFn> = {
  "basic-date": (r, alt) => {
    const m = int(r, 1, 12), d = int(r, 1, 28);
    return { text: alt ? `${d} ${mname(r, m, [])}` : `${mname(r, m, [])} ${d}`, dsl: `d ${pad(m)}-${pad(d)}`, mods: [] };
  },
  "basic-date-year": (r) => {
    const m = int(r, 1, 12), d = int(r, 1, 28), y = int(r, 2026, 2028);
    return { text: `${mname(r, m, [])} ${d}, ${y}`, dsl: `d ${y}-${pad(m)}-${pad(d)}`, mods: [] };
  },
  "numeric-date": (r, alt) => {
    const m = int(r, 1, 12), d = int(r, 1, 28), y = int(r, 26, 28);
    return { text: alt ? `${m}.${d}.20${y}` : `${m}/${d}/${y}`, dsl: `d 20${y}-${pad(m)}-${pad(d)}`, mods: [] };
  },
  "ordinal-date": (r, alt) => {
    const m = int(r, 1, 12), d = int(r, 1, 28);
    return { text: alt ? `${MONTHS[m - 1]} ${ordinal(d)}` : `the ${ordinal(d)} of ${MONTHS[m - 1]}`, dsl: `d ${pad(m)}-${pad(d)}`, mods: [] };
  },
  "basic-date-range": (r, alt) => {
    const m = int(r, 1, 12), d = int(r, 1, 25), m2 = r() < 0.6 ? m : (m % 12) + 1, d2 = m2 === m ? d + int(r, 1, 3) : int(r, 1, 25);
    const sep = alt ? pick(r, ["through", "until", "-"]) : pick(r, ["to", "-", "until"]);
    return { text: `${mname(r, m, [])} ${d} ${sep} ${mname(r, m2, [])} ${d2}`, dsl: `d ${pad(m)}-${pad(d)}>${pad(m2)}-${pad(d2)}`, mods: [] };
  },
  "date-range-shared-month": (r, alt) => {
    const m = int(r, 1, 12), d = int(r, 1, 25), d2 = d + int(r, 1, 3);
    return { text: alt ? `${ordinal(d)} to ${ordinal(d2)} of ${MON3[m - 1]}` : `${MON3[m - 1]} ${d}-${d2}`, dsl: `d ${pad(m)}-${pad(d)}>${pad(m)}-${pad(d2)}`, mods: [] };
  },
  "relative-date": (r) => {
    const x = pick(r, [["tomorrow", "+1d"], ["today", "+0d"], ["yesterday", "-1d"], ["day after tomorrow", "+2d"]] as const);
    return { text: x[0], dsl: `d ${x[1]}`, mods: [] };
  },
  "relative-offset": (r, alt) => {
    const n = int(r, 2, 6), u = pick(r, [["day", "d"], ["week", "w"], ["month", "m"]] as const);
    const words = r() < 0.3;
    const nt = words ? NUMW[n]! : String(n);
    const ab = !words && r() < 0.2 && u[1] === "w";
    const unit = ab ? "wks" : `${u[0]}s`;
    const past = alt || r() < 0.3;
    return { text: past ? `${nt} ${unit} ago` : `in ${nt} ${unit}`, dsl: `d ${past ? "-" : "+"}${n}${u[1]}`, mods: [...(words ? ["word-numbers"] : []), ...(ab ? ["abbreviation"] : [])] };
  },
  "weekday-relative": (r) => {
    const i = int(r, 0, 6), ab = r() < 0.3;
    const name = ab ? WD_ABBR[i]! : WDAYS[i]!;
    const k = pick(r, [["next", "+1"], ["last", "-1"], ["this", ""]] as const);
    return { text: `${k[0]} ${name}`, dsl: `d ${WD2[i]}${k[1]}`, mods: ab ? ["abbreviation"] : [] };
  },
  "weekday-bare": (r) => {
    const i = int(r, 0, 6), ab = r() < 0.4;
    return { text: ab ? WD_ABBR[i]! : WDAYS[i]!, dsl: `d ${WD2[i]}`, mods: ab ? ["abbreviation"] : [] };
  },
  "period-relative": (r) => {
    const x = pick(r, [["next week", "W+1"], ["last week", "W-1"], ["next month", "M+1"], ["last month", "M-1"], ["next year", "Y+1"], ["this week", "W+0"]] as const);
    return { text: x[0], dsl: `d ${x[1]}`, mods: [] };
  },
  "nth-weekday-of-month": (r) => {
    const i = int(r, 0, 6), m = int(r, 1, 12);
    const k = pick(r, [["first", 1], ["second", 2], ["third", 3], ["last", -1]] as const);
    return { text: `${k[0]} ${WDAYS[i]} of ${MONTHS[m - 1]}`, dsl: `d ${WD2[i]}#${k[1]}@${pad(m)}`, mods: [] };
  },
  "named-holiday": (r) => {
    const x = pick(r, [["christmas", "12-25"], ["xmas eve", "12-24"], ["halloween", "10-31"], ["new years eve", "12-31"], ["valentines day", "02-14"], ["thanksgiving", "th#4@11"]] as const);
    return { text: x[0], dsl: `d ${x[1]}`, mods: x[0] === "xmas eve" ? ["colloquial"] : [] };
  },
  "fuzzy-period": (r) => {
    const x = pick(r, [["tomorrow morning", "dt +1d 08:00>12:00"], ["tonight", "dt +0d 20:00"], ["this weekend", "d sa>su"], ["friday evening", "dt fr 18:00>22:00"]] as const);
    return { text: x[0], dsl: x[1], mods: [] };
  },
  "time-only": (r) => {
    const h = int(r, 7, 21), m = pick(r, [0, 0, 15, 30]);
    const x = r() < 0.15 ? { text: "noon", dsl: "t 12:00" } : r() < 0.3 ? { text: t24(h, m), dsl: `t ${t24(h, m)}` } : { text: t12(h, m), dsl: `t ${t24(h, m)}` };
    return { ...x, mods: [] };
  },
  "time-range": (r) => {
    const h = int(r, 7, 15), len = int(r, 1, 3);
    return { text: `${t12(h)}-${t12(h + len)}`, dsl: `t ${t24(h)}>${t24(h + len)}`, mods: [] };
  },
  "ampm-ambiguous": (r, alt) => {
    const h = int(r, 1, 11);
    if (alt || r() < 0.4) return { text: `at ${h}`, dsl: `t ${h}?`, mods: [] };
    return { text: `${h} to ${h}:30`, dsl: `t ${h}?>${h}:30?`, mods: [] };
  },
  datetime: (r) => {
    const m = int(r, 1, 12), d = int(r, 1, 28), h = int(r, 8, 20);
    return r() < 0.5
      ? { text: `${MON3[m - 1]} ${d} at ${t12(h)}`, dsl: `dt ${pad(m)}-${pad(d)} ${t24(h)}`, mods: [] }
      : { text: `tomorrow ${t12(h, 15)}`, dsl: `dt +1d ${t24(h, 15)}`, mods: [] };
  },
  "datetime-range": (r) => {
    if (r() < 0.5) {
      const i = int(r, 0, 6), h = int(r, 8, 15);
      return { text: `${WDAYS[i]} ${h > 12 ? h - 12 : h}-${t12(h + 2)}`, dsl: `dt ${WD2[i]} ${t24(h)}>${t24(h + 2)}`, mods: [] };
    }
    const m = int(r, 1, 11), d = int(r, 1, 25);
    return { text: `${MON3[m - 1]} ${d} 3pm to ${MON3[m - 1]} ${d + 3} noon`, dsl: `dt ${pad(m)}-${pad(d)} 15:00>${pad(m)}-${pad(d + 3)} 12:00`, mods: [] };
  },
  "recurrence-daily": (r) => {
    const x = pick(r, [["every day", "d R d/1"], ["every weekday", "d R d/1 mo,tu,we,th,fr"], ["every weekday at 9", "dt R d/1 mo,tu,we,th,fr 9?"], ["daily at 7am", "dt R d/1 07:00"]] as const);
    return { text: x[0], dsl: x[1], mods: [] };
  },
  "recurrence-weekly": (r) => {
    const i = int(r, 0, 6);
    return r() < 0.6 ? { text: `every ${WDAYS[i]}`, dsl: `d R w/1 ${WD2[i]}`, mods: [] } : { text: "mon wed fri", dsl: "d R w/1 mo,we,fr", mods: [] };
  },
  "recurrence-interval": (r) => {
    const i = int(r, 0, 6);
    return r() < 0.6 ? { text: `every other ${WDAYS[i]}`, dsl: `d R w/2 ${WD2[i]}`, mods: [] } : { text: `every ${int(r, 3, 4)} weeks`, dsl: `d R w/${int(r, 3, 4)}`, mods: [] };
  },
  "recurrence-monthly-yearly": (r) => {
    const d = int(r, 1, 28), i = int(r, 0, 6);
    const k = r();
    return k < 0.4
      ? { text: `monthly on the ${ordinal(d)}`, dsl: `d R m/1 d${d}`, mods: [] }
      : k < 0.7
        ? { text: `first ${WDAYS[i]} of every month`, dsl: `d R m/1 ${WD2[i]}#1`, mods: [] }
        : { text: `every ${MON3[int(r, 0, 11)]} ${d}`, dsl: `d R y/1`, mods: [] };
  },
  "recurrence-bounded": (r) => {
    const i = int(r, 0, 6), m = int(r, 1, 12), d = int(r, 1, 28), n = int(r, 3, 10);
    return r() < 0.5
      ? { text: `every ${WDAYS[i]} until ${MON3[m - 1]} ${d}`, dsl: `d R w/1 ${WD2[i]} u${pad(m)}-${pad(d)}`, mods: [] }
      : { text: `daily for ${n} days`, dsl: `d R d/1 n${n}`, mods: [] };
  },
  "month-or-year-only": (r) => {
    const m = int(r, 1, 12);
    return r() < 0.8 ? { text: MONTHS[m - 1]!, dsl: `d M@${pad(m)}`, mods: [] } : { text: String(int(r, 2026, 2029)), dsl: "", mods: [] };
  },
  "non-date-noise": (r) => ({ text: pick(r, ["buy milk", "25", "1 adult", "hello", "asdf", "meeting notes", "room 4b", "42 items"]), dsl: "x", mods: [] }),
};
// Fix the year-only case after generation.
function finish(tag: string, g: Gen): Gen {
  if (tag === "month-or-year-only" && g.dsl === "") return { ...g, dsl: `d Y@${g.text}` };
  return g;
}

// Tag weights (rough share of the dataset).
const TAG_W: Record<string, number> = {
  "basic-date": 9, "basic-date-year": 4, "numeric-date": 4, "ordinal-date": 3, "basic-date-range": 8, "date-range-shared-month": 4,
  "relative-date": 5, "relative-offset": 5, "weekday-relative": 6, "weekday-bare": 4, "period-relative": 3, "nth-weekday-of-month": 3,
  "named-holiday": 2, "fuzzy-period": 3, "time-only": 5, "time-range": 4, "ampm-ambiguous": 4, datetime: 7, "datetime-range": 5,
  "recurrence-daily": 3, "recurrence-weekly": 3, "recurrence-interval": 3, "recurrence-monthly-yearly": 2, "recurrence-bounded": 2,
  "month-or-year-only": 2, "non-date-noise": 3,
};
const TAGS = Object.keys(TAG_W);
const weighted = (r: R) => {
  const total = TAGS.reduce((s, t) => s + TAG_W[t]!, 0);
  let x = r() * total;
  for (const t of TAGS) if ((x -= TAG_W[t]!) < 0) return t;
  return TAGS[0]!;
};

const KEYB: Record<string, string> = { a: "s", s: "d", d: "f", e: "r", o: "p", r: "t", t: "y", i: "o", n: "m", m: "n" };
function addNoise(r: R, text: string, mods: string[], force: boolean): { text: string; mods: string[] } {
  let t = text;
  const out = [...mods];
  const roll = (p: number) => force && out.length === mods.length ? true : r() < p;
  if (roll(0.12) && t.length > 4) {
    const i = int(r, 1, t.length - 2);
    const kind = int(r, 0, 3);
    if (kind === 0) t = t.slice(0, i) + t.slice(i + 1);
    else if (kind === 1) t = t.slice(0, i) + t[i] + t.slice(i);
    else if (kind === 2) t = t.slice(0, i) + t[i + 1] + t[i] + t.slice(i + 2);
    else {
      const sub = KEYB[t[i]!];
      if (sub) { t = t.slice(0, i) + sub + t.slice(i + 1); out.push("typo-keyboard"); }
      else t = t.slice(0, i) + t.slice(i + 1);
    }
    if (!out.includes("typo-keyboard")) out.push("typo");
  }
  if (r() < 0.07) { t = r() < 0.5 ? t.toUpperCase() : t.replace(/\b\w/g, (c) => c.toUpperCase()); out.push("casing"); }
  if (r() < 0.05) { const t2 = t.replace(/ to /, "to").replace(/ - /, "-"); if (t2 !== t) { t = t2; out.push("spacing"); } }
  if (r() < 0.05) { t = pick(r, ["can we do ", "like ", "maybe ", "lets say "]) + t + pick(r, ["", " please", " or so"]); out.push("filler-words"); }
  if (t.length > 40 && !out.includes("long-input")) out.push("long-input");
  return { text: t, mods: [...new Set(out)] };
}

interface Sample {
  id: string; text: string; dsl: string; primary_tag: string; modifier_tags: string[]; source: string; split: string; parent_id: string | null;
}

const SPLITS_V: Record<string, Record<string, number>> = {
  v001: { train: 1500, val: 1000, test_template: 600, test_noise: 600, test_external: 400 },
  v002: { train: 2600, val: 1000, test_template: 600, test_noise: 600, test_external: 400 },
};

function genDataset(version: string, seed: number): Sample[] {
  const r = rng(seed);
  const out: Sample[] = [];
  let n = 0;
  for (const [split, count] of Object.entries(SPLITS_V[version]!)) {
    for (let i = 0; i < count; i++) {
      const tag = weighted(r);
      const g = finish(tag, GENS[tag]!(r, split === "test_template" || split === "test_external"));
      const noisy = addNoise(r, g.text, g.mods, split === "test_noise");
      let { text, mods } = noisy;
      let dsl = g.dsl;
      let source = noisy.mods.length > g.mods.length ? "noise" : "grammar";
      if (split === "test_external") source = r() < 0.5 ? "handwritten" : "mined";
      else if (version === "v002" && r() < 0.2) source = "llm";
      // Prefix examples: cut a range at the first endpoint.
      if (tag === "basic-date-range" && r() < 0.15 && dsl.includes(">")) {
        const first = text.split(/ (?:to|until|through|-) /)[0]!;
        text = `${first} t`; dsl = dsl.split(">")[0]!; mods = [...mods, "partial-prefix"]; source = "prefix";
      }
      out.push({ id: `${source[0]}-${pad(n++, 6)}`, text, dsl, primary_tag: tag, modifier_tags: mods, source, split, parent_id: null });
    }
  }
  return out;
}

// Difficulty per tag and modifier (multiplier on failure probability).
const TAG_DIFF: Record<string, number> = {
  "basic-date": 0.3, "basic-date-year": 0.4, "numeric-date": 0.9, "ordinal-date": 0.6, "basic-date-range": 0.7, "date-range-shared-month": 1.1,
  "relative-date": 0.3, "relative-offset": 0.6, "weekday-relative": 1.0, "weekday-bare": 0.4, "period-relative": 0.9, "nth-weekday-of-month": 1.8,
  "named-holiday": 1.5, "fuzzy-period": 2.4, "time-only": 0.5, "time-range": 0.8, "ampm-ambiguous": 1.7, datetime: 0.9, "datetime-range": 1.9,
  "recurrence-daily": 1.2, "recurrence-weekly": 1.0, "recurrence-interval": 1.4, "recurrence-monthly-yearly": 2.6, "recurrence-bounded": 2.2,
  "month-or-year-only": 0.8, "non-date-noise": 0.7,
};
const MOD_DIFF: Record<string, number> = {
  typo: 1.8, "typo-keyboard": 2.0, casing: 1.1, spacing: 1.7, "filler-words": 1.6, "long-input": 1.5, abbreviation: 1.3, "word-numbers": 1.4, "partial-prefix": 2.0,
};
const SPLIT_DIFF: Record<string, number> = { train: 0, val: 0.7, test_template: 1.6, test_noise: 1.5, test_external: 2.2 };

function mutate(r: R, dsl: string): string {
  const tries: Array<() => string> = [
    () => dsl.replace(/(\d\d)-(\d\d)/, (_, a, b) => `${a}-${pad(Math.min(28, Number(b) + 1))}`),
    () => dsl.replace(/\b(mo|tu|we|th|fr|sa|su)\b/, (w) => WD2[(WD2.indexOf(w) + 1) % 7]!),
    () => dsl.replace(/^d /, "dt "),
    () => dsl.replace(/^dt /, "d "),
    () => dsl.replace(/>.*$/, ""),
    () => dsl.replace(/\+(\d)([dwm])/, (_, a, u) => `+${a}${u === "d" ? "w" : "d"}`),
    () => dsl.replace(/(\d\d):(\d\d)/, (_, h, m) => `${pad((Number(h) + 12) % 24)}:${m}`),
    () => dsl.replace(/\/1/, "/2"),
    () => dsl.replace(/(\d)\?/, "$1"),
    () => dsl.replace(/-1\b/, "+1"),
    () => "x",
  ];
  for (let i = 0; i < 6; i++) {
    const out = pick(r, tries)();
    if (out !== dsl) return out;
  }
  return "x";
}

interface Exp {
  title: string; family: string; params: number; dataset: string; quant: string; fmt: string; skill: number; parent: number | null; notes: string;
  kind?: "model" | "library" | "heuristic"; sizeBytes?: number; engine?: string; zero?: boolean;
}

/** Maps a model name onto the five families in the contract. */
function familyGroup(e: Exp): string {
  if (e.kind === "library" || e.kind === "heuristic") return e.kind;
  if (e.zero) return "zero-shot";
  return e.family.includes("scratch") ? "scratch" : "finetune";
}

/** A second eval version: slightly harder rows, so scores drop a little. */
function rescore(ev: { exact: number; resolved: number; n: number; by_split: Record<string, { n: number; exact: number }>; by_tag: Record<string, { n: number; exact: number }>; by_modifier: Record<string, { n: number; exact: number }> }, f: number) {
  const sc = (m: Record<string, { n: number; exact: number }>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, { n: Math.round(v.n * 1.05), exact: round(Math.max(0, Math.min(1, v.exact * f)), 4) }]));
  return { exact: round(ev.exact * f), resolved: round(Math.min(1, ev.resolved * f)), n: Math.round(ev.n * 1.05), by_split: sc(ev.by_split), by_tag: sc(ev.by_tag), by_modifier: sc(ev.by_modifier) };
}
const EXPS: Exp[] = [
  { title: "chrono-node adapter", family: "library", params: 0, dataset: "v001", quant: "none", fmt: "js", skill: 0.40, parent: null, kind: "library", sizeBytes: 182000, notes: "Rule-based library with a DSL adapter." },
  { title: "heuristic-small", family: "heuristic", params: 0, dataset: "v001", quant: "none", fmt: "js", skill: 0.34, parent: null, kind: "heuristic", sizeBytes: 6400, notes: "Tokenizer and a few regex rules." },
  { title: "heuristic-full", family: "heuristic", params: 0, dataset: "v001", quant: "none", fmt: "js", skill: 0.58, parent: 2, kind: "heuristic", sizeBytes: 41000, notes: "Broad rule set with fuzzy month and weekday matching." },
  { title: "from-scratch enc-dec 8M", family: "enc-dec-scratch", params: 8e6, dataset: "v001", quant: "fp32", fmt: "onnx", skill: 0.62, parent: null, notes: "First trained model." },
  { title: "enc-dec 8M, noise aug", family: "enc-dec-scratch", params: 8e6, dataset: "v001", quant: "int8", fmt: "onnx", skill: 0.70, parent: 4, notes: "Added typo and casing noise to train." },
  { title: "enc-dec 15M", family: "enc-dec-scratch", params: 15e6, dataset: "v001", quant: "int8", fmt: "onnx", skill: 0.76, parent: 5, notes: "Wider model." },
  { title: "t5-efficient-tiny ft", family: "t5-efficient-tiny", params: 16e6, dataset: "v001", quant: "int8", fmt: "onnx", skill: 0.82, parent: null, notes: "Pretrained start." },
  { title: "t5-small ft", family: "t5-small", params: 60e6, dataset: "v001", quant: "int8", fmt: "onnx", skill: 0.88, parent: null, notes: "" },
  { title: "smollm-135m ft", family: "smollm-135m", params: 135e6, dataset: "v001", quant: "int8", fmt: "gguf", skill: 0.91, parent: null, notes: "Decoder only." },
  { title: "enc-dec 15M on v002", family: "enc-dec-scratch", params: 15e6, dataset: "v002", quant: "int8", fmt: "onnx", skill: 0.87, parent: 6, notes: "New data with prefixes and llm paraphrases." },
  { title: "t5-small on v002", family: "t5-small", params: 60e6, dataset: "v002", quant: "int8", fmt: "onnx", skill: 0.93, parent: 8, notes: "" },
  { title: "smollm-135m q4 on v002", family: "smollm-135m", params: 135e6, dataset: "v002", quant: "int4", fmt: "gguf", skill: 0.945, parent: 9, notes: "4-bit weights." },
  { title: "qwen2.5-0.5b q4", family: "qwen2.5-0.5b", params: 500e6, dataset: "v002", quant: "int4", fmt: "gguf", skill: 0.965, parent: null, notes: "Largest model tried." },
  { title: "enc-dec 8M distilled", family: "enc-dec-scratch", params: 8e6, dataset: "v002", quant: "int8", fmt: "onnx", skill: 0.905, parent: 12, notes: "Distilled from exp-012." },
  { title: "qwen2.5-0.5b zero-shot", family: "qwen2.5-0.5b", params: 500e6, dataset: "v002", quant: "int4", fmt: "gguf", skill: 0.1, parent: null, zero: true, notes: "Few-shot prompt with the DSL grammar, no fine-tuning." },
  { title: "smollm-135m zero-shot", family: "smollm-135m", params: 135e6, dataset: "v002", quant: "int4", fmt: "gguf", skill: 0.04, parent: null, zero: true, notes: "Same prompt as exp-015 on a smaller model." },
  { title: "date library baseline", family: "library", params: 0, dataset: "v002", quant: "none", fmt: "js", skill: 0.45, parent: null, kind: "library", sizeBytes: 96000, notes: "Second rule-based library with a DSL adapter." },
  { title: "heuristic-mid", family: "heuristic", params: 0, dataset: "v002", quant: "none", fmt: "js", skill: 0.52, parent: 3, kind: "heuristic", sizeBytes: 18500, notes: "Regex rules for ranges and weekdays, no fuzzy matching." },
  { title: "t5-small 1 epoch", family: "t5-small", params: 60e6, dataset: "v002", quant: "int8", fmt: "onnx", skill: 0.8, parent: 11, notes: "Short fine-tune to see how fast accuracy rises." },
  { title: "enc-dec 4M scratch", family: "enc-dec-scratch", params: 4e6, dataset: "v002", quant: "int8", fmt: "onnx", skill: 0.84, parent: 10, notes: "Half the width of exp-010." },
  { title: "enc-dec 4M distilled", family: "enc-dec-scratch", params: 4e6, dataset: "v002", quant: "int8", fmt: "onnx", skill: 0.885, parent: 20, notes: "Distilled from exp-013." },
  { title: "smollm-135m 2 epochs", family: "smollm-135m", params: 135e6, dataset: "v002", quant: "int8", fmt: "gguf", skill: 0.915, parent: 9, notes: "Two epochs at int8 instead of q4." },
];

const QBYTES: Record<string, number> = { fp32: 4, fp16: 2, int8: 1, int4: 0.55 };

function writeJson(file: string, v: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(v, null, 1) + "\n");
}
const jsonl = (rows: unknown[]) => rows.map((x) => JSON.stringify(x)).join("\n") + "\n";
const round = (x: number, d = 4) => Number(x.toFixed(d));

// Wall clock for fixture timing. Each trained experiment starts after an idle gap.
let clock = Date.UTC(2026, 10, 3, 8, 0, 0);
const iso = (ms: number) => new Date(ms).toISOString().replace(".000", "");

function makeTiming(e: Exp, r: R, bench: Array<{ backend: string; profile?: string }>, exportBase: number) {
  const stages: Record<string, unknown> = {};
  const lib = e.kind === "library" || e.kind === "heuristic";
  let total = 0;
  if (!lib) {
    const loop = e.params / 1e6 * 38 + 500 + r() * 60;
    const gen = e.params / 1e6 * (e.fmt === "gguf" ? 2.2 : 1.1) + 70 + r() * 20;
    const score = 1.5 + r() * 2;
    const setup = { data_load: 0.2 + r() * 0.3, tokenizer_train: 0.1 + r() * 0.2, encode_train: 0.3 + r() * 1.5, model_init: 0.3 + r() * 0.4, save_checkpoint: 0.1 + r() * 0.5, write_results: 0.1 };
    const f = 0.40 + r() * 0.06, b = 0.40 + r() * 0.06, o = 0.07 + r() * 0.03, c = 0.02 + r() * 0.02;
    const sync = Math.max(0.01, 1 - f - b - o - c);
    const buckets: Record<string, number> = {
      ...setup, train_loop: loop, "train_loop/forward": loop * f, "train_loop/backward": loop * b, "train_loop/optim": loop * o,
      "train_loop/collate": loop * c, "train_loop/sync_loss": loop * sync, eval_generate: gen, eval_score: score,
    };
    const top = Object.entries(buckets).filter(([k]) => !k.includes("/")).reduce((s, [, v]) => s + v, 0);
    const unacc = 0.1 + r() * 0.4;
    const startMs = clock;
    const finish = startMs + (top + unacc) * 1000;
    const steps = 20000;
    stages.train = {
      stages: { started_at: iso(startMs), finished_at: iso(finish) }, total_s: round(top + unacc, 2),
      buckets: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, round(v, 2)])), unaccounted_s: round(unacc, 2),
      train_profile: { steps, step_ms: round(loop / steps * 1000, 1), samples_per_s: Math.round(128 / (loop / steps)) },
    };
    total += top + unacc;
    clock = finish + (r() < 0.2 ? int(r, 5, 9) * 3600e3 : int(r, 4, 90) * 60e3);
    const ex = exportBase + e.params / 1e6 * 0.12;
    stages.export = { total_s: round(ex, 2), buckets: { [e.fmt === "gguf" ? "gguf_convert" : "onnx_export"]: round(ex * 0.75, 2), quantize: round(ex * 0.25, 2) } };
    total += ex;
  }
  for (const b of bench) {
    const prof = b.profile ?? "desktop";
    const k = prof === "mobile-4x" ? 2.2 : prof === "mobile-6x" ? 3 : 1;
    const run = (lib ? 2 : 8 + e.params / 1e6 * 0.05) * k * (0.9 + r() * 0.2);
    const bk = { esbuild_bundle: 0.3, server_start: 0.05, browser_launch: 0.9 + r() * 0.3, page_open: 0.4, run_in_browser: run, write_results: 0.2 };
    const t = Object.values(bk).reduce((s, v) => s + v, 0);
    stages[`bench-${b.backend}-${prof}`] = { total_s: round(t, 2), buckets: Object.fromEntries(Object.entries(bk).map(([k, v]) => [k, round(v, 2)])) };
    total += t;
  }
  return { total_s: round(total, 2), stages };
}

function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  const datasets: Record<string, Sample[]> = {};
  for (const [v, seed] of [["v001", 11], ["v002", 22]] as const) {
    datasets[v] = genDataset(v, seed);
    const rows = datasets[v]!;
    const counts: Record<string, number> = {};
    const byTag: Record<string, Record<string, number>> = {};
    for (const s of rows) {
      counts[s.split] = (counts[s.split] ?? 0) + 1;
      (byTag[s.primary_tag] ??= {})[s.split] = (byTag[s.primary_tag]![s.split] ?? 0) + 1;
    }
    const dir = path.join(OUT, "data", v);
    fs.mkdirSync(dir, { recursive: true });
    for (const split of Object.keys(counts)) {
      fs.writeFileSync(path.join(dir, `${split}.jsonl`), jsonl(rows.filter((s) => s.split === split)));
    }
    writeJson(path.join(dir, "meta.json"), {
      version: v, created: v === "v001" ? "2026-11-03T12:00:00Z" : "2026-11-03T18:00:00Z", counts, by_tag: byTag,
      notes: "Sample data generated by scripts/make-fixtures.ts. Not a real dataset.",
    });
  }

  EXPS.forEach((e, idx) => {
    const num = idx + 1;
    const id = `exp-${pad(num, 3)}`;
    const r = rng(1000 + num * 17);
    const rows = datasets[e.dataset]!.filter((s) => s.split !== "train");
    const errors: unknown[] = [];
    const bySplit: Record<string, { n: number; ok: number }> = {};
    const byTag: Record<string, { n: number; ok: number }> = {};
    const byMod: Record<string, { n: number; ok: number }> = {};
    let ok = 0, resolvedOk = 0;
    const lib = e.kind === "library" || e.kind === "heuristic";
    for (const s of rows) {
      let md = 1;
      for (const m of s.modifier_tags) md *= MOD_DIFF[m] ?? 1;
      let td = TAG_DIFF[s.primary_tag] ?? 1;
      // Baselines fail recurrence and fuzzy tags much more.
      if (lib && (s.primary_tag.startsWith("recurrence") || s.primary_tag === "fuzzy-period")) td *= 1.8;
      if (e.kind === "library" && s.modifier_tags.some((m) => m.startsWith("typo"))) md *= 1.5;
      const p = Math.min(0.97, (1 - e.skill) * td * Math.min(md, 3) * (0.6 + 0.4 * (SPLIT_DIFF[s.split] ?? 1)) * 0.75);
      const fail = r() < p;
      const rec = (m: Record<string, { n: number; ok: number }>, k: string) => {
        const o = (m[k] ??= { n: 0, ok: 0 });
        o.n++; if (!fail) o.ok++;
      };
      rec(bySplit, s.split); rec(byTag, s.primary_tag);
      for (const mm of s.modifier_tags) rec(byMod, mm);
      if (!fail) { ok++; resolvedOk++; continue; }
      if (r() < 0.25) resolvedOk++;
      errors.push({ id: s.id, text: s.text, split: s.split, primary_tag: s.primary_tag, modifier_tags: s.modifier_tags, expected: s.dsl, predicted: mutate(r, s.dsl) });
    }
    const n = rows.length;
    const score = (m: Record<string, { n: number; ok: number }>) =>
      Object.fromEntries(Object.entries(m).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, { n: v.n, exact: round(v.ok / v.n) }]));
    const exact = ok / n;
    const sizeBytes = e.sizeBytes ?? Math.round(e.params * (QBYTES[e.quant] ?? 1) * (0.97 + r() * 0.06));
    const dir = path.join(OUT, "runs", id);
    writeJson(path.join(dir, "config.json"), {
      id, number: num, title: e.title, description: e.notes + (num === 4 ? " Invalid: scored before the eval sets were versioned." : ""), created: new Date(Date.UTC(2026, 10, 3, 8 + num)).toISOString().replace(".000", ""),
      dataset: e.zero ? "none" : e.dataset, format: "dsl-v1", notes: e.notes, parent: e.parent ? `exp-${pad(e.parent, 3)}` : null,
      model: lib ? { family: e.family, params: 0 } : { family: familyGroup(e), base: e.family, params: e.params, layers: e.params < 20e6 ? "4+4" : "6+6", vocab: 4000 },
      train: lib || e.zero ? {} : { epochs: 10, batch_size: 128, lr: 0.0005, seed: 0, device: "mps" },
      export: { format: e.fmt, quant: e.quant },
    });
    const mainEval = { exact: round(exact), resolved: round(Math.min(1, resolvedOk / n)), n, by_split: score(bySplit), by_tag: score(byTag), by_modifier: score(byMod) };
    writeJson(path.join(dir, "metrics.json"), {
      eval: { version: num === 4 ? "pre-e1" : "e1", ...mainEval },
      // Only newer experiments were re-scored on e1q.
      evals: num >= 7 && num !== 9 ? { e1q: rescore(mainEval, 0.955) } : undefined,
      model: { params: e.params, size_bytes: sizeBytes, avg_output_tokens: lib ? undefined : round(9 + r() * 5, 1) },
      train: lib ? undefined : { seconds: Math.round(e.params / 1e6 * 40 + 600), steps: 20000, final_loss: round(0.02 + (1 - e.skill) * 0.4) },
    });
    const engines: Array<[string, string, number, number]> = lib
      ? [[e.kind === "library" ? "baseline-chrono" : `baseline-${e.title}`, "js", 1, 1]]
      : e.fmt === "gguf"
        ? [["wllama", "wasm", 9, 1.6], ["wllama", "webgpu", 3, 2.2]]
        : [["ort-custom", "wasm", 1, 1], ["ort-custom", "webgpu", 0.55, 1.5], ["transformers-js", "wasm", 1.7, 1.4], ["transformers-js", "webgpu", 0.9, 1.9]];
    const bench = engines.map(([engine, backend, lm, mm]) => {
      const p50 = lib ? round(0.15 + (e.sizeBytes ?? 0) / 1e5 * 0.5 + r() * 0.2, 2) : round((3 + (e.params / 1e6) * 0.32) * lm * (0.9 + r() * 0.2), 1);
      return {
        engine, backend, browser: "chromium",
        load_ms: lib ? Math.round(5 + r() * 15) : Math.round(150 + sizeBytes / 1e6 * 25 * lm),
        cold_first_ms: lib ? round(p50 * 3, 1) : Math.round(p50 * 3.5),
        latency_ms: { p50, p95: round(p50 * 1.6, 1), p99: round(p50 * 2.3, 1) },
        tokens_per_s: lib ? undefined : Math.round(11 / (p50 / 1000)),
        memory_mb: lib ? round(2 + (e.sizeBytes ?? 0) / 1e6 * 4, 1) : Math.round(35 + (sizeBytes / 1e6) * 2.4 * mm),
        download_bytes: sizeBytes, n: 200, browser_accuracy: round(exact - 0.004 - r() * 0.012),
      };
    });
    // Emulated phone profiles: CPU throttle on the wasm/js entries (no WebGPU on phones).
    const mobile = bench
      .filter((b) => b.backend !== "webgpu")
      .flatMap((b) =>
        ([["mobile-4x", 4], ["mobile-6x", 6]] as const).map(([profile, k]) => ({
          ...b, profile,
          load_ms: Math.round(b.load_ms * k * 0.8),
          cold_first_ms: round(b.cold_first_ms * k * 0.85, 1),
          latency_ms: { p50: round(b.latency_ms.p50 * k * 0.9, 2), p95: round(b.latency_ms.p95 * k * 0.95, 2), p99: round(b.latency_ms.p99 * k, 2) },
          tokens_per_s: b.tokens_per_s ? Math.round(b.tokens_per_s / (k * 0.9)) : undefined,
          browser: "chromium-mobile",
          n: 100,
        })),
      );
    writeJson(path.join(dir, "timing.json"), makeTiming(e, r, [...bench.map((b) => ({ backend: b.backend, profile: "desktop" })), ...mobile.map((b) => ({ backend: b.backend, profile: b.profile }))], 12 + r() * 6));
    writeJson(path.join(dir, "bench.json"), [...bench.map((b) => ({ ...b, profile: "desktop" })), ...mobile]);
    fs.writeFileSync(path.join(dir, "errors.jsonl"), jsonl(errors));
    if (!lib) {
      writeJson(path.join(dir, "manifest.json"), {
        experiment: id, engine: bench[0]!.engine, quant: e.quant,
        files: e.fmt === "gguf" ? { model: "model.gguf" } : { encoder: "encoder_model.onnx", decoder: "decoder_model.onnx", tokenizer: "tokenizer.json" },
        config: { max_input_tokens: 48, max_output_tokens: 32, decoder_start_token_id: 0, eos_token_id: 1 },
      });
    } else {
      writeJson(path.join(dir, "manifest.json"), { experiment: id, engine: bench[0]!.engine, files: {}, config: {} });
    }
    console.log(id, e.title, `exact ${exact.toFixed(3)}`, `errors ${errors.length}`);
  });
}
main();
