import type { Community } from "@/lib/types/community";
import { communityBySlugQuery } from "@/lib/sanity/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { getCommunity as getSeedCommunity } from "@/lib/data/seed-benchmark";

export async function fetchCommunity(slug: string): Promise<Community | null> {
  if (isSanityConfigured()) {
    try {
      const client = getSanityClient();
      if (client) {
        const data = await client.fetch<Community | null>(communityBySlugQuery, { slug });
        if (data) return data;
      }
    } catch {
      // fall through to seed data
    }
  }
  return getSeedCommunity(slug);
}
