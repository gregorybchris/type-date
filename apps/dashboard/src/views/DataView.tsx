import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Flow } from "@/components/Num";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Empty, Field, Input, PageHeader, SectionTitle, StatLabel } from "@/components/ui/misc";
import { Select } from "@/components/ui/select";
import { fetchEvalSummary, fetchSamples, useAsync } from "@/lib/api";
import { kindOf, versionKey } from "@/lib/evals";
import { useSetParams } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const PAGE = 40;

/** Eval sets: rows per split, sources, and a sample browser. Eval sets are immutable, so counts never change per version. */
export function DataView({ params }: { params: URLSearchParams }) {
  const { evalInfo, version: selected } = useStore();
  const setParams = useSetParams();
  const versions = useMemo(() => Object.keys(evalInfo).sort((a, b) => versionKey(b) - versionKey(a)), [evalInfo]);
  const version = params.get("v") || (evalInfo[selected] ? selected : versions[0]) || "";
  const info = evalInfo[version];
  const split = params.get("split") ?? "";
  const tag = params.get("tag") ?? "";
  const source = params.get("source") ?? "";
  const q = params.get("q") ?? "";
  const [qDraft, setQDraft] = useState(q);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => qDraft !== q && setParams({ q: qDraft || undefined }), 250);
    return () => clearTimeout(t);
  }, [qDraft, q, setParams]);
  useEffect(() => setPage(0), [version, split, tag, source, q]);

  const summary = useAsync(`sum|${version}`, (s) => (version ? fetchEvalSummary(version, s) : Promise.resolve(null)));
  const res = useAsync(`${version}|${split}|${tag}|${source}|${q}|${page}`, (s) =>
    version ? fetchSamples(version, { split, tag, source, q, offset: page * PAGE, limit: PAGE }, s) : Promise.resolve(null),
  );

  if (versions.length === 0) return <Empty>No eval sets found in evals/</Empty>;

  const splits = Object.entries(summary.data?.splits ?? {});
  const total = splits.reduce((a, [, s]) => a + s.n, 0);
  const sources = [...new Set(splits.flatMap(([, s]) => Object.keys(s.sources)))].sort();
  const maxN = Math.max(1, ...splits.map(([, s]) => s.n));
  const items = res.data?.items ?? [];
  const n = res.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(n / PAGE));

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Data" subtitle="Eval sets are versioned and immutable. Rows per split and source, and a browser for the rows.">
        <Select
          className="w-full sm:w-48"
          aria-label="Eval version"
          value={version}
          onChange={(v) => setParams({ v, split: undefined, tag: undefined, source: undefined })}
          options={versions.map((v) => ({ value: v, label: v, hint: kindOf(v) === "quick" ? "quick" : undefined }))}
        />
      </PageHeader>

      <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
        <div className="pr-3 sep-md"><StatLabel>Eval {version} rows</StatLabel><Flow value={total} className="mt-1 block text-[22px] font-medium" /></div>
        <div className="px-3 sep-md max-md:pl-3"><StatLabel>Splits</StatLabel><Flow value={splits.length} className="mt-1 block text-[22px] font-medium" /></div>
        <div className="px-3 sep-md max-md:pl-0"><StatLabel>Sources</StatLabel><Flow value={sources.length} className="mt-1 block text-[22px] font-medium" /></div>
        <div className="px-3"><StatLabel>Parent</StatLabel><div className="mt-1 text-[22px] font-medium">{info?.subset_of ? `subset of ${info.subset_of}` : (info?.parent ?? "none")}</div></div>
      </div>
      {info?.reason && <p className="-mt-4 max-w-[90ch] text-[12.5px] leading-5 text-muted">{info.created?.slice(0, 10)}. {info.reason}</p>}

      <section>
        <SectionTitle right={<span className="hidden text-[12px] text-subtle sm:inline">Click a row to filter the samples.</span>}>Splits and sources in {version}</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-[12.5px]">
            <thead>
              <tr className="dotted-b text-[12px] text-subtle">
                <th className="px-2 py-2 text-left font-medium">Split</th>
                <th className="px-2 py-2 text-left font-medium">Rows</th>
                <th className="px-2 py-2 text-right font-medium">n</th>
                <th className="px-2 py-2 text-left font-medium">Sources (rows)</th>
              </tr>
            </thead>
            <tbody>
              {splits.map(([s, v]) => (
                <tr key={s} onClick={() => setParams({ split: split === s ? undefined : s })} className={cn("cursor-pointer border-b border-border hover:bg-hover/70", split === s && "bg-hover")}>
                  <td className="px-2 py-2 font-medium">{s}</td>
                  <td className="w-[28%] px-2 py-2"><span className="block h-2 overflow-hidden rounded-full bg-sunken"><span className="block h-full rounded-full bg-accent" style={{ width: `${(v.n / maxN) * 100}%` }} /></span></td>
                  <td className="num px-2 py-2 text-right font-medium">{v.n.toLocaleString()}{v.n < 30 && <span className="ml-1 text-warn" title="Under 30 rows">!</span>}</td>
                  <td className="px-2 py-2"><div className="flex flex-wrap gap-1">{Object.entries(v.sources).map(([k, c]) => <Badge key={k}>{k} <span className="num">{c.toLocaleString()}</span></Badge>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {summary.loading && splits.length === 0 && <Empty>Loading</Empty>}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionTitle>Rows</SectionTitle>
        <div className="grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <Field label="Split"><Select className="w-full sm:w-44" value={split} onChange={(v) => setParams({ split: v || undefined })} options={splits.map(([s]) => ({ value: s, label: s }))} allLabel="All splits" /></Field>
          <Field label="Primary tag"><Select className="w-full sm:w-48" value={tag} onChange={(v) => setParams({ tag: v || undefined })} options={Object.keys(res.data?.facets.by_tag ?? {}).concat(tag && !res.data?.facets.by_tag[tag] ? [tag] : []).sort().map((s) => ({ value: s, label: s }))} allLabel="All tags" /></Field>
          <Field label="Source"><Select className="w-full sm:w-44" value={source} onChange={(v) => setParams({ source: v || undefined })} options={sources.map((s) => ({ value: s, label: s }))} allLabel="All sources" /></Field>
          <Field label="Text search" className="col-span-2 sm:col-span-1 sm:w-56"><div className="relative"><Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-subtle" /><Input className="pl-8" placeholder="Search text or DSL" value={qDraft} onChange={(e) => setQDraft(e.target.value)} /></div></Field>
        </div>
        <Card className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[820px] border-collapse text-[13px]">
            <thead><tr className="dotted-b text-left text-[12px] text-subtle"><th className="px-3 py-2.5 font-medium">Text</th><th className="px-2 py-2.5 font-medium">DSL</th><th className="px-2 py-2.5 font-medium">Tags</th><th className="px-2 py-2.5 font-medium">Source</th><th className="px-2 py-2.5 font-medium">Split</th></tr></thead>
            <tbody className={cn(res.loading && "opacity-60")}>
              {items.map((s) => (
                <tr key={`${s.split}${s.id}`} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-medium">{s.text}</td>
                  <td className="px-2 py-2"><code className="font-mono text-[12px]">{s.dsl}</code></td>
                  <td className="px-2 py-2"><div className="flex flex-wrap gap-1"><Badge tone="accent">{s.primary_tag}</Badge>{(s.modifier_tags ?? []).map((t) => <Badge key={t}>{t}</Badge>)}</div></td>
                  <td className="px-2 py-2 text-muted">{s.source}</td>
                  <td className="px-2 py-2 text-muted">{s.split}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!res.loading && items.length === 0 && <Empty>No rows match</Empty>}
        </Card>
        <div className={cn("flex flex-col gap-2 lg:hidden", res.loading && "opacity-60")}>
          {items.map((s) => (
            <div key={`${s.split}${s.id}`} className="rounded-card border border-border bg-surface p-3">
              <div className="break-words font-medium">{s.text}</div>
              <code className="mt-1 block break-all font-mono text-[12px] text-muted">{s.dsl}</code>
              <div className="mt-2 flex flex-wrap gap-1"><Badge tone="accent">{s.primary_tag}</Badge>{(s.modifier_tags ?? []).map((t) => <Badge key={t}>{t}</Badge>)}<Badge>{s.source}</Badge><Badge className="text-subtle">{s.split}</Badge></div>
            </div>
          ))}
          {!res.loading && items.length === 0 && <Empty>No rows match</Empty>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-muted">
          <span className="num">{n === 0 ? 0 : page * PAGE + 1}-{Math.min(n, (page + 1) * PAGE)} of {n.toLocaleString()}</span>
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
