import type { CollectionConfig } from "payload";

import { isAdmin, userIsAdmin } from "./access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role", "updatedAt"],
    group: "Admin",
  },
  access: {
    // First user can self-register; after that only admins create accounts.
    create: async ({ req }) => {
      if (userIsAdmin(req.user)) return true;
      const existing = await req.payload.find({
        collection: "users",
        limit: 0,
        overrideAccess: true,
      });
      return existing.totalDocs === 0;
    },
    read: ({ req: { user } }) => {
      if (userIsAdmin(user)) return true;
      if (user?.id) return { id: { equals: user.id } };
      return false;
    },
    update: ({ req: { user } }) => {
      if (userIsAdmin(user)) return true;
      if (user?.id) return { id: { equals: user.id } };
      return false;
    },
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== "create") return data;
        const existing = await req.payload.find({
          collection: "users",
          limit: 0,
          overrideAccess: true,
        });
        // First account is always admin.
        if (existing.totalDocs === 0) {
          return { ...data, role: "admin" };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      label: "Role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      defaultValue: "editor",
      required: true,
      access: {
        update: ({ req: { user } }) => userIsAdmin(user),
      },
      admin: {
        description: "Admins can manage users; editors can manage content only.",
      },
    },
  ],
};
