// h16: lunar and lunisolar holidays ("diwali", "eid al adha at 9am", "during ramadan", "erev yom kippur", "hanukkah 2027").
// Policy: specs/dsl.md, "Lunar and lunisolar holidays". A holiday phrase is replaced by a sentinel date that h15 reads
// (as h15 does for weekends), and the sentinel in h15's answer becomes the `L:CODE±N` token. So h15 still reads the
// time, range or bound around it ("until eid", "diwali at 7pm", "from purim to passover").
import { lunarDays, parseDsl, serializeDsl } from "@type-date/core";

type Parse = (text: string) => string;

const SENTINELS = ["1998-12-31", "1998-12-30", "1998-12-29"];
const canon = (dsl: string) => serializeDsl(parseDsl(dsl) as never);
const valid = (dsl: string) => parseDsl(dsl).mode !== "x";

// ---- holiday names (lowercase, apostrophes removed, hyphens as spaces) ----

const NAMES: [string, string][] = [
  // named days of a festival: code/offset
  ["passover/-1", "first seders?|(?:the )?1st seder|seder night|first seder night"],
  ["passover/0", "second seder(?: night)?|2nd seder"],
  ["yomkippur/-1", "kol nidre(?: night)?"],
  ["eidfitr/-1", "chaa?nd raat"],
  ["diwali/-1", "ch?h?oti diwali"],
  ["holi/-1", "holika dahan(?: night)?|ch?h?oti holi"],
  ["eidadha/-1", "(?:the )?day of arafa[ht]?|arafa[ht]? day"],
  ["purim/1", "shushan purim"],
  ["lny/14", "lantern festival|yuan ?xiao(?: jie)?|chap goh mei"],
  ["lny", "(?:chinese|lunar) ?new ?y(?:ea)?rs?|lunarnewyear|lny|cny|c\\.n\\.y\\.?|spring festival|chun jie|chunjie|tet nguyen dan|tết nguyên đán|tết|tet|seollal|sollal|春节|chu xi|chuxi|除夕"],
  ["midautumn", "mid ?autu?mn?(?: festiv[ae]l| fest| day)?|moon ?festival|mooncake festival|chuseok|trung thu|hangawi|zhong ?qiu(?: jie)?|中秋节?|(?:the )?15th (?:day )?of (?:the )?(?:8th|eighth) (?:lunar )?(?:moon|month)"],
  ["dragonboat", "drag[oe]n ?boat(?: festiv[ae]l| fest| day)?|duanwu(?: jie| festival)?|tuen ng|端午节?|double fifth(?: festival)?|dumpling festival"],
  ["diwali", "diwa?l+[iy]|dewali|divali|deepa?vali|deepawali|dipa?wali|dipavali|diwli|deepawli"],
  ["holi", "holi|holli|phagwah|dhulandi|dhuleti|dol jatra|rangwali holi"],
  ["eidfitr", "e[ie]d ?(?:al|ul|el|e|ul ?|al ?)? ?fit(?:e)?r[ie]?|idul fitri?|hari raya(?: aidil ?fitri| puasa)?|lebaran|ch?h?oti eid|meethi eid|mithi eid|small eid|عيد الفطر|(?:1|one|first)(?:st)? (?:of )?shawwal"],
  ["eidadha", "e[ie]d ?(?:al|ul|el|e)? ?ad(?:h)?ah?|e[ie]d ?(?:al|ul|el|e)? ?azha|idul adha|bakr[ia]? ?eid|bakrid|bakri eid|bari eid|badi eid|big eid|hari raya (?:haji|korban|aidiladha)|raya haji|(?:k|q)urban bayrami?|tabaski|عيد الأضحى|10(?:th)? (?:of )?dhul? ?hijj?ah?"],
  ["ramadan", "ramm?[ae]?dh?[ae][nm]|ramadam|ramzaa?n|ramazan|puasa month|bulan puasa|رمضان"],
  ["roshhashanah", "rosh ?ha ?sh?[ao]nn?ah?|rosh hoshana|rush hashanah?|rosh hashona|yom teruah|ראש השנה"],
  ["yomkippur", "yom ?(?:ha ?)?kipp?[ueo]r(?:im)?|young kipper|kippur|יום כיפור"],
  ["passover", "pass ?s?over|pesa?c?h|pesack|pesah|chag ha ?matzot|פסח"],
  ["hanukkah", "c?hann?ukk?ah?|hanuka|חנוכה"],
  ["purim", "purr?im|poorim|פורים"],
  ["eid", "e[ie]d|idd"],
];
const NAME_RE = NAMES.map(([, re]) => `(${re})`).join("|");

/** Holidays named as a period. Alone or with "during", "over", "for": the whole festival. */
const PERIOD_CODES = new Set(["ramadan", "hanukkah", "passover"]);

// Words after the name that make it a fuzzy period or a thing, not a day.
const FUZZY_AFTER = "(?:week|weeks|weekend|weekends|long weekend|golden week|holidays?|break|breaks|season|period|vacation|vacay|leave|sale|sales|recipes?|ideas?|gifts?|powder|timetable|calendar|tickets?|war|haggadah|menorah|gelt|spiel|bonus|cards?|team|signup|sign up|order|orders|design|documentary|pdf|rules|share|red packets?|goodie bags?|lantern diy|greetings?|wishes|decorations?|kareem|mubarak|sameach|tova|crafts?|songs?|story|stories|movie|outfits?|clothes|shopping|market|offers?|deals?|collection|special|katan|spiel)";
// Words before the name that make it a greeting or a recurrence.
const NEG_BEFORE = /(?:\b(?:happy|shubh|selamat|chag|every|each|whenever|all the|last|previous|since last|last years?|previous years?|the .+ after next|next to next)\s+(?:\S+\s+)?$)/;

const NUM_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30,
};
const ORD: Record<string, number> = {
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10,
  fifteenth: 15, twentieth: 20, "twenty seventh": 27, "twenty first": 21, last: -1, final: -1,
};
const ORD_RE = `(?:\\d{1,2}(?:st|nd|rd|th)?|${Object.keys(ORD).join("|")})`;
const ordOf = (w: string): number => ORD[w] ?? parseInt(w, 10);

function normalize(text: string): string {
  let t = text.toLowerCase().normalize("NFC").replace(/[’`]/g, "'");
  t = t.replace(/(?<=\p{L})'(?=s\b)/gu, "").replace(/(?<=\p{L})'(?=\p{L})/gu, "");
  t = t.replace(/(?<=\p{L})-(?=\p{L})/gu, " ");
  return t.replace(/\s+/g, " ").trim();
}

/** A year written after a holiday: 2027, '27, 2k27, "twenty twenty seven", "two thousand twenty seven". */
const YEAR_RE = "(?:(?:of|in|year|yr|for|,)\\s+)?(\\d{4}|'\\d\\d|2k\\d\\d|(?:two thousand(?: and)?|twenty) (?:twenty|thirty)(?: (?:one|two|three|four|five|six|seven|eight|nine))?)(?:\\s+(?:hijri|ah|date))?";
function yearOf(s: string): number | null {
  if (/^\d{4}$/.test(s)) return +s;
  if (/^'\d\d$/.test(s)) return 2000 + +s.slice(1);
  if (/^2k\d\d$/.test(s)) return 2000 + +s.slice(2);
  const m = s.match(/(twenty|thirty)(?: (\w+))?$/);
  return m ? 2000 + NUM_WORDS[m[1]!]! + (m[2] ? NUM_WORDS[m[2]] ?? 0 : 0) : null;
}

const fromDays = (n: number) => new Date(n * 86_400_000).toISOString().slice(0, 10);

/** The first date of a holiday in Gregorian year y (Hijri and Hebrew years are converted), or null. */
function dateIn(code: string, y: number, n = 0): string | null {
  let gy = y;
  if (y >= 1400 && y <= 1500) {
    // Hijri year: the table's first Ramadan (2000-11-27) is 1421, its first Eids (2000) are 1420
    const days = lunarDays(code === "eid" ? "eidfitr" : code);
    const i = y - (code === "ramadan" ? 1421 : 1420);
    return days[i] === undefined ? null : fromDays(days[i]! + n);
  }
  if (y >= 5700 && y <= 5900) gy = y - (code === "passover" || code === "purim" ? 3760 : 3761);
  if (gy < 1990 || gy > 2110) return null;
  const hit = lunarDays(code).find((d) => fromDays(d).startsWith(`${gy}-`));
  return hit === undefined ? null : fromDays(hit + n);
}

interface Found {
  start: number;
  end: number;
  /** Token for the sentinel. */
  token: string;
  /** The whole festival as a range, when the phrase is the period alone. */
  pair?: [string, string];
}

function periodPair(code: string, y?: number): [string, string] | null {
  if (y === undefined) {
    if (code === "ramadan") return ["L:ramadan+0", "L:eidfitr-1"];
    return [`L:${code}+0`, `L:${code}+7`];
  }
  const a = dateIn(code, y);
  if (!a) return null;
  if (code === "ramadan") {
    const ad = Math.round(Date.parse(a) / 86_400_000);
    const e = lunarDays("eidfitr").find((d) => d > ad);
    return e === undefined ? null : [a, fromDays(e - 1)];
  }
  const ad = Math.round(Date.parse(a) / 86_400_000);
  return [a, fromDays(ad + 7)];
}

const tok = (code: string, n: number) => `L:${code}${n >= 0 ? "+" : ""}${n}`;

/** Find holiday phrases. "x" when a phrase is one the policy leaves out. */
function findAll(t: string): Found[] | "x" {
  const out: Found[] = [];
  const re = new RegExp(`(?<![\\p{L}\\d])(?:${NAME_RE})(?![\\p{L}\\d])`, "gu");
  for (const m of t.matchAll(re)) {
    let gi = -1;
    for (let i = 1; i <= NAMES.length; i++) if (m[i] !== undefined) { gi = i - 1; break; }
    let [code, fixed] = NAMES[gi]![0].split("/") as [string, string | undefined];
    let start = m.index!;
    let end = start + m[0].length;
    // a bare "eid" before fitr or adha words was matched by the longer names first; "eid" alone stays `eid`
    const before = t.slice(0, start);
    const after = t.slice(end);
    // eve of the festival, nights and days of it
    let n = 0;
    let isDay = false; // a named day of the festival, not the period
    let mm: RegExpMatchArray | null;
    if (fixed !== undefined) {
      n = +fixed; isDay = true;
    } else if ((mm = after.match(/^(?:s)? ?(?:eve|night eve|eve dinner|eve night)\b/))) {
      n = -1; isDay = true; end += mm[0].length;
    } else if ((mm = before.match(/(?:\b(?:erev|eve of|(?:the )?night before|(?:the )?evening before|(?:the )?eve before)(?: the)? )$/))) {
      n = -1; isDay = true; start -= mm[0].length;
    } else if (code === "ramadan" && ((mm = before.match(/\b(?:the )?(?:last day|end|final day|last iftar|last fast|last roza) (?:of )?(?:the )?(?:month of )?$/)))) {
      code = "eidfitr"; n = -1; isDay = true; start -= mm[0].length;
    } else if (code === "ramadan" && (mm = after.match(/^ (?:finish(?:es)?|ends?|ending|is over|over)\b/))) {
      code = "eidfitr"; n = -1; isDay = true; end += mm[0].length;
    } else if ((mm = before.match(new RegExp(`\\b(?:the )?(${ORD_RE}) (night|day|nite|seder|candle)s? (?:of )?(?:the )?$`)))) {
      const k = ordOf(mm[1]!);
      const night = /night|nite|candle/.test(mm[2]!);
      if (mm[2] === "seder") {
        if (code !== "passover" || (k !== 1 && k !== 2)) return "x";
        n = k - 2;
      } else if (k === -1) {
        if (code === "ramadan") { code = "eidfitr"; n = night ? -2 : -1; }
        else if (code === "hanukkah" || code === "passover") n = night ? 6 : 7;
        else return "x";
      } else n = night && (code === "hanukkah" || code === "passover" || code === "ramadan" || code === "roshhashanah") ? k - 2 : k - 1;
      isDay = true; start -= mm[0].length;
    } else if ((mm = before.match(/\b(?:the )?day (\d{1,2}|one|two|three|four|five|six|seven|eight) of (?:the )?$/))) {
      n = (NUM_WORDS[mm[1]!] ?? +mm[1]!) - 1; isDay = true; start -= mm[0].length;
    } else if ((mm = before.match(/\b(?:the )?(\d{1,2})(?:st|nd|rd|th) (?:of )?$/)) && code === "ramadan") {
      n = +mm[1]! - 1; isDay = true; start -= mm[0].length;
    } else if ((mm = after.match(/^ (?:day )?(\d|one|two|three|four|five|six|seven|eight)\b(?! ?(?:am|pm|:|\.\d|o ?clock))/)) && /^ day /.test(after)) {
      n = (NUM_WORDS[mm[1]!] ?? +mm[1]!) - 1; isDay = true; end += mm[0].length;
    } else if (code === "passover" && /\bfirst seder\b/.test(before.slice(-14))) {
      n = -1; isDay = true;
    }
    if (n < -60 || n > 60) return "x";
    // first day of the festival
    if (!isDay && (mm = before.match(/\b(?:the )?(?:first day|start|beginning|begin(?:ning)?|day one) of (?:the )?$/))) {
      isDay = true; start -= mm[0].length;
    }
    if (!isDay && (mm = after.match(/^ (?:starts?|begins?|began|starting|beginning|first day)\b/))) {
      isDay = true; end += mm[0].length;
    }
    // modifiers
    const pre = t.slice(0, start);
    if (NEG_BEFORE.test(pre) && !/\b(?:last|previous) (?:day|night|week)/.test(pre.slice(-14))) return "x";
    if ((mm = pre.match(/\b(?:the )?(?:this|next|coming|upcoming|this coming|next coming|this years?|this yrs?|next years?)\s+$/))) start -= mm[0].length;
    let rest = t.slice(end);
    if ((mm = rest.match(/^ (?:last year|last yr)\b/))) return "x";
    if ((mm = rest.match(/^ (?:this|next) (?:year|yr)\b|^ coming\b/))) { end += mm[0].length; rest = t.slice(end); }
    // a year
    let y: number | undefined;
    if ((mm = rest.match(new RegExp(`^,? ${YEAR_RE}(?![\\d:])`)))) {
      const yy = yearOf(mm[1]!);
      if (yy !== null) { y = yy; end += mm[0].length; rest = t.slice(end); }
    }
    if ((mm = rest.match(/^ (?:of )?(?:the )?year of (?:the )?\w+/))) { end += mm[0].length; rest = t.slice(end); }
    if (new RegExp(`^ ${FUZZY_AFTER}\\b`).test(rest)) return "x";
    // the period, or a day of it
    const period = PERIOD_CODES.has(code) && !isDay;
    if (y !== undefined) {
      if (period) {
        const p = periodPair(code, y);
        if (!p) return "x";
        out.push({ start, end, token: p[0], pair: p });
      } else {
        const d = dateIn(code, y, n);
        if (!d) return "x";
        out.push({ start, end, token: d });
      }
    } else if (period) {
      out.push({ start, end, token: tok(code, 0), pair: periodPair(code)! });
    } else {
      out.push({ start, end, token: tok(code, n) });
    }
  }
  return out;
}

const JOIN = /\b(?:to|until|till|til|untill|thru|through|and|from|between|before|after|by|since|-|–)\b|[-–]/;

/** The h16 layer. `full` is h15's answer for the whole text; `parse` is h15. */
export function withLunar(text: string, full: string, parse: Parse): string {
  const t = normalize(text);
  const found = findAll(t);
  if (found === "x") return "x";
  if (!found.length) return full;
  if (found.length > SENTINELS.length) return "x";
  let rest = "";
  let other = "";
  let pos = 0;
  found.forEach((f, i) => {
    rest += t.slice(pos, f.start) + ` ${SENTINELS[i]} `;
    other += t.slice(pos, f.start) + " ";
    pos = f.end;
  });
  rest = (rest + t.slice(pos)).replace(/\s+/g, " ").trim();
  other = (other + t.slice(pos)).replace(/\s+/g, " ").trim();
  // a holiday next to another date of its own is a label ("hanukkah party sat the 5th")
  const otherDsl = other ? parse(other) : "x";
  if (found.length === 1 && otherDsl !== "x" && /^(?:d|dt) /.test(otherDsl) && !JOIN.test(other)) return otherDsl;
  const out = parse(rest);
  const swap = (dsl: string) => {
    let s = dsl;
    found.forEach((f, i) => (s = s.split(SENTINELS[i]!).join(f.token)));
    return s;
  };
  let dsl: string;
  if (found.length === 1 && found[0]!.pair && (out === `d ${SENTINELS[0]}` || !out.includes(SENTINELS[0]!))) {
    const [a, b] = found[0]!.pair;
    dsl = `d ${a}>${b}`;
  } else if (!found.every((_, i) => out.includes(SENTINELS[i]!))) {
    dsl = found.length === 1 ? `d ${found[0]!.token}` : "x";
  } else {
    dsl = swap(out);
  }
  return valid(dsl) ? canon(dsl) : found.length === 1 ? `d ${found[0]!.token}` : "x";
}
