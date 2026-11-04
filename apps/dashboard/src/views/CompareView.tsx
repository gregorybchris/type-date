import { useMemo, useState } from "react";
import { CoverageBanner } from "@/components/Coverage";
import { GroupedBars } from "@/components/charts/GroupedBars";
import { Heatmap } from "@/components/charts/Heatmap";
import { SplitLines } from "@/components/charts/SplitLines";
import { Badge } from "@/components/ui/badge";
import { Card, Empty, PageHeader, SectionTitle } from "@/components/ui/misc";
import { Segmented } from "@/components/ui/segmented";
import { engineColors, splitColor, splitLabel } from "@/lib/compare";
import { evalFor, isRealisticSplit, splitsOf } from "@/lib/evals";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function Chip({ on, onClick, color, children }: { on: boolean; onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on} className={cn("inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-field border px-2.5 text-[12.5px] font-medium shadow-input transition-colors", on ? "border-border bg-surface text-fg" : "border-border bg-sunken text-subtle")}>
      <span className="size-2.5 rounded-sm" style={{ background: on ? color : "transparent", border: `1.5px solid ${on ? color : "var(--chart-dim)"}` }} />
      {children}
    </button>
  );
}

function Panel({ title, version, note, right, children }: { title: string; version: string; note: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <SectionTitle right={right}>
        <span className="mr-2">{title}</span>
        <Badge tone="accent">eval {version}</Badge>
      </SectionTitle>
      <p className="-mt-1.5 mb-2 text-[12px] text-muted">{note}</p>
      <Card className="p-2 sm:p-3">{children}</Card>
    </section>
  );
}

export function CompareView() {
  const { runs, version } = useStore();
  const [off, setOff] = useState<Set<string>>(new Set());
  const [axis, setAxis] = useState<"0" | "50">("0");
  const [mode, setMode] = useState<"accuracy" | "error">("accuracy");
  const [lineOff, setLineOff] = useState<Set<string> | null>(null);

  const scored = useMemo(() => runs.filter((r) => evalFor(r, version)), [runs, version]);
  const unscored = runs.filter((r) => !evalFor(r, version));
  const shown = useMemo(() => scored.filter((r) => !off.has(r.config.id)), [scored, off]);
  const colors = useMemo(() => engineColors(runs), [runs]);
  const splits = useMemo(() => splitsOf(runs, version), [runs, version]);
  const min = axis === "50" ? 0.5 : 0;
  // Default lines: realistic splits only, so the chart starts readable.
  const defaultOff = useMemo(() => new Set(splits.filter((s) => !isRealisticSplit(s))), [splits]);
  const lineHidden = lineOff ?? defaultOff;
  const activeLines = splits.filter((s) => !lineHidden.has(s));
  const toggleEngine = (id: string) => setOff((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleLine = (s: string) => setLineOff((p) => { const n = new Set(p ?? defaultOff); if (n.has(s)) n.delete(s); else n.add(s); return n; });

  if (scored.length === 0) return <Empty>No engine has results on {version}</Empty>;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Compare" subtitle={`Engines side by side on eval ${version}, split by split. Every chart uses one eval version; change it with the selector above. Resolved accuracy.`} />
      <CoverageBanner />

      <div>
        <div className="mb-1.5 text-[12px] font-medium text-muted">Engines ({shown.length} of {scored.length} shown, oldest to newest)</div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Engines">
          {scored.map((r) => <Chip key={r.config.id} on={!off.has(r.config.id)} onClick={() => toggleEngine(r.config.id)} color={colors.get(r.config.id)!}>{r.config.id}</Chip>)}
        </div>
        {unscored.length > 0 && <p className="mt-2 text-[12px] text-warn">Not evaluated on {version}: {unscored.map((r) => r.config.id).join(", ")}.</p>}
      </div>

      {shown.length === 0 || splits.length === 0 ? (
        <Empty>Select at least one engine</Empty>
      ) : (
        <>
          <Panel
            title="Accuracy by split"
            version={version}
            note={`One group per split, one bar per engine, oldest on the left. ${axis === "50" ? "The axis starts at 50%." : "The axis starts at 0%."} Faded bars have under 30 rows. An orange tick marks a missing result and a red triangle marks a value below the axis. Tap a group for the numbers.`}
            right={<Segmented value={axis} onChange={setAxis} options={[{ value: "50", label: "From 50%" }, { value: "0", label: "From 0%" }]} />}
          >
            <GroupedBars runs={shown} splits={splits} version={version} colors={colors} min={min} />
          </Panel>

          <Panel
            title="Accuracy by engine generation"
            version={version}
            note={`Engines in order of engine generation, one line per split on ${version}. Lines break where an engine has no result. ${axis === "50" ? "The axis starts at 50%." : ""}`}
            right={<Segmented value={axis} onChange={setAxis} options={[{ value: "50", label: "From 50%" }, { value: "0", label: "From 0%" }]} />}
          >
            <div className="mb-3 flex flex-wrap gap-1.5 px-1">
              <button onClick={() => setLineOff(new Set())} className="h-8 cursor-pointer rounded-field border border-border px-2.5 text-[12.5px] text-muted hover:bg-hover">All splits</button>
              <button onClick={() => setLineOff(null)} className="h-8 cursor-pointer rounded-field border border-border px-2.5 text-[12.5px] text-muted hover:bg-hover">Realistic only</button>
              {splits.map((s, i) => <Chip key={s} on={!lineHidden.has(s)} onClick={() => toggleLine(s)} color={splitColor(i)}>{splitLabel(s)}</Chip>)}
            </div>
            {activeLines.length === 0 ? <Empty>Select at least one split</Empty> : <SplitLines runs={shown} allSplits={splits} active={activeLines} version={version} min={min} />}
          </Panel>

          <Panel
            title="Engines by split"
            version={version}
            note="Heatmap of the rate in each cell. Darker is better in both modes."
            right={<Segmented value={mode} onChange={setMode} options={[{ value: "accuracy", label: "Accuracy" }, { value: "error", label: "Error rate" }]} />}
          >
            <Heatmap runs={shown} splits={splits} version={version} mode={mode} />
          </Panel>
        </>
      )}
    </div>
  );
}
