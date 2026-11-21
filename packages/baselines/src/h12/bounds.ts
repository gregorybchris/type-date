// Start and until clauses on a recurrence: "every wednesday starting in june", "mondays from next week until the end of may".
// The clause is cut out of the text, h11 parses what is left (the skeleton), and each clause operand is parsed alone and
// written as an `s` or `u` bound. Operands are any single date or period: month, date, year, weekday, relative week, holiday.

type P = (s: string) => string;

const START = "starting|starts?|beginning|begins?|commencing|commences?|from|since";
const END = "until|untill|uptil|till|til|through|thru|ending|ends?|up to|to";
const CUE = new RegExp(`\\b(${START}|${END})\\b`, "g");
const isStart = (c: string) => new RegExp(`^(?:${START})$`).test(c);

const FREQ: [RegExp, string][] = [
  [/\b(?:biweekly|bi-weekly|fortnightly|every (?:other|second|2nd) week|every two weeks|alternate weeks)\b/, "w/2"],
  [/\b(?:weekly|every week)\b/, "w/1"],
  [/\b(?:daily|every day|everyday)\b/, "d/1"],
  [/\b(?:monthly|every month)\b/, "m/1"],
  [/\b(?:yearly|annually|every year)\b/, "y/1"],
];

/** A single date or period token from a bound operand, or null. `which` picks the side of a month-year range. */
function operand(text: string, p: P, side: "first" | "last"): string | null {
  const t = text.trim().replace(/^(?:on|in|the week of|week of|at|of|from|a)\s+/, "").replace(/\s+/g, " ");
  if (!t) return null;
  const end = t.match(/^(?:the )?end of (?:the )?(.+)$/);
  if (end) {
    const inner = end[1]!;
    const unit: Record<string, string> = { year: "Y+0", month: "M+0", week: "W+0", quarter: "Q+0" };
    if (unit[inner]) return unit[inner]!;
    const d = p(/^(?:next|this|last)\b/.test(inner) ? inner : inner);
    const m = d.match(/^d ((?:M|W|Y|Q)[+@-]\S+)$/);
    return m ? m[1]! : null;
  }
  const d = p(t);
  let m = d.match(/^d (\S+)$/);
  if (m && !m[1]!.includes(",") && !m[1]!.startsWith("R")) return m[1]!;
  m = d.match(/^d (\d{4}-\d\d-\d\d)>(\d{4}-\d\d-\d\d)$/);
  if (m) return side === "first" ? m[1]! : m[2]!;
  m = d.match(/^dt (\S+) \S+$/); // "june 3rd at 3pm": the date part
  if (m && /^[\dA-Za-z+@-]/.test(m[1]!) && !m[1]!.includes(":")) return m[1]!;
  return null;
}

const tokens = (dsl: string) => dsl.split(" ");

/** Returns the DSL line with bounds, or null when the text has no usable bound clause. */
export function withBounds(text: string, p: P): string | null {
  const cues = [...text.matchAll(CUE)];
  if (!cues.length) return null;
  // clause = cue word plus the words up to the next cue word
  type Clause = { cue: string; from: number; to: number; op: string };
  const clauses: Clause[] = cues.map((c, i) => {
    const from = c.index!;
    const to = i + 1 < cues.length ? cues[i + 1]!.index! : text.length;
    return { cue: c[1]!, from, to, op: text.slice(from + c[0].length, to) };
  });
  let sTok: string | null = null;
  let uTok: string | null = null;
  const cut: [number, number][] = [];
  for (let i = 0; i < clauses.length; i++) {
    const c = clauses[i]!;
    if (c.cue === "to") continue; // handled as the end of "from X to Y"
    const nxt = clauses[i + 1];
    const range = isStart(c.cue) && nxt?.cue === "to";
    // an operand may end before "at <time>", "every ...", or "on <weekday>" words that belong to the skeleton
    const op = c.op.replace(/\s+(?:at|every|each)\s+.*$/, "");
    const tok = operand(op, p, "first");
    if (!tok) {
      if (isStart(c.cue) && c.cue !== "from" && c.cue !== "since") return null;
      continue; // "from 9 to 5", "until 5pm": a time bound or noise, left to h11
    }
    if (isStart(c.cue)) {
      if (sTok) return null;
      sTok = tok;
      cut.push([c.from, c.from + c.cue.length + op.length + 1]);
      if (range) {
        const t2 = operand(nxt!.op.replace(/\s+(?:at|every|each)\s+.*$/, ""), p, "last");
        if (!t2) return null;
        uTok = t2;
        cut.push([nxt!.from, nxt!.from + nxt!.cue.length + nxt!.op.replace(/\s+(?:at|every|each)\s+.*$/, "").length + 1]);
        i++;
      }
    } else {
      if (uTok) return null;
      const last = operand(op, p, "last");
      if (!last) continue;
      uTok = last;
      cut.push([c.from, c.from + c.cue.length + op.length + 1]);
    }
  }
  if (!sTok && !uTok) return null;
  let rest = text;
  for (const [a, b] of [...cut].sort((x, y) => y[0] - x[0])) rest = rest.slice(0, a) + " " + rest.slice(b);
  rest = rest.replace(/\s+/g, " ").trim();
  let skel = p(rest);
  if (!/^(?:d|dt) R /.test(skel)) {
    const f = FREQ.find(([re]) => re.test(rest));
    if (!f || /\b(?:mon|tue|wed|thu|fri|sat|sun)/.test(rest)) return null;
    const t = p(rest.replace(f[0], " ").replace(/\s+/g, " ").trim());
    const tm = t.match(/^t (\S+)$/);
    skel = tm ? `dt R ${f[1]} ${tm[1]}` : `d R ${f[1]}`;
  }
  const toks = tokens(skel);
  const keep = toks.filter((t, i) => {
    if (i < 3) return true;
    if (sTok && /^s(?!a$|u$)\S+/.test(t)) return false;
    if (uTok && /^u\S+/.test(t)) return false;
    return true;
  });
  if (uTok) keep.push(`u${uTok}`);
  if (sTok) keep.push(`s${sTok}`);
  return keep.join(" ");
}
