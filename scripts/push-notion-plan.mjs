#!/usr/bin/env node
/**
 * Push BuiltOps plan as a Notion database (board/table) to a parent page.
 *
 * Setup:
 * 1. Create integration: https://www.notion.so/my-integrations
 * 2. Share the BuiltOps Plan page with the integration (⋯ → Connect to)
 * 3. NOTION_TOKEN=secret_xxx node scripts/push-notion-plan.mjs
 *
 * Optional: NOTION_PARENT_PAGE_ID (defaults to BuiltOps Plan page)
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NOTION_VERSION = "2022-06-28";
const DEFAULT_PARENT = "38e0f86a1720806aa7b0c65ccdf493d7";

const token = process.env.NOTION_TOKEN;
const parentId = (process.env.NOTION_PARENT_PAGE_ID ?? DEFAULT_PARENT).replace(/-/g, "");

if (!token) {
  console.error("Missing NOTION_TOKEN. Create an integration and share the page with it.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json",
};

async function notion(path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method: body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message ?? JSON.stringify(data));
  }
  return data;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
        continue;
      }
      current += char;
    }
    values.push(current);
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

function richText(content) {
  return [{ type: "text", text: { content: content.slice(0, 1900) } }];
}

function select(name) {
  return name ? { select: { name } } : { select: null };
}

async function main() {
  const csvPath = join(__dirname, "../docs/builtops-plan-import.csv");
  const rows = parseCsv(readFileSync(csvPath, "utf8"));

  console.log("Creating Notion database on parent page…");

  const db = await notion("/databases", {
    parent: { type: "page_id", page_id: parentId },
    icon: { type: "emoji", emoji: "🏗️" },
    title: richText("BuiltOps v1 → v2 — Design & Interactions"),
    properties: {
      Task: { title: {} },
      Phase: {
        select: {
          options: [
            { name: "Phase 1", color: "blue" },
            { name: "Phase 2", color: "purple" },
            { name: "Phase 3", color: "yellow" },
            { name: "Phase 4", color: "gray" },
          ],
        },
      },
      Priority: {
        select: {
          options: [
            { name: "P0", color: "red" },
            { name: "P1", color: "orange" },
            { name: "P2", color: "green" },
            { name: "P3", color: "default" },
          ],
        },
      },
      Status: {
        select: {
          options: [
            { name: "Not started", color: "default" },
            { name: "In progress", color: "blue" },
            { name: "Done", color: "green" },
            { name: "Blocked", color: "red" },
          ],
        },
      },
      Impact: {
        select: {
          options: [
            { name: "Very High", color: "red" },
            { name: "High", color: "orange" },
            { name: "Medium", color: "yellow" },
            { name: "Low", color: "gray" },
          ],
        },
      },
      Area: { rich_text: {} },
      Files: { rich_text: {} },
      Notes: { rich_text: {} },
    },
  });

  console.log(`Database created: ${db.url ?? db.id}`);

  for (const row of rows) {
    await notion("/pages", {
      parent: { database_id: db.id },
      properties: {
        Task: { title: richText(row.Task) },
        Phase: select(row.Phase),
        Priority: select(row.Priority),
        Status: select(row.Status),
        Impact: select(row.Impact),
        Area: { rich_text: richText(row.Area) },
        Files: { rich_text: richText(row.Files) },
        Notes: { rich_text: richText(row.Notes) },
      },
    });
    console.log(`  + ${row.Task.slice(0, 60)}…`);
  }

  // Summary callout as first page block on parent (optional child page content)
  await notion(`/blocks/${parentId}/children`, {
    children: [
      {
        object: "block",
        type: "callout",
        callout: {
          icon: { type: "emoji", emoji: "📋" },
          rich_text: richText(
            "Plan board created. Open the database below — use Board view grouped by Phase, or Table view for full sheet. Sprint 1: P0 items in Phase 1 + Phase 2.",
          ),
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: richText(
            "Live site: https://losani-builtops.vercel.app/communities/benchmark · Design hub: /design · Microsite version: v1",
          ),
        },
      },
    ],
  }).catch(() => {
    /* parent may be read-only for blocks; database is the deliverable */
  });

  console.log("\nDone. Open your Notion page and switch the database to Board or Table view.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
