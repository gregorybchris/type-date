import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDown, ArrowUp, CornerDownLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export interface Command {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
}

function score(q: string, c: Command): number {
  const hay = `${c.label} ${c.hint ?? ""}`.toLowerCase();
  if (!q) return 1;
  const i = hay.indexOf(q);
  if (i >= 0) return 100 - i;
  // Subsequence match.
  let j = 0;
  for (const ch of hay) if (ch === q[j]) j++;
  return j === q.length ? 1 : 0;
}

export function CommandPalette({ open, onOpenChange, commands }: { open: boolean; onOpenChange: (v: boolean) => void; commands: Command[] }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return commands
      .map((c) => ({ c, s: score(needle, c) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => (needle ? b.s - a.s : 0))
      .map((x) => x.c);
  }, [q, commands]);

  useEffect(() => setIdx(0), [q, open]);
  useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-idx="${idx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const run = (c?: Command) => {
    if (!c) return;
    onOpenChange(false);
    setTimeout(c.run, 0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[idx]);
    }
  };

  let lastGroup = "";
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          onKeyDown={onKey}
          className="fixed left-1/2 top-[8dvh] sm:top-[18dvh] z-50 w-[min(600px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-[18px] border border-border bg-surface shadow-pop outline-none"
        >
          <Dialog.Title className="sr-only">Quick switcher</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 text-subtle" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search views and engines"
              className="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
            />
          </div>
          <div ref={list} className="max-h-[min(340px,50dvh)] overflow-y-auto p-2">
            {results.length === 0 && <div className="py-8 text-center text-[13px] text-subtle">No matches</div>}
            {results.map((c, i) => {
              const head = c.group !== lastGroup;
              lastGroup = c.group;
              return (
                <div key={c.id}>
                  {head && <div className="px-2 pb-1 pt-2 text-[12px] font-medium text-subtle">{c.group}</div>}
                  <button
                    data-idx={i}
                    onMouseMove={() => setIdx(i)}
                    onClick={() => run(c)}
                    className={cn("flex w-full cursor-pointer items-center gap-3 rounded-field px-2 py-2 text-left", i === idx && "bg-hover")}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-border bg-surface text-muted shadow-input [&_svg]:size-3.5">{c.icon}</span>
                    <span className="text-[14px] font-medium text-fg">{c.label}</span>
                    {c.hint && <span className="truncate text-[13px] text-muted">{c.hint}</span>}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="dotted-t flex items-center gap-3 px-4 py-3 text-[12px] text-muted">
            <span className="flex items-center gap-1.5"><Kbd><ArrowUp className="size-3" /></Kbd><Kbd><ArrowDown className="size-3" /></Kbd> navigate</span>
            <span className="flex items-center gap-1.5"><Kbd><CornerDownLeft className="size-3" /></Kbd> open</span>
            <span className="flex items-center gap-1.5"><Kbd className="px-1.5">esc</Kbd> close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
