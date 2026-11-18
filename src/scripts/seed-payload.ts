/**
 * Seed Payload with Losani demo content (Project + Benchmark + Marigold + Esprit End).
 *
 * Usage:
 *   npm run payload:seed
 */
import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { getPayload } from "payload";

loadEnv({ path: ".env.local", override: true });

async function upsertBySlug(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  collection: "communities" | "home-models" | "projects",
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    const id = existing.docs[0].id;
    await payload.update({
      collection,
      id,
      data,
      draft: false,
      overrideAccess: true,
    });
    console.log(`updated ${collection}/${slug} (#${id})`);
    return id;
  }

  const created = await payload.create({
    collection,
    data,
    draft: false,
    overrideAccess: true,
  });
  console.log(`created ${collection}/${slug} (#${created.id})`);
  return created.id;
}

async function main() {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET missing — set it in .env.local");
  }

  const { default: config } = await import("../payload.config");
  const { benchmarkCommunity } = await import("../lib/data/seed-benchmark");
  const { seedModels } = await import("../lib/data/seed-models");
  const { communityToPayloadData, homeModelToPayloadData } = await import(
    "../lib/payload/to-payload"
  );

  const payload = await getPayload({ config });

  const projectId = await upsertBySlug(payload, "projects", "losani-builtops", {
    name: "Losani Homes — BuiltOps",
    slug: "losani-builtops",
    status: "active",
    brand: "Losani Homes",
    description:
      "Community microsites and home model pages for Losani Homes (Benchmark, models, more).",
  });

  await upsertBySlug(
    payload,
    "communities",
    "benchmark",
    communityToPayloadData(benchmarkCommunity, projectId),
  );

  for (const slug of ["marigold", "esprit-end"] as const) {
    const model = seedModels[slug];
    if (!model) continue;
    await upsertBySlug(
      payload,
      "home-models",
      slug,
      homeModelToPayloadData(model, projectId),
    );
  }

  console.log("\nSeed complete. Published:");
  console.log("  Project:   losani-builtops");
  console.log("  Community: benchmark → /communities/benchmark");
  console.log("  Models:    marigold, esprit-end");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
