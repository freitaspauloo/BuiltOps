import type { IconType } from "react-icons";
import {
  RiArrowDownSFill,
  RiArrowLeftFill,
  RiArrowRightFill,
  RiBusFill,
  RiCalendarCheckFill,
  RiCalendarFill,
  RiCheckboxCircleFill,
  RiDownloadFill,
  RiDropFill,
  RiFileTextFill,
  RiGalleryFill,
  RiGobletFill,
  RiGraduationCapFill,
  RiHome4Fill,
  RiHotelBedFill,
  RiInformationFill,
  RiLayoutGridFill,
  RiLeafFill,
  RiMapPinFill,
  RiMapFill,
  RiMailFill,
  RiMovieFill,
  RiPaletteFill,
  RiPercentFill,
  RiPhoneFill,
  RiPlantFill,
  RiPriceTag3Fill,
  RiQuestionFill,
  RiRestaurantFill,
  RiRulerFill,
  RiShieldCheckFill,
  RiShoppingBagFill,
  RiSparklingFill,
  RiStackFill,
  RiStarFill,
  RiStoreFill,
  RiTimeFill,
  RiWifiFill,
} from "react-icons/ri";
import { cn } from "@/lib/utils/cn";
import type { SectionId } from "@/lib/types/community";

/** Sharp solid icons — Remix Fill only (angular glyphs, no outlines) */

export type AppIconProps = {
  icon: IconType;
  className?: string;
  size?: number;
};

export function AppIcon({ icon: Icon, className, size = 20 }: AppIconProps) {
  return <Icon className={cn("shrink-0", className)} size={size} aria-hidden />;
}

function normalizeKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

const SNAPSHOT_ICONS: Record<string, IconType> = {
  price_from: RiPriceTag3Fill,
  starting_price: RiPriceTag3Fill,
  home_types: RiHome4Fill,
  homes: RiHome4Fill,
  bedrooms: RiHotelBedFill,
  beds: RiHotelBedFill,
  bathrooms: RiHotelBedFill,
  area: RiRulerFill,
  size: RiRulerFill,
  status: RiCheckboxCircleFill,
  sales_hours: RiTimeFill,
  opening: RiCalendarFill,
  estimated_opening: RiCalendarFill,
  location: RiMapPinFill,
  occupancy: RiCalendarFill,
  price_range: RiPriceTag3Fill,
};

export function getSnapshotIcon(label: string): IconType {
  return SNAPSHOT_ICONS[normalizeKey(label)] ?? RiInformationFill;
}

export const SECTION_ICONS: Record<SectionId, IconType> = {
  hero: RiHome4Fill,
  snapshot: RiLayoutGridFill,
  vision: RiSparklingFill,
  overview: RiHome4Fill,
  quickFacts: RiLayoutGridFill,
  salesOffice: RiMapPinFill,
  promotions: RiPercentFill,
  quickMoveIn: RiCalendarCheckFill,
  floorplans: RiStackFill,
  sitePlan: RiMapFill,
  video: RiMovieFill,
  gallery: RiGalleryFill,
  areaMap: RiMapPinFill,
  amenities: RiPlantFill,
  features: RiStarFill,
  downloads: RiDownloadFill,
  timeline: RiCalendarFill,
  designCentre: RiPaletteFill,
  testimonials: RiStarFill,
  events: RiCalendarFill,
  faq: RiQuestionFill,
  registration: RiCalendarCheckFill,
  similarCommunities: RiHome4Fill,
};

export function getSectionIcon(id: SectionId): IconType {
  return SECTION_ICONS[id] ?? RiInformationFill;
}

const AMENITY_ICONS: Record<string, IconType> = {
  wine: RiGobletFill,
  trees: RiPlantFill,
  school: RiGraduationCapFill,
  utensils: RiRestaurantFill,
};

export function getAmenityIcon(key?: string): IconType {
  return (key && AMENITY_ICONS[key]) || RiPlantFill;
}

/** @deprecated use getAmenityIcon — kept for import compatibility */
export function getAmenityPillIcon(key?: string): IconType {
  return getAmenityIcon(key);
}

const AREA_CATEGORY_ICONS: Record<string, IconType> = {
  community: RiHome4Fill,
  sales: RiStoreFill,
  school: RiGraduationCapFill,
  park: RiPlantFill,
  shopping: RiShoppingBagFill,
  transit: RiBusFill,
};

export function getAreaCategoryPillIcon(category: string): IconType {
  return AREA_CATEGORY_ICONS[category.toLowerCase()] ?? RiMapPinFill;
}

const FEATURE_ICONS: Record<string, IconType> = {
  energy_efficiency: RiLeafFill,
  smart_home_ready: RiWifiFill,
  construction_quality: RiStackFill,
  tarion_warranty: RiShieldCheckFill,
};

export function getFeaturePillIcon(title: string): IconType {
  return FEATURE_ICONS[normalizeKey(title)] ?? RiStarFill;
}

export function getSpecPillIcons() {
  return {
    beds: RiHotelBedFill,
    baths: RiDropFill,
    sqft: RiRulerFill,
    phase: RiStackFill,
    moveIn: RiCalendarCheckFill,
    possession: RiCalendarFill,
    price: RiPriceTag3Fill,
    file: RiFileTextFill,
    offer: RiPriceTag3Fill,
  } as const;
}

export const UI_ICONS = {
  chevronDown: RiArrowDownSFill,
  chevronLeft: RiArrowLeftFill,
  chevronRight: RiArrowRightFill,
  grid: RiLayoutGridFill,
  download: RiDownloadFill,
  phone: RiPhoneFill,
  mail: RiMailFill,
  clock: RiTimeFill,
  mapPin: RiMapPinFill,
  file: RiFileTextFill,
  calendarCheck: RiCalendarCheckFill,
} as const;
