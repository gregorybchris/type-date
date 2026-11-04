import * as RC from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onChange,
  className,
  "aria-label": aria,
}: {
  checked: boolean | "indeterminate";
  onChange: (v: boolean) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <RC.Root
      aria-label={aria}
      checked={checked}
      onCheckedChange={(v) => onChange(v === true)}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[5px] border border-border-strong bg-surface shadow-input transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        className,
      )}
    >
      <RC.Indicator className="text-primary-fg">
        {checked === "indeterminate" ? <Minus className="size-3" strokeWidth={3} /> : <Check className="size-3" strokeWidth={3} />}
      </RC.Indicator>
    </RC.Root>
  );
}
