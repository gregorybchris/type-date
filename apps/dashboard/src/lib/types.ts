// Shapes of files in specs/contracts.md plus API wrappers.

export interface RunConfig {
  id: string;
  number: number;
  title: string;
  /** One or two sentences: what the engine is and what changed. */
  description?: string;
  created: string;
  notes?: string;
  parent: string | null;
  /** `family` is "library" (chrono-node) or "heuristic". `engine` is the id in @type-date/baselines. */
  model: { family: string; engine?: string };
}

export interface TagScore {
  n: number;
  exact: number;
  resolved?: number;
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
  /** `size_bytes` is the gzipped source size. */
  model: { size_bytes: number; size_bytes_minified?: number; size_bytes_lazy?: number };
}

export interface BenchEntry {
  engine: string;
  /** "desktop" when missing. Only desktop entries are used. */
  profile?: string;
  latency_ms: { p50: number; p95: number; p99: number };
  n: number;
}

export interface Run {
  config: RunConfig;
  metrics: RunMetrics;
  bench: BenchEntry[];
}

export interface EvalManifest {
  version: string;
  created?: string;
  reason?: string;
  parent?: string | null;
  subset_of?: string | null;
  added_splits?: string[];
  /** Rows per split. */
  files?: Record<string, { n: number; sha256?: string }>;
}

export interface EvalsResponse {
  evals: EvalManifest[];
}

export interface RunsResponse {
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
  /** True when the predicted DSL resolves to the same dates as the expected one. */
  resolved_match?: boolean;
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
  /** Eval version whose failures to read: runs/exp-NNN/errors/<version>.jsonl. */
  version?: string;
  offset?: number;
  limit?: number;
  tag?: string;
  modifier?: string;
  split?: string;
  q?: string;
}

export interface EvalSplitSummary {
  n: number;
  sources: Record<string, number>;
}

export interface EvalSummary {
  version: string;
  splits: Record<string, EvalSplitSummary>;
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
  facets: { by_tag: Record<string, number>; by_source: Record<string, number> };
}
