import type { HomeModel } from "@/lib/types/model";
import { connectedLotUrl, CONNECTED_EXPERIENCE_URL } from "@/lib/connected-experience";

/**
 * Phase-1 mock model pages.
 * - Esprit End reuses real Benchmark Towns specs, renders, and level drawings.
 * - Marigold uses live Riverbank Estates content + elevation renders from Losani.
 */

const espritEnd: HomeModel = {
  slug: "esprit-end",
  name: "Esprit End",
  homeType: "townhome",
  collection: "Benchmark Collection — Phase 2",
  beds: 3,
  baths: 2.5,
  sqft: 1281,
  storeys: 3,
  garage: "1-car garage",
  priceFrom: "From $546,900",
  estimatedPayment: "Est. $2,650/mo",
  paymentDisclaimer: "Estimated payment based on 20% down at 5.49% over 25 years. OAC.",
  heroImage:
    "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
  intro:
    "A light-filled end-unit townhome designed for effortless wine-country living on the Beamsville Bench.",
  description: [
    "The Esprit End pairs the privacy of an end unit with a smart three-storey layout. Extra side windows pull natural light across the open-concept main floor, where the gourmet kitchen, dining area, and great room flow together into one social space.",
    "Upstairs, three bedrooms include a primary retreat with ensuite, while the ground level offers a flexible entry space and direct garage access. Every Esprit End can be personalized at the Losani Design Centre — from flooring and cabinetry to countertops and lighting.",
  ],
  elevations: [
    {
      id: "esprit-end",
      name: "Esprit End",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
      description: "Signature end-unit elevation with full side glazing.",
      materials: ["Brick", "Stone accent", "Hardie board"],
    },
    {
      id: "esprit-enhanced-end",
      name: "Esprit Enhanced End",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
      description: "Upgraded exterior package with premium brick detailing.",
    },
    {
      id: "esprit-interior-f1",
      name: "Esprit Interior F1",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
      description: "Interior-unit companion elevation, style F1.",
    },
    {
      id: "esprit-interior-f2",
      name: "Esprit Interior F2",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
      description: "Interior-unit companion elevation, style F2.",
    },
  ],
  floorLevels: [
    {
      id: "ground",
      name: "Ground Floor",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/1501FE-ESPRIT-G1.webp",
      highlights: ["Covered entry porch", "Flex space / den", "Direct garage access"],
    },
    {
      id: "main",
      name: "Main Floor",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/1501FE-ESPRIT-M1.webp",
      highlights: ["Open-concept great room", "Gourmet kitchen with island", "Powder room and balcony"],
    },
    {
      id: "second",
      name: "Second Floor",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/1501FE-ESPRIT-S3.webp",
      highlights: ["Primary bedroom with ensuite", "Two additional bedrooms", "Upper-level laundry"],
    },
  ],
  floorplanPdfUrl: "https://www.losanihomes.com/floorplans/esprit-end/",
  factSheetUrl: "https://www.losanihomes.com/floorplans/esprit-end/",
  tourUrl: "https://tours.vestarendering.com/Esprit/",
  brochures: [
    {
      title: "Benchmark Main Brochure",
      type: "PDF",
      url: "https://www.losanihomes.com/wp-content/uploads/2025/12/Benchmark-main.pdf",
    },
    {
      title: "Esprit End Floorplan",
      type: "PDF",
      url: "https://www.losanihomes.com/floorplans/esprit-end/",
    },
  ],
  similarModels: [
    {
      slug: "marigold",
      name: "Marigold",
      homeType: "detached",
      beds: 4,
      baths: 3.5,
      sqft: 3140,
      priceFrom: "From $900,000",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/4010A-MARIGOLD-TRADITIONAL-.webp",
    },
    {
      slug: "waldorf-enhanced-end",
      name: "Waldorf Enhanced End",
      homeType: "townhome",
      beds: 3,
      baths: 2.5,
      sqft: 1450,
      priceFrom: "From $589,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
    },
    {
      slug: "esprit-interior-f1",
      name: "Esprit Interior F1",
      homeType: "townhome",
      beds: 3,
      baths: 2.5,
      sqft: 1240,
      priceFrom: "From $529,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp",
    },
  ],
  availableAt: [
    {
      communityName: "Benchmark Towns",
      communitySlug: "benchmark",
      city: "Beamsville, ON",
      stage: "available",
      priceFrom: "From $546,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1.webp",
      connectedUrl: CONNECTED_EXPERIENCE_URL,
      lots: [
        {
          lotNumber: "19",
          status: "available",
          price: "$546,900",
          connectedUrl: connectedLotUrl("19"),
        },
        {
          lotNumber: "39",
          status: "available",
          price: "$552,900",
          connectedUrl: connectedLotUrl("39"),
        },
        {
          lotNumber: "79",
          status: "hold",
          price: "$559,900",
          connectedUrl: connectedLotUrl("79"),
        },
      ],
    },
    {
      communityName: "Woodview",
      city: "Beamsville, ON",
      stage: "coming_soon",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/02/LOSH-HERO-COMM-VRW-1024x778.webp",
      connectedUrl: CONNECTED_EXPERIENCE_URL,
      lots: [],
    },
  ],
  registration: {
    title: "Book the Esprit End",
    description:
      "Book a private showing to walk the Esprit End, review current lot availability, and lock in Phase 2 pricing with our Beamsville sales team.",
    submitLabel: "Book Appointment",
  },
};

const marigold: HomeModel = {
  slug: "marigold",
  name: "Marigold",
  homeType: "detached",
  collection: "Riverbank Estates — Singles",
  beds: 4,
  baths: 3.5,
  sqft: 3140,
  storeys: 2,
  garage: "2-car garage",
  priceFrom: "From $900,000",
  estimatedPayment: "Est. $4,002/mo",
  paymentDisclaimer:
    "This is just an estimate and does not represent or guarantee any rates or amounts. All calculations and scenarios are for demonstration purposes only.",
  heroImage:
    "https://www.losanihomes.com/wp-content/uploads/2025/10/4010A-MARIGOLD-TRADITIONAL-.webp",
  intro:
    "The Marigold delivers space and sophistication for today’s busy families — with five exterior elevations to make it your own.",
  description: [
    "The main floor features an inviting open layout with a bright great room, formal dining area, and a chef-inspired kitchen complete with a large island and breakfast nook — perfect for hosting or everyday meals.",
    "Upstairs, you’ll find 4–5 beds, including a stunning primary suite with walk-in closet and spa-like ensuite, plus a convenient laundry and multiple baths for added comfort. An optional lower level offers room for a home office, gym, or entertainment space.",
  ],
  elevations: [
    {
      id: "traditional",
      name: "Traditional",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/4010A-MARIGOLD-TRADITIONAL-.webp",
      description: "Brick and stone with classic porch and balcony detailing.",
      materials: ["Brick", "Stone", "Cast accents"],
    },
    {
      id: "chateau",
      name: "Chateau",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/4010C-MARIGOLD-CHATEAU-.webp",
      description: "European-inspired stone with arched openings.",
      materials: ["Stone", "Arched windows", "Decorative trim"],
    },
    {
      id: "modern",
      name: "Modern",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/4010E-MARIGOLD-MODERN.webp",
      description: "Clean lines, large glazing, and contemporary materials.",
      materials: ["Stucco", "Panel accents", "Black frames"],
    },
    {
      id: "farmhouse",
      name: "Farmhouse",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/4010F-MARIGOLD-FARMHOUSE-.webp",
      description: "Gabled forms with board-and-batten character.",
      materials: ["Board-and-batten", "Stone base", "Gabled roof"],
    },
    {
      id: "tuscan",
      name: "Tuscan",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/10/4010D-MARIGOLD-TUSCAN-.webp",
      description: "Warm stone and stucco with Mediterranean detailing.",
      materials: ["Stone", "Stucco", "Clay-tone accents"],
    },
  ],
  floorLevels: [
    {
      id: "basement",
      name: "Basement",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/4010A-MARIGOLD-B1.webp",
      highlights: ["Optional recreation room", "Flexible lower-level space", "Rough-in for future bath"],
    },
    {
      id: "main",
      name: "Main Floor",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/4010A-MARIGOLD-M2.webp",
      highlights: [
        "Open great room",
        "Chef-inspired kitchen with island",
        "Formal dining area",
        "Breakfast nook",
      ],
    },
    {
      id: "second",
      name: "Second Floor",
      image: "https://www.losanihomes.com/wp-content/uploads/2025/10/4010A-MARIGOLD-S4.webp",
      highlights: [
        "Primary suite with spa ensuite",
        "Walk-in closet",
        "3–4 additional bedrooms",
        "Upper-level laundry",
      ],
    },
  ],
  floorplanPdfUrl: "https://www.losanihomes.com/floorplans/marigold/",
  factSheetUrl: "https://www.losanihomes.com/floorplans/marigold/",
  brochures: [
    {
      title: "Marigold Floorplans",
      type: "PDF",
      url: "https://www.losanihomes.com/floorplans/marigold/",
    },
  ],
  similarModels: [
    {
      slug: "esprit-end",
      name: "Esprit End",
      homeType: "townhome",
      beds: 3,
      baths: 2.5,
      sqft: 1281,
      priceFrom: "From $546,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp",
    },
    {
      slug: "esprit-interior-f2",
      name: "Esprit Interior F2",
      homeType: "townhome",
      beds: 3,
      baths: 2.5,
      sqft: 1260,
      priceFrom: "From $539,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F2-768x477.webp",
    },
    {
      slug: "whitehaven-end",
      name: "Whitehaven End",
      homeType: "townhome",
      beds: 3,
      baths: 3,
      sqft: 1520,
      priceFrom: "From $599,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/1803EF-WHITEHAVEN-END-768x477.webp",
    },
    {
      slug: "waldorf-enhanced-end",
      name: "Waldorf Enhanced End",
      homeType: "townhome",
      beds: 3,
      baths: 2.5,
      sqft: 1450,
      priceFrom: "From $589,900",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2025/12/CE1501FE-37-RENDERING-WIDE-768x477.webp",
    },
  ],
  tourUrl: "https://tours.vestarendering.com/Marigold/",
  availableAt: [
    {
      communityName: "Riverbank Estates",
      city: "Paris, ON",
      stage: "available",
      priceFrom: "From $900,000",
      image:
        "https://www.losanihomes.com/wp-content/uploads/2026/01/RBD-FRONT-LEFT-EXT-PANEL-PRINT-01-1024x683.webp",
      connectedUrl: CONNECTED_EXPERIENCE_URL,
      lots: [
        {
          lotNumber: "12",
          status: "available",
          price: "$900,000",
          connectedUrl: connectedLotUrl("12"),
        },
        {
          lotNumber: "27",
          status: "available",
          price: "$924,900",
          connectedUrl: connectedLotUrl("27"),
        },
        {
          lotNumber: "31",
          status: "hold",
          price: "$939,900",
          connectedUrl: connectedLotUrl("31"),
        },
      ],
    },
    {
      communityName: "Maplewood Park",
      city: "Ancaster, ON",
      stage: "available",
      priceFrom: "From $949,900",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      connectedUrl: CONNECTED_EXPERIENCE_URL,
      lots: [
        {
          lotNumber: "4",
          status: "available",
          price: "$949,900",
          connectedUrl: connectedLotUrl("4"),
        },
        {
          lotNumber: "8",
          status: "available",
          price: "$964,900",
          connectedUrl: connectedLotUrl("8"),
        },
      ],
    },
  ],
  registration: {
    title: "Book the Marigold",
    description:
      "Book a private showing to walk the Marigold, compare elevations, and review homesite availability with our Riverbank Estates sales team.",
    submitLabel: "Book Appointment",
  },
};

export const seedModels: Record<string, HomeModel> = {
  "esprit-end": espritEnd,
  marigold,
  // Keep legacy slug so existing /models/harvest links still resolve.
  harvest: { ...marigold, slug: "harvest" },
};
