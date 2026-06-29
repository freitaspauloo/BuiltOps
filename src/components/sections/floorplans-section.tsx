import Image from "next/image";
import type { Floorplan } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSpecPillIcons } from "@/lib/icons";

export function FloorplansSection({
  floorplans,
  siteVersion = "v2",
}: {
  floorplans: Floorplan[];
  siteVersion?: MicrositeVersionId;
}) {
  const spec = getSpecPillIcons();

  return (
    <SectionShell id="floorplans" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Home designs"
        title="Floorplans & pricing"
        description="Browse floorplans and starting prices."
        siteVersion={siteVersion}
      />
      <div className="grid gap-8 sm:grid-cols-2">
        {floorplans.map((plan) => (
          <article key={plan.id} className={`${cardSurfaceClass(siteVersion)} group overflow-hidden`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                className="carousel-slide-hover object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <PillGroup className="mt-4">
                {plan.phase && <Pill icon={spec.phase}>{plan.phase}</Pill>}
                <Pill icon={spec.beds}>{plan.beds} beds</Pill>
                <Pill icon={spec.baths}>{plan.baths} baths</Pill>
                <Pill icon={spec.sqft}>{plan.sqft.toLocaleString()} sqft</Pill>
              </PillGroup>
              <p className="mt-4 text-lg font-bold text-foreground">{plan.priceFrom}</p>
              <div className="mt-5 flex gap-3">
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
    </SectionShell>
  );
}
