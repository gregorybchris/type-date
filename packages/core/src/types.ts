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
  | { k: "nth"; wd: Weekday; nth: number; month: number }
  | { k: "per"; u: "w" | "m" | "y" | "q"; n: number }
  | { k: "mon"; month: number; past?: true }
  | { k: "qtr"; q: number } // Q@N: nearest quarter on or after today
  | { k: "anc"; base: DateSpec; n: number; u: OffUnit } // DATE~(+|-)N unit
  | { k: "yr"; year: number }
  | { k: "dom"; d: number } // day of month only, 1-31
  | { k: "pdom"; d: number; n: number }; // day d of the month n months from this one (D13@M-1)

/** Known times are 24h. Ambiguous times have an hour 1-12 and no meridiem. */
export interface TimeSpec {
  h: number;
  m: number;
  amb: boolean;
}

export interface Point {
  date?: DateSpec;
  time?: TimeSpec;
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
  time?: { start: TimeSpec; end?: TimeSpec; dur?: Duration };
  start?: DateSpec;
}

export interface Duration {
  n: number;
  u: "h" | "m";
}

export type Parsed =
  | { mode: "x" }
  | { mode: Mode; kind: "single"; start: Point }
  | { mode: Mode; kind: "range"; start: Point; end: Point }
  /** `PT>`: start known, no end. */
  | { mode: Mode; kind: "open"; open: "end"; start: Point }
  /** `>PT`: end known, no start. */
  | { mode: Mode; kind: "open"; open: "start"; end: Point }
  /** `PT>+Nh` or `PT>+Nm`: the start has a time. */
  | { mode: "t" | "dt"; kind: "duration"; start: Point; duration: Duration }
  | { mode: Mode; kind: "recurrence"; rec: RecSpec }
  /** 2-31 single days, `dt` with a shared time. */
  | { mode: "d" | "dt"; kind: "list"; dates: DateSpec[]; time?: TimeSpec };

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
  time?: { start: string; end?: string };
}

export interface Resolved {
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
}
