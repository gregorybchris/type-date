import { m } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Pill group with a white selected segment (segmented tabs reference). */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: React.ReactNode }>;
  className?: string;
}) {
  const id = useId();
  return (
    <div role="tablist" className={cn("inline-flex max-w-full overflow-x-auto rounded-field border border-border bg-sunken p-0.5", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative h-8 shrink-0 cursor-pointer whitespace-nowrap rounded-[6px] px-3 md:h-7 text-[13px] font-medium transition-colors",
              on ? "text-fg" : "text-subtle hover:text-fg",
            )}
          >
            {on && (
              <m.span
                layoutId={`seg-${id}`}
                className="absolute inset-0 rounded-[6px] border border-border bg-surface shadow-input"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
