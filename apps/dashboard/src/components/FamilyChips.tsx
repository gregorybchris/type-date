import { useCallback, useState } from "react";
import { Marker } from "@/components/charts/Marker";
import { FAMILIES, familyOf } from "@/lib/pareto";
import type { Run } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Families present in the runs: the known five first, then any others. */
export function familiesIn(runs: Run[]): Array<{ family: string; count: number }> {
  const counts = new Map<string, number>();
  for (const r of runs) counts.set(familyOf(r), (counts.get(familyOf(r)) ?? 0) + 1);
  const known = FAMILIES.filter((f) => counts.has(f));
  const rest = [...counts.keys()].filter((f) => !(FAMILIES as readonly string[]).includes(f)).sort();
  return [...known, ...rest].map((family) => ({ family, count: counts.get(family)! }));
}

/** Toggle chips. `off` holds the hidden families. */
export function FamilyChips({ runs, off, onToggle }: { runs: Run[]; off: Set<string>; onToggle: (family: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by family">
      {familiesIn(runs).map(({ family, count }) => {
        const on = !off.has(family);
        const diamond = family === "library" || family === "heuristic";
        return (
          <button
            key={family}
            onClick={() => onToggle(family)}
            aria-pressed={on}
            className={cn("inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-field border px-2.5 text-[13px] font-medium shadow-input transition-colors", on ? "border-border bg-surface text-fg" : "border-border bg-sunken text-subtle")}
          >
            <svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden>
              <Marker kind={diamond ? "baseline" : "model"} r={4} fill={on ? "var(--accent)" : "transparent"} stroke={on ? "var(--accent)" : "var(--chart-dim)"} />
            </svg>
            {family}
            <span className="num text-[11.5px] font-normal text-subtle">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Set of hidden families with a toggle function. */
export function useToggleSet(): [Set<string>, (v: string) => void] {
  const [s, setS] = useState<Set<string>>(new Set());
  const toggle = useCallback((v: string) => setS((p) => { const n = new Set(p); if (n.has(v)) n.delete(v); else n.add(v); return n; }), []);
  return [s, toggle];
}
