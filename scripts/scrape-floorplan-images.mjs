import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const plans = [
  ["waldorf-enhanced-end", "https://www.losanihomes.com/floorplans/waldorf-enhanced-end/"],
  ["18-esprit-enhanced-end", "https://www.losanihomes.com/floorplans/18-esprit-enhanced-end/"],
  ["whitehaven-end", "https://www.losanihomes.com/floorplans/whitehaven-end/"],
  ["16-esprit-enhanced-end", "https://www.losanihomes.com/floorplans/16-esprit-enhanced-end/"],
  ["knighton-interior-f2", "https://www.losanihomes.com/floorplans/knighton-interior-f2/"],
  ["esprit-interior-f1", "https://www.losanihomes.com/floorplans/esprit-interior-f1/"],
  ["esprit-grande-interior-f1", "https://www.losanihomes.com/floorplans/esprit-grande-interior-f1/"],
  ["whitehaven-enhanced-end", "https://www.losanihomes.com/floorplans/whitehaven-enhanced-end/"],
  ["whitehaven-interior-f2", "https://www.losanihomes.com/floorplans/whitehaven-interior-f2/"],
  ["whitehaven-interior-f3", "https://www.losanihomes.com/floorplans/whitehaven-interior-f3/"],
  ["16-esprit-grande-enhanced-end", "https://www.losanihomes.com/floorplans/16-esprit-grande-enhanced-end/"],
  ["esprit-enhanced-end", "https://www.losanihomes.com/floorplans/esprit-enhanced-end/"],
  ["esprit-end", "https://www.losanihomes.com/floorplans/esprit-end/"],
  ["esprit-grande-enhanced-end", "https://www.losanihomes.com/floorplans/esprit-grande-enhanced-end/"],
  ["abbotsford-enhanced-end", "https://www.losanihomes.com/floorplans/abbotsford-enhanced-end/"],
  ["esprit-interior-f2", "https://www.losanihomes.com/floorplans/esprit-interior-f2/"],
];

const LOSANI = "https://www.losanihomes.com/wp-content/uploads";

/** Curated fixes — Waldorf aspect ratio + pages with broken featured markup. */
const OVERRIDES = {
  "waldorf-enhanced-end": `${LOSANI}/2025/10/CE1806FE-WALDORF-ENH-END-768x757.webp`,
  "esprit-enhanced-end": `${LOSANI}/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp`,
  "esprit-grande-enhanced-end": `${LOSANI}/2025/12/1502EF-ESPRIT-GRANDE-END-WIDE-1-768x477.webp`,
};

function normalizeImageUrl(url) {
  return url.trim().replace(/\s+$/, "");
}

function toThumb768(url) {
  const clean = normalizeImageUrl(url);
  if (/-\d+x\d+\.(webp|png|jpg)/i.test(clean)) return clean;
  return clean.replace(/\.(webp|png|jpg)(\?.*)?$/i, "-768x477.$1");
}

async function scrapeFeatured(id, url) {
  const res = await fetch(url);
  const html = await res.text();

  const slug = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const cardMatch = html.match(
    new RegExp(`<img src="([^"]+)"\\s+alt="${slug}"`, "i"),
  );
  if (cardMatch?.[1]) {
    const card = normalizeImageUrl(cardMatch[1]);
    if (!card.includes("watermark") && !card.endsWith(".svg")) {
      return toThumb768(card);
    }
  }

  const featuredSection = html.match(/data-tab-content="featured-0"[\s\S]*?<\/figure>/);
  const section = featuredSection?.[0] ?? "";

  const imgs = [...section.matchAll(/<img src="([^"]+)"/g)]
    .map((m) => normalizeImageUrl(m[1]))
    .filter(
      (u) =>
        u.includes("wp-content/uploads") &&
        !u.includes("watermark") &&
        !u.includes("favicon") &&
        !u.endsWith(".svg"),
    );

  if (imgs[0]) return toThumb768(imgs[0]);

  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  return og && !og.endsWith(".svg") ? toThumb768(og) : "";
}

const out = { ...OVERRIDES };

for (const [id, url] of plans) {
  if (out[id]) continue;
  try {
    out[id] = await scrapeFeatured(id, url);
    console.error(`${id}: ${out[id] || "MISSING"}`);
  } catch (e) {
    console.error(`${id}: ERROR ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

writeFileSync(
  join(__dirname, "../src/lib/data/benchmark-floorplan-images.json"),
  `${JSON.stringify(out, null, 2)}\n`,
);
console.error(`Wrote ${Object.keys(out).length} images`);
