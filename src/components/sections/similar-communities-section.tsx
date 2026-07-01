import Image from "next/image";
import Link from "next/link";
import type { SimilarCommunity } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { communityStageLabels } from "@/components/ui/status-badge";

export function SimilarCommunitiesSection({
  communities,
  siteVersion = "v2",
}: {
  communities: SimilarCommunity[];
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="similarCommunities" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Discover" title="You may also like" siteVersion={siteVersion} />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((c) => (
          <Link key={c.name} href={c.href} className={`${cardSurfaceClass(siteVersion)} group overflow-hidden`}>
            <div className="relative aspect-[4/3] overflow-hidden bg-card">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="carousel-slide-hover object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-5">
              <span className="card-label block">{communityStageLabels[c.stage]}</span>
              <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {c.name}
              </h3>
              <p className="mt-0.5 text-sm text-muted">
                {c.city}
                {c.priceFrom ? ` · ${c.priceFrom}` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
