# Architecture and maintenance invariants

## Stack and source map

The site is generated statically with Astro, TypeScript/ESM, semantic HTML, plain
CSS, and Markdown. Zod validates the blog collection. Astro's RSS and sitemap
integrations provide discovery. Cheerio transforms generated HTML at build time
and helps inspect it in Node's test runner; no server is deployed to Pages.

| Surface | Source |
| --- | --- |
| Shared HTML, navigation, SEO, theme behavior | `src/layouts/Layout.astro` |
| Home, About, Projects, Blog, RSS, 404 | `src/pages/` |
| Article listing | `src/components/PostList.astro` |
| Global responsive design and theme variables | `src/styles/global.css` |
| Profile and experience | `src/data/profile.ts` |
| Site metadata, base-aware paths, publication query, UTC dates | `src/lib/site.ts` |
| Collection schema and loader | `src/content.config.ts` |
| Published article source | `src/content/blog/*.md` |
| Static assets | `public/` |
| External-link output transformation | `src/middleware.ts` |
| Generated-output and script-behavior checks | `tests/site.test.mjs` |

## Design and interaction

Keep the minimal design: readable typography, restrained accent, generous space,
responsive layouts, and CSS variables for both themes. Dark is default; an inline
head script restores a saved light preference before rendering. The toggle saves
the preference in local storage. Storage failures warn without preventing the
current toggle. Articles must remain readable without client JavaScript.

Preserve accessible headings, labels, focus states, skip navigation, image alt
text, and meaningful links. Blog search combines text and topic filters with a
live result count. Generated external HTTP(S) links receive `target="_blank"`
and `rel="noopener noreferrer"` centrally; same-origin links remain in-page/tab.
Do not scatter duplicate external-link logic across templates or Markdown.

## Content and discovery

Blog frontmatter requires title, description, and a coercible publication date.
Tags default to an empty array, draft defaults false, and optional sourceUrl
records attribution. Published queries use `getPosts()`, exclude drafts, and
sort newest first. Keep slugs stable; do not duplicate the layout's H1 in posts.
Public images use HTML URLs relative to the article route to avoid Astro's
source-image resolver. See the site-change skill and root README.

Draft exclusion is not confidentiality: committed source is public. Only publish
approved profile/project facts and article content. The historical migration
record remains in `docs/medium-migration.md`.

## URLs and static deployment

`astro.config.mjs` uses SITE_URL/BASE_PATH, trailing slashes, sitemap integration,
and light/dark syntax highlighting. Defaults support
`https://th3n3wguy.github.io/website/`; production workflow overrides them with
`https://shanetarleton.com` and `/`. Use `path()` rather than hardcoded internal
prefixes. Canonicals, RSS, sitemap, and assets must agree with the build mode.
The 404 page is noindex. Do not commit generated `dist/` or `.astro/`.
