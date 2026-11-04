import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { evalFor, kindOf, notEvaluatedNote, versionKey, versionsOf } from "@/lib/evals";
import { href } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/** "N of M engines are scored on e3", with the missing ones listed on demand. Hidden at full coverage. */
export function CoverageBanner() {
  const { runs, version } = useStore();
  const [open, setOpen] = useState(false);
  const missing = runs.filter((r) => !evalFor(r, version));
  if (runs.length === 0 || missing.length === 0) return null;
  const scored = runs.length - missing.length;
  return (
    <div className="rounded-card border border-warn/30 bg-warn-soft px-3 py-2 text-[13px] text-warn">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full cursor-pointer items-center justify-between gap-3 text-left">
        <span><b className="num font-semibold">{scored} of {runs.length}</b> engines are scored on <b>{version}</b>. {missing.length} {open ? "listed below" : "missing"}.</span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="grid gap-x-6 gap-y-1 pt-2 sm:grid-cols-2">
              {missing.map((r) => (
                <li key={r.config.id} className="list-none truncate text-[12.5px]">
                  <a href={href("experiments", r.config.id)} className="font-medium underline decoration-warn/40 underline-offset-2 hover:decoration-warn">{r.config.id}</a>{" "}
                  <span className="opacity-80" title={notEvaluatedNote(r, version)}>{r.config.title}</span>
                </li>
              ))}
            </div>
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Engine by eval version. Each cell is the number of rows scored; a hatched cell means no results. */
export function CoverageMatrix() {
  const { runs, version, setVersion } = useStore();
  const versions = versionsOf(runs).sort((a, b) => versionKey(a.version) - versionKey(b.version));
  const total = runs.length * versions.length;
  const gaps = runs.reduce((n, r) => n + versions.filter((v) => !evalFor(r, v.version)).length, 0);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-[12px]">
          <thead>
            <tr className="text-subtle">
              <th className="sticky left-0 bg-surface px-2 py-2 text-left font-medium">Engine</th>
              {versions.map((v) => (
                <th key={v.version} className="px-1 py-2 text-right font-medium">
                  <button onClick={() => setVersion(v.version)} className={cn("cursor-pointer rounded-chip px-1 py-0.5", v.version === version ? "bg-accent-soft text-accent" : "hover:bg-hover")} title={kindOf(v.version) === "quick" ? "Quick subset" : undefined}>{v.version}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.config.id} className="border-t border-border">
                <td className="sticky left-0 bg-surface px-2 py-1.5 font-medium"><a href={href("experiments", r.config.id)} className="hover:underline">{r.config.title}</a></td>
                {versions.map((v) => {
                  const ev = evalFor(r, v.version);
                  return ev ? (
                    <td key={v.version} className="num px-1 py-1.5 text-right text-muted">{ev.n.toLocaleString()}</td>
                  ) : (
                    <td key={v.version} className="px-1 py-1.5 text-right text-subtle" style={{ background: "repeating-linear-gradient(135deg, var(--warn-soft) 0 4px, transparent 4px 8px)" }} title={`${r.config.title} has no results on ${v.version}`}>none</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 px-1 text-[11.5px] text-subtle">Rows scored per engine and eval version. {gaps === 0 ? `All ${total} cells have results.` : `${gaps} of ${total} cells have no results.`} Click a version to select it.</p>
    </div>
  );
}
