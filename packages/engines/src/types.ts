export interface Manifest {
  experiment: string;
  engine: string;
  quant?: string;
  files: Record<string, string>;
  config?: Record<string, number | string>;
}

export interface PredictResult {
  /** DSL line, see specs/dsl.md */
  dsl: string;
  /** Wall time of this call in milliseconds */
  ms: number;
  outputTokens?: number;
}

export interface LoadOptions {
  baseUrl: string;
  manifest?: Manifest;
  backend?: "wasm" | "webgpu";
  onProgress?: (p: number) => void;
}

export interface PredictOptions {
  /** Reference day as YYYY-MM-DD. Only engines that return absolute dates (chrono) use it. */
  today?: string;
}

export interface Engine {
  readonly id: string;
  load(opts: LoadOptions): Promise<void>;
  predict(text: string, signal?: AbortSignal, opts?: PredictOptions): Promise<PredictResult>;
  dispose(): void;
}
