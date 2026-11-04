import type { Engine } from "./engine";
export type { Engine, PredictOptions, PredictResult } from "./engine";
import chronoEngine from "./chrono";
import h1 from "./h1";
import h2 from "./h2";
import h3 from "./h3";
import h4 from "./h4";
import h5 from "./h5";
import h6 from "./h6";
import h7 from "./h7";
import h8 from "./h8";
import h9 from "./h9";

export { chronoEngine, h1, h2, h3, h4, h5, h6, h7, h8, h9 };
export { chronoToDsl } from "./chrono";
export { parseH1 } from "./h1";
export { parseH2 } from "./h2";
export { parseH3 } from "./h3";
export { parseH4 } from "./h4";
export { parseH5 } from "./h5";
export { parseH6 } from "./h6";
export { parseH7, parseH7Async, loadV2 as loadH7Lazy } from "./h7";
export { parseH8, parseH8Async } from "./h8";
export { parseH9, parseH9Async, loadH9 as loadH9Lazy } from "./h9";

/** Engines by id: `chrono` (third-party comparison) and `h1`..`h9` (heuristic parser generations). */
export const baselines: Record<string, Engine> = { chrono: chronoEngine, h1, h2, h3, h4, h5, h6, h7, h8, h9 };
