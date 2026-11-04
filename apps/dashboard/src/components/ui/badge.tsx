import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badge = cva("inline-flex items-center gap-1 whitespace-nowrap rounded-chip border px-1.5 py-0.5 text-[11px] font-medium leading-4", {
  variants: {
    tone: {
      neutral: "border-border bg-surface text-muted",
      accent: "border-accent/30 bg-accent-soft text-accent",
      ok: "border-ok/25 bg-ok-soft text-ok",
      danger: "border-danger/25 bg-danger-soft text-danger",
      warn: "border-warn/30 bg-warn-soft text-warn",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export function Badge({ tone, className, ...p }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>) {
  return <span className={cn(badge({ tone }), className)} {...p} />;
}
