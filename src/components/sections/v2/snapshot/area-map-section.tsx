"use client";

import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { AreaMapPanel } from "./area-map-panel";

export function AreaMapSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["areaMap"]>;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="areaMap" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Location"
        title={data.title}
        description="Schools, parks, shopping, and wine country amenities nearby."
        siteVersion={siteVersion}
      />
      <AreaMapPanel points={data.points} />
    </SectionShell>
  );
}
