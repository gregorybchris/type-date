// Weekdays with times: a separate time per weekday ("tuesdays at 1:30 and thursdays at 3") and registrar codes ("MW 10:50 AM 12:10 PM").
import { FULL, PLURAL, RECURRENCE_CUE, WD_SRC, byWeekday, canonRec, code, isStartTok, type P } from "./common";

const MIL = "(?:[01]\\d|2[0-3])[0-5]\\d";
const ATOM = `(?:noon|midnight|${MIL}(?![\\d:])|\\d{1,2}(?:[:.]\\d{2})?\\s*(?:am|pm|a\\.m\\.|p\\.m\\.|a|p)?\\b)`;
const DUR = "(?:\\s*(?:for|x)\\s+(?:an?|\\d+(?:\\.\\d+)?|half an)\\s*(?:min|mins|minutes?|hrs?|hours?)\\b)?";
const TIME = `${ATOM}(?:\\s*(?:-|–|to|until|till)\\s*${ATOM})?${DUR}`;
const GAP = /^[\s,;&@:+\-–/]*(?:(?:and|at|from|every|each|other|on|n|then|plus|the)\b[\s,;&@:+\-–/]*)*$/;
const BOUND_CUE = /\b(?:until|till|til|thru|through|starting|beginning|commencing|for \d+ (?:weeks?|wks?)|from (?:the |next |this |tomorrow|\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))/;

type Group = { wds: string[]; time: string; plural: boolean };

function scan(text: string): { groups: Group[]; start: number; end: number } | null {
  const re = new RegExp(`\\b${WD_SRC}(s?)\\b|(${TIME})`, "g");
  const ms = [...text.matchAll(re)];
  let best = null as { groups: Group[]; start: number; end: number } | null;
  for (let s = 0; s < ms.length; s++) {
    if (ms[s]![1] === undefined) continue; // a run starts at a weekday
    const groups: Group[] = [];
    let pending: { wd: string; plural: boolean }[] = [];
    let end = ms[s]!.index!;
    let prevEnd = ms[s]!.index!;
    for (let i = s; i < ms.length; i++) {
      const m = ms[i]!;
      if (!GAP.test(text.slice(prevEnd, m.index!))) break;
      if (m[1] !== undefined) {
        const plural = m[2] === "s" && PLURAL.test(m[0]);
        pending.push({ wd: code(m[1]), plural });
      } else {
        if (!pending.length) break;
        groups.push({ wds: pending.map((x) => x.wd), time: m[3]!, plural: pending.some((x) => x.plural) });
        pending = [];
        end = m.index! + m[0].length;
      }
      prevEnd = m.index! + m[0].length;
    }
    if (groups.length >= 2) {
      best = { groups, start: ms[s]!.index!, end };
      break;
    }
  }
  return best;
}

export function dayTimes(text: string, p0: P, p: P): string | null {
  const run = scan(text);
  if (!run) return null;
  const all = run.groups.flatMap((g) => g.wds);
  if (new Set(all).size !== all.length || all.length < 2) return null;
  const pre = text.slice(0, run.start).replace(/\b(?:every|each)(?:\s+other)?\s*$/, (m) => (/other/.test(m) ? "every other " : " "));
  const post = text.slice(run.end);
  const plural = run.groups.some((g) => g.plural);
  if (!plural && !RECURRENCE_CUE.test(text) && !BOUND_CUE.test(text)) return null;
  let times: string[] = [];
  for (const g of run.groups) {
    // four-digit military times are 24h: "1100-1200"
    const mil = /\b(?:[01]\d|2[0-3])[0-5]\d\b/.test(g.time);
    const phrase = g.time.replace(/\b([01]\d|2[0-3])([0-5]\d)\b/g, "$1:$2");
    const t = p0(`every ${FULL[g.wds[0]!]} at ${phrase}`).match(/^dt R w\/1 \w\w (\S+)$/);
    if (!t) return null;
    times.push(mil ? t[1]!.replace(/\?/g, "") : t[1]!);
  }
  // one 24h time ("14:00") makes the others 24h ("8:00-9:30" is 08:00>09:30)
  // (only times written without am/pm count: "14:00", "0900", not "3pm")
  const plain = (g: Group) => !/\b(?:am|pm|a\.m|p\.m|noon|midnight)\b|\d\s*[ap]\b/i.test(g.time);
  const is24 = (g: Group) => plain(g) && /\b(?:1[3-9]|2[0-3])[:.]?[0-5]\d\b|\b0\d[0-5]\d\b/.test(g.time);
  if (run.groups.some(is24)) {
    times = times.map((t, i) => (plain(run.groups[i]!) ? t.replace(/(\d{1,2})(?::(\d\d))?\?/g, (_, h: string, m?: string) => `${h.padStart(2, "0")}:${m ?? "00"}`) : t));
  }
  const days = [...all].sort(byWeekday);
  const names = days.map((d) => FULL[d]).join(" and ");
  const alt = /\b(?:bi-?\s?weekly|fortnightly|every other|alternate)\b/.test(pre + " " + post);
  const lead = /\b(?:every|each)(?:\s+other)?\s*$/.test(pre) ? "" : alt ? "every other " : "every ";
  const stub = `${pre} ${lead}${names} ${post}`.replace(/\b(?:bi-?\s?weekly|fortnightly)\b/g, " ").replace(/\s+/g, " ").trim();
  const out = p(stub);
  const toks = out.split(" ");
  if (toks[0] !== "d" || toks[1] !== "R" || !/^w\/\d+$/.test(toks[2]!) || toks[3] !== days.join(",")) return null;
  toks[0] = "dt";
  const byDay = new Map<string, string>();
  run.groups.forEach((g, i) => g.wds.forEach((w) => byDay.set(w, times[i]!)));
  if (new Set(times).size === 1) {
    const si = toks.findIndex((t, j) => j > 3 && isStartTok(t));
    toks.splice(si < 0 ? toks.length : si, 0, times[0]!);
  } else {
    toks[3] = days.map((d) => `${d}@${byDay.get(d)}`).join(",");
  }
  return canonRec(toks.join(" "));
}

const REG_CODE: Record<string, string> = { M: "mo", T: "tu", W: "we", R: "th", F: "fr", S: "sa", U: "su" };
const CODE_RE = /(?<![A-Za-z])((?:[MTWRFSU][\s,/.-]*){2,7})(?![A-Za-z])/;

/** Registrar weekday codes: "MW 10:50 AM 12:10 PM", "TR 8 - 9:15 am", "M-W-F 3pm weekly", "8:00am 9:25am [ TR ]". Needs the original case.
 *  A code with no time and no recurrence cue is a list of weekdays ("MTWF", "T, R"). */
export function registrar(orig: string, p0: P): string | null {
  // "10 A.M. T": the M of "A.M." is not a code
  const clean = orig.replace(/\b[ap]\.m\./gi, (x) => " ".repeat(x.length));
  const m = clean.match(CODE_RE);
  if (!m || /\b(?:mon|tue|wed|thu|fri|sat|sun)[a-z]*\b/i.test(orig)) return null;
  const letters = [...m[1]!.replace(/[^MTWRFSU]/g, "")];
  const seps = m[1]!.trimEnd().replace(/[MTWRFSU]/g, "");
  // codes list days in week order (MWF, TR, MTWRF); "TMRW" is a word. "M-F" is a range, "T R" is too loose.
  if (letters.length < 2 || letters.some((l, i) => i && "MTWRFSU".indexOf(l) <= "MTWRFSU".indexOf(letters[i - 1]!))) return null;
  if (/-/.test(seps) && letters.length < 3) return null;
  if (/^\s+$/.test(seps.replace(/[^\s]/g, "")) && !/[,/.-]/.test(seps) && letters.length < 3) return null;
  const days = letters.map((l) => REG_CODE[l]!).sort(byWeekday);
  let rest = (orig.slice(0, m.index!) + " " + orig.slice(m.index! + m[0].length)).toLowerCase();
  const wk = rest.match(/\bfor (?:the next )?(\d+) (?:weeks?|wks?)\b/);
  if (wk) rest = rest.replace(wk[0], " ");
  rest = rest.replace(/[\[\];()]/g, " ").replace(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))/g, "$1 to $2");
  rest = rest.replace(/\s+/g, " ").trim();
  const t = p0(rest);
  const tm = t.match(/^t (\S+)$/) ?? t.match(/^dt R \S+ \w\w(?:,\w\w)* (\S+)$/);
  const nd = days.join(",");
  if (tm) return `dt R w/1 ${nd}${wk ? ` n${+wk[1]! * days.length}` : ""} ${tm[1]}`;
  if (RECURRENCE_CUE.test(rest)) return `d R w/1 ${nd}`;
  return days.length > 1 && rest.replace(/[^a-z]/g, "") === "" ? `d ${nd}` : null;
}
