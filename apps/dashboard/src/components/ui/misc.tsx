import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-card border border-border bg-surface", className)} {...p} />;
}

export function Input({ className, ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-8 w-full rounded-field border border-border bg-surface px-2.5 text-[13px] text-fg shadow-input outline-none transition-shadow placeholder:text-subtle focus:border-accent focus:ring-[3px] focus:ring-accent/15",
        className,
      )}
      {...p}
    />
  );
}

export function Dotted({ className }: { className?: string }) {
  return <div className={cn("dotted-t h-0", className)} />;
}

/** Small uppercase indigo label above a value, as in the profile stats reference. */
export function StatLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("label-caps", className)}>{children}</div>;
}

export function PageHeader({ title, subtitle, children }: { title: React.ReactNode; subtitle?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-[17px] font-semibold tracking-tight text-fg">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function SectionTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[13px] font-semibold text-fg">{children}</h2>
      {right}
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="flex h-32 items-center justify-center text-[13px] text-subtle">{children}</div>;
}

export function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1", className)}>
      <span className="text-[12px] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
