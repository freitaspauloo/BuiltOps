import Image from "next/image";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import type { CommunityHero, QuickFacts } from "@/lib/types/community";
import { QuickFactsBentoGrid } from "./quick-facts-bento-grid";

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
}: {
  data: CommunityHero;
  quickFacts?: QuickFacts;
}) {
  return (
    <>
      <HeroFixedStage data={data} quickFacts={quickFacts} />
      {/* In-flow spacer — page content scrolls over the fixed hero stage */}
      <section id="hero" className="min-h-svh w-full" aria-label={`${data.communityName} hero`} />
    </>
  );
}
