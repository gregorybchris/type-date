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

export function rewrite(t: string): string {
  let s = t.replace(/\bbi[ -]weekly\b/g, "biweekly");
  // "twice a week mon and thu": the weekdays say which days
  if (new RegExp(`\\b(?:twice|two times|2x|2 times)\\s+(?:a|per|each)\\s+week\\b.*\\b${WD_SRC}`).test(s)) s = s.replace(/\b(?:twice|two times|2x|2 times)\s+(?:a|per|each)\s+week\b/, "every");
  s = weekdayRange(s);
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
