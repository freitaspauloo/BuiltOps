"use client";

import { useState } from "react";
import Image from "next/image";
import type { Floorplan } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSpecPillIcons } from "@/lib/icons";

const INITIAL_VISIBLE = 6;

export function FloorplansSection({
  floorplans,
  siteVersion = "v2",
}: {
  floorplans: Floorplan[];
  siteVersion?: MicrositeVersionId;
}) {
  const [expanded, setExpanded] = useState(false);
  const spec = getSpecPillIcons();
  const hasMore = floorplans.length > INITIAL_VISIBLE;
  const visiblePlans = expanded ? floorplans : floorplans.slice(0, INITIAL_VISIBLE);

  return (
    <SectionShell id="floorplans" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Home designs"
        title="Floorplans & pricing"
        description="Browse floorplans and starting prices."
        siteVersion={siteVersion}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePlans.map((plan) => (
          <article key={plan.id} className={`${cardSurfaceClass(siteVersion)} group overflow-hidden`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                className="carousel-slide-hover object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-5">
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
              <div className="mt-4 flex flex-wrap gap-2">
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
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button variant="secondary" onClick={() => setExpanded((value) => !value)}>
            {expanded ? "See less" : "See all"}
          </Button>
        </div>
      )}
    </SectionShell>
  );
}
