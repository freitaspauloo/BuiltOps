import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import type { CommunityHero, CommunityStage, DownloadAsset, QuickFacts } from "@/lib/types/community";
import { isAuditMicrositeVersion, isV5MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { QuickFactsBentoGrid } from "./quick-facts-bento-grid";

function HeroEditorialStage({
  data,
  showMeta = false,
  enhancedMeta = false,
  available = false,
  secondaryCta,
  downloads,
}: {
  data: CommunityHero;
  showMeta?: boolean;
  enhancedMeta?: boolean;
  available?: boolean;
  secondaryCta?: CommunityHero["secondaryCta"];
  downloads?: DownloadAsset[];
}) {
  const meta = [data.city, data.priceFrom, data.homeTypes].filter(Boolean);

  return (
    <div className="hero-stage pointer-events-none fixed inset-0 z-[1] h-svh w-full overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <Image
          src={data.heroImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="hero-backdrop-scrim absolute inset-0" />
        <div className="hero-content-scrim absolute inset-x-0 bottom-0 h-[min(65%,520px)]" />
      </div>

      <div className="v5-hero-content-anchor absolute inset-x-0 bottom-0 hero-frame-sides pb-12 pt-24 md:pb-16 md:pt-28 lg:pb-20">
        <div className="pointer-events-auto max-w-5xl">
          {available && (
            <span className="v4-available-badge mb-4 inline-flex w-fit items-center gap-2 rounded-[var(--radius-control)] border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              <span className="v4-available-dot" aria-hidden />
              Available now
            </span>
          )}
          {showMeta && meta.length > 0 && (
            <p
              className={
                enhancedMeta
                  ? "v5-hero-meta mb-4 text-base font-semibold tracking-wide text-white md:text-lg lg:text-xl"
                  : "mb-4 text-sm font-medium tracking-wide text-white/85 md:text-base"
              }
            >
              {enhancedMeta && data.city ? (
                <>
                  <span className="text-white">{data.city}</span>
                  {data.priceFrom && (
                    <>
                      <span className="text-white/60"> · </span>
                      <span className="font-bold text-white">{data.priceFrom}</span>
                    </>
                  )}
                  {data.homeTypes && (
                    <>
                      <span className="text-white/60"> · </span>
                      <span className="text-white/90">{data.homeTypes}</span>
                    </>
                  )}
                </>
              ) : (
                meta.join(" · ")
              )}
            </p>
          )}
          <h1 className="v3-hero-display">{data.communityName}</h1>
          <CommunityCtaButtons
            className="hero-editorial-ctas mt-8 md:mt-10"
            primaryCta={data.primaryCta}
            secondaryCta={secondaryCta}
            downloads={downloads}
            menuPlacement="top"
            tone="onImage"
            size="sm"
          />
        </div>
      </div>

      {showMeta && (
        <a
          href="#overview"
          className="v4-scroll-cue pointer-events-auto absolute bottom-6 right-6 hidden items-center justify-center text-white/80 transition-colors hover:text-white md:flex"
          aria-label="Scroll to community overview"
        >
          <ChevronDown size={28} strokeWidth={1.5} aria-hidden />
        </a>
      )}
    </div>
  );
}

function HeroFixedStage({
  data,
  quickFacts,
}: {
  data: CommunityHero;
  quickFacts?: QuickFacts;
}) {
  const meta = [data.city, data.priceFrom, data.homeTypes].filter(Boolean);
  const facts = quickFacts?.facts ?? [];

  return (
    <div className="hero-stage pointer-events-none fixed inset-0 z-[1] h-svh w-full overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <Image
          src={data.heroImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="hero-backdrop-scrim absolute inset-0" />
        <div className="hero-content-blur absolute inset-x-0 bottom-0 h-[min(58%,500px)]" />
        <div className="hero-content-scrim absolute inset-x-0 bottom-0 h-[min(72%,560px)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 hero-frame-sides pb-10 pt-28 md:pb-14 md:pt-32 lg:pb-16">
        <div className="pointer-events-auto relative w-full">
          <div className="max-w-4xl">
            <CommunityCtaButtons
              className="mb-6 md:mb-8"
              primaryCta={data.primaryCta}
              secondaryCta={data.secondaryCta}
              tone="onImage"
            />

            {meta.length > 0 && (
              <p className="mb-4 max-w-xl text-sm font-medium tracking-wide text-white/80 md:text-base">
                {meta.join(" · ")}
              </p>
            )}

            <h1 className="headline-hero max-w-[14ch] text-left text-white">{data.communityName}</h1>
          </div>

          {facts.length > 0 && (
            <div className="mt-8 flex justify-end lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
              <QuickFactsBentoGrid facts={facts} variant="onImage" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeroSection({
  data,
  quickFacts,
  editorial = false,
  siteVersion = "v3",
  stage,
  downloads,
}: {
  data: CommunityHero;
  quickFacts?: QuickFacts;
  editorial?: boolean;
  siteVersion?: MicrositeVersionId;
  stage?: CommunityStage;
  downloads?: DownloadAsset[];
}) {
  const auditDownloads = isAuditMicrositeVersion(siteVersion) ? downloads : undefined;

  return (
    <>
      {editorial ? (
        <HeroEditorialStage
          data={data}
          showMeta={isAuditMicrositeVersion(siteVersion)}
          enhancedMeta={isV5MicrositeVersion(siteVersion)}
          available={isAuditMicrositeVersion(siteVersion) && stage === "available"}
          secondaryCta={data.secondaryCta}
          downloads={auditDownloads}
        />
      ) : (
        <HeroFixedStage data={data} quickFacts={quickFacts} />
      )}
      <section id="hero" className="min-h-svh w-full" aria-label={`${data.communityName} hero`} />
    </>
  );
}
