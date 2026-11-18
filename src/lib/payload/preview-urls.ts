import type { CollectionConfig } from "payload";

const siteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Admin "Preview" / Live Preview URLs for communities & models. */
export function communityAdminPreview(): NonNullable<CollectionConfig["admin"]> {
  return {
    useAsTitle: "slug",
    defaultColumns: ["slug", "stage", "project", "updatedAt"],
    preview: (doc) => {
      const slug = typeof doc?.slug === "string" ? doc.slug : null;
      if (!slug) return null;
      const secret = process.env.PAYLOAD_SECRET || "";
      return `${siteUrl()}/api/preview?collection=communities&slug=${encodeURIComponent(slug)}&secret=${encodeURIComponent(secret)}`;
    },
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === "string" ? data.slug : "";
        return `${siteUrl()}/communities/${slug}?preview=1`;
      },
    },
  };
}

export function homeModelAdminPreview(): Partial<NonNullable<CollectionConfig["admin"]>> {
  return {
    preview: (doc) => {
      const slug = typeof doc?.slug === "string" ? doc.slug : null;
      if (!slug) return null;
      const secret = process.env.PAYLOAD_SECRET || "";
      return `${siteUrl()}/api/preview?collection=home-models&slug=${encodeURIComponent(slug)}&secret=${encodeURIComponent(secret)}`;
    },
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === "string" ? data.slug : "";
        return `${siteUrl()}/models/${slug}?preview=1`;
      },
    },
  };
}
