import { localToday } from "@type-date/core";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flow, Pct } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Dotted, Field, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Select, type Option } from "@/components/ui/select";
import type { Engine } from "@type-date/baselines";
import { evalFor, hardResolved, realisticResolved } from "@/lib/evals";
import { fmtBytes, fmtDate, fmtMs, resolveText } from "@/lib/format";
import { benchOf, engineId } from "@/lib/pareto";
import { TypeDatePicker } from "@/lib/picker";
import { useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";

/** Inputs that tend to break parsers. Click to fill the picker. */
const TRY_THESE = ["pls book fri 3pm", "every other sunday", "a week from tomorrow", "dentist thurs 3pm", "m/w/f 7a-9a", "tonite 8", "last friday", "oct 2 to oct 5"];

const DEFAULT_ENGINE = "h8";

interface Call {
  text: string;
  dsl: string;
  ms: number;
}

const loadBaselines = async (): Promise<Record<string, Engine>> => {
  const mod = await import("@type-date/baselines");
  return mod.baselines;
};

export function PlaygroundView({ params }: { params: URLSearchParams }) {
  const { runs, version } = useStore();
  const setParams = useSetParams();
  const { theme } = useTheme();
  const [reg, setReg] = useState<Record<string, Engine> | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  useEffect(() => {
    loadBaselines().then(setReg).catch((e: unknown) => setFailed(String(e)));
  }, []);

  /** Runs whose engine id exists in the baselines registry, newest first. */
  const entries = useMemo(() => (reg ? [...runs].reverse().filter((r) => reg[engineId(r)]) : []), [runs, reg]);
  const wanted = params.get("engine");
  const run = entries.find((r) => r.config.id === wanted) ?? entries.find((r) => engineId(r) === DEFAULT_ENGINE) ?? entries[0];
  const engine = run && reg ? reg[engineId(run)] : undefined;

  const [override, setOverride] = useState("");
  const [calls, setCalls] = useState<Call[]>([]);
  const [fill, setFill] = useState({ text: "", n: 0 });
  const todayRef = useRef("");

  // The real current date unless overridden. Read at call time so a long session crosses midnight correctly.
  const realToday = localToday();
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(override);
  const today = valid ? override : realToday;
  todayRef.current = valid ? override : "";

  useEffect(() => setCalls([]), [run?.config.id]);

  const parse = useCallback(
    async (text: string) => {
      if (!engine) return "x";
      const r = await engine.predict(text, undefined, { today: todayRef.current || localToday() });
      setCalls((c) => [...c.slice(-39), { text, dsl: r.dsl, ms: r.ms }]);
      return r.dsl;
    },
    [engine],
  );

  const options: Option[] = entries.map((r) => {
    const e = evalFor(r, version);
    return { value: r.config.id, label: r.config.id, hint: e ? `${(e.resolved * 100).toFixed(1)}%` : undefined };
  });

  const last = calls[calls.length - 1];
  const sorted = calls.map((c) => c.ms).sort((a, b) => a - b);
  const p50 = sorted.length ? sorted[Math.floor(sorted.length / 2)]! : null;
  const maxMs = Math.max(1, ...calls.map((c) => c.ms));
  const b = run ? benchOf(run) : undefined;
  const ev = run ? evalFor(run, version) : null;
  const real = realisticResolved(ev);
  const hard = hardResolved(ev);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Playground" subtitle="Type text and see the parsed result in the picker. The engine runs in this browser, with no download." />
      {failed && <p className="rounded-field border border-danger/30 bg-danger-soft px-3 py-2 text-[12.5px] text-danger">Could not load the engines: {failed}</p>}
      <div className="grid min-w-0 gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="order-2 flex flex-col gap-4 self-start lg:order-1">
          <Card className="flex flex-col gap-4 p-4">
            <Field label="Engine">
              <Select value={run?.config.id ?? ""} onChange={(v) => setParams({ engine: v })} options={options} placeholder={reg ? "No runnable engines" : "Loading"} />
            </Field>
            <Field label={`Today (${override ? "override" : "real date"})`}>
              <div className="flex gap-2">
                <Input type="date" value={override || realToday} onChange={(e) => setOverride(e.target.value === realToday ? "" : e.target.value)} />
                {override && (
                  <Button size="icon" variant="secondary" aria-label="Use the real date" onClick={() => setOverride("")}>
                    <X />
                  </Button>
                )}
              </div>
            </Field>
            <Dotted />
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone={engine ? "ok" : "neutral"}>{engine ? "Ready" : "Loading"}</Badge>
              {run && <span className="text-[12px] text-muted">Gzip size {fmtBytes(run.metrics.model.size_bytes)}</span>}
            </div>
          </Card>

          {run && (
            <Card className="p-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="num text-[13px] font-semibold">{run.config.id}</span>
                <Badge>eval {version}</Badge>
              </div>
              {run.config.description && <p className="mt-1 text-[12.5px] leading-5 text-muted">{run.config.description}</p>}
              <Dotted className="my-3" />
              {ev ? (
                <div className="grid grid-cols-3 gap-3">
                  <div><StatLabel>Resolved</StatLabel><div className="mt-0.5"><Pct value={ev.resolved} className="text-[19px] font-medium" /></div><div className="text-[11px] text-subtle">all {version}</div></div>
                  <div><StatLabel>Realistic</StatLabel><div className="mt-0.5">{real !== null ? <Pct value={real} className="text-[19px] font-medium text-accent" /> : <span className="text-[19px] text-subtle">-</span>}</div><div className="text-[11px] text-subtle">external, public</div></div>
                  <div><StatLabel>Hard</StatLabel><div className="mt-0.5">{hard !== null ? <Pct value={hard} className="text-[19px] font-medium" /> : <span className="text-[19px] text-subtle">-</span>}</div><div className="text-[11px] text-subtle">adversarial</div></div>
                </div>
              ) : (
                <p className="text-[12.5px] text-warn">Not evaluated on {version}.</p>
              )}
            </Card>
          )}
        </div>

        <div className="order-1 flex min-w-0 flex-col gap-6 lg:order-2">
          <Card className="p-3 sm:p-5">
            <SectionTitle>Picker</SectionTitle>
            <div className="mb-4">
              <div className="mb-1.5 text-[12px] font-medium text-muted">Try these</div>
              <div className="flex flex-wrap gap-1.5">
                {TRY_THESE.map((t) => (
                  <button key={t} onClick={() => setFill((f) => ({ text: t, n: f.n + 1 }))} disabled={!engine} className="h-8 cursor-pointer rounded-chip border border-border bg-surface px-2.5 text-[12.5px] text-fg shadow-input transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-50">
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {engine ? (
              <TypeDatePicker key={`${run?.config.id}${fill.n}`} parse={parse} today={today} theme={theme} placeholder="oct 2 to oct 5" defaultText={fill.text} />
            ) : (
              <div className="flex h-24 items-center justify-center rounded-field border border-dashed border-border text-[13px] text-subtle">{reg ? "No engine to run" : "Loading engines"}</div>
            )}
          </Card>
          <Card className="p-3 sm:p-5">
            <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              {[
                { l: "Last parse", v: last ? <Flow value={last.ms} digits={last.ms < 10 ? 2 : 1} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Session p50", v: p50 !== null ? <Flow value={p50} digits={p50 < 10 ? 2 : 1} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Bench p50", v: b ? <span className="num text-[22px] font-medium">{fmtMs(b.latency_ms.p50)}</span> : <span className="text-[22px] text-subtle" title="No latency bench for this engine">-</span> },
                { l: "Calls", v: <Flow value={calls.length} className="text-[22px] font-medium" /> },
              ].map((s, i) => (
                <div key={s.l} className={i < 3 ? "pr-3 sep-sm" : "pr-3"}>
                  <div className={i ? "max-sm:even:pl-3 sm:pl-3" : ""}><StatLabel>{s.l}</StatLabel><div className="mt-1">{s.v}</div></div>
                </div>
              ))}
            </div>
            <Dotted className="my-4" />
            {last ? (
              <div className="grid gap-x-3 gap-y-0.5 text-[13px] sm:grid-cols-[100px_1fr] sm:gap-y-2 [&>span:nth-child(odd)]:max-sm:mt-2 [&>span:nth-child(odd)]:max-sm:text-[11.5px] [&>span:nth-child(odd)]:max-sm:text-subtle">
                <span className="text-muted">Text</span><span className="break-words font-medium">{last.text || "(empty)"}</span>
                <span className="text-muted">DSL returned</span><code className="break-all font-mono text-[12.5px] text-fg">{last.dsl}</code>
                <span className="text-muted">Resolved</span><span>{resolveText(last.dsl, today)}</span>
                <span className="text-muted">Today</span><span className="text-muted">{fmtDate(today)} {override ? "(override)" : "(real date)"}</span>
              </div>
            ) : (
              <p className="text-[13px] text-subtle">No calls yet. Type in the picker or use a chip.</p>
            )}
            {calls.length > 1 && (
              <div className="mt-4 flex h-10 items-end gap-[3px]" aria-label="Latency of recent calls">
                {calls.map((c, i) => <span key={i} title={`${c.ms.toFixed(2)} ms`} className="w-1.5 rounded-sm bg-accent/70" style={{ height: `${Math.max(8, (c.ms / maxMs) * 100)}%` }} />)}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
