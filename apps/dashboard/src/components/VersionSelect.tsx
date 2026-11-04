import { Select, type Option } from "@/components/ui/select";
import { evalFor, kindOf, versionKey, versionsOf } from "@/lib/evals";
import { useStore } from "@/lib/store";

const GROUP = { full: "Full eval sets", quick: "Quick subsets", other: "Other" } as const;

/** First sentence of the manifest reason, cut to fit a menu line. */
function short(reason?: string): string | undefined {
  if (!reason) return undefined;
  const first = reason.split(/(?<=\.)\s/)[0] ?? reason;
  return first.length > 90 ? `${first.slice(0, 88)}...` : first;
}

/** Eval version selector. Every metric in the dashboard comes from the selected version. */
export function VersionSelect() {
  const { runs, version, setVersion, evalInfo } = useStore();
  const order = { full: 0, quick: 1, other: 2 } as const;
  const options: Option[] = versionsOf(runs)
    .sort((a, b) => order[kindOf(a.version)] - order[kindOf(b.version)] || versionKey(b.version) - versionKey(a.version))
    .map((v) => ({
      value: v.version,
      label: v.version,
      hint: `${runs.filter((r) => evalFor(r, v.version)).length} of ${runs.length}`,
      description: short(evalInfo[v.version]?.reason),
      group: GROUP[kindOf(v.version)],
    }));
  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden text-[12px] text-muted sm:inline">Eval</span>
      <Select className="w-[104px]" aria-label="Eval version" value={version} onChange={setVersion} options={options} />
    </div>
  );
}
