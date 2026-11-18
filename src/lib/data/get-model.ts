import type { HomeModel } from "@/lib/types/model";
import { seedModels } from "@/lib/data/seed-models";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload/client";
import { mapPayloadHomeModel } from "@/lib/payload/map-model";

export function getModel(slug: string): HomeModel | null {
  return seedModels[slug] ?? null;
}

export function getAllModelSlugs(): string[] {
  return Object.keys(seedModels);
}

async function preferDraft(): Promise<boolean> {
  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

/** Payload first, seed fallback — used by async routes. */
export async function fetchModel(slug: string): Promise<HomeModel | null> {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      if (payload) {
        const draft = await preferDraft();
        const result = await payload.find({
          collection: "home-models",
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
        if (doc) return mapPayloadHomeModel(doc as unknown as Record<string, unknown>);
      }
    } catch {
      // fall through to seed data
    }
  }
  return getModel(slug);
}

export async function fetchAllModelSlugs(): Promise<string[]> {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      if (payload) {
        const result = await payload.find({
          collection: "home-models",
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
          return Array.from(new Set([...slugs, ...getAllModelSlugs()]));
        }
      }
    } catch {
      // fall through
    }
  }
  return getAllModelSlugs();
}
