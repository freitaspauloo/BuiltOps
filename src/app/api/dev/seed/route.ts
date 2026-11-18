import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";

import { benchmarkCommunity } from "@/lib/data/seed-benchmark";
import { seedModels } from "@/lib/data/seed-models";
import {
  communityToPayloadData,
  homeModelToPayloadData,
} from "@/lib/payload/to-payload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    return { action: "updated" as const, id, slug };
  }

  const created = await payload.create({
    collection,
    data,
    draft: false,
    overrideAccess: true,
  });
  return { action: "created" as const, id: created.id, slug };
}

/**
 * Dev-only seed: POST /api/dev/seed
 * Loads Project + Benchmark + Marigold + Esprit into Payload and publishes them.
 */
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 403 });
  }

  if (!process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "PAYLOAD_SECRET missing" }, { status: 500 });
  }

  try {
    const payload = await getPayload({ config });

    const project = await upsertBySlug(payload, "projects", "losani-builtops", {
      name: "Losani Homes — BuiltOps",
      slug: "losani-builtops",
      status: "active",
      brand: "Losani Homes",
      description:
        "Community microsites and home model pages for Losani Homes (Benchmark, models, more).",
    });

    const community = await upsertBySlug(
      payload,
      "communities",
      "benchmark",
      communityToPayloadData(benchmarkCommunity, project.id),
    );

    const models = [];
    for (const slug of ["marigold", "esprit-end"] as const) {
      const model = seedModels[slug];
      if (!model) continue;
      models.push(
        await upsertBySlug(
          payload,
          "home-models",
          slug,
          homeModelToPayloadData(model, project.id),
        ),
      );
    }

    return NextResponse.json({
      ok: true,
      project,
      community,
      models,
    });
  } catch (error) {
    console.error("[seed]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Seed failed",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
