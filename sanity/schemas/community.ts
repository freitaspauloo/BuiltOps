import { defineField, defineType } from "sanity";

const stageField = defineField({
  name: "stage",
  title: "Community Stage",
  type: "string",
  options: {
    list: [
      { title: "Future Community", value: "future" },
      { title: "Coming Soon", value: "coming_soon" },
      { title: "Available Now", value: "available" },
    ],
  },
  validation: (r) => r.required(),
});

export const communitySchema = defineType({
  name: "community",
  title: "Community",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "hero.communityName" }, validation: (r) => r.required() }),
    stageField,
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "communityName", title: "Community Name", type: "string" },
        { name: "statusBadge", title: "Status Badge", type: "string", options: { list: ["future", "coming_soon", "available"] } },
        { name: "city", title: "City", type: "string" },
        { name: "priceFrom", title: "Price From", type: "string" },
        { name: "homeTypes", title: "Home Types", type: "string" },
        { name: "heroImage", title: "Hero Image URL", type: "url" },
        { name: "heroVideoUrl", title: "Hero Video URL", type: "url" },
        { name: "primaryCtaLabel", title: "Primary CTA Label", type: "string" },
        { name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" },
      ],
    }),
    defineField({
      name: "snapshot",
      title: "Community Snapshot",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }] }],
    }),
    defineField({
      name: "overview",
      title: "Community Overview",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "introduction", type: "text" },
        { name: "description", type: "text" },
      ],
    }),
    defineField({
      name: "quickFacts",
      title: "Quick Facts",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "facts", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }] }] },
      ],
    }),
    defineField({ name: "videoUrl", title: "Community Video URL", type: "url" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "object", fields: [{ name: "url", type: "url" }, { name: "alt", type: "string" }, { name: "caption", type: "string" }] }],
    }),
    defineField({
      name: "areaMap",
      title: "Area Map",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "points", type: "array", of: [{ type: "object", fields: [
          { name: "id", type: "string" }, { name: "label", type: "string" },
          { name: "category", type: "string" }, { name: "lat", type: "number" }, { name: "lng", type: "number" },
        ]}] },
      ],
    }),
    defineField({
      name: "amenities",
      title: "Lifestyle / Amenities",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "items", type: "array", of: [{ type: "object", fields: [
          { name: "title", type: "string" }, { name: "description", type: "text" }, { name: "icon", type: "string" }, { name: "image", type: "url" },
        ]}] },
      ],
    }),
    defineField({
      name: "features",
      title: "Community Features",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "items", type: "array", of: [{ type: "object", fields: [{ name: "title", type: "string" }, { name: "description", type: "text" }] }] },
      ],
    }),
    defineField({
      name: "sitePlan",
      title: "Site Plan",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "imageUrl", type: "url" },
        { name: "lots", type: "array", of: [{ type: "object", fields: [
          { name: "id", type: "string" }, { name: "lotNumber", type: "string" }, { name: "status", type: "string" },
          { name: "x", type: "number" }, { name: "y", type: "number" }, { name: "width", type: "number" }, { name: "height", type: "number" },
          { name: "price", type: "string" }, { name: "floorplan", type: "string" }, { name: "possessionDate", type: "string" },
        ]}] },
      ],
    }),
    defineField({
      name: "floorplans",
      title: "Floorplans",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "id", type: "string" }, { name: "name", type: "string" }, { name: "beds", type: "number" }, { name: "baths", type: "number" },
        { name: "sqft", type: "number" }, { name: "priceFrom", type: "string" }, { name: "image", type: "url" }, { name: "pdfUrl", type: "url" }, { name: "phase", type: "string" },
      ]}],
    }),
    defineField({
      name: "quickMoveIn",
      title: "Quick Move-In Homes",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "id", type: "string" }, { name: "address", type: "string" }, { name: "lot", type: "string" }, { name: "price", type: "string" },
        { name: "possessionDate", type: "string" }, { name: "beds", type: "number" }, { name: "baths", type: "number" }, { name: "sqft", type: "number" }, { name: "image", type: "url" },
      ]}],
    }),
    defineField({
      name: "downloads",
      title: "Downloads",
      type: "array",
      of: [{ type: "object", fields: [{ name: "title", type: "string" }, { name: "type", type: "string" }, { name: "url", type: "url" }] }],
    }),
    defineField({
      name: "promotions",
      title: "Promotions",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "title", type: "string" }, { name: "description", type: "text" }, { name: "badge", type: "string" }, { name: "expiresAt", type: "string" },
      ]}],
    }),
    defineField({
      name: "salesOffice",
      title: "Sales Office",
      type: "object",
      fields: [
        { name: "title", type: "string" }, { name: "address", type: "string" }, { name: "phone", type: "string" }, { name: "email", type: "string" },
        { name: "hours", type: "array", of: [{ type: "string" }] },
        { name: "team", type: "array", of: [{ type: "object", fields: [
          { name: "name", type: "string" }, { name: "role", type: "string" }, { name: "phone", type: "string" }, { name: "email", type: "string" },
        ]}] },
      ],
    }),
    defineField({
      name: "vision",
      title: "Community Vision",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "highlights", type: "array", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "timeline",
      title: "Community Timeline",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "date", type: "string" },
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "status", type: "string", options: { list: ["complete", "current", "upcoming"] } },
      ]}],
    }),
    defineField({
      name: "designCentre",
      title: "Design Centre",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "address", type: "string" },
        { name: "hours", type: "array", of: [{ type: "string" }] },
        { name: "image", type: "url" },
        { name: "ctaLabel", type: "string" },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "quote", type: "text" },
        { name: "author", type: "string" },
        { name: "role", type: "string" },
        { name: "image", type: "url" },
      ]}],
    }),
    defineField({
      name: "events",
      title: "Events",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "title", type: "string" }, { name: "date", type: "string" }, { name: "description", type: "text" }, { name: "location", type: "string" },
      ]}],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "object", fields: [{ name: "question", type: "string" }, { name: "answer", type: "text" }] }],
    }),
    defineField({
      name: "registration",
      title: "Registration Form",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "submitLabel", type: "string" },
      ],
    }),
    defineField({
      name: "similarCommunities",
      title: "Similar Communities",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "name", type: "string" }, { name: "city", type: "string" }, { name: "stage", type: "string" },
        { name: "priceFrom", type: "string" }, { name: "image", type: "url" }, { name: "href", type: "string" },
      ]}],
    }),
  ],
  preview: {
    select: { title: "hero.communityName", subtitle: "stage" },
  },
});
