import { localToday } from "@type-date/core";
import { Copy, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Empty, Field, Input, PageHeader, SectionTitle } from "@/components/ui/misc";
import { Select } from "@/components/ui/select";
import { fetchErrors, useAsync } from "@/lib/api";
import { diffDsl, type DiffToken } from "@/lib/diff";
import { resolveText } from "@/lib/format";
import { href, navigate, useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import type { ErrorRow } from "@/lib/types";
import { cn } from "@/lib/utils";

const PAGE = 40;

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
  const { runs, run: getRun } = useStore();
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
  useEffect(() => setPage(0), [expId, tag, modifier, split, q]);
  useEffect(() => setPicked(new Map()), [expId]);

  const list = useAsync(`${expId}|${tag}|${modifier}|${split}|${q}|${page}`, (s) => fetchErrors(expId, { tag, modifier, split, q, offset: page * PAGE, limit: PAGE }, s));
  const base = useAsync(`${expId}|${split}|${q}`, (s) => fetchErrors(expId, { split, q, limit: 1 }, s));

  const rows = list.data?.items ?? [];
  const today0 = today || localToday();
  const resolved = useMemo(() => rows.map((r) => ({ exp: resolveText(r.expected, today0), got: resolveText(r.predicted, today0) })), [rows, today0]);

  if (!run) return <Empty>No experiment selected</Empty>;
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

  const maxTag = Math.max(1, ...Object.values(base.data?.facets.by_tag ?? { x: 1 }));
  const tagOptions = Object.keys(run.metrics.eval.by_tag).sort().map((t) => ({ value: t, label: t }));
  const modOptions = Object.keys(run.metrics.eval.by_modifier).sort().map((t) => ({ value: t, label: t }));
  const splitOptions = Object.keys(run.metrics.eval.by_split).map((t) => ({ value: t, label: t }));

  const copySelected = async () => {
    const out = [...picked.values()];
    await copy(toJsonl(out));
    toast.success(`Copied ${out.length} failures as JSONL`);
  };
  const selectAllFiltered = async () => {
    const all = await fetchErrors(expId, { tag, modifier, split, q, limit: 5000 });
    setPicked((p) => new Map([...p, ...all.items.map((r) => [r.id, r] as const)]));
    toast(`Selected ${all.items.length} failures`);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Error analysis" subtitle="Failures by tag. Select rows and copy them as JSONL to steer data generation.">
        <Select
          className="w-64"
          value={expId}
          onChange={(v) => navigate(href("errors", v))}
          options={runs.map((r) => ({ value: r.config.id, label: r.config.id, hint: r.config.title }))}
          aria-label="Experiment"
        />
      </PageHeader>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
        <section>
          <SectionTitle right={<span className="text-[12px] text-subtle">Failures per primary tag. Click to filter.</span>}>Failures by tag</SectionTitle>
          <div className="flex flex-col">
            {Object.entries(base.data?.facets.by_tag ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, n]) => (
              <button key={k} onClick={() => setParams({ tag: tag === k ? undefined : k })} className={cn("grid cursor-pointer grid-cols-[minmax(0,170px)_1fr_40px] items-center gap-3 rounded-[6px] px-1.5 py-[5px] text-left hover:bg-hover", tag === k && "bg-hover")}>
                <span className="truncate text-[12.5px]">{k}</span>
                <span className="h-2 overflow-hidden rounded-full bg-sunken"><span className="block h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(n / maxTag) * 100}%` }} /></span>
                <span className="num text-right text-[12px] font-medium">{n}</span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <SectionTitle>Failures by modifier</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(base.data?.facets.by_modifier ?? {}).sort((a, b) => b[1] - a[1]).map(([k, n]) => (
              <button key={k} onClick={() => setParams({ modifier: modifier === k ? undefined : k })} className={cn("inline-flex cursor-pointer items-center gap-1.5 rounded-chip border px-2 py-1 text-[12px] transition-colors", modifier === k ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface text-muted hover:bg-hover")}>
                {k}<span className="num font-medium text-fg">{n}</span>
              </button>
            ))}
          </div>
          <div className="mt-5 text-[12px] text-muted">
            <span className="num font-medium text-fg"><Flow value={base.data?.total ?? 0} /></span> failures of <span className="num">{run.metrics.eval.n}</span> eval examples in {run.config.id}.
          </div>
        </section>
      </div>

      <div className="dotted-t" />

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <Field label="Primary tag"><Select className="w-48" value={tag} onChange={(v) => setParams({ tag: v || undefined })} options={tagOptions} allLabel="All tags" /></Field>
          <Field label="Modifier"><Select className="w-40" value={modifier} onChange={(v) => setParams({ modifier: v || undefined })} options={modOptions} allLabel="All modifiers" /></Field>
          <Field label="Split"><Select className="w-40" value={split} onChange={(v) => setParams({ split: v || undefined })} options={splitOptions} allLabel="All splits" /></Field>
          <Field label="Text search" className="w-56">
            <div className="relative"><Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" /><Input className="pl-8" placeholder="Search text or DSL" value={qDraft} onChange={(e) => setQDraft(e.target.value)} /></div>
          </Field>
          <Field label="Today"><Input type="date" className="w-40" value={today} onChange={(e) => setToday(e.target.value)} /></Field>
          <div className="ml-auto flex items-center gap-2">
            <span className="num text-[12px] text-muted">{picked.size} selected</span>
            <Button onClick={selectAllFiltered} disabled={total === 0}>Select all {total}</Button>
            <Button onClick={() => setPicked(new Map())} disabled={picked.size === 0} variant="ghost">Clear</Button>
            <Button variant="primary" onClick={copySelected} disabled={picked.size === 0}><Copy />Copy JSONL</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
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

        <div className="flex items-center justify-between text-[12px] text-muted">
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
