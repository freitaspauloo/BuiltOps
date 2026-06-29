import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { AppIcon, getAmenityIcon } from "@/lib/icons";

export function AmenitiesSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["amenities"]>;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="amenities" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Lifestyle"
        title={data.title}
        description="Everything that makes this neighbourhood worth calling home."
        siteVersion={siteVersion}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {data.items.map((item) => (
          <article key={item.title} className="card-interactive p-7 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-primary-muted text-primary">
                <AppIcon icon={getAmenityIcon(item.icon)} size={20} />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-body md:text-base">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
