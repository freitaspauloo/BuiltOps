import type {
  AmenityItem,
  Community,
  CommunityEvent,
  CommunityHero,
  CommunityOverview,
  CommunityStage,
  DesignCentre,
  DownloadAsset,
  FaqItem,
  FeatureItem,
  Floorplan,
  GalleryImage,
  LotStatus,
  Promotion,
  QuickFacts,
  QuickMoveInHome,
  RegistrationForm,
  SalesOffice,
  SectionId,
  SimilarCommunity,
  SnapshotFact,
  Testimonial,
  TimelineMilestone,
} from "@/lib/types/community";
import { resolveMediaAlt, resolveMediaUrl } from "@/collections/fields/media-or-url";
import { resolveLotDimensions } from "@/lib/payload/lot-marker";
import type { SitePlanLot } from "@/lib/types/community";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapSnapshot(value: unknown): SnapshotFact[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  return value.map((row) => {
    const item = asRecord(row) ?? {};
    return { label: asString(item.label), value: asString(item.value) };
  });
}

function mapGallery(value: unknown): GalleryImage[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  const images: GalleryImage[] = [];
  for (const row of value) {
    const item = asRecord(row) ?? {};
    const url = resolveMediaUrl(item.media, asString(item.url));
    if (!url) continue;
    images.push({
      url,
      alt: asString(item.alt) || resolveMediaAlt(item.media, "Gallery image"),
      caption: asString(item.caption) || undefined,
    });
  }
  return images.length ? images : undefined;
}

function mapSitePlanLot(row: unknown): SitePlanLot {
  const lot = asRecord(row) ?? {};
  const dims = resolveLotDimensions({
    markerSize: asString(lot.markerSize) || undefined,
    width: asNumber(lot.width) || undefined,
    height: asNumber(lot.height) || undefined,
  });
  return {
    id: asString(lot.id),
    lotNumber: asString(lot.lotNumber),
    status: (asString(lot.status, "available") as LotStatus) || "available",
    x: asNumber(lot.x) || undefined,
    y: asNumber(lot.y) || undefined,
    width: dims.width,
    height: dims.height,
    price: asString(lot.price) || undefined,
    floorplan: asString(lot.floorplan) || undefined,
    sqft: asString(lot.sqft) || undefined,
    possessionDate: asString(lot.possessionDate) || undefined,
  };
}

function mapSectionOrder(value: unknown): {
  sectionOrder?: SectionId[];
  sectionDisabled?: SectionId[];
} {
  if (!Array.isArray(value) || value.length === 0) return {};
  const sectionOrder: SectionId[] = [];
  const sectionDisabled: SectionId[] = [];

  for (const row of value) {
    if (typeof row === "string") {
      sectionOrder.push(row as SectionId);
      continue;
    }
    const item = asRecord(row);
    if (!item) continue;
    const section = asString(item.section) as SectionId;
    if (!section) continue;
    sectionOrder.push(section);
    if (item.enabled === false) sectionDisabled.push(section);
  }

  return {
    sectionOrder: sectionOrder.length ? sectionOrder : undefined,
    sectionDisabled: sectionDisabled.length ? sectionDisabled : undefined,
  };
}

function mapHero(value: unknown): CommunityHero {
  const hero = asRecord(value) ?? {};
  const heroImage =
    resolveMediaUrl(hero.heroMedia, asString(hero.heroImage)) || asString(hero.heroImage);

  return {
    communityName: asString(hero.communityName, "Community"),
    statusBadge: (asString(hero.statusBadge, "available") as CommunityStage) || "available",
    city: asString(hero.city),
    priceFrom: asString(hero.priceFrom) || undefined,
    homeTypes: asString(hero.homeTypes) || undefined,
    heroImage,
    heroVideoUrl: asString(hero.heroVideoUrl) || undefined,
    primaryCta: {
      label: asString(hero.primaryCtaLabel, "Book Appointment"),
      href: asString(hero.primaryCtaHref, "#registration"),
    },
    secondaryCta: asString(hero.secondaryCtaLabel)
      ? {
          label: asString(hero.secondaryCtaLabel),
          href: asString(hero.secondaryCtaHref, "#downloads"),
        }
      : undefined,
  };
}

function mapOverview(value: unknown): CommunityOverview | undefined {
  const overview = asRecord(value);
  if (!overview) return undefined;
  if (!overview.title && !overview.introduction) return undefined;
  return {
    title: asString(overview.title),
    introduction: asString(overview.introduction),
    description: asString(overview.description),
    overviewSectionLayout: overview.overviewSectionLayout as CommunityOverview["overviewSectionLayout"],
    brochureUrl: asString(overview.brochureUrl) || undefined,
    brochureLabel: asString(overview.brochureLabel) || undefined,
  };
}

function mapQuickFacts(value: unknown): QuickFacts | undefined {
  const qf = asRecord(value);
  if (!qf) return undefined;
  const facts = mapSnapshot(qf.facts);
  if (!facts?.length) return undefined;
  return { title: asString(qf.title) || undefined, facts };
}

function mapRegistration(value: unknown): RegistrationForm {
  const reg = asRecord(value) ?? {};
  return {
    title: asString(reg.title, "Book an Appointment"),
    description: asString(reg.description),
    submitLabel: asString(reg.submitLabel, "Submit"),
  };
}

/** Map a Payload `communities` document to the site `Community` type. */
export function mapPayloadCommunity(doc: UnknownRecord): Community {
  const stage = (asString(doc.stage, "available") as CommunityStage) || "available";
  const overview = mapOverview(doc.overview);
  const vision = asRecord(doc.vision);
  const amenities = asRecord(doc.amenities);
  const features = asRecord(doc.features);
  const areaMap = asRecord(doc.areaMap);
  const sitePlan = asRecord(doc.sitePlan);
  const designCentre = asRecord(doc.designCentre);
  const salesOffice = asRecord(doc.salesOffice);
  const { sectionOrder, sectionDisabled } = mapSectionOrder(doc.sectionOrder);
  const timeline = asRecord(doc.timeline);

  const community: Community = {
    slug: asString(doc.slug),
    stage,
    micrositeVersion: asString(doc.micrositeVersion, "v6") as Community["micrositeVersion"],
    sectionOrder,
    sectionDisabled,
    hero: mapHero(doc.hero),
    snapshot: mapSnapshot(doc.snapshot) ?? [],
    registration: mapRegistration(doc.registration),
  };

  if (vision?.title) {
    community.vision = {
      title: asString(vision.title),
      description: asString(vision.description),
      highlights: asStringArray(vision.highlights),
    };
  }

  if (overview) community.overview = overview;
  const quickFacts = mapQuickFacts(doc.quickFacts);
  if (quickFacts) community.quickFacts = quickFacts;
  if (asString(doc.videoUrl)) community.videoUrl = asString(doc.videoUrl);

  const gallery = mapGallery(doc.gallery);
  if (gallery) community.gallery = gallery;

  if (areaMap?.title || (Array.isArray(areaMap?.points) && areaMap.points.length)) {
    community.areaMap = {
      title: asString(areaMap?.title, "Location"),
      points: Array.isArray(areaMap?.points)
        ? areaMap.points.map((row) => {
            const p = asRecord(row) ?? {};
            return {
              id: asString(p.id),
              label: asString(p.label),
              category: asString(p.category, "community") as
                | "community"
                | "sales"
                | "school"
                | "park"
                | "shopping"
                | "transit"
                | "winery"
                | "dining",
              lat: asNumber(p.lat),
              lng: asNumber(p.lng),
            };
          })
        : [],
    };
  }

  if (amenities?.title || (Array.isArray(amenities?.items) && amenities.items.length)) {
    community.amenities = {
      title: asString(amenities?.title, "Lifestyle"),
      items: (Array.isArray(amenities?.items) ? amenities.items : []).map((row) => {
        const item = asRecord(row) ?? {};
        return {
          title: asString(item.title),
          description: asString(item.description),
          icon: asString(item.icon) || undefined,
          image: asString(item.image) || undefined,
        } satisfies AmenityItem;
      }),
      brochureUrl: asString(amenities?.brochureUrl) || undefined,
      brochureLabel: asString(amenities?.brochureLabel) || undefined,
    };
  }

  if (features?.title || (Array.isArray(features?.items) && features.items.length)) {
    community.features = {
      title: asString(features?.title, "Why Losani"),
      items: (Array.isArray(features?.items) ? features.items : []).map((row) => {
        const item = asRecord(row) ?? {};
        return {
          title: asString(item.title),
          description: asString(item.description),
        } satisfies FeatureItem;
      }),
    };
  }

  if (Array.isArray(doc.downloads) && doc.downloads.length) {
    community.downloads = doc.downloads.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        title: asString(item.title),
        type: asString(item.type),
        url: asString(item.url),
        thumbnailUrl: asString(item.thumbnailUrl) || undefined,
      } satisfies DownloadAsset;
    });
  }

  if (Array.isArray(doc.promotions) && doc.promotions.length) {
    community.promotions = doc.promotions.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        title: asString(item.title),
        description: asString(item.description),
        badge: asString(item.badge) || undefined,
        expiresAt: asString(item.expiresAt) || undefined,
        imageUrl: asString(item.imageUrl) || undefined,
      } satisfies Promotion;
    });
  }

  if (Array.isArray(doc.floorplans) && doc.floorplans.length) {
    community.floorplans = doc.floorplans.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        id: asString(item.id),
        name: asString(item.name),
        beds: asNumber(item.beds),
        baths: asNumber(item.baths),
        sqft: asNumber(item.sqft),
        priceFrom: asString(item.priceFrom),
        image: resolveMediaUrl(item.imageMedia, asString(item.image)),
        pdfUrl: asString(item.pdfUrl) || undefined,
        phase: asString(item.phase) || undefined,
        modelSlug: asString(item.modelSlug) || undefined,
        subtitle: asString(item.subtitle) || undefined,
        lotLabel: asString(item.lotLabel) || undefined,
        sqftRange: asString(item.sqftRange) || undefined,
        tourHref: asString(item.tourHref) || undefined,
      } satisfies Floorplan;
    });
  }

  if (Array.isArray(doc.quickMoveIn) && doc.quickMoveIn.length) {
    community.quickMoveIn = doc.quickMoveIn.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        id: asString(item.id),
        address: asString(item.address),
        lot: asString(item.lot),
        price: asString(item.price),
        possessionDate: asString(item.possessionDate),
        beds: asNumber(item.beds),
        baths: asNumber(item.baths),
        sqft: asNumber(item.sqft),
        image: asString(item.image),
      } satisfies QuickMoveInHome;
    });
  }

  if (sitePlan && (sitePlan.title || sitePlan.imageUrl || Array.isArray(sitePlan.lots))) {
    community.sitePlan = {
      title: asString(sitePlan.title, "Site Plan"),
      imageUrl: asString(sitePlan.imageUrl),
      brochureUrl: asString(sitePlan.brochureUrl) || undefined,
      brochureLabel: asString(sitePlan.brochureLabel) || undefined,
      lots: Array.isArray(sitePlan.lots) ? sitePlan.lots.map(mapSitePlanLot) : [],
      phases: Array.isArray(sitePlan.phases)
        ? sitePlan.phases.map((row) => {
            const phase = asRecord(row) ?? {};
            return {
              id: asString(phase.id),
              label: asString(phase.label),
              imageUrl: asString(phase.imageUrl),
              lots: Array.isArray(phase.lots) ? phase.lots.map(mapSitePlanLot) : [],
            };
          })
        : undefined,
    };
  }

  if (Array.isArray(doc.testimonials) && doc.testimonials.length) {
    community.testimonials = doc.testimonials.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        quote: asString(item.quote),
        author: asString(item.author),
        role: asString(item.role) || undefined,
        image: asString(item.image) || undefined,
      } satisfies Testimonial;
    });
  }

  if (Array.isArray(doc.events) && doc.events.length) {
    community.events = doc.events.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        title: asString(item.title),
        date: asString(item.date),
        description: asString(item.description),
        location: asString(item.location) || undefined,
      } satisfies CommunityEvent;
    });
  }

  if (Array.isArray(doc.faq) && doc.faq.length) {
    community.faq = doc.faq.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        question: asString(item.question),
        answer: asString(item.answer),
      } satisfies FaqItem;
    });
  }

  if (designCentre?.title) {
    community.designCentre = {
      title: asString(designCentre.title),
      description: asString(designCentre.description),
      address: asString(designCentre.address) || undefined,
      hours: asStringArray(designCentre.hours),
      image: asString(designCentre.image) || undefined,
      ctaLabel: asString(designCentre.ctaLabel) || undefined,
    } satisfies DesignCentre;
  }

  if (timeline && Array.isArray(timeline.milestones) && timeline.milestones.length) {
    community.timeline = timeline.milestones.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        date: asString(item.date),
        title: asString(item.title),
        description: asString(item.description) || undefined,
        status: asString(item.status) as TimelineMilestone["status"],
      };
    });
  } else if (Array.isArray(doc.timeline) && doc.timeline.length) {
    community.timeline = doc.timeline.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        date: asString(item.date),
        title: asString(item.title),
        description: asString(item.description) || undefined,
        status: asString(item.status) as TimelineMilestone["status"],
      };
    });
  }

  if (salesOffice?.title || salesOffice?.address) {
    community.salesOffice = {
      title: asString(salesOffice.title, "Sales Office"),
      address: asString(salesOffice.address),
      phone: asString(salesOffice.phone),
      email: asString(salesOffice.email),
      hours: asStringArray(salesOffice.hours),
    } satisfies SalesOffice;
  }

  if (Array.isArray(doc.similarCommunities) && doc.similarCommunities.length) {
    community.similarCommunities = doc.similarCommunities.map((row) => {
      const item = asRecord(row) ?? {};
      return {
        name: asString(item.name),
        city: asString(item.city),
        stage: (asString(item.stage, "available") as CommunityStage) || "available",
        priceFrom: asString(item.priceFrom) || undefined,
        image: asString(item.image),
        href: asString(item.href),
        description: asString(item.description) || undefined,
        homeTypes: asString(item.homeTypes) || undefined,
        availabilitySummary: asString(item.availabilitySummary) || undefined,
      } satisfies SimilarCommunity;
    });
  }

  return community;
}
