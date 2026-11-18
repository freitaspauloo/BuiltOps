import type { Field } from "payload";

type MediaFieldOptions = {
  /** Form field name for the upload relation (e.g. heroMedia). */
  name: string;
  label: string;
  /**
   * Optional legacy URL field kept for paste URLs / seed data.
   * Editors can use either upload OR URL — upload wins when both are set.
   */
  urlName?: string;
  urlLabel?: string;
  required?: boolean;
  filterFolders?: string[];
  description?: string;
  /** Unique name for the preview UI field in this group/array row. */
  previewName?: string;
};

/**
 * Compact image slot: thumbnail + upload side-by-side, optional URL underneath.
 */
export function mediaOrUrlFields(options: MediaFieldOptions): Field[] {
  const {
    name,
    label,
    urlName,
    urlLabel,
    required,
    filterFolders,
    description,
    previewName = `_preview_${name}`,
  } = options;

  const fields: Field[] = [
    {
      type: "row",
      fields: [
        {
          name: previewName,
          type: "ui",
          admin: {
            width: "160px",
            components: {
              Field: {
                path: "@/components/payload/ImageSlotPreview#default",
                clientProps: {
                  mediaField: name,
                  urlField: urlName || "",
                  label,
                },
              },
            },
          },
        },
        {
          name,
          type: "upload",
          relationTo: "media",
          label,
          required: Boolean(required && !urlName),
          displayPreview: false,
          filterOptions: filterFolders?.length
            ? {
                folder: {
                  in: filterFolders,
                },
              }
            : undefined,
          admin: {
            width: "calc(100% - 172px)",
            description:
              description || "Pick from Media library. Thumbnail updates immediately.",
          },
        },
      ],
    },
  ];

  if (urlName) {
    fields.push({
      name: urlName,
      type: "text",
      label: urlLabel || `${label} URL (optional)`,
      admin: {
        description: "Paste a URL instead of uploading. Ignored when a library file is selected.",
      },
    });
  }

  return fields;
}

/** Resolve a public URL from upload relation and/or fallback string. */
export function resolveMediaUrl(
  upload: unknown,
  fallbackUrl?: string | null,
): string {
  if (upload && typeof upload === "object") {
    const doc = upload as {
      url?: string | null;
      filename?: string | null;
      sizes?: Record<string, { url?: string | null } | null>;
    };
    const hero = doc.sizes?.hero?.url;
    const card = doc.sizes?.card?.url;
    if (typeof hero === "string" && hero) return hero;
    if (typeof card === "string" && card) return card;
    if (typeof doc.url === "string" && doc.url) return doc.url;
    if (typeof doc.filename === "string" && doc.filename) {
      return `/media/${doc.filename}`;
    }
  }
  return typeof fallbackUrl === "string" ? fallbackUrl : "";
}

export function resolveMediaAlt(upload: unknown, fallback = ""): string {
  if (upload && typeof upload === "object") {
    const doc = upload as { alt?: string | null; title?: string | null };
    if (typeof doc.alt === "string" && doc.alt) return doc.alt;
    if (typeof doc.title === "string" && doc.title) return doc.title;
  }
  return fallback;
}
