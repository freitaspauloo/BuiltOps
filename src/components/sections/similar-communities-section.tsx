import Link from "next/link";
import type { SimilarCommunity } from "@/lib/types/community";
import { isAuditMicrositeVersion, isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { CommunityCard } from "@/components/ui/community-card";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { communityStageLabels } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils/cn";

export function SimilarCommunitiesSection({
  communities,
  siteVersion = "v3",
}: {
  communities: SimilarCommunity[];
  siteVersion?: MicrositeVersionId;
}) {
  const isAudit = isAuditMicrositeVersion(siteVersion);

  return (
    <SectionShell
      id="similarCommunities"
      siteVersion={siteVersion}
      reveal={false}
      muted
      className={cn("border-t-0", isAudit && "border-t !border-border pb-20 md:pb-28")}
    >
      {isEditorialVersion(siteVersion) ? (
        <SectionIntro
          label={isAudit ? "Communities" : "Discover"}
          title={isAudit ? "More Losani communities" : "You may also like"}
          description={
            isAudit
              ? "Explore new home communities across Southern Ontario — townhomes, singles, and more."
              : undefined
          }
          showRule={false}
          className="mb-8 md:mb-10"
        />
      ) : (
        <SectionHeaderSplit
          eyebrow="Discover"
          title="You may also like"
          siteVersion={siteVersion}
          showRule={false}
        />
      )}
      <div
        className={
          isAuditMicrositeVersion(siteVersion)
            ? "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
            : isEditorialVersion(siteVersion)
              ? "grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12"
              : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {communities.map((c) =>
          isAuditMicrositeVersion(siteVersion) ? (
            <CommunityCard key={c.name} community={c} />
          ) : (
            <Link
              key={c.name}
              href={c.href}
              className={
                isEditorialVersion(siteVersion)
                  ? "v3-community-link group"
                  : `${cardSurfaceClass(siteVersion)} group overflow-hidden`
              }
            >
              <CardPhotoLens src={c.image} alt={c.name} imageRadius="top" />
              <div className={isEditorialVersion(siteVersion) ? "pt-5" : "p-5"}>
                <span className={isEditorialVersion(siteVersion) ? "v3-panel-label block" : "card-label block"}>
                  {communityStageLabels[c.stage]}
                </span>
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted">
                  {c.city}
                  {c.priceFrom ? ` · ${c.priceFrom}` : ""}
                </p>
              </div>
            </Link>
          ),
        )}
      </div>
    </SectionShell>
  );
}
