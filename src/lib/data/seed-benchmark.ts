import type { Community } from "@/lib/types/community";
import {
  benchmarkSitePlanLots,
  benchmarkSitePlanPhases,
} from "@/lib/data/benchmark-site-plan";

export const benchmarkCommunity: Community = {
  slug: "benchmark",
  stage: "available",
  micrositeVersion: "v6",
  /** Mirrors Sanity `sectionOrder` — editors will drag-reorder this in Studio. */
  sectionOrder: [
    "overview",
    "sitePlan",
    "floorplans",
    "quickMoveIn",
    "areaMap",
    "amenities",
    "promotions",
    "gallery",
    "designCentre",
    "testimonials",
    "events",
    "faq",
    "registration",
    "features",
    "similarCommunities",
  ],
  hero: {
    communityName: "Benchmark Towns",
    statusBadge: "available",
    city: "Beamsville, ON",
    priceFrom: "From $499,900",
    homeTypes: "Townhomes",
    heroImage:
      "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1.webp",
    primaryCta: { label: "Book Appointment", href: "#registration" },
    secondaryCta: { label: "View Brochure", href: "#downloads" },
  },
  snapshot: [
    { label: "Price Range", value: "$499,900 – $788,900" },
    { label: "Home Types", value: "Townhomes" },
    { label: "Bedrooms", value: "3 Beds" },
    { label: "Area", value: "1,205 – 2,115 sqft" },
    { label: "Status", value: "Available Now" },
    { label: "Models", value: "16 floorplans" },
  ],
  overview: {
    title: "Discover a New Standard of Living in the Heart of Niagara's Wine Country",
    introduction:
      "Benchmark by Losani Homes is more than a place to live — it is a celebration of lifestyle, architecture, and location in the heart of wine country.",
    description:
      "Modern townhomes on the Beamsville Bench featuring 3-storey and 2-storey designs with customizable finishes, open-concept layouts, and gourmet kitchens. Walk to vineyards, farm-to-table dining, and scenic Niagara Escarpment trails. Phase 1 and Phase 2 collections available — surrounded by rolling vineyards, award-winning wineries, and the relaxed pace of wine-country living.",
    layoutVariant: "a",
    overviewSectionLayout: "bento-poster",
  },
  quickFacts: {
    title: "At a Glance",
    facts: [
      { label: "Homes", value: "Townhomes" },
      { label: "Size (sqft)", value: "1,205 – 2,115" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2.5 – 3.5" },
      { label: "Starting Price", value: "$499,900" },
      { label: "Phases", value: "2" },
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
      { id: "community", label: "Benchmark Towns", category: "community", lat: 43.167, lng: -79.4632 },
      { id: "sales", label: "Sales Centre", category: "sales", lat: 43.1672, lng: -79.4628 },
      { id: "school", label: "Beamsville District Secondary", category: "school", lat: 43.1675, lng: -79.4724 },
      { id: "park", label: "Charles Daley Park", category: "park", lat: 43.1805, lng: -79.3241 },
      { id: "shopping", label: "Downtown Beamsville", category: "shopping", lat: 43.1665, lng: -79.4845 },
      { id: "transit", label: "QEW Access", category: "transit", lat: 43.1889, lng: -79.4812 },
      { id: "winery-cave-spring", label: "Cave Spring Cellars", category: "winery", lat: 43.1567, lng: -79.4696 },
      { id: "winery-malivoire", label: "Malivoire Wine Company", category: "winery", lat: 43.159, lng: -79.505 },
      { id: "park-balls-falls", label: "Ball's Falls Conservation", category: "park", lat: 43.1266, lng: -79.3766 },
      { id: "shopping-jordan", label: "Jordan Village", category: "shopping", lat: 43.151, lng: -79.438 },
      { id: "dining-good-earth", label: "The Good Earth Bistro", category: "dining", lat: 43.158, lng: -79.492 },
      { id: "park-beamers", label: "Beamers Memorial Park", category: "park", lat: 43.172, lng: -79.478 },
    ],
  },
  amenities: {
    title: "Live Beautifully",
    brochureUrl:
      "https://www.losanihomes.com/wp-content/uploads/2025/12/Benchmark-amenities.pdf",
    brochureLabel: "Open Brochure",
    lifestyleImages: [
      {
        url: "https://www.losanihomes.com/wp-content/uploads/2025/07/Location_gallery_4.webp",
        alt: "Hiking trails near Benchmark Towns",
        caption: "Scenic trails",
      },
      {
        url: "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark_overview_location_1-1.webp",
        alt: "Vineyard rows on the Beamsville Bench",
        caption: "Wine country views",
      },
    ],
    items: [
      {
        title: "Wine Country Views",
        description: "Rolling vineyards and award-winning wineries on the Beamsville Bench.",
        icon: "wine",
      },
      {
        title: "Customizable Finishes",
        description: "Open-concept layouts with gourmet kitchens and personalized design selections.",
        icon: "palette",
      },
      {
        title: "Modern Design",
        description: "Clean-lined contemporary townhomes with 2- and 3-storey collections.",
        icon: "home",
      },
      {
        title: "Transit Access",
        description: "Minutes from the QEW with Hamilton, Burlington, and Toronto within easy reach.",
        icon: "transit",
      },
    ],
  },
  features: {
    title: "Why build with Losani",
    items: [
      {
        title: "Energy Efficiency",
        description: "Built to exceed Ontario Building Code standards for comfort and savings.",
      },
      {
        title: "Smart Home Ready",
        description: "Pre-wired for modern connected living.",
      },
      {
        title: "Construction Quality",
        description: "Fifty years of craftsmanship across the GTA and Niagara.",
      },
      {
        title: "Tarion Warranty",
        description: "Full new home warranty protection for peace of mind.",
      },
      {
        title: "Design Flexibility",
        description: "Personalize layouts and finishes at the Losani Design Centre.",
      },
      {
        title: "Customer Care",
        description: "Dedicated support from contract signing through move-in day.",
      },
    ],
  },
  sitePlan: {
    title: "Browse Lots & Availability",
    imageUrl: "/site-plans/benchmark/phase-1-desktop.webp",
    aspectRatio: "16 / 9",
    lots: benchmarkSitePlanLots,
    phases: benchmarkSitePlanPhases,
  },
  floorplans: [
    {
      id: "waldorf-enhanced-end",
      name: "Waldorf Enhanced End",
      beds: 3,
      baths: 3.5,
      sqft: 2115,
      priceFrom: "$788,900",
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
      priceFrom: "$650,900",
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
      priceFrom: "$664,900",
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
      priceFrom: "$538,900",
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
      priceFrom: "$604,900",
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
      priceFrom: "$507,900",
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
      priceFrom: "$546,900",
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
      priceFrom: "$628,900",
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
      priceFrom: "$610,900",
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
      priceFrom: "$614,900",
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
      priceFrom: "$546,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-end/",
      phase: "Phase 2",
      modelSlug: "esprit-end",
      subtitle: "Townhome end unit with multiple elevations",
      lotLabel: "18' lot",
    },
    {
      id: "esprit-grande-enhanced-end",
      name: "Esprit Grande Enhanced End",
      beds: 3,
      baths: 2.5,
      sqft: 1583,
      priceFrom: "$588,900",
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
      priceFrom: "$499,900",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
      pdfUrl: "https://www.losanihomes.com/floorplans/esprit-interior-f2/",
      phase: "Phase 2",
    },
  ],
  quickMoveIn: [
    {
      id: "qmi-lot-19",
      address: "Lot 19, Mountain Street",
      lot: "19",
      price: "$499,900",
      possessionDate: "30–60 days",
      beds: 3,
      baths: 2.5,
      sqft: 1205,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
    },
    {
      id: "qmi-lot-39",
      address: "Lot 39, Mountain Street",
      lot: "39",
      price: "$499,900",
      possessionDate: "30–60 days",
      beds: 3,
      baths: 2.5,
      sqft: 1205,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
    },
    {
      id: "qmi-lot-79",
      address: "Lot 79, Mountain Street",
      lot: "79",
      price: "$650,900",
      possessionDate: "Summer 2026",
      beds: 3,
      baths: 3.5,
      sqft: 1535,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
    },
    {
      id: "qmi-lot-12",
      address: "Lot 12, Mountain Street",
      lot: "12",
      price: "$507,900",
      possessionDate: "Ready now",
      beds: 3,
      baths: 2.5,
      sqft: 1237,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
    },
    {
      id: "qmi-lot-24",
      address: "Lot 24, Mountain Street",
      lot: "24",
      price: "$604,900",
      possessionDate: "30–60 days",
      beds: 3,
      baths: 2.5,
      sqft: 1437,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/1802F-KNIGHTON-FARMHOUSE-768x425.webp",
    },
    {
      id: "qmi-lot-45",
      address: "Lot 45, Mountain Street",
      lot: "45",
      price: "$538,900",
      possessionDate: "30–60 days",
      beds: 3,
      baths: 2.5,
      sqft: 1344,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
    },
    {
      id: "qmi-lot-56",
      address: "Lot 56, Mountain Street",
      lot: "56",
      price: "$588,900",
      possessionDate: "Summer 2026",
      beds: 3,
      baths: 2.5,
      sqft: 1583,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
    },
    {
      id: "qmi-lot-62",
      address: "Lot 62, Mountain Street",
      lot: "62",
      price: "$664,900",
      possessionDate: "Fall 2026",
      beds: 3,
      baths: 2.5,
      sqft: 2080,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/1803EF-WHITEHAVEN-END-768x477.webp",
    },
    {
      id: "qmi-lot-88",
      address: "Lot 88, Mountain Street",
      lot: "88",
      price: "$624,900",
      possessionDate: "Summer 2026",
      beds: 3,
      baths: 2.5,
      sqft: 1783,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/1801EF-ABBOTSFORD-END-768x477.webp",
    },
    {
      id: "qmi-lot-91",
      address: "Lot 91, Mountain Street",
      lot: "91",
      price: "$546,900",
      possessionDate: "30–60 days",
      beds: 3,
      baths: 2.5,
      sqft: 1519,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
    },
    {
      id: "qmi-lot-102",
      address: "Lot 102, Mountain Street",
      lot: "102",
      price: "$628,900",
      possessionDate: "Fall 2026",
      beds: 3,
      baths: 2.5,
      sqft: 2016,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/1803F2-WHITEHAVEN-INT-768x477.webp",
    },
    {
      id: "qmi-lot-115",
      address: "Lot 115, Mountain Street",
      lot: "115",
      price: "$788,900",
      possessionDate: "Spring 2027",
      beds: 3,
      baths: 3.5,
      sqft: 2115,
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/CE1806FE-WALDORF-ENH-END-768x757.webp",
    },
  ],
  downloads: [
    {
      title: "Main Brochure",
      type: "PDF",
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/Benchmark-main.pdf",
      thumbnailUrl:
        "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1-768x620.webp",
    },
    {
      title: "Amenity Brochure",
      type: "PDF",
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/Benchmark-amenities.pdf",
      thumbnailUrl:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/CE1806FE-WALDORF-ENH-END-768x757.webp",
    },
    {
      title: "Site Plan — Phase 1",
      type: "Image",
      url: "/site-plans/benchmark/phase-1-desktop.webp",
      thumbnailUrl: "/site-plans/benchmark/phase-1-desktop.webp",
    },
    {
      title: "Site Plan — Phase 2",
      type: "Image",
      url: "/site-plans/benchmark/phase-2-desktop.webp",
      thumbnailUrl: "/site-plans/benchmark/phase-2-desktop.webp",
    },
  ],
  promotions: [
    {
      badge: "Limited time",
      title: "New home incentive support",
      description:
        "Schedule a private showing with a Losani new home advisor to review current incentive programs on select Benchmark Towns homes. Eligibility and amounts vary by plan, closing date, and lender requirements.",
      expiresAt: "December 31, 2026",
      imageUrl:
        "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1.webp",
    },
    {
      badge: "Phase 2",
      title: "Early release pricing",
      description:
        "Esprit and Whitehaven plans on Phase 2 lots from $499,900 while inventory lasts. Losani will confirm pricing and lot availability at your appointment — offers subject to change without notice.",
      imageUrl:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
    },
  ],
  salesOffice: {
    title: "Plan your visit",
    address: "4008 Mountain Street, Beamsville, ON L0R 1B2",
    phone: "(905) 594-0541",
    email: "benchmark@losanihomes.com",
    hours: ["Mon–Wed: 1–7pm", "Sat–Sun: 12–5pm"],
    team: [
      {
        name: "Benchmark Sales Team",
        role: "New Home Advisors",
        phone: "(905) 594-0541",
        email: "benchmark@losanihomes.com",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&q=80",
      },
    ],
  },
  events: [
    {
      date: "Saturdays & Sundays · 12–5pm",
      title: "Sales centre open house",
      description:
        "Walk the community model, review Phase 1 and Phase 2 lot availability, and speak with a new home advisor — no appointment required on weekends.",
      location: "4008 Mountain Street, Beamsville, ON",
    },
    {
      date: "By appointment",
      title: "Design centre selections session",
      description:
        "Finalize kitchen, flooring, and interior packages with a Losani designer at the Hamilton Design Centre.",
      location: "Hamilton, ON",
    },
    {
      date: "Monthly",
      title: "Benchmark buyer information session",
      description:
        "Covers deposits, closing timelines, Tarion warranty coverage, and what to expect from contract to keys.",
      location: "Sales centre or virtual",
    },
  ],
  designCentre: {
    title: "Losani Design Centre",
    description:
      "Work with expert designers to personalize finishes, fixtures, and details for your new home. After you purchase, dedicated design appointments let you tailor flooring, cabinetry, countertops, and lighting to make every space your own.",
    address: "Hamilton, ON — by appointment",
    hours: ["Monday – Friday: 10am – 6pm", "Saturday: 11am – 5pm"],
    image: "https://www.losanihomes.com/wp-content/uploads/2025/06/Design_centre_features_3.webp",
    ctaLabel: "Book a design appointment",
  },
  testimonials: [
    {
      quote:
        "The location on the Beamsville Bench sold us immediately. Benchmark feels like a hidden gem in wine country.",
      author: "Sarah M.",
      role: "Benchmark Towns buyer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=640&q=80",
    },
    {
      quote:
        "Losani's design centre made choosing finishes straightforward. We walked out knowing exactly how our kitchen and flooring would look on move-in day.",
      author: "James T.",
      role: "Esprit Interior F1 — Phase 2",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=80",
    },
    {
      quote:
        "The sales team never rushed us. They walked every floorplan, explained phase timing, and helped us compare layouts for our family of four.",
      author: "Priya K.",
      role: "Phase 1 buyer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&q=80",
    },
    {
      quote:
        "We wanted modern townhome living without giving up green space. Benchmark delivers both — trails, wineries, and the QEW minutes away.",
      author: "Michael R.",
      role: "Whitehaven End — Phase 2",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=640&q=80",
    },
    {
      quote:
        "The 3-storey layout gives us room to work from home upstairs while keeping main-floor living open and bright. It feels much larger than we expected.",
      author: "Elena V.",
      role: "Waldorf Enhanced End — Phase 1",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=80",
    },
    {
      quote:
        "From first visit to keys, the process was transparent. Tarion warranty coverage and Losani's build quality gave us confidence throughout.",
      author: "David L.",
      role: "Benchmark Towns homeowner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&q=80",
    },
  ],
  faq: [
    {
      question: "What home types are available at Benchmark?",
      answer:
        "Losani Homes is building contemporary 2- and 3-storey townhomes at Benchmark — 3 bedrooms and up to 3.5 bathrooms across Phase 1 and Phase 2 collections on the Beamsville Bench.",
    },
    {
      question: "How many floorplans can I choose from?",
      answer:
        "There are 16 Losani floorplan models at Benchmark, from 1,205 to 2,115 square feet. Your advisor can walk you through layouts that fit your lot and lifestyle.",
    },
    {
      question: "Where is the Benchmark sales centre?",
      answer:
        "Visit us at 4008 Mountain Street, Beamsville. We are open Monday to Wednesday 1–7pm and Saturday & Sunday 12–5pm — no appointment required on weekends.",
    },
    {
      question: "Do I need a realtor to buy with Losani?",
      answer:
        "No — you are welcome to register and visit directly. If you are working with a realtor, share their details when you register so we can coordinate.",
    },
    {
      question: "Can I customize finishes with Losani?",
      answer:
        "Yes. Every Losani purchase includes Design Centre appointments in Hamilton, where you personalize flooring, cabinetry, countertops, fixtures, and more with our in-house designers.",
    },
    {
      question: "When will my home be ready?",
      answer:
        "Closing dates depend on your phase and lot. Phase 1 homes are earlier; some Phase 2 releases are future-dated. A Losani advisor will confirm possession timing for the lot you select.",
    },
  ],
  registration: {
    title: "Book Your Private Showing",
    description:
      "Register to tour model homes, receive pricing updates, and connect with our sales team at the Beamsville sales centre.",
    submitLabel: "Book Appointment",
  },
  similarCommunities: [
    {
      name: "Riverbend",
      city: "Paris, ON",
      stage: "available",
      priceFrom: "From $860,000",
      availabilitySummary: "8 Lots Available & 4 Pronto Homes",
      collections: [
        { label: "Pronto Homes", variant: "pronto" },
        { label: "Losani Originals", variant: "originals" },
      ],
      description:
        "Set along the gentle curves of the Nith River, Riverbend offers a rare blend of estate living and everyday convenience in Paris.",
      homeTypes: "Singles, Semi Detached",
      sizeRange: "2,982 – 4,115 sqft",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/RBD-FRONT-LEFT-EXT-PANEL-PRINT-01-1024x683.webp",
      href: "https://www.losanihomes.com/communities/riverbend/",
    },
    {
      name: "Woodview",
      city: "Beamsville, ON",
      stage: "coming_soon",
      priceFrom: "Coming soon",
      availabilitySummary: "Registration open",
      collections: [{ label: "Losani Originals", variant: "originals" }],
      description:
        "A new collection of homes in Beamsville with vineyard views and walkable village amenities.",
      homeTypes: "Singles, Townhomes",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/02/LOSH-HERO-COMM-VRW-1024x778.webp",
      href: "https://www.losanihomes.com/communities/woodview/",
    },
    {
      name: "Winona County West",
      city: "Stoney Creek, ON",
      stage: "coming_soon",
      priceFrom: "Coming soon",
      availabilitySummary: "Join the interest list",
      collections: [{ label: "Losani Originals", variant: "originals" }],
      description:
        "Family-friendly community minutes from the escarpment with parks, schools, and quick access to Hamilton.",
      homeTypes: "Singles, Townhomes",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/LOSH-MENU-COMM-WCW-1024x983.png",
      href: "https://www.losanihomes.com/communities/winona-count-west/",
    },
    {
      name: "Sweetberry",
      city: "Hamilton, ON",
      stage: "coming_soon",
      priceFrom: "Coming soon",
      availabilitySummary: "Join the interest list",
      description:
        "Modern townhome living in Hamilton with thoughtful layouts and Losani's design centre experience.",
      homeTypes: "Townhomes",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/07/sweetberry-2-1024x709.webp",
      href: "https://www.losanihomes.com/communities/sweetberry/",
    },
    {
      name: "Waterstone",
      city: "Stoney Creek, ON",
      stage: "coming_soon",
      priceFrom: "Coming soon",
      availabilitySummary: "Join the interest list",
      description:
        "A Stoney Creek address with contemporary architecture and room to grow for young families.",
      homeTypes: "Singles, Townhomes",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/LOSH-HERO-COMM-WTS-1024x778.png",
      href: "https://www.losanihomes.com/communities/waterstone/",
    },
    {
      name: "Columbus Gate",
      city: "Hamilton, ON",
      stage: "future",
      priceFrom: "From $723,000",
      availabilitySummary: "Join the interest list",
      description:
        "Urban-inspired townhomes in Hamilton with transit access and vibrant neighbourhood amenities.",
      homeTypes: "Townhomes",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/04/LOSH-CLG-HST-TILE.jpg",
      href: "https://www.losanihomes.com/communities/columbus-gate/",
    },
  ],
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
