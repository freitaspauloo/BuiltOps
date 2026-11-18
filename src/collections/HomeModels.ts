import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "./access";
import { homeModelAdminPreview } from "@/lib/payload/preview-urls";
import { mediaOrUrlFields } from "./fields/media-or-url";

export const HomeModels: CollectionConfig = {
  slug: "home-models",
  dbName: "hmod",
  labels: {
    singular: "Home model",
    plural: "Home models",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "project", "homeType", "priceFrom", "updatedAt"],
    group: "Content",
    ...homeModelAdminPreview(),
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "project",
          type: "relationship",
          label: "Project",
          relationTo: "projects",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "slug",
          type: "text",
          label: "Slug",
          required: true,
          unique: true,
          admin: {
            width: "50%",
            description: "URL slug — must be unique.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Model name",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "homeType",
          type: "select",
          label: "Home type",
          options: [
            { label: "Townhome", value: "townhome" },
            { label: "Detached", value: "detached" },
          ],
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "collection",
      type: "text",
      label: "Collection label",
      admin: {
        description: 'e.g. "Benchmark Collection — Phase 2"',
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "beds",
          type: "number",
          label: "Beds",
          required: true,
          admin: { width: "25%" },
        },
        {
          name: "baths",
          type: "number",
          label: "Baths",
          required: true,
          admin: { width: "25%" },
        },
        {
          name: "sqft",
          type: "number",
          label: "Sqft",
          required: true,
          admin: { width: "25%" },
        },
        {
          name: "storeys",
          type: "number",
          label: "Storeys",
          admin: { width: "25%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "garage",
          type: "text",
          label: "Garage",
          admin: { width: "33%" },
        },
        {
          name: "priceFrom",
          type: "text",
          label: "Starting price",
          admin: { width: "33%" },
        },
        {
          name: "estimatedPayment",
          type: "text",
          label: "Est. payment",
          admin: { width: "34%" },
        },
      ],
    },
    {
      name: "paymentDisclaimer",
      type: "text",
      label: "Payment disclaimer",
    },
    ...mediaOrUrlFields({
      name: "heroMedia",
      label: "Hero photo",
      urlName: "heroImage",
      urlLabel: "Hero image URL (optional)",
      filterFolders: ["heroes", "elevations", "general"],
    }),
    {
      name: "intro",
      type: "textarea",
      label: "Intro / dek",
      admin: {
        description: "Short dek shown in the description section intro.",
      },
    },
    {
      name: "description",
      type: "array",
      label: "Description paragraphs",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "paragraph",
          type: "textarea",
          label: "Paragraph",
          required: true,
        },
      ],
    },
    {
      name: "elevations",
      type: "array",
      label: "Elevations",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/payload/MediaRowLabel#default",
        },
        description: "Expand a row to edit — thumbnail shows in the label.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "id",
              type: "text",
              label: "ID",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "name",
              type: "text",
              label: "Name",
              required: true,
              admin: { width: "60%" },
            },
          ],
        },
        ...mediaOrUrlFields({
          name: "imageMedia",
          label: "Elevation photo",
          urlName: "image",
          urlLabel: "Image URL (optional)",
          filterFolders: ["elevations", "heroes", "general"],
        }),
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
        {
          name: "materials",
          type: "text",
          label: "Materials",
          hasMany: true,
          admin: {
            description: "Material palette — e.g. brick, stone, stucco.",
          },
        },
      ],
    },
    {
      name: "floorLevels",
      type: "array",
      label: "Floor levels",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/payload/MediaRowLabel#default",
        },
        description: "Expand a row to edit — thumbnail shows in the label.",
      },
      fields: [
        {
          name: "id",
          type: "text",
          label: "ID",
          required: true,
        },
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        ...mediaOrUrlFields({
          name: "imageMedia",
          label: "Floorplan drawing",
          urlName: "image",
          urlLabel: "Drawing URL (optional)",
          filterFolders: ["floorplans", "general"],
        }),
        {
          name: "sqft",
          type: "number",
          label: "Square footage",
        },
        {
          name: "highlights",
          type: "text",
          label: "Highlights",
          hasMany: true,
        },
      ],
    },
    {
      name: "floorplanPdfUrl",
      type: "text",
      label: "Floorplan PDF URL",
    },
    {
      name: "factSheetUrl",
      type: "text",
      label: "Fact sheet URL",
    },
    {
      name: "tourUrl",
      type: "text",
      label: "Virtual tour URL",
      admin: {
        description: "Embeddable virtual tour URL (iframe). Placeholder shown when absent.",
      },
    },
    {
      name: "brochures",
      type: "array",
      label: "Brochures",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "type",
          type: "text",
          label: "Type",
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          required: true,
        },
      ],
    },
    {
      name: "similarModels",
      type: "array",
      label: "Similar models",
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Slug",
          required: true,
        },
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "homeType",
          type: "select",
          label: "Home type",
          options: [
            { label: "Townhome", value: "townhome" },
            { label: "Detached", value: "detached" },
          ],
          required: true,
        },
        {
          name: "beds",
          type: "number",
          label: "Bedrooms",
          required: true,
        },
        {
          name: "baths",
          type: "number",
          label: "Bathrooms",
          required: true,
        },
        {
          name: "sqft",
          type: "number",
          label: "Square footage",
          required: true,
        },
        {
          name: "priceFrom",
          type: "text",
          label: "Starting price",
        },
        {
          name: "image",
          type: "text",
          label: "Image URL",
          required: true,
        },
      ],
    },
    {
      name: "availableAt",
      type: "array",
      label: "Available at",
      admin: {
        description: "Communities offering this model — rendered last before registration.",
      },
      fields: [
        {
          name: "communityName",
          type: "text",
          label: "Community name",
          required: true,
        },
        {
          name: "communitySlug",
          type: "text",
          label: "Community slug",
          admin: {
            description: "Internal microsite slug when the community has a BuiltOps page.",
          },
        },
        {
          name: "city",
          type: "text",
          label: "City",
          required: true,
        },
        {
          name: "stage",
          type: "select",
          label: "Stage",
          options: [
            { label: "Future", value: "future" },
            { label: "Coming soon", value: "coming_soon" },
            { label: "Available", value: "available" },
          ],
          required: true,
        },
        {
          name: "priceFrom",
          type: "text",
          label: "Starting price",
        },
        {
          name: "image",
          type: "text",
          label: "Image URL",
        },
        {
          name: "connectedUrl",
          type: "text",
          label: "Connected site URL",
          required: true,
          admin: {
            description: "Community-level live availability link on the connected experience.",
          },
        },
        {
          name: "lots",
          type: "array",
          label: "Lots",
          fields: [
            {
              name: "lotNumber",
              type: "text",
              label: "Lot number",
              required: true,
            },
            {
              name: "status",
              type: "select",
              label: "Status",
              options: [
                { label: "Available", value: "available" },
                { label: "Sold", value: "sold" },
                { label: "Future", value: "future" },
                { label: "Hold", value: "hold" },
              ],
              required: true,
            },
            {
              name: "price",
              type: "text",
              label: "Price",
            },
            {
              name: "connectedUrl",
              type: "text",
              label: "Connected site URL",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "registration",
      type: "group",
      label: "Registration form",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          required: true,
        },
        {
          name: "submitLabel",
          type: "text",
          label: "Submit button label",
          required: true,
        },
      ],
    },
  ],
};
