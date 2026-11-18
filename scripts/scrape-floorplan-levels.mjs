import { writeFileSync } from "node:fs";
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
  ["esprit-enhanced-end", "https://www.losanihomes.com/floorplans/esprit-end-2/"],
  ["esprit-end", "https://www.losanihomes.com/floorplans/esprit-end/"],
  ["esprit-grande-enhanced-end", "https://www.losanihomes.com/floorplans/esprit-grande-end/"],
  ["abbotsford-enhanced-end", "https://www.losanihomes.com/floorplans/abbotsford-enhanced-end/"],
  ["esprit-interior-f2", "https://www.losanihomes.com/floorplans/esprit-interior-f2/"],
];

const fallbackLabels = ["Ground floor", "Main floor", "Second floor", "Third floor"];

async function scrape(id, url) {
  const res = await fetch(url);
  const html = await res.text();

  const tabMatches = [...html.matchAll(/designs__tab[^>]*data-tab="content-\d+"[^>]*>([^<]+)</g)];
  const labels = tabMatches.map((m) =>
    m[1]
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  const sectionMatch = html.match(/list-tabs-floorplans[\s\S]*?<\/div>\s*<\/section>/);
  const section = sectionMatch?.[0] ?? html;

  const figures = [
    ...section.matchAll(/data-tab-content="content-\d+"[^>]*>[\s\S]*?<img src="([^"]+)"/g),
  ];

  const images = figures
    .map((m) => m[1].trim())
    .filter((u) => u.includes("wp-content/uploads") && !u.includes("watermark"));

  const gallery = images.map((imageUrl, i) => ({
    url: imageUrl.replace(/\s+$/, ""),
    alt: `${labels[i] ?? fallbackLabels[i] ?? `Level ${i + 1}`}`,
    caption: labels[i] ?? fallbackLabels[i] ?? `Level ${i + 1}`,
  }));

  return { id, gallery, labels };
}

const out = {};
for (const [id, url] of plans) {
  try {
    const r = await scrape(id, url);
    out[id] = r.gallery;
    console.log(`${id}: ${r.gallery.length} levels`);
  } catch (e) {
    console.log(`${id}: ERROR ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

out["esprit-enhanced-end"] = out["esprit-end"] ?? [];

writeFileSync(
  join(__dirname, "../src/lib/data/benchmark-floorplan-levels.json"),
  `${JSON.stringify(out, null, 2)}\n`,
);
console.error(`Wrote ${Object.keys(out).length} floorplan galleries`);
