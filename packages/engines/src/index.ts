export type { Engine, LoadOptions, Manifest, PredictOptions, PredictResult } from "./types";
export { BpeTokenizer } from "./tokenizer";
export { OrtCustomEngine } from "./ort-custom";
import { OrtCustomEngine } from "./ort-custom";
import type { Engine } from "./types";

export const engines: Record<string, () => Engine> = {
  "ort-custom": () => new OrtCustomEngine(),
};

export function createEngine(id: string): Engine {
  const make = engines[id];
  if (!make) throw new Error(`unknown engine: ${id}`);
  return make();
}
