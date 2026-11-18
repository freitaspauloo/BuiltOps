import type { Community } from "@/lib/types/community";
import type { HomeModel } from "@/lib/types/model";
import { nearestLotMarkerSize } from "@/lib/payload/lot-marker";

function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => prune(item)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (nested === undefined || nested === null) continue;
      out[key] = prune(nested);
    }
    return out as T;
  }
  return value;
}

function lotToPayload(lot: {
  id: string;
  lotNumber: string;
  status: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  price?: string;
  floorplan?: string;
  sqft?: string;
  possessionDate?: string;
}) {
  return {
    id: lot.id,
    lotNumber: lot.lotNumber,
    status: lot.status,
    markerSize: nearestLotMarkerSize(lot.width, lot.height),
    x: lot.x,
    y: lot.y,
    price: lot.price,
    floorplan: lot.floorplan,
    sqft: lot.sqft,
    possessionDate: lot.possessionDate,
  };
}

/** Convert site Community seed → Payload `communities` document data. */
export function communityToPayloadData(
  community: Community,
  projectId: number | string,
): Record<string, unknown> {
  return prune({
    project: projectId,
    slug: community.slug,
    stage: community.stage,
    micrositeVersion: community.micrositeVersion ?? "v6",
    sectionOrder: (community.sectionOrder ?? [])
      .filter((id) => id !== "snapshot")
      .map((section) => ({
        section,
        enabled: !community.sectionDisabled?.includes(section),
      })),
    hero: {
      communityName: community.hero.communityName,
      statusBadge: community.hero.statusBadge,
      city: community.hero.city,
      priceFrom: community.hero.priceFrom,
      homeTypes: community.hero.homeTypes,
      heroImage: community.hero.heroImage,
      heroVideoUrl: community.hero.heroVideoUrl,
      primaryCtaLabel: community.hero.primaryCta?.label,
      primaryCtaHref: community.hero.primaryCta?.href,
      secondaryCtaLabel: community.hero.secondaryCta?.label,
      secondaryCtaHref: community.hero.secondaryCta?.href,
    },
    snapshot: community.snapshot,
    vision: community.vision?.title ? community.vision : undefined,
    overview: community.overview
      ? {
          title: community.overview.title,
          introduction: community.overview.introduction,
          description: community.overview.description,
          layoutVariant: community.overview.layoutVariant,
          overviewSectionLayout: community.overview.overviewSectionLayout,
          brochureUrl: community.overview.brochureUrl,
          brochureLabel: community.overview.brochureLabel,
        }
      : undefined,
    quickFacts: community.quickFacts,
    videoUrl: community.videoUrl,
    gallery: community.gallery,
    areaMap: community.areaMap,
    amenities: community.amenities
      ? {
          title: community.amenities.title,
          items: community.amenities.items,
          brochureUrl: community.amenities.brochureUrl,
          brochureLabel: community.amenities.brochureLabel,
        }
      : undefined,
    features: community.features,
    downloads: community.downloads,
    promotions: community.promotions,
    timeline: community.timeline,
    designCentre: community.designCentre
      ? {
          title: community.designCentre.title,
          description: community.designCentre.description,
          address: community.designCentre.address,
          hours: community.designCentre.hours,
          image: community.designCentre.image,
          ctaLabel: community.designCentre.ctaLabel,
        }
      : undefined,
    testimonials: community.testimonials,
    events: community.events,
    faq: community.faq,
    floorplans: community.floorplans?.map((fp) => ({
      id: fp.id,
      name: fp.name,
      modelSlug: fp.modelSlug,
      beds: fp.beds,
      baths: fp.baths,
      sqft: fp.sqft,
      sqftRange: fp.sqftRange,
      priceFrom: fp.priceFrom,
      image: fp.image,
      pdfUrl: fp.pdfUrl,
      phase: fp.phase,
      subtitle: fp.subtitle,
      lotLabel: fp.lotLabel,
      tourHref: fp.tourHref,
      collection: fp.collection?.label ? fp.collection : undefined,
      levelGallery: fp.levelGallery,
    })),
    quickMoveIn: community.quickMoveIn,
    sitePlan: community.sitePlan
      ? {
          title: community.sitePlan.title,
          imageUrl: community.sitePlan.imageUrl,
          aspectRatio: community.sitePlan.aspectRatio,
          brochureUrl: community.sitePlan.brochureUrl,
          brochureLabel: community.sitePlan.brochureLabel,
          lots: community.sitePlan.lots?.map(lotToPayload),
          phases: community.sitePlan.phases?.map((phase) => ({
            id: phase.id,
            label: phase.label,
            imageUrl: phase.imageUrl,
            lots: phase.lots?.map(lotToPayload),
          })),
        }
      : undefined,
    salesOffice: community.salesOffice
      ? {
          title: community.salesOffice.title,
          address: community.salesOffice.address,
          phone: community.salesOffice.phone,
          email: community.salesOffice.email,
          hours: community.salesOffice.hours,
          team: community.salesOffice.team,
        }
      : undefined,
    registration: {
      title: community.registration.title,
      description: community.registration.description,
      submitLabel: community.registration.submitLabel,
    },
    similarCommunities: community.similarCommunities?.map((sc) => ({
      name: sc.name,
      city: sc.city,
      stage: sc.stage,
      priceFrom: sc.priceFrom,
      image: sc.image,
      href: sc.href,
      availabilitySummary: sc.availabilitySummary,
      collections: sc.collections,
      description: sc.description,
      homeTypes: sc.homeTypes,
      sizeRange: sc.sizeRange,
      modelsHref: sc.modelsHref,
    })),
  });
}

/** Convert site HomeModel seed → Payload `home-models` document data. */
export function homeModelToPayloadData(
  model: HomeModel,
  projectId: number | string,
): Record<string, unknown> {
  return prune({
    project: projectId,
    name: model.name,
    slug: model.slug,
    homeType: model.homeType,
    collection: model.collection,
    beds: model.beds,
    baths: model.baths,
    sqft: model.sqft,
    storeys: model.storeys,
    garage: model.garage,
    priceFrom: model.priceFrom,
    estimatedPayment: model.estimatedPayment,
    paymentDisclaimer: model.paymentDisclaimer,
    heroImage: model.heroImage,
    intro: model.intro,
    description: model.description.map((paragraph) => ({ paragraph })),
    elevations: model.elevations.map((elevation) => ({
      ...elevation,
      // Array row IDs must be unique across the whole table in SQLite.
      id: `${model.slug}-${elevation.id}`,
    })),
    floorLevels: model.floorLevels.map((level) => ({
      ...level,
      id: `${model.slug}-${level.id}`,
    })),
    floorplanPdfUrl: model.floorplanPdfUrl,
    factSheetUrl: model.factSheetUrl,
    tourUrl: model.tourUrl,
    brochures: model.brochures,
    similarModels: model.similarModels,
    availableAt: model.availableAt,
    registration: {
      title: model.registration.title,
      description: model.registration.description,
      submitLabel: model.registration.submitLabel,
    },
  });
}

