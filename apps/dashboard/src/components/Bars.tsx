import { cn } from "@/lib/utils";

export function Delta({ value, unit = "pt", invert }: { value: number; unit?: string; invert?: boolean }) {
  const good = invert ? value < 0 : value > 0;
  if (Math.abs(value) < 0.05) return <span className="num text-[11px] text-subtle">0.0 {unit}</span>;
  return (
    <span className={cn("num text-[11px] font-medium", good ? "text-ok" : "text-danger")}>
      {value > 0 ? "+" : ""}
      {value.toFixed(1)} {unit}
    </span>
  );
}
