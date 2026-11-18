import type { DownloadAsset, CommunityStage, LotStatus } from "@/lib/types/community";
import type {
  HomeModel,
  HomeType,
  ModelAvailability,
  ModelElevation,
  ModelFloorLevel,
  SimilarModel,
} from "@/lib/types/model";
import { resolveMediaUrl } from "@/collections/fields/media-or-url";

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

/** Map a Payload `home-models` document to the site `HomeModel` type. */
export function mapPayloadHomeModel(doc: UnknownRecord): HomeModel {
  const descriptionRaw = doc.description;
  let description: string[] = [];
  if (Array.isArray(descriptionRaw)) {
    description = descriptionRaw
      .map((row) => {
        if (typeof row === "string") return row;
        const item = asRecord(row);
        return item ? asString(item.paragraph || item.text || item.value) : "";
      })
      .filter(Boolean);
  }

  const elevations: ModelElevation[] = Array.isArray(doc.elevations)
    ? doc.elevations.map((row) => {
        const item = asRecord(row) ?? {};
        return {
          id: asString(item.id),
          name: asString(item.name),
          image: resolveMediaUrl(item.imageMedia, asString(item.image)) || asString(item.image),
          description: asString(item.description) || undefined,
          materials: asStringArray(item.materials),
        };
      })
    : [];

  const floorLevels: ModelFloorLevel[] = Array.isArray(doc.floorLevels)
    ? doc.floorLevels.map((row) => {
        const item = asRecord(row) ?? {};
        return {
          id: asString(item.id),
          name: asString(item.name),
          image: resolveMediaUrl(item.imageMedia, asString(item.image)) || asString(item.image),
          sqft: typeof item.sqft === "number" ? item.sqft : undefined,
          highlights: asStringArray(item.highlights),
        };
      })
    : [];

  const similarModels: SimilarModel[] = Array.isArray(doc.similarModels)
    ? doc.similarModels.map((row) => {
        const item = asRecord(row) ?? {};
        return {
          slug: asString(item.slug),
          name: asString(item.name),
          homeType: (asString(item.homeType, "townhome") as HomeType) || "townhome",
          beds: asNumber(item.beds),
          baths: asNumber(item.baths),
          sqft: asNumber(item.sqft),
          priceFrom: asString(item.priceFrom) || undefined,
          image: asString(item.image),
        };
      })
    : [];

  const availableAt: ModelAvailability[] = Array.isArray(doc.availableAt)
    ? doc.availableAt.map((row) => {
        const item = asRecord(row) ?? {};
        return {
          communityName: asString(item.communityName),
          communitySlug: asString(item.communitySlug) || undefined,
          city: asString(item.city),
          stage: (asString(item.stage, "available") as CommunityStage) || "available",
          priceFrom: asString(item.priceFrom) || undefined,
          image: asString(item.image) || undefined,
          connectedUrl: asString(item.connectedUrl),
          lots: Array.isArray(item.lots)
            ? item.lots.map((lotRow) => {
                const lot = asRecord(lotRow) ?? {};
                return {
                  lotNumber: asString(lot.lotNumber),
                  status: (asString(lot.status, "available") as LotStatus) || "available",
                  price: asString(lot.price) || undefined,
                  connectedUrl: asString(lot.connectedUrl),
                };
              })
            : [],
        };
      })
    : [];

  const brochures: DownloadAsset[] | undefined = Array.isArray(doc.brochures)
    ? doc.brochures.map((row) => {
        const item = asRecord(row) ?? {};
        return {
          title: asString(item.title),
          type: asString(item.type),
          url: asString(item.url),
        };
      })
    : undefined;

  const registration = asRecord(doc.registration) ?? {};

  return {
    slug: asString(doc.slug),
    name: asString(doc.name),
    homeType: (asString(doc.homeType, "townhome") as HomeType) || "townhome",
    collection: asString(doc.collection) || undefined,
    beds: asNumber(doc.beds),
    baths: asNumber(doc.baths),
    sqft: asNumber(doc.sqft),
    storeys: typeof doc.storeys === "number" ? doc.storeys : undefined,
    garage: asString(doc.garage) || undefined,
    priceFrom: asString(doc.priceFrom) || undefined,
    estimatedPayment: asString(doc.estimatedPayment) || undefined,
    paymentDisclaimer: asString(doc.paymentDisclaimer) || undefined,
    heroImage:
      resolveMediaUrl(doc.heroMedia, asString(doc.heroImage)) || asString(doc.heroImage),
    factSheetUrl: asString(doc.factSheetUrl) || undefined,
    intro: asString(doc.intro),
    description,
    elevations,
    floorLevels,
    floorplanPdfUrl: asString(doc.floorplanPdfUrl) || undefined,
    tourUrl: asString(doc.tourUrl) || undefined,
    brochures,
    similarModels,
    availableAt,
    registration: {
      title: asString(registration.title, "Book an Appointment"),
      description: asString(registration.description),
      submitLabel: asString(registration.submitLabel, "Submit"),
    },
  };
}
