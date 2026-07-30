# BuiltOps — Agent rules

## Design system

- **Border radius:** Always `0` — sharp corners on every UI element (cards, pills, buttons, gallery frames, nav controls, inputs, tags). Never use `rounded-full`, `rounded-lg`, or section-specific radius overrides.
- **Cards:** Flat `#F6F6F6` (`bg-card`) on white canvas — no borders, no shadows.
- **Eyebrows:** Light teal pills (`bg-primary-muted`, `text-primary`) for section labels.
- **Card labels:** Same teal treatment with `pl-0` so text aligns with card headings.
- **Icons:** Remix solid (Fill) for nav and section chrome; Remix Line for content pill icons.

## Next.js

This version has breaking changes — read `node_modules/next/dist/docs/` before writing Next.js code.

## Cursor Cloud specific instructions

### Bootstrap

- Node 22 + npm are expected. Run `npm install` if `node_modules` is missing (also configured as `install` in `.cursor/environment.json`).
- App: `npm run dev` → http://localhost:3000 (started automatically via `terminals`).
- Sanity Studio (optional): `npm run sanity:dev` → http://localhost:3333 — needs `NEXT_PUBLIC_SANITY_PROJECT_ID` / dataset secrets.
- Verify: `npm run build` must succeed. Key routes: `/` (redirects), `/design`, `/communities/benchmark`.

### Content / CMS

- Until Sanity env vars are set, the site uses seed data from `src/lib/data/seed-benchmark.ts`. You can ship UI work without CMS credentials.
- Env template: `.env.example`. Prefer Cursor Secrets over committing `.env.local`.
- Optional secrets for full fidelity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAP_ID`.

### Verify before handing off

1. `npm run build`
2. Hit `/communities/benchmark` and `/design` (HTTP 200)
3. Follow design-system rules above (radius `0`, flat cards, teal eyebrows)

### Notes

- `npm run lint` currently fails: ESLint 9 expects `eslint.config.*` and the repo has none yet — do not treat that as a regression from your change unless you are adding the config.
- Task backlog lives in `docs/builtops-plan-import.csv` (Phase 1–4 UI polish).
