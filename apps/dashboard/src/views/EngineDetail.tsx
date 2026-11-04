import { ArrowLeft, Bug, Play } from "lucide-react";
import { useMemo, useState } from "react";
import { SplitBars } from "@/components/SplitBars";
import { evalFor, hardResolved, notEvaluatedNote, ownVersion, realisticResolved } from "@/lib/evals";
import { Delta } from "@/components/Bars";
import { Breakdown, BreakdownLegend, MetricToggle, rowsFromScores, type Metric } from "@/components/Breakdown";
import { Pct } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Dotted, Empty, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Select } from "@/components/ui/select";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { fmtBytes, fmtMs } from "@/lib/format";
import { benchOf, isLibrary } from "@/lib/pareto";
import { href, navigate, useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="dotted-b flex items-baseline justify-between gap-4 py-2 last:border-0 last:[border-bottom-style:none]">
      <span className="text-[13px] text-muted">{k}</span>
      <span className="num truncate text-right text-[13px] text-fg">{v}</span>
    </div>
  );
}

export function EngineDetail({ id, params }: { id: string; params: URLSearchParams }) {
  const { runs, run: getRun, version } = useStore();
  const setParams = useSetParams();
  const r = getRun(id);
  const defaultCmp = r ? (runs[runs.findIndex((x) => x.config.id === id) - 1]?.config.id ?? "") : "";
  const cmpId = params.has("compare") ? params.get("compare")! : defaultCmp;
  const sel = r ? evalFor(r, version) : null;
  const evVersion = sel ? version : r ? ownVersion(r) : version;
  const cmpRun = cmpId ? getRun(cmpId) : undefined;
  const cev = cmpRun ? evalFor(cmpRun, evVersion) : null;
  const cmp = cev ? cmpRun : undefined;
  const [metric, setMetric] = useState<Metric>("error");

  const options = useMemo(() => runs.filter((x) => x.config.id !== id && evalFor(x, evVersion)).map((x) => ({ value: x.config.id, label: x.config.id })), [runs, id, evVersion]);

  if (!r) return <Empty>No engine {id}</Empty>;
  const ev = sel ?? r.metrics.eval;
  const totalErrors = Math.round(ev.n * (1 - ev.exact));
  const b = benchOf(r);
  const dEx = cmp ? (ev.exact - cev!.exact) * 100 : null;
  const real = realisticResolved(ev);
  const dReal = cmp && real !== null && realisticResolved(cev) !== null ? (real - realisticResolved(cev)!) * 100 : null;
  const dRes = cmp ? (ev.resolved - cev!.resolved) * 100 : null;
  const cb = cmp ? benchOf(cmp) : undefined;

  return (
    <Stagger className="flex flex-col gap-7">
      <StaggerItem>
        <a href={href("engines")} className="mb-3 inline-flex items-center gap-1 text-[13px] text-muted hover:text-fg"><ArrowLeft className="size-3.5" /> All engines</a>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-semibold tracking-tight">{r.config.id}</h1>
              {isLibrary(r) && <Badge>Library</Badge>}
              <Badge tone="accent">eval {evVersion}</Badge>
            </div>
            {r.config.description && <p className="mt-1 max-w-[62ch] text-[13px] leading-5 text-muted">{r.config.description}</p>}
            {!sel && (
              <p className="mt-2 inline-block rounded-field border border-warn/30 bg-warn-soft px-2.5 py-1.5 text-[12.5px] text-warn">
                {notEvaluatedNote(r, version).replace(/\.$/, "")}. Showing {evVersion} results below.
              </p>
            )}
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <span className="text-[12px] text-muted">Compare with</span>
            <Select
              className="w-full sm:w-52"
              value={cmp ? cmpId : ""}
              onChange={(v) => setParams({ compare: v || "none" })}
              options={options}
              allLabel="Nothing"
              placeholder="Nothing"
              aria-label="Comparison engine"
            />
            <Button onClick={() => navigate(href("errors", id))}><Bug />Errors</Button>
            <Button variant="primary" onClick={() => navigate(href("playground", undefined, { engine: id }))}><Play />Playground</Button>
          </div>
        </div>
      </StaggerItem>

      <StaggerItem>
        <div className="grid grid-cols-2 gap-y-5 md:grid-cols-3 lg:grid-cols-6">
          {[
            { l: `Resolved, ${evVersion}`, v: <Pct value={ev.resolved} className="text-[22px] font-medium" />, d: dRes !== null && <Delta value={dRes} /> },
            { l: `Realistic, ${evVersion}`, v: real !== null ? <Pct value={real} className="text-[22px] font-medium text-accent" /> : <span className="text-[22px] text-subtle" title="No realistic split on this version">-</span>, d: dReal !== null && <Delta value={dReal} /> },
            { l: `Hard, ${evVersion}`, v: hardResolved(ev) !== null ? <Pct value={hardResolved(ev)!} className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle" title="No hard split on this version">-</span>, d: null },
            { l: `Exact, ${evVersion}`, v: <Pct value={ev.exact} className="text-[22px] font-medium" />, d: dEx !== null && <Delta value={dEx} /> },
            { l: "Latency p50 / p95", v: b ? <span className="num text-[22px] font-medium">{fmtMs(b.latency_ms.p50)}<span className="text-[13px] text-muted"> / {fmtMs(b.latency_ms.p95)}</span></span> : <span className="text-[22px] text-subtle" title="No latency data">-</span>, d: b && cb && <Delta value={b.latency_ms.p50 - cb.latency_ms.p50} unit="ms" invert /> },
            { l: "Gzip size", v: <span className="num text-[22px] font-medium">{fmtBytes(r.metrics.model.size_bytes)}</span>, d: cmp && <Delta value={(r.metrics.model.size_bytes - cmp.metrics.model.size_bytes) / 1e3} unit="kB" invert /> },
          ].map((s, i) => (
            <div key={s.l} className={i < 5 ? "pr-4 sep-lg" : "pr-4"}>
              <div className={i > 0 ? "pl-0 lg:pl-4" : ""}>
                <StatLabel>{s.l}</StatLabel>
                <div className="mt-1">{s.v}</div>
                <div className="h-4">{s.d || null}</div>
              </div>
            </div>
          ))}
        </div>
        {cmp && <p className="mt-2 text-[12px] text-subtle">Deltas are against {cmp.config.id}, both on eval {evVersion}. Accuracy deltas in percentage points.</p>}
      </StaggerItem>

      <Dotted />

      <StaggerItem>
        <SectionTitle right={<span className="hidden text-[12px] text-subtle sm:inline">Resolved accuracy on {evVersion}</span>}>Accuracy by split</SectionTitle>
        <SplitBars scores={ev.by_split} compare={cmp ? cev!.by_split : null} />
        <p className="mt-2 px-1 text-[11.5px] leading-4 text-subtle">Realistic splits (names containing "external" or "public") are the closest to real use. The other splits are generated and easier.</p>
      </StaggerItem>

      <Dotted />

      <StaggerItem className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted">Click a row to see its failures. Counts are shown in grey. Whiskers show the 95% interval, so groups with few examples have wide whiskers.</p>
          <MetricToggle value={metric} onChange={setMetric} />
        </div>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <section className="min-w-0">
            <SectionTitle>Families (primary tag)</SectionTitle>
            <Breakdown rows={rowsFromScores(ev.by_tag)} compare={cmp ? rowsFromScores(cev!.by_tag) : null} totalErrors={totalErrors} totalN={ev.n} metric={metric} onSelect={(t) => navigate(href("errors", id, { tag: t }))} />
          </section>
          <div className="flex min-w-0 flex-col gap-8">
            <section>
              <SectionTitle>Modifier tags</SectionTitle>
              <Breakdown rows={rowsFromScores(ev.by_modifier)} compare={cmp ? rowsFromScores(cev!.by_modifier) : null} totalErrors={totalErrors} totalN={ev.n} metric={metric} onSelect={(t) => navigate(href("errors", id, { modifier: t }))} />
            </section>

          </div>
        </div>
        <BreakdownLegend metric={metric} overall={totalErrors / Math.max(1, ev.n)} />
      </StaggerItem>

      <Dotted />

      <StaggerItem>
        <SectionTitle>Config</SectionTitle>
        <Card className="px-4 py-1">
          <KV k="Created" v={r.config.created.slice(0, 16).replace("T", " ")} />
                    <KV k="Gzip size" v={fmtBytes(r.metrics.model.size_bytes)} />
          {r.metrics.model.size_bytes_minified !== undefined && <KV k="Minified size" v={fmtBytes(r.metrics.model.size_bytes_minified)} />}
          {r.metrics.model.size_bytes_lazy !== undefined && <KV k="Gzip size of lazy part" v={fmtBytes(r.metrics.model.size_bytes_lazy)} />}
          {b && <KV k="Latency p99" v={fmtMs(b.latency_ms.p99)} />}
          {b && <KV k="Latency calls timed" v={b.n} />}
          <KV k={`Eval examples (${evVersion})`} v={ev.n.toLocaleString()} />
        </Card>
      </StaggerItem>
    </Stagger>
  );
}
