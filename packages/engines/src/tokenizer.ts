/** Minimal HF `tokenizer.json` BPE encoder/decoder: Metaspace (+ optional Digits) pre-tokenizer. */

interface TokenizerJson {
  model: { vocab: Record<string, number>; merges: (string | [string, string])[]; unk_token?: string };
  pre_tokenizer?: { type: string; pretokenizers?: { type: string; individual_digits?: boolean }[] };
}

export class BpeTokenizer {
  private vocab: Map<string, number>;
  private inv: string[] = [];
  private ranks = new Map<string, number>();
  private digitSplit: boolean;
  private unk: number;
  private cache = new Map<string, number[]>();

  constructor(json: TokenizerJson) {
    this.vocab = new Map(Object.entries(json.model.vocab));
    for (const [t, i] of this.vocab) this.inv[i] = t;
    json.model.merges.forEach((m, i) => {
      const key = typeof m === "string" ? m : `${m[0]} ${m[1]}`;
      this.ranks.set(key, i);
    });
    const pts = json.pre_tokenizer?.pretokenizers ?? [];
    this.digitSplit = pts.some((p) => p.type === "Digits" && p.individual_digits);
    this.unk = this.vocab.get(json.model.unk_token ?? "<unk>") ?? 2;
  }

  /** Lowercase and collapse whitespace. Must match `norm_in` in training. */
  static normalize(text: string): string {
    return text.toLowerCase().split(/\s+/).filter(Boolean).join(" ");
  }

  private bpe(piece: string): number[] {
    const hit = this.cache.get(piece);
    if (hit) return hit;
    let parts = Array.from(piece);
    while (parts.length > 1) {
      let best = -1;
      let bestRank = Infinity;
      for (let i = 0; i < parts.length - 1; i++) {
        const r = this.ranks.get(`${parts[i]} ${parts[i + 1]}`);
        if (r !== undefined && r < bestRank) {
          bestRank = r;
          best = i;
        }
      }
      if (best < 0) break;
      parts = [...parts.slice(0, best), parts[best]! + parts[best + 1]!, ...parts.slice(best + 2)];
    }
    const ids = parts.map((p) => this.vocab.get(p) ?? this.unk);
    this.cache.set(piece, ids);
    return ids;
  }

  encode(text: string): number[] {
    const norm = BpeTokenizer.normalize(text);
    if (!norm) return [];
    const words = norm.split(" ").map((w, i) => (i === 0 ? w : `▁${w}`));
    const ids: number[] = [];
    for (const w of words) {
      const pieces = this.digitSplit ? w.match(/\d|\D+/g) ?? [] : [w];
      for (const p of pieces) ids.push(...this.bpe(p));
    }
    return ids;
  }

  decode(ids: number[], skip: Set<number> = new Set([0, 1, 2])): string {
    const s = ids.filter((i) => !skip.has(i)).map((i) => this.inv[i] ?? "").join("");
    return s.replaceAll("▁", " ").trim().replace(/\s+/g, " ");
  }
}
