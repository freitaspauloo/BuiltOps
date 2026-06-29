import type { QuickFacts } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSnapshotIcon } from "@/lib/icons";

export function QuickFactsSection({
  data,
  siteVersion = "v2",
}: {
  data: QuickFacts;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="quickFacts" siteVersion={siteVersion}>      <SectionHeading eyebrow="Details" title={data.title ?? "Quick facts"} />
      <PillGroup>
        {data.facts.map((fact) => (
          <Pill key={fact.label} icon={getSnapshotIcon(fact.label)}>
            {fact.value}
          </Pill>
        ))}
      </PillGroup>
    </SectionShell>
  );
}
