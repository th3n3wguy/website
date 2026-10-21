---
name: site-change
description: Implement or update Astro pages, minimal responsive styling, profile content, and Markdown articles without breaking shared site behavior.
---

# Site change

Require the planner handoff and documentation-owned plan. Read
`documentation/architecture.md` and the relevant source before editing.

1. Trace the requested behavior through layout, pages, helpers, middleware,
   content schema, and tests. Choose the smallest complete change.
2. For pages/components, reuse `src/layouts/Layout.astro`, CSS variables in
   `src/styles/global.css`, and `path()` in `src/lib/site.ts`. Preserve semantic
   HTML, dark-first themes, responsive layout, and keyboard accessibility.
3. For a blog post, create a stable lowercase hyphenated filename under
   `src/content/blog/`. Include `title`, `description`, and `pubDate` (YYYY-MM-DD);
   use existing topic spellings for `tags`. `draft` defaults false, so set it
   deliberately. `sourceUrl` is optional attribution, not a canonical override.
   Never commit a private draft: `draft: true` only hides generated pages.
4. Do not duplicate the title as an H1 in the Markdown body. Put images in
   `public/images/blog/` and use HTML
   `<img src="../../images/blog/name.jpg" alt="Meaningful description">`.
   Preserve attribution. Do not insert live tracking or script embeds.
5. For profile/projects, use only approved/public facts and update
   `src/data/profile.ts`, `src/lib/site.ts`, or the appropriate page. Do not
   infer new employment, metrics, or confidential implementation details.
6. Preserve publication filters, descending dates, article links, RSS, sitemap,
   canonical URLs, and centralized external-link handling. Check both root and
   repository-base behavior for routing/shared changes.
7. Run relevant steps from `../validate-site/SKILL.md`. Return changes, evidence,
   and documentation implications to planning; let documentation maintain the
   plan and tracked docs. Do not push from this procedure.
