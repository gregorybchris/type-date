import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { CoverageBanner } from "@/components/Coverage";
import { Marker } from "@/components/charts/Marker";
import { ParetoChart } from "@/components/charts/ParetoChart";
import { Badge } from "@/components/ui/badge";
import { Card, Empty, PageHeader, SectionTitle } from "@/components/ui/misc";
import { Segmented } from "@/components/ui/segmented";
import { fmtBytes, fmtMs } from "@/lib/format";
import { buildPoints, isLibrary, paretoFront, X_AXES, Y_AXES, type XAxis, type YAxis } from "@/lib/pareto";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";

export function ParetoView() {
  const { runs, version } = useStore();
  const [x, setX] = useState<XAxis>("size");
  const [y, setY] = useState<YAxis>("resolved");

  const xInfo = X_AXES.find((a) => a.key === x)!;
  const yInfo = Y_AXES.find((a) => a.key === y)!;
  const { points, skipped } = useMemo(() => buildPoints(runs, { x, y, version }), [runs, x, y, version]);
  const front = useMemo(() => paretoFront(points), [points]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Pareto front"
        subtitle={`${yInfo.label} on eval ${version} against ${xInfo.label.toLowerCase()}. Higher accuracy and lower cost are better. The line joins engines that no other engine beats on both axes. Realistic accuracy is resolved accuracy on the external and public splits, weighted by rows.`}
      />
      <CoverageBanner />
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 [&>div]:max-w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">X axis</span>
          <Segmented<XAxis> value={x} onChange={setX} options={X_AXES.map((a) => ({ value: a.key, label: a.label }))} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">Y axis ({version})</span>
          <Segmented<YAxis> value={y} onChange={setY} options={Y_AXES.map((a) => ({ value: a.key, label: a.label.replace(" accuracy", "") }))} />
        </div>
      </div>

      <Card className="p-2 sm:p-3">
        {points.length === 0 ? (
          <Empty>Nothing to plot</Empty>
        ) : (
          <AnimatePresence>
            <ParetoChart points={points} xAxis={x} yAxis={y} xInfo={xInfo} yInfo={yInfo} version={version} onOpen={(id) => navigate(href("experiments", id))} />
          </AnimatePresence>
        )}
        <div className="dotted-t mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 px-2 pb-1 pt-3 text-[12px] text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-5 rounded bg-accent" />Pareto front</span>
          <span className="inline-flex items-center gap-1.5"><svg width="12" height="12" viewBox="-6 -6 12 12"><Marker kind="model" r={4.5} fill="var(--accent)" stroke="var(--accent)" /></svg>On front</span>
          <span className="inline-flex items-center gap-1.5"><svg width="12" height="12" viewBox="-6 -6 12 12"><Marker kind="model" r={4.5} fill="var(--surface)" stroke="var(--chart-dim)" /></svg>Dominated</span>
          <span className="inline-flex items-center gap-1.5"><svg width="14" height="14" viewBox="-7 -7 14 14"><Marker kind="baseline" r={4} fill="var(--surface)" stroke="var(--chart-dim)" /></svg>Third-party library</span>
          <span>Labels are experiment numbers. Eval {version}.</span>
        </div>
      </Card>

      {skipped.length > 0 && (
        <p className="-mt-2 text-[12px] text-subtle">
          Not plotted: {skipped.map((s) => `${s.run.config.id} (${s.reason})`).join(", ")}.
        </p>
      )}

      <section>
        <SectionTitle>On the front ({front.length})</SectionTitle>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {front.map((p) => {
            const r = runs.find((q) => q.config.id === p.runId)!;
            return (
              <button key={p.runId} onClick={() => navigate(href("experiments", p.runId))} className="cursor-pointer rounded-card border border-border bg-surface p-3 text-left shadow-input transition-colors hover:bg-hover">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">{p.runId}</span>
                  <Badge>{isLibrary(r) ? "library" : "heuristic"}</Badge>
                </div>
                <div className="mt-0.5 truncate text-[12px] font-medium text-fg">{r.config.title}</div>
                {r.config.description && <div className="mt-0.5 line-clamp-2 text-[11.5px] text-muted" title={r.config.description}>{r.config.description}</div>}
                <div className="num mt-2 flex gap-4 text-[12px] text-muted">
                  <span><b className="font-medium text-fg">{(p.y * 100).toFixed(1)}%</b> {yInfo.label.split(" ")[0]!.toLowerCase()} {version}</span>
                  <span><b className="font-medium text-fg">{x === "size" ? fmtBytes(p.x * 1e3) : fmtMs(p.x)}</b> {xInfo.label.toLowerCase()}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
