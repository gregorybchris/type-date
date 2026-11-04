import type { Engine } from "@type-date/engines";
import chronoEngine from "./chrono";
import heuristicFull from "./heuristic-full";
import heuristicSmall from "./heuristic-small";

export { chronoEngine, heuristicFull, heuristicSmall };
export { chronoToDsl } from "./chrono";
export { parseFull } from "./heuristic-full";
export { parseSmall } from "./heuristic-small";

/** Non-model baselines by engine id. All implement the `Engine` interface. */
export const baselines: Record<string, Engine> = {
  chrono: chronoEngine,
  "heuristic-small": heuristicSmall,
  "heuristic-full": heuristicFull,
};
