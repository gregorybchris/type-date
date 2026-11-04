// "four score and seven years ago" -> "87 years ago"; "a dozen days ago" -> "12 days ago".
// Fires only when a count stands before "score" or "dozen" and a time unit follows.
const ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const NUM = `(?:\\d+|(?:${Object.keys(TENS).join("|")})(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?|${ONES.slice(1).join("|")})`;
const RE = new RegExp(`\\b(?:(half a)|(a|an|${NUM})) (score|dozen)(?: and (${NUM}))?(?: of)? (?=(?:days?|weeks?|months?|years?|fortnights?)\\b)`, "gi");

const val = (w: string): number => {
  if (/^\d+$/.test(w)) return +w;
  const [a, b] = w.toLowerCase().split(/[- ]/);
  return TENS[a!] !== undefined ? TENS[a!]! + (b ? ONES.indexOf(b) : 0) : ONES.indexOf(a!);
};

export function scoreDozen(s: string): string {
  return s.replace(RE, (_, half: string | undefined, n: string | undefined, kind: string, m: string | undefined) => {
    const unit = kind.toLowerCase() === "score" ? 20 : 12;
    const count = half ? 0.5 : /^an?$/i.test(n!) ? 1 : val(n!);
    return `${count * unit + (m ? val(m) : 0)} `;
  });
}
