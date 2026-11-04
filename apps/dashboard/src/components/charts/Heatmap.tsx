import { useState } from "react";
import { cellFor, pc, splitLabel } from "@/lib/compare";
import type { Run } from "@/lib/types";

/** Engines by splits. Each cell shows the rate. Missing results are hatched, never blank. */
export function Heatmap({ runs, splits, version, mode }: { runs: Run[]; splits: string[]; version: string; mode: "accuracy" | "error" }) {
  const [sel, setSel] = useState<{ run: Run; split: string } | null>(null);
  const cells = runs.flatMap((r) => splits.map((s) => cellFor(r, version, s)?.acc)).filter((v): v is number => v !== undefined);
  const lo = Math.min(...cells, 1);
  const hi = Math.max(...cells, 0);
  const tOf = (acc: number) => (hi - lo < 1e-9 ? 1 : (acc - lo) / (hi - lo));
  const detail = sel ? cellFor(sel.run, version, sel.split) : null;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-[2px] text-[12px]">
          <thead>
            <tr>
              <th className="sticky left-0 z-[1] bg-surface px-2 text-left align-bottom font-medium text-subtle">Engine</th>
              {splits.map((s) => (
                <th key={s} className="h-24 w-[54px] min-w-[54px] align-bottom font-normal text-muted">
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
                        <button onClick={() => setSel({ run: r, split: s })} className="h-11 w-full min-w-[54px] cursor-pointer rounded-[6px] border border-dashed border-warn/40 text-[11px] text-warn" style={{ background: "repeating-linear-gradient(135deg, var(--warn-soft) 0 4px, transparent 4px 8px)" }} title={`${r.config.id} has no result on ${s} (${version})`}>n/a</button>
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
                        className="num h-11 w-full min-w-[54px] cursor-pointer rounded-[6px] font-medium outline-offset-1"
                        style={{ background: `color-mix(in srgb, var(--accent) ${strong}%, var(--surface))`, color: t > 0.5 ? "var(--accent-fg)" : "var(--fg)", outline: on ? "2px solid var(--fg)" : undefined, opacity: c.small ? 0.7 : 1 }}
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
          <span>Tap a cell for counts. Cells show {mode === "accuracy" ? "resolved accuracy" : "error rate"} in percent for eval {version}. Darker is better. † means under 30 rows. Hatched n/a means no result.</span>
        )}
      </div>
    </div>
  );
}
