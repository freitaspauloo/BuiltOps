import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchAllCommunitySlugs, fetchCommunity } from "@/lib/data/get-community";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { CommunityFooter } from "@/components/layout/community-footer";
import { CommunityFooter as CommunityFooterV2 } from "@/components/sections/v2/snapshot/community-footer";
import { CommunityFooter as CommunityFooterV3 } from "@/components/sections/v3/snapshot/community-footer";
import { CommunityFooter as CommunityFooterV6 } from "@/components/sections/v6/snapshot/community-footer";
import { FrozenVersionBanner } from "@/components/dev/frozen-version-banner";
import { ScrollToHeroOnLoad } from "@/components/layout/scroll-to-hero-on-load";
import { parseMicrositeVersion, designMicrositeVersion } from "@/lib/site-versions";
import { parsePresentationMode } from "@/lib/presentation-mode";
import type { Community, OverviewLayoutVariant } from "@/lib/types/community";

export async function generateStaticParams() {
  const slugs = await fetchAllCommunitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = await fetchCommunity(slug);
  if (!community) return {};

  const name = community.hero.communityName;
  return {
    title: `[Archive] ${name} — BuiltOps versions`,
    robots: { index: false, follow: false },
  };
}

export default async function ArchiveCommunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    version?: string;
    presentation?: string;
    overviewLayout?: string;
  }>;
}) {
  const { slug } = await params;
  const {
    version: versionParam,
    presentation: presentationParam,
    overviewLayout: overviewLayoutParam,
  } = await searchParams;
  const community = await fetchCommunity(slug);

  if (!community) notFound();

  const micrositeVersion = parseMicrositeVersion(versionParam ?? community.micrositeVersion);
  const designVersion = designMicrositeVersion(micrositeVersion);
  const presentationMode = parsePresentationMode(presentationParam);
  const overviewLayoutOverride = ["a", "b", "c", "d"].includes(overviewLayoutParam ?? "")
    ? (overviewLayoutParam as OverviewLayoutVariant)
    : undefined;

  return (
    <div
      className="relative isolate min-w-0 overflow-x-clip"
      data-microsite-version={designVersion}
      data-presentation={presentationMode}
    >
      <ScrollToHeroOnLoad />
      <Suspense fallback={null}>
        <FrozenVersionBanner />
      </Suspense>
      <main className="relative">
        <SectionRenderer
          community={{
            ...community,
            micrositeVersion,
            presentationMode,
            overviewLayoutOverride,
          }}
        />
      </main>
      <div className="relative z-10">
        {micrositeVersion === "v2" ? (
          <CommunityFooterV2 community={community} />
        ) : micrositeVersion === "v6" || micrositeVersion === "v6b" ? (
          <CommunityFooterV6 community={community} />
        ) : micrositeVersion === "v4" || micrositeVersion === "v5" ? (
          <CommunityFooter community={community} />
        ) : (
          <CommunityFooterV3 community={community} />
        )}
      </div>
    </div>
  );
}
