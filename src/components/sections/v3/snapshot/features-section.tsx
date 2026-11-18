"use client";

import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { ScrollRevealContentA } from "./scroll-reveal-content-a";
import { getFeaturePillIcon } from "@/lib/icons";

export function FeaturesSection({
  data,
  siteVersion = "v3",
}: {
  data: NonNullable<Community["features"]>;
  images?: string[];
  siteVersion?: MicrositeVersionId;
}) {
  if (siteVersion === "v3") {
    const revealItems = data.items.map((item) => ({
      title: item.title,
      description: item.description,
      icon: getFeaturePillIcon(item.title),
    }));

    return (
      <SectionShell
        id="features"
        siteVersion={siteVersion}
        reveal={false}
        className="v3-feature-reveal-section"
      >
        <ScrollRevealContentA
          items={revealItems}
          sectionTitle={data.title}
        />
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
