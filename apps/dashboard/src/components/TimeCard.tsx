import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { BUCKETS, TRAIN_PHASES, biggest, bucketSeconds, fmtDur, sumSeconds, type BucketKey, type Seconds } from "@/lib/timing";
import type { Timing } from "@/lib/types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Stacked horizontal bar. `scale` is the value that fills the full width. Non-highlighted segments are dimmed. */
export function StackBar({ seconds, scale, highlight, height = 14 }: { seconds: Seconds; scale: number; highlight?: BucketKey | null; height?: number }) {
  return (
    <div className="flex overflow-hidden rounded-full bg-sunken" style={{ height }}>
      {BUCKETS.map((b) => {
        const w = scale > 0 ? (seconds[b.key] / scale) * 100 : 0;
        return (
          <m.span
            key={b.key}
            title={`${b.label}: ${fmtDur(seconds[b.key])}`}
            className="h-full shrink-0 border-r border-surface last:border-r-0"
            style={{ background: b.color }}
            initial={false}
            animate={{ width: `${w}%`, opacity: !highlight || highlight === b.key ? 1 : 0.55 }}
            transition={{ type: "spring", stiffness: 170, damping: 28 }}
          />
        );
      })}
    </div>
  );
}

/** Bucket rows: percent is the headline, seconds are secondary. */
export function BucketRows({ seconds, big }: { seconds: Seconds; big: BucketKey | null }) {
  const total = sumSeconds(seconds);
  return (
    <div className="flex flex-col">
      {BUCKETS.filter((b) => seconds[b.key] > 0).map((b) => {
        const share = total ? seconds[b.key] / total : 0;
        return (
          <div key={b.key} className={cn("grid grid-cols-[12px_minmax(0,1fr)_auto] items-center gap-x-2.5 rounded-[8px] px-2 py-2 sm:grid-cols-[12px_minmax(0,150px)_1fr_60px_88px]", big === b.key && "bg-hover")} title={b.hint}>
            <span className="size-2.5 rounded-[3px]" style={{ background: b.color }} />
            <span className={cn("flex min-w-0 items-center gap-1.5 truncate text-[13px]", big === b.key ? "font-semibold text-fg" : "text-fg")}>
              {b.label}
              {big === b.key && <Badge tone="accent">Biggest</Badge>}
            </span>
            <span className="relative hidden h-1.5 overflow-hidden rounded-full bg-sunken sm:block">
              <m.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: b.color }} initial={{ width: 0 }} animate={{ width: `${share * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 26 }} />
            </span>
            <span className="num text-right text-[14px] font-semibold sm:text-[13.5px]"><Flow value={share * 100} digits={1} suffix="%" /></span>
            <span className="num text-right text-[11.5px] text-subtle max-sm:hidden">{fmtDur(seconds[b.key])}</span>
            <span className="num col-span-2 col-start-2 text-[11.5px] text-subtle sm:hidden">{fmtDur(seconds[b.key])}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TimeCard({ timing }: { timing: Timing | null | undefined }) {
  const [open, setOpen] = useState(false);
  if (!timing) return <p className="text-[13px] text-subtle">No timing.json for this experiment.</p>;
  const seconds = bucketSeconds(timing);
  const total = sumSeconds(seconds);
  const big = biggest(seconds);
  const train = timing.stages.train;
  const loop = train?.buckets.train_loop ?? 0;
  const prof = train?.train_profile;
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3">
        <div>
          <h2 className="text-[13px] font-semibold">Where the time went</h2>
          <p className="text-[12px] text-muted">Share of wall time per bucket. Seconds are in grey.</p>
        </div>
        <div className="num text-[12px] text-muted"><span className="text-[18px] font-medium text-fg">{fmtDur(total)}</span> total</div>
      </div>
      <div className="rounded-card border border-border bg-surface p-4">
        <StackBar seconds={seconds} scale={total} highlight={big} />
        <div className="mt-3">
          <BucketRows seconds={seconds} big={big} />
        </div>
        {train && loop > 0 && (
          <>
            <div className="dotted-t mt-2" />
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-field px-2 py-2 text-left text-[13px] font-medium hover:bg-hover">
              <span>Train loop phases</span>
              <ChevronDown className={cn("size-4 text-subtle transition-transform duration-200", open && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
                  <div className="px-2 pb-2 pt-1">
                    {prof && (
                      <div className="mb-3 grid grid-cols-3 gap-3">
                        {[{ l: "Step", v: <Flow value={prof.step_ms} digits={1} suffix=" ms" /> }, { l: "Samples/s", v: <Flow value={prof.samples_per_s} /> }, { l: "Steps", v: <Flow value={prof.steps} /> }].map((x) => (
                          <div key={x.l}><div className="label-caps">{x.l}</div><div className="num mt-0.5 text-[17px] font-medium">{x.v}</div></div>
                        ))}
                      </div>
                    )}
                    {TRAIN_PHASES.map((p) => {
                      const v = train.buckets[`train_loop/${p}`] ?? 0;
                      const share = loop ? v / loop : 0;
                      return (
                        <div key={p} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-1.5 sm:grid-cols-[110px_1fr_60px_88px]">
                          <span className="text-[13px]">{p.replace("_", " ")}</span>
                          <span className="relative order-last col-span-2 h-1.5 overflow-hidden rounded-full bg-sunken sm:order-none sm:col-span-1">
                            <m.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: "var(--t-train)" }} initial={{ width: 0 }} animate={{ width: `${share * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 26 }} />
                          </span>
                          <span className="num text-right text-[13.5px] font-semibold">{(share * 100).toFixed(1)}%</span>
                          <span className="num text-right text-[11.5px] text-subtle max-sm:hidden">{fmtDur(v)}</span>
                        </div>
                      );
                    })}
                    <p className="mt-1 text-[11.5px] text-subtle">Shares of the train loop ({fmtDur(loop)}), from sampled steps with device syncs.</p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
