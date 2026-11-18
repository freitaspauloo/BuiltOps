import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchAllModelSlugs, fetchModel } from "@/lib/data/get-model";
import { ModelPage } from "@/components/models/model-page";
import type { HomeModel } from "@/lib/types/model";

export async function generateStaticParams() {
  const slugs = await fetchAllModelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = await fetchModel(slug);
  if (!model) return {};

  const homeTypeLabel = model.homeType === "townhome" ? "Townhome" : "Detached Home";
  const title = `The ${model.name} — ${model.beds} Bed ${homeTypeLabel} | Losani Homes`;
  const description = `${model.intro} ${model.beds} beds · ${model.baths} baths · ${model.sqft.toLocaleString()} sqft${model.priceFrom ? ` · ${model.priceFrom}` : ""}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: model.heroImage, alt: `${model.name} rendering` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [model.heroImage],
    },
  };
}

function parsePrice(value?: string): number | null {
  if (!value) return null;
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : null;
}

function buildJsonLd(model: HomeModel, slug: string) {
  const price = parsePrice(model.priceFrom);

  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `The ${model.name} by Losani Homes`,
    description: model.intro,
    image: model.heroImage,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://builtops.vercel.app"}/models/${slug}`,
    brand: { "@type": "Brand", name: "Losani Homes" },
  };

  if (price !== null) {
    product.offers = {
      "@type": "Offer",
      priceCurrency: "CAD",
      price,
      availability: "https://schema.org/InStock",
    };
  }

  return product;
}

export default async function ModelRoutePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; lot?: string }>;
}) {
  const { slug } = await params;
  const { from, lot } = await searchParams;
  const model = await fetchModel(slug);

  if (!model) notFound();

  // Only allow internal paths as a back-link target.
  const safeFrom = from?.startsWith("/") && !from.startsWith("//") ? from : undefined;

  const jsonLd = buildJsonLd(model, slug);

  return (
    <div
      className="relative isolate min-w-0 overflow-x-clip"
      data-microsite-version="v6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModelPage model={model} fromParam={safeFrom} lotParam={lot} />
    </div>
  );
}
