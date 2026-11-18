import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { fetchAllCommunitySlugs, fetchCommunity } from "@/lib/data/get-community";
import { SectionRendererV6 } from "@/components/sections/section-renderer-v6";
import { CommunityFooter as CommunityFooterV6 } from "@/components/sections/v6/snapshot/community-footer";
import { ScrollToHeroOnLoad } from "@/components/layout/scroll-to-hero-on-load";
import { isMicrositeVersionId } from "@/lib/site-versions";
import { parsePresentationMode } from "@/lib/presentation-mode";
import type { Community, OverviewLayoutVariant } from "@/lib/types/community";

const PRODUCTION_VERSION = "v6" as const;

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
  const title = `${name} — New ${community.hero.homeTypes ?? "Homes"} in ${community.hero.city} | Losani Homes`;
  const description =
    community.overview?.introduction ??
    `${name} by Losani Homes — new homes in ${community.hero.city}.${community.hero.priceFrom ? ` ${community.hero.priceFrom}.` : ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: community.hero.heroImage, alt: `${name} streetscape` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [community.hero.heroImage],
    },
  };
}

function parsePrice(value?: string): number | null {
  if (!value) return null;
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : null;
}

function buildJsonLd(community: Community, slug: string) {
  const prices = (community.floorplans ?? [])
    .map((plan) => parsePrice(plan.priceFrom))
    .filter((price): price is number => price !== null);

  const listing: Record<string, unknown> = {
    "@type": "RealEstateListing",
    name: community.hero.communityName,
    description:
      community.overview?.introduction ?? community.overview?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://builtops.vercel.app"}/communities/${slug}`,
    image: community.hero.heroImage,
  };

  if (community.salesOffice?.address) {
    listing.address = {
      "@type": "PostalAddress",
      streetAddress: community.salesOffice.address,
      addressLocality: community.hero.city,
      addressCountry: "CA",
    };
  }

  if (prices.length > 0) {
    listing.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "CAD",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
    };
  }

  const graph: Record<string, unknown>[] = [listing];

  if (community.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: community.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function CommunityPage({
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

  // Versioned URLs belong in the archive playground.
  if (isMicrositeVersionId(versionParam)) {
    const qs = new URLSearchParams();
    qs.set("version", versionParam);
    if (presentationParam) qs.set("presentation", presentationParam);
    if (overviewLayoutParam) qs.set("overviewLayout", overviewLayoutParam);
    redirect(`/old/communities/${slug}?${qs.toString()}`);
  }

  const community = await fetchCommunity(slug);

  if (!community) notFound();

  const presentationMode = parsePresentationMode(presentationParam);
  const overviewLayoutOverride = ["a", "b", "c", "d"].includes(overviewLayoutParam ?? "")
    ? (overviewLayoutParam as OverviewLayoutVariant)
    : undefined;
  const jsonLd = buildJsonLd(community, slug);

  return (
    <div
      className="relative isolate min-w-0 overflow-x-clip"
      data-microsite-version={PRODUCTION_VERSION}
      data-presentation={presentationMode}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToHeroOnLoad />
      <main className="relative">
        <SectionRendererV6
          community={{
            ...community,
            micrositeVersion: PRODUCTION_VERSION,
            presentationMode,
            overviewLayoutOverride,
          }}
        />
      </main>
      <div className="relative z-10">
        <CommunityFooterV6 community={community} />
      </div>
    </div>
  );
}
