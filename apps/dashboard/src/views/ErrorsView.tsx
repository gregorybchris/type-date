import { localToday } from "@type-date/core";
import { Copy, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breakdown, BreakdownLegend, MetricToggle, SMALL_N, rowsFromScores, type Metric } from "@/components/Breakdown";
import { Segmented } from "@/components/ui/segmented";
import { Card, Empty, Field, Input, PageHeader, SectionTitle } from "@/components/ui/misc";
import { Select } from "@/components/ui/select";
import { fetchErrors, useAsync } from "@/lib/api";
import { diffDsl, type DiffToken } from "@/lib/diff";
import { evalFor } from "@/lib/evals";
import { resolveText } from "@/lib/format";
import { href, navigate, useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import type { ErrorRow } from "@/lib/types";
import { cn } from "@/lib/utils";

const PAGE = 40;
type Dim = "tag" | "modifier" | "split";

function Summary({ label, children, first, last }: { label: string; children: React.ReactNode; first?: boolean; last?: boolean }) {
  return (
    <div className={cn("min-w-0 pr-4", !last && "sep-md", !first && "md:pl-5", "max-md:even:pl-4")}>
      <div className="label-caps">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Tokens({ tokens, tone }: { tokens: DiffToken[]; tone: "ok" | "danger" }) {
  return (
    <code className="whitespace-pre-wrap break-all font-mono text-[12px] leading-5">
      {tokens.map((t, i) => (
        <span key={i} className={cn(t.changed && !/^\s+$/.test(t.text) && (tone === "ok" ? "rounded-[3px] bg-ok-soft text-ok" : "rounded-[3px] bg-danger-soft text-danger"))}>
          {t.text}
        </span>
      ))}
    </code>
  );
}

export function toJsonl(rows: ErrorRow[]): string {
  return rows
    .map((r) => JSON.stringify({ text: r.text, dsl: r.expected, primary_tag: r.primary_tag, modifier_tags: r.modifier_tags, source: "error-analysis", predicted: r.predicted, parent_id: r.id }))
    .join("\n");
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

export function ErrorsView({ id, params }: { id: string; params: URLSearchParams }) {
  const { runs, run: getRun, version } = useStore();
  const setParams = useSetParams();
  const expId = id || runs[runs.length - 1]?.config.id || "";
  const run = getRun(expId);
  const tag = params.get("tag") ?? "";
  const modifier = params.get("modifier") ?? "";
  const split = params.get("split") ?? "";
  const q = params.get("q") ?? "";
  const [qDraft, setQDraft] = useState(q);
  const [today, setToday] = useState(() => localToday());
  const [page, setPage] = useState(0);
  const [picked, setPicked] = useState<Map<string, ErrorRow>>(new Map());

  useEffect(() => {
    const t = setTimeout(() => qDraft !== q && setParams({ q: qDraft || undefined }), 250);
    return () => clearTimeout(t);
  }, [qDraft, q, setParams]);
  useEffect(() => setPage(0), [expId, version, tag, modifier, split, q]);
  useEffect(() => setPicked(new Map()), [expId]);

  const list = useAsync(`${expId}|${version}|${tag}|${modifier}|${split}|${q}|${page}`, (s) => fetchErrors(expId, { version, tag, modifier, split, q, offset: page * PAGE, limit: PAGE }, s));

  const rows = list.data?.items ?? [];
  const [dim, setDim] = useState<Dim>("tag");
  const [metric, setMetric] = useState<Metric>("error");
  const today0 = today || localToday();
  const resolved = useMemo(() => rows.map((r) => ({ exp: resolveText(r.expected, today0), got: resolveText(r.predicted, today0) })), [rows, today0]);

  const ev = run ? evalFor(run, version) : null;
  if (!run) return <Empty>No experiment selected</Empty>;
  if (!ev) return <Empty>{run.config.id} has no results on {version}</Empty>;
  const scores = dim === "tag" ? ev.by_tag : dim === "modifier" ? ev.by_modifier : ev.by_split;
  const rows_ = rowsFromScores(scores);
  const totalErrors = Math.round(ev.n * (1 - ev.exact));
  const overall = ev.n ? totalErrors / ev.n : 0;
  const reliable = rows_.filter((r) => r.n >= SMALL_N && r.errors > 0);
  const worst = [...reliable].sort((a, b) => b.errors / b.n - a.errors / a.n)[0];
  const biggest = [...rows_].sort((a, b) => b.errors - a.errors)[0];
  const selectedKey = dim === "tag" ? tag : dim === "modifier" ? modifier : split;
  const total = list.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const allOnPage = rows.length > 0 && rows.every((r) => picked.has(r.id));
  const someOnPage = rows.some((r) => picked.has(r.id));

  const toggle = (r: ErrorRow, on: boolean) =>
    setPicked((p) => {
      const n = new Map(p);
      if (on) n.set(r.id, r);
      else n.delete(r.id);
      return n;
    });

  const tagOptions = Object.keys(ev.by_tag).sort().map((t) => ({ value: t, label: t }));
  const modOptions = Object.keys(ev.by_modifier).sort().map((t) => ({ value: t, label: t }));
  const splitOptions = Object.keys(ev.by_split).map((t) => ({ value: t, label: t }));

  const copySelected = async () => {
    const out = [...picked.values()];
    await copy(toJsonl(out));
    toast.success(`Copied ${out.length} failures as JSONL`);
  };
  const selectAllFiltered = async () => {
    const all = await fetchErrors(expId, { version, tag, modifier, split, q, limit: 5000 });
    setPicked((p) => new Map([...p, ...all.items.map((r) => [r.id, r] as const)]));
    toast(`Selected ${all.items.length} failures`);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Error analysis" subtitle="Failures by tag. Select rows and copy them as JSONL to steer data generation.">
        <Select
          className="w-full sm:w-64"
          value={expId}
          onChange={(v) => navigate(href("errors", v))}
          options={runs.map((r) => ({ value: r.config.id, label: r.config.id, hint: r.config.title }))}
          aria-label="Experiment"
        />
      </PageHeader>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[13px] font-semibold">Where the errors are on {version}</h2>
            <p className="text-[12px] text-muted">Whole experiment. Click a row to filter the table below.</p>
          </div>
          <div className="flex max-w-full flex-wrap items-center gap-2">
            <Segmented<Dim> value={dim} onChange={setDim} options={[{ value: "tag", label: "Tag" }, { value: "modifier", label: "Modifier" }, { value: "split", label: "Split" }]} />
            <MetricToggle value={metric} onChange={setMetric} />
          </div>
        </div>
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
            <Summary label="Error rate" first><Flow value={overall * 100} digits={1} suffix="%" className="text-[22px] font-medium" /><div className="text-[12px] text-muted">{totalErrors.toLocaleString()} of {ev.n.toLocaleString()}</div></Summary>
            <Summary label="Accuracy"><Flow value={(1 - overall) * 100} digits={1} suffix="%" className="text-[22px] font-medium" /><div className="text-[12px] text-muted">exact match</div></Summary>
            <Summary label="Highest rate">{worst ? <><Flow value={worst.errors / worst.n * 100} digits={1} suffix="%" className="text-[22px] font-medium" /><div className="break-words text-[12px] text-muted">{worst.key}, n={worst.n}</div></> : <span className="text-[22px] text-subtle">-</span>}</Summary>
            <Summary label="Largest share" last>{biggest ? <><Flow value={totalErrors ? biggest.errors / totalErrors * 100 : 0} digits={1} suffix="%" className="text-[22px] font-medium" /><div className="break-words text-[12px] text-muted">{biggest.key}, {biggest.errors} errors</div></> : <span className="text-[22px] text-subtle">-</span>}</Summary>
          </div>
          <div className="dotted-t my-4" />
          <Breakdown rows={rows_} totalErrors={totalErrors} totalN={ev.n} metric={metric} selected={selectedKey} onSelect={(k) => setParams({ [dim]: selectedKey === k ? undefined : k })} />
          <BreakdownLegend metric={metric} overall={overall} />
        </Card>
      </section>

      <div className="dotted-t" />

      <section className="flex flex-col gap-3">
        <div className="grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <Field label="Primary tag" className="col-span-2 sm:col-span-1"><Select className="w-full sm:w-48" value={tag} onChange={(v) => setParams({ tag: v || undefined })} options={tagOptions} allLabel="All tags" /></Field>
          <Field label="Modifier"><Select className="w-full sm:w-40" value={modifier} onChange={(v) => setParams({ modifier: v || undefined })} options={modOptions} allLabel="All modifiers" /></Field>
          <Field label="Split"><Select className="w-full sm:w-40" value={split} onChange={(v) => setParams({ split: v || undefined })} options={splitOptions} allLabel="All splits" /></Field>
          <Field label="Text search" className="col-span-2 sm:col-span-1 sm:w-56">
            <div className="relative"><Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" /><Input className="pl-8" placeholder="Search text or DSL" value={qDraft} onChange={(e) => setQDraft(e.target.value)} /></div>
          </Field>
          <Field label="Today" className="col-span-2 sm:col-span-1"><Input type="date" className="w-full sm:w-40" value={today} onChange={(e) => setToday(e.target.value)} /></Field>
          <div className="col-span-2 flex flex-wrap items-center gap-2 sm:ml-auto">
            <span className="num text-[12px] text-muted">{picked.size} selected</span>
            <Button onClick={selectAllFiltered} disabled={total === 0}>Select all {total}</Button>
            <Button onClick={() => setPicked(new Map())} disabled={picked.size === 0} variant="ghost">Clear</Button>
            <Button variant="primary" onClick={copySelected} disabled={picked.size === 0}><Copy />Copy JSONL</Button>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[980px] border-collapse text-[13px]">
            <thead>
              <tr className="dotted-b text-left text-[12px] font-medium text-subtle">
                <th className="w-9 px-2 py-2.5"><Checkbox aria-label="Select page" checked={allOnPage ? true : someOnPage ? "indeterminate" : false} onChange={(v) => rows.forEach((r) => toggle(r, v))} /></th>
                <th className="px-2 py-2.5 font-medium">Text</th>
                <th className="px-2 py-2.5 font-medium">Expected</th>
                <th className="px-2 py-2.5 font-medium">Predicted</th>
                <th className="px-2 py-2.5 font-medium">Resolved (expected / predicted)</th>
              </tr>
            </thead>
            <tbody className={cn("transition-opacity", list.loading && "opacity-60")}>
              {rows.map((r, i) => {
                const d = diffDsl(r.expected, r.predicted);
                const res = resolved[i];
                return (
                  <tr key={r.id} className={cn("border-b border-border align-top", picked.has(r.id) && "bg-accent-soft/50")}>
                    <td className="px-2 py-3"><Checkbox aria-label={`Select ${r.text}`} checked={picked.has(r.id)} onChange={(v) => toggle(r, v)} /></td>
                    <td className="max-w-[300px] px-2 py-2.5">
                      <div className="font-medium text-fg">{r.text}</div>
                      <div className="mt-1 flex flex-wrap gap-1"><Badge tone="accent">{r.primary_tag}</Badge>{r.modifier_tags.map((m) => <Badge key={m}>{m}</Badge>)}<Badge className="text-subtle">{r.split}</Badge></div>
                    </td>
                    <td className="px-2 py-3"><Tokens tokens={d.expected} tone="ok" /></td>
                    <td className="px-2 py-3"><Tokens tokens={d.predicted} tone="danger" /></td>
                    <td className="px-2 py-2.5 text-[12px]">
                      <div className="text-fg">{res?.exp}</div>
                      <div className={cn("mt-0.5", res && res.exp === res.got ? "text-ok" : "text-danger")}>{res?.got}{res && res.exp === res.got && " (same dates)"}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!list.loading && rows.length === 0 && <Empty>No failures match these filters</Empty>}
        </div>
        <div className={cn("flex flex-col gap-2 lg:hidden", list.loading && "opacity-60")}>
          {rows.map((r, i) => {
            const d = diffDsl(r.expected, r.predicted);
            const res = resolved[i];
            return (
              <div key={r.id} className={cn("rounded-card border border-border p-3", picked.has(r.id) ? "bg-accent-soft/50" : "bg-surface")}>
                <div className="flex items-start gap-3">
                  <Checkbox className="mt-0.5 size-5" aria-label={`Select ${r.text}`} checked={picked.has(r.id)} onChange={(v) => toggle(r, v)} />
                  <div className="min-w-0 flex-1">
                    <div className="break-words font-medium">{r.text}</div>
                    <div className="mt-1 flex flex-wrap gap-1"><Badge tone="accent">{r.primary_tag}</Badge>{r.modifier_tags.map((m) => <Badge key={m}>{m}</Badge>)}<Badge className="text-subtle">{r.split}</Badge></div>
                  </div>
                </div>
                <div className="dotted-t mt-2.5 grid grid-cols-[64px_1fr] gap-x-2 gap-y-1.5 pt-2.5 text-[12px]">
                  <span className="text-subtle">Expected</span><Tokens tokens={d.expected} tone="ok" />
                  <span className="text-subtle">Predicted</span><Tokens tokens={d.predicted} tone="danger" />
                  <span className="text-subtle">Dates</span>
                  <span><span className="text-fg">{res?.exp}</span><br /><span className={res && res.exp === res.got ? "text-ok" : "text-danger"}>{res?.got}{res && res.exp === res.got && " (same dates)"}</span></span>
                </div>
              </div>
            );
          })}
          {!list.loading && rows.length === 0 && <Empty>No failures match these filters</Empty>}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-muted">
          <span className="num">{total === 0 ? 0 : page * PAGE + 1}-{Math.min(total, (page + 1) * PAGE)} of {total}</span>
          <div className="flex items-center gap-2">
            <Button size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <span className="num">Page {page + 1} of {pages}</span>
            <Button size="sm" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
