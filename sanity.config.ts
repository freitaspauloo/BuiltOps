import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export default defineConfig({
  name: "builtops",
  title: "BuiltOps — Losani CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    productionUrl: async (prev, context) => {
      const { document } = context;
      const slug =
        typeof document.slug === "object" &&
        document.slug &&
        "current" in document.slug
          ? String(document.slug.current)
          : null;

      if (!slug) return prev;

      if (document._type === "community") {
        return `${siteUrl}/communities/${slug}`;
      }
      if (document._type === "homeModel") {
        return `${siteUrl}/models/${slug}`;
      }
      return prev;
    },
  },
});
