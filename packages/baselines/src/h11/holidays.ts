// Named days and holidays. One table; the same entry gives the undated DSL form and, for a given year, the date.
// A holiday phrase in the text is replaced by a placeholder date (year 2090+), h10 parses the rest of the text
// (times, offsets, ranges, "day before ..."), and the placeholder in the output is replaced by the DSL form.

/** Entry forms: "MM-DD" fixed, "wd#K@MM" nth weekday of a month, "E+N" days from Easter Sunday, any of them plus "~+Nd|~-Nw". */
type Entry = string;

const E = (n: number) => `E${n >= 0 ? "+" : ""}${n}`;

// [regex source (lowercase, no apostrophes), entry]. Longer names first.
const TABLE: [string, Entry][] = [
  // New year, winter
  ["new years? eve|new years? evening|hogmanay|nye|sylvester", "12-31"],
  ["new years? day|new years?|ny day|nyd", "01-01"],
  ["twelfth night", "01-05"],
  ["epiphany|three kings day|three kings", "01-06"],
  ["orthodox christmas", "01-07"],
  ["burns night", "01-25"],
  ["(?:australia|oz) day", "01-26"],
  ["republic day", "01-26"],
  ["(?:martin luther king(?: jr)?|mlk)(?: jr)? day|martin luther king(?: jr)?", "mo#3@01"],
  ["groundhog day", "02-02"],
  ["waitangi day", "02-06"],
  ["super ?bowl sunday", "su#1@02"],
  ["valentines? day|st valentines day|saint valentines day", "02-14"],
  ["(?:canadian|ontario|alberta|bc|british columbia|saskatchewan|nb) family day|louis riel day", "mo#3@02"],
  ["presidents? day|washingtons birthday", "mo#3@02"],
  ["leap day", "02-29"],
  ["st davids day|saint davids day", "03-01"],
  ["pi day", "03-14"],
  ["ides of march", "03-15"],
  ["st patricks day|saint patricks day|st paddys day|st paddys|paddys day|st pattys day|st pattys", "03-17"],
  ["april fools? day|april fools?", "04-01"],
  ["earth day", "04-22"],
  ["st georges day|saint georges day", "04-23"],
  ["anzac day", "04-25"],
  ["tax day", "04-15"],
  ["patriots day", "mo#3@04"],
  ["arbor day", "fr#-1@04"],
  ["may day|international workers day|workers day", "05-01"],
  ["early may bank holiday", "mo#1@05"],
  ["star wars day|may the (?:4th|fourth)", "05-04"],
  ["cinco de mayo", "05-05"],
  ["mothers? day|mothering day", "su#2@05"],
  ["victoria day", "mo#-1@05~-1w"],
  ["memorial day|spring bank holiday|decoration day", "mo#-1@05"],
  ["flag day", "06-14"],
  ["juneteenth(?: day)?", "06-19"],
  ["fathers? day", "su#3@06"],
  ["kings? birthday|queens? birthday", "mo#2@06"],
  ["canada day|dominion day", "07-01"],
  ["bastille day", "07-14"],
  ["independence day", "07-04"],
  ["civic holiday|simcoe day|heritage day", "mo#1@08"],
  ["summer bank holiday", "mo#-1@08"],
  ["labou?r day", "mo#1@09"],
  ["teachers day", "09-05"],
  ["gandhi jayanti|gandhi jayanthi", "10-02"],
  ["columbus day|indigenous (?:peoples|people) day|indigenous peoples|canadian thanksgiving", "mo#2@10"],
  ["halloween|hallowe.en|all hallows eve", "10-31"],
  ["all saints day|all saints", "11-01"],
  ["all souls day|day of the dead|dia de los muertos", "11-02"],
  ["guy fawkes(?: night| day)?|bonfire night", "11-05"],
  ["election day", "mo#1@11~+1d"],
  ["veterans day|armistice day|remembrance day|remembrance sunday", "11-11"],
  ["melbourne cup(?: day)?", "tu#1@11"],
  ["childrens day", "11-14"],
  ["black friday", "th#4@11~+1d"],
  ["cyber monday", "th#4@11~+4d"],
  ["thanksgiving(?: day)?|turkey day", "th#4@11"],
  ["st andrews day|saint andrews day", "11-30"],
  ["immaculate conception", "12-08"],
  ["christmas eve|xmas eve|noel eve", "12-24"],
  ["christmas day|xmas day|christmas|xmas", "12-25"],
  ["boxing day|st stephens day|saint stephens day", "12-26"],
  // Easter-relative
  ["mardi gras|fat tuesday|pancake day|pancake tuesday|shrove tuesday", E(-47)],
  ["ash wednesday", E(-46)],
  ["mothering sunday", E(-21)],
  ["palm sunday", E(-7)],
  ["maundy thursday|holy thursday", E(-3)],
  ["(?<=^|(?:on|for|the|this|next|until|before|after|by|from|to|through|thru|during|every|and|or|,|\\() )(?:good|holy) friday", E(-2)],
  ["holy saturday|easter saturday|easter eve", E(-1)],
  ["easter monday", E(1)],
  ["easter sunday|easter day|easter", E(0)],
  ["ascension day|ascension thursday", E(39)],
  ["whit monday|pentecost monday", E(50)],
  ["pentecost|whit sunday|whitsun", E(49)],
  ["corpus christi", E(60)],
];

const RES: [RegExp, Entry][] = TABLE.map(([p, e]) => [new RegExp(p.replace(/ /g, "[ -]")), e]);

// Words after a holiday name that make it a fuzzy period, not a day.
const PERIOD = "(?:week|weeks|weekend|weekends|season|break|breaks|holiday|holidays|time|period|vacation|special|specials|sale|sales|hours|market|lights|bonus|shopping)";
const MODIFIER = "(?:(?:the|on|this|next|coming|upcoming|our|us|on the)\\s+)?";

// ---- calendar helpers (UTC days) ----
const dim = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const iso = (y: number, m: number, d: number) => `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const WD = ["su", "mo", "tu", "we", "th", "fr", "sa"];
const addDays = (s: string, n: number) => {
  const t = Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) + n * 86400000;
  const d = new Date(t);
  return iso(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
};

/** Easter Sunday of a Gregorian year. */
export function easter(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  return iso(y, month, ((h + l - 7 * m + 114) % 31) + 1);
}

function nthWd(y: number, m: number, wd: string, k: number): string {
  const idx = WD.indexOf(wd);
  if (k > 0) {
    const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
    return iso(y, m, 1 + ((idx - first + 7) % 7) + (k - 1) * 7);
  }
  const last = dim(y, m);
  const lw = new Date(Date.UTC(y, m - 1, last)).getUTCDay();
  return iso(y, m, last - ((lw - idx + 7) % 7));
}

/** Date of an entry in a year. */
export function entryDate(e: Entry, y: number): string {
  const [base, off] = e.split("~");
  let d: string;
  let m: RegExpMatchArray | null;
  if ((m = base!.match(/^E([+-]\d+)$/))) d = addDays(easter(y), +m[1]!);
  else if ((m = base!.match(/^(\w\w)#(-?\d+)@(\d\d)$/))) d = nthWd(y, +m[3]!, m[1]!, +m[2]!);
  else d = iso(y, +base!.slice(0, 2), +base!.slice(3, 5));
  if (off) {
    const o = off.match(/^([+-]\d+)([dw])$/)!;
    d = addDays(d, +o[1]! * (o[2] === "w" ? 7 : 1));
  }
  return d;
}

/** DSL form of an entry (undated). */
export function entryDsl(e: Entry): string {
  return e.startsWith("E") ? e : e;
}

export interface HolidayHit {
  /** Text with each holiday phrase replaced by a placeholder date. */
  text: string;
  /** placeholder date -> DSL date form */
  subs: Map<string, string>;
  /** Entries found in order. */
  entries: Entry[];
}

const PLACEHOLDER_YEAR = 2090;
/** Month names and numeric date patterns: another date in the text makes the holiday word a label. */
const OTHER_DATE = /\b\d{1,2}(?:st|nd|rd|th)\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\b|\b\d{1,2}[/.-]\d{1,2}\b|\b\d{4}-\d{2}-\d{2}\b/;

const COMBINED = new RegExp(
  `${MODIFIER}(?<![a-z])(${RES.map(([re]) => `(${re.source})`).join("|")})(?:\\s+(?:of\\s+)?(1[89]\\d\\d|2[01]\\d\\d))?(?![a-z0-9])`,
  "g",
);
const PERIOD_AFTER = new RegExp(`^\\s+${PERIOD}\\b`);

/** Replace holiday phrases. Returns null when the text has none, or every holiday is a fuzzy period or a label next to another date. */
export function findHolidays(s: string): HolidayHit | null {
  const found: { start: number; end: number; entry: Entry; yr?: string }[] = [];
  s = s.replace(/(?<=[a-z])['\u2019`](?=[a-z])/g, "");
  for (const m of s.matchAll(COMBINED)) {
    const start = m.index!;
    const end = start + m[0].length;
    if (PERIOD_AFTER.test(s.slice(end))) continue;
    // group 1 is the whole name; the group that matched is the entry (groups 2..)
    let gi = -1;
    for (let i = 2; i < 2 + RES.length; i++) if (m[i] !== undefined) { gi = i - 2; break; }
    if (gi < 0) continue;
    found.push({ start, end, entry: RES[gi]![1], yr: m[2 + RES.length] });
  }
  if (!found.length) return null;
  let rest = "";
  let pos = 0;
  for (const f of found) { rest += s.slice(pos, f.start) + " "; pos = f.end; }
  rest += s.slice(pos);
  const joins = (f: { start: number; end: number }) =>
    /(?:\bto|until|till|through|thru|and|from|-|\u2013)\s*$/.test(s.slice(Math.max(0, f.start - 12), f.start)) || /^\s*(?:to|until|till|through|thru|and)(?![a-z])/.test(s.slice(f.end));
  const labelOnly = OTHER_DATE.test(rest) && !found.some(joins);
  if (/\b(?:except|excluding|excluding|but not|other than|not on|skip|skipping|apart from|besides|minus)\b/.test(s.slice(0, found[0]!.start))) return null;
  if (found.some((f) => /^,?\s*['\u2019]\d\d\b/.test(s.slice(f.end)))) return null;
  const subs = new Map<string, string>();
  const entries: Entry[] = [];
  let out = "";
  pos = 0;
  found.forEach((f, n) => {
    out += s.slice(pos, f.start);
    pos = f.end;
    if (labelOnly) return;
    const key = iso(PLACEHOLDER_YEAR + n, 1, 1);
    entries.push(f.entry);
    subs.set(key, f.yr ? entryDate(f.entry, +f.yr) : f.entry);
    out += ` ${key} `;
  });
  out += s.slice(pos);
  return { text: out.replace(/\s+/g, " ").trim(), subs, entries };
}

/** Put DSL forms back for the placeholders. A placeholder that did not survive means the parse lost the holiday. */
export function restore(dsl: string, hit: HolidayHit): string | null {
  if (dsl === "x") return null;
  let out = dsl;
  for (const [key, form] of hit.subs) {
    if (!out.includes(key)) return null;
    out = out.split(key).join(form);
  }
  // A restored form that already has an anchor offset cannot take a second one ("day after black friday").
  if (/~[^ ,>]*~/.test(out)) return null;
  // The parser copied a placeholder year onto another date ("christmas eve to 7 jan").
  if (/\b209\d-/.test(out)) return null;
  return out;
}
