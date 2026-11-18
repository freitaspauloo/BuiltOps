# v3 — frozen editorial redesign snapshot

Frozen snapshot of the v3 Benchmark microsite (editorial redesign), preserved for
comparison when v4 became the active version.

- `section-renderer-v3.tsx` (in the parent `sections/` folder) renders this version.
- `snapshot/` contains verbatim copies of the section files that diverged in v4.
  Sections that are identical between v3 and v4 are still imported from the root
  `sections/` tree by `section-renderer-v3.tsx`.
- **Do not edit** files in `snapshot/` — extend the root v4 section files instead.
