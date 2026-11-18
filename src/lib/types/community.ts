export type CommunityStage = "future" | "coming_soon" | "available";

export type LotStatus = "available" | "sold" | "future" | "hold";

export interface CommunityHero {
  communityName: string;
  statusBadge: CommunityStage;
  city: string;
  priceFrom?: string;
  homeTypes?: string;
  heroImage: string;
  heroVideoUrl?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export interface SnapshotFact {
  label: string;
  value: string;
}

/** Overview below-fold layout variants (Scott Jul 8 — pick one per community). */
export type OverviewLayoutVariant = "a" | "b" | "c" | "d";

/** v5 overview — introduction-led layouts with outline stat pills. */
export type OverviewSectionLayoutVariant =
  | "bento-poster"
  | "stacked-pills"
  | "vertical-rail"
  | "inline-band";

export interface CommunityOverview {
  title: string;
  introduction: string;
  description: string;
  layoutVariant?: OverviewLayoutVariant;
  overviewSectionLayout?: OverviewSectionLayoutVariant;
  brochureUrl?: string;
  brochureLabel?: string;
}

export interface CommunityVision {
  title: string;
  description: string;
  highlights?: string[];
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description?: string;
  status?: "complete" | "current" | "upcoming";
}

export interface DesignCentre {
  title: string;
  description: string;
  address?: string;
  hours?: string[];
  image?: string;
  ctaLabel?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  image?: string;
}

export interface QuickFacts {
  title?: string;
  facts: SnapshotFact[];
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface AmenityItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface Floorplan {
  id: string;
  name: string;
  beds: number;
  baths: number;
  sqft: number;
  priceFrom: string;
  image: string;
  pdfUrl?: string;
  phase?: string;
  /** Per-level architectural drawings (ground / main / upper). */
  levelGallery?: GalleryImage[];
  /** Collection badge on the photo (e.g. Losani Originals). */
  collection?: CommunityCollectionBadge;
  /** Short type line under the model name. */
  subtitle?: string;
  /** Lot width pill (e.g. "46' lot"). */
  lotLabel?: string;
  /** Sqft range copy when it differs from a single `sqft` value. */
  sqftRange?: string;
  /** Link to `/models/[slug]` when a model page exists. */
  modelSlug?: string;
  tourHref?: string;
}

export interface QuickMoveInHome {
  id: string;
  address: string;
  lot: string;
  price: string;
  possessionDate: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
}

export interface DownloadAsset {
  title: string;
  type: string;
  url: string;
  /** Title-page / cover image used as the carousel thumbnail (editorial v4). */
  thumbnailUrl?: string;
}

export interface Promotion {
  title: string;
  description: string;
  badge?: string;
  expiresAt?: string;
  imageUrl?: string;
}

export interface SalesOffice {
  title: string;
  address: string;
  phone: string;
  email: string;
  hours: string[];
  team?: { name: string; role: string; phone?: string; email?: string; image?: string }[];
}

export interface CommunityEvent {
  title: string;
  date: string;
  description: string;
  location?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type CommunityCollectionBadge = {
  label: string;
  variant?: "pronto" | "originals" | "default";
};

export interface SimilarCommunity {
  name: string;
  city: string;
  stage: CommunityStage;
  priceFrom?: string;
  image: string;
  href: string;
  /** Short line on the photo overlay, e.g. "8 Lots Available & 4 Pronto Homes". */
  availabilitySummary?: string;
  collections?: CommunityCollectionBadge[];
  description?: string;
  homeTypes?: string;
  sizeRange?: string;
  modelsHref?: string;
  appointmentHref?: string;
}

export interface MapPoint {
  id: string;
  label: string;
  category: "community" | "sales" | "school" | "park" | "shopping" | "transit" | "winery" | "dining";
  lat: number;
  lng: number;
}

export interface SitePlanLot {
  id: string;
  lotNumber: string;
  status: LotStatus;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  price?: string;
  floorplan?: string;
  sqft?: string;
  possessionDate?: string;
}

export interface SitePlanPhase {
  id: string;
  label: string;
  imageUrl: string;
  lots: SitePlanLot[];
}

export interface SitePlan {
  title: string;
  imageUrl: string;
  lots: SitePlanLot[];
  aspectRatio?: string;
  phases?: SitePlanPhase[];
  brochureUrl?: string;
  brochureLabel?: string;
}

export interface RegistrationForm {
  title: string;
  description: string;
  submitLabel: string;
}

import type { PresentationMode } from "@/lib/presentation-mode";

export interface Community {
  slug: string;
  stage: CommunityStage;
  /** Microsite design iteration — e.g. v1, v2 */
  micrositeVersion?: string;
  /** Portal embed vs standalone landing — set at render time from ?presentation= */
  presentationMode?: PresentationMode;
  /** Dev override for overview layout variant (?overviewLayout=) */
  overviewLayoutOverride?: OverviewLayoutVariant;
  hero: CommunityHero;
  snapshot: SnapshotFact[];
  vision?: CommunityVision;
  overview?: CommunityOverview;
  quickFacts?: QuickFacts;
  videoUrl?: string;
  gallery?: GalleryImage[];
  areaMap?: { title: string; points: MapPoint[] };
  amenities?: {
    title: string;
    items: AmenityItem[];
    lifestyleImages?: GalleryImage[];
    /** Optional CMS brochure link — shown below amenity list (Anthony Jul 8). */
    brochureUrl?: string;
    brochureLabel?: string;
  };
  features?: { title: string; items: FeatureItem[] };
  sitePlan?: SitePlan;
  floorplans?: Floorplan[];
  quickMoveIn?: QuickMoveInHome[];
  downloads?: DownloadAsset[];
  promotions?: Promotion[];
  salesOffice?: SalesOffice;
  timeline?: TimelineMilestone[];
  designCentre?: DesignCentre;
  testimonials?: Testimonial[];
  events?: CommunityEvent[];
  faq?: FaqItem[];
  registration: RegistrationForm;
  similarCommunities?: SimilarCommunity[];
  /**
   * Optional CMS-controlled scroll order. When set, replaces the stage default
   * template. Empty / missing sections are still filtered out at render time.
   */
  sectionOrder?: SectionId[];
  /**
   * Sections explicitly turned OFF in the CMS — hidden even when they have content.
   */
  sectionDisabled?: SectionId[];
}

export type SectionId =
  | "hero"
  | "snapshot"
  | "vision"
  | "salesOffice"
  | "promotions"
  | "quickMoveIn"
  | "floorplans"
  | "sitePlan"
  | "video"
  | "gallery"
  | "overview"
  | "quickFacts"
  | "areaMap"
  | "amenities"
  | "features"
  | "downloads"
  | "timeline"
  | "designCentre"
  | "testimonials"
  | "events"
  | "faq"
  | "registration"
  | "similarCommunities";
