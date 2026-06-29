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

export interface CommunityOverview {
  title: string;
  introduction: string;
  description: string;
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
}

export interface Promotion {
  title: string;
  description: string;
  badge?: string;
  expiresAt?: string;
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

export interface SimilarCommunity {
  name: string;
  city: string;
  stage: CommunityStage;
  priceFrom?: string;
  image: string;
  href: string;
}

export interface MapPoint {
  id: string;
  label: string;
  category: "community" | "sales" | "school" | "park" | "shopping" | "transit";
  lat: number;
  lng: number;
}

export interface SitePlanLot {
  id: string;
  lotNumber: string;
  status: LotStatus;
  x: number;
  y: number;
  width: number;
  height: number;
  price?: string;
  floorplan?: string;
  possessionDate?: string;
}

export interface SitePlan {
  title: string;
  imageUrl: string;
  lots: SitePlanLot[];
}

export interface RegistrationForm {
  title: string;
  description: string;
  submitLabel: string;
}

export interface Community {
  slug: string;
  stage: CommunityStage;
  /** Microsite design iteration — e.g. v1, v2 */
  micrositeVersion?: string;
  hero: CommunityHero;
  snapshot: SnapshotFact[];
  vision?: CommunityVision;
  overview?: CommunityOverview;
  quickFacts?: QuickFacts;
  videoUrl?: string;
  gallery?: GalleryImage[];
  areaMap?: { title: string; points: MapPoint[] };
  amenities?: { title: string; items: AmenityItem[] };
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
