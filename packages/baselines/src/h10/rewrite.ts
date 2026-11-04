// Small text fixes that run before h9. Each rule is a regex, a replacement and a reason.
// Keep rules narrow: a rewrite must never change a phrase h9 already reads correctly.

const RULES: [RegExp, string][] = [
  // "at 9m", "@9m": the "a" or "p" of am/pm is missing after "at". The hour stays and the meridiem is unknown,
  // the same as a bare "9".
  [/(\b(?:at|@)\s*)(\d{1,2}(?::\d{2})?)m(?![\w.])/g, "$1$2"],
  // "9m to ...", "9m - ...": the same typo before a range joiner. Not "5m ago" or "in 5m" (minutes).
  [/(^|[^\w.:])(\d{1,2}(?::\d{2})?)m(?=\s*(?:to|-|until|till|through|thru)\b)/g, "$1$2"],
];

export function rewriteH10(text: string): string {
  let t = text;
  for (const [re, to] of RULES) t = t.replace(re, to);
  return t;
}
