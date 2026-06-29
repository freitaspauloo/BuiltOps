"use client";

import type { Community } from "@/lib/types/community";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { Pill } from "@/components/ui/pill";
import { getAreaCategoryPillIcon } from "@/lib/icons";

/** v1 — photo placeholder map with pin overlay */
export function AreaMapSectionV1({ data }: { data: NonNullable<Community["areaMap"]> }) {
  return (
    <SectionShell id="areaMap" siteVersion="v1">
      <SectionHeading eyebrow="Location" title={data.title} />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-border bg-card">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center opacity-30" />
          {data.points.map((point) => (
            <div
              key={point.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (point.lng + 79.5) * 400}%`,
                top: `${30 + (43.2 - point.lat) * 800}%`,
              }}
            >
              <span className="block h-2.5 w-2.5 bg-primary ring-2 ring-white" />
            </div>
          ))}
        </div>
        <ul className="space-y-3">
          {data.points.map((point) => (
            <li key={point.id} className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm font-medium">{point.label}</span>
              <Pill icon={getAreaCategoryPillIcon(point.category)} className="capitalize">
                {point.category}
              </Pill>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
