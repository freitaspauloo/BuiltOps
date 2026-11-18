"use client";

import type { Community } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { AreaMapPanel } from "./area-map-panel";

export function AreaMapSection({
  data,
  siteVersion = "v3",
}: {
  data: NonNullable<Community["areaMap"]>;
  siteVersion?: MicrositeVersionId;
}) {
  if (isEditorialVersion(siteVersion)) {
    return (
      <SectionShell id="areaMap" siteVersion={siteVersion} reveal={false} className="v3-map-band">
        <AreaMapPanel
          points={data.points}
          variant="dark"
          layout="editorial"
          intro={{
            label: "Location",
            title: data.title,
            description: "Schools, parks, shopping, and wine country amenities nearby.",
          }}
        />
      </SectionShell>
    );
  }

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
