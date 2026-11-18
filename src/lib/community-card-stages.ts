import type { CommunityStage } from "@/lib/types/community";

/** Stage labels on community card photo badges (Figma Community Cards 181:619). */
export const communityCardStageLabels: Record<CommunityStage, string> = {
  available: "Available",
  coming_soon: "Coming Soon",
  future: "Future Communities",
};

export const communityCardStageDotClass: Record<CommunityStage, string> = {
  available: "bg-emerald-400",
  coming_soon: "bg-amber-400",
  future: "bg-zinc-300",
};

export const communityCardCtas: Record<
  CommunityStage,
  { primary: string; secondary: string }
> = {
  available: { primary: "View Models", secondary: "Book Appointment" },
  coming_soon: { primary: "Learn More", secondary: "Register for Updates" },
  future: { primary: "Learn More", secondary: "Register for Updates" },
};
