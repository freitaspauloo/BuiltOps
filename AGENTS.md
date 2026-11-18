# BuiltOps — Agent rules

## Production vs archive

| Route | Role |
|-------|------|
| **`/communities/[slug]`** | Production — always **v6**, CMS-backed content, no `?version=` |
| **`/models/[slug]`** | Production model pages — v6 chrome, CMS-backed |
| **`/`** | Redirects to `/communities/benchmark` |
| **`/old/...`** | Version playground + design lab — not production |

- Production **ignores** CMS `micrositeVersion` for rendering (always v6). Content still comes from Payload.
- `?version=` on `/communities/...` redirects to `/old/communities/...?version=`.
- Preview / version switcher mounts only under [`src/app/old/layout.tsx`](src/app/old/layout.tsx).

## Microsite versions (archive)

| Version | Role | Edit? |
|---------|------|-------|
| **v6** | Production (+ archive copy via `/old`) | Yes — `v6/snapshot/` |
| **v6b** | Archive — v6 without inventory | Yes (visibility only) |
| **v5** | Jul 7 content pass — frozen | **No — frozen** |
| **v4** | Audit improvement pass — frozen | **No — frozen** |
| **v3** | Editorial redesign — frozen in `v3/snapshot/` | **No — frozen** |
| **v2** | Pre-redesign — frozen in `v2/` | **No — frozen** |
| **v1** | Original ship `fb6212b` — frozen in `v1/` | **No — frozen** |

- **Never edit v1–v5** for feature work. Extend **`v6/snapshot/`** + `section-renderer-v6.tsx` (+ model pages) only.
- v1: `section-renderer-v1.tsx` + `v1/snapshot/`
- v2: `section-renderer-v2.tsx` + `v2/snapshot/`
- v3: `section-renderer-v3.tsx` + `v3/snapshot/`
- v4/v5: `section-renderer.tsx` + root `sections/` — **frozen**
- v6 / v6b: `section-renderer-v6.tsx` + `v6/snapshot/`. v6b reuses `data-microsite-version="v6"` and hides inventory via `V6B_HIDDEN_INVENTORY_SECTIONS`.
- Links: `communityHref(slug)` → production; `archiveCommunityHref(slug, version)` → `/old`.
- Editorial CSS: **all new styling** under `[data-microsite-version="v6"]` only.

## Design system

- **Border radius:** Portal-soft corners — **`1rem` (`--radius-card`)** on cards/media; **`0.75rem` (`--radius-control`)** on buttons, inputs, pills; **`0.5rem` (`--radius-sm`)** on small chips. Not pill-shaped.
- **v3 editorial:** Scoped via `[data-microsite-version="v3"]` — hairline dividers, open white canvas, `SectionIntro` headers, color accents on icons/CTAs only.
- **Cards (v2):** Flat `#F4F7FB` (`bg-card`) on white canvas — no borders, no shadows.
- **Eyebrows:** Light navy pills (`bg-primary-muted`, `text-primary`) for section labels (v2); v3 uses muted text labels + hairlines.
- **Icons:** Remix solid (Fill) for nav and section chrome; Remix Line for content pill icons.

## Next.js

This version has breaking changes — read `node_modules/next/dist/docs/` before writing Next.js code.
