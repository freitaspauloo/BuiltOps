import Image from "next/image";
import type { QuickMoveInHome } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSpecPillIcons } from "@/lib/icons";

export function QuickMoveInSection({
  homes,
  siteVersion = "v2",
}: {
  homes: QuickMoveInHome[];
  siteVersion?: MicrositeVersionId;
}) {
  const spec = getSpecPillIcons();

  return (
    <SectionShell id="quickMoveIn" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Inventory"
        title="Move-in ready homes"
        description="Available for immediate or near-term occupancy."
        siteVersion={siteVersion}
      />
      <div className="grid gap-8 sm:grid-cols-2">
        {homes.map((home) => (
          <article key={home.id} className={`${cardSurfaceClass(siteVersion)} group overflow-hidden`}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={home.image}
                alt={home.address}
                fill
                className="carousel-slide-hover object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground">{home.address}</h3>
              <PillGroup className="mt-4">
                <Pill icon={spec.moveIn}>Quick move-in</Pill>
                <Pill icon={spec.beds}>{home.beds} beds</Pill>
                <Pill icon={spec.baths}>{home.baths} baths</Pill>
                <Pill icon={spec.sqft}>{home.sqft.toLocaleString()} sqft</Pill>
                <Pill icon={spec.possession}>{home.possessionDate}</Pill>
              </PillGroup>
              <p className="mt-4 text-lg font-bold text-foreground">{home.price}</p>
              <p className="mt-1 text-sm text-muted">Lot {home.lot}</p>
              <Button href="#registration" size="sm" className="mt-5">
                Book showing
              </Button>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
