import { Select } from "@/components/ui/select";
import { versionsOf } from "@/lib/evals";
import { useStore } from "@/lib/store";

/** Eval version selector. Every metric in the dashboard comes from the selected version. */
export function VersionSelect() {
  const { runs, version, setVersion } = useStore();
  const vs = versionsOf(runs);
  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden text-[12px] text-muted sm:inline">Eval</span>
      <Select
        className="w-[104px]"
        aria-label="Eval version"
        value={version}
        onChange={setVersion}
        options={vs.map((v) => ({ value: v.version, label: v.version, hint: `${v.count} runs` }))}
      />
    </div>
  );
}
