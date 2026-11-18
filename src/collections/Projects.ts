import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "./access";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "updatedAt"],
    group: "Content",
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
      name: "name",
      type: "text",
      label: "Project name",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "Used in URLs — must be unique.",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "active",
      required: true,
    },
    {
      name: "brand",
      type: "text",
      label: "Brand",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
  ],
};
