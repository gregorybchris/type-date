// Shapes of files in specs/contracts.md plus API wrappers.

export interface RunConfig {
  id: string;
  number: number;
  title: string;
  /** One or two sentences: what the experiment is and why. */
  description?: string;
  created: string;
  dataset: string;
  format: string;
  notes?: string;
  parent: string | null;
  model: { family: string; params: number; [k: string]: unknown };
  train: Record<string, unknown>;
  export?: { format?: string; quant?: string };
}

export interface TagScore {
  n: number;
  exact: number;
}

export interface EvalBlock {
  version?: string;
  exact: number;
  resolved: number;
  n: number;
  by_split: Record<string, TagScore>;
  by_tag: Record<string, TagScore>;
  by_modifier: Record<string, TagScore>;
}

export interface RunMetrics {
  eval: EvalBlock;
  /** Re-scores on other eval versions, keyed by version. */
  evals?: Record<string, EvalBlock>;
  model: { params: number; size_bytes: number; avg_output_tokens?: number };
  train?: { seconds?: number; steps?: number; final_loss?: number };
}

export interface BenchEntry {
  engine: string;
  backend: string;
  browser?: string;
  /** "desktop" when missing. */
  profile?: string;
  load_ms: number;
  cold_first_ms: number;
  latency_ms: { p50: number; p95: number; p99: number };
  tokens_per_s?: number;
  memory_mb: number;
  download_bytes: number;
  n: number;
  browser_accuracy?: number;
}

export interface Manifest {
  experiment: string;
  engine: string;
  quant?: string;
  files: Record<string, string>;
  config: Record<string, number | string>;
}

export interface StageTiming {
  total_s: number;
  stages?: { started_at?: string; finished_at?: string };
  buckets: Record<string, number>;
  unaccounted_s?: number;
  train_profile?: { steps: number; step_ms: number; samples_per_s: number };
  [k: string]: unknown;
}

export interface Timing {
  total_s: number;
  stages: Record<string, StageTiming>;
  buckets?: Record<string, number>;
}

export interface Run {
  timing?: Timing | null;
  config: RunConfig;
  metrics: RunMetrics;
  bench: BenchEntry[];
  manifest: Manifest | null;
}

export interface RunsResponse {
  sample: boolean;
  runs: Run[];
}

export interface ErrorRow {
  id: string;
  text: string;
  split: string;
  primary_tag: string;
  modifier_tags: string[];
  expected: string;
  predicted: string;
}

export interface Facets {
  by_tag: Record<string, number>;
  by_modifier: Record<string, number>;
  by_split: Record<string, number>;
}

export interface ErrorsResponse {
  total: number;
  offset: number;
  items: ErrorRow[];
  facets: Facets;
}

export interface ErrorQuery {
  offset?: number;
  limit?: number;
  tag?: string;
  modifier?: string;
  split?: string;
  q?: string;
}

export interface DatasetMeta {
  version: string;
  created: string;
  counts: Record<string, number>;
  by_tag: Record<string, Record<string, number>>;
  notes?: string;
}

export interface DatasetsResponse {
  sample: boolean;
  datasets: DatasetMeta[];
}

export interface Sample {
  id: string;
  text: string;
  dsl: string;
  primary_tag: string;
  modifier_tags: string[];
  source: string;
  split: string;
  parent_id: string | null;
}

export interface SampleQuery {
  offset?: number;
  limit?: number;
  tag?: string;
  modifier?: string;
  split?: string;
  source?: string;
  q?: string;
}

export interface SamplesResponse {
  total: number;
  offset: number;
  items: Sample[];
  facets: { by_modifier: Record<string, number>; by_source: Record<string, number> };
}
