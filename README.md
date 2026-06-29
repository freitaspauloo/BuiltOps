# BuiltOps — Losani Community Microsites

Modular community microsite platform for Losani Homes.

## Quick start

```bash
npm install
npm run dev          # Next.js → http://localhost:3000
npm run sanity:dev   # Sanity CMS → http://localhost:3333
```

## Routes

| Route | Purpose |
|---|---|
| `/design` | Design Hub — tokens, components, live preview |
| `/communities/benchmark` | Full Available Now demo (Losani Benchmark) |

## CMS setup

1. Create a project at [sanity.io/manage](https://sanity.io/manage)
2. Copy `.env.example` → `.env.local` and add your project ID
3. Run `npm run sanity:dev` to open the studio
4. Create a **Community** document with slug `benchmark`

Until Sanity is configured, the site uses seed data from `src/lib/data/seed-benchmark.ts`.

## Stack

- Next.js 16 · Tailwind CSS 4 · Sanity CMS · TypeScript
- 18 content modules with stage-based visibility (Future / Coming Soon / Available Now)

## Phases

- **Phase 1 (done):** Foundation — CMS schemas, all sections, Design Hub, seed data
- **Phase 2 (Claude 4.8):** Visual design polish on Design Hub + community pages
- **Phase 3:** Coming Soon + Future stage demos
- **Phase 4:** Forms, analytics, CRM hooks
