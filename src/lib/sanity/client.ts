import { createClient, type SanityClient } from "@sanity/client";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export function isSanityConfigured() {
  return Boolean(sanityConfig.projectId);
}

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;
  if (!_client) {
    _client = createClient({
      ...sanityConfig,
      token: process.env.SANITY_API_TOKEN,
    });
  }
  return _client;
}
