import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { evalFor, notEvaluatedNote } from "@/lib/evals";
import { href } from "@/lib/router";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/** "N of M experiments are scored on e3", with the missing ones listed on demand. Hidden at full coverage. */
export function CoverageBanner() {
  const { runs, version } = useStore();
  const [open, setOpen] = useState(false);
  const missing = runs.filter((r) => !evalFor(r, version));
  if (runs.length === 0 || missing.length === 0) return null;
  const scored = runs.length - missing.length;
  return (
    <div className="rounded-card border border-warn/30 bg-warn-soft px-3 py-2 text-[13px] text-warn">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full cursor-pointer items-center justify-between gap-3 text-left">
        <span><b className="num font-semibold">{scored} of {runs.length}</b> experiments are scored on <b>{version}</b>. {missing.length} {open ? "listed below" : "missing"}.</span>
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
