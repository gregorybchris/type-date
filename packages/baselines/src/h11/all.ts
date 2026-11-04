// h11 rules, loaded on demand by src/h11.ts.
import { parseH10 } from "../h10";
import { normalize } from "../h8/normalize";
import { findHolidays, restore } from "./holidays";
import { correction, cuePair, dotted, durationWith, endOfDay, monthLists, frequency, fromNow, monthDash, notDates, periods, weekdayCodes, weekdayOfWeek, weekdayRange } from "./rules";
import { andTimes, fix, rewrite } from "./post";
import { to24, words } from "./words";

// h9's clean-up comes from the h9 lazy chunk, loaded at init time, so the bundler keeps one lazy chunk for h9's rules.
type Clean = (s: string) => string;
let clean: Clean = (s) => s;
export async function initH11(): Promise<void> {
  clean = (await import("../h9/all")).clean;
}

/** Holiday phrases: replace by a placeholder date, parse, put the DSL form back. */
function holidays(raw: string, today?: string, pre?: (s: string) => string): string | null {
  const hit = findHolidays(raw);
  if (!hit) return null;
  const rec = hit.text.match(/\b(?:every|each|annual|annually|yearly)(?: year)?(?: on)?\s+(209\d-01-01)\b/);
  if (rec) {
    // "every thanksgiving at 6pm": a yearly date or a monthly nth weekday with a month filter.
    const form = hit.subs.get(rec[1]!)!;
    let m: RegExpMatchArray | null;
    let body: string;
    if ((m = form.match(/^(\d\d-\d\d)$/))) body = `R y/1 ${m[1]}`;
    else if ((m = form.match(/^(\w\w#-?\d)@(\d\d)$/))) body = `R m/1 ${m[1]} M@${m[2]}`;
    else return "x";
    const rest = parseH10(hit.text.replace(rec[0], " ").replace(/\s+/g, " ").trim(), today);
    const t = rest.match(/^t (\S+)$/);
    return t ? `dt ${body} ${t[1]}` : `d ${body}`;
  }
  void pre;
  return restore(parseH10(hit.text, today), hit);
}

/** Placeholder dates for forms the text parser cannot write (weekday of a week). Year 2080+. */
function placeholders() {
  const subs = new Map<string, string>();
  return {
    subs,
    add(form: string): string {
      const key = `${2080 + subs.size}-01-01`;
      subs.set(key, form);
      return key;
    },
    restore(dsl: string): string | null {
      let out = dsl;
      for (const [k, f] of subs) {
        if (!out.includes(k)) return null;
        out = out.split(k).join(f);
      }
      return /~[^ ,>]*~/.test(out) || /\b208\d-/.test(out) ? null : out;
    },
  };
}

/**
 * Deadline words ("by", "before", "until", "no later than") in a long message label the date itself, not an open end.
 * Short terse phrases keep the open start (`d >12-14`). Counts: specs/engines/h11.md.
 */
function deadline(orig: string, out: string): string {
  if (!/^(?:d|dt|t) >/.test(out) || /D@\d/.test(out) || /no later th[ae]n|not later th[ae]n/.test(orig)) return out;
  if (orig.split(/\s+/).length < 11) return out;
  return out.replace(/^(\S+) >/, "$1 ");
}

const SIMPLE: ((s: string) => string | null)[] = [notDates, monthDash, frequency, periods, fromNow, dotted];

/** All h11 rules in front of h10. */
export const runH11 = (text: string, today?: string): string => {
  const p = (s: string) => parseH10(s, today);
  const orig = text.toLowerCase().replace(/\s+/g, " ").trim();
  // Rules match on the cleaned and normalized text; when no rule rewrites it, h10 gets the original text.
  const nz = normalize(clean(orig)).toLowerCase().replace(/\bo["\u201c\u201d]clock\b/g, "o'clock");
  const w0 = words(nz);
  const w = { text: rewrite(w0.text), known24: w0.known24 };
  const rewritten = w.text !== nz;
  let raw = w.text;
  const at = andTimes(raw);
  if (at) {
    raw = at;
    w.text = at;
  }
  const fin = (d: string) => (w.known24 ? to24(d) : d);
  for (const r of SIMPLE) {
    const d = r(raw);
    if (d) return fin(d);
  }
  const ml = monthLists(raw, p);
  if (ml) return fin(ml);
  const eod = endOfDay(raw, p);
  if (eod) return fin(deadline(orig, eod));
  const wr = weekdayRange(raw, today);
  if (wr) return wr;
  const wc = weekdayCodes(raw, p);
  if (wc) return fin(wc);
  const cor = correction(raw, p);
  if (cor) return fin(cor);
  if (!p(raw).includes(">")) {
    const cp = cuePair(raw, p);
    if (cp) return fin(cp);
  }
  const ph = placeholders();
  const rawW = weekdayOfWeek(raw, ph, today);
  const base = (s: string) => holidays(s, today) ?? p(s);
  const src = rewritten || at ? raw : orig;
  let out: string;
  if (ph.subs.size) {
    out = ph.restore(base(rawW)) ?? p(src);
  } else out = base(src);
  if (!out.includes(">+")) {
    const d = durationWith(raw, p);
    if (d) out = d;
  }
  return fin(deadline(orig, fix(raw, out, p)));
};
