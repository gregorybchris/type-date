import { m } from "motion/react";
import { useMemo, useState } from "react";
import { BucketRows, StackBar } from "@/components/TimeCard";
import { Flow } from "@/components/Num";
import { Card, Empty, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Segmented } from "@/components/ui/segmented";
import { BUCKETS, biggest, bucketSeconds, emptySeconds, fmtDur, gaps, sumSeconds, type Seconds } from "@/lib/timing";
import { href, navigate } from "@/lib/router";
import { useStore } from "@/lib/store";

type Mode = "percent" | "seconds";

export function OuterLoopView() {
  const { runs } = useStore();
  const [mode, setMode] = useState<Mode>("percent");

  const rows = useMemo(
    () => runs.filter((r) => r.timing).map((r) => ({ id: r.config.id, title: r.config.title, seconds: bucketSeconds(r.timing) })),
    [runs],
  );
  const totals = useMemo(() => {
    const t: Seconds = emptySeconds();
    for (const r of rows) for (const b of BUCKETS) t[b.key] += r.seconds[b.key];
    return t;
  }, [rows]);
  const automated = sumSeconds(totals);
  const big = biggest(totals);
  const bigInfo = BUCKETS.find((b) => b.key === big);
  const maxTotal = Math.max(1, ...rows.map((r) => sumSeconds(r.seconds)));
  const gapList = useMemo(() => gaps(runs), [runs]);
  const idle = gapList.reduce((s, g) => s + g.idleS, 0);
  const trained = gapList.reduce((s, g) => s + g.nextTrainS, 0);
  const idleShare = idle + trained > 0 ? idle / (idle + trained) : 0;
  const maxGap = Math.max(1, ...gapList.map((g) => g.idleS));
  const longest = [...gapList].sort((a, b) => b.idleS - a.idleS)[0];

  if (rows.length === 0) return <Empty>No timing.json found in any run</Empty>;

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Outer loop" subtitle="Where wall time goes across experiments, and how long the loop sits idle between them." />

      <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
        <Stat label="Automated time" first><span className="num text-[22px] font-medium">{fmtDur(automated)}</span><div className="text-[12px] text-muted">{rows.length} timed experiments</div></Stat>
        <Stat label="Biggest bucket">{bigInfo ? <><Flow value={(totals[bigInfo.key] / automated) * 100} digits={1} suffix="%" className="text-[22px] font-medium" /><div className="text-[12px] text-muted">{bigInfo.label}, {fmtDur(totals[bigInfo.key])}</div></> : "-"}</Stat>
        <Stat label="Idle between runs">{gapList.length ? <><Flow value={idleShare * 100} digits={1} suffix="%" className="text-[22px] font-medium" /><div className="text-[12px] text-muted">{fmtDur(idle)} of wall clock</div></> : <span className="text-[22px] text-subtle">-</span>}</Stat>
        <Stat label="Longest idle gap" last>{longest ? <><span className="num text-[22px] font-medium">{fmtDur(longest.idleS)}</span><div className="text-[12px] text-muted">{longest.from} to {longest.to}</div></> : <span className="text-[22px] text-subtle">-</span>}</Stat>
      </div>

      <div className="dotted-t" />

      <section>
        <SectionTitle>Total by bucket</SectionTitle>
        <Card className="p-4">
          <StackBar seconds={totals} scale={automated} highlight={big} height={16} />
          <div className="mt-3"><BucketRows seconds={totals} big={big} /></div>
        </Card>
      </section>

      <section>
        <SectionTitle right={<Segmented<Mode> value={mode} onChange={setMode} options={[{ value: "percent", label: "Percent" }, { value: "seconds", label: "Seconds" }]} />}>By experiment</SectionTitle>
        <Card className="p-3 sm:p-4">
          <div className="flex flex-col gap-1">
            {rows.map((r) => {
              const total = sumSeconds(r.seconds);
              const rowBig = biggest(r.seconds);
              return (
                <m.button
                  key={r.id}
                  layout="position"
                  onClick={() => navigate(href("experiments", r.id))}
                  className="grid cursor-pointer grid-cols-[58px_1fr] items-center gap-x-3 gap-y-1 rounded-[8px] px-1.5 py-1.5 text-left hover:bg-hover sm:grid-cols-[64px_1fr_76px]"
                  title={r.title}
                >
                  <span className="num text-[12.5px] font-medium">{r.id}</span>
                  <m.div className="min-w-0" initial={false} animate={{ width: `${mode === "percent" ? 100 : (total / maxTotal) * 100}%` }} transition={{ type: "spring", stiffness: 170, damping: 28 }}>
                    <StackBar seconds={r.seconds} scale={total} highlight={rowBig} height={12} />
                  </m.div>
                  <span className="num col-span-2 pl-[70px] text-[11.5px] text-subtle sm:col-span-1 sm:pl-0 sm:text-right">{fmtDur(total)}</span>
                </m.button>
              );
            })}
          </div>
          <div className="dotted-t mt-3 flex flex-wrap gap-x-4 gap-y-1.5 pt-3">
            {BUCKETS.map((b) => (
              <span key={b.key} className="inline-flex items-center gap-1.5 text-[12px] text-muted"><span className="size-2.5 rounded-[3px]" style={{ background: b.color }} />{b.label}</span>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle right={<span className="hidden text-[12px] text-subtle sm:inline">End of one training stage to start of the next</span>}>Gaps between experiments</SectionTitle>
        {gapList.length === 0 ? (
          <Empty>Needs at least two experiments with a train stage and start and end times</Empty>
        ) : (
          <Card className="p-3 sm:p-4">
            <div className="flex flex-col">
              {gapList.map((g) => {
                const share = g.idleS + g.nextTrainS > 0 ? g.idleS / (g.idleS + g.nextTrainS) : 0;
                return (
                  <div key={g.to} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 rounded-[8px] px-2 py-2 sm:grid-cols-[170px_1fr_64px_80px]">
                    <span className="num text-[13px]">{g.from} <span className="text-subtle">to</span> {g.to}</span>
                    <span className="relative order-last col-span-2 h-2 overflow-hidden rounded-full bg-sunken sm:order-none sm:col-span-1">
                      <m.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: "var(--t-setup)" }} initial={false} animate={{ width: `${(g.idleS / maxGap) * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 26 }} />
                    </span>
                    <span className="num text-right text-[14px] font-semibold sm:text-[13.5px]">{fmtDur(g.idleS)}</span>
                    <span className="num col-span-2 text-[11.5px] text-subtle sm:col-span-1 sm:text-right">{(share * 100).toFixed(0)}% of gap+train</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 px-2 text-[11.5px] leading-4 text-subtle">Percent is the idle gap as a share of the gap plus the next training stage. Bars scale to the longest gap.</p>
          </Card>
        )}
      </section>
    </div>
  );
}

function Stat({ label, children, first, last }: { label: string; children: React.ReactNode; first?: boolean; last?: boolean }) {
  return (
    <div className={`min-w-0 pr-4 ${last ? "" : "sep-md"} ${first ? "" : "md:pl-5"} max-md:even:pl-4`}>
      <StatLabel>{label}</StatLabel>
      <div className="mt-1">{children}</div>
    </div>
  );
}
