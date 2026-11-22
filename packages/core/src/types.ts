export type Weekday = "su" | "mo" | "tu" | "we" | "th" | "fr" | "sa";
export const WEEKDAYS: Weekday[] = ["su", "mo", "tu", "we", "th", "fr", "sa"];

export type Mode = "d" | "t" | "dt";
export type Unit = "d" | "w" | "m" | "y";
/** Offset units: `b` is business days (Monday to Friday). */
export type OffUnit = Unit | "b";

export type DateSpec =
  | { k: "abs"; y: number | null; m: number; d: number; past?: true } // past: on or before today
  | { k: "off"; n: number; u: OffUnit }
  | { k: "wd"; wd: Weekday; n: number; past?: true } // n = 0 means bare weekday
  | { k: "nth"; wd: Weekday | "b"; nth: number; month: number; rel?: number; y?: number } // rel: month n months from this one (`fr#-1@M+0`), month is 0. y: fixed year (`mo#1@2027-10`). wd "b": business day
  | { k: "wknd"; n: number } // WKND+0 this weekend, WKND+1 next weekend, WKND-1 last weekend (a Saturday-Sunday range)
  | { k: "wdwk"; wd: "sa" | "su"; n: number } // one day of a relative weekend (`su@WKND+1`: Sunday of next weekend)
  | { k: "wknth"; nth: number; month: number; rel?: number; y?: number } // Kth weekend of a month, by its Saturday (`WKND#-1@10`)
  | { k: "wom"; nth: number; month: number; rel?: number; y?: number } // Kth week of a month: days 1-7, 8-14, 15-21, 22-28; -1 the last 7 days (`W#1@01`)
  | { k: "wdom"; wd: Weekday; d: number } // weekday that is also day d of the month (`fr&D13`)
  | { k: "per"; u: "w" | "m" | "y" | "q"; n: number }
  | { k: "mon"; month: number; past?: true }
  | { k: "qtr"; q: number } // Q@N: nearest quarter on or after today
  | { k: "anc"; base: DateSpec; n: number; u: OffUnit } // DATE~(+|-)N unit
  | { k: "yr"; year: number }
  | { k: "east"; n: number; y?: number } // E+0 Easter Sunday, E-2 Good Friday, E+1 Easter Monday. y: fixed year (E@2027+0)
  | { k: "wdw"; wd: Weekday; n: number } // weekday inside a relative week (`tu@W+1`: Tuesday of next week)
  | { k: "dom"; d: number } // day of month only, 1-31
  | { k: "pdom"; d: number; n: number }; // day d of the month n months from this one (D13@M-1)

/** Known times are 24h. Ambiguous times have an hour 1-12 and no meridiem. */
export interface TimeSpec {
  h: number;
  m: number;
  amb: boolean;
}

/** A moment relative to the current time: `now+2h`, `now-90m`, `now` (right now), `now+1d` (this time tomorrow). */
export interface NowSpec {
  n: number;
  u: "h" | "m" | "d" | "w";
}

export interface Point {
  date?: DateSpec;
  time?: TimeSpec;
  /** Relative to the current time. A point with `now` has no `date` or `time`; it resolves to both. */
  now?: NowSpec;
}

export interface RecSpec {
  freq: Unit;
  interval: number;
  days?: Weekday[];
  monthDays?: number[];
  nth?: { wd: Weekday; k: number }[];
  /** Month filter (1-12): only dates in these months, every year. */
  months?: number[];
  yearDay?: { m: number; d: number };
  count?: number;
  until?: DateSpec;
  /** Ends the day before this date or period starts (`bM@01`: "until january"). Not with `until`. */
  untilBefore?: DateSpec;
  time?: { start: TimeSpec; end?: TimeSpec; dur?: Duration };
  /** Own time per weekday (`tu@13:30,th@15:00`). Replaces `days` and `time`: `days` lists the weekdays. */
  dayTimes?: { wd: Weekday; start: TimeSpec; end?: TimeSpec; dur?: Duration }[];
  start?: DateSpec;
}

export interface Duration {
  n: number;
  u: "h" | "m";
}

/** A zone named in the text: an IANA name, `UTC`, or a fixed offset (`+05:30`). Only on lines with a time. */
export type Zoned = { zone?: string };

export type Parsed =
  | { mode: "x" }
  | { mode: Mode; kind: "single"; start: Point } & Zoned
  | { mode: Mode; kind: "range"; start: Point; end: Point } & Zoned
  /** `PT>`: start known, no end. */
  | { mode: Mode; kind: "open"; open: "end"; start: Point } & Zoned
  /** `>PT`: end known, no start. */
  | { mode: Mode; kind: "open"; open: "start"; end: Point } & Zoned
  /** `PT>+Nh` or `PT>+Nm`: the start has a time. */
  | { mode: "t" | "dt"; kind: "duration"; start: Point; duration: Duration } & Zoned
  | { mode: Mode; kind: "recurrence"; rec: RecSpec } & Zoned
  /** 2-31 single days, `dt` with a shared time. */
  | { mode: "d" | "dt"; kind: "list"; dates: DateSpec[]; time?: TimeSpec } & Zoned;

export interface ResolvedPoint {
  /** YYYY-MM-DD */
  date?: string;
  /** HH:MM, 24h */
  time?: string;
}

export interface ResolvedRecurrence {
  freq: Unit;
  interval: number;
  days?: Weekday[];
  monthDays?: number[];
  /** First nth weekday. With a list (`tu#1,tu#3`), `nths` holds all of them. */
  nth?: { wd: Weekday; k: number };
  nths?: { wd: Weekday; k: number }[];
  months?: number[];
  yearDay?: { m: number; d: number };
  count?: number;
  /** YYYY-MM-DD */
  until?: string;
  /** YYYY-MM-DD, first occurrence */
  dtstart: string;
  /** YYYY-MM-DD, the resolved `s` bound when the line has one. Can be before dtstart and before today. */
  from?: string;
  /** With `dayTimes`, the time of the first listed weekday. */
  time?: { start: string; end?: string };
  /** One entry per weekday when each weekday has its own time. Same order as `days`. */
  dayTimes?: { wd: Weekday; start: string; end?: string }[];
}

export interface Resolved {
  /** The zone named in the text (`@America/New_York`, `@UTC`, `@+05:30`). Times are not converted. */
  zone?: string;
  mode: Mode | "x";
  kind: "none" | "single" | "range" | "recurrence" | "list";
  start?: ResolvedPoint;
  end?: ResolvedPoint;
  recurrence?: ResolvedRecurrence;
  /** `kind: "list"`: sorted unique YYYY-MM-DD. `start` and `end` are absent. */
  dates?: string[];
  /** `kind: "list"` in mode `dt`: shared HH:MM. */
  time?: string;
  /** One-sided range: the named side is missing from the result. `kind` is "range". */
  open?: "start" | "end";
  /** Duration ranges (`PT>+Nh`): length in minutes. */
  durationMin?: number;
  /** Time-only duration range whose end falls on a later day. `end.date` stays absent. */
  endNextDay?: true;
  /** True when an am/pm guess was applied. */
  ambiguous: boolean;
}

export interface ResolveOptions {
  /** Today as YYYY-MM-DD. Defaults to the local date. */
  today?: string;
  /** 0 = Sunday, 1 = Monday. */
  weekStart?: 0 | 1;
  /** The current local time as YYYY-MM-DDTHH:MM. Defaults to the clock. Sets `today` when `today` is absent. */
  now?: string;
}
