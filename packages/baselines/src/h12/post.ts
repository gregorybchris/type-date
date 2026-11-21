// Text rewrites and output fixes shared by the h12 rules.
import { FULL, PLURAL, RECURRENCE_CUE, WD_ORDER, WD_SRC, byWeekday, code } from "./common";

/** "mon thru fri", "mondays through wednesdays": weekday ranges with a recurrence cue become a list. */
function weekdayRange(t: string): string {
  const re = new RegExp(`\\b(?:(every|each)\\s+)?${WD_SRC}(s?)\\s*(?:-|–|to|through|thru|till|until)\\s*${WD_SRC}(s?)\\b`);
  const m = t.match(re);
  if (!m) return t;
  const plural = m[3] === "s"; // "mondays through wednesdays"; "monday to saturdays" stays a range
  if (!m[1] && !plural && !RECURRENCE_CUE.test(t)) return t;
  const a = WD_ORDER.indexOf(code(m[2]!));
  const b = WD_ORDER.indexOf(code(m[4]!));
  const days: string[] = [];
  for (let i = a; ; i = (i + 1) % 7) {
    days.push(WD_ORDER[i]!);
    if (i === b) break;
  }
  const list = days.length === 5 && days.join(",") === "mo,tu,we,th,fr" ? "every weekday" : "every " + days.map((d) => FULL[d]).join(" and ");
  return t.replace(m[0], list);
}

const MON: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const MON_RE = "(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?";
const monthList = (src: string) => [...new Set([...src.matchAll(new RegExp(MON_RE, "g"))].map((m) => MON[m[0].slice(0, 3)]!))];

export function rewrite(t: string): string {
  let s = t.replace(/\bbi[ -]weekly\b/g, "biweekly").replace(/_/g, "");
  s = s.replace(/\bwk\s?day(s?)\b/g, "weekday$1").replace(/\bwk\s?end(s?)\b/g, "weekend$1");
  s = s.replace(new RegExp(`\\bever(?=\\s+${WD_SRC})`, "g"), "every").replace(/\b(each|every|per|a) mo\b\.?/g, "$1 month");
  // military time after "at": "at 1930" -> "at 19:30"
  s = s.replace(/\bat\s+([01]\d|2[0-3])([0-5]\d)\b(?!\s*(?:am|pm))/g, "at $1:$2");
  // "every tuesday and every thursday": one recurrence
  for (let i = 0; i < 3; i++) s = s.replace(new RegExp(`\\bevery\\s+(${WD_SRC}s?|weekends?)(\\s*(?:,|and|n|&)\\s*)every\\s+(?=${WD_SRC}|weekend)`), "every $1 and ");
  // "twice a week mon and thu": the weekdays say which days
  if (new RegExp(`\\b(?:twice|two times|2x|2 times)\\s+(?:a|per|each)\\s+week\\b.*\\b${WD_SRC}`).test(s)) s = s.replace(/\b(?:twice|two times|2x|2 times)\s+(?:a|per|each)\s+week\b/, "every");
  s = weekdayRange(s);
  // h11 reads "every other monday and friday" as Monday only; "every other week on monday and friday" has both
  s = s.replace(new RegExp(`\\b(?:every other|every second|every 2nd|alternate)\\s+(${WD_SRC}s?(?:\\s*(?:,|and|&|\\+)\\s*${WD_SRC}s?)+)`), "every other week on $1");
  // "weekly on tuesday and thursday" and "tuesdays and fridays, weekly"
  s = s.replace(new RegExp(`(?<!\\d )\\bweekly\\s+(?:on\\s+)?(?=${WD_SRC})`), "every ");
  return s;
}

const WD_LIST = /^(d|dt) ((?:mo|tu|we|th|fr|sa|su)(?:,(?:mo|tu|we|th|fr|sa|su))*)(?: (\S+))?$/;

/** Output fixes: plural weekdays are a recurrence, week counts times weekdays, time-only output with a plural weekday. */
export function fixOut(out: string, text: string): string {
  let o = out;
  const weekdays = [...text.matchAll(new RegExp(`\\b${WD_SRC}(s?)\\b`, "g"))];
  const plural = PLURAL.test(text);
  const m = o.match(WD_LIST);
  if (m && !/^[^ ]*>$|^>/.test(m[3] ?? "") && (m[2]!.includes(",") || plural) && (plural || /\b(?:weekly|each week|every week)\b/.test(text)) && !/\b(?:this|next|last|coming)\b/.test(text)) {
    o = `${m[1]} R w/1 ${m[2]}${m[3] ? " " + m[3] : ""}`;
  } else if (plural && weekdays.length && !/ R /.test(o) && /^(?:x|t \S+|d tu)$/.test(o.replace(/^d (\w\w)$/, "d tu"))) {
    const days = [...new Set(weekdays.map((w) => code(w[1]!)))].sort(byWeekday);
    const t = o.match(/^t (\S+)$/);
    o = t ? `dt R w/1 ${days.join(",")} ${t[1]}` : o === "x" && /\b(?:weekly|each week|every week)\b/.test(text) ? `d R w/1 ${days.join(",")}` : o;
  }
  // month filters: "except june, july and august", "(january, march, may)", "every even month"
  const ex = text.match(new RegExp(`\\bexcept\\s+(?:in\\s+)?((?:${MON_RE}[\\s,&]*(?:and\\s+)?)+)`));
  const pr = text.match(new RegExp(`\\(((?:${MON_RE}[\\s,]*(?:and\\s+)?){2,})\\)`));
  const eo = text.match(/\bevery\s+(even|odd)\s+month\b/);
  let keep: number[] | null = null;
  if (ex) keep = Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => !monthList(ex[1]!).includes(m));
  else if (pr) keep = monthList(pr[1]!);
  else if (eo) keep = Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => (m % 2 === 0) === (eo[1] === "even"));
  if (keep && keep.length && /^(?:d|dt) R /.test(o) && !/\bM@\d/.test(o)) {
    const tk = o.split(" ");
    tk.splice(4, 0, [...keep].sort((a, b) => a - b).map((m) => `M@${String(m).padStart(2, "0")}`).join(","));
    o = tk.join(" ");
  }
  // "for 6 months" over two nth weekdays is 12 occurrences
  const mo = text.match(/\bfor (?:the next )?(\d+) months?\b/);
  const nl = o.match(/^(?:d|dt) R m\/1 ((?:mo|tu|we|th|fr|sa|su)#-?\d(?:,(?:mo|tu|we|th|fr|sa|su)#-?\d)+)/);
  if (mo && nl) o = o.replace(new RegExp(`\\bn${mo[1]}\\b`), `n${+mo[1]! * nl[1]!.split(",").length}`);
  // "for 8 weeks" over two weekdays is 16 occurrences
  const wk = text.match(/\bfor (?:the next )?(\d+) (?:weeks?|wks?)\b/);
  const r = o.match(/^(?:d|dt) R w\/(\d+) (\S+)/);
  if (wk && r) {
    const k = r[2]!.includes("@") ? r[2]!.split(",").length : r[2]!.split(",").length;
    const per = Math.ceil(+wk[1]! / +r[1]!);
    if (k > 1 && /^(?:mo|tu|we|th|fr|sa|su)/.test(r[2]!)) o = o.replace(new RegExp(`\\bn${per}\\b`), `n${per * k}`);
  }
  return o;
}
