import type { Engine } from "@type-date/engines";
import chronoEngine from "./chrono";
import heuristicFull from "./heuristic-full";
import heuristicFull2 from "./heuristic-full-2";
import heuristicFull3 from "./heuristic-full-3";
import heuristicFull4 from "./heuristic-full-4";
import heuristicFull5 from "./heuristic-full-5";
import heuristicFull6 from "./heuristic-full-6";
import heuristicFull7 from "./heuristic-full-7";
import heuristicSmall from "./heuristic-small";

export { chronoEngine, heuristicFull, heuristicFull2, heuristicFull3, heuristicFull4, heuristicFull5, heuristicFull6, heuristicFull7, heuristicSmall };
export { chronoToDsl } from "./chrono";
export { parseFull } from "./heuristic-full";
export { parseFull as parseFull2 } from "./heuristic-full-2";
export { parseFull as parseFull3 } from "./heuristic-full-3";
export { parseFull as parseFull4 } from "./heuristic-full-4";
export { parseFull as parseFull5 } from "./heuristic-full-5";
export { parseFull as parseFull6 } from "./heuristic-full-6";
export { parseFull as parseFull7, parseFullAsync as parseFull7Async, loadV2 as loadFull7Lazy } from "./heuristic-full-7";
export { parseSmall } from "./heuristic-small";

/** Non-model baselines by engine id. All implement the `Engine` interface. */
export const baselines: Record<string, Engine> = {
  chrono: chronoEngine,
  "heuristic-small": heuristicSmall,
  "heuristic-full": heuristicFull,
  "heuristic-full-2": heuristicFull2,
  "heuristic-full-3": heuristicFull3,
  "heuristic-full-4": heuristicFull4,
  "heuristic-full-5": heuristicFull5,
  "heuristic-full-6": heuristicFull6,
  "heuristic-full-7": heuristicFull7,
};
