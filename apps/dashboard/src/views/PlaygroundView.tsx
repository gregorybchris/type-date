import { localToday } from "@type-date/core";
import { LoaderCircle, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Flow, Pct } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Dotted, Field, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Select, type Option } from "@/components/ui/select";
import { MockEngine, getEngine, loadBaselines, type Engine, type EngineHandle } from "@/lib/engine";
import { evalFor, hardResolved, ownVersion, realisticResolved } from "@/lib/evals";
import { fmtBytes, fmtDate, resolveText } from "@/lib/format";
import { bestBench, familyOf } from "@/lib/pareto";
import { TypeDatePicker } from "@/lib/picker";
import { useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import type { Run } from "@/lib/types";

/** Inputs that tend to break parsers. Click to fill the picker. */
const TRY_THESE = ["pls book fri 3pm", "every other sunday", "a week from tomorrow", "dentist thurs 3pm", "m/w/f 7a-9a", "tonite 8", "last friday", "oct 2 to oct 5"];

const DEFAULT_ENGINE = "heuristic-full-4";

interface Call {
  text: string;
  dsl: string;
  ms: number;
  tokens?: number;
}

interface Entry {
  run: Run;
  kind: "baseline" | "model";
  engineId: string;
}

/** Engine id of a non-model run that exists in the baselines registry. */
function baselineId(run: Run, reg: Record<string, Engine>): string | null {
  const cands = [run.config.model.engine, run.manifest?.engine, ...run.bench.map((b) => b.engine)];
  for (const c of cands) if (typeof c === "string" && reg[c]) return c;
  return null;
}

export function PlaygroundView({ params }: { params: URLSearchParams }) {
  const { runs, version } = useStore();
  const setParams = useSetParams();
  const { theme } = useTheme();
  const [reg, setReg] = useState<Record<string, Engine> | null>(null);
  useEffect(() => {
    loadBaselines().then(setReg);
  }, []);

  const entries = useMemo<Entry[]>(() => {
    if (!reg) return [];
    const out: Entry[] = [];
    for (const run of [...runs].reverse()) {
      const b = baselineId(run, reg);
      if (b) out.push({ run, kind: "baseline", engineId: b });
      else if (run.manifest && Object.keys(run.manifest.files).length > 0) out.push({ run, kind: "model", engineId: run.manifest.engine });
    }
    return out;
  }, [runs, reg]);

  const wanted = params.get("exp");
  const entry = entries.find((e) => e.run.config.id === wanted) ?? entries.find((e) => e.engineId === DEFAULT_ENGINE) ?? entries[0];
  const run = entry?.run;

  const [backend, setBackend] = useState<"wasm" | "webgpu">("wasm");
  const [override, setOverride] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [handle, setHandle] = useState<EngineHandle | null>(null);
  const [loadMs, setLoadMs] = useState<number | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const [fill, setFill] = useState({ text: "", n: 0 });
  const engineRef = useRef<EngineHandle | null>(null);
  const todayRef = useRef("");

  // The real current date unless overridden. Read at call time so a long session crosses midnight correctly.
  const realToday = localToday();
  const today = /^\d{4}-\d{2}-\d{2}$/.test(override) ? override : realToday;
  todayRef.current = override && /^\d{4}-\d{2}-\d{2}$/.test(override) ? override : "";

  const backends = useMemo(() => {
    const bs = new Set(run?.bench.filter((b) => b.engine === entry?.engineId).map((b) => b.backend));
    return ["wasm", "webgpu"].filter((b) => bs.size === 0 || bs.has(b));
  }, [run, entry]);

  const load = useCallback(async () => {
    if (!run || !entry || !reg) return;
    setProgress(0);
    const t0 = performance.now();
    try {
      let h: EngineHandle;
      if (entry.kind === "baseline") {
        h = { engine: reg[entry.engineId]!, source: "real" };
        await h.engine.load({ baseUrl: "", manifest: { experiment: run.config.id, engine: entry.engineId, files: {}, config: {} }, onProgress: setProgress });
      } else {
        const manifest = run.manifest!;
        h = await getEngine(manifest, bestBench(run)?.latency_ms.p50);
        await h.engine.load({ baseUrl: `/artifacts/${run.config.id}/`, manifest, backend, onProgress: setProgress });
      }
      engineRef.current = h;
      setHandle(h);
      setLoadMs(performance.now() - t0);
      if (entry.kind === "model") toast.success(h.source === "real" ? `Loaded ${run.config.id} (${entry.engineId}, ${backend})` : `Loaded mock engine for ${run.config.id}`, { description: h.reason });
    } catch (e) {
      const h: EngineHandle = { engine: new MockEngine(), source: "mock", reason: `load failed: ${String(e)}` };
      await h.engine.load({ baseUrl: "", manifest: { experiment: run.config.id, engine: "mock", files: {}, config: {} } });
      engineRef.current = h;
      setHandle(h);
      toast.error("Engine failed to load. Using the mock engine.", { description: String(e) });
    } finally {
      setProgress(null);
    }
  }, [run, entry, reg, backend]);

  // Reset on selection change. Baselines are cheap, so they load right away.
  const entryKey = entry ? `${entry.run.config.id}|${backend}` : "";
  useEffect(() => {
    if (engineRef.current && engineRef.current.source === "real" && entry?.kind === "model") engineRef.current.engine.dispose();
    engineRef.current = null;
    setHandle(null);
    setLoadMs(null);
    setCalls([]);
    if (entry?.kind === "baseline") void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryKey, reg]);

  const parse = useCallback(async (text: string) => {
    const h = engineRef.current;
    if (!h) return "x";
    const r = await h.engine.predict(text, undefined, { today: todayRef.current || localToday() });
    setCalls((c) => [...c.slice(-39), { text, dsl: r.dsl, ms: r.ms, tokens: r.outputTokens }]);
    return r.dsl;
  }, []);

  const options: Option[] = entries.map((e) => ({
    value: e.run.config.id,
    label: `${e.run.config.id} ${e.run.config.title}`,
    hint: evalFor(e.run, version) ? `${(evalFor(e.run, version)!.resolved * 100).toFixed(1)}%` : undefined,
    group: e.kind === "baseline" ? "Baselines (no download)" : "Models (artifacts)",
  })).sort((a, b) => Number(a.group!.startsWith("Models")) - Number(b.group!.startsWith("Models")));

  const last = calls[calls.length - 1];
  const sorted = calls.map((c) => c.ms).sort((a, b) => a - b);
  const p50 = sorted.length ? sorted[Math.floor(sorted.length / 2)]! : null;
  const maxMs = Math.max(1, ...calls.map((c) => c.ms));
  const benchEntry = run?.bench.find((b) => b.engine === entry?.engineId && (b.profile ?? "desktop") === "desktop" && (entry?.kind === "baseline" || b.backend === backend));
  const ev = run ? evalFor(run, version) : null;
  const real = realisticResolved(ev);
  const hard = hardResolved(ev);
  const digits = (ms: number) => (ms < 10 ? 2 : 1);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Playground" subtitle="Try an experiment in this browser. Baselines run at once; model checkpoints need their artifacts loaded." />
      <div className="grid min-w-0 gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="order-2 flex flex-col gap-4 self-start lg:order-1">
          <Card className="flex flex-col gap-4 p-4">
            <Field label="Experiment">
              <Select value={entry?.run.config.id ?? ""} onChange={(v) => setParams({ exp: v })} options={options} placeholder={reg ? "No runnable experiments" : "Loading"} />
            </Field>
            {entry?.kind === "model" && (
              <Field label="Backend">
                <Select value={backend} onChange={(v) => setBackend(v as "wasm" | "webgpu")} options={backends.map((b) => ({ value: b, label: b }))} />
              </Field>
            )}
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
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 text-[12px] text-muted">
                {entry?.kind === "baseline" ? "No artifact needed" : benchEntry ? `Download ${fmtBytes(benchEntry.download_bytes)}` : "Model artifacts"}
              </div>
              {entry?.kind === "model" && (
                <Button variant="primary" onClick={load} disabled={progress !== null}>
                  {progress !== null ? <><LoaderCircle className="animate-spin" />Loading</> : handle ? "Reload" : "Load"}
                </Button>
              )}
            </div>
            {progress !== null && entry?.kind === "model" && (
              <div className="h-1.5 overflow-hidden rounded-full bg-sunken"><div className="h-full rounded-full bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} /></div>
            )}
            <div className="flex flex-wrap items-center gap-1.5">
              {handle ? (
                <>
                  <Badge tone={handle.source === "real" ? "ok" : "warn"}>{handle.source === "real" ? (entry?.kind === "baseline" ? "Baseline ready" : "Real engine") : "Mock engine"}</Badge>
                  {loadMs !== null && entry?.kind === "model" && <span className="num text-[12px] text-muted">loaded in {Math.round(loadMs)} ms</span>}
                </>
              ) : (
                <Badge>{entry?.kind === "baseline" ? "Loading" : "Not loaded"}</Badge>
              )}
            </div>
            {handle?.reason && <p className="text-[12px] text-subtle">{handle.reason}. The mock knows a few phrases.</p>}
          </Card>

          {run && (
            <Card className="p-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="num text-[13px] font-semibold">{run.config.id}</span>
                <Badge>{familyOf(run)}</Badge>
                <Badge tone="accent">{entry?.engineId}</Badge>
                <Badge>eval {ev ? version : ownVersion(run)}</Badge>
              </div>
              <div className="mt-1 text-[14px] font-medium text-fg">{run.config.title}</div>
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
                  <button key={t} onClick={() => setFill((f) => ({ text: t, n: f.n + 1 }))} disabled={!handle} className="h-8 cursor-pointer rounded-chip border border-border bg-surface px-2.5 text-[12.5px] text-fg shadow-input transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-50">
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {handle ? (
              <TypeDatePicker key={`${entryKey}${handle.engine.id}${loadMs}${fill.n}`} parse={parse} today={today} theme={theme} placeholder="oct 2 to oct 5" defaultText={fill.text} />
            ) : (
              <div className="flex h-24 items-center justify-center rounded-field border border-dashed border-border text-[13px] text-subtle">
                {entry?.kind === "model" ? "Load a checkpoint to try the picker" : reg ? "Loading engine" : "Loading baselines"}
              </div>
            )}
          </Card>
          <Card className="p-3 sm:p-5">
            <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              {[
                { l: "Last parse", v: last ? <Flow value={last.ms} digits={digits(last.ms)} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Session p50", v: p50 !== null ? <Flow value={p50} digits={digits(p50)} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Bench p50", v: benchEntry ? <Flow value={benchEntry.latency_ms.p50} digits={digits(benchEntry.latency_ms.p50)} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
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
                {last.tokens !== undefined && last.tokens > 0 && <><span className="text-muted">Output tokens</span><span className="num">{last.tokens}</span></>}
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
