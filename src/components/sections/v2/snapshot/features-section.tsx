import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";

export function FeaturesSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["features"]>;
  siteVersion?: MicrositeVersionId;
}) {
  const carouselItems = data.items.map((item) => ({
    name: item.title,
    description: item.description,
  }));

  return (
    <SectionShell id="features" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Builder" title={data.title} siteVersion={siteVersion} />
      <div className="features-carousel-bleed -mt-2 md:-mt-4">
        <LogoCarousel
          items={carouselItems}
          ariaLabel={data.title}
          className="py-4 md:py-6"
        />
      </div>
    </SectionShell>
  );
}
