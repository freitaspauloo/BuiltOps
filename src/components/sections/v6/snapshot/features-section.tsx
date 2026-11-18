import type { Community } from "@/lib/types/community";
import { isEditorialVersion, isV6MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { AppIcon, getFeaturePillIcon } from "@/lib/icons";

export function FeaturesSection({
  data,
  siteVersion = "v3",
}: {
  data: NonNullable<Community["features"]>;
  images?: string[];
  siteVersion?: MicrositeVersionId;
}) {
  if (isEditorialVersion(siteVersion)) {
    const description = isV6MicrositeVersion(siteVersion)
      ? "Fifty years of craftsmanship, warranty coverage, and design support behind every home."
      : "Four decades of craftsmanship, warranty coverage, and design support behind every home.";

    return (
      <SectionShell id="features" siteVersion={siteVersion} reveal={false} muted>
        <SectionIntro
          label="Why Losani"
          title={data.title}
          description={description}
          showRule={false}
          className="mb-8 md:mb-10"
        />
        <div className="grid border-t border-border sm:grid-cols-2 sm:gap-x-12">
          {data.items.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 border-b border-border py-6 md:py-7"
            >
              <span className="icon-chip">
                <AppIcon icon={getFeaturePillIcon(item.title)} size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    );
  }

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
