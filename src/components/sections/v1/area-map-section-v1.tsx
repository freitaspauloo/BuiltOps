"use client";

import type { Community } from "@/lib/types/community";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { AreaMapPanel } from "../area-map-panel";

export function AreaMapSectionV1({ data }: { data: NonNullable<Community["areaMap"]> }) {
  return (
    <SectionShell id="areaMap" siteVersion="v1">
      <SectionHeading eyebrow="Location" title={data.title} />
      <AreaMapPanel points={data.points} listVariant="v1" />
    </SectionShell>
  );
}
