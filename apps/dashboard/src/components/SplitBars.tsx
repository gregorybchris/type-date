import { m } from "motion/react";
import { Delta } from "@/components/Bars";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { isRealisticSplit } from "@/lib/evals";
import type { TagScore } from "@/lib/types";
import { cn } from "@/lib/utils";

const isReal = isRealisticSplit;
const score = (s: TagScore) => s.resolved ?? s.exact;

/** Per-split resolved accuracy. Realistic splits come first and use the accent color. */
export function SplitBars({ scores, compare }: { scores: Record<string, TagScore>; compare?: Record<string, TagScore> | null }) {
  const rows = Object.entries(scores).sort((a, b) => Number(isReal(b[0])) - Number(isReal(a[0])));
  return (
    <div className="flex flex-col gap-0.5">
      {rows.map(([k, v], i) => {
        const real = isReal(k);
        const c = compare?.[k];
        return (
          <div
            key={k}
            className={cn(
              "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 rounded-[8px] px-2.5 py-2 sm:grid-cols-[230px_1fr_64px_150px]",
              real && "border border-accent/25 bg-accent-soft/50",
            )}
          >
            <span className="flex min-w-0 items-center gap-1.5 text-[13px]">
              <span className={cn("truncate", real ? "font-semibold text-fg" : "text-muted")}>{k}</span>
              {real && <Badge tone="accent">Realistic</Badge>}
            </span>
            <span className="relative col-span-2 h-2 overflow-hidden rounded-full bg-sunken max-sm:row-start-2 sm:col-span-1">
              <m.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: real ? "var(--accent)" : "var(--chart-dim)" }}
                initial={{ width: 0 }}
                animate={{ width: `${score(v) * 100}%` }}
                transition={{ type: "spring", stiffness: 150, damping: 26, delay: i * 0.03 }}
              />
            </span>
            <span className={cn("num text-right font-semibold max-sm:col-start-2 max-sm:row-start-1", real ? "text-[15px] text-fg" : "text-[13.5px] text-muted")}>
              <Flow value={score(v) * 100} digits={1} suffix="%" />
            </span>
            <span className="num col-span-2 flex items-center gap-2 whitespace-nowrap text-[11.5px] text-subtle max-sm:row-start-3 sm:col-span-1">
              n={v.n.toLocaleString()}{v.n < 30 && <span className="rounded-chip border border-warn/30 bg-warn-soft px-1 text-[10.5px] font-medium text-warn" title="Under 30 rows: the rate is unreliable">small</span>}
              {c && <Delta value={(score(v) - score(c)) * 100} />}
            </span>
          </div>
        );
      })}
    </div>
  );
}
