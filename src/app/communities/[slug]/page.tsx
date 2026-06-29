import { notFound } from "next/navigation";
import { fetchCommunity } from "@/lib/data/get-community";
import { getAllCommunitySlugs } from "@/lib/data/seed-benchmark";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { CommunityFooter } from "@/components/layout/community-chrome";
import { parseMicrositeVersion } from "@/lib/site-versions";

export async function generateStaticParams() {
  return getAllCommunitySlugs().map((slug) => ({ slug }));
}

export default async function CommunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { slug } = await params;
  const { version: versionParam } = await searchParams;
  const community = await fetchCommunity(slug);

  if (!community) notFound();

  const micrositeVersion = parseMicrositeVersion(versionParam ?? community.micrositeVersion);

  return (
    <div className="relative min-w-0 overflow-x-clip">
      <main>
        <SectionRenderer community={{ ...community, micrositeVersion }} />
      </main>
      <CommunityFooter />
    </div>
  );
}
