/** Engine ids: `chrono` (third-party comparison) and `h1`, `h2`, ... (heuristic parser generations). */
export const LIBRARY_ENGINE = "chrono";

/** Sort key: `chrono` first, then `hN` by N. Unknown ids go last, alphabetically. */
export function engineRank(id: string): number {
  if (id === LIBRARY_ENGINE) return 0;
  const m = /^h(\d+)$/.exec(id);
  return m ? Number(m[1]) : 1e6;
}

export const compareEngines = (a: string, b: string): number => engineRank(a) - engineRank(b) || a.localeCompare(b);

/** Old routes and links used experiment ids (`exp-018`). Map them to engine ids. */
export const LEGACY_ENGINE: Record<string, string> = {
  "exp-001": "chrono",
  "exp-003": "h1",
  "exp-009": "h2",
  "exp-013": "h3",
  "exp-014": "h4",
  "exp-015": "h5",
  "exp-016": "h6",
  "exp-017": "h7",
  "exp-018": "h8",
};
