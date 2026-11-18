import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchAllCommunitySlugs, fetchCommunity } from "@/lib/data/get-community";
import { SectionRendererV6 } from "@/components/sections/section-renderer-v6";
import { CommunityFooter as CommunityFooterV6 } from "@/components/sections/v6/snapshot/community-footer";
import { ScrollToHeroOnLoad } from "@/components/layout/scroll-to-hero-on-load";
import { applyCommunityStage } from "@/lib/apply-community-stage";
import {
  COMMUNITY_STAGE_SLUGS,
  isCommunityStageSlug,
  parseCommunityStageSlug,
  type CommunityStageSlug,
} from "@/lib/community-stages";
import type { Community } from "@/lib/types/community";

const PRODUCTION_VERSION = "v6" as const;

export async function generateStaticParams() {
  const slugs = await fetchAllCommunitySlugs();
  return slugs.flatMap((slug) =>
    COMMUNITY_STAGE_SLUGS.map((stage) => ({ slug, stage })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; stage: string }>;
}): Promise<Metadata> {
  const { slug, stage: stageParam } = await params;
  if (!isCommunityStageSlug(stageParam)) return {};

  const community = await fetchCommunity(slug);
  if (!community) return {};

  const stage = parseCommunityStageSlug(stageParam)!;
  const staged = applyCommunityStage(community, stage);
  const name = staged.hero.communityName;
  const stageLabel =
    stage === "future"
      ? "Future Community"
      : stage === "coming_soon"
        ? "Coming Soon"
        : "Available Now";

  return {
    title: `${name} — ${stageLabel} | Losani Homes`,
    description:
      staged.overview?.introduction ??
      `${name} by Losani Homes — ${stageLabel.toLowerCase()} in ${staged.hero.city}.`,
    robots: { index: false, follow: false },
  };
}

function buildJsonLd(community: Community, slug: string, stageSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: community.hero.communityName,
    description:
      community.overview?.introduction ?? community.overview?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://builtops.vercel.app"}/communities/${slug}/${stageSlug}`,
    image: community.hero.heroImage,
  };
}

export default async function CommunityStagePage({
  params,
}: {
  params: Promise<{ slug: string; stage: string }>;
}) {
  const { slug, stage: stageParam } = await params;

  if (!isCommunityStageSlug(stageParam)) notFound();

  const stage = parseCommunityStageSlug(stageParam)!;
  const community = await fetchCommunity(slug);

  if (!community) notFound();

  const staged = applyCommunityStage(
    {
      ...community,
      micrositeVersion: PRODUCTION_VERSION,
    },
    stage,
  );
  const jsonLd = buildJsonLd(staged, slug, stageParam as CommunityStageSlug);

  return (
    <div
      className="relative isolate min-w-0 overflow-x-clip"
      data-microsite-version={PRODUCTION_VERSION}
      data-community-stage={stage}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToHeroOnLoad />
      <main className="relative">
        <SectionRendererV6 community={staged} />
      </main>
      <div className="relative z-10">
        <CommunityFooterV6 community={staged} />
      </div>
    </div>
  );
}
