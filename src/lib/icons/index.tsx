import type { LucideIcon } from "lucide-react";
import {
  Bed,
  Bus,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Droplet,
  Facebook,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  Images,
  Info,
  Instagram,
  Layers,
  LayoutGrid,
  Leaf,
  Linkedin,
  Mail,
  Map,
  MapPin,
  Palette,
  Percent,
  Phone,
  Play,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Store,
  Tag,
  Trees,
  UtensilsCrossed,
  Video,
  Wifi,
  Wine,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SectionId } from "@/lib/types/community";

/** Thin-stroke Lucide icons — luxury line weight across the product */
export type AppIconType = LucideIcon;

export const ICON_STROKE = 1.25;

export type AppIconProps = {
  icon: AppIconType;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export function AppIcon({
  icon: Icon,
  className,
  size = 20,
  strokeWidth = ICON_STROKE,
}: AppIconProps) {
  return (
    <Icon
      className={cn("shrink-0", className)}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

function normalizeKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

const SNAPSHOT_ICONS: Record<string, AppIconType> = {
  price_from: Tag,
  starting_price: Tag,
  home_types: Home,
  homes: Home,
  bedrooms: Bed,
  beds: Bed,
  collections: Layers,
  bathrooms: Droplet,
  area: Ruler,
  size: Ruler,
  status: CheckCircle2,
  sales_hours: Clock,
  opening: Calendar,
  estimated_opening: Calendar,
  location: MapPin,
  occupancy: Calendar,
  price_range: Tag,
};

export function getSnapshotIcon(label: string): AppIconType {
  return SNAPSHOT_ICONS[normalizeKey(label)] ?? Info;
}

export const SECTION_ICONS: Record<SectionId, AppIconType> = {
  hero: Home,
  snapshot: LayoutGrid,
  vision: Sparkles,
  overview: Home,
  quickFacts: LayoutGrid,
  salesOffice: MapPin,
  promotions: Percent,
  quickMoveIn: CalendarCheck,
  floorplans: Layers,
  sitePlan: Map,
  video: Video,
  gallery: Images,
  areaMap: MapPin,
  amenities: Sprout,
  features: Star,
  downloads: Download,
  timeline: Calendar,
  designCentre: Palette,
  testimonials: Star,
  events: Calendar,
  faq: HelpCircle,
  registration: CalendarCheck,
  similarCommunities: Home,
};

export function getSectionIcon(id: SectionId): AppIconType {
  return SECTION_ICONS[id] ?? Info;
}

const AMENITY_ICONS: Record<string, AppIconType> = {
  wine: Wine,
  trees: Trees,
  school: GraduationCap,
  utensils: UtensilsCrossed,
};

export function getAmenityIcon(key?: string): AppIconType {
  return (key && AMENITY_ICONS[key]) || Sprout;
}

/** @deprecated use getAmenityIcon — kept for import compatibility */
export function getAmenityPillIcon(key?: string): AppIconType {
  return getAmenityIcon(key);
}

const AREA_CATEGORY_ICONS: Record<string, AppIconType> = {
  community: Home,
  sales: Store,
  school: GraduationCap,
  park: Trees,
  shopping: ShoppingBag,
  transit: Bus,
};

export function getAreaCategoryPillIcon(category: string): AppIconType {
  return AREA_CATEGORY_ICONS[category.toLowerCase()] ?? MapPin;
}

const FEATURE_ICONS: Record<string, AppIconType> = {
  energy_efficiency: Leaf,
  smart_home_ready: Wifi,
  construction_quality: Layers,
  tarion_warranty: ShieldCheck,
};

export function getFeaturePillIcon(title: string): AppIconType {
  return FEATURE_ICONS[normalizeKey(title)] ?? Star;
}

export function getSpecPillIcons() {
  return {
    beds: Bed,
    baths: Droplet,
    sqft: Ruler,
    phase: Layers,
    moveIn: CalendarCheck,
    possession: Calendar,
    price: Tag,
    file: FileText,
    offer: Tag,
  } as const;
}

export const UI_ICONS = {
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  grid: LayoutGrid,
  download: Download,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  mapPin: MapPin,
  file: FileText,
  calendarCheck: CalendarCheck,
  play: Play,
  star: Star,
} as const;

export const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
} as const;
