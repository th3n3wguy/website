---
name: validate-site
description: Validate Astro generated output, external links, theme/filter behavior, and both repository and production deployment paths.
---

# Validate the site

Use the plan to choose coverage. Run from repository root with supported Node
(currently package.json requires 22.12+). Use existing tooling; no lint script
or dedicated real-browser runner is configured.

1. Inspect the diff, affected tests, and available dependencies. Use `npm ci`
   only when dependencies are absent or restoration is required. Do not install
   new test tools just to run this checklist.
2. `npm test` builds with the default repository base and runs
   `node --test tests/site.test.mjs` against `dist/`.
3. For application, content, routing, middleware, or deployment changes, run
   production-path coverage as well:

   ```sh
   SITE_URL=https://shanetarleton.com BASE_PATH=/ npm test
   ```

   In PowerShell, set `$env:SITE_URL` and `$env:BASE_PATH` to the same values
   before `npm test`, and restore their previous values afterward.
   Do not build both modes concurrently: they share `dist/` and `.astro/`.
4. Tests cover generated links/assets/anchors, one H1, metadata, no iframes or
   tracking pixels, at least the migrated article archive, RSS/sitemap membership,
   external targets/rel, theme defaults/persistence/storage errors, and combined
   blog filters. Add focused assertions for changed requirements, including
   draft exclusion when that logic changes; do not assume every edge is covered.
5. For TypeScript changes, run the existing available compiler:
   `npm exec --offline -- tsc --noEmit`. This does not type-check `.astro`
   templates; use the Astro build too and report that distinction.
6. For visual/interaction changes, preview the matching build with the same
   environment (`npm run preview`) and verify the process responds before use.
   Check both themes, narrow/wide viewports, keyboard/focus, external/internal
   navigation, and no-JS articles when a browser is available. Stop only the
   specific process started for this task afterward.
7. Run `git diff --check`, inspect the final diff, and report commands/results,
   output mode, uncovered behavior, and defects. Documentation-only changes
   require reference/frontmatter/ignore checks, not a site rebuild unless they
   affect generated site content.
