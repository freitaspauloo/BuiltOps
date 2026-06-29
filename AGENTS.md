# BuiltOps — Agent rules

## Design system

- **Border radius:** Always `0` — sharp corners on every UI element (cards, pills, buttons, gallery frames, nav controls, inputs, tags). Never use `rounded-full`, `rounded-lg`, or section-specific radius overrides.
- **Cards:** Flat `#F6F6F6` (`bg-card`) on white canvas — no borders, no shadows.
- **Eyebrows:** Light teal pills (`bg-primary-muted`, `text-primary`) for section labels.
- **Card labels:** Same teal treatment with `pl-0` so text aligns with card headings.
- **Icons:** Remix solid (Fill) for nav and section chrome; Remix Line for content pill icons.

## Next.js

This version has breaking changes — read `node_modules/next/dist/docs/` before writing Next.js code.
