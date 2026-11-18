import { defineField, defineType } from "sanity";
import { defaultSectionOrderForStage, sectionOrderField } from "./section-order";

/** Sanity initialValue can't easily read sibling stage on create — use Available template. */
const DEFAULT_AVAILABLE_ORDER = defaultSectionOrderForStage("available");

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
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "order", title: "Section order" },
    { name: "content", title: "Page content" },
    { name: "inventory", title: "Homes & site plan" },
    { name: "leads", title: "Visit & registration" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      options: { source: "hero.communityName" },
      validation: (r) => r.required(),
    }),
    { ...stageField, group: "basics" },
    defineField({
      name: "micrositeVersion",
      title: "Microsite version",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "v3", value: "v3" },
          { title: "v4", value: "v4" },
          { title: "v5 (current)", value: "v5" },
        ],
      },
      initialValue: "v5",
    }),
    {
      ...sectionOrderField,
      group: "order",
      initialValue: DEFAULT_AVAILABLE_ORDER,
    },
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "basics",
      fields: [
        { name: "communityName", title: "Community Name", type: "string" },
        {
          name: "statusBadge",
          title: "Status Badge",
          type: "string",
          options: { list: ["future", "coming_soon", "available"] },
        },
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
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "overview",
      title: "Community Overview",
      type: "object",
      group: "content",
      fields: [
        { name: "title", type: "string" },
        { name: "introduction", type: "text" },
        { name: "description", type: "text" },
        {
          name: "overviewSectionLayout",
          title: "Overview layout",
          type: "string",
          options: {
            list: [
              { title: "Split grid", value: "bento-poster" },
              { title: "Stacked pills", value: "stacked-pills" },
              { title: "Vertical rail", value: "vertical-rail" },
              { title: "Inline band", value: "inline-band" },
            ],
          },
        },
        { name: "brochureUrl", title: "Brochure URL", type: "url" },
        { name: "brochureLabel", title: "Brochure label", type: "string" },
      ],
    }),
    defineField({
      name: "quickFacts",
      title: "Quick Facts",
      type: "object",
      group: "content",
      fields: [
        { name: "title", type: "string" },
        {
          name: "facts",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", type: "string" },
                { name: "value", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({ name: "videoUrl", title: "Community Video URL", type: "url", group: "content" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", type: "url" },
            { name: "alt", type: "string" },
            { name: "caption", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "areaMap",
      title: "Area Map",
      type: "object",
      group: "content",
      fields: [
        { name: "title", type: "string" },
        {
          name: "points",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "id", type: "string" },
                { name: "label", type: "string" },
                { name: "category", type: "string" },
                { name: "lat", type: "number" },
                { name: "lng", type: "number" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "amenities",
      title: "Lifestyle / Amenities",
      type: "object",
      group: "content",
      fields: [
        { name: "title", type: "string" },
        {
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "description", type: "text" },
                { name: "icon", type: "string" },
                { name: "image", type: "url" },
              ],
            },
          ],
        },
        { name: "brochureUrl", title: "Brochure URL", type: "url" },
        { name: "brochureLabel", title: "Brochure label", type: "string" },
      ],
    }),
    defineField({
      name: "features",
      title: "Community Features",
      type: "object",
      group: "content",
      fields: [
        { name: "title", type: "string" },
        {
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "description", type: "text" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "sitePlan",
      title: "Site Plan",
      type: "object",
      group: "inventory",
      fields: [
        { name: "title", type: "string" },
        { name: "imageUrl", type: "url" },
        { name: "connectedUrl", title: "Live availability URL", type: "url" },
        {
          name: "lots",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "id", type: "string" },
                { name: "lotNumber", type: "string" },
                { name: "status", type: "string" },
                { name: "x", type: "number" },
                { name: "y", type: "number" },
                { name: "width", type: "number" },
                { name: "height", type: "number" },
                { name: "price", type: "string" },
                { name: "floorplan", type: "string" },
                { name: "possessionDate", type: "string" },
                { name: "modelSlug", title: "Model page slug", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "floorplans",
      title: "Floorplans",
      type: "array",
      group: "inventory",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "name", type: "string" },
            { name: "beds", type: "number" },
            { name: "baths", type: "number" },
            { name: "sqft", type: "number" },
            { name: "priceFrom", type: "string" },
            { name: "image", type: "url" },
            { name: "pdfUrl", type: "url" },
            { name: "phase", type: "string" },
            {
              name: "modelSlug",
              title: "Model page slug",
              type: "string",
              description: "Links card to /models/[slug]",
            },
            { name: "subtitle", type: "string" },
            { name: "lotLabel", type: "string" },
            { name: "sqftRange", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "quickMoveIn",
      title: "Quick Move-In Homes",
      type: "array",
      group: "inventory",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "address", type: "string" },
            { name: "lot", type: "string" },
            { name: "price", type: "string" },
            { name: "possessionDate", type: "string" },
            { name: "beds", type: "number" },
            { name: "baths", type: "number" },
            { name: "sqft", type: "number" },
            { name: "image", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "downloads",
      title: "Downloads",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "type", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "promotions",
      title: "Promotions",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text" },
            { name: "badge", type: "string" },
            { name: "expiresAt", type: "string" },
            { name: "image", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "salesOffice",
      title: "Sales Office",
      type: "object",
      group: "leads",
      fields: [
        { name: "title", type: "string" },
        { name: "address", type: "string" },
        { name: "phone", type: "string" },
        { name: "email", type: "string" },
        { name: "hours", type: "array", of: [{ type: "string" }] },
        {
          name: "team",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", type: "string" },
                { name: "role", type: "string" },
                { name: "phone", type: "string" },
                { name: "email", type: "string" },
                { name: "image", type: "url" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "vision",
      title: "Community Vision",
      type: "object",
      group: "content",
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
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", type: "string" },
            { name: "title", type: "string" },
            { name: "description", type: "text" },
            {
              name: "status",
              type: "string",
              options: { list: ["complete", "current", "upcoming"] },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "designCentre",
      title: "Design Centre",
      type: "object",
      group: "content",
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
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", type: "text" },
            { name: "author", type: "string" },
            { name: "role", type: "string" },
            { name: "image", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "events",
      title: "Events",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "date", type: "string" },
            { name: "description", type: "text" },
            { name: "location", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "registration",
      title: "Registration Form",
      type: "object",
      group: "leads",
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
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "city", type: "string" },
            { name: "stage", type: "string" },
            { name: "priceFrom", type: "string" },
            { name: "image", type: "url" },
            { name: "href", type: "string" },
            { name: "homeTypes", type: "string" },
            { name: "sizeRange", type: "string" },
            { name: "description", type: "text" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "hero.communityName", subtitle: "stage" },
  },
});
