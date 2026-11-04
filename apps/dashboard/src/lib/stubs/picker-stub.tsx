import { resolveDsl, type Resolved } from "@type-date/core";
import { useEffect, useRef, useState } from "react";
import { fmtResolved } from "../format";

// Same props as the picker contract in specs/contracts.md.
export interface TypeDatePickerProps {
  parse: (text: string) => Promise<string>;
  value?: Resolved;
  onChange?: (r: Resolved) => void;
  today?: string;
  weekStart?: 0 | 1;
  debounceMs?: number;
  theme?: "light" | "dark" | "system";
  placeholder?: string;
}

/** Placeholder until packages/picker exists: a text field and a one-line result. */
export function TypeDatePicker({ parse, onChange, today, weekStart, debounceMs = 120, placeholder }: TypeDatePickerProps) {
  const [text, setText] = useState("");
  const [res, setRes] = useState<Resolved | null>(null);
  const seq = useRef(0);
  useEffect(() => {
    const id = ++seq.current;
    const t = setTimeout(() => {
      parse(text)
        .then((dsl) => {
          if (id !== seq.current) return;
          const r = resolveDsl(dsl, { today, weekStart });
          setRes(r);
          onChange?.(r);
        })
        .catch(() => {});
    }, debounceMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, today, weekStart, debounceMs]);
  return (
    <div className="flex flex-col gap-3">
      <input
        className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        placeholder={placeholder ?? "Type a date"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-sm text-muted">{res ? fmtResolved(res) : "Stub picker. packages/picker is not wired yet."}</div>
    </div>
  );
}
