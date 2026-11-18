import type { CollectionConfig, Field } from "payload";

import { anyone, authenticated } from "./access";
import { communityAdminPreview } from "@/lib/payload/preview-urls";
import { mediaOrUrlFields } from "./fields/media-or-url";

const STAGE_OPTIONS = [
  { label: "Future", value: "future" },
  { label: "Coming soon", value: "coming_soon" },
  { label: "Available", value: "available" },
];

const LOT_STATUS_OPTIONS = [
  { label: "Available", value: "available" },
  { label: "Sold", value: "sold" },
  { label: "Future", value: "future" },
  { label: "Hold", value: "hold" },
];

const COLLECTION_BADGE_VARIANT_OPTIONS = [
  { label: "Pronto", value: "pronto" },
  { label: "Originals", value: "originals" },
  { label: "Default", value: "default" },
];

/** All section ids that can appear in the scroll order + on/off list. */
const SECTION_ID_OPTIONS = [
  { label: "Hero", value: "hero" },
  { label: "Vision", value: "vision" },
  { label: "Overview", value: "overview" },
  { label: "Quick facts", value: "quickFacts" },
  { label: "Promotions", value: "promotions" },
  { label: "Quick move-in", value: "quickMoveIn" },
  { label: "Floorplans", value: "floorplans" },
  { label: "Site plan", value: "sitePlan" },
  { label: "Video", value: "video" },
  { label: "Gallery", value: "gallery" },
  { label: "Area map", value: "areaMap" },
  { label: "Amenities", value: "amenities" },
  { label: "Downloads", value: "downloads" },
  { label: "Timeline", value: "timeline" },
  { label: "Design centre", value: "designCentre" },
  { label: "Features", value: "features" },
  { label: "Testimonials", value: "testimonials" },
  { label: "Events", value: "events" },
  { label: "FAQ", value: "faq" },
  { label: "Sales office", value: "salesOffice" },
  { label: "Registration", value: "registration" },
  { label: "Similar communities", value: "similarCommunities" },
];

/** Default Available Now (v5) order — each row can be toggled on/off. */
const DEFAULT_AVAILABLE_SECTION_ORDER = [
  "hero",
  "overview",
  "sitePlan",
  "floorplans",
  "quickMoveIn",
  "areaMap",
  "amenities",
  "promotions",
  "gallery",
  "designCentre",
  "testimonials",
  "events",
  "faq",
  "registration",
  "features",
  "similarCommunities",
].map((section) => ({ section, enabled: true }));

const galleryImageFields: Field[] = [
  ...mediaOrUrlFields({
    name: "media",
    label: "Photo / video",
    urlName: "url",
    urlLabel: "Image URL (optional)",
    filterFolders: ["galleries", "lifestyle", "videos", "general"],
    previewName: "_galleryPreview",
  }),
  {
    type: "row",
    fields: [
      {
        name: "alt",
        type: "text",
        label: "Alt text",
        admin: { width: "50%" },
      },
      {
        name: "caption",
        type: "text",
        label: "Caption",
        admin: { width: "50%" },
      },
    ],
  },
];

const galleryAdmin = {
  initCollapsed: true,
  components: {
    RowLabel: "@/components/payload/MediaRowLabel#default",
  },
  description: "Collapsed by default — expand a row to edit. Thumbnails show in the row label.",
} as const;

const collectionBadgeFields: Field[] = [
  {
    type: "row",
    fields: [
      {
        name: "label",
        type: "text",
        label: "Badge label",
        admin: { width: "60%" },
      },
      {
        name: "variant",
        type: "select",
        label: "Badge style",
        dbName: "bvar",
        options: COLLECTION_BADGE_VARIANT_OPTIONS,
        defaultValue: "default",
        admin: { width: "40%" },
      },
    ],
  },
];

/** Lot inventory rows — size is a simple Small/Medium/Large, not pixel width/height. */
const sitePlanLotFields: Field[] = [
  {
    type: "row",
    fields: [
      {
        name: "lotNumber",
        type: "text",
        label: "Lot #",
        required: true,
        admin: { width: "25%" },
      },
      {
        name: "status",
        type: "select",
        label: "Status",
        dbName: "lst",
        options: LOT_STATUS_OPTIONS,
        required: true,
        admin: { width: "25%" },
      },
      {
        name: "markerSize",
        type: "select",
        label: "Marker size",
        dbName: "msz",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
        defaultValue: "md",
        admin: {
          width: "25%",
          description: "How big the hot-spot appears on the site plan.",
        },
      },
      {
        name: "id",
        type: "text",
        label: "ID",
        required: true,
        admin: { width: "25%" },
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "price",
        type: "text",
        label: "Price",
        admin: { width: "33%" },
      },
      {
        name: "floorplan",
        type: "text",
        label: "Floorplan",
        admin: { width: "34%" },
      },
      {
        name: "sqft",
        type: "text",
        label: "Sqft",
        admin: { width: "33%" },
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "possessionDate",
        type: "text",
        label: "Possession",
        admin: { width: "34%" },
      },
      {
        name: "x",
        type: "number",
        label: "Map X",
        admin: {
          width: "33%",
          description: "Optional overlay position (0–100).",
        },
      },
      {
        name: "y",
        type: "number",
        label: "Map Y",
        admin: { width: "33%" },
      },
    ],
  },
];

const lotArrayAdmin = {
  initCollapsed: true,
  components: {
    RowLabel: "@/components/payload/LotRowLabel#default",
  },
  description:
    "Lot inventory. Use Marker size (S/M/L) — no need to set pixel width/height.",
} as const;

export const Communities: CollectionConfig = {
  slug: "communities",
  // Short DB table prefix — nested version enums must stay under 63 chars (SQLite/Postgres).
  dbName: "comm",
  labels: {
    singular: "Community",
    plural: "Communities",
  },
  admin: {
    ...communityAdminPreview(),
    group: "Content",
  },
  versions: {
    drafts: {
      autosave: true,
    },
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
      type: "tabs",
      tabs: [
        {
          label: "Basics",
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
                  name: "stage",
                  type: "select",
                  label: "Stage",
                  options: STAGE_OPTIONS,
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "micrositeVersion",
                  type: "select",
                  label: "Microsite version",
                  options: [
                    { label: "v6", value: "v6" },
                    { label: "v6b (no inventory)", value: "v6b" },
                    { label: "v5", value: "v5" },
                    { label: "v4", value: "v4" },
                    { label: "v3", value: "v3" },
                  ],
                  defaultValue: "v6",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "hero",
              type: "group",
              label: "Hero",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "communityName",
                      type: "text",
                      label: "Community name",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "city",
                      type: "text",
                      label: "City",
                      required: true,
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "statusBadge",
                      type: "select",
                      label: "Status badge",
                      options: STAGE_OPTIONS,
                      required: true,
                      admin: { width: "33%" },
                    },
                    {
                      name: "priceFrom",
                      type: "text",
                      label: "Starting price",
                      admin: { width: "33%" },
                    },
                    {
                      name: "homeTypes",
                      type: "text",
                      label: "Home types",
                      admin: { width: "34%" },
                    },
                  ],
                },
                ...mediaOrUrlFields({
                  name: "heroMedia",
                  label: "Hero photo / video",
                  urlName: "heroImage",
                  urlLabel: "Hero image URL (optional)",
                  filterFolders: ["heroes", "videos", "general"],
                  description: "Upload from the Media library.",
                }),
                {
                  name: "heroVideoUrl",
                  type: "text",
                  label: "Video embed URL",
                  admin: {
                    description: "Optional YouTube / Vimeo URL.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "primaryCtaLabel",
                      type: "text",
                      label: "Primary CTA",
                      admin: { width: "50%" },
                    },
                    {
                      name: "primaryCtaHref",
                      type: "text",
                      label: "Primary link",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "secondaryCtaLabel",
                      type: "text",
                      label: "Secondary CTA",
                      admin: { width: "50%" },
                    },
                    {
                      name: "secondaryCtaHref",
                      type: "text",
                      label: "Secondary link",
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
            {
              name: "sectionOrder",
              type: "array",
              label: "Sections — order & on/off",
              dbName: "sec_ord",
              defaultValue: DEFAULT_AVAILABLE_SECTION_ORDER,
              labels: {
                singular: "Section",
                plural: "Sections",
              },
              admin: {
                description:
                  "Drag to reorder. Toggle OFF to hide. Hero stays at the top of the page regardless of order.",
                initCollapsed: true,
                components: {
                  RowLabel: "@/components/payload/SectionOrderRowLabel#default",
                },
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "section",
                      type: "select",
                      label: "Section",
                      dbName: "sec",
                      options: SECTION_ID_OPTIONS,
                      required: true,
                      admin: { width: "70%" },
                    },
                    {
                      name: "enabled",
                      type: "checkbox",
                      label: "Show on website",
                      defaultValue: true,
                      admin: { width: "30%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Content",
          fields: [
            {
              name: "snapshot",
              type: "array",
              label: "Snapshot facts",
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Label",
                  required: true,
                },
                {
                  name: "value",
                  type: "text",
                  label: "Value",
                  required: true,
                },
              ],
            },
            {
              name: "vision",
              type: "group",
              label: "Vision",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Description",
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
              name: "overview",
              type: "group",
              label: "Overview",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
                },
                {
                  name: "introduction",
                  type: "textarea",
                  label: "Introduction",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Description",
                  required: true,
                },
                {
                  name: "layoutVariant",
                  type: "select",
                  label: "Layout variant",
                  dbName: "olay",
                  options: [
                    { label: "A", value: "a" },
                    { label: "B", value: "b" },
                    { label: "C", value: "c" },
                    { label: "D", value: "d" },
                  ],
                },
                {
                  name: "overviewSectionLayout",
                  type: "select",
                  label: "v5 section layout",
                  dbName: "oslay",
                  options: [
                    { label: "Bento poster", value: "bento-poster" },
                    { label: "Stacked pills", value: "stacked-pills" },
                    { label: "Vertical rail", value: "vertical-rail" },
                    { label: "Inline band", value: "inline-band" },
                  ],
                },
                {
                  name: "brochureUrl",
                  type: "text",
                  label: "Brochure URL",
                },
                {
                  name: "brochureLabel",
                  type: "text",
                  label: "Brochure link label",
                },
              ],
            },
            {
              name: "quickFacts",
              type: "group",
              label: "Quick facts",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                },
                {
                  name: "facts",
                  type: "array",
                  label: "Facts",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Label",
                      required: true,
                    },
                    {
                      name: "value",
                      type: "text",
                      label: "Value",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "videoUrl",
              type: "text",
              label: "Video URL",
            },
            {
              name: "gallery",
              type: "array",
              label: "Gallery",
              admin: galleryAdmin,
              fields: galleryImageFields,
            },
            {
              name: "areaMap",
              type: "group",
              label: "Area map",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
                },
                {
                  name: "points",
                  type: "array",
                  label: "Map points",
                  fields: [
                    {
                      name: "id",
                      type: "text",
                      label: "ID",
                      required: true,
                    },
                    {
                      name: "label",
                      type: "text",
                      label: "Label",
                      required: true,
                    },
                    {
                      name: "category",
                      type: "select",
                      label: "Category",
                      dbName: "cat",
                      options: [
                        { label: "Community", value: "community" },
                        { label: "Sales office", value: "sales" },
                        { label: "School", value: "school" },
                        { label: "Park", value: "park" },
                        { label: "Shopping", value: "shopping" },
                        { label: "Transit", value: "transit" },
                        { label: "Winery", value: "winery" },
                        { label: "Dining", value: "dining" },
                      ],
                      required: true,
                    },
                    {
                      name: "lat",
                      type: "number",
                      label: "Latitude",
                      required: true,
                    },
                    {
                      name: "lng",
                      type: "number",
                      label: "Longitude",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "amenities",
              type: "group",
              label: "Amenities",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
                },
                {
                  name: "items",
                  type: "array",
                  label: "Amenity items",
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
                      name: "icon",
                      type: "text",
                      label: "Icon",
                    },
                    {
                      name: "image",
                      type: "text",
                      label: "Image URL",
                    },
                  ],
                },
                {
                  name: "lifestyleImages",
                  type: "array",
                  label: "Lifestyle images",
                  admin: galleryAdmin,
                  fields: galleryImageFields,
                },
                {
                  name: "brochureUrl",
                  type: "text",
                  label: "Brochure URL",
                },
                {
                  name: "brochureLabel",
                  type: "text",
                  label: "Brochure link label",
                },
              ],
            },
            {
              name: "features",
              type: "group",
              label: "Features",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
                },
                {
                  name: "items",
                  type: "array",
                  label: "Feature items",
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
                  ],
                },
              ],
            },
            {
              name: "downloads",
              type: "array",
              label: "Downloads",
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
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  label: "URL",
                  required: true,
                },
                {
                  name: "thumbnailUrl",
                  type: "text",
                  label: "Thumbnail image URL",
                  admin: {
                    description: "Title-page / cover image used as the carousel thumbnail.",
                  },
                },
              ],
            },
            {
              name: "timeline",
              type: "array",
              label: "Timeline",
              fields: [
                {
                  name: "date",
                  type: "text",
                  label: "Date",
                  required: true,
                },
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
                },
                {
                  name: "status",
                  type: "select",
                  label: "Status",
                  dbName: "tmst",
                  options: [
                    { label: "Complete", value: "complete" },
                    { label: "Current", value: "current" },
                    { label: "Upcoming", value: "upcoming" },
                  ],
                },
              ],
            },
            {
              name: "designCentre",
              type: "group",
              label: "Design centre",
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
                  name: "address",
                  type: "text",
                  label: "Address",
                },
                {
                  name: "hours",
                  type: "text",
                  label: "Hours",
                  hasMany: true,
                },
                {
                  name: "image",
                  type: "text",
                  label: "Image URL",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "CTA label",
                },
              ],
            },
            {
              name: "testimonials",
              type: "array",
              label: "Testimonials",
              fields: [
                {
                  name: "quote",
                  type: "textarea",
                  label: "Quote",
                  required: true,
                },
                {
                  name: "author",
                  type: "text",
                  label: "Author",
                  required: true,
                },
                {
                  name: "role",
                  type: "text",
                  label: "Author role",
                },
                {
                  name: "image",
                  type: "text",
                  label: "Author image URL",
                },
              ],
            },
            {
              name: "events",
              type: "array",
              label: "Events",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
                },
                {
                  name: "date",
                  type: "text",
                  label: "Date",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Description",
                  required: true,
                },
                {
                  name: "location",
                  type: "text",
                  label: "Location",
                },
              ],
            },
            {
              name: "faq",
              type: "array",
              label: "FAQ",
              fields: [
                {
                  name: "question",
                  type: "text",
                  label: "Question",
                  required: true,
                },
                {
                  name: "answer",
                  type: "textarea",
                  label: "Answer",
                  required: true,
                },
              ],
            },
            {
              name: "promotions",
              type: "array",
              label: "Promotions",
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
                  name: "badge",
                  type: "text",
                  label: "Badge",
                },
                {
                  name: "expiresAt",
                  type: "text",
                  label: "Expires at",
                },
                {
                  name: "imageUrl",
                  type: "text",
                  label: "Image URL",
                },
              ],
            },
          ],
        },
        {
          label: "Inventory",
          fields: [
            {
              name: "floorplans",
              type: "array",
              label: "Floorplans",
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: "@/components/payload/MediaRowLabel#default",
                },
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      label: "Name",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "id",
                      type: "text",
                      label: "ID",
                      required: true,
                      admin: { width: "30%" },
                    },
                    {
                      name: "modelSlug",
                      type: "text",
                      label: "Model slug",
                      admin: {
                        width: "30%",
                        description: "Links to `/models/[slug]` when present.",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "beds",
                      type: "number",
                      label: "Beds",
                      required: true,
                      admin: { width: "20%" },
                    },
                    {
                      name: "baths",
                      type: "number",
                      label: "Baths",
                      required: true,
                      admin: { width: "20%" },
                    },
                    {
                      name: "sqft",
                      type: "number",
                      label: "Sqft",
                      required: true,
                      admin: { width: "20%" },
                    },
                    {
                      name: "sqftRange",
                      type: "text",
                      label: "Sqft range",
                      admin: { width: "20%" },
                    },
                    {
                      name: "priceFrom",
                      type: "text",
                      label: "From",
                      required: true,
                      admin: { width: "20%" },
                    },
                  ],
                },
                ...mediaOrUrlFields({
                  name: "imageMedia",
                  label: "Floorplan photo",
                  urlName: "image",
                  urlLabel: "Image URL (optional)",
                  filterFolders: ["floorplans", "elevations", "general"],
                  previewName: "_fpPreview",
                }),
                {
                  type: "row",
                  fields: [
                    {
                      name: "pdfUrl",
                      type: "text",
                      label: "PDF URL",
                      admin: { width: "40%" },
                    },
                    {
                      name: "phase",
                      type: "text",
                      label: "Phase",
                      admin: { width: "20%" },
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      label: "Subtitle",
                      admin: { width: "20%" },
                    },
                    {
                      name: "lotLabel",
                      type: "text",
                      label: "Lot label",
                      admin: {
                        width: "20%",
                        description: "e.g. 46' lot",
                      },
                    },
                  ],
                },
                {
                  name: "tourHref",
                  type: "text",
                  label: "Virtual tour link",
                },
                {
                  name: "collection",
                  type: "group",
                  label: "Collection badge",
                  fields: collectionBadgeFields,
                },
                {
                  name: "levelGallery",
                  type: "array",
                  label: "Per-level gallery",
                  admin: {
                    initCollapsed: true,
                    description: "Ground / main / upper drawings.",
                    components: {
                      RowLabel: "@/components/payload/MediaRowLabel#default",
                    },
                  },
                  fields: galleryImageFields,
                },
              ],
            },
            {
              name: "quickMoveIn",
              type: "array",
              label: "Quick move-in homes",
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "id",
                      type: "text",
                      label: "ID",
                      required: true,
                      admin: { width: "30%" },
                    },
                    {
                      name: "address",
                      type: "text",
                      label: "Address",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "lot",
                      type: "text",
                      label: "Lot",
                      required: true,
                      admin: { width: "30%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "price",
                      type: "text",
                      label: "Price",
                      required: true,
                      admin: { width: "25%" },
                    },
                    {
                      name: "possessionDate",
                      type: "text",
                      label: "Possession",
                      required: true,
                      admin: { width: "25%" },
                    },
                    {
                      name: "beds",
                      type: "number",
                      label: "Beds",
                      required: true,
                      admin: { width: "16%" },
                    },
                    {
                      name: "baths",
                      type: "number",
                      label: "Baths",
                      required: true,
                      admin: { width: "17%" },
                    },
                    {
                      name: "sqft",
                      type: "number",
                      label: "Sqft",
                      required: true,
                      admin: { width: "17%" },
                    },
                  ],
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
              name: "sitePlan",
              type: "group",
              label: "Site plan",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Title",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "aspectRatio",
                      type: "text",
                      label: "Aspect ratio",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "imageUrl",
                  type: "text",
                  label: "Plan image URL",
                  required: true,
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "brochureUrl",
                      type: "text",
                      label: "Brochure URL",
                      admin: { width: "60%" },
                    },
                    {
                      name: "brochureLabel",
                      type: "text",
                      label: "Brochure label",
                      admin: { width: "40%" },
                    },
                  ],
                },
                {
                  name: "lots",
                  type: "array",
                  label: "Lots",
                  admin: lotArrayAdmin,
                  fields: sitePlanLotFields,
                },
                {
                  name: "phases",
                  type: "array",
                  label: "Phases",
                  admin: {
                    initCollapsed: true,
                    description: "Optional multi-phase plans — each phase has its own map + lots.",
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
                          name: "label",
                          type: "text",
                          label: "Label",
                          required: true,
                          admin: { width: "60%" },
                        },
                      ],
                    },
                    {
                      name: "imageUrl",
                      type: "text",
                      label: "Phase image URL",
                      required: true,
                    },
                    {
                      name: "lots",
                      type: "array",
                      label: "Lots",
                      admin: lotArrayAdmin,
                      fields: sitePlanLotFields,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Leads",
          fields: [
            {
              name: "salesOffice",
              type: "group",
              label: "Sales office",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
                },
                {
                  name: "address",
                  type: "text",
                  label: "Address",
                  required: true,
                },
                {
                  name: "phone",
                  type: "text",
                  label: "Phone",
                  required: true,
                },
                {
                  name: "email",
                  type: "email",
                  label: "Email",
                  required: true,
                },
                {
                  name: "hours",
                  type: "text",
                  label: "Hours",
                  hasMany: true,
                },
                {
                  name: "team",
                  type: "array",
                  label: "Team",
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      label: "Name",
                      required: true,
                    },
                    {
                      name: "role",
                      type: "text",
                      label: "Role",
                      required: true,
                    },
                    {
                      name: "phone",
                      type: "text",
                      label: "Phone",
                    },
                    {
                      name: "email",
                      type: "email",
                      label: "Email",
                    },
                    {
                      name: "image",
                      type: "text",
                      label: "Image URL",
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
            {
              name: "similarCommunities",
              type: "array",
              label: "Similar communities",
              dbName: "sim",
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Name",
                  required: true,
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
                  dbName: "sstg",
                  options: STAGE_OPTIONS,
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
                {
                  name: "href",
                  type: "text",
                  label: "Link",
                  required: true,
                },
                {
                  name: "availabilitySummary",
                  type: "text",
                  label: "Availability summary",
                  admin: {
                    description:
                      'Short line on the photo overlay, e.g. "8 Lots Available & 4 Pronto Homes".',
                  },
                },
                {
                  name: "collections",
                  type: "array",
                  label: "Collection badges",
                  dbName: "cbad",
                  fields: collectionBadgeFields,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Description",
                },
                {
                  name: "homeTypes",
                  type: "text",
                  label: "Home types",
                },
                {
                  name: "sizeRange",
                  type: "text",
                  label: "Size range",
                },
                {
                  name: "modelsHref",
                  type: "text",
                  label: "Models link",
                },
                {
                  name: "appointmentHref",
                  type: "text",
                  label: "Appointment link",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
