import * as RT from "@radix-ui/react-tooltip";

export function Tip({ label, children }: { label: React.ReactNode; children: React.ReactElement }) {
  return (
    <RT.Root delayDuration={250}>
      <RT.Trigger asChild>{children}</RT.Trigger>
      <RT.Portal>
        <RT.Content
          sideOffset={6}
          className="z-50 rounded-field border border-border bg-surface px-2 py-1 text-[12px] text-fg shadow-pop"
        >
          {label}
        </RT.Content>
      </RT.Portal>
    </RT.Root>
  );
}
