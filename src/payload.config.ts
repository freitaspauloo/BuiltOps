import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Communities } from "./collections/Communities";
import { HomeModels } from "./collections/HomeModels";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUrl = process.env.DATABASE_URL || "file:./payload.db";
const usePostgres =
  databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://");

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— BuiltOps CMS",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 812 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Projects, Communities, HomeModels],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-ENV",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: databaseUrl },
        push: process.env.NODE_ENV !== "production",
      })
    : sqliteAdapter({
        client: { url: databaseUrl },
        push: true,
      }),
  sharp,
  upload: {
    limits: {
      // Photos + short property videos
      fileSize: 100_000_000,
    },
  },
});
