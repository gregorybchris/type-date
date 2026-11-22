import h17 from "@type-date/baselines/h17";

/** What the parser may know about the user, used to pick among ambiguous zone abbreviations (IST, CST, BST). */
export interface ParseContext {
  /** The user's IANA time zone. */
  zone?: string;
  /** The user's locale, for example `en-IN`. */
  locale?: string;
}

/**
 * The built-in parser (heuristic engine h17): text to a DSL line. Relative phrases such as "next friday" resolve
 * against `today` (YYYY-MM-DD, default the local date). A time zone named in the text is the last token (`@America/New_York`).
 * Offsets from now ("in 2 hours") resolve against the clock. Lunar holidays ("diwali", "during ramadan") resolve from a date table. The rule sets load lazily on the first call.
 */
export async function parse(text: string, today?: string, ctx: ParseContext = {}): Promise<string> {
  const r = await h17.predict(text.trim().toLowerCase().replace(/\s+/g, " "), undefined, { today, zone: ctx.zone, locale: ctx.locale });
  return r.dsl;
}

/** Start loading the parser's rule sets. Safe to call many times. */
export function preload(): void {
  void h17.load();
}
