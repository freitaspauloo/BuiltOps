import type { Community } from "@/lib/types/community";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { Pill, PillGroup } from "@/components/ui/pill";
import { AppIcon, getAmenityIcon } from "@/lib/icons";

/** v1 — amenity pills plus description grid */
export function AmenitiesSectionV1({ data }: { data: NonNullable<Community["amenities"]> }) {
  return (
    <SectionShell id="amenities" siteVersion="v1">
      <SectionHeading eyebrow="Lifestyle" title={data.title} />
      <PillGroup className="mb-10">
        {data.items.map((item) => (
          <Pill key={item.title} icon={getAmenityIcon(item.icon)}>
            {item.title}
          </Pill>
        ))}
      </PillGroup>
      <div className="grid gap-6 sm:grid-cols-2">
        {data.items.map((item) => (
          <div key={item.title} className="max-w-md">
            <div className="mb-2 flex items-center gap-2">
              <AppIcon icon={getAmenityIcon(item.icon)} size={18} className="text-primary" />
              <p className="font-semibold text-foreground">{item.title}</p>
            </div>
            <p className="text-sm leading-relaxed text-body">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
