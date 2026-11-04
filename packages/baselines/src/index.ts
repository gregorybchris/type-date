import type { Engine } from "@type-date/engines";
import chronoEngine from "./chrono";
import heuristicFull from "./heuristic-full";
import heuristicFull2 from "./heuristic-full-2";
import heuristicFull3 from "./heuristic-full-3";
import heuristicSmall from "./heuristic-small";

export { chronoEngine, heuristicFull, heuristicFull2, heuristicFull3, heuristicSmall };
export { chronoToDsl } from "./chrono";
export { parseFull } from "./heuristic-full";
export { parseFull as parseFull2 } from "./heuristic-full-2";
export { parseFull as parseFull3 } from "./heuristic-full-3";
export { parseSmall } from "./heuristic-small";

/** Non-model baselines by engine id. All implement the `Engine` interface. */
export const baselines: Record<string, Engine> = {
  chrono: chronoEngine,
  "heuristic-small": heuristicSmall,
  "heuristic-full": heuristicFull,
  "heuristic-full-2": heuristicFull2,
  "heuristic-full-3": heuristicFull3,
};
