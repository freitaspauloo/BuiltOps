import type { QuickMoveInHome } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {homes.map((home) => (
          <article key={home.id} className={`${cardSurfaceClass(siteVersion)} group overflow-hidden`}>
            <CardPhotoLens
              src={home.image}
              alt={home.address}
              aspectClass="aspect-[16/10]"
              imageRadius="top"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground">{home.address}</h3>
              <PillGroup size="sm" className="mt-3">
                <Pill size="sm" icon={spec.moveIn}>Quick move-in</Pill>
                <Pill size="sm" icon={spec.beds}>{home.beds} beds</Pill>
                <Pill size="sm" icon={spec.baths}>{home.baths} baths</Pill>
                <Pill size="sm" icon={spec.sqft}>{home.sqft.toLocaleString()} sqft</Pill>
                <Pill size="sm" icon={spec.possession}>{home.possessionDate}</Pill>
              </PillGroup>
              <p className="mt-3 text-lg font-bold text-foreground">{home.price}</p>
              <p className="mt-1 text-sm text-muted">Lot {home.lot}</p>
              <Button href="#registration" size="sm" className="mt-4">
                Book showing
              </Button>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
