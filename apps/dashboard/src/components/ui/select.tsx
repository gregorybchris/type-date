import * as RS from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

const ALL = "__all__";

/** Radix select. Pass `allLabel` to add an empty "All" choice (value ""). */
export function Select({
  value,
  onChange,
  options,
  allLabel,
  placeholder,
  className,
  "aria-label": aria,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  allLabel?: string;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}) {
  const v = value === "" && allLabel ? ALL : value;
  return (
    <RS.Root value={v || undefined} onValueChange={(x) => onChange(x === ALL ? "" : x)}>
      <RS.Trigger
        aria-label={aria}
        className={cn(
          "inline-flex h-8 min-w-0 cursor-pointer items-center justify-between gap-2 rounded-field border border-border bg-surface px-2.5 text-[13px] text-fg shadow-input outline-none transition-shadow hover:bg-hover focus:border-accent focus:ring-[3px] focus:ring-accent/15 data-[placeholder]:text-subtle",
          className,
        )}
      >
        <span className="truncate">
          <RS.Value placeholder={placeholder} />
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-subtle" />
      </RS.Trigger>
      <RS.Portal>
        <RS.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-card border border-border bg-surface p-1 shadow-pop"
        >
          <RS.Viewport>
            {allLabel && <Item value={ALL} label={allLabel} />}
            {options.map((o) => (
              <Item key={o.value} value={o.value} label={o.label} hint={o.hint} />
            ))}
          </RS.Viewport>
        </RS.Content>
      </RS.Portal>
    </RS.Root>
  );
}

function Item({ value, label, hint }: { value: string; label: string; hint?: string }) {
  return (
    <RS.Item
      value={value}
      className="relative flex cursor-pointer select-none items-center gap-2 rounded-[6px] py-1.5 pl-2 pr-7 text-[13px] text-fg outline-none data-[highlighted]:bg-hover"
    >
      <RS.ItemText>{label}</RS.ItemText>
      {hint && <span className="ml-auto text-[11px] text-subtle">{hint}</span>}
      <RS.ItemIndicator className="absolute right-2">
        <Check className="size-3.5 text-accent" />
      </RS.ItemIndicator>
    </RS.Item>
  );
}
