import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { FamilyChips, useToggleSet } from "@/components/FamilyChips";
import { Marker } from "@/components/charts/Marker";
import { ParetoChart } from "@/components/charts/ParetoChart";
import { Badge } from "@/components/ui/badge";
import { Card, Empty, PageHeader, SectionTitle } from "@/components/ui/misc";
import { Segmented } from "@/components/ui/segmented";
import { Switch } from "@/components/ui/switch";
import { fmtMs } from "@/lib/format";
import { evalFor, notEvaluatedNote } from "@/lib/evals";
import { CoverageBanner } from "@/components/Coverage";
import { buildPoints, familyOf, paretoFront, PROFILES, X_AXES, Y_AXES, type XAxis, type YAxis } from "@/lib/pareto";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ParetoView() {
  const { runs, version } = useStore();
  const [profile, setProfile] = useState<string>("desktop");
  const [x, setX] = useState<XAxis>("latency");
  const [y, setY] = useState<YAxis>("realistic");
  const [perEngine, setPerEngine] = useState(false);
  const [off, toggleFamily] = useToggleSet();

  const xInfo = X_AXES.find((a) => a.key === x)!;
  const yInfo = Y_AXES.find((a) => a.key === y)!;
  const points = useMemo(
    () => buildPoints(runs, { x, y, perEngine, profile, version }).filter((p) => !off.has(p.family)),
    [runs, x, y, perEngine, profile, version, off],
  );
  const front = useMemo(() => paretoFront(points), [points]);
  const missing = useMemo(() => runs.filter((r) => !evalFor(r, version)), [runs, version]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Pareto front" subtitle={`Accuracy on eval ${version}. Realistic accuracy is resolved accuracy on the external and public splits, weighted by rows. Higher accuracy and lower cost are better; the line joins points no other point beats on both axes. Phone profiles are emulated (CPU throttle, no WebGPU).`} />
      <CoverageBanner />
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 [&>div]:max-w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">X axis</span>
          <Segmented<XAxis> value={x} onChange={setX} options={X_AXES.map((a) => ({ value: a.key, label: a.label }))} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">Y axis</span>
          <Segmented<YAxis> value={y} onChange={setY} options={Y_AXES.map((a) => ({ value: a.key, label: a.label.replace(" accuracy", "") }))} />
        </div>
        <div className="flex max-w-full flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">Bench profile</span>
          <Segmented value={profile} onChange={setProfile} options={PROFILES.map((p) => ({ value: p, label: p === "desktop" ? "Desktop" : p.replace("mobile-", "Phone ") }))} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-muted">Family</span>
          <FamilyChips runs={runs} off={off} onToggle={toggleFamily} />
        </div>
        <div className="pb-1.5"><Switch checked={perEngine} onChange={setPerEngine} label="One point per engine and backend" /></div>
      </div>

      <Card className="p-2 sm:p-3">
        {points.length === 0 ? (
          <Empty>Nothing to plot for this profile</Empty>
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

      {missing.length > 0 && (
        <p className="-mt-2 text-[12px] text-subtle">
          Not plotted (no results for {version}): {missing.map((r) => `${r.config.id}${notEvaluatedNote(r, version).startsWith("Invalid") ? " (invalid)" : ""}`).join(", ")}.
        </p>
      )}

      <section>
        <SectionTitle>On the front ({front.length})</SectionTitle>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {front.map((p) => {
            const r = runs.find((q) => q.config.id === p.runId)!;
            return (
              <button key={p.key} onClick={() => navigate(href("experiments", p.runId))} className="cursor-pointer rounded-card border border-border bg-surface p-3 text-left shadow-input transition-colors hover:bg-hover">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">{p.runId}</span>
                  <Badge>{familyOf(r)}</Badge>
                </div>
                <div className="mt-0.5 truncate text-[12px] font-medium text-fg">{r.config.title}</div>
                {r.config.description && <div className="mt-0.5 line-clamp-2 text-[11.5px] text-muted" title={r.config.description}>{r.config.description}</div>}
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
