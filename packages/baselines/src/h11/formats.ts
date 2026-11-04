// Machine and regional date formats rewritten to ISO text that h10 reads: ISO week and ordinal dates, ISO year-month,
// basic ISO date-times, Roman-numeral months.

import { clock24 } from "./words";

const p2 = (n: number) => String(n).padStart(2, "0");
const iso = (t: number) => {
  const d = new Date(t);
  return `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())}`;
};
const DIM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const ROMAN: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10, xi: 11, xii: 12 };
const year = (y: string) => (y.length === 4 ? +y : +y >= 70 ? 1900 + +y : 2000 + +y);

/** Monday of ISO week 1: the week with January 4th. */
const isoWeek1 = (y: number) => {
  const jan4 = Date.UTC(y, 0, 4);
  const dow = (new Date(jan4).getUTCDay() + 6) % 7; // Monday = 0
  return jan4 - dow * 86400000;
};

export function formats(s: string): string {
  // ISO week date: 2001-W05-3, 2001W053, 2001-w05
  s = s.replace(/(?<![\w-])(\d{4})-?w(0[1-9]|[1-4]\d|5[0-3])(?:-?([1-7]))?(?![\w])/g, (m, y: string, w: string, d: string | undefined) => {
    const mon = isoWeek1(+y) + (+w - 1) * 7 * 86400000;
    if (d) return iso(mon + (+d - 1) * 86400000);
    return `${iso(mon)} to ${iso(mon + 6 * 86400000)}`;
  });
  // ISO ordinal date: 2001-123
  s = s.replace(/(?<![\w-])(\d{4})-(\d{3})(?![\w-])/g, (m, y: string, n: string) => {
    const doy = +n;
    if (+y < 1900 || +y > 2200) return m;
    if (doy < 1 || doy > (leap(+y) ? 366 : 365)) return m;
    return iso(Date.UTC(+y, 0, 1) + (doy - 1) * 86400000);
  });
  // ISO year-month: 2021-04
  s = s.replace(/(?<![\w/.-])((?:19|20|21)\d\d)-(0[1-9]|1[0-2])(?![\w:.-]|\/)/g, (_m, y: string, mo: string) => {
    const last = DIM[+mo - 1]! + (+mo === 2 && leap(+y) ? 1 : 0);
    return `${y}-${mo}-01 to ${y}-${mo}-${p2(last)}`;
  });
  // ISO date-time with T: the time is a 24h clock time
  s = s.replace(/(?<![\w])(\d{4}-\d\d-\d\d)t(\d\d):(\d\d)(?::\d\d(?:\.\d+)?)?(?:z|[+-]\d\d:?\d\d)?(?![\w])/g, (_m, d: string, h: string, mi: string) => `${d} ${clock24(+h, +mi)}`);
  // ISO date-time with T: the time is a 24h clock time
  s = s.replace(/(?<![\w])(\d{4}-\d\d-\d\d)t(\d\d):(\d\d)(?::\d\d(?:\.\d+)?)?(?:z|[+-]\d\d:?\d\d)?(?![\w])/g, (_m, d: string, h: string, mi: string) => `${d} ${clock24(+h, +mi)}`);
  // basic ISO date-time: 20211004T101500Z
  s = s.replace(/(?<![\w])(\d{4})(\d\d)(\d\d)t(\d\d)(\d\d)(\d\d)?(?:z|[+-]\d\d:?\d\d)?(?![\w])/g, (_m, y: string, mo: string, d: string, h: string, mi: string) => `${y}-${mo}-${d} ${clock24(+h, +mi)}`);
  // Roman-numeral month: 14 III 1879, 31.xii.99, 8-vi-2001
  s = s.replace(/(?<![\w.])(\d{1,2})[ .\-/]\s*(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)\s*[ .\-/]\s*(\d{4}|\d{2})(?![\w])/g, (_m, d: string, r: string, y: string) => `${year(y)}-${p2(ROMAN[r]!)}-${p2(+d)}`);
  return s;
}
