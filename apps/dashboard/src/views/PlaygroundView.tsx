import { localToday } from "@type-date/core";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Dotted, Field, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Select } from "@/components/ui/select";
import { MockEngine, getEngine, type EngineHandle } from "@/lib/engine";
import { fmtBytes, resolveText } from "@/lib/format";
import { bestBench } from "@/lib/pareto";
import { useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { TypeDatePicker } from "@/lib/picker";

interface Call {
  text: string;
  dsl: string;
  ms: number;
  tokens?: number;
}

export function PlaygroundView({ params }: { params: URLSearchParams }) {
  const { runs, run: getRun } = useStore();
  const setParams = useSetParams();
  const { theme } = useTheme();
  const expId = params.get("exp") || runs[runs.length - 1]?.config.id || "";
  const run = getRun(expId);
  const engineIds = useMemo(() => {
    const ids = new Set<string>();
    if (run?.manifest) ids.add(run.manifest.engine);
    run?.bench.forEach((b) => ids.add(b.engine));
    return [...ids];
  }, [run]);
  const [engineId, setEngineId] = useState("");
  const [backend, setBackend] = useState<"wasm" | "webgpu">("wasm");
  const [today, setToday] = useState(() => localToday());
  const [progress, setProgress] = useState<number | null>(null);
  const [handle, setHandle] = useState<EngineHandle | null>(null);
  const [loadMs, setLoadMs] = useState<number | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const engineRef = useRef<EngineHandle | null>(null);

  const effectiveEngine = engineIds.includes(engineId) ? engineId : (engineIds[0] ?? "mock");
  const backends = useMemo(() => {
    const bs = new Set(run?.bench.filter((b) => b.engine === effectiveEngine).map((b) => b.backend));
    return ["wasm", "webgpu"].filter((b) => bs.size === 0 || bs.has(b));
  }, [run, effectiveEngine]);

  // Drop the loaded engine when the selection changes.
  useEffect(() => {
    engineRef.current?.engine.dispose();
    engineRef.current = null;
    setHandle(null);
    setLoadMs(null);
    setCalls([]);
  }, [expId, effectiveEngine, backend]);
  useEffect(() => () => engineRef.current?.engine.dispose(), []);

  const load = useCallback(async () => {
    if (!run) return;
    setProgress(0);
    const t0 = performance.now();
    try {
      const p50 = bestBench(run)?.latency_ms.p50;
      const manifest = run.manifest ? { ...run.manifest, engine: effectiveEngine } : null;
      const h = await getEngine(manifest, p50);
      await h.engine.load({
        baseUrl: `/artifacts/${run.config.id}/`,
        manifest: manifest ?? { experiment: run.config.id, engine: effectiveEngine, files: {}, config: {} },
        backend,
        onProgress: setProgress,
      });
      engineRef.current = h;
      setHandle(h);
      setLoadMs(performance.now() - t0);
      toast.success(h.source === "real" ? `Loaded ${run.config.id} (${effectiveEngine}, ${backend})` : `Loaded mock engine for ${run.config.id}`, { description: h.reason });
    } catch (e) {
      // A real engine can fail on missing files. Use the mock so the page stays usable.
      const h: EngineHandle = { engine: new MockEngine(), source: "mock", reason: `load failed: ${String(e)}` };
      await h.engine.load({ baseUrl: "", manifest: { experiment: run.config.id, engine: "mock", files: {}, config: {} } });
      engineRef.current = h;
      setHandle(h);
      toast.error("Engine failed to load. Using the mock engine.", { description: String(e) });
    } finally {
      setProgress(null);
    }
  }, [run, effectiveEngine, backend]);

  const parse = useCallback(async (text: string) => {
    const h = engineRef.current;
    if (!h) return "x";
    const r = await h.engine.predict(text);
    setCalls((c) => [...c.slice(-39), { text, dsl: r.dsl, ms: r.ms, tokens: r.outputTokens }]);
    return r.dsl;
  }, []);

  const last = calls[calls.length - 1];
  const sorted = [...calls].map((c) => c.ms).sort((a, b) => a - b);
  const p50 = sorted.length ? sorted[Math.floor(sorted.length / 2)]! : null;
  const maxMs = Math.max(1, ...calls.map((c) => c.ms));
  const benchEntry = run?.bench.find((b) => b.engine === effectiveEngine && b.backend === backend);
  const lastResolved = last ? resolveText(last.dsl, today) : null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Playground" subtitle="Load an experiment checkpoint in this browser and type into the picker." />
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="flex flex-col gap-4 self-start p-4">
          <Field label="Experiment">
            <Select value={expId} onChange={(v) => setParams({ exp: v })} options={[...runs].reverse().map((r) => ({ value: r.config.id, label: r.config.id, hint: `${(r.metrics.eval.exact * 100).toFixed(1)}%` }))} />
          </Field>
          <div className="-mt-2 truncate text-[12px] text-muted">{run?.config.title}</div>
          <Field label="Engine">
            <Select value={effectiveEngine} onChange={setEngineId} options={engineIds.length ? engineIds.map((e) => ({ value: e, label: e })) : [{ value: "mock", label: "mock" }]} />
          </Field>
          <Field label="Backend">
            <Select value={backend} onChange={(v) => setBackend(v as "wasm" | "webgpu")} options={backends.map((b) => ({ value: b, label: b }))} />
          </Field>
          <Field label="Today"><Input type="date" value={today} onChange={(e) => setToday(e.target.value)} /></Field>
          <Dotted />
          <div className="flex items-center justify-between">
            <div className="text-[12px] text-muted">
              {run?.manifest ? <>Files: {Object.keys(run.manifest.files).length || "none"}{benchEntry && <> / {fmtBytes(benchEntry.download_bytes)}</>}</> : "No artifacts manifest"}
            </div>
            <Button variant="primary" onClick={load} disabled={progress !== null}>
              {progress !== null ? <><LoaderCircle className="animate-spin" />Loading</> : handle ? "Reload" : "Load"}
            </Button>
          </div>
          {progress !== null && (
            <div className="h-1.5 overflow-hidden rounded-full bg-sunken"><div className="h-full rounded-full bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} /></div>
          )}
          <div className="flex flex-wrap items-center gap-1.5">
            {handle ? (
              <>
                <Badge tone={handle.source === "real" ? "ok" : "warn"}>{handle.source === "real" ? "Real engine" : "Mock engine"}</Badge>
                {loadMs !== null && <span className="num text-[12px] text-muted">loaded in {Math.round(loadMs)} ms</span>}
              </>
            ) : (
              <Badge>Not loaded</Badge>
            )}
          </div>
          {handle?.reason && <p className="text-[12px] text-subtle">{handle.reason}. The mock knows a few phrases such as "oct 2 to oct 5" and "last friday".</p>}
        </Card>

        <div className="flex min-w-0 flex-col gap-6">
          <Card className="p-5">
            <SectionTitle>Picker</SectionTitle>
            {handle ? (
              <TypeDatePicker key={`${expId}${effectiveEngine}${backend}${handle.engine.id}${loadMs}`} parse={parse} today={today} theme={theme} placeholder="oct 2 to oct 5" />
            ) : (
              <div className="flex h-24 items-center justify-center rounded-field border border-dashed border-border text-[13px] text-subtle">Load a checkpoint to try the picker</div>
            )}
          </Card>
          <Card className="p-5">
            <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              {[
                { l: "Last parse", v: last ? <Flow value={last.ms} digits={last.ms < 10 ? 2 : 1} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Session p50", v: p50 !== null ? <Flow value={p50} digits={p50 < 10 ? 2 : 1} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Bench p50", v: benchEntry ? <Flow value={benchEntry.latency_ms.p50} digits={benchEntry.latency_ms.p50 < 10 ? 2 : 1} suffix=" ms" className="text-[22px] font-medium" /> : <span className="text-[22px] text-subtle">-</span> },
                { l: "Calls", v: <Flow value={calls.length} className="text-[22px] font-medium" /> },
              ].map((s, i) => (
                <div key={s.l} className="pr-3" style={i < 3 ? { borderRight: "1px dotted var(--dotted)" } : undefined}>
                  <div className={i ? "pl-3" : ""}><StatLabel>{s.l}</StatLabel><div className="mt-1">{s.v}</div></div>
                </div>
              ))}
            </div>
            <Dotted className="my-4" />
            {last ? (
              <div className="grid gap-2 text-[13px] sm:grid-cols-[90px_1fr]">
                <span className="text-muted">Text</span><span className="font-medium">{last.text || "(empty)"}</span>
                <span className="text-muted">DSL</span><code className="font-mono text-[12px]">{last.dsl}</code>
                <span className="text-muted">Resolved</span><span>{lastResolved}</span>
                {last.tokens !== undefined && <><span className="text-muted">Output tokens</span><span className="num">{last.tokens}</span></>}
              </div>
            ) : (
              <p className="text-[13px] text-subtle">No calls yet.</p>
            )}
            {calls.length > 1 && (
              <div className="mt-4 flex h-10 items-end gap-[3px]" aria-label="Latency of recent calls">
                {calls.map((c, i) => <span key={i} title={`${c.ms.toFixed(1)} ms`} className="w-1.5 rounded-sm bg-accent/70" style={{ height: `${Math.max(8, (c.ms / maxMs) * 100)}%` }} />)}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
