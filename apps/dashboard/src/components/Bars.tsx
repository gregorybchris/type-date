import { m } from "motion/react";
import type { TagScore } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Delta({ value, unit = "pt", invert }: { value: number; unit?: string; invert?: boolean }) {
  const good = invert ? value < 0 : value > 0;
  if (Math.abs(value) < 0.05) return <span className="num text-[11px] text-subtle">0.0 {unit}</span>;
  return (
    <span className={cn("num text-[11px] font-medium", good ? "text-ok" : "text-danger")}>
      {value > 0 ? "+" : ""}
      {value.toFixed(1)} {unit}
    </span>
  );
}

/** Horizontal accuracy bars. Weakest first. Optional comparison scores add a delta. */
export function AccuracyBars({
  scores,
  compare,
  onSelect,
  selected,
}: {
  scores: Record<string, TagScore>;
  compare?: Record<string, TagScore> | null;
  onSelect?: (k: string) => void;
  selected?: string;
}) {
  const rows = Object.entries(scores).sort((a, b) => a[1].exact - b[1].exact);
  return (
    <div className="flex flex-col">
      {rows.map(([k, v], i) => {
        const c = compare?.[k];
        const color = v.exact >= 0.9 ? "var(--accent)" : v.exact >= 0.7 ? "color-mix(in srgb, var(--accent) 65%, var(--chart-dim))" : "var(--danger)";
        return (
          <button
            key={k}
            disabled={!onSelect}
            onClick={() => onSelect?.(k)}
            className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-[6px] px-1.5 py-2 text-left sm:grid-cols-[minmax(0,170px)_1fr_auto] sm:py-[5px]", onSelect && "cursor-pointer hover:bg-hover", selected === k && "bg-hover")}
          >
            <span className="truncate text-[12.5px] text-fg" title={k}>{k}</span>
            <span className="relative order-last col-span-2 h-2 overflow-hidden rounded-full bg-sunken sm:order-none sm:col-span-1">
              <m.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${v.exact * 100}%` }}
                transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.02, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <span className="num flex items-baseline justify-end gap-2 text-[12px] sm:w-[168px]">
              <span className="font-medium text-fg">{(v.exact * 100).toFixed(1)}%</span>
              <span className="hidden w-12 text-right text-subtle sm:inline">n={v.n}</span>
              {compare ? c ? <span className="w-16 whitespace-nowrap text-right"><Delta value={(v.exact - c.exact) * 100} /></span> : <span className="w-16" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
