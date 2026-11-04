/** Token-level diff of two DSL lines. */
export interface DiffToken {
  text: string;
  /** true when the token is not part of the common subsequence. */
  changed: boolean;
}

export function tokenizeDsl(s: string): string[] {
  return s.split(/(\s+|>|\/|,|#|@|-|\+|:)/).filter((t) => t !== "");
}

export function diffDsl(expected: string, predicted: string): { expected: DiffToken[]; predicted: DiffToken[] } {
  const a = tokenizeDsl(expected);
  const b = tokenizeDsl(predicted);
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i]![j] = a[i] === b[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    }
  }
  const ea: DiffToken[] = a.map((text) => ({ text, changed: true }));
  const pb: DiffToken[] = b.map((text) => ({ text, changed: true }));
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      ea[i]!.changed = false;
      pb[j]!.changed = false;
      i++;
      j++;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) i++;
    else j++;
  }
  return { expected: ea, predicted: pb };
}
