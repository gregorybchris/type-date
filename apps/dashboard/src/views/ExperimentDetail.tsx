import { ArrowLeft, Bug, Play } from "lucide-react";
import { useMemo, useState } from "react";
import { Delta } from "@/components/Bars";
import { Breakdown, BreakdownLegend, MetricToggle, SMALL_N, rowsFromScores, type Metric } from "@/components/Breakdown";
import { Flow, Pct } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Dotted, Empty, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Select } from "@/components/ui/select";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { fmtBytes, fmtMs, fmtParams } from "@/lib/format";
import { benchFor, bestBench, isBaseline, PROFILES, profileOf } from "@/lib/pareto";
import { Segmented } from "@/components/ui/segmented";
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

export function ExperimentDetail({ id, params }: { id: string; params: URLSearchParams }) {
  const { runs, run: getRun } = useStore();
  const setParams = useSetParams();
  const r = getRun(id);
  const defaultCmp = r ? (r.config.parent ?? runs.filter((x) => x.config.number < r.config.number).slice(-1)[0]?.config.id ?? "") : "";
  const cmpId = params.has("compare") ? params.get("compare")! : defaultCmp;
  const cmp = cmpId ? getRun(cmpId) : undefined;
  const profile = params.get("profile") ?? "desktop";
  const [metric, setMetric] = useState<Metric>("error");

  const options = useMemo(() => runs.filter((x) => x.config.id !== id).map((x) => ({ value: x.config.id, label: x.config.id, hint: x.config.title })), [runs, id]);

  if (!r) return <Empty>No experiment {id}</Empty>;
  const ev = r.metrics.eval;
  const totalErrors = Math.round(ev.n * (1 - ev.exact));
  const b = bestBench(r, profile);
  const base = isBaseline(r);
  const dEx = cmp ? (ev.exact - cmp.metrics.eval.exact) * 100 : null;
  const dRes = cmp ? (ev.resolved - cmp.metrics.eval.resolved) * 100 : null;
  const cb = cmp ? bestBench(cmp, profile) : undefined;

  return (
    <Stagger className="flex flex-col gap-7">
      <StaggerItem>
        <a href={href("experiments")} className="mb-3 inline-flex items-center gap-1 text-[13px] text-muted hover:text-fg"><ArrowLeft className="size-3.5" /> All experiments</a>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-semibold tracking-tight">{r.config.id}</h1>
              {base && <Badge>Baseline</Badge>}
              <Badge tone="accent">{r.config.dataset}</Badge>
            </div>
            <p className="mt-0.5 text-[14px] text-fg">{r.config.title}</p>
            {r.config.notes && <p className="mt-0.5 text-[13px] text-muted">{r.config.notes}</p>}
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <span className="text-[12px] text-muted">Compare with</span>
            <Select
              className="w-full sm:w-52"
              value={cmpId}
              onChange={(v) => setParams({ compare: v || "none" })}
              options={options}
              allLabel="Nothing"
              placeholder="Nothing"
              aria-label="Comparison experiment"
            />
            <Button onClick={() => navigate(href("errors", id))}><Bug />Errors</Button>
            <Button variant="primary" onClick={() => navigate(href("playground", undefined, { exp: id }))}><Play />Playground</Button>
          </div>
        </div>
      </StaggerItem>

      <StaggerItem>
        <div className="grid grid-cols-2 gap-y-5 md:grid-cols-3 lg:grid-cols-6">
          {[
            { l: "Exact", v: <Pct value={ev.exact} className="text-[22px] font-medium" />, d: dEx !== null && <Delta value={dEx} /> },
            { l: "Resolved", v: <Pct value={ev.resolved} className="text-[22px] font-medium" />, d: dRes !== null && <Delta value={dRes} /> },
            { l: "p50 latency", v: b ? <Flow value={b.latency_ms.p50} digits={b.latency_ms.p50 < 10 ? 2 : 1} suffix=" ms" className="text-[22px] font-medium" /> : "-", d: b && cb && <Delta value={b.latency_ms.p50 - cb.latency_ms.p50} unit="ms" invert /> },
            { l: "Memory", v: b ? <Flow value={b.memory_mb} suffix=" MB" className="text-[22px] font-medium" /> : "-", d: b && cb && <Delta value={b.memory_mb - cb.memory_mb} unit="MB" invert /> },
            { l: "Download", v: <span className="num text-[22px] font-medium">{fmtBytes(b?.download_bytes ?? r.metrics.model.size_bytes)}</span>, d: null },
            { l: "Params", v: <span className="num text-[22px] font-medium">{fmtParams(r.metrics.model.params)}</span>, d: null },
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
        {cmp && <p className="mt-2 text-[12px] text-subtle">Deltas are against {cmp.config.id} ({cmp.config.title}). Accuracy deltas in percentage points.</p>}
      </StaggerItem>

      <Dotted />

      <StaggerItem className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted">Click a row to see its failures. Counts are shown in grey. Hatched bars have fewer than {SMALL_N} examples.</p>
          <MetricToggle value={metric} onChange={setMetric} />
        </div>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <section className="min-w-0">
            <SectionTitle>Primary tags</SectionTitle>
            <Breakdown rows={rowsFromScores(ev.by_tag)} compare={cmp ? rowsFromScores(cmp.metrics.eval.by_tag) : null} totalErrors={totalErrors} totalN={ev.n} metric={metric} onSelect={(t) => navigate(href("errors", id, { tag: t }))} />
          </section>
          <div className="flex min-w-0 flex-col gap-8">
            <section>
              <SectionTitle>Modifier tags</SectionTitle>
              <Breakdown rows={rowsFromScores(ev.by_modifier)} compare={cmp ? rowsFromScores(cmp.metrics.eval.by_modifier) : null} totalErrors={totalErrors} totalN={ev.n} metric={metric} onSelect={(t) => navigate(href("errors", id, { modifier: t }))} />
            </section>
            <section>
              <SectionTitle>Splits</SectionTitle>
              <Breakdown rows={rowsFromScores(ev.by_split)} compare={cmp ? rowsFromScores(cmp.metrics.eval.by_split) : null} totalErrors={totalErrors} totalN={ev.n} metric={metric} onSelect={(t) => navigate(href("errors", id, { split: t }))} />
            </section>
          </div>
        </div>
        <BreakdownLegend metric={metric} overall={totalErrors / Math.max(1, ev.n)} />
      </StaggerItem>

      <Dotted />

      <StaggerItem className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section className="min-w-0">
          <SectionTitle>Config</SectionTitle>
          <Card className="px-4 py-1">
            <KV k="Created" v={r.config.created.slice(0, 16).replace("T", " ")} />
            <KV k="Dataset" v={r.config.dataset} />
            <KV k="Format" v={r.config.format} />
            <KV k="Parent" v={r.config.parent ?? "none"} />
            {Object.entries(r.config.model).map(([k, v]) => <KV key={`m-${k}`} k={`model.${k}`} v={k === "params" ? fmtParams(Number(v)) : String(v)} />)}
            {Object.entries(r.config.train).map(([k, v]) => <KV key={`t-${k}`} k={`train.${k}`} v={String(v)} />)}
            {r.config.export && Object.entries(r.config.export).map(([k, v]) => <KV key={`e-${k}`} k={`export.${k}`} v={String(v)} />)}
            <KV k="Eval examples" v={ev.n} />
            {r.metrics.train?.seconds && <KV k="Train time" v={`${Math.round(r.metrics.train.seconds / 60)} min`} />}
            {r.metrics.train?.final_loss !== undefined && <KV k="Final loss" v={r.metrics.train.final_loss} />}
          </Card>
        </section>
        <section className="min-w-0">
          <SectionTitle right={<Segmented value={profile} onChange={(v) => setParams({ profile: v === "desktop" ? undefined : v })} options={PROFILES.map((p) => ({ value: p, label: p === "desktop" ? "Desktop" : p.replace("mobile-", "Phone ") }))} />}>Browser bench</SectionTitle>
          {benchFor(r, profile).length === 0 ? (
            <Empty>No bench results for this profile</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-[13px]">
                <thead>
                  <tr className="dotted-b text-left text-[12px] text-subtle">
                    {["Engine", "Backend", "p50", "p95", "Load", "Memory", "Download", "Acc."].map((h, i) => <th key={h} className={`px-2 py-2 font-medium ${i > 1 ? "text-right" : ""}`}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {benchFor(r, profile).map((e) => (
                    <tr key={`${e.engine}${e.backend}${profileOf(e)}`} className="border-b border-border">
                      <td className="px-2 py-2.5 font-medium">{e.engine}</td>
                      <td className="px-2 py-2.5 text-muted">{e.backend}</td>
                      <td className="num px-2 py-2.5 text-right">{fmtMs(e.latency_ms.p50)}</td>
                      <td className="num px-2 py-2.5 text-right text-muted">{fmtMs(e.latency_ms.p95)}</td>
                      <td className="num px-2 py-2.5 text-right text-muted">{Math.round(e.load_ms)} ms</td>
                      <td className="num px-2 py-2.5 text-right text-muted">{Math.round(e.memory_mb)} MB</td>
                      <td className="num px-2 py-2.5 text-right text-muted">{fmtBytes(e.download_bytes)}</td>
                      <td className="num px-2 py-2.5 text-right text-muted">{e.browser_accuracy !== undefined ? `${(e.browser_accuracy * 100).toFixed(1)}%` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </StaggerItem>
    </Stagger>
  );
}
