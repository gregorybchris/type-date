import * as RS from "@radix-ui/react-switch";

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-muted">
      <RS.Root
        checked={checked}
        onCheckedChange={onChange}
        className="relative h-[18px] w-8 rounded-full border border-border bg-sunken transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      >
        <RS.Thumb className="block size-3.5 translate-x-0.5 rounded-full bg-surface shadow transition-transform data-[state=checked]:translate-x-[15px] data-[state=checked]:bg-primary-fg" />
      </RS.Root>
      {label}
    </label>
  );
}
