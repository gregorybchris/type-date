import { m } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CoverageBanner } from "@/components/Coverage";
import { FamilyChips, useToggleSet } from "@/components/FamilyChips";
import { Flow, Pct } from "@/components/Num";
import { ProgressChart } from "@/components/charts/ProgressChart";
import { Sparkline } from "@/components/Sparkline";
import { Badge } from "@/components/ui/badge";
import { Card, Empty, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { itemVariants, listVariants } from "@/components/ui/motion";
import { evalFor, isInvalidVersion, notEvaluatedNote, ownVersion, realisticResolved } from "@/lib/evals";
import { fmtBytes, fmtParams } from "@/lib/format";
import { bestBench, familyOf, isBaseline } from "@/lib/pareto";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";
import type { Run } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ExperimentsView() {
  const { runs, version } = useStore();
  const [off, toggle] = useToggleSet();
  const [q, setQ] = useState("");

  const scored = useMemo(() => runs.map((run) => ({ run, ev: evalFor(run, version) })), [runs, version]);
  const stats = useMemo(() => {
    const ok = scored.filter((s) => s.ev);
    const best = [...ok].sort((a, b) => b.ev!.resolved - a.ev!.resolved)[0];
    const fastest = Math.min(...runs.map((r) => bestBench(r)?.latency_ms.p50 ?? Infinity));
    const smallest = Math.min(...runs.filter((r) => !isBaseline(r)).map((r) => r.metrics.model.size_bytes));
    return { best, fastest, smallest, evaluated: ok.length, count: runs.length };
  }, [scored, runs]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return scored.filter(({ run: r }) => {
      if (off.has(familyOf(r))) return false;
      return !needle || `${r.config.id} ${r.config.title} ${r.config.description ?? ""} ${r.config.model.family} ${r.config.dataset}`.toLowerCase().includes(needle);
    });
  }, [scored, off, q]);

  const history = useMemo(() => scored.filter((s) => s.ev), [scored]);

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Experiments" subtitle={`Accuracy, speed and size for every run on eval ${version}. Realistic means the external and public splits.`} />
      <CoverageBanner />

      <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
        <Stat label={`Best resolved (${version})`}>{stats.best ? <><Pct value={stats.best.ev!.resolved} className="text-[22px] font-medium" /><div className="truncate text-[12px] text-muted">{stats.best.run.config.id} {stats.best.run.config.title}</div></> : <span className="text-[22px] text-subtle">-</span>}</Stat>
        <Stat label="Experiments"><Flow value={stats.count} className="text-[22px] font-medium" /><div className="text-[12px] text-muted">{stats.evaluated} evaluated on {version}</div></Stat>
        <Stat label="Fastest p50">{Number.isFinite(stats.fastest) && <Flow value={stats.fastest} digits={2} suffix=" ms" className="text-[22px] font-medium" />}<div className="text-[12px] text-muted">best bench entry</div></Stat>
        <Stat label="Smallest model" last><span className="num text-[22px] font-medium">{Number.isFinite(stats.smallest) ? fmtBytes(stats.smallest) : "-"}</span><div className="text-[12px] text-muted">download, excl. baselines</div></Stat>
      </div>

      <div className="dotted-t" />

      <section>
        <SectionTitle right={<span className="hidden text-[12px] text-subtle sm:inline">Best resolved accuracy on {version} so far. Diamonds are baselines.</span>}>Progress over time</SectionTitle>
        <Card className="p-3">
          <ProgressChart runs={runs} version={version} onOpen={(id) => navigate(href("experiments", id))} />
        </Card>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <FamilyChips runs={runs} off={off} onToggle={toggle} />
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" />
            <Input className="pl-8" placeholder="Search experiments" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1040px] border-collapse text-[13px]">
            <thead>
              <tr className="dotted-b text-left text-[12px] font-medium text-subtle">
                {["Exp", "Title", "Family", "Params", "Size", "Resolved, all", "Resolved, realistic", "p50", "Memory", "Trend"].map((h, i) => (
                  <th key={h} className={cn("whitespace-nowrap px-2 py-2.5 font-medium", i >= 3 && i <= 8 && "text-right", i === 6 && "text-accent")}>{h}</th>
                ))}
              </tr>
            </thead>
            <m.tbody variants={listVariants} initial="hidden" animate="show" key={`${[...off].join()}${q}${version}`}>
              {rows.map(({ run: r, ev }) => {
                const b = bestBench(r);
                const isBest = stats.best?.run.config.id === r.config.id;
                const series = history.filter((x) => x.run.config.number <= r.config.number).slice(-8).map((x) => x.ev!.resolved);
                const note = ev ? null : notEvaluatedNote(r, version);
                return (
                  <m.tr
                    key={r.config.id}
                    variants={itemVariants}
                    tabIndex={0}
                    onClick={() => navigate(href("experiments", r.config.id))}
                    onKeyDown={(e) => e.key === "Enter" && navigate(href("experiments", r.config.id))}
                    className={cn("group cursor-pointer border-b border-border transition-colors hover:bg-hover/70 focus-visible:bg-hover/70", !ev && "[&>td]:opacity-45")}
                  >
                    <td className="num whitespace-nowrap px-2 py-3 align-top font-medium text-fg">{r.config.id}</td>
                    <td className="max-w-[380px] px-2 py-2.5" title={r.config.description}>
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-medium text-fg">{r.config.title}</span>
                        {isBest && <Badge tone="accent">Best</Badge>}
                        {isBaseline(r) && <Badge>Baseline</Badge>}
                      </div>
                      {note ? <div className="truncate text-[12px] text-warn">{note}</div> : r.config.description && <div className="truncate text-[12px] text-muted">{r.config.description}</div>}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 align-top text-muted">{familyOf(r)}</td>
                    <td className="num px-2 py-3 text-right align-top text-muted">{fmtParams(r.metrics.model.params)}</td>
                    <td className="num whitespace-nowrap px-2 py-3 text-right align-top text-muted">{fmtBytes(b?.download_bytes ?? r.metrics.model.size_bytes)}</td>
                    <td className="px-2 py-3 text-right align-top font-medium">{ev ? <Pct value={ev.resolved} /> : <span className="text-subtle">-</span>}</td>
                    <td className="px-2 py-3 text-right align-top font-medium text-accent">{ev && realisticResolved(ev) !== null ? <Pct value={realisticResolved(ev)!} /> : <span className="text-subtle" title="No realistic split scored on this version">-</span>}</td>
                    <td className="px-2 py-3 text-right align-top text-muted">{b ? <Flow value={b.latency_ms.p50} digits={b.latency_ms.p50 < 10 ? 2 : 1} suffix=" ms" /> : "-"}</td>
                    <td className="px-2 py-3 text-right align-top text-muted">{b ? <Flow value={b.memory_mb} digits={0} suffix=" MB" /> : "-"}</td>
                    <td className="px-2 py-2 align-top">{ev && <Sparkline values={series} />}</td>
                  </m.tr>
                );
              })}
            </m.tbody>
          </table>
          {rows.length === 0 && <Empty>No experiments match</Empty>}
        </div>
        <div className="flex flex-col gap-2 lg:hidden">
          {rows.map(({ run: r, ev }) => <RunCard key={r.config.id} r={r} ev={ev} version={version} best={stats.best?.run.config.id === r.config.id} />)}
          {rows.length === 0 && <Empty>No experiments match</Empty>}
        </div>
      </section>
    </div>
  );
}

function RunCard({ r, ev, version, best }: { r: Run; ev: ReturnType<typeof evalFor>; version: string; best: boolean }) {
  const b = bestBench(r);
  const invalid = isInvalidVersion(ownVersion(r));
  return (
    <a href={href("experiments", r.config.id)} className={cn("block rounded-card border border-border bg-surface p-3 shadow-input active:bg-hover", !ev && "opacity-60")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="num text-[13px] font-semibold">{r.config.id}</span>
            {isBaseline(r) && <Badge>Baseline</Badge>}
            {best && <Badge tone="accent">Best</Badge>}
            {invalid && <Badge tone="danger">Invalid</Badge>}
          </div>
          <div className="mt-0.5 text-[13px] font-medium text-fg">{r.config.title}</div>
          {ev ? (
            r.config.description && <div className="mt-0.5 line-clamp-2 text-[12px] text-muted" title={r.config.description}>{r.config.description}</div>
          ) : (
            <div className="mt-0.5 text-[12px] text-warn">{notEvaluatedNote(r, version)}</div>
          )}
          <div className="mt-1 text-[12px] text-subtle">{familyOf(r)} / {fmtParams(r.metrics.model.params)}</div>
        </div>
        {ev && (
          <div className="shrink-0 text-right">
            <Pct value={ev.resolved} className="text-[18px] font-medium" />
            <div className="text-[11px] text-subtle">resolved {version}</div>
          </div>
        )}
      </div>
      <div className="dotted-t mt-2.5 grid grid-cols-4 gap-2 pt-2.5 text-[12px]">
        <div><div className="text-subtle">Realistic</div><div className="num font-medium text-accent">{realisticResolved(ev) !== null ? `${(realisticResolved(ev)! * 100).toFixed(1)}%` : "-"}</div></div>
        <div><div className="text-subtle">p50</div><div className="num font-medium">{b ? `${b.latency_ms.p50.toFixed(b.latency_ms.p50 < 10 ? 2 : 1)} ms` : "-"}</div></div>
        <div><div className="text-subtle">Memory</div><div className="num font-medium">{b ? `${Math.round(b.memory_mb)} MB` : "-"}</div></div>
        <div><div className="text-subtle">Size</div><div className="num font-medium">{fmtBytes(b?.download_bytes ?? r.metrics.model.size_bytes)}</div></div>
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
