import type { Community } from "@/lib/types/community";
import {
  getAllCommunitySlugs as getSeedCommunitySlugs,
  getCommunity as getSeedCommunity,
} from "@/lib/data/seed-benchmark";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload/client";
import { mapPayloadCommunity } from "@/lib/payload/map-community";

async function preferDraft(): Promise<boolean> {
  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export async function fetchCommunity(slug: string): Promise<Community | null> {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      if (payload) {
        const draft = await preferDraft();
        const result = await payload.find({
          collection: "communities",
          where: draft
            ? { slug: { equals: slug } }
            : {
                and: [
                  { slug: { equals: slug } },
                  { _status: { equals: "published" } },
                ],
              },
          limit: 1,
          depth: 2,
          draft,
          overrideAccess: true,
        });
        const doc = result.docs[0];
        if (doc) return mapPayloadCommunity(doc as unknown as Record<string, unknown>);
      }
    } catch {
      // fall through to seed data
    }
  }
  return getSeedCommunity(slug);
}

export async function fetchAllCommunitySlugs(): Promise<string[]> {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      if (payload) {
        const result = await payload.find({
          collection: "communities",
          where: { _status: { equals: "published" } },
          limit: 200,
          depth: 0,
          select: { slug: true },
          overrideAccess: true,
        });
        const slugs = result.docs
          .map((doc) => (typeof doc.slug === "string" ? doc.slug : null))
          .filter((s): s is string => Boolean(s));
        if (slugs.length) {
          return Array.from(new Set([...slugs, ...getSeedCommunitySlugs()]));
        }
      }
    } catch {
      // fall through
    }
  }
  return getSeedCommunitySlugs();
}
