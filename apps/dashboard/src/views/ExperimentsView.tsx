import { m } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CoverageBanner, CoverageMatrix } from "@/components/Coverage";
import { Flow, Pct } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Card, Empty, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { itemVariants, listVariants } from "@/components/ui/motion";
import { evalFor, fullVersions, notEvaluatedNote, realisticResolved } from "@/lib/evals";
import { fmtBytes, fmtMs } from "@/lib/format";
import { benchOf, isLibrary } from "@/lib/pareto";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";
import type { Run } from "@/lib/types";
import { cn } from "@/lib/utils";

const pc = (x: number) => (x * 100).toFixed(1);

export function ExperimentsView() {
  const { runs, version } = useStore();
  const [q, setQ] = useState("");
  const versions = useMemo(() => fullVersions(runs), [runs]);

  const scored = useMemo(() => runs.map((run) => ({ run, ev: evalFor(run, version) })), [runs, version]);
  const stats = useMemo(() => {
    const ok = scored.filter((s) => s.ev);
    const best = [...ok].sort((a, b) => b.ev!.resolved - a.ev!.resolved)[0];
    const fastest = Math.min(...runs.map((r) => benchOf(r)?.latency_ms.p50 ?? Infinity));
    const smallest = Math.min(...runs.map((r) => r.metrics.model.size_bytes));
    return { best, fastest, smallest, evaluated: ok.length, count: runs.length };
  }, [scored, runs]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return scored.filter(({ run: r }) => !needle || `${r.config.id} ${r.config.title} ${r.config.description ?? ""}`.toLowerCase().includes(needle));
  }, [scored, q]);

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Experiments" subtitle={`One row per engine. Resolved accuracy on every full eval version; the selected version (${version}) is highlighted. Realistic means the external and public splits.`} />
      <CoverageBanner />

      <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
        <Stat label={`Best resolved (${version})`}>{stats.best ? <><Pct value={stats.best.ev!.resolved} className="text-[22px] font-medium" /><div className="truncate text-[12px] text-muted">{stats.best.run.config.id} {stats.best.run.config.title}</div></> : <span className="text-[22px] text-subtle">-</span>}</Stat>
        <Stat label="Engines"><Flow value={stats.count} className="text-[22px] font-medium" /><div className="text-[12px] text-muted">{stats.evaluated} evaluated on {version}</div></Stat>
        <Stat label="Fastest p50">{Number.isFinite(stats.fastest) ? <span className="num text-[22px] font-medium">{fmtMs(stats.fastest)}</span> : <span className="text-[22px] text-subtle">-</span>}<div className="text-[12px] text-muted">desktop bench</div></Stat>
        <Stat label="Smallest" last><span className="num text-[22px] font-medium">{Number.isFinite(stats.smallest) ? fmtBytes(stats.smallest) : "-"}</span><div className="text-[12px] text-muted">gzip source size</div></Stat>
      </div>

      <div className="dotted-t" />

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted">Resolved accuracy in percent. A dash means the engine has no results on that eval version.</p>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" />
            <Input className="pl-8" placeholder="Search engines" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[900px] border-collapse text-[13px]">
            <thead>
              <tr className="dotted-b text-left text-[12px] font-medium text-subtle">
                <th className="px-2 py-2.5 font-medium">Exp</th>
                <th className="px-2 py-2.5 font-medium">Engine</th>
                <th className="px-2 py-2.5 text-right font-medium">Gzip</th>
                <th className="px-2 py-2.5 text-right font-medium">p50</th>
                <th className="px-2 py-2.5 text-right font-medium">p95</th>
                <th className="whitespace-nowrap px-2 py-2.5 text-right font-medium text-accent">Realistic {version}</th>
                {versions.map((v) => (
                  <th key={v} className={cn("px-1.5 py-2.5 text-right font-medium", v === version && "bg-accent-soft/60 text-accent")}>{v}</th>
                ))}
              </tr>
            </thead>
            <m.tbody variants={listVariants} initial="hidden" animate="show" key={`${q}${version}`}>
              {rows.map(({ run: r, ev }) => {
                const b = benchOf(r);
                const isBest = stats.best?.run.config.id === r.config.id;
                return (
                  <m.tr
                    key={r.config.id}
                    variants={itemVariants}
                    tabIndex={0}
                    onClick={() => navigate(href("experiments", r.config.id))}
                    onKeyDown={(e) => e.key === "Enter" && navigate(href("experiments", r.config.id))}
                    className={cn("group cursor-pointer border-b border-border transition-colors hover:bg-hover/70 focus-visible:bg-hover/70")}
                  >
                    <td className="num whitespace-nowrap px-2 py-3 align-top font-medium text-fg">{r.config.id}</td>
                    <td className="max-w-[250px] px-2 py-2.5" title={r.config.description}>
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-medium text-fg">{r.config.title}</span>
                        {isBest && <Badge tone="accent">Best</Badge>}
                        {isLibrary(r) && <Badge>Library</Badge>}
                      </div>
                      {ev ? r.config.description && <div className="truncate text-[12px] text-muted">{r.config.description}</div> : <div className="truncate text-[12px] text-warn">{notEvaluatedNote(r, version)}</div>}
                    </td>
                    <td className="num whitespace-nowrap px-2 py-3 text-right align-top text-muted">{fmtBytes(r.metrics.model.size_bytes)}</td>
                    <td className="num whitespace-nowrap px-2 py-3 text-right align-top text-muted">{b ? fmtMs(b.latency_ms.p50) : <span title="No latency bench for this engine">-</span>}</td>
                    <td className="num whitespace-nowrap px-2 py-3 text-right align-top text-muted">{b ? fmtMs(b.latency_ms.p95) : "-"}</td>
                    <td className="num px-2 py-3 text-right align-top font-medium text-accent">{ev && realisticResolved(ev) !== null ? `${pc(realisticResolved(ev)!)}%` : <span className="text-subtle" title="No realistic split scored on this version">-</span>}</td>
                    {versions.map((v) => {
                      const e = evalFor(r, v);
                      return (
                        <td key={v} className={cn("num px-1.5 py-3 text-right align-top", v === version && "bg-accent-soft/60 font-semibold text-fg", v !== version && "text-muted")} title={e ? `${v}: ${e.n.toLocaleString()} rows` : `${r.config.title} has no results on ${v}`}>
                          {e ? pc(e.resolved) : <span className="text-subtle">-</span>}
                        </td>
                      );
                    })}
                  </m.tr>
                );
              })}
            </m.tbody>
          </table>
          {rows.length === 0 && <Empty>No engines match</Empty>}
        </div>
        <div className="flex flex-col gap-2 lg:hidden">
          {rows.map(({ run: r, ev }) => <RunCard key={r.config.id} r={r} ev={ev} version={version} versions={versions} best={stats.best?.run.config.id === r.config.id} />)}
          {rows.length === 0 && <Empty>No engines match</Empty>}
        </div>
      </section>

      <div className="dotted-t" />

      <section>
        <SectionTitle>Coverage</SectionTitle>
        <Card className="p-3"><CoverageMatrix /></Card>
      </section>
    </div>
  );
}

function RunCard({ r, ev, version, versions, best }: { r: Run; ev: ReturnType<typeof evalFor>; version: string; versions: string[]; best: boolean }) {
  const b = benchOf(r);
  return (
    <a href={href("experiments", r.config.id)} className={cn("block rounded-card border border-border bg-surface p-3 shadow-input active:bg-hover", !ev && "opacity-80")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="num text-[13px] font-semibold">{r.config.id}</span>
            {isLibrary(r) && <Badge>Library</Badge>}
            {best && <Badge tone="accent">Best</Badge>}
          </div>
          <div className="mt-0.5 text-[13px] font-medium text-fg">{r.config.title}</div>
          {ev ? (
            r.config.description && <div className="mt-0.5 line-clamp-2 text-[12px] text-muted">{r.config.description}</div>
          ) : (
            <div className="mt-0.5 text-[12px] text-warn">{notEvaluatedNote(r, version)}</div>
          )}
        </div>
        {ev && (
          <div className="shrink-0 text-right">
            <Pct value={ev.resolved} className="text-[18px] font-medium" />
            <div className="text-[11px] text-subtle">resolved {version}</div>
          </div>
        )}
      </div>
      <div className="dotted-t mt-2.5 grid grid-cols-3 gap-2 pt-2.5 text-[12px]">
        <div><div className="text-subtle">Realistic {version}</div><div className="num font-medium text-accent">{realisticResolved(ev) !== null ? `${pc(realisticResolved(ev)!)}%` : "-"}</div></div>
        <div><div className="text-subtle">p50</div><div className="num font-medium">{b ? fmtMs(b.latency_ms.p50) : "-"}</div></div>
        <div><div className="text-subtle">Gzip</div><div className="num font-medium">{fmtBytes(r.metrics.model.size_bytes)}</div></div>
      </div>
      <div className="dotted-t mt-2.5 flex gap-1 overflow-x-auto pt-2.5 text-[11.5px]">
        {versions.map((v) => {
          const e = evalFor(r, v);
          return (
            <div key={v} className={cn("min-w-[52px] rounded-chip border px-1.5 py-1 text-center", v === version ? "border-accent/40 bg-accent-soft" : "border-border")}>
              <div className="text-subtle">{v}</div>
              <div className="num font-medium">{e ? pc(e.resolved) : "-"}</div>
            </div>
          );
        })}
      </div>
    </a>
  );
}

function Stat({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("min-w-0 pr-4 md:[&:not(:first-child)]:pl-5", !last && "sep-md", "max-md:even:pl-4")}>
      <StatLabel>{label}</StatLabel>
      <div className="mt-1">{children}</div>
    </div>
  );
}
