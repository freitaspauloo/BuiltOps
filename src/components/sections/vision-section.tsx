import type { CommunityVision } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSectionIcon } from "@/lib/icons";

export function VisionSection({
  data,
  siteVersion = "v2",
}: {
  data: CommunityVision;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="vision" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Vision"
        title={data.title}
        description={data.description}
        siteVersion={siteVersion}
      />
      {data.highlights && data.highlights.length > 0 && (
        <PillGroup className="mt-10">
          {data.highlights.map((item) => (
            <Pill key={item} icon={getSectionIcon("vision")}>
              {item}
            </Pill>
          ))}
        </PillGroup>
      )}
    </SectionShell>
  );
}
