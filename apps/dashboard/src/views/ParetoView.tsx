import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { Marker } from "@/components/charts/Marker";
import { ParetoChart } from "@/components/charts/ParetoChart";
import { Badge } from "@/components/ui/badge";
import { Card, Empty, PageHeader, SectionTitle } from "@/components/ui/misc";
import { Segmented } from "@/components/ui/segmented";
import { Switch } from "@/components/ui/switch";
import { fmtMs } from "@/lib/format";
import { buildPoints, paretoFront, X_AXES, Y_AXES, type XAxis, type YAxis } from "@/lib/pareto";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function LegendToggle({ on, onClick, kind, label }: { on: boolean; onClick: () => void; kind: "model" | "baseline"; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={cn("inline-flex h-8 cursor-pointer items-center gap-2 rounded-field border px-2.5 text-[13px] font-medium shadow-input transition-colors", on ? "border-border bg-surface text-fg" : "border-border bg-sunken text-subtle")}
    >
      <svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden><Marker kind={kind} r={4.5} fill={on ? "var(--accent)" : "transparent"} stroke={on ? "var(--accent)" : "var(--chart-dim)"} /></svg>
      {label}
    </button>
  );
}

export function ParetoView() {
  const { runs } = useStore();
  const [x, setX] = useState<XAxis>("latency");
  const [y, setY] = useState<YAxis>("exact");
  const [perEngine, setPerEngine] = useState(false);
  const [models, setModels] = useState(true);
  const [baselines, setBaselines] = useState(true);

  const xInfo = X_AXES.find((a) => a.key === x)!;
  const yInfo = Y_AXES.find((a) => a.key === y)!;
  const points = useMemo(
    () => buildPoints(runs, { x, y, perEngine }).filter((p) => (p.kind === "model" ? models : baselines)),
    [runs, x, y, perEngine, models, baselines],
  );
  const front = useMemo(() => paretoFront(points), [points]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Pareto front" subtitle="Higher accuracy and lower cost are better. The line joins points no other point beats on both axes." />
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">X axis</span>
          <Segmented<XAxis> value={x} onChange={setX} options={X_AXES.map((a) => ({ value: a.key, label: a.label }))} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">Y axis</span>
          <Segmented<YAxis> value={y} onChange={setY} options={Y_AXES.map((a) => ({ value: a.key, label: a.label.replace(" accuracy", "") }))} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">Show</span>
          <div className="flex gap-2">
            <LegendToggle on={models} onClick={() => setModels((v) => !v)} kind="model" label="Models" />
            <LegendToggle on={baselines} onClick={() => setBaselines((v) => !v)} kind="baseline" label="Baselines" />
          </div>
        </div>
        <div className="pb-1.5"><Switch checked={perEngine} onChange={setPerEngine} label="One point per engine and backend" /></div>
      </div>

      <Card className="p-3">
        {points.length === 0 ? (
          <Empty>Nothing to plot</Empty>
        ) : (
          <AnimatePresence>
            <ParetoChart points={points} xAxis={x} yAxis={y} xInfo={xInfo} yInfo={yInfo} onOpen={(id) => navigate(href("experiments", id))} />
          </AnimatePresence>
        )}
        <div className="dotted-t mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 px-2 pb-1 pt-3 text-[12px] text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-5 rounded bg-accent" />Pareto front</span>
          <span className="inline-flex items-center gap-1.5"><svg width="12" height="12" viewBox="-6 -6 12 12"><Marker kind="model" r={4.5} fill="var(--accent)" stroke="var(--accent)" /></svg>On front</span>
          <span className="inline-flex items-center gap-1.5"><svg width="12" height="12" viewBox="-6 -6 12 12"><Marker kind="model" r={4.5} fill="var(--surface)" stroke="var(--chart-dim)" /></svg>Dominated</span>
          <span className="inline-flex items-center gap-1.5"><svg width="14" height="14" viewBox="-7 -7 14 14"><Marker kind="baseline" r={4} fill="var(--surface)" stroke="var(--chart-dim)" /></svg>Baseline (no model)</span>
          <span>Bubble size is parameter count. Labels are experiment numbers.</span>
        </div>
      </Card>

      <section>
        <SectionTitle>On the front ({front.length})</SectionTitle>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {front.map((p) => {
            const r = runs.find((q) => q.config.id === p.runId)!;
            return (
              <button key={p.key} onClick={() => navigate(href("experiments", p.runId))} className="cursor-pointer rounded-card border border-border bg-surface p-3 text-left shadow-input transition-colors hover:bg-hover">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">{p.runId}</span>
                  {p.kind === "baseline" && <Badge>Baseline</Badge>}
                </div>
                <div className="mt-0.5 truncate text-[12px] text-muted">{r.config.title}</div>
                <div className="num mt-2 flex gap-4 text-[12px] text-muted">
                  <span><b className="font-medium text-fg">{(p.y * 100).toFixed(1)}%</b> {yInfo.label.split(" ")[0]!.toLowerCase()}</span>
                  <span><b className="font-medium text-fg">{x === "latency" ? fmtMs(p.x) : `${+p.x.toFixed(1)} ${xInfo.unit}`}</b></span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
