import NumberFlow from "@number-flow/react";

/** Animated percent from a 0..1 value. */
export function Pct({ value, digits = 1, className }: { value: number; digits?: number; className?: string }) {
  return (
    <NumberFlow
      className={className}
      value={value}
      format={{ style: "percent", minimumFractionDigits: digits, maximumFractionDigits: digits }}
    />
  );
}

export function Flow({
  value,
  digits = 0,
  suffix,
  prefix,
  className,
  signed,
}: {
  value: number;
  digits?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  signed?: boolean;
}) {
  return (
    <NumberFlow
      className={className}
      value={value}
      suffix={suffix}
      prefix={prefix}
      format={{ minimumFractionDigits: digits, maximumFractionDigits: digits, signDisplay: signed ? "exceptZero" : "auto" }}
    />
  );
}
