import { m } from "motion/react";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Empty, Field, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Segmented } from "@/components/ui/segmented";
import { Select } from "@/components/ui/select";
import { fetchSamples, useAsync } from "@/lib/api";
import { useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const PAGE = 40;

export function DataView({ params }: { params: URLSearchParams }) {
  const { datasets } = useStore();
  const setParams = useSetParams();
  const version = params.get("v") || datasets[datasets.length - 1]?.version || "";
  const ds = datasets.find((d) => d.version === version);
  const split = params.get("split") ?? "";
  const tag = params.get("tag") ?? "";
  const modifier = params.get("modifier") ?? "";
  const source = params.get("source") ?? "";
  const q = params.get("q") ?? "";
  const [qDraft, setQDraft] = useState(q);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => qDraft !== q && setParams({ q: qDraft || undefined }), 250);
    return () => clearTimeout(t);
  }, [qDraft, q, setParams]);
  useEffect(() => setPage(0), [version, split, tag, modifier, source, q]);

  const res = useAsync(`${version}|${split}|${tag}|${modifier}|${source}|${q}|${page}`, (s) =>
    version ? fetchSamples(version, { split, tag, modifier, source, q, offset: page * PAGE, limit: PAGE }, s) : Promise.resolve(null),
  );

  const splits = useMemo(() => (ds ? Object.keys(ds.counts) : []), [ds]);
  const total = useMemo(() => (ds ? Object.values(ds.counts).reduce((a, b) => a + b, 0) : 0), [ds]);
  const tags = useMemo(() => (ds ? Object.keys(ds.by_tag).sort() : []), [ds]);
  const maxCount = Math.max(1, ...(ds ? Object.values(ds.counts) : [1]));
  const maxCell = Math.max(1, ...(ds ? Object.values(ds.by_tag).flatMap((x) => Object.values(x)) : [1]));

  if (!ds) return <Empty>No datasets found in data/</Empty>;
  const items = res.data?.items ?? [];
  const n = res.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(n / PAGE));

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Data" subtitle="Dataset versions, counts by split and tag, and a sample browser.">
        <Segmented value={version} onChange={(v) => setParams({ v, split: undefined, tag: undefined, modifier: undefined, source: undefined })} options={datasets.map((d) => ({ value: d.version, label: d.version }))} />
      </PageHeader>

      <div className="grid grid-cols-2 gap-y-4 md:grid-cols-6">
        <div className="pr-3 sep-md"><StatLabel>Total</StatLabel><Flow value={total} className="mt-1 block text-[22px] font-medium" /></div>
        {splits.slice(0, 5).map((s, i) => (
          <div key={s} className={cn("px-3 max-md:odd:pl-0", i < splits.length - 1 && i < 4 && "sep-md")}>
            <StatLabel>{s}</StatLabel><Flow value={ds.counts[s]!} className="mt-1 block text-[22px] font-medium" />
          </div>
        ))}
      </div>
      <p className="-mt-4 text-[12px] text-subtle">Created {ds.created.slice(0, 16).replace("T", " ")}. {ds.notes}</p>

      <section>
        <SectionTitle>Counts by split</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {splits.map((s, i) => (
            <button key={s} onClick={() => setParams({ split: split === s ? undefined : s })} className={cn("grid cursor-pointer grid-cols-[100px_1fr_48px] sm:grid-cols-[130px_1fr_60px] items-center gap-3 rounded-[6px] px-1.5 py-1 text-left hover:bg-hover", split === s && "bg-hover")}>
              <span className="text-[12.5px]">{s}</span>
              <span className="h-2 overflow-hidden rounded-full bg-sunken"><m.span className="block h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: `${(ds.counts[s]! / maxCount) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }} /></span>
              <span className="num text-right text-[12px] font-medium">{ds.counts[s]}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle right={<span className="hidden text-[12px] text-subtle sm:inline">Click a tag to filter samples.</span>}>Counts by tag and split</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-[12.5px]">
            <thead>
              <tr className="dotted-b text-[12px] text-subtle">
                <th className="px-2 py-2 text-left font-medium">Tag</th>
                {splits.map((s) => <th key={s} className="px-2 py-2 text-right font-medium">{s}</th>)}
                <th className="px-2 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((t) => {
                const row = ds.by_tag[t]!;
                const sum = Object.values(row).reduce((a, b) => a + b, 0);
                return (
                  <tr key={t} onClick={() => setParams({ tag: tag === t ? undefined : t })} className={cn("cursor-pointer border-b border-border hover:bg-hover/70", tag === t && "bg-hover")}>
                    <td className="px-2 py-1.5 font-medium">{t}</td>
                    {splits.map((s) => {
                      const v = row[s] ?? 0;
                      return (
                        <td key={s} className="num px-2 py-1.5 text-right text-muted" style={{ background: v ? `color-mix(in srgb, var(--accent) ${Math.round((v / maxCell) * 22)}%, transparent)` : undefined }}>{v || "-"}</td>
                      );
                    })}
                    <td className="num px-2 py-1.5 text-right font-medium">{sum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionTitle>Samples</SectionTitle>
        <div className="grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <Field label="Split"><Select className="w-full sm:w-40" value={split} onChange={(v) => setParams({ split: v || undefined })} options={splits.map((s) => ({ value: s, label: s }))} allLabel="All splits" /></Field>
          <Field label="Primary tag"><Select className="w-full sm:w-48" value={tag} onChange={(v) => setParams({ tag: v || undefined })} options={tags.map((s) => ({ value: s, label: s }))} allLabel="All tags" /></Field>
          <Field label="Modifier"><Select className="w-full sm:w-40" value={modifier} onChange={(v) => setParams({ modifier: v || undefined })} options={Object.keys(res.data?.facets.by_modifier ?? {}).concat(modifier && !res.data?.facets.by_modifier[modifier] ? [modifier] : []).sort().map((s) => ({ value: s, label: s }))} allLabel="All modifiers" /></Field>
          <Field label="Source"><Select className="w-full sm:w-36" value={source} onChange={(v) => setParams({ source: v || undefined })} options={["grammar", "llm", "mined", "handwritten", "noise", "prefix"].map((s) => ({ value: s, label: s }))} allLabel="All sources" /></Field>
          <Field label="Text search" className="col-span-2 sm:col-span-1 sm:w-56"><div className="relative"><Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" /><Input className="pl-8" placeholder="Search text or DSL" value={qDraft} onChange={(e) => setQDraft(e.target.value)} /></div></Field>
        </div>
        <Card className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[820px] border-collapse text-[13px]">
            <thead><tr className="dotted-b text-left text-[12px] text-subtle"><th className="px-3 py-2.5 font-medium">Text</th><th className="px-2 py-2.5 font-medium">DSL</th><th className="px-2 py-2.5 font-medium">Tags</th><th className="px-2 py-2.5 font-medium">Source</th><th className="px-2 py-2.5 font-medium">Split</th></tr></thead>
            <tbody className={cn(res.loading && "opacity-60")}>
              {items.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-medium">{s.text}</td>
                  <td className="px-2 py-2"><code className="font-mono text-[12px]">{s.dsl}</code></td>
                  <td className="px-2 py-2"><div className="flex flex-wrap gap-1"><Badge tone="accent">{s.primary_tag}</Badge>{s.modifier_tags.map((t) => <Badge key={t}>{t}</Badge>)}</div></td>
                  <td className="px-2 py-2 text-muted">{s.source}</td>
                  <td className="px-2 py-2 text-muted">{s.split}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!res.loading && items.length === 0 && <Empty>No samples match</Empty>}
        </Card>
        <div className={cn("flex flex-col gap-2 lg:hidden", res.loading && "opacity-60")}>
          {items.map((s) => (
            <div key={s.id} className="rounded-card border border-border bg-surface p-3">
              <div className="break-words font-medium">{s.text}</div>
              <code className="mt-1 block break-all font-mono text-[12px] text-muted">{s.dsl}</code>
              <div className="mt-2 flex flex-wrap gap-1"><Badge tone="accent">{s.primary_tag}</Badge>{s.modifier_tags.map((t) => <Badge key={t}>{t}</Badge>)}<Badge>{s.source}</Badge><Badge className="text-subtle">{s.split}</Badge></div>
            </div>
          ))}
          {!res.loading && items.length === 0 && <Empty>No samples match</Empty>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-muted">
          <span className="num">{n === 0 ? 0 : page * PAGE + 1}-{Math.min(n, (page + 1) * PAGE)} of {n}</span>
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
