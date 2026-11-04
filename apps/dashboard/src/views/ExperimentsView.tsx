import { m } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Flow, Pct } from "@/components/Num";
import { ProgressChart } from "@/components/charts/ProgressChart";
import { Sparkline } from "@/components/Sparkline";
import { Badge } from "@/components/ui/badge";
import { Input, PageHeader, SectionTitle, StatLabel, Card, Empty } from "@/components/ui/misc";
import { itemVariants, listVariants } from "@/components/ui/motion";
import { Segmented } from "@/components/ui/segmented";
import { fmtBytes, fmtParams } from "@/lib/format";
import { bestBench, isBaseline } from "@/lib/pareto";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Filter = "all" | "models" | "baselines";

export function ExperimentsView() {
  const { runs } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const stats = useMemo(() => {
    const models = runs.filter((r) => !isBaseline(r));
    const best = [...runs].sort((a, b) => b.metrics.eval.exact - a.metrics.eval.exact)[0];
    const fastest = Math.min(...runs.map((r) => bestBench(r)?.latency_ms.p50 ?? Infinity));
    const smallest = Math.min(...models.map((r) => r.metrics.model.size_bytes));
    return { best, fastest, smallest, count: runs.length };
  }, [runs]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return runs.filter((r) => {
      if (filter === "models" && isBaseline(r)) return false;
      if (filter === "baselines" && !isBaseline(r)) return false;
      return !needle || `${r.config.id} ${r.config.title} ${r.config.model.family} ${r.config.dataset}`.toLowerCase().includes(needle);
    });
  }, [runs, filter, q]);

  const trend = useMemo(() => runs.map((r) => r.metrics.eval.exact), [runs]);

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Experiments" subtitle="Accuracy, speed and size for every run, ordered by experiment number." />

      <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
        <Stat label="Best exact">{stats.best && <Pct value={stats.best.metrics.eval.exact} className="text-[22px] font-medium" />}<div className="text-[12px] text-muted">{stats.best?.config.id}</div></Stat>
        <Stat label="Experiments"><Flow value={stats.count} className="text-[22px] font-medium" /><div className="text-[12px] text-muted">{runs.filter(isBaseline).length} baselines</div></Stat>
        <Stat label="Fastest p50">{Number.isFinite(stats.fastest) && <Flow value={stats.fastest} digits={2} suffix=" ms" className="text-[22px] font-medium" />}<div className="text-[12px] text-muted">best bench entry</div></Stat>
        <Stat label="Smallest model" last><span className="num text-[22px] font-medium">{Number.isFinite(stats.smallest) ? fmtBytes(stats.smallest) : "-"}</span><div className="text-[12px] text-muted">download, excl. baselines</div></Stat>
      </div>

      <div className="dotted-t" />

      <section>
        <SectionTitle right={<span className="text-[12px] text-subtle">Best exact accuracy so far. Diamonds are baselines.</span>}>Progress over time</SectionTitle>
        <Card className="p-3">
          <ProgressChart runs={runs} onOpen={(id) => navigate(href("experiments", id))} />
        </Card>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <Segmented<Filter>
            value={filter}
            onChange={setFilter}
            options={[{ value: "all", label: "All" }, { value: "models", label: "Models" }, { value: "baselines", label: "Baselines" }]}
          />
          <div className="relative w-64">
            <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" />
            <Input className="pl-8" placeholder="Search experiments" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] border-collapse text-[13px]">
            <thead>
              <tr className="dotted-b text-left text-[12px] font-medium text-subtle">
                {["Exp", "Title", "Data", "Family", "Params", "Size", "Exact", "Resolved", "p50", "Memory", "Trend"].map((h, i) => (
                  <th key={h} className={cn("whitespace-nowrap px-2 py-2.5 font-medium", i >= 4 && i <= 9 && "text-right")}>{h}</th>
                ))}
              </tr>
            </thead>
            <m.tbody variants={listVariants} initial="hidden" animate="show" key={`${filter}${q}`}>
              {rows.map((r) => {
                const b = bestBench(r);
                const base = isBaseline(r);
                const isBest = stats.best?.config.id === r.config.id;
                const series = runs.filter((x) => x.config.number <= r.config.number).slice(-8).map((x) => x.metrics.eval.exact);
                return (
                  <m.tr
                    key={r.config.id}
                    variants={itemVariants}
                    tabIndex={0}
                    onClick={() => navigate(href("experiments", r.config.id))}
                    onKeyDown={(e) => e.key === "Enter" && navigate(href("experiments", r.config.id))}
                    className="group cursor-pointer border-b border-border transition-colors hover:bg-hover/70 focus-visible:bg-hover/70"
                  >
                    <td className="num whitespace-nowrap px-2 py-3 font-medium text-fg">{r.config.id}</td>
                    <td className="max-w-[240px] px-2 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-medium text-fg">{r.config.title}</span>
                        {isBest && <Badge tone="accent">Best</Badge>}
                        {base && <Badge>Baseline</Badge>}
                      </div>
                    </td>
                    <td className="num px-2 py-3 text-muted">{r.config.dataset}</td>
                    <td className="whitespace-nowrap px-2 py-3 text-muted">{r.config.model.family}</td>
                    <td className="num px-2 py-3 text-right text-muted">{fmtParams(r.metrics.model.params)}</td>
                    <td className="num whitespace-nowrap px-2 py-3 text-right text-muted">{fmtBytes(b?.download_bytes ?? r.metrics.model.size_bytes)}</td>
                    <td className="px-2 py-3 text-right font-medium"><Pct value={r.metrics.eval.exact} /></td>
                    <td className="px-2 py-3 text-right text-muted"><Pct value={r.metrics.eval.resolved} /></td>
                    <td className="px-2 py-3 text-right text-muted">{b ? <Flow value={b.latency_ms.p50} digits={b.latency_ms.p50 < 10 ? 2 : 1} suffix=" ms" /> : "-"}</td>
                    <td className="px-2 py-3 text-right text-muted">{b ? <Flow value={b.memory_mb} digits={0} suffix=" MB" /> : "-"}</td>
                    <td className="px-2 py-2"><Sparkline values={series.length ? series : trend} /></td>
                  </m.tr>
                );
              })}
            </m.tbody>
          </table>
          {rows.length === 0 && <Empty>No experiments match</Empty>}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className="pr-4 md:[&:not(:first-child)]:pl-5" style={!last ? { borderRight: "1px dotted var(--dotted)" } : undefined}>
      <StatLabel>{label}</StatLabel>
      <div className="mt-1">{children}</div>
    </div>
  );
}
