"use client";

import type { Floorplan } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import {
  CarouselNavButtons,
  HorizontalScrollTrack,
  useHorizontalScroll,
} from "@/components/ui/horizontal-scroll-track";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSpecPillIcons } from "@/lib/icons";

function formatPhaseLabel(phase: string) {
  return phase.toUpperCase();
}

function FloorplanCard({
  plan,
  siteVersion,
}: {
  plan: Floorplan;
  siteVersion: MicrositeVersionId;
}) {
  const spec = getSpecPillIcons();
  const isV3 = siteVersion === "v3";

  if (isV3) {
    return (
      <article data-scroll-card className="v3-portfolio-card group shrink-0 snap-start">
        <div className="v3-portfolio-tile relative">
          <CardPhotoLens
            src={plan.image}
            alt={plan.name}
            aspectClass="aspect-[4/3] h-full"
            enableLens={false}
            imageRadius="top"
          />
        </div>

        <div className="flex flex-1 flex-col border border-t-0 border-border p-5 md:p-6">
          <h3 className="text-lg font-semibold text-foreground md:text-xl">{plan.name}</h3>
          <p className="mt-2 text-base font-medium text-foreground">{plan.priceFrom}</p>

          <PillGroup size="sm" className="mt-4">
            {plan.phase && (
              <Pill size="sm" icon={spec.phase}>
                {formatPhaseLabel(plan.phase)}
              </Pill>
            )}
            <Pill size="sm" icon={spec.beds}>
              {plan.beds} beds
            </Pill>
            <Pill size="sm" icon={spec.baths}>
              {plan.baths} baths
            </Pill>
            <Pill size="sm" icon={spec.sqft}>
              {plan.sqft.toLocaleString()} sqft
            </Pill>
          </PillGroup>
        </div>
      </article>
    );
  }

  return (
    <article
      data-scroll-card
      className={`${cardSurfaceClass(siteVersion)} group flex w-[min(88vw,24rem)] shrink-0 snap-start flex-col overflow-hidden sm:w-[26rem]`}
    >
      <CardPhotoLens src={plan.image} alt={plan.name} imageRadius="top" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
        <PillGroup size="sm" className="mt-3">
          {plan.phase && (
            <Pill size="sm" icon={spec.phase}>
              {plan.phase}
            </Pill>
          )}
          <Pill size="sm" icon={spec.beds}>
            {plan.beds} beds
          </Pill>
          <Pill size="sm" icon={spec.baths}>
            {plan.baths} baths
          </Pill>
          <Pill size="sm" icon={spec.sqft}>
            {plan.sqft.toLocaleString()} sqft
          </Pill>
        </PillGroup>
        <p className="mt-3 text-lg font-bold text-foreground">{plan.priceFrom}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Button size="sm" href="#registration">
            Inquire
          </Button>
          {plan.pdfUrl && (
            <Button size="sm" variant="ghost" href={plan.pdfUrl}>
              Floor plan
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function FloorplansSection({
  floorplans,
  siteVersion = "v3",
}: {
  floorplans: Floorplan[];
  siteVersion?: MicrositeVersionId;
}) {
  const { trackRef, scrollPrev, scrollNext } = useHorizontalScroll();

  if (floorplans.length === 0) return null;

  const navButtons =
    floorplans.length > 1 ? (
      <CarouselNavButtons
        onPrev={scrollPrev}
        onNext={scrollNext}
        prevLabel="Previous floorplan"
        nextLabel="Next floorplan"
      />
    ) : undefined;

  return (
    <SectionShell id="floorplans" siteVersion={siteVersion} reveal={false}>
      <SectionHeaderSplit
        align="center"
        eyebrow="Home designs"
        title="Floorplans & pricing"
        description="Browse floorplans and starting prices."
        aside={navButtons}
        siteVersion={siteVersion}
        showRule={false}
      />

      <HorizontalScrollTrack trackRef={trackRef} bleedClassName="floorplans-carousel-bleed">
        {floorplans.map((plan) => (
          <FloorplanCard key={plan.id} plan={plan} siteVersion={siteVersion} />
        ))}
      </HorizontalScrollTrack>
    </SectionShell>
  );
}
