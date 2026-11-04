// Small text fixes that run before h9. Each rule is a regex, a replacement and a reason.
// Keep rules narrow: a rewrite must never change a phrase h9 already reads correctly.

const RULES: [RegExp, string][] = [
  // "9m", "9:30m": the "a" or "p" of am/pm is missing. The hour stays and the meridiem is unknown,
  // the same as a bare "9". Not "9mo", "9min", "9m2" or "9 m".
  [/(^|[^\w.:])(\d{1,2}(?::\d{2})?)m(?![\w.])/g, "$1$2"],
];

export function rewriteH10(text: string): string {
  let t = text;
  for (const [re, to] of RULES) t = t.replace(re, to);
  return t;
}
