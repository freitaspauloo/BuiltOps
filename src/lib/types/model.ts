import type {
  CommunityStage,
  DownloadAsset,
  LotStatus,
  RegistrationForm,
} from "@/lib/types/community";

export type HomeType = "townhome" | "detached";

/** A single exterior elevation / architectural style option for a model. */
export interface ModelElevation {
  id: string;
  name: string;
  image: string;
  description?: string;
  /** Material palette copy — e.g. brick, stone, stucco (Losani elevation variants). */
  materials?: string[];
}

/** One floor level of the model (architectural drawing + highlights). */
export interface ModelFloorLevel {
  id: string;
  name: string;
  image: string;
  sqft?: number;
  highlights?: string[];
}

/** A specific lot in a community where this model can be built. */
export interface ModelLot {
  lotNumber: string;
  status: LotStatus;
  price?: string;
  /** Deep link into the connected site experience for this lot. */
  connectedUrl: string;
}

/** A community where this model is offered. */
export interface ModelAvailability {
  communityName: string;
  /** Internal microsite slug when the community has a BuiltOps page. */
  communitySlug?: string;
  city: string;
  stage: CommunityStage;
  priceFrom?: string;
  image?: string;
  /** Community-level live availability link on the connected experience. */
  connectedUrl: string;
  lots: ModelLot[];
}

/** Compact card data for the "similar models" rail. */
export interface SimilarModel {
  slug: string;
  name: string;
  homeType: HomeType;
  beds: number;
  baths: number;
  sqft: number;
  priceFrom?: string;
  image: string;
}

export interface HomeModel {
  slug: string;
  name: string;
  homeType: HomeType;
  /** e.g. "Benchmark Collection — Phase 2" */
  collection?: string;
  beds: number;
  baths: number;
  sqft: number;
  storeys?: number;
  garage?: string;
  priceFrom?: string;
  /** Losani-style estimated monthly payment line (CMS field). */
  estimatedPayment?: string;
  /** Optional payment disclaimer shown under the estimate. */
  paymentDisclaimer?: string;
  heroImage: string;
  /** Standalone fact sheet PDF — separate from floorplan gallery. */
  factSheetUrl?: string;
  /** Short dek shown in the description section intro. */
  intro: string;
  /** Long-form description paragraphs. */
  description: string[];
  elevations: ModelElevation[];
  floorLevels: ModelFloorLevel[];
  floorplanPdfUrl?: string;
  /** Embeddable virtual tour URL (iframe). Placeholder shown when absent. */
  tourUrl?: string;
  brochures?: DownloadAsset[];
  similarModels: SimilarModel[];
  /** Communities offering this model — rendered LAST before registration. */
  availableAt: ModelAvailability[];
  registration: RegistrationForm;
}
