export type Weekday = "su" | "mo" | "tu" | "we" | "th" | "fr" | "sa";
export const WEEKDAYS: Weekday[] = ["su", "mo", "tu", "we", "th", "fr", "sa"];

export type Mode = "d" | "t" | "dt";
export type Unit = "d" | "w" | "m" | "y";

export type DateSpec =
  | { k: "abs"; y: number | null; m: number; d: number }
  | { k: "off"; n: number; u: Unit }
  | { k: "wd"; wd: Weekday; n: number } // n = 0 means bare weekday
  | { k: "nth"; wd: Weekday; nth: number; month: number }
  | { k: "per"; u: "w" | "m" | "y"; n: number }
  | { k: "mon"; month: number }
  | { k: "yr"; year: number };

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
  nth?: { wd: Weekday; k: number };
  yearDay?: { m: number; d: number };
  count?: number;
  until?: DateSpec;
  time?: { start: TimeSpec; end?: TimeSpec };
  start?: DateSpec;
}

export type Parsed =
  | { mode: "x" }
  | { mode: Mode; kind: "single"; start: Point }
  | { mode: Mode; kind: "range"; start: Point; end: Point }
  | { mode: Mode; kind: "recurrence"; rec: RecSpec };

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
  nth?: { wd: Weekday; k: number };
  yearDay?: { m: number; d: number };
  count?: number;
  /** YYYY-MM-DD */
  until?: string;
  /** YYYY-MM-DD, first occurrence */
  dtstart: string;
  time?: { start: string; end?: string };
}

export interface Resolved {
  mode: Mode | "x";
  kind: "none" | "single" | "range" | "recurrence";
  start?: ResolvedPoint;
  end?: ResolvedPoint;
  recurrence?: ResolvedRecurrence;
  /** True when an am/pm guess was applied. */
  ambiguous: boolean;
}

export interface ResolveOptions {
  /** Today as YYYY-MM-DD. Defaults to the local date. */
  today?: string;
  /** 0 = Sunday, 1 = Monday. */
  weekStart?: 0 | 1;
}
