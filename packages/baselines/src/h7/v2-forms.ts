// h7 lazy part: DSL v2 families and web-pool fixes. Not an engine. Loaded by src/h7.ts when the text has a cue.
import { baseFull, dim, scanBad, AMT, MONRE, WD7, WDRE7, WEEKDAY5, amt, compactStyle, monN, p2, parseBase, parseToks, plain, pp, scan, sortWd, sp, wdCode } from "../h7";
import type { Tok } from "../h7";

function unsupported(s: string): boolean {
  return (
    /\b(twice|thrice)\b|\b(\d+|once|two|three|four|five) times (a|per|each|every) (day|week|month|year)\b|\bevery (few|couple of|couple) (days|weeks|months)\b|\bseveral times\b/.test(s) ||
    /\b(summer|winter|spring|autumn|fall)\b (break|term|semester|holidays?|vacation)|(?<!\d)\b(christmas|thanksgiving|easter|new year'?s?|xmas|holiday|memorial day|labor day) (week|weekend|season|break|period)\b(?!.*\d)|\b(first|second|1st|2nd) half of\b|\b(last|final) business day of\b|\b(first|second|third|fourth|1st|2nd|3rd|4th|last) week of\b/.test(s) ||
    /\b(in|within|after|for) (an? |\d+ |half an? |a couple of )?(minutes?|mins?|hours?|hrs?|seconds?)\b.*\b(from now|ago|later)\b|\b\d+ ?(minutes?|mins?|hours?|hrs?) (from now|ago|later)\b|\bin (\d+|an?|half an?|one|two|three|four|five|ten|fifteen|twenty|thirty) ?(minutes?|mins?|hours?|hrs?)\b(?! (on|at))/.test(s)
  );
}

// ---- counted occurrences: "last 3 fridays", "next 2 weekends", "past 5 working days"
function counted(T: Tok[]): string | null {
  for (let i = 0; i + 2 < T.length; i++) {
    const m = T[i]!;
    if (m.k !== "mod" || !m.v) continue;
    const n = T[i + 1]!;
    const g = T[i + 2]!;
    if (n.k !== "n" || n.o || n.v! < 1 || n.v! > 60) continue;
    const dir = m.v > 0 ? "+" : "-";
    const N = n.v!;
    let items: string[] | null = null;
    let used = 3;
    if (g.k === "w") {
      // "next 3 mon thu fri", "next 3 m/th/f": N of each weekday
      const wds = [g.s!];
      let j = i + 3;
      while (T[j] && (T[j]!.k === "and" || (T[j]!.k === "sep" && T[j]!.s === "-")) && T[j + 1]?.k === "w") j++;
      while (T[j]?.k === "w" && wds.length < 7) {
        wds.push(T[j]!.s!);
        j++;
        while (T[j] && (T[j]!.k === "and" || (T[j]!.k === "sep" && T[j]!.s === "-")) && T[j + 1]?.k === "w") j++;
      }
      used = j - i;
      items = wds.flatMap((w) => Array.from({ length: N }, (_, q) => `${w}${dir}${q + 1}`));
    }
    else if (g.k === "wkds") items = Array.from({ length: N }, (_, q) => [`sa${dir}${q + 1}`, `su${dir}${q + 1}`]).flat();
    else if (g.k === "wkd" || (g.k === "work" && T[i + 3]?.k === "u" && T[i + 3]!.s === "d")) {
      items = Array.from({ length: N }, (_, q) => `${dir}${q + 1}b`);
      if (g.k === "work") used = 4;
    }
    if (!items || items.length > 31) continue;
    const rest = [...T.slice(0, i), ...T.slice(i + used)];
    const tm = parseToks(rest);
    if (g.k !== "w" && tm.startsWith("t ") && dir === "+") {
      // "the next 5 weekdays at 7am": a counted recurrence
      const cnt = g.k === "wkds" ? 2 * N : N;
      return `dt R ${g.k === "wkds" ? "w" : "d"}/1 ${g.k === "wkds" ? "sa,su" : WEEKDAY5} n${cnt} ${tm.slice(2)}`;
    }
    return tm.startsWith("t ") ? `dt ${items.join(",")} ${tm.slice(2)}` : `d ${items.join(",")}`;
  }
  return null;
}

// ---- anchored offsets: "3 days before oct 15", "the monday after thanksgiving", "5 business days after oct 1"
function anchored(T: Tok[]): string | null {
  for (let c = 1; c < T.length; c++) {
    const mk = T[c]!;
    const back = mk.k === "before" || (mk.k === "ago" && T[c + 1]?.k === "sep" && T[c + 1]!.s === "to");
    const fwd = mk.k === "after" || (mk.k === "from" && mk.s === "from" && c > 0) || (mk.k === "of" && T[c - 1]?.k === "u" && T[c - 2]?.k === "work");
    if (T.slice(0, c).some((t) => t.k === "every")) continue;
    if (!back && !fwd) continue;
    let a = c + 1 + (mk.k === "ago" ? 1 : 0);
    if (T[a]?.k === "from") a++; // "on from"
    let pi = c - 1;
    let N = 1;
    let unit = "";
    const pv = T[pi]!;
    if (pv.k === "u") {
      unit = pv.s!;
      if (T[pi - 1]?.k === "work") (unit = "b"), pi--;
      const nm = T[pi - 1];
      if (nm && (nm.k === "n" || nm.k === "a") && !nm.o) N = nm.k === "a" ? 1 : nm.v!;
    } else if (pv.k === "work" || (pv.k === "wkd" && false)) continue;
    else if (pv.k === "part") (unit = "d"), (N = 1);
    else if (pv.k === "w") unit = "wd";
    else continue;
    const rest = T.slice(a);
    if (!rest.length || ["rel", "now", "after", "before"].includes(rest[0]!.k)) continue;
    if (rest.some((t) => t.k === "rel")) continue;
    const r = pp(rest);
    const [mode, body] = sp(r);
    if (mode !== "d" || !plain(body) || /^[+-]\d+[dwmy]$/.test(body)) continue;
    const sign = back ? "-" : "+";
    if (unit === "wd") {
      const m = /^(mo|tu|we|th|fr|sa|su)(?:#-?\d@\d\d|[+-]\d+)?$/.exec(body);
      if (!m) continue;
      const ai = WD7.indexOf(m[1]!);
      const ti = WD7.indexOf(pv.s!);
      const diff = back ? (((ai - ti + 7) % 7) || 7) : (((ti - ai + 7) % 7) || 7);
      return `d ${body}~${sign}${diff % 7 === 0 ? `${diff / 7}w` : `${diff}d`}`;
    }
    if (/^M@/.test(body)) return "x";
    return `d ${body}~${sign}${N}${unit}`;
  }
  return null;
}

// ---- business days without an anchor: "next business day", "3 working days from now"
function businessDays(T: Tok[]): string | null {
  if (T.some((t) => ["every", "daily", "weekly"].includes(t.k))) return null;
  for (let i = 0; i + 1 < T.length; i++) {
    if (T[i]!.k !== "work" || !(T[i + 1]!.k === "u" && T[i + 1]!.s === "d")) continue;
    if (T[i - 1]?.k === "n" && T[i - 2]?.k === "sep" && T[i - 3]?.k === "n") return "x";
    const pv = T[i - 1];
    let N = 1;
    let sign = "+";
    if (pv && (pv.k === "n" || pv.k === "a") && !pv.o) N = pv.k === "a" ? 1 : pv.v!;
    else if (pv && pv.k === "mod") sign = pv.v! < 0 ? "-" : "+";
    if (T.slice(i + 2).some((t) => t.k === "ago")) sign = "-";
    else if (pv && pv.k === "n" && T.slice(i + 2).some((t) => t.k === "before")) sign = "-";
    return `d ${sign}${N}b`;
  }
  return null;
}

// ---- windows, rest of a period, quarters
function windows(T: Tok[], s: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = s.match(/\b(month|year|quarter|week) to date\b|\bytd\b/))) return `d ${m[1] === "year" || s.includes("ytd") ? "Y" : m[1] === "month" ? "M" : m[1] === "week" ? "W" : "Q"}+0>+0d`;
  if ((m = s.match(/\b(rest|remainder|remaining)\b.*?\b(week|month|year|quarter)\b/))) return `d +0d>${m[2] === "year" ? "Y" : m[2] === "month" ? "M" : m[2] === "week" ? "W" : "Q"}+0`;
  if ((m = s.match(/\b(this|current|next|following|last|previous|past) quarter\b/)) && !/\bto date\b/.test(s)) return `d Q${/^(this|current)/.test(m[1]!) ? "+0" : /^(next|following)/.test(m[1]!) ? "+1" : "-1"}`;
  if ((m = s.match(/\bq([1-4])\b/))) return `d Q@${m[1]}`;
  if ((m = s.match(/\b(first|second|third|fourth|1st|2nd|3rd|4th) quarter\b/))) return `d Q@${({ first: 1, second: 2, third: 3, fourth: 4, "1st": 1, "2nd": 2, "3rd": 3, "4th": 4 } as Record<string, number>)[m[1]!]}`;
  if (T.some((t) => ["w", "wkd", "wkds", "every", "daily"].includes(t.k))) return null;
  for (let i = 0; i < T.length; i++) {
    const t = T[i]!;
    if (t.k !== "mod" || !t.v) continue;
    const n = T[i + 1];
    const u = n?.k === "n" ? T[i + 2] : n;
    if (u?.k === "biweekly" && u.s === "fn") return t.v < 0 ? "d -2w>+0d" : "d +0d>+2w";
    if (u?.k !== "u") continue;
    if (n!.k === "n" && !n!.o) return t.v < 0 ? `d -${n!.v}${u.s}>+0d` : `d +0d>+${n!.v}${u.s}`;
    if (t.s === "past" && n!.k === "u") return `d -1${u.s}>+0d`;
    if (n!.k === "u" && t.v > 0 && /\b(over|within|during|throughout|for) the (next|coming|following|upcoming)\b/.test(s)) return `d +0d>+1${u.s}`;
  }
  return null;
}

// ---- recurrences with bounds, month filters and exceptions
const UNITRE = "days?|weeks?|months?|years?|weekends?";
const unitOf = (u: string) => (u.startsWith("day") ? "d" : u.startsWith("month") ? "m" : u.startsWith("year") ? "y" : "w");
function recBounded(s0: string): string | null {
  let t = ` ${s0} `
    .replace(/\bwk ?ends?\b/g, "weekends")
    .replace(/\bwk ?days?\b/g, "weekdays")
    .replace(/\b(?:business|working|biz) days?\b|\bworkdays?\b/g, "weekdays")
    .replace(/\bmon-fri\b/g, "weekdays");
  const hasNth = new RegExp(`\\b${NTHP} +(?:\\w+ +)?${WDRE7}\\b`).test(t);
  if (!hasNth && /\b(?:every|each|the) month\b|\bof (?:the |each |every )?month\b/.test(t) || (t.match(new RegExp(`${MONRE} \\d|\\d(?:st|nd|rd|th)? ${MONRE}`, "g")) ?? []).length >= 2) return null;
  const lim = { u: "", s: "", mf: "", n: 0, any: false };
  const cut = (re: RegExp, f: (m: RegExpMatchArray) => void) => {
    const m = t.match(re);
    if (!m) return false;
    f(m);
    t = t.replace(re, " ");
    return true;
  };
  // exceptions
  let ex: string[] = [];
  let hasEx = false;
  const DL = `(?:weekends?|weekdays?|${WDRE7})`;
  cut(new RegExp(`\\b(?:except(?: for| on)?|but not|but|other than|sans|apart from|excluding|not on|minus)\\s+(?:the |on )?(${DL}(?:\\s*(?:,|and|or|&)\\s*(?:the )?${DL})*)`), (m) => {
    hasEx = true;
    for (const w of m[1]!.split(/\s*(?:,|and|or|&)\s*/)) {
      const x = w.replace(/^the /, "").trim();
      if (/^weekends?/.test(x)) ex.push("sa", "su");
      else if (/^weekdays?/.test(x)) ex.push(...WEEKDAY5.split(","));
      else if (x) ex.push(wdCode(x));
    }
  });
  // year flag for month filters
  const yearly = cut(/\b(?:every|each) year\b|\bforever\b/, () => {});
  // rolling windows
  let wk = false;
  const win = (sign: number) => (m: RegExpMatchArray) => {
    const N = amt(m[1]!);
    const u = unitOf(m[2]!);
    if (/^weekend/.test(m[2]!)) {
      wk = true;
      if (sign > 0) lim.n = 2 * N;
      else (lim.u = "+0d"), (lim.s = `-${N}w`);
      return;
    }
    if (sign > 0) (lim.u = `+${N}${u}`), (lim.s = "+0d");
    else (lim.u = "+0d"), (lim.s = `-${N}${u}`);
  };
  if (cut(/\bfor the (?:next|coming|following) (day|week|month|year)\b/, (m) => win(1)(Object.assign(["", "1", m[1]!], {}) as unknown as RegExpMatchArray))) lim.any = true;
  const FOR = "(?:(?:for|over|during|in|within|across|throughout) )?(?:the )?";
  if (lim.any) void 0;
  else if (cut(new RegExp(`\\b${FOR}(?:next|coming|following|upcoming) (${AMT}) (${UNITRE})\\b`), win(1))) lim.any = true;
  else if (cut(new RegExp(`\\b${FOR}(?:past|last|previous) (${AMT}) (${UNITRE})\\b`), win(-1))) lim.any = true;
  else if (hasEx && cut(new RegExp(`\\bfor (${AMT}) (weeks?|months?|days?)\\b`), win(1))) lim.any = true;
  const per = (rel: string, u: string) => `${u === "week" ? "W" : u === "month" ? "M" : u === "quarter" ? "Q" : "Y"}${/^(this|current)/.test(rel) ? "+0" : /^(next|coming|following)/.test(rel) ? "+1" : "-1"}`;
  if (!lim.any && cut(new RegExp(`\\b(?:(?:for|in|during|over|throughout|of) )?(?:the )?(this|current|next|coming|following|last|past|previous) (week|month|quarter|year)\\b`), (m) => {
    const p = per(m[1]!, m[2]!);
    lim.u = `u${p}`;
    lim.s = `s${p}`;
  })) lim.any = true;
  if (!lim.any) {
    if (cut(new RegExp(`\\bsince (?:the )?(${MONRE})(?: (\\d{1,2})(?:st|nd|rd|th)?)?`), (m) => {
      lim.u = "u+0d";
      lim.s = m[2] ? `s${p2(monN(m[1]!))}-${p2(+m[2])}<` : `sM@${p2(monN(m[1]!))}<`;
    })) lim.any = true;
    else if (cut(new RegExp(`\\bsince (\\d{1,2})(?:st|nd|rd|th)? (${MONRE})`), (m) => {
      lim.u = "u+0d";
      lim.s = `s${p2(monN(m[2]!))}-${p2(+m[1]!)}<`;
    })) lim.any = true;
  }
  if (!lim.any && cut(new RegExp(`\\b(?:until|till|through|thru|up to|by|to)\\s+(?:the )?(?:end of )?(?:${"(?:the )?"})?(${MONRE})(?: (\\d{1,2})(?:st|nd|rd|th)?)?(?![. ]*(?:\\d|(?:twenty|thirty|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|[a-z]+teenth)\\b))`), (m) => {
    lim.u = m[2] ? `u${p2(monN(m[1]!))}-${p2(+m[2])}` : `uM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  if (!lim.any && cut(new RegExp(`\\b(?:until|through|thru|till) (\\d{1,2})(?:st|nd|rd|th)? (${MONRE})`), (m) => {
    lim.u = `u${p2(monN(m[2]!))}-${p2(+m[1]!)}`;
  })) lim.any = true;
  if (cut(new RegExp(`\\b(?:from|starting|beginning|since) (?:in )?(${MONRE})(?: (?:onwards?|on))?(?![. ]*(?:\\d|(?:twenty|thirty|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|[a-z]+teenth)\\b))`), (m) => {
    lim.s = `sM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  // month filter ("every august") versus one period ("in august")
  const months: string[] = [];
  if (yearly) {
    t = t.replace(new RegExp(`\\b(?:in|during|of)?\\s*(${MONRE})(?: and (${MONRE}))?`, "g"), (m, a, b) => {
      if (!a) return m;
      months.push(`M@${p2(monN(a))}`);
      if (b) months.push(`M@${p2(monN(b))}`);
      return " ";
    });
  } else {
    cut(new RegExp(`\\b(?:every|each) (${MONRE})(?! \\d)`), (m) => {
      months.push(`M@${p2(monN(m[1]!))}`);
    });
  }
  lim.mf = months.join(",");
  if (!lim.any && !months.length && cut(new RegExp(`\\b(?:in|during|throughout|for) (?:the month of )?(${MONRE})(?: (20\\d\\d))?(?! \\d)`), (m) => {
    lim.u = `uM@${p2(monN(m[1]!))}`;
    lim.s = `sM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  if (!lim.any && !months.length && cut(/\bin (20\d\d)\b/, (m) => {
    lim.u = `u${m[1]}-12-31`;
    lim.s = `s${m[1]}-01-01`;
  })) lim.any = true;
  if (!lim.any && !months.length && hasEx && cut(new RegExp(`^\\s*(${MONRE})\\s`), (m) => {
    lim.u = `uM@${p2(monN(m[1]!))}`;
    lim.s = `sM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  if (!lim.any && !months.length && !hasEx) return null;
  // days: read from the tokens of what is left, so typos still count
  let days: string[] = [];
  let fq = "w";
  const T2 = scan(t.replace(/\s+/g, " ").trim());
  let plural = false;
  let nd = 0;
  for (const k of T2) {
    if (k.k === "w" && T2[T2.indexOf(k) + 1]?.k === "sep" && T2[T2.indexOf(k) + 2]?.k === "w") {
      const a0 = WD7.indexOf(k.s!);
      const b0 = WD7.indexOf(T2[T2.indexOf(k) + 2]!.s!);
      if (a0 < b0) days.push(...WD7.slice(a0, b0 + 1));
      else days.push(k.s!);
      nd++;
      plural = true;
    } else if (k.k === "w" && T2[T2.indexOf(k) - 1]?.k === "sep" && T2[T2.indexOf(k) - 2]?.k === "w" && WD7.indexOf(T2[T2.indexOf(k) - 2]!.s!) < WD7.indexOf(k.s!)) {
      // end of a weekday range, already added
    } else if (k.k === "wkd") (days.push(...WEEKDAY5.split(",")), (fq = "d"), (plural = true));
    else if (k.k === "wkds") (days.push("sa", "su"), (plural = true));
    else if (k.k === "w") (days.push(k.s!), nd++, k.pl && (plural = true));
  }
  let interval = 1;
  const IVN: Record<string, number> = { other: 2, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const ivm = new RegExp(`\\bevery (other|second|2nd|third|3rd|fourth|4th|two|three|four|five|six|\\d+)(?: (?:weeks?|wks?)\\b| (?=${WDRE7}))`).exec(t);
  if (ivm) interval = IVN[ivm[1]!] ?? +ivm[1]!;
  const nthm = new RegExp(`\\b(${NTHP}(?:(?:,| and|,? and|&|,) +(?:the )?${NTHP})*) +(${WDRE7})\\b`).exec(t);
  let nthDays: string[] = [];
  if (nthm) {
    const wd = wdCode(nthm[2]!);
    nthDays = nthm[1]!.match(new RegExp(NTHP, "g"))!.map((o) => `${wd}#${NTH[o]}`);
  }
  const everyDay = /\b(every ?day|daily|each day|all days|all week|every single day|every other day|each and every day)\b/.test(t);
  const cue = /\b(every|each|all)\b/.test(t);
  if (/\bevery other day\b/.test(t)) interval = 2;
  if (!days.length && (everyDay || hasEx)) (days = [...WD7]), (fq = "d");
  if (nthDays.length && !/\bmonth(?:ly)?\b|\bmonths\b/.test(t)) return null;
  if (nthDays.length) days = [];
  if (!days.length && !nthDays.length) return null;
  if (!nthDays.length && !(plural || cue || everyDay || hasEx || new Set(days).size >= 2)) return null;
  if (!lim.any && !months.length && !hasEx) return null;
  let set = nthDays.length ? nthDays : sortWd(days).filter((d) => !ex.includes(d));
  if (nthDays.length) fq = "m";
  if (hasEx && fq === "w" && days.length === 7) fq = "d";
  if (hasEx && ex.length && fq === "w" && !plural) fq = "d";
  // time
  let time = "";
  const tre = /(?:\bat\s+|\bfrom\s+|@\s*)?(\d{1,2}(?::\d\d)?\s*(?:am|pm|a|p)?\s*(?:-|to|until|till)\s*\d{1,2}(?::\d\d)?\s*(?:am|pm|a|p)?|\d{1,2}(?::\d\d)?\s*(?:am|pm|a|p)\b|\d{1,2}:\d\d|\bat\s+\d{1,2}\b|\bat (?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b(?: ?(?:am|pm))?|\bnoon\b|\bmidnight\b)/;
  const tm = t.match(tre);
  if (tm) {
    const r = parseBase(tm[0] + (/^ in the (?:morning|afternoon|evening|night)/.exec(t.slice(tm.index! + tm[0].length))?.[0] ?? ""));
    if (r.startsWith("t ")) time = r.slice(2);
  }
  const f = fq === "d" && interval === 2 && /\bevery other day\b/.test(t) ? "d/2" : `${fq}/${fq === "w" ? interval : 1}`;
  const parts = ["R", f];
  if (!(set.length === 7 && !hasEx)) parts.push(set.join(","));
  if (lim.mf) parts.push(lim.mf);
  if (lim.n) parts.push(`n${lim.n}`);
  const u = lim.u.startsWith("u") ? lim.u : lim.u ? `u${lim.u}` : "";
  const st = lim.s.startsWith("s") ? lim.s : lim.s ? `s${lim.s}` : "";
  if (u) parts.push(u);
  if (time) parts.push(time);
  if (st) parts.push(st);
  void wk;
  return `${time ? "dt" : "d"} ${parts.join(" ")}`;
}

// ---- date lists: "oct 2, oct 9 and oct 16", "the 1st and 15th", "dec 1, 8 and 15"
function dateList(T: Tok[]): string | null {
  if (T.some((t) => t.k === "between")) return null;
  type El = { s: string };
  let best: { els: string[]; end: number; start: number } | null = null;
  for (let i = 0; i < T.length; i++) {
    const els: string[] = [];
    let mo = 0;
    let j = i;
    let first = true;
    const dom = (x: Tok) => x.k === "n" && x.v! >= 1 && x.v! <= 31 && (x.len ?? 9) <= 2 && !x.w;
    while (j < T.length) {
      const t = T[j]!;
      const sep = !first && (t.k === "and" || t.cm);
      let q = j;
      if (!first && t.k === "and") q++;
      else if (!first && !t.cm) break;
      const e = T[q]!;
      if (!e) break;
      if (e.k === "D" && !e.s!.startsWith("0000")) {
        els.push(e.s!);
        const mm = /^(?:\d{4}-)?(\d\d)-/.exec(e.s!);
        if (mm) mo = +mm[1]!;
        j = q + 1;
      } else if (e.k === "m" && !e.p && T[q + 1] && dom(T[q + 1]!) && !(T[q + 2]?.k === "mer") && !(T[q + 2]?.k === "t")) {
        mo = e.v!;
        els.push(`${p2(mo)}-${p2(T[q + 1]!.v!)}`);
        j = q + 2;
      } else if (!first && mo && dom(e) && !T[q + 1]?.k.match(/^(mer|t|u|sep)$/) && (sep || e.o || t.cm)) {
        els.push(`${p2(mo)}-${p2(e.v!)}`);
        j = q + 1;
      } else if (!first && !mo && e.k === "n" && e.o && dom(e)) {
        els.push(`D@${p2(e.v!)}`);
        j = q + 1;
      } else if (first && e.k === "n" && e.o && dom(e) && (e.the || e.po) && !T.some((x) => x.k === "m")) {
        els.push(`D@${p2(e.v!)}`);
        j = q + 1;
      } else break;
      first = false;
    }
    if (els.length >= 2 && (!best || els.length > best.els.length)) best = { els, end: j, start: i };
  }
  if (!best) return null;
  // reject if a range word sits in the run
  if (T.slice(best.start, best.end).some((t) => t.k === "sep")) return null;
  const rest = [...T.slice(0, best.start), ...T.slice(best.end)];
  const r = parseToks(rest);
  void ({} as El);
  return r.startsWith("t ") ? `dt ${best.els.join(",")} ${r.slice(2)}` : `d ${best.els.join(",")}`;
}

// ---- open ranges: "after 2pm", "before noon", "until friday", "from monday on", "since monday", "by 9pm"
function openRange(T: Tok[], s: string): string | null {
  const recCue = T.some((t) => ["every", "daily", "weekly", "monthly", "wkd", "wkds"].includes(t.k));
  for (let c = 0; c < T.length; c++) {
    const k = T[c]!;
    const isUntil = k.k === "before" || (k.k === "sep" && k.s === "until");
    const isFrom =
      k.k === "after" ||
      k.k === "since" ||
      (k.k === "from" && k.s === "from" && /\b(on|onwards?|forward)\b/.test(s) && !/\b(to|until|till|through|thru)\b/.test(s)) ||
      (k.k === "from" && k.s === "start" && /\b(starting|beginning)\b/.test(s) && !recCue && !T.slice(c).some((t) => t.k === "sep" && t.s !== "to"));
    if (!isUntil && !isFrom) continue;
    const nx = T[c + 1];
    if (!nx || ["?", "work", "skip", "u", "part", "now", "after", "before"].includes(nx.k)) continue;
    if (nx.k === "n" && !nx.o && T[c + 2]?.k === "?" && k.k !== "from") continue;
    if (k.k === "from" && k.s === "from" && T.slice(c + 1).some((t) => t.pl)) return null;
    const pv = T[c - 1];
    if (pv && (pv.k === "u" || pv.k === "w" || pv.k === "part" || pv.k === "hence" || pv.k === "ago")) continue;
    const pre = T.slice(0, c);
    const rest = T.slice(c + 1).map((t) => (t.pl ? { ...t, pl: false } : t));
    let r = pp(rest);
    let [mode, body] = sp(r);
    // a bare hour right after "from ... on", "before 5"
    if ((mode === "x" || mode === "d") && nx.k === "n" && !nx.o && nx.v! >= 1 && nx.v! <= 12 && (nx.len ?? 9) <= 2 && !["m", "u", "mer", "t"].includes(T[c + 2]?.k ?? "")) (mode = "t"), (body = `${nx.v}?`);
    const em = s.match(/\bend of (?:the |this )?(month|week|year)\b/);
    if (em) (mode = "d"), (body = `${em[1] === "month" ? "M" : em[1] === "week" ? "W" : "Y"}+0`);
    if (!plain(body) && !/^[WMY]\+0$/.test(body)) continue;
    if (mode === "x") continue;
    if (k.s === "by" && mode === "t" && /^\d{1,2}(:\d\d)?\?$/.test(body) && !rest.some((t) => t.k === "mer" || t.k === "t" || t.k === "noon")) continue;
    if (isUntil && body.endsWith("?") && pre.some((t) => t.k === "m" || t.k === "D") && rest.length === 1 && rest[0]!.k === "n") return null;
    let head = "";
    const pr = pre.length ? pp(pre) : "x";
    if (pr !== "x") {
      const [pm, pb] = sp(pr);
      if (pm === "d" && plain(pb) && mode === "t") (head = `${pb} `), (mode = "dt");
      else return null;
    }
    if (k.k === "since") {
      if (/^(mo|tu|we|th|fr|sa|su)$/.test(body)) return `d ${body}<>`;
      return `${mode} ${head}${body}>`;
    }
    return isUntil ? (head ? `dt >${head}${body}` : `${mode} >${body}`) : `${mode} ${head}${body}>`;
  }
  return null;
}

// ---- durations: "3pm for 2 hours", "9am (45 min)", "tomorrow 9am for 90 minutes"
function duration(s0: string): string | null {
  const s = s0.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[ -](one|two|three|four|five|six|seven|eight|nine)\b/g, (_, a, b) => String(({ twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 } as Record<string, number>)[a]! + ({ one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 } as Record<string, number>)[b]!));
  const W = AMT.replace("\\d+|", "");
  const re = new RegExp(`(?:\\b(?:for|lasting|lasts?|takes?|taking|runs?|running)\\s+(?:like |about |around |roughly )?(?:an? )?|\\()?\\b(an hour and a half|half an hour|half hour|an hour|(?:(\\d+(?:\\.\\d+)?|${W})\\s*(?:hours?|hrs?)\\b|(\\d+(?:\\.\\d+)?)\\s*h\\b)(?:\\s*(?:and\\s*)?(\\d+)\\s*(?:minutes?|mins?|m)\\b)?|(?:(\\d+|${W})\\s*(?:minutes?|mins?)\\b|(\\d+)\\s*m\\b))\\)?`);
  const m = s.match(re);
  if (!m) return null;
  const before = s.slice(0, m.index);
  const after = s.slice(m.index! + m[0].length);
  if (/\b(in|within|after|every|past|last|next|over)\s*$/.test(before) || /^\s*(ago|from now|later|before|after|of)\b/.test(after)) return null;
  let tok: string;
  const g = m[1]!;
  if (g === "an hour and a half") tok = "+90m";
  else if (g === "half an hour" || g === "half hour") tok = "+30m";
  else if (g === "an hour") tok = "+1h";
  else if (m[2] || m[3]) {
    const w = (m[2] ?? m[3])!;
    const h = /^\d/.test(w) ? +w : amt(w);
    if (m[4]) tok = `+${Math.round(h * 60 + +m[4])}m`;
    else if (!Number.isInteger(h)) tok = `+${Math.round(h * 60)}m`;
    else tok = `+${h}h`;
  } else tok = `+${/^\d/.test((m[5] ?? m[6])!) ? (m[5] ?? m[6]) : amt((m[5] ?? m[6])!)}m`;
  const n = +tok.slice(1, -1);
  if ((tok.endsWith("h") && (n < 1 || n > 48)) || (tok.endsWith("m") && (n < 1 || n > 1440))) return null;
  if (!/\b(?:for|lasting|lasts?|takes?|taking|runs?|running)\s+(?:like |about |around |roughly )?(?:an? )?$|\($/.test(before) && !/(?:\d|am|pm|noon|midnight|[ap]\.?m\.?|o\'?clock|ish)\s*$/.test(before.trim() + " ") && !/\b(?:for|lasting|lasts?|takes?|taking|runs?|running)\b/.test(m[0])) return null;
  const rem = (before + " " + after).replace(/\s+/g, " ").trim();
  let r = pp(scan(rem));
  if (r === "x") {
    const hm = rem.match(/\b(1[0-2]|[1-9])\b(?![:.]\d)/);
    if (hm) r = `t ${hm[1]}?`;
  }
  const [mode, body] = sp(r);
  if (mode === "x" || body.includes(">") || /,/.test(body)) return null;
  if (body.startsWith("R ")) {
    const parts = body.split(" ");
    const ti = parts.findIndex((x, j) => j > 1 && /^\d{1,2}(:\d\d)?\??$|^\d\d:\d\d$/.test(x));
    if (ti < 0) return null;
    parts[ti] = parts[ti] + ">" + tok;
    return `${mode} ${parts.join(" ")}`;
  }
  if (mode === "d") return null;
  return `${mode} ${body}>${tok}`;
}

// ---- weekday lists without a recurrence cue: "mon wed fri", "sat and sun", "m t w th"
const NTH: Record<string, number> = { first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5, last: -1 };
const NTHP = "(?:first|second|third|fourth|fifth|last|[1-5](?:st|nd|rd|th))";

/** "1st and 3rd fridays", "last friday of every month at 5pm" -> monthly nth-weekday recurrence. */
function nthRec(s: string): string | null {
  const m = new RegExp(`\\b(?:the |every |each )?(${NTHP}(?:(?:,| and|,? and|&|,) +(?:the )?${NTHP})*) +(mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat|sun)[a-z]*\\b`).exec(s);
  if (!m) return null;
  const wd = WD7.find((w) => m[2]!.startsWith(w === "mo" ? "mon" : w === "tu" ? "tue" : w === "we" ? "wed" : w === "th" ? "thu" : w === "fr" ? "fri" : w === "sa" ? "sat" : "sun"));
  if (!wd) return null;
  const ords = m[1]!.match(new RegExp(NTHP, "g"))!.map((o) => NTH[o]!);
  const monthly = /\b(?:every|each) month\b|\bmonthly\b|\bof the month\b/.test(s) || (ords.length > 1 && /\b\w+s\b/.test(m[0]));
  if (!monthly) return null;
  if (/\b(until|till|through|since|from|for the|in |times?|x\d|start\w*|begin\w*|stsrt\w*|end(?:ing|s)?)\b|\d+\/\d+/.test(s)) return null;
  const rest = (s.slice(0, m.index) + " " + s.slice(m.index + m[0].length)).replace(/\b(of|every|each|month|monthly|the)\b/g, " ").replace(/\s+/g, " ").trim();
  const days = ords.map((o) => `${wd}#${o}`).join(",");
  if (!rest) return `d R m/1 ${days}`;
  const r = parseToks(scan(rest));
  const [rm, rb] = sp(r);
  return rm === "t" ? `dt R m/1 ${days} ${rb}` : null;
}

function weekdayList(T: Tok[], sRaw: string): string | null {
  const wd = T.filter((t) => t.k === "w" && !t.p).map((t) => t.s!);
  if (new Set(wd).size < 2) return null;
  if (T.some((t) => ["every", "daily", "weekly", "wkd", "wkds", "m", "D", "rel", "mod", "u", "sep", "other", "monthly"].includes(t.k))) return null;
  const rest = T.filter((t) => !(t.k === "w" || t.k === "and" || t.k === "skip"));
  const r = rest.length ? parseToks(rest) : "x";
  const days = sortWd(wd).join(",");
  const style = compactStyle || (/[a-z]\s*[\/+]\s*(mon|tue|wed|thu|fri|sat|sun)/.test(sRaw) ? "slash" : "");
  const hasMer = rest.some((t) => t.k === "mer");
  const rec = (style === "compact" && (wd.length >= 3 || rest.length > 0)) || (style === "slash" && (wd.length >= 3 || rest.length > 0)) || (style === "spaced" && hasMer) || (T.some((t) => t.k === "w" && t.pl) && false);
  if (rec) return null;
  if (r.startsWith("t ")) return rec ? `dt R w/1 ${days} ${r.slice(2)}` : `dt ${days} ${r.slice(2)}`;
  if (rest.length && r !== "x") return null;
  if (rest.some((t) => t.k === "?")) return null;
  return rec ? `d R w/1 ${days}` : `d ${days}`;
}


// ---------------------------------------------------------------- web-pool fixes (rewrites and direct forms)
const MN = "(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const WDN = "(?:mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nesday)?|thu(?:r(?:s(?:day)?)?)?|fri(?:day)?|sat(?:urday)?|sun(?:day)?)s?\\b";
const UNIT: Record<string, string> = { d: "d", day: "d", w: "w", wk: "w", week: "w", m: "m", mo: "m", month: "m", y: "y", yr: "y", year: "y" };
const W1 = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
const W10 = "- - twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
/** "seventy two", "one hundred and thirty-six", "two thousand and sixteen" as a number. */
function wordNum(s: string): number | null {
  let total = 0;
  let cur = 0;
  let seen = false;
  for (const w of s.trim().split(/[ ,-]+/)) {
    if (w === "and" || w === "o" || w === "oh" || (w === "a" && !seen)) continue;
    let k: number;
    if ((k = W1.indexOf(w)) >= 0) cur += k;
    else if ((k = W10.indexOf(w)) >= 2) cur += k * 10;
    else if (w === "hundred") cur = (cur || 1) * 100;
    else if (w === "thousand") (total += (cur || 1) * 1000), (cur = 0);
    else return null;
    seen = true;
  }
  return seen ? total + cur : null;
}
const NW = "(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|and|[ -])+";
const HOLD: [RegExp, string][] = [
  [/\bapril fool'?s?(?: day)?\b(?! ?\d)/g, "april 1"],
  [/\bflag day\b/g, "june 14"],
  [/\bveterans?'?s? day\b/g, "november 11"],
  [/\bearth day\b/g, "april 22"],
  [/\bgroundhog'?s? day\b/g, "february 2"],
  [/\bchristmas[- ]eve\b/g, "december 24"],
];
const ymdS = (y: number, m: number, d: number) => (m >= 1 && m <= 12 && d >= 1 && d <= dim(y, m) ? `${y}-${p2(m)}-${p2(d)}` : null);
const monIdx = (w: string) => monN(w);

/** Text fixes that only the lazy module applies. */
function rewrite(s0: string): string {
  let s = s0;
  // seconds and time zones
  s = s
    .replace(/(\d:\d\d:\d\d(?:\.\d+)?)\s*(?:z|[+-]\d\d:?\d\d)\b/g, "$1")
    .replace(/\b(\d{1,2}):(\d{1,2}):(\d{1,2})(?:\.\d+)?/g, (_, h, m) => `${h}:${p2(+m)}`)
    .replace(/\b(?:gmt|utc)\s*[+-]\d{1,4}(?::?\d\d)?(?:\s*\([^)]*\))?/g, " ")
    .replace(/(\d:\d\d(?:\s*[ap]m)?)\s*[+-]\d{4}\b(?![-:/\d])/g, "$1")
    .replace(/(\d(?::\d\d)?(?:\s*[ap]m)?|\dh)\s*(?:z|utc|gmt|[ecmp][sd]t|jst|bst|cet|cest|eet)\b(?:\s*\([a-z ]+\))?/g, "$1");
  // "10h30", "8h"
  s = s.replace(/\b(\d{1,2})h(\d\d)\b/g, "$1:$2").replace(/\b(\d{1,2})h\b/g, (m, h, off, all) => (/(?:\d|[ap]m|for|runs?|lasts?)\s+$/.test(all.slice(0, off)) ? m : h));
  // "apr 4 00:22 1995" -> "apr 4 1995 00:22"
  s = s.replace(new RegExp(`\\b${MN}\\.? (\\d{1,2}) (\\d{1,2}:\\d\\d(?: ?[ap]m)?) (\\d{4})\\b`, "g"), "$1 $2 $4 $3");
  // year words after a month name
  if (new RegExp(`\\b${MN}\\b`).test(s)) {
    s = s.replace(new RegExp(`\\b(nineteen|eighteen|seventeen|sixteen|twenty|two thousand)((?: and)?[ ,-]+(?:o |oh )?${NW})(?=$|[ ,.])`, "g"), (m, a, b) => {
      const rest = wordNum(b.replace(/^ and/, ""));
      if (a === "two thousand") return rest !== null && rest < 100 ? String(2000 + rest) : m;
      const n = W1.indexOf(a === "twenty" ? "twenty" : a);
      const hi = a === "twenty" ? 20 : n;
      return rest !== null && rest >= 0 && rest < 100 && !(a === "twenty" && rest < 10 && !/\bo/.test(b)) ? String(hi * 100 + rest) : m;
    });
  }
  // month day year with a year the scanner would read as a time
  const yok = (y: string, before: string, after: string, comma: boolean) => +y >= 1000 && ((+y < 1900 || +y > 2099) ? comma || +y > 2359 || /^\s*\d{1,2}:\d\d/.test(after) || new RegExp(`${WDN}\\s*,?\\s*$`).test(before) : false);
  s = s.replace(new RegExp(`\\b${MN}\\.? (\\d{1,2})(?:st|nd|rd|th)?(,?) (\\d{4})\\b`, "g"), (m, mo, d, c, y, off, all) => {
    const iso = yok(y, all.slice(0, off), all.slice(off + m.length), c === ",") ? ymdS(+y, monIdx(mo), +d) : null;
    return iso ?? m;
  });
  s = s.replace(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)? (?:of )?${MN}\\.?(,?) (\\d{4})\\b`, "g"), (m, d, mo, c, y, off, all) => {
    const iso = yok(y, all.slice(0, off), all.slice(off + m.length), c === ",") ? ymdS(+y, monIdx(mo), +d) : null;
    return iso ?? m;
  });
  // "last day of october 2015", "first day of feb", "the second day of april"
  s = s.replace(new RegExp(`\\b(?:the )?last day of (?:the month of )?${MN}( \\d{4})?`, "g"), (_, mo, y) => `${dim(y ? +y : 2001, monIdx(mo))} ${mo}${y ?? ""}`);
  s = s.replace(new RegExp(`\\b(?:the )?(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|\\d{1,2}(?:st|nd|rd|th)|twenty[ -]?\\w*|thirty[ -]?\\w*|\\w+teenth) day of (?=${MN})`, "g"), "$1 of ");
  s = s.replace(/\b(?:morning|afternoon|evening|night) of (?=(?:the )?\d)/g, " ");
  // next/this month names
  s = s.replace(new RegExp(`\\b(?:next|upcoming|coming) ${MN}\\b(?= \\d)`, "g"), "$1").replace(new RegExp(`\\bof (?:next|this) ${MN}\\b`, "g"), "of $1");
  s = s.replace(new RegExp(`\\b(${WDN}) this ${MN}\\b`, "g"), "$1 of $2");
  s = s.replace(/\b(?:next|upcoming|coming|this) (christmas|xmas|halloween|thanksgiving|easter)\b/g, "$1");
  for (const [re, to] of HOLD) s = s.replace(re, to);
  // tomorrow + day part
  s = s.replace(/\btomm?orning\b/g, "tomorrow morning").replace(/\btom ?(?=morning|afternoon|evening|night)/g, "tomorrow ").replace(/\btomnight\b/g, "tomorrow night");
  s = s.replace(/\bthis (noon|midnight)\b/g, "$1").replace(/\bthis day\b(?! (?:next|last))/g, "today").replace(/\bcurrent (week|month|year)\b/g, "this $1").replace(/\bthis upcoming\b/g, "this");
  // date and time joined by a dash or comma, or time before am/pm
  s = s.replace(new RegExp(`(\\d{4}|\\b${MN}\\.? \\d{1,2}(?:st|nd|rd|th)?|\\b\\d{1,2}(?:st|nd|rd|th)? ${MN}\\.?)\\s*-\\s*(?=\\d{1,2}:\\d\\d|\\d{1,2}\\s*[ap]m\\b)`, "g"), "$1 ");
  s = s.replace(/(\d)\s+([ap]m)\s+(\d{1,2}:\d\d)/g, "$1 $3 $2");
  s = s.replace(/(?<![\d:])0\s*am\b/g, "12am");
  // numeric dates written with spaces or dots
  s = s.replace(/(?<![\d./:-])(\d{1,2})\.? (\d{1,2})\.? (\d{4})\b\.?/g, (_, a, b, y) => (+a > 12 || +b > 12 ? `${a}.${b}.${y}` : `${a}/${b}/${y}`));
  s = s.replace(/(?<![\d./:-])(\d{4}) (\d\d) (\d\d)(?![\d:])/g, "$1-$2-$3");
  s = s.replace(/\b(\d{4}-\d\d-)(\d\d)\/(\d\d)\b/g, "$1$2 to $1$3");
  s = s.replace(new RegExp(`^(\\d{1,2})-${MN}$`), "$1 $2");
  // quarters, "up to", "in next tuesday"
  s = s.replace(/\boccurrences?\b/g, "times").replace(/\bqtr\b/g, "quarter").replace(/\bquarter ([1-4])\b/g, "q$1").replace(/\bup to (?=\d)/g, "until ").replace(new RegExp(`\\bin (next|this|last) (?=${WDN})`, "g"), "$1 ").replace(new RegExp(`\\b(?:the )?(?:upcoming|coming) (?=${WDN})`, "g"), "");
  s = s.replace(new RegExp(`\\b((?:every|each) ${WDN}) or (?=${WDN})`, "g"), "$1 and ");
  // "every 8 weeks starting thursday", "every week starts this wednesday": the weekday is the day
  s = s.replace(new RegExp(`^((?:\\\\w+ )*every [a-z0-9 ]*?(?:days?|weeks?|months?)) (?:starts?|starting|beginning|begins?)(?: on| this)? (${WDN})((?: (?:until|till|for) .*)?)$`), "$1 on $2$3");
  // two times joined by "and" without a range cue: the first one is the label
  if (!/\b(to|until|till|through|thru|between|every|each|from)\b|\d\s*-\s*\d/.test(s)) s = s.replace(/^(.*?(?:[ap]m|\bat \d+(?::\d\d)?))\s+and\s+(?=.*(?:\d:\d\d|\d\s*[ap]m|\bat \d))(?!.*\bevery\b).*$/, "$1");
  s = s.replace(/^starting (.+?) and ending (.+)$/, "from $1 to $2").replace(/\b(?:morning|afternoon|evening|night) of (?=(?:the )?\d)/g, " ");
  // clock words: "six thirty-two", "eight forty-five", "twelve oh-nine"
  s = s.replace(/^(?:at )?(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)[ -](?:(?:o|oh)[ -](one|two|three|four|five|six|seven|eight|nine)|((?:twenty|thirty|forty|fifty)(?:[ -](?:one|two|three|four|five|six|seven|eight|nine))?))( ?[ap]m)?$/, (m, h, o, t, ap) => `${W1.indexOf(h)}:${p2(o ? W1.indexOf(o) : wordNum(t)!)}${ap ?? ""}`);
  // cron English
  s = s.replace(/^at (\d{1,2}:\d\d(?: ?[ap]m)?),? only on (\w+)$/, "every $2 at $1");
  return s;
}

/** Forms answered directly: arithmetic, bare ordinals, single bounds. */
function direct(s: string): string | null {
  let m: RegExpExecArray | null;
  const u1 = (u: string, n: number) => `${n}${UNIT[u.replace(/s$/, "")] ?? "d"}`;
  const z = (x: string, n: number) => (n === 0 ? "+" : x);
  if ((m = /^(?:now|today)?\s*([+-])\s*(\d+)\s*(d|w|wk|m|mo|y|yr|days?|weeks?|months?|years?)$/.exec(s)) && (m[1] === "+" || /^(?:now|today|-)/.test(s))) return `d ${z(m[1]!, +m[2]!)}${u1(m[3]!, +m[2]!)}`;
  if ((m = /^(\d+)(d|wk)$/.exec(s))) return `d +${u1(m[2]!, +m[1]!)}`;
  if ((m = /^(.+?)\s*([+-])\s*(\d+)\s*(d|w|wk|m|y|days?|weeks?|months?|years?)$/.exec(s)) && /^[a-z]{0,4}\.?\s*\d{1,2}([/.]\d{1,2})?$/.test(m[1]!)) {
    const b = parseBase(m[1]!);
    const bm = /^d (\d\d-\d\d)$/.exec(b);
    if (bm) return `d ${bm[1]}~${m[2]}${u1(m[4]!, +m[3]!)}`;
  }
  if ((m = new RegExp(`^(?:in |another )?(\\d+|${NW}|an?|an? \\w+) (days?|weeks?|months?|years?|fortnights?|decades?)(?: (ago|from now|later|hence))?$`).exec(s)) && (m[3] || /^(in|another) /.test(s))) {
    const a = /^an?( |$)/.test(m[1]!) ? (m[2]!.startsWith("decade") || m[2]!.startsWith("fortnight") ? 1 : null) : /^\d+$/.test(m[1]!) ? +m[1]! : wordNum(m[1]!);
    if (a === null || (a !== 1 && /^(?:day|week|month|year)$/.test(m[2]!))) return null;
    const sign = m[3] === "ago" ? "-" : "+";
    if (m[2]!.startsWith("decade")) return `d ${sign}${a * 10}y`;
    if (m[2]!.startsWith("fortnight")) return `d ${sign}${a * 2}w`;
    return a === 0 ? "d +0d" : `d ${sign}${a}${UNIT[m[2]!.replace(/s$/, "")]}`;
  }
  if ((m = new RegExp(`^(\\d+|an?|one|two|three) (${WDN}) ago$`).exec(s))) return `d ${wdCode(m[2]!)}-${/^\d+$/.test(m[1]!) ? m[1] : (wordNum(m[1]!) ?? 1)}`;
  if ((m = /^(\d{1,2})(?:st|nd|rd|th)$/.exec(s)) && +m[1]! >= 1 && +m[1]! <= 31) return `d D@${p2(+m[1]!)}`;
  if ((m = /^(\d{1,2})(?:st|nd|rd|th) (?:to|-|until|till) (\d{1,2})(?:st|nd|rd|th)$/.exec(s)) && +m[1]! <= 31 && +m[2]! <= 31) return `d D@${p2(+m[1]!)}>D@${p2(+m[2]!)}`;
  if ((m = new RegExp(`^last ${MN}$`).exec(s))) return `d M@${p2(monIdx(m[1]!))}<`;
  if ((m = /^from (today|now|tomorrow)$/.exec(s))) return `d ${m[1] === "tomorrow" ? "+1d" : "+0d"}>`;
  if ((m = new RegExp(`^last ${MN}\\.? (\\d{1,2})$`).exec(s)) && +m[2]! >= 1 && +m[2]! <= 31 && validDay(monIdx(m[1]!), +m[2]!)) return `d ${p2(monIdx(m[1]!))}-${p2(+m[2]!)}<`;
  if ((m = /^(?:through|thru|until|till|up to|to) (\d{4})$/.exec(s)) && +m[1]! >= 1000) return `d >${m[1]}-12-31`;
  return null;
}
const validDay = (m: number, d: number) => d <= dim(null, m);


// ---- monthly day lists, start dates of recurrences, years on bounds
const ORD1 = "zero first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth".split(" ");
function ordNum(w: string): number | null {
  let m: RegExpExecArray | null;
  if ((m = /^(\d+)(?:st|nd|rd|th)?$/.exec(w))) return +m[1]!;
  if (w === "last") return -1;
  let k = ORD1.indexOf(w);
  if (k > 0) return k;
  if (w === "twentieth") return 20;
  if (w === "thirtieth") return 30;
  if ((m = /^(twenty|thirty)[ -](\w+)$/.exec(w)) && (k = ORD1.indexOf(m[2]!)) > 0 && k < 10) return (m[1] === "twenty" ? 20 : 30) + k;
  return null;
}
function dayList(str: string): string[] | null {
  const out: string[] = [];
  for (const part of str.split(/\s*(?:,|and|&)\s*/)) {
    const w = part.replace(/^(?:(?:on|the|day) )+|( day)?( of the month)?$/g, "").trim();
    if (!w) continue;
    const n = ordNum(w);
    if (n === null || n === 0 || n > 31) return null;
    out.push(`d${n}`);
  }
  return out.length ? out : null;
}
const absPlain = (t: string): string | null => {
  const b = parseBase(t);
  const m = /^d (\d{4}-\d\d-\d\d|\d\d-\d\d)$/.exec(b);
  return m ? m[1]! : null;
};
function monthlyDays(s: string): string | null {
  if (new RegExp(`\\b${WDN}\\b`).test(s) || !/\b(every|each|monthly)\b/.test(s)) return null;
  let t = s;
  let n = 0;
  let u = "";
  let st = "";
  let m: RegExpExecArray | null;
  if ((m = /\bfor (\d+) (?:times|occurrences?)\b/.exec(t))) (n = +m[1]!), (t = t.replace(m[0], " "));
  if ((m = /\bfrom (.+?) (?:to|until|till|through) (.+)$/.exec(t))) {
    const a = absPlain(m[1]!);
    const b = absPlain(m[2]!);
    if (!a || !b) return null;
    (st = `s${a}`), (u = `u${b}`), (t = t.slice(0, m.index));
  } else if ((m = /\b(?:until|till|through|thru) (.+)$/.exec(t))) {
    const b = absPlain(m[1]!);
    if (!b) return null;
    (u = `u${b}`), (t = t.slice(0, m.index));
  } else if ((m = /\b(?:from|starting|since) (.+)$/.exec(t))) {
    const a = absPlain(m[1]!);
    if (!a) return null;
    (st = `s${a}`), (t = t.slice(0, m.index));
  }
  t = t.replace(/\s+/g, " ").trim();
  const MNC = MN.replace("(", "(?:");
  const ML = `${MNC}(?:(?:,| and|,? and) ${MNC})*`;
  const months = (x: string) => [...x.matchAll(new RegExp(MN, "g"))].map((q) => `M@${p2(monN(q[1]!))}`).join(",");
  let days: string[] | null = null;
  let mf = "";
  if (t === "every other month" && !n && !u && !st) return "d R m/2";
  if ((m = new RegExp(`^(?:every|each) (${ML})(?: on)?(?: the| day)? ([\\w ,&-]+)$`).exec(t))) (mf = months(m[1]!)), (days = dayList(m[2]!));
  else if ((m = new RegExp(`^(?:every|each) ([\\w ,&-]+?) of (${ML})$`).exec(t))) (mf = months(m[2]!)), (days = dayList(m[1]!));
  else if ((m = /^(?:monthly|every month|each month)(?: on)?(?: the)? ([\w ,&-]+?)(?: of (?:the|every|each) month)?$/.exec(t))) days = dayList(m[1]!);
  else if ((m = /^(?:the )?([\w ,&-]+?) (?:day )?of (?:the |every |each )?(?:every |each )?month$/.exec(t))) days = dayList(m[1]!);
  else if ((m = /^(?:the )?([\w ,&-]+?) day of (?:every|each) month$/.exec(t))) days = dayList(m[1]!);
  if (!days) return null;
  if (mf && !mf.includes(",") && days.length === 1 && !/ on /.test(t)) return null;
  days.sort((a, b) => (a === "d-1" ? 1 : b === "d-1" ? -1 : +a.slice(1) - +b.slice(1)));
  return ["d R m/1", days.join(","), mf, n ? `n${n}` : "", u, st].filter(Boolean).join(" ");
}

function startBound(s: string): string | null {
  let m: RegExpExecArray | null;
  let rec: string;
  let dt: string;
  if ((m = /^(?:starting|starts?|beginning|from)\s+(.+?)\s+(?:repeat(?:s|ing)?\s+)?(every .+)$/.exec(s))) (dt = m[1]!), (rec = m[2]!);
  else if ((m = /^(.*?every (?:other |\d+ |two |three |four |five )?(?:day|week|month)s?(?: on [a-z, ]+)?)\s+(?:starts?|starting|beginning)\s+(.+)$/.exec(s))) (rec = m[1]!), (dt = m[2]!);
  else if ((m = new RegExp(`^(?:[a-z ]+? )?(every (?:other|two|three|four|five|\\d+) (?:days?|weeks?))\\s+(today|tomorrow|(?:next|this) ${WDN})(?: (at .+))?$`).exec(s))) (rec = m[1]! + (m[3] ? ` ${m[3]}` : "")), (dt = m[2]!);
  else return null;
  const r = baseFull(rec);
  const d = /^d (\S+)$/.exec(parseBase(dt));
  if (!/^(dt|d) R /.test(r) || !d || / s\S+$/.test(r)) return null;
  return `${r} s${d[1]}`;
}

/** A bound written "until december 24, 1997" lost its year in the shared parsers. Restore it from the text. */
function yearFix(r: string, s: string): string {
  return r.replace(/\b([us])(\d\d)-(\d\d)\b/g, (m, k, mo, d) => {
    for (const q of s.matchAll(new RegExp(`\\b${MN}\\.? (\\d{1,2})(?:st|nd|rd|th)?,? (\\d{4})\\b|\\b(\\d{1,2})(?:st|nd|rd|th)? ${MN}\\.?,? (\\d{4})\\b`, "g"))) {
      const [mm, dd, yy] = q[1] ? [monN(q[1]), +q[2]!, q[3]!] : [monN(q[5]!), +q[4]!, q[6]!];
      if (mm === +mo && dd === +d) return `${k}${yy}-${mo}-${d}`;
    }
    return m;
  });
}

/** Run the v2 handlers on a prepared string. Null means no handler applies. */
export function runV2(s0: string): string | null {
  const d = direct(s0);
  if (d) return d;
  const s1 = rewrite(s0);
  const d2 = s1 !== s0 ? direct(s1) : null;
  if (d2) return d2;
  const T = scan(s1);
  if (scanBad) return "x";
  if (unsupported(s1)) return "x";
  const hs: (() => string | null)[] = [
    () => monthlyDays(s1),
    () => startBound(s1),
    () => nthRec(s1),
    () => counted(T),
    () => recBounded(s1),
    () => anchored(T),
    () => businessDays(T),
    () => windows(T, s1),
    () => dateList(T),
    () => duration(s1),
    () => openRange(T, s1),
    () => weekdayList(T, s1),
  ];
  for (const h of hs) {
    const r = h();
    if (r) return yearFix(r, s1);
  }
  const b = baseFull(s1);
  if (/ [us]\d\d-\d\d\b/.test(b)) return yearFix(b, s1);
  return s1 !== s0 ? b : null;
}
