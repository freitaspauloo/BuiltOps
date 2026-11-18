"use client";

import { useCallback, useRef } from "react";
import type { Floorplan } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { AppIcon, UI_ICONS, getSpecPillIcons } from "@/lib/icons";

const CARD_GAP = 20;

function FloorplanCard({
  plan,
  siteVersion,
}: {
  plan: Floorplan;
  siteVersion: MicrositeVersionId;
}) {
  const spec = getSpecPillIcons();

  return (
    <article
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
  siteVersion = "v2",
}: {
  floorplans: Floorplan[];
  siteVersion?: MicrositeVersionId;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + CARD_GAP : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  if (floorplans.length === 0) return null;

  const navButtons =
    floorplans.length > 1 ? (
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          aria-label="Previous floorplan"
          onClick={() => scrollByCard(-1)}
          className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
        >
          <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
        </button>
        <button
          type="button"
          aria-label="Next floorplan"
          onClick={() => scrollByCard(1)}
          className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
        >
          <AppIcon icon={UI_ICONS.chevronRight} size={18} />
        </button>
      </div>
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
      />

      <div className="floorplans-carousel-bleed">
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain py-1 pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-16 lg:pr-16"
        >
          {floorplans.map((plan) => (
            <FloorplanCard key={plan.id} plan={plan} siteVersion={siteVersion} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
