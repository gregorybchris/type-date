import type { Run, Timing } from "./types";

export type BucketKey = "train_loop" | "eval_generate" | "eval_score" | "setup" | "export" | "bench";

export const BUCKETS: Array<{ key: BucketKey; label: string; color: string; hint: string }> = [
  { key: "train_loop", label: "Train loop", color: "var(--t-train)", hint: "Forward, backward, optimizer, collate" },
  { key: "eval_generate", label: "Eval generate", color: "var(--t-gen)", hint: "Decoding predictions for the eval sets" },
  { key: "eval_score", label: "Eval score", color: "var(--t-score)", hint: "Comparing predictions, resolver" },
  { key: "setup", label: "Setup + save", color: "var(--t-setup)", hint: "Data load, tokenizer, model init, checkpoint, results, unaccounted" },
  { key: "export", label: "Export", color: "var(--t-export)", hint: "ONNX or GGUF export and quantize" },
  { key: "bench", label: "Bench", color: "var(--t-bench)", hint: "Browser benchmark stages" },
];

export type Seconds = Record<BucketKey, number>;

const SETUP_KEYS = ["data_load", "tokenizer_train", "encode_train", "model_init", "save_checkpoint", "write_results"];

export const emptySeconds = (): Seconds => ({ train_loop: 0, eval_generate: 0, eval_score: 0, setup: 0, export: 0, bench: 0 });

/** Top-level bucket seconds for one experiment. Sub-buckets (with "/") are never added. */
export function bucketSeconds(t: Timing | null | undefined): Seconds {
  const out = emptySeconds();
  if (!t) return out;
  const train = t.stages.train;
  if (train) {
    const b = train.buckets;
    out.train_loop = b.train_loop ?? 0;
    out.eval_generate = b.eval_generate ?? 0;
    out.eval_score = b.eval_score ?? 0;
    out.setup = SETUP_KEYS.reduce((s, k) => s + (b[k] ?? 0), 0) + (train.unaccounted_s ?? 0);
  }
  if (t.stages.export) out.export = t.stages.export.total_s;
  for (const [name, st] of Object.entries(t.stages)) if (name.startsWith("bench")) out.bench += st.total_s;
  return out;
}

export const sumSeconds = (s: Seconds) => BUCKETS.reduce((a, b) => a + s[b.key], 0);

export function biggest(s: Seconds): BucketKey | null {
  let best: BucketKey | null = null;
  for (const b of BUCKETS) if (s[b.key] > 0 && (best === null || s[b.key] > s[best])) best = b.key;
  return best;
}

export const TRAIN_PHASES = ["forward", "backward", "optim", "collate", "sync_loss"] as const;

export interface Gap {
  from: string;
  to: string;
  /** Seconds between the end of one training stage and the start of the next. Zero when they overlap. */
  idleS: number;
  /** Seconds the next training stage took. */
  nextTrainS: number;
}

/** Idle time between consecutive experiments that have a train stage with start and end times. */
export function gaps(runs: Run[]): Gap[] {
  const timed = runs
    .map((r) => {
      const st = r.timing?.stages.train?.stages;
      const a = st?.started_at ? Date.parse(st.started_at) : NaN;
      const b = st?.finished_at ? Date.parse(st.finished_at) : NaN;
      return { id: r.config.id, number: r.config.number, a, b };
    })
    .filter((x) => Number.isFinite(x.a) && Number.isFinite(x.b))
    .sort((x, y) => x.a - y.a);
  const out: Gap[] = [];
  for (let i = 1; i < timed.length; i++) {
    const p = timed[i - 1]!;
    const c = timed[i]!;
    out.push({ from: p.id, to: c.id, idleS: Math.max(0, (c.a - p.b) / 1000), nextTrainS: (c.b - c.a) / 1000 });
  }
  return out;
}

export function fmtDur(s: number): string {
  if (s < 1) return `${s.toFixed(2)} s`;
  if (s < 60) return `${s.toFixed(s < 10 ? 1 : 0)} s`;
  if (s < 3600) return `${Math.floor(s / 60)} m ${Math.round(s % 60)} s`;
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return m === 60 ? `${h + 1} h` : `${h} h ${m} m`;
}
