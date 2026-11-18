import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

import { anyone, authenticated } from "./access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * BuiltOps media library — photos, videos, PDFs.
 * Fully ours (stored under /public/media). Customize labels, folders, sizes anytime.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media asset",
    plural: "Media library",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["filename", "title", "kind", "folder", "updatedAt"],
    group: "Media",
    description: "Upload and manage photos, videos, and PDFs used across communities and models.",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: [
      "image/*",
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "application/pdf",
    ],
    imageSizes: [
      {
        name: "thumb",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 800,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        position: "centre",
      },
    ],
    adminThumbnail: "thumb",
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!data) return data;
        const mime =
          (typeof data.mimeType === "string" && data.mimeType) ||
          (typeof req?.file?.mimetype === "string" ? req.file.mimetype : "");

        let kind = data.kind as string | undefined;
        if (!kind && mime) {
          if (mime.startsWith("video/")) kind = "video";
          else if (mime === "application/pdf") kind = "document";
          else if (mime.startsWith("image/")) kind = "photo";
        }

        const title =
          data.title ||
          data.alt ||
          (typeof data.filename === "string" ? data.filename.replace(/\.[^.]+$/, "") : undefined);

        return {
          ...data,
          kind: kind || "photo",
          title,
          alt: data.alt || title || "Media",
        };
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      admin: {
        description: "Friendly name editors see in the library (e.g. “Benchmark hero dusk”).",
      },
    },
    {
      name: "alt",
      type: "text",
      label: "Alt text",
      required: true,
      admin: {
        description: "Describe the image for accessibility / SEO.",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
    },
    {
      name: "kind",
      type: "select",
      label: "Type",
      defaultValue: "photo",
      options: [
        { label: "Photo", value: "photo" },
        { label: "Video", value: "video" },
        { label: "Document (PDF)", value: "document" },
      ],
      admin: {
        description: "Usually auto-detected from the file type.",
      },
    },
    {
      name: "folder",
      type: "select",
      label: "Folder",
      defaultValue: "general",
      options: [
        { label: "General", value: "general" },
        { label: "Heroes", value: "heroes" },
        { label: "Galleries", value: "galleries" },
        { label: "Elevations", value: "elevations" },
        { label: "Floorplans", value: "floorplans" },
        { label: "Videos / Tours", value: "videos" },
        { label: "Brochures / PDFs", value: "brochures" },
        { label: "Lifestyle", value: "lifestyle" },
        { label: "Site plans", value: "site-plans" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      label: "Project",
      admin: {
        position: "sidebar",
        description: "Optional — tag this asset to a project.",
      },
    },
  ],
};
