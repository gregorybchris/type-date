import { cn } from "@/lib/utils";

/** Key hint chip, as in the command palette reference. */
export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-border-strong bg-surface px-1 font-sans text-[11px] font-medium text-muted shadow-input",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
