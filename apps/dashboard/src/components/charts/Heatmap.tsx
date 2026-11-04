import { useState } from "react";
import { cellFor, pc, splitLabel } from "@/lib/compare";
import { useTheme } from "@/lib/theme";
import type { Run } from "@/lib/types";

/** Engines by splits. Each cell shows the rate. Missing results are hatched, never blank. */
export function Heatmap({ runs, splits, version, mode }: { runs: Run[]; splits: string[]; version: string; mode: "accuracy" | "error" }) {
  const [sel, setSel] = useState<{ run: Run; split: string } | null>(null);
  const { theme } = useTheme();
  const hue = theme === "dark" ? "Yellower" : "More indigo";
  const cells = runs.flatMap((r) => splits.map((s) => cellFor(r, version, s)?.acc)).filter((v): v is number => v !== undefined);
  const lo = Math.min(...cells, 1);
  const hi = Math.max(...cells, 0);
  // Piecewise scale: lowest cell 0, median cell 0.5, highest cell 1. Spreads out the crowded high scores.
  const sorted = [...cells].sort((a, b) => a - b);
  const med = sorted.length ? (sorted[Math.floor((sorted.length - 1) / 2)]! + sorted[Math.ceil((sorted.length - 1) / 2)]!) / 2 : 0;
  const tOf = (acc: number) => {
    if (hi - lo < 1e-9) return 1;
    if (acc >= med) return hi - med < 1e-9 ? 1 : 0.5 + (0.5 * (acc - med)) / (hi - med);
    return med - lo < 1e-9 ? 0 : (0.5 * (acc - lo)) / (med - lo);
  };
  const detail = sel ? cellFor(sel.run, version, sel.split) : null;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-[2px] text-[11px]">
          <thead>
            <tr>
              <th className="sticky left-0 z-[1] bg-surface px-2 text-left align-bottom font-medium text-subtle">Engine</th>
              {splits.map((s) => (
                <th key={s} className="h-20 w-[44px] min-w-[44px] align-bottom font-normal text-muted">
                  <div className="mx-auto whitespace-nowrap [writing-mode:vertical-rl] rotate-180" title={s}>{splitLabel(s)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.config.id}>
                <th className="sticky left-0 z-[1] whitespace-nowrap bg-surface px-2 text-left font-medium text-fg">{r.config.id}</th>
                {splits.map((s) => {
                  const c = cellFor(r, version, s);
                  const on = sel?.run === r && sel.split === s;
                  if (!c) {
                    return (
                      <td key={s} className="p-0">
                        <button onClick={() => setSel({ run: r, split: s })} className="h-8 w-full min-w-[44px] cursor-pointer rounded-[6px] border border-dashed border-warn/40 text-[11px] text-warn" style={{ background: "repeating-linear-gradient(135deg, var(--warn-soft) 0 4px, transparent 4px 8px)" }} title={`${r.config.id} has no result on ${s} (${version})`}>n/a</button>
                      </td>
                    );
                  }
                  const t = tOf(c.acc);
                  // Accuracy: high is dark accent. Error rate: low is dark accent, so the colors stay in the same direction (dark is good).
                  const strong = Math.round(10 + t * 78);
                  return (
                    <td key={s} className="p-0">
                      <button
                        onClick={() => setSel({ run: r, split: s })}
                        className="num h-8 w-full min-w-[44px] cursor-pointer rounded-[6px] font-medium outline-offset-1"
                        style={{ background: `color-mix(in srgb, var(--accent) ${strong}%, var(--surface))`, color: t > 0.5 ? "var(--accent-fg)" : "var(--fg)", outline: on ? "2px solid var(--fg)" : undefined, border: c.small ? "1px dashed color-mix(in srgb, var(--fg) 55%, transparent)" : undefined }}
                        title={`${r.config.id}, ${s}: ${pc(c.acc)} accuracy, ${c.errors} errors of ${c.n}${c.small ? " (under 30 rows)" : ""}`}
                      >
                        {mode === "accuracy" ? (c.acc * 100).toFixed(1) : ((1 - c.acc) * 100).toFixed(1)}
                        {c.small && <sup className="ml-px">†</sup>}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex min-h-10 flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[12px] text-muted">
        {sel ? (
          detail ? (
            <span><b className="text-fg">{sel.run.config.id}</b> on <b className="text-fg">{sel.split}</b> ({version}): <b className="num text-fg">{pc(detail.acc)}</b> accuracy, <span className="num">{pc(1 - detail.acc)}</span> error rate, <span className="num">{detail.errors} errors of {detail.n.toLocaleString()}</span>{detail.small && <span className="text-warn"> (under 30 rows)</span>}</span>
          ) : (
            <span><b className="text-fg">{sel.run.config.id}</b> has no result on <b className="text-fg">{sel.split}</b> in {version}.</span>
          )
        ) : (
          <span>Tap a cell for counts. Cells show {mode === "accuracy" ? "resolved accuracy" : "error rate"} in percent for eval {version}. {hue} is better; a gray cell is the worst shown. A dashed border and † mean under 30 rows (the shade still follows the score). Hatched n/a means no result.</span>
        )}
      </div>
    </div>
  );
}
