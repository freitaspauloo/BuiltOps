import type { CommunityHero, DownloadAsset } from "@/lib/types/community";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { cn } from "@/lib/utils/cn";

/** Portal primary + secondary CTAs repeated at section footers (Scott Jul 8). */
export function SectionCtaBar({
  hero,
  downloads,
  className,
}: {
  hero: CommunityHero;
  downloads?: DownloadAsset[];
  className?: string;
}) {
  return (
    <div className={cn("mt-10 border-t border-border pt-8 md:mt-12 md:pt-10", className)}>
      <CommunityCtaButtons
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        downloads={downloads}
        tone="light"
        size="md"
      />
    </div>
  );
}
