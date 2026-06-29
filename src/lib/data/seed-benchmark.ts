import type { Community } from "@/lib/types/community";

export const benchmarkCommunity: Community = {
  slug: "benchmark",
  stage: "available",
  micrositeVersion: "v2",
  hero: {
    communityName: "Benchmark Towns",
    statusBadge: "available",
    city: "Beamsville, Niagara",
    priceFrom: "From $499,900",
    homeTypes: "Townhomes",
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    primaryCta: { label: "Book Appointment", href: "#registration" },
    secondaryCta: { label: "View Brochure", href: "#downloads" },
  },
  snapshot: [
    { label: "Price From", value: "$499,900" },
    { label: "Home Types", value: "Townhomes" },
    { label: "Bedrooms", value: "3 Beds" },
    { label: "Area", value: "1,205 – 2,115 sqft" },
    { label: "Status", value: "Available Now" },
    { label: "Sales Hours", value: "Sat–Sun 12–5pm" },
  ],
  overview: {
    title: "A New Standard in Wine Country",
    introduction:
      "Benchmark by Losani Homes is more than a place to live — it is a celebration of lifestyle, architecture, and location.",
    description:
      "Situated on the world-famous Beamsville Bench, this community is surrounded by rolling vineyards, scenic trails, award-winning wineries, and exceptional dining. Clean-lined contemporary townhomes reflect the elevated character of the neighbourhood.",
  },
  quickFacts: {
    title: "At a Glance",
    facts: [
      { label: "Homes", value: "Townhomes" },
      { label: "Size", value: "1,205 – 2,115 sqft" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2.5 – 3.5" },
      { label: "Starting Price", value: "$499,900" },
      { label: "Occupancy", value: "2025 – 2026" },
    ],
  },
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  gallery: [
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", alt: "Exterior rendering", caption: "Contemporary townhome exteriors" },
    { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", alt: "Interior living", caption: "Open-concept living spaces" },
    { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80", alt: "Kitchen", caption: "Gourmet kitchens" },
    { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80", alt: "Primary suite", caption: "Primary suites" },
    { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", alt: "Neighbourhood", caption: "Wine country setting" },
    { url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80", alt: "Outdoor living", caption: "Outdoor living spaces" },
  ],
  areaMap: {
    title: "Location & Lifestyle",
    points: [
      { id: "community", label: "Benchmark Towns", category: "community", lat: 43.166, lng: -79.476 },
      { id: "sales", label: "Sales Centre", category: "sales", lat: 43.167, lng: -79.475 },
      { id: "school", label: "Beamsville District Secondary", category: "school", lat: 43.17, lng: -79.48 },
      { id: "park", label: "Charles Daley Park", category: "park", lat: 43.16, lng: -79.47 },
      { id: "shopping", label: "Downtown Beamsville", category: "shopping", lat: 43.165, lng: -79.478 },
      { id: "transit", label: "QEW Access", category: "transit", lat: 43.155, lng: -79.49 },
    ],
  },
  amenities: {
    title: "Live Beautifully",
    items: [
      { title: "Wine Country", description: "Rolling vineyards and award-winning wineries steps from your door.", icon: "wine" },
      { title: "Trails & Nature", description: "Bruce Trail, conservation areas, and scenic escarpment views.", icon: "trees" },
      { title: "Schools", description: "Top-rated schools and family-friendly neighbourhoods.", icon: "school" },
      { title: "Dining & Culture", description: "Gourmet restaurants, boutiques, and local events.", icon: "utensils" },
    ],
  },
  features: {
    title: "Why Build With Losani",
    items: [
      { title: "Energy Efficiency", description: "Built to exceed Ontario Building Code standards for comfort and savings." },
      { title: "Smart Home Ready", description: "Pre-wired for modern connected living." },
      { title: "Construction Quality", description: "Four decades of craftsmanship across the GTA and Niagara." },
      { title: "Tarion Warranty", description: "Full new home warranty protection for peace of mind." },
    ],
  },
  sitePlan: {
    title: "Explore the Site Plan",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-904fcfed3b40?w=1600&q=80",
    lots: Array.from({ length: 24 }, (_, i) => ({
      id: `lot-${i + 1}`,
      lotNumber: `${100 + i}`,
      status: (["available", "sold", "future", "hold"] as const)[i % 4],
      x: 8 + (i % 6) * 14,
      y: 12 + Math.floor(i / 6) * 20,
      width: 10,
      height: 14,
      price: i % 4 === 0 ? `$${519900 + i * 5000}` : undefined,
      floorplan: i % 4 === 0 ? "Waldorf Enhanced End" : undefined,
      possessionDate: i % 4 === 0 ? "Fall 2025" : undefined,
    })),
  },
  floorplans: [
    { id: "waldorf", name: "Waldorf Enhanced End", beds: 3, baths: 3.5, sqft: 2115, priceFrom: "$549,900", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", phase: "Phase 1" },
    { id: "esprit", name: "18' Esprit Enhanced End", beds: 3, baths: 2.5, sqft: 1890, priceFrom: "$519,900", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", phase: "Phase 1" },
    { id: "whitehaven", name: "Whitehaven End", beds: 3, baths: 2.5, sqft: 1750, priceFrom: "$499,900", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", phase: "Phase 2" },
    { id: "knighton", name: "Knighton Interior", beds: 3, baths: 2.5, sqft: 1205, priceFrom: "$499,900", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", phase: "Phase 1" },
  ],
  quickMoveIn: [
    { id: "pronto-1", address: "12 Vineyard Lane", lot: "Lot 108", price: "$539,900", possessionDate: "Immediate", beds: 3, baths: 2.5, sqft: 1890, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
    { id: "pronto-2", address: "8 Escarpment Way", lot: "Lot 112", price: "$549,900", possessionDate: "30 days", beds: 3, baths: 3.5, sqft: 2115, image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80" },
  ],
  downloads: [
    { title: "Main Brochure", type: "PDF", url: "#" },
    { title: "Amenity Brochure", type: "PDF", url: "#" },
    { title: "Site Plan", type: "PDF", url: "#" },
    { title: "Feature Sheet", type: "PDF", url: "#" },
  ],
  promotions: [
    { title: "Limited-Time Incentive", description: "Receive up to $15,000 in design centre credits on select move-in ready homes.", badge: "Limited Offer", expiresAt: "June 30, 2026" },
  ],
  salesOffice: {
    title: "Visit Our Sales Centre",
    address: "4008 Mountain Street, Beamsville, ON L0R 1B2",
    phone: "(905) 594-0541",
    email: "benchmark@losanihomes.com",
    hours: ["Mon–Wed: 1–7pm", "Sat–Sun: 12–5pm"],
    team: [
      {
        name: "Sales Team",
        role: "New Home Advisors",
        phone: "(905) 594-0541",
        email: "benchmark@losanihomes.com",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&q=80",
      },
    ],
  },
  events: [
    { title: "Grand Opening Weekend", date: "July 12–13, 2026", description: "Tour model homes, meet the design team, and enjoy wine country hospitality.", location: "Sales Centre" },
    { title: "VIP Preview", date: "July 10, 2026", description: "Exclusive first look for registered buyers.", location: "By invitation" },
  ],
  designCentre: {
    title: "Losani Design Centre",
    description: "Work with expert designers to personalize finishes, fixtures, and details for your new home.",
    address: "Hamilton, ON — by appointment",
    hours: ["Monday – Friday: 10am – 6pm", "Saturday: 11am – 5pm"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    ctaLabel: "Book a design appointment",
  },
  testimonials: [
    {
      quote: "Losani made the entire process seamless. The quality of finishes exceeded our expectations.",
      author: "Sarah & Michael T.",
      role: "Benchmark homeowners",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
    {
      quote: "We loved being able to customize our townhome at the design centre. The team was incredibly helpful.",
      author: "Jennifer L.",
      role: "Losani homeowner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      quote: "The location on the Beamsville Bench sold us immediately. Benchmark feels like a hidden gem.",
      author: "David K.",
      role: "Registered buyer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ],
  faq: [
    { question: "What home types are available?", answer: "Benchmark offers contemporary 2- and 3-storey townhomes with 3 bedrooms and up to 3.5 bathrooms." },
    { question: "Are there move-in ready homes?", answer: "Yes — select Pronto homes are available for immediate or near-term occupancy." },
    { question: "Where is the sales centre?", answer: "4008 Mountain Street, Beamsville — open weekends 12–5pm and weekdays by appointment." },
    { question: "Do I need a realtor?", answer: "No — you are welcome to visit directly. If you are working with a realtor, let us know on registration." },
  ],
  registration: {
    title: "Book Your Private Showing",
    description: "Register to tour model homes, receive pricing updates, and connect with our sales team.",
    submitLabel: "Book Appointment",
  },
};

export const seedCommunities: Record<string, Community> = {
  benchmark: benchmarkCommunity,
};

export function getCommunity(slug: string): Community | null {
  return seedCommunities[slug] ?? null;
}

export function getAllCommunitySlugs(): string[] {
  return Object.keys(seedCommunities);
}
