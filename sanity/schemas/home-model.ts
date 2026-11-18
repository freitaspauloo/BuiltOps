import { defineField, defineType } from "sanity";

/**
 * Home model page — mirrors `/models/[slug]` (Marigold, Esprit End, etc.).
 * Used for every detached / townhome product, not a one-off page.
 */
export const homeModelSchema = defineType({
  name: "homeModel",
  title: "Home model",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "elevations", title: "Elevations" },
    { name: "floorplans", title: "Floorplans" },
    { name: "tour", title: "Virtual tour" },
    { name: "availability", title: "Available at" },
    { name: "registration", title: "Registration" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Model name",
      type: "string",
      group: "basics",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "homeType",
      title: "Home type",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "Townhome", value: "townhome" },
          { title: "Detached", value: "detached" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "collection", title: "Collection label", type: "string", group: "basics" }),
    defineField({ name: "beds", title: "Bedrooms", type: "number", group: "basics" }),
    defineField({ name: "baths", title: "Bathrooms", type: "number", group: "basics" }),
    defineField({ name: "sqft", title: "Square feet", type: "number", group: "basics" }),
    defineField({ name: "storeys", title: "Storeys", type: "number", group: "basics" }),
    defineField({ name: "garage", title: "Garage", type: "string", group: "basics" }),
    defineField({ name: "priceFrom", title: "Starting price", type: "string", group: "basics" }),
    defineField({
      name: "estimatedPayment",
      title: "Estimated payment",
      type: "string",
      group: "basics",
      description: 'e.g. "Est. $4,002/mo"',
    }),
    defineField({
      name: "paymentDisclaimer",
      title: "Payment disclaimer",
      type: "text",
      group: "basics",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image URL",
      type: "url",
      group: "basics",
      validation: (r) => r.required(),
    }),
    defineField({ name: "intro", title: "Short intro", type: "text", group: "basics" }),
    defineField({
      name: "description",
      title: "Description paragraphs",
      type: "array",
      of: [{ type: "text" }],
      group: "basics",
    }),
    defineField({
      name: "elevations",
      title: "Elevations",
      description: "Detached models: add Traditional, Chateau, Modern, etc. Townhomes usually have one.",
      type: "array",
      group: "elevations",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "name", title: "Name", type: "string" },
            { name: "image", title: "Image URL", type: "url" },
            { name: "description", title: "Description", type: "string" },
            {
              name: "materials",
              title: "Materials",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "floorLevels",
      title: "Floor levels",
      type: "array",
      group: "floorplans",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "name", title: "Level name", type: "string" },
            { name: "image", title: "Drawing URL", type: "url" },
            { name: "sqft", title: "Sqft", type: "number" },
            {
              name: "highlights",
              title: "Highlights",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),
    defineField({
      name: "floorplanPdfUrl",
      title: "Floorplan PDF / fact sheet URL",
      type: "url",
      group: "floorplans",
    }),
    defineField({
      name: "factSheetUrl",
      title: "Fact sheet URL",
      type: "url",
      group: "floorplans",
    }),
    defineField({
      name: "brochures",
      title: "Brochures",
      type: "array",
      group: "floorplans",
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
      name: "tourUrl",
      title: "Virtual tour embed URL",
      description: "PrevU / Matterport iframe URL",
      type: "url",
      group: "tour",
    }),
    defineField({
      name: "similarModels",
      title: "Similar models",
      type: "array",
      group: "availability",
      of: [
        {
          type: "object",
          fields: [
            { name: "slug", title: "Model slug", type: "string" },
            { name: "name", title: "Name", type: "string" },
            {
              name: "homeType",
              title: "Home type",
              type: "string",
              options: {
                list: [
                  { title: "Townhome", value: "townhome" },
                  { title: "Detached", value: "detached" },
                ],
              },
            },
            { name: "beds", type: "number" },
            { name: "baths", type: "number" },
            { name: "sqft", type: "number" },
            { name: "priceFrom", type: "string" },
            { name: "image", type: "url" },
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),
    defineField({
      name: "availableAt",
      title: "Available at",
      type: "array",
      group: "availability",
      of: [
        {
          type: "object",
          fields: [
            { name: "communityName", title: "Community name", type: "string" },
            { name: "communitySlug", title: "Community slug", type: "string" },
            { name: "city", title: "City", type: "string" },
            {
              name: "stage",
              title: "Stage",
              type: "string",
              options: {
                list: [
                  { title: "Future", value: "future" },
                  { title: "Coming soon", value: "coming_soon" },
                  { title: "Available", value: "available" },
                ],
              },
            },
            { name: "priceFrom", title: "Price from", type: "string" },
            { name: "image", title: "Image URL", type: "url" },
            { name: "connectedUrl", title: "Connected experience URL", type: "url" },
            {
              name: "lots",
              title: "Lots",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "lotNumber", type: "string" },
                    { name: "status", type: "string" },
                    { name: "price", type: "string" },
                    { name: "connectedUrl", type: "url" },
                  ],
                },
              ],
            },
          ],
          preview: { select: { title: "communityName", subtitle: "city" } },
        },
      ],
    }),
    defineField({
      name: "registration",
      title: "Registration",
      type: "object",
      group: "registration",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "submitLabel", type: "string" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "homeType", media: "heroImage" },
  },
});
