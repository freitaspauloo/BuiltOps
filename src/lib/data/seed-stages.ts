import type { Community } from "@/lib/types/community";
import { benchmarkCommunity } from "./seed-benchmark";

export const winonaWestCommunity: Community = {
  slug: "winona-west",
  stage: "coming_soon",
  hero: {
    communityName: "Winona West",
    statusBadge: "coming_soon",
    city: "Stoney Creek, Hamilton",
    priceFrom: "From the $600s",
    homeTypes: "Singles & Towns",
    heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80",
    primaryCta: { label: "Join VIP List", href: "#registration" },
    secondaryCta: { label: "Download Brochure", href: "#downloads" },
  },
  snapshot: [
    { label: "Home Types", value: "Singles & Towns" },
    { label: "Location", value: "Stoney Creek" },
    { label: "Status", value: "Coming Soon" },
    { label: "Opening", value: "Fall 2026" },
  ],
  overview: {
    title: "Elevated living in Stoney Creek",
    introduction: "Winona West brings Losani's signature quality to one of Hamilton's most desirable corridors.",
    description: "Preliminary plans include detached singles and contemporary townhomes surrounded by parks, trails, and everyday conveniences.",
  },
  quickFacts: {
    facts: [
      { label: "Home types", value: "Singles & Towns" },
      { label: "Estimated opening", value: "Fall 2026" },
      { label: "Price range", value: "From the $600s" },
    ],
  },
  gallery: [
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", alt: "Rendering", caption: "Streetscape" },
    { url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80", alt: "Exterior", caption: "Exterior preview" },
  ],
  floorplans: [
    { id: "w1", name: "Preview Single", beds: 4, baths: 3, sqft: 2400, priceFrom: "TBD", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", phase: "Preview" },
  ],
  sitePlan: {
    title: "Preliminary site plan",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-904fcfed3b40?w=1600&q=80",
    lots: [
      { id: "l1", lotNumber: "1", status: "future", x: 20, y: 20, width: 12, height: 14 },
      { id: "l2", lotNumber: "2", status: "future", x: 40, y: 20, width: 12, height: 14 },
    ],
  },
  areaMap: {
    title: "Location",
    points: [
      { id: "c", label: "Winona West", category: "community", lat: 43.21, lng: -79.68 },
      { id: "s", label: "Local schools", category: "school", lat: 43.22, lng: -79.67 },
    ],
  },
  amenities: {
    title: "Neighbourhood",
    items: [
      { title: "Parks & trails", description: "Connected to Hamilton's trail network.", icon: "trees" },
      { title: "Shopping", description: "Minutes to QEW and local retail.", icon: "utensils" },
    ],
  },
  downloads: [{ title: "Community Brochure", type: "PDF", url: "#" }],
  timeline: [
    { date: "Q2 2026", title: "VIP registration opens", status: "complete" },
    { date: "Q3 2026", title: "Preliminary floorplans released", status: "current" },
    { date: "Fall 2026", title: "Sales centre opens", status: "upcoming" },
    { date: "2027", title: "First closings", status: "upcoming" },
  ],
  designCentre: {
    title: "Design Centre preview",
    description: "Registered VIPs will receive early access to finish selections and model previews.",
    ctaLabel: "Join VIP list",
  },
  features: {
    title: "Why build with Losani",
    items: [{ title: "40+ years", description: "Trusted builder across Southern Ontario." }],
  },
  faq: [
    { question: "When will pricing be available?", answer: "VIP registrants will receive pricing details before the public launch." },
  ],
  registration: {
    title: "Join the VIP list",
    description: "Be first to receive floorplans, pricing, and opening dates.",
    submitLabel: "Join VIP list",
  },
  similarCommunities: [
    { name: "Benchmark", city: "Beamsville", stage: "available", priceFrom: "From $499,900", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", href: "/communities/benchmark" },
  ],
};

export const woodviewCommunity: Community = {
  slug: "woodview",
  stage: "future",
  hero: {
    communityName: "Woodview",
    statusBadge: "future",
    city: "Hamilton, ON",
    homeTypes: "Coming soon",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    primaryCta: { label: "Register Interest", href: "#registration" },
  },
  snapshot: [
    { label: "Location", value: "Hamilton" },
    { label: "Status", value: "Future Community" },
    { label: "Opening", value: "TBA" },
  ],
  vision: {
    title: "A new community vision",
    description: "Woodview will introduce a thoughtfully planned neighbourhood designed for connection, nature, and everyday ease.",
    highlights: ["Escarpment views", "Family-focused layout", "Walkable amenities", "Losani quality"],
  },
  overview: {
    title: "Something special is coming",
    introduction: "Register now to follow Woodview from first announcement through launch.",
    description: "This future community will combine green space with modern home designs in a location poised for growth.",
  },
  areaMap: {
    title: "Location & lifestyle",
    points: [
      { id: "c", label: "Woodview", category: "community", lat: 43.25, lng: -79.9 },
      { id: "p", label: "Conservation area", category: "park", lat: 43.26, lng: -79.88 },
    ],
  },
  amenities: {
    title: "The setting",
    items: [
      { title: "Nature", description: "Adjacent to Hamilton's escarpment greenspace.", icon: "trees" },
    ],
  },
  features: {
    title: "Why Losani",
    items: [{ title: "Built to last", description: "Four decades of craftsmanship and warranty protection." }],
  },
  faq: [
    { question: "When will details be released?", answer: "Register to receive updates as the community progresses." },
  ],
  registration: {
    title: "Register your interest",
    description: "Be the first to hear about Woodview.",
    submitLabel: "Register interest",
  },
  similarCommunities: [
    { name: "Winona West", city: "Stoney Creek", stage: "coming_soon", priceFrom: "Coming soon", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", href: "/communities/winona-west" },
  ],
};
