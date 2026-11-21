import h12 from "@type-date/baselines/h12";

/**
 * The built-in parser (heuristic engine h12): text to a DSL line. Relative phrases such as "next friday" resolve
 * against `today` (YYYY-MM-DD, default the local date). The rule sets load lazily on the first call.
 */
export async function parse(text: string, today?: string): Promise<string> {
  const r = await h12.predict(text.trim().toLowerCase().replace(/\s+/g, " "), undefined, { today });
  return r.dsl;
}

/** Start loading the parser's rule sets. Safe to call many times. */
export function preload(): void {
  void h12.load();
}
