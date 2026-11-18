# BuiltOps — Losani Community Microsites

Modular community microsite platform for Losani Homes.

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000
```

**CMS (Payload — we own it):** http://localhost:3000/admin

Seed demo content (dev server must be running):

```bash
npm run payload:seed
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Redirects to `/communities/benchmark` |
| `/communities/benchmark` | Production community microsite (v6, CMS-backed) |
| `/communities/benchmark/future-community` | Presentation — Future Community stage |
| `/communities/benchmark/coming-soon` | Presentation — Coming Soon stage |
| `/communities/benchmark/available-now` | Presentation — Available Now stage |
| `/models/marigold` | Detached model |
| `/models/esprit-end` | Townhome model |
| `/admin` | Payload CMS — projects, communities, models, versions |
| `/api/preview` | Draft preview (from admin Preview button) |
| `/old` | Version archive index |
| `/old/communities/benchmark?version=v5` | Frozen version playground |
| `/old/design` | Design Hub (lab) |

## CMS setup

1. Copy `.env.example` → `.env.local`
2. Set a long random `PAYLOAD_SECRET`
3. Local DB: `DATABASE_URL=file:./payload.db`
4. Production: set `DATABASE_URL=postgresql://…` (Postgres adapter switches automatically)
5. `npm run dev` → `/admin` → create first admin user
6. `npm run payload:seed` to import Project + Benchmark + Marigold + Esprit
7. Edit → **Save draft** → **Preview** / **Publish** → use **Versions** to restore

### Architecture

- **Payload owns:** copy, images, prices, links, section order, users, version history, **media library**
- **Code owns:** layout, design, hide-if-empty, stage safety rails
- **Database:** ours (SQLite local / Postgres prod)
- **Files:** uploaded media stored under `public/media` (yours)

### Media

In `/admin` → **Media library**:
- Upload photos, short videos (mp4/webm), PDFs
- Organize with folders (Heroes, Galleries, Elevations, Floorplans, Videos…)
- On communities/models, pick from the library (or still paste a URL)

Published Payload docs override seed files. Seeds remain as fallback.

## Stack

Next.js 16 · Tailwind CSS 4 · Payload CMS · TypeScript

## Docs

Notion: **Payload CMS — Implementation Plan**
