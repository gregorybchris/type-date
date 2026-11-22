// Lunar and lunisolar holidays (`L:CODE±N`, h16). Dates come from the generated table in lunar-table.ts.
import { LUNAR_TABLE } from "./lunar-table";

/** Holiday codes. `eid` is the union of `eidfitr` and `eidadha`. */
export const LUNAR_CODES = [...Object.keys(LUNAR_TABLE), "eid"];

const cache = new Map<string, number[]>();
const EPOCH = Math.round(Date.UTC(2000, 0, 1) / 86_400_000);

/** Every date of a holiday in the table, as days since 1970-01-01, in order. Unknown code: empty. */
export function lunarDays(code: string): number[] {
  let out = cache.get(code);
  if (out) return out;
  if (code === "eid") out = [...lunarDays("eidfitr"), ...lunarDays("eidadha")].sort((a, b) => a - b);
  else {
    const s = LUNAR_TABLE[code] ?? "";
    out = [];
    for (let i = 0; i < s.length; i += 3) out.push(EPOCH + parseInt(s.slice(i, i + 3), 36));
  }
  cache.set(code, out);
  return out;
}

export const isLunarCode = (code: string) => LUNAR_CODES.includes(code);
