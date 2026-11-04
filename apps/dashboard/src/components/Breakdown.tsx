import { m } from "motion/react";
import { Tip } from "@/components/ui/tooltip";
import { Segmented } from "@/components/ui/segmented";
import { Flow } from "@/components/Num";
import { Delta } from "@/components/Bars";
import type { TagScore } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Groups with fewer examples than this are flagged. A rate on a few rows is not a trend. */
export const SMALL_N = 30;

export type Metric = "error" | "accuracy" | "share";

export interface BreakRow {
  key: string;
  n: number;
  errors: number;
}

export function rowsFromScores(scores: Record<string, TagScore>): BreakRow[] {
  return Object.entries(scores).map(([key, v]) => ({ key, n: v.n, errors: Math.round(v.n * (1 - v.exact)) }));
}

export const METRIC_OPTIONS: Array<{ value: Metric; label: string }> = [
  { value: "error", label: "Error rate" },
  { value: "accuracy", label: "Accuracy" },
  { value: "share", label: "Share of errors" },
];

export function MetricToggle({ value, onChange }: { value: Metric; onChange: (m: Metric) => void }) {
  return <Segmented<Metric> value={value} onChange={onChange} options={METRIC_OPTIONS} />;
}

const rate = (r: BreakRow) => (r.n ? r.errors / r.n : 0);

/** Red grows with the error rate. Saturates at 60%. */
function rateColor(errRate: number): string {
  const t = Math.round(Math.min(1, errRate / 0.6) * 82);
  return `color-mix(in srgb, var(--danger) ${t}%, var(--chart-dim))`;
}

const pctText = (x: number) => `${(x * 100).toFixed(x > 0 && x < 0.01 ? 2 : 1)}%`;

/**
 * Rows of label, bar and a percentage. Rate is the headline. Counts and n stay visible as muted text.
 * Sorted worst first. Bars for groups under SMALL_N are hatched.
 */
export function Breakdown({
  rows,
  totalErrors,
  totalN,
  metric,
  selected,
  onSelect,
  compare,
}: {
  rows: BreakRow[];
  totalErrors: number;
  totalN: number;
  metric: Metric;
  selected?: string;
  onSelect?: (key: string) => void;
  /** Same dimension for another experiment. Adds a change figure. */
  compare?: BreakRow[] | null;
}) {
  const overall = totalN ? totalErrors / totalN : 0;
  const share = (r: BreakRow) => (totalErrors ? r.errors / totalErrors : 0);
  const value = (r: BreakRow) => (metric === "share" ? share(r) : metric === "accuracy" ? 1 - rate(r) : rate(r));
  // Worst first: high error rate, low accuracy, high share.
  const sorted = [...rows].sort((a, b) => (metric === "accuracy" ? value(a) - value(b) : value(b) - value(a)) || b.n - a.n);
  const maxShare = Math.max(0.0001, ...rows.map(share));
  const cmp = new Map(compare?.map((r) => [r.key, r]));

  return (
    <div className="flex flex-col">
      {sorted.map((r) => {
        const v = value(r);
        const small = r.n < SMALL_N;
        const c = cmp.get(r.key);
        const barPct = metric === "share" ? (share(r) / maxShare) * 100 : v * 100;
        const color = metric === "share" ? "var(--accent)" : metric === "accuracy" ? rateColor(rate(r)) : rateColor(rate(r));
        const detail = `${r.errors} errors of ${r.n} examples. Error rate ${pctText(rate(r))}. ${pctText(share(r))} of all ${totalErrors} errors.${small ? ` Under ${SMALL_N} examples, so the rate is unreliable.` : ""}`;
        return (
          <Tip key={r.key} label={detail}>
            <m.button
              layout="position"
              transition={{ type: "spring", stiffness: 420, damping: 38 }}
              disabled={!onSelect}
              onClick={() => onSelect?.(r.key)}
              className={cn(
                "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1.5 rounded-[8px] px-2 py-2 text-left sm:grid-cols-[minmax(0,150px)_1fr_60px_minmax(0,156px)] sm:items-center sm:py-1.5",
                onSelect && "cursor-pointer hover:bg-hover",
                selected === r.key && "bg-hover",
              )}
            >
              <span className="truncate text-[13px] text-fg max-sm:col-start-1 max-sm:row-start-1" title={r.key}>{r.key}</span>
              <span className="relative col-span-2 h-2 overflow-hidden rounded-full bg-sunken max-sm:row-start-2 sm:col-span-1">
                <m.span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: small
                      ? `repeating-linear-gradient(135deg, ${color} 0 3px, transparent 3px 6px)`
                      : color,
                  }}
                  initial={false}
                  animate={{ width: `${Math.max(barPct, v > 0 ? 1.5 : 0)}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 26 }}
                />
                {metric !== "share" && (
                  <span
                    className="absolute inset-y-[-2px] w-px bg-fg/40"
                    style={{ left: `${(metric === "accuracy" ? 1 - overall : overall) * 100}%` }}
                    aria-hidden
                  />
                )}
              </span>
              <span className="num text-right text-[14px] font-semibold text-fg max-sm:col-start-2 max-sm:row-start-1 sm:text-[13.5px]">
                <Flow value={v * 100} digits={1} suffix="%" />
              </span>
              <span className="num col-span-2 flex items-center gap-1.5 whitespace-nowrap text-[11.5px] text-subtle max-sm:row-start-3 sm:col-span-1 sm:justify-start">
                <span className="truncate">
                  {metric === "share" ? `${r.errors} errors, ${pctText(rate(r))} rate` : `${r.errors} of ${r.n}`}
                </span>
                {small && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-chip border border-warn/30 bg-warn-soft px-1 text-[10.5px] font-medium leading-4 text-warn">
                    <span className="size-1 rounded-full bg-warn" />n={r.n}
                  </span>
                )}
                {c && metric !== "share" && (
                  <Delta
                    value={metric === "accuracy" ? (rate(c) - rate(r)) * 100 : (rate(r) - rate(c)) * 100}
                    invert={metric === "error"}
                  />
                )}
              </span>
            </m.button>
          </Tip>
        );
      })}
    </div>
  );
}

export function BreakdownLegend({ metric, overall }: { metric: Metric; overall: number }) {
  return (
    <p className="mt-2 px-2 text-[11.5px] leading-4 text-subtle">
      {metric === "share"
        ? "Share of all errors that fall in each group. Large groups rank high even at a low rate."
        : `Dotted line marks the overall ${metric === "accuracy" ? "accuracy" : "error rate"} (${pctText(metric === "accuracy" ? 1 - overall : overall)}). Hatched bars have fewer than ${SMALL_N} examples.`}
    </p>
  );
}
