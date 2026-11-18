"use client";

import Image from "next/image";
import type { Community } from "@/lib/types/community";
import { SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";
import { SectionBrochureLink } from "@/components/ui/section-brochure-link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CONNECTED_EXPERIENCE_URL } from "@/lib/connected-experience";

export function SitePlanSectionV5({
  data,
  communityName,
}: {
  data: NonNullable<Community["sitePlan"]>;
  communityName?: string;
}) {
  const planLabel = communityName ?? data.title;
  const imageUrl = data.phases?.[0]?.imageUrl ?? data.imageUrl;

  return (
    <SectionShell id="sitePlan" siteVersion="v5" reveal={false}>
      <ScrollReveal>
        <SectionIntro
          label="Site plan"
          title={data.title}
          description={`View the official ${planLabel} layout and check real-time lot availability on our connected platform.`}
          showRule={false}
          className="mb-8 md:mb-10"
        />
      </ScrollReveal>

      <div className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-mist shadow-[var(--shadow-card)]">
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <Image
            src={imageUrl}
            alt={`${planLabel} site plan`}
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="v5-site-plan-scrim absolute inset-0 flex items-end justify-center px-4 pb-8 pt-16 sm:pb-10">
            <Button
              href={CONNECTED_EXPERIENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="hero"
              size="lg"
              className="v5-site-plan-cta"
            >
              Browse Lots & Availability
            </Button>
          </div>
        </div>
      </div>

      {data.brochureUrl && (
        <SectionBrochureLink
          url={data.brochureUrl}
          label={data.brochureLabel ?? "Open Brochure"}
          className="mt-10 md:mt-14"
        />
      )}
    </SectionShell>
  );
}
