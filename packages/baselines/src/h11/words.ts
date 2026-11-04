// Spoken numbers, years, military clock times and clock idioms. Everything here rewrites text to digits; h10 reads the result.

const ONES: Record<string, number> = {
  zero: 0, oh: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const ORD_ONES: Record<string, number> = {
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10, eleventh: 11, twelfth: 12,
  thirteenth: 13, fourteenth: 14, fifteenth: 15, sixteenth: 16, seventeenth: 17, eighteenth: 18, nineteenth: 19,
};
const ORD_TENS: Record<string, number> = { twentieth: 20, thirtieth: 30 };

const NUM = `(?:${[...Object.keys(ONES), ...Object.keys(TENS)].join("|")})`;
const CARD2 = `(?:${Object.keys(TENS).join("|")})(?:[ -](?:one|two|three|four|five|six|seven|eight|nine))?|${Object.keys(ONES).join("|")}`;
const ORD = `(?:(?:${Object.keys(TENS).join("|")})[ -](?:${Object.keys(ORD_ONES).slice(0, 9).join("|")})|${[...Object.keys(ORD_ONES), ...Object.keys(ORD_TENS)].join("|")})`;

/** Value of a number word of 0..99 ("twenty-three", "nine", "oh"). */
export function card(w: string): number | null {
  const t = w.trim().replace(/-/g, " ").split(/\s+/);
  if (t.length === 1) return t[0]! in ONES ? ONES[t[0]!]! : t[0]! in TENS ? TENS[t[0]!]! : null;
  if (t.length === 2 && t[0]! in TENS && t[1]! in ONES && ONES[t[1]!]! >= 1 && ONES[t[1]!]! <= 9) return TENS[t[0]!]! + ONES[t[1]!]!;
  return null;
}

/** Value of an ordinal word of 1..31 ("twenty third", "first"). */
export function ord(w: string): number | null {
  const t = w.trim().replace(/-/g, " ").split(/\s+/);
  if (t.length === 1) return t[0]! in ORD_ONES ? ORD_ONES[t[0]!]! : t[0]! in ORD_TENS ? ORD_TENS[t[0]!]! : null;
  if (t.length === 2 && t[0]! in TENS && t[1]! in ORD_ONES && ORD_ONES[t[1]!]! <= 9) return TENS[t[0]!]! + ORD_ONES[t[1]!]!;
  return null;
}

const suffix = (n: number) => (n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10] ?? "th"));
const p2 = (n: number) => String(n).padStart(2, "0");

const MONTHS = "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";
const WEEKDAYS = "mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nesday)?|thu(?:r(?:s(?:day)?)?)?|fri(?:day)?|sat(?:urday)?|sun(?:day)?";

/** Spoken years: "nineteen ninety nine", "twenty twenty six", "two thousand and five", "nineteen oh five", "nineteen hundred". */
function years(s: string): string {
  const y2 = `(?:oh[ -](?:one|two|three|four|five|six|seven|eight|nine)|${CARD2})`;
  const val = (a: string, b: string): string | null => {
    const hi = a === "nineteen" ? 19 : a === "twenty" ? 20 : a === "eighteen" ? 18 : null;
    if (hi === null) return null;
    if (b === "hundred") return String(hi * 100);
    const lo = b.startsWith("oh") ? card(b.slice(3)) : card(b);
    return lo === null || (lo < 10 && !b.startsWith("oh")) ? null : String(hi * 100 + lo);
  };
  // "two thousand [and] N"
  s = s.replace(new RegExp(`\\btwo thousand(?: and)?(?:[ ](${CARD2}))?(?![\\w-])`, "g"), (_m, n: string | undefined) => {
    const lo = n ? card(n) : 0;
    return lo === null ? _m : String(2000 + lo);
  });
  // The hours reading ("twenty thirty" = 20:30) is left alone unless a year context word is near.
  return s.replace(new RegExp(`(?<=\\b(?:in|of|year|since|until|till|before|by|from|to|,)\\s|${MONTHS}\\s(?:\\d{1,2}(?:st|nd|rd|th)?,?\\s)?|^)(nineteen|eighteen|twenty)[ -](${y2}|hundred)(?![\\w-])`, "g"), (m, a: string, b: string) => val(a, b) ?? m);
}

/** Ordinal words next to a weekday or month, or before "of": "monday the ninth", "may twenty second". */
function ordinals(s: string): string {
  const rep = (w: string) => {
    const n = ord(w);
    return n === null || n > 31 ? null : `${n}${suffix(n)}`;
  };
  s = s.replace(new RegExp(`\\b(${WEEKDAYS}|${MONTHS})\\.?,?\\s+(the\\s+)?(${ORD})(?![\\w-])`, "g"), (m, a: string, the: string | undefined, w: string) => {
    const r = rep(w);
    return r ? `${a} ${the ?? ""}${r}` : m;
  });
  s = s.replace(new RegExp(`(?<=^|\\bon |\\bfor |\\buntil |\\bto |\\bfrom |,\\s?)\\b(the\\s+)?(${ORD})(\\s+of\\s+(?:${MONTHS}|the month|this month|next month|last month))`, "g"), (m, the: string | undefined, w: string, tail: string) => {
    const r = rep(w);
    return r ? `${the ?? ""}${r}${tail}` : m;
  });
  return s;
}

/** Cardinal number words after a month ("march twenty two") or as a bare day in "the twenty five of". */
function monthDays(s: string): string {
  return s.replace(new RegExp(`\\b(${MONTHS})\\s+(${CARD2})(?=\\s*(?:$|,|at\\b|to\\b|from\\b|until\\b|till\\b|through\\b|and\\b|for\\b|on\\b|in\\b|by\\b|before\\b|after\\b|\\d|noon|midnight|[-\u2013]))`, "g"), (m, mo: string, w: string) => {
    const n = card(w);
    return n !== null && n >= 1 && n <= 31 ? `${mo} ${n}` : m;
  });
}

/** Hour words after a time preposition become digits: "at nine", "by ten", "around two". */
function hourWords(s: string): string {
  const H = "(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)";
  return s.replace(new RegExp(`\\b(at|by|around|from|until|till|@|starting|begins?|ends?)\\s+${H}(?![\\w-])(?!\\s+(?:days?|weeks?|months?|years?|hours?|minutes?|mins?|times|people|guests|of|per|percent|dollars|bucks|oh|zero|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|one|two|three|four|five|six|seven|eight|nine))`, "g"), (_m, pre: string, w: string) => `${pre} ${ONES[w]}`);
}

/** Military and spoken 24h clock: "0900 hours", "1745h", "oh seven hundred", "fourteen thirty", "eighteen forty five". */
function military(s: string): string {
  const hhmm = (h: number, m: number) => clock24(h, m);
  // digits with an hours marker
  s = s.replace(/\b([01]\d|2[0-3])[:.]?([0-5]\d)\s*(?:hours|hrs|hr|h)\b/g, (_m, h: string, m: string) => hhmm(+h, +m));
  s = s.replace(/\b([01]?\d|2[0-3])\.([0-5]\d)\s*(?:hours|hrs|hr|h)\b/g, (_m, h: string, m: string) => hhmm(+h, +m));
  s = s.replace(/\b(at|@|by|until|till|from|to)\s+([01]?\d|2[0-3])\s*(?:hours|hrs)\b(?!\s+(?:ago|later|from|before|after|early|late|notice))/g, (_m, pre: string, h: string) => `${pre} ${p2(+h)}:00`);
  // spoken: "[zero|oh] seven hundred [hours]", "fourteen hundred", "twenty one hundred"
  s = s.replace(new RegExp(`\\b((?:zero|oh)[ -])?(${CARD2})[ -]hundred(\\s+hours)?(?![\\w-]|\\s+(?:and|thousand|years?|days?|dollars|bucks|miles|people))`, "g"), (m, zero: string | undefined, a: string, hrs: string | undefined) => {
    const h = card(a);
    if (h === null || h < 0 || h > 23) return m;
    return zero || hrs || h >= 10 ? hhmm(h, 0) : m;
  });
  // "oh eight thirty", "zero nine fifteen"
  s = s.replace(new RegExp(`\\b(?:oh|zero)[ -](one|two|three|four|five|six|seven|eight|nine)[ -](${CARD2})(?:\\s+hours)?(?![\\w-])`, "g"), (m, a: string, b: string) => {
    const mm = card(b);
    return mm !== null && mm <= 59 ? hhmm(ONES[a]!, mm) : m;
  });
  // "fourteen thirty", "eighteen forty five" (24h hour 13-23 plus minutes) not after a month (a year there)
  s = s.replace(new RegExp(`(?<!${MONTHS}\\s)\\b(thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|twenty[ -]one|twenty[ -]two|twenty[ -]three)[ -](thirty|forty|fifty|fifteen|forty[ -]five|oh[ -](?:one|two|three|four|five|six|seven|eight|nine)|ten|twenty|twenty[ -]five)(\\s+hours)?(?![\\w-])`, "g"), (m, a: string, b: string, hrs: string | undefined) => {
    const h = card(a);
    const mm = b.startsWith("oh") ? card(b.slice(3)) : card(b);
    if (h === null || mm === null || h < 13 || h > 23 || mm > 59) return m;
    // "nineteen forty five" and "twenty ten" read as years unless the hours word follows
    if (!hrs && (h === 19 || h === 20 || h === 18)) return m;
    return hhmm(h, mm);
  });
  return s;
}

/** Minute idioms: "half past 11", "quarter to 9", "twenty to two", "five of three", "ten after 2". */
function idioms(s: string): string {
  // "five and twenty past four" = twenty five past four; "noon thirty" = 12:30
  s = s.replace(/\b(five|ten|fifteen) and (twenty|thirty)\b(?=\s+(?:past|to|after|till|of|before))/g, (_m, a: string, b: string) => (b === "twenty" && a === "five" ? "twenty five" : _m));
  s = s.replace(/\b(noon|midnight) (ten|fifteen|twenty|thirty|forty[ -]five|forty|fifty)\b/g, (_m, w: string, n: string) => `${w === "noon" ? 12 : 0}:${p2(card(n)!)}${w === "noon" ? " pm" : " am"}`);
  const H = "(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|noon|midnight|1[0-2]|[1-9])";
  const hourNum = (h: string) => (h === "noon" ? 12 : h === "midnight" ? 12 : h in ONES ? ONES[h]! : +h);
  const MIN = "(?:a quarter|quarter|half|five|ten|fifteen|twenty|twenty[ -]five|20|25|10|15|5)";
  const minVal = (m: string) => {
    const k = m.replace(/^a /, "").replace("-", " ");
    return k === "quarter" ? 15 : k === "half" ? 30 : k in ONES ? ONES[k]! : k === "twenty" ? 20 : k === "twenty five" ? 25 : +k;
  };
  // "<min> past|after <hour>" and "<min> to|till|of|before <hour>" -- not when an am/pm or a colon follows the hour on a digit minute
  const NUMW = "(?:\\d|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|oh)[ -]";
  const re = new RegExp(`(?<!${NUMW})\\b(${MIN})\\s+(past|after|to|till|until|of|before)\\s+${H}(?![\\w:.])(?:\\s*(am|pm)\\b\\.?)?(?!\\s+(?:days?|weeks?|months?|years?|hours?|minutes?|mins?|times|people|guests))`, "g");
  return s.replace(re, (m, min: string, rel: string, hr: string, mer: string | undefined, off: number, str: string) => {
    // "five to nine am" is a range (policy); "five of nine am" and "ten past eight pm" are times
    if (mer && !["of", "past", "after"].includes(rel)) return m;
    const sfx = mer ? ` ${mer}` : "";
    const digitMin = /^\d/.test(min);
    // "10 to 8": a digit minute needs the whole phrase to be the clock, not a range of hours
    if (digitMin && !(off === 0 && off + m.length === str.length)) return m;
    const mv = minVal(min);
    const h = hourNum(hr);
    // "10 to 8", "20 to 9": the hour is smaller than the minutes, so it cannot be a range of hours
    if (digitMin && !["past", "after"].includes(rel) && h >= mv) return m;
    if (hr === "midnight" && (rel === "past" || rel === "after")) return `12:${p2(mv)} am`;
    if (hr === "noon" && (rel === "past" || rel === "after")) return `12:${p2(mv)} pm`;
    if (rel === "past" || rel === "after") return `${h}:${p2(mv)}${sfx}`;
    if (hr === "midnight") return `11:${p2(60 - mv)} pm`;
    const hh = h === 1 ? 12 : h - 1;
    return hr === "noon" ? `11:${p2(60 - mv)} am` : `${hh}:${p2(60 - mv)}${sfx}`;
  });
}

/** Bare four-digit time ("1430") and a part-of-day word before an hour ("night 9", "afternoon 12"). */
function partsOfDay(s: string): string {
  const mer: Record<string, (h: number) => string> = {
    morning: (h) => (h === 12 ? "am" : "am"),
    afternoon: (h) => (h >= 1 && h <= 11 ? "pm" : "pm"),
    evening: () => "pm",
    night: (h) => (h >= 6 && h <= 11 ? "pm" : h === 12 ? "am" : "am"),
  };
  s = s.replace(/^(morning|afternoon|evening|night)\s+(before|after|until|till|by)\s+(\d{1,2}(?::\d\d)?)(?:\s*(am|pm))?$/, (m, pod: string, rel: string, t: string, ap: string | undefined) => {
    const n = parseInt(t, 10);
    return n < 1 || n > 12 ? m : `${rel} ${t} ${ap ?? mer[pod]!(n)}`;
  });
  return s.replace(/^(morning|afternoon|evening|night)\s+(?:at\s+)?(\d{1,2})(?::(\d\d))?$/g, (m, pod: string, h: string, mm: string | undefined) => {
    const n = +h;
    if (n < 1 || n > 12) return m;
    return `${n}${mm ? `:${mm}` : ""} ${mer[pod]!(n)}`;
  });
}

/** "o'clock" with a part of day: "10 o'clock in the night" -> "10 pm". */
function oclock(s: string): string {
  return s.replace(/\b(\d{1,2})\s*o'?clock\s+(?:in the |at |of the |this )?(morning|afternoon|evening|night)\b/g, (m, h: string, pod: string) => {
    const n = +h;
    if (n < 1 || n > 12) return m;
    const pm = pod === "morning" ? false : pod === "night" ? n >= 6 && n <= 11 : true;
    return `${n} ${pm ? "pm" : "am"}`;
  });
}

/** Rewrite spoken numbers and clock idioms to digits. `known24` is set when a 24h clock time was written. */
/** A 24h clock time as text h10 reads as known: hours 10-12 get an am/pm word, others are zero padded or above 12. */
export function clock24(h: number, m: number): string {
  const mm = `${p2(h)}:${p2(m)}`;
  return h === 10 || h === 11 ? `${mm} am` : h === 12 ? `${mm} pm` : mm;
}

export function words(s: string): { text: string; known24: boolean } {
  s = idioms(s);
  s = hourWords(s);
  s = military(s);
  const known24 = false;
  s = years(s);
  s = ordinals(s);
  s = oclock(s);
  s = partsOfDay(s);
  return { text: s, known24 };
}

/** Make the unknown-meridiem times of a prediction known 24h times (hour 1-12 with `?` becomes HH:MM). */
export function to24(dsl: string): string {
  return dsl.replace(/\b(\d{1,2})(?::(\d\d))?\?/g, (_m, h: string, mm: string | undefined) => `${p2(+h)}:${mm ?? "00"}`);
}
