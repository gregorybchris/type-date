// A day in a relative month -> D13@M-1 (specs/dsl.md, "Day of a relative month").
// Finds a day phrase and a month phrase next to each other; the rest of the text (a time) is parsed by full-7.
const ONES = "first second third fourth fifth sixth seventh eighth ninth".split(" ");
const TEENS = "tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth".split(" ");
const ORD: Record<string, number> = {};
ONES.forEach((w, i) => (ORD[w] = i + 1));
TEENS.forEach((w, i) => (ORD[w] = 10 + i));
ORD.twentieth = 20;
ORD.thirtieth = 30;
ONES.forEach((w, i) => ((ORD["twenty-" + w] = 21 + i), (ORD["twenty " + w] = 21 + i)));
ORD["thirty-first"] = ORD["thirty first"] = 31;
const CNT: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 };
const N = `(?:\\d+|${Object.keys(CNT).join("|")})`;
const ORDRE = Object.keys(ORD).sort((a, b) => b.length - a.length).join("|");
const DAY = `(?:the )?(?:(\\d{1,2})(?:st|nd|rd|th)?|(${ORDRE}))(?: day)?`;
const KIND = "(?:next|nex|last|previous|prev|following|this|current)";
const MP = `(?:(?:the )?month before last|(?:the )?month after next|(?:the )?${KIND} (?:month|mo|mth)|in ${N} months?|${N} months? (?:from now|ago|later|hence)|a month ago)`;
const P1 = new RegExp(`(?:\\b(?:on|for|from) )?(?<![\\d:])\\b${DAY}\\b,? (?:(?:of|in|on) )?(${MP})\\b`);
const P2 = new RegExp(`(${MP}),? (?:(?:on|for) )?${DAY}\\b(?!\\s?:|\\s?[ap]m|\\d)`);

const num = (w: string) => (/^\d+$/.test(w) ? +w : CNT[w]!);
function offset(m: string): string {
  if (/before last/.test(m)) return "-2";
  if (/after next/.test(m)) return "+2";
  const k = /\b(next|nex|following)\b/.test(m) ? 1 : /\b(last|previous|prev)\b/.test(m) ? -1 : /\b(this|current)\b/.test(m) ? 0 : null;
  if (k !== null) return k >= 0 ? `+${k}` : `${k}`;
  const c = /\b(\d+|[a-z]+) months?\b/.exec(m);
  const n = c ? num(c[1]!) : 1;
  return /ago/.test(m) ? `-${n}` : `+${n}`;
}

/** The day-of-relative-month token and the text left over, or null. */
export function relMonth(s: string): { tok: string; rest: string } | null {
  const l = s.toLowerCase();
  let m = P1.exec(l);
  let day: string | undefined;
  let mp: string | undefined;
  if (m) {
    (day = m[1] ?? String(ORD[m[2]!])), (mp = m[3]);
    // a bare number ("19 next month", "20 of the month before last") needs a clear month phrase and no "at" before it
    const dayText = m[1] ?? m[2]!;
    const at = m[0].indexOf(dayText);
    const bare = m[1] !== undefined && !/^(?:st|nd|rd|th)/.test(m[0].slice(at + dayText.length));
    const mid = m[0].slice(at + dayText.length, m[0].length - mp!.length);
    const clear = / of /.test(mid) || new RegExp(`^${KIND} `).test(mp!);
    if (bare && (!clear || /\b(?:at|to|until|till|from) $/.test(l.slice(0, m.index + at)))) m = null;
  }
  if (!m && (m = P2.exec(l))) (mp = m[1]), (day = m[2] ?? String(ORD[m[3]!]));
  if (!m || !day || !mp || +day < 1 || +day > 31) return null;
  return { tok: `D${day.padStart(2, "0")}@M${offset(mp)}`, rest: (l.slice(0, m.index) + " " + l.slice(m.index + m[0].length)).replace(/\s+/g, " ").trim() };
}

/** Combine the token with a time parsed from the rest (`t ...`), or "" when the rest holds something else. */
export function withRest(tok: string, restDsl: string, rest: string): string {
  if (!rest || restDsl === "x") return `d ${tok}`;
  const m = /^t (\S+)$/.exec(restDsl);
  return m ? `dt ${tok} ${m[1]}` : "";
}
