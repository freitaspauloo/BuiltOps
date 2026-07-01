import type { Community } from "@/lib/types/community";

const SITE_PLAN_BASE = "https://losani-connected-site-experience.replit.app";

export const benchmarkCommunity: Community = {
  slug: "benchmark",
  stage: "available",
  micrositeVersion: "v2",
  hero: {
    communityName: "Benchmark Towns",
    statusBadge: "available",
    city: "Beamsville, ON",
    priceFrom: "From $534,900",
    homeTypes: "Townhomes",
    heroImage:
      "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1.webp",
    primaryCta: { label: "Book Appointment", href: "#registration" },
    secondaryCta: { label: "View Brochure", href: "#downloads" },
  },
  snapshot: [
    { label: "Price Range", value: "$534,900 – $788,900" },
    { label: "Home Types", value: "Townhomes" },
    { label: "Bedrooms", value: "3 Beds" },
    { label: "Area", value: "1,205 – 2,115 sqft" },
    { label: "Status", value: "Available Now" },
    { label: "Models", value: "18 floorplans" },
  ],
  overview: {
    title: "Discover a New Standard of Living in the Heart of Niagara's Wine Country",
    introduction:
      "Benchmark by Losani Homes is more than a place to live — it is a celebration of lifestyle, architecture, and location.",
    description:
      "Modern townhomes in the Beamsville Bench wine country featuring 3-storey and 2-storey designs with customizable finishes, open-concept layouts, and gourmet kitchens. Phase 1 and Phase 2 collections available. Situated on the world-famous Beamsville Bench, this community is surrounded by rolling vineyards, scenic trails, award-winning wineries, and exceptional dining experiences.",
  },
  quickFacts: {
    title: "At a Glance",
    facts: [
      { label: "Homes", value: "Townhomes" },
      { label: "Size", value: "1,205 – 2,115 sqft" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2.5 – 3.5" },
      { label: "Starting Price", value: "$534,900" },
      { label: "Collections", value: "Available now" },
    ],
  },
  videoUrl: "https://www.youtube.com/embed/jiaI3HbDuGI?rel=0&modestbranding=1",
  gallery: [
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1.webp",
      alt: "Benchmark Towns streetscape",
      caption: "Benchmark Towns — Beamsville",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/10/CE1806FE-WALDORF-ENH-END-768x757.webp",
      alt: "Waldorf Enhanced End elevation",
      caption: "Waldorf Enhanced End — Phase 1",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
      alt: "18' Esprit Enhanced End elevation",
      caption: "18' Esprit Enhanced End — Phase 1",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803EF-WHITEHAVEN-END-768x477.webp",
      alt: "Whitehaven End elevation",
      caption: "Whitehaven End — Phase 2",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      alt: "16' Esprit Enhanced End elevation",
      caption: "16' Esprit Enhanced End — Phase 2",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/10/1802F-KNIGHTON-FARMHOUSE-768x425.webp",
      alt: "Knighton Interior F2 elevation",
      caption: "Knighton Interior F2 — Phase 1",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2026/01/1801EF-ABBOTSFORD-END-768x477.webp",
      alt: "Abbotsford Enhanced End elevation",
      caption: "Abbotsford Enhanced End",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
      alt: "Esprit Interior F1 elevation",
      caption: "Esprit Interior F1 — Phase 2",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
      alt: "Esprit Interior F2 elevation",
      caption: "Esprit Interior F2 — Phase 2",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803F2-WHITEHAVEN-INT-768x477.webp",
      alt: "Whitehaven interior elevation",
      caption: "Whitehaven Interior F2 — Phase 2",
    },
    {
      url: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803F3-WHITEHAVEN-INT-768x477.webp",
      alt: "Whitehaven interior alternate elevation",
      caption: "Whitehaven Interior F3 — Phase 2",
    },
  ],
  areaMap: {
    title: "Location & Lifestyle",
    points: [
      { id: "community", label: "Benchmark Towns", category: "community", lat: 43.1595, lng: -79.4725 },
      { id: "sales", label: "Sales Centre", category: "sales", lat: 43.1672, lng: -79.4761 },
      { id: "school", label: "Beamsville District Secondary", category: "school", lat: 43.1697, lng: -79.4842 },
      { id: "park", label: "Charles Daley Park", category: "park", lat: 43.1561, lng: -79.4574 },
      { id: "shopping", label: "Downtown Beamsville", category: "shopping", lat: 43.1663, lng: -79.4768 },
      { id: "transit", label: "QEW Access", category: "transit", lat: 43.1485, lng: -79.4945 },
    ],
  },
  amenities: {
    title: "Live Beautifully",
    items: [
      {
        title: "Wine Country Views",
        description: "Rolling vineyards and award-winning wineries on the Beamsville Bench.",
        icon: "wine",
      },
      {
        title: "Customizable Finishes",
        description: "Open-concept layouts with gourmet kitchens and personalized design selections.",
        icon: "utensils",
      },
      {
        title: "Modern Design",
        description: "Clean-lined contemporary townhomes with 2- and 3-storey collections.",
        icon: "trees",
      },
      {
        title: "Transit Access",
        description: "Minutes from the QEW with Hamilton, Burlington, and Toronto within easy reach.",
        icon: "school",
      },
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
    imageUrl: `${SITE_PLAN_BASE}/Phase_1-Benchmark_site_plan-desktop_1774446959385.webp`,
    lots: [
      { id: "lot-1", lotNumber: "1", status: "available", x: 12.67, y: 2, width: 21.33, height: 19.2, floorplan: "Waldorf Enhanced End" },
      { id: "lot-2", lotNumber: "2", status: "available", x: 34, y: 2, width: 21.33, height: 19.2, floorplan: "18' Esprit Enhanced End" },
      { id: "lot-3", lotNumber: "3", status: "available", x: 55.33, y: 2, width: 21.33, height: 19.2, floorplan: "Whitehaven End" },
      { id: "lot-4", lotNumber: "4", status: "available", x: 76.67, y: 2, width: 21.33, height: 19.2, floorplan: "16' Esprit Enhanced End" },
      { id: "lot-5", lotNumber: "5", status: "available", x: 12.67, y: 40.4, width: 21.33, height: 19.2, floorplan: "Knighton Interior F2" },
      { id: "lot-6", lotNumber: "6", status: "available", x: 34, y: 40.4, width: 21.33, height: 19.2, floorplan: "Esprit Interior F1" },
      { id: "lot-7", lotNumber: "7", status: "available", x: 55.33, y: 40.4, width: 21.33, height: 19.2, floorplan: "Esprit Grande Interior F1" },
      { id: "lot-8", lotNumber: "8", status: "available", x: 76.67, y: 40.4, width: 21.33, height: 19.2, floorplan: "Abbotsford Enhanced End" },
      { id: "lot-9", lotNumber: "9", status: "available", x: 12.67, y: 78.8, width: 21.33, height: 19.2, floorplan: "Esprit Interior F2" },
      { id: "lot-10", lotNumber: "10", status: "available", x: 34, y: 78.8, width: 21.33, height: 19.2, floorplan: "Esprit End" },
      { id: "lot-11", lotNumber: "11", status: "available", x: 55.33, y: 78.8, width: 21.33, height: 19.2, floorplan: "Whitehaven Interior F3" },
      { id: "lot-12", lotNumber: "12", status: "available", x: 76.67, y: 78.8, width: 21.33, height: 19.2, floorplan: "Esprit Grande Enhanced End" },
    ],
  },
  floorplans: [
    {
      id: "waldorf-enhanced-end",
      name: "Waldorf Enhanced End",
      beds: 3,
      baths: 3.5,
      sqft: 2115,
      priceFrom: "$700,000",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/CE1806FE-WALDORF-ENH-END-768x757.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/waldorf-enhanced-end/",
      phase: "Phase 1",
    },
    {
      id: "18-esprit-enhanced-end",
      name: "18' Esprit Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1535,
      priceFrom: "$600,000",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/18-esprit-enhanced-end/",
      phase: "Phase 1",
    },
    {
      id: "whitehaven-end",
      name: "Whitehaven End",
      beds: 3,
      baths: 2.5,
      sqft: 2080,
      priceFrom: "$600,000",
      image: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803EF-WHITEHAVEN-END-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/whitehaven-end/",
      phase: "Phase 2",
    },
    {
      id: "16-esprit-enhanced-end",
      name: "16' Esprit Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1344,
      priceFrom: "$639,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/16-esprit-enhanced-end/",
      phase: "Phase 2",
    },
    {
      id: "knighton-interior-f2",
      name: "Knighton Interior F2",
      beds: 3,
      baths: 2.5,
      sqft: 1437,
      priceFrom: "$600,000",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/1802F-KNIGHTON-FARMHOUSE-768x425.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/knighton-interior-f2/",
      phase: "Phase 1",
    },
    {
      id: "esprit-interior-f1",
      name: "Esprit Interior F1",
      beds: 3,
      baths: 2.5,
      sqft: 1237,
      priceFrom: "$534,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-interior-f1/",
      phase: "Phase 2",
    },
    {
      id: "esprit-grande-interior-f1",
      name: "Esprit Grande Interior F1",
      beds: 3,
      baths: 2.5,
      sqft: 1519,
      priceFrom: "$569,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-grande-interior-f1/",
      phase: "Phase 2",
    },
    {
      id: "whitehaven-enhanced-end",
      name: "Whitehaven Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 2080,
      priceFrom: "$689,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803EF-WHITEHAVEN-END-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/whitehaven-enhanced-end/",
      phase: "Phase 2",
    },
    {
      id: "whitehaven-interior-f2",
      name: "Whitehaven Interior F2",
      beds: 3,
      baths: 2.5,
      sqft: 2016,
      priceFrom: "$659,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803F2-WHITEHAVEN-INT-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/whitehaven-interior-f2/",
      phase: "Phase 2",
    },
    {
      id: "whitehaven-interior-f3",
      name: "Whitehaven Interior F3",
      beds: 3,
      baths: 2.5,
      sqft: 2016,
      priceFrom: "$679,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803F3-WHITEHAVEN-INT-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/whitehaven-interior-f3/",
      phase: "Phase 2",
    },
    {
      id: "16-esprit-grande-enhanced-end",
      name: "16' Esprit Grande Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1694,
      priceFrom: "$600,000",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/16-esprit-grande-enhanced-end/",
      phase: "Phase 2",
    },
    {
      id: "esprit-enhanced-end",
      name: "Esprit Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1281,
      priceFrom: "$598,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-end-2/",
      phase: "Phase 2",
    },
    {
      id: "esprit-end",
      name: "Esprit End",
      beds: 3,
      baths: 2.5,
      sqft: 1281,
      priceFrom: "$579,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-end/",
      phase: "Phase 2",
    },
    {
      id: "esprit-grande-enhanced-end",
      name: "Esprit Grande Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1583,
      priceFrom: "$629,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-grande-end/",
      phase: "Phase 2",
    },
    {
      id: "abbotsford-enhanced-end",
      name: "Abbotsford Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1783,
      priceFrom: "$624,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2026/01/1801EF-ABBOTSFORD-END-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/abbotsford-enhanced-end/",
      phase: "Phase 2",
    },
    {
      id: "esprit-interior-f2",
      name: "Esprit Interior F2",
      beds: 3,
      baths: 2.5,
      sqft: 1205,
      priceFrom: "$534,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-interior-f2/",
      phase: "Phase 2",
    },
  ],
  quickMoveIn: [],
  downloads: [
    {
      title: "Main Brochure",
      type: "PDF",
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/Benchmark-main.pdf",
    },
    {
      title: "Amenity Brochure",
      type: "PDF",
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/Benchmark-amenities.pdf",
    },
    {
      title: "Site Plan — Phase 1",
      type: "Image",
      url: `${SITE_PLAN_BASE}/Phase_1-Benchmark_site_plan-desktop_1774446959385.webp`,
    },
    {
      title: "Site Plan — Phase 2",
      type: "Image",
      url: `${SITE_PLAN_BASE}/Phase_2-Benchmark_site_plan-desktop_1774446959385.webp`,
    },
  ],
  promotions: [],
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
        image: "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1-768x620.webp",
      },
    ],
  },
  events: [],
  designCentre: {
    title: "Losani Design Centre",
    description:
      "Work with expert designers to personalize finishes, fixtures, and details for your new home.",
    address: "Hamilton, ON — by appointment",
    hours: ["Monday – Friday: 10am – 6pm", "Saturday: 11am – 5pm"],
    image: "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1-768x620.webp",
    ctaLabel: "Book a design appointment",
  },
  testimonials: [
    {
      quote:
        "The location on the Beamsville Bench sold us immediately. Benchmark feels like a hidden gem in wine country.",
      author: "Registered buyer",
      role: "Benchmark Towns",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1.webp",
    },
    {
      quote:
        "Losani's design centre made choosing finishes straightforward. We walked out knowing exactly how our kitchen and flooring would look on move-in day.",
      author: "Sarah & Mark T.",
      role: "Esprit Interior F1 — Phase 2",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
    },
    {
      quote:
        "The sales team never rushed us. They walked every floorplan, explained phase timing, and helped us compare layouts for our family of four.",
      author: "James L.",
      role: "Registered buyer",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/1802F-KNIGHTON-FARMHOUSE-768x425.webp",
    },
    {
      quote:
        "We wanted modern townhome living without giving up green space. Benchmark delivers both — trails, wineries, and the QEW minutes away.",
      author: "Priya & Daniel K.",
      role: "Whitehaven End — Phase 2",
      image: "https://www.losanihomes.com/wp-content/uploads/2026/01/1803EF-WHITEHAVEN-END-768x477.webp",
    },
    {
      quote:
        "The 3-storey layout gives us room to work from home upstairs while keeping main-floor living open and bright. It feels much larger than we expected.",
      author: "Homeowner",
      role: "Waldorf Enhanced End — Phase 1",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/CE1806FE-WALDORF-ENH-END-768x757.webp",
    },
    {
      quote:
        "From first visit to keys, the process was transparent. Tarion warranty coverage and Losani's build quality gave us confidence throughout.",
      author: "Michael R.",
      role: "Benchmark Towns",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
    },
  ],
  faq: [
    {
      question: "What home types are available?",
      answer:
        "Benchmark offers contemporary 2- and 3-storey townhomes with 3 bedrooms and up to 3.5 bathrooms across Phase 1 and Phase 2 collections.",
    },
    {
      question: "How many floorplans are available?",
      answer:
        "There are 18 floorplan models available, ranging from 1,205 to 2,115 square feet with prices from $534,900 to $788,900.",
    },
    {
      question: "Where is the sales centre?",
      answer:
        "4008 Mountain Street, Beamsville — open Monday to Wednesday 1–7pm and Saturday & Sunday 12–5pm.",
    },
    {
      question: "Do I need a realtor?",
      answer:
        "No — you are welcome to visit directly. If you are working with a realtor, let us know when you register.",
    },
  ],
  registration: {
    title: "Book Your Private Showing",
    description:
      "Register to tour model homes, receive pricing updates, and connect with our sales team at the Beamsville sales centre.",
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
