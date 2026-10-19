# Shane Tarleton's website

A minimal, static personal website built with Astro. Home introduces Shane as a
software engineer across industries; About summarizes his provided LinkedIn
profile; Projects highlights the hierarchical data display patent and Cirrus
Solutions Subcontractor Portal; Blog hosts his writing in Markdown.

The default theme is dark. Visitors can select light mode, and their preference
is saved in browser local storage. If storage is unavailable, the toggle still
works for the current page. No analytics, account system, or comment service is
included.

## Local development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, including `/website/`.

```sh
npm run build
npm run preview
```

Run `npm test` to build and check generated routes, links, article discovery,
theme persistence, and blog filtering.

## Publish an article

Add `src/content/blog/my-article.md`:

```md
---
title: "An article title"
description: "A short summary for readers and search engines."
pubDate: 2026-10-19
tags: ["software-engineering"]
draft: false
---

Write the article in Markdown here.
```

The filename becomes `/website/blog/my-article/`. Keep filenames stable after
publication. Set `draft: true` to exclude a post from all generated routes,
article lists, the sitemap, and RSS. Drafts committed to a public repository
are still visible in its source; do not commit private drafts.

Place images in `public/images/blog/` and reference them in article Markdown
using HTML so Astro treats them as public URLs rather than source imports:

```html
<img src="../../images/blog/filename.jpg" alt="Describe the image">
```

Include meaningful alt text and preserve required attribution. These relative
paths work with either the repository base path or a future custom domain.

Merge into the deployment branch to publish. The blog has client-side title,
summary, and topic filtering; articles themselves work without JavaScript.
RSS is available at `/website/rss.xml`.

## Update personal information

Edit `src/data/profile.ts` for the headline, introduction, experience, and
education. The current headline intentionally does not name an employer;
Cirrus Solutions is listed as past employment based on the supplied profile.
New role details can be added when approved for publication.

Edit `src/pages/projects.astro` for the two public project summaries. Do not add
confidential employer implementation details. Edit `src/lib/site.ts` for social
links and site metadata. Contact is through LinkedIn; the profile export's
email address and private account data are not published.

## GitHub Pages

`.github/workflows/deploy.yml` builds on pushes to `master` and supports manual
dispatch. It publishes the generated `dist/` artifact with GitHub's official
Pages actions. No deployment branch or server is needed.

1. Push these changes to GitHub.
2. In **Settings > Pages > Build and deployment**, select **GitHub Actions**.
3. Run the **Deploy to GitHub Pages** workflow, or push to `master`.

The production URL is `https://shanetarleton.com/`. The workflow sets
`SITE_URL=https://shanetarleton.com` and `BASE_PATH=/` so links, assets,
canonical URLs, RSS, and the sitemap use the custom domain's root.
Local development still defaults to `/website/`. To preview production paths:

```sh
SITE_URL=https://shanetarleton.com BASE_PATH=/ npm test
SITE_URL=https://shanetarleton.com BASE_PATH=/ npm run preview
```

If the repository's default
branch is renamed, update the workflow's `on.push.branches` setting.
Repository administrator access is needed for the Pages setting.

## Custom domain configuration

Set `SITE_URL` to the full HTTPS origin (for example `https://example.com`)
and `BASE_PATH` to `/` in the build environment of the workflow. Set those same
values locally to preview the domain configuration. They control internal
links, assets, canonical URLs, RSS, and the sitemap together.

Add the domain under **Settings > Pages**, configure the DNS records described
by GitHub, verify domain ownership, and enable HTTPS. Rebuild after changing
the domain. Do not retain `/website` in the base path when serving at the root
of a custom domain.

`shanetarleton.com` is configured in the repository's Pages settings. Its apex
DNS uses GitHub's four A records, and `www` is a CNAME to
`th3n3wguy.github.io`. GitHub redirects `www` to the primary apex domain.
Keep the account-level domain-verification TXT record in DNS. With an Actions
deployment, a repository `CNAME` file is not required.

## Medium migration

Only published long-form articles belong in the public archive. Medium replies,
unpublished drafts, account information, reading history, and the original
export ZIP must not be committed. See `docs/medium-migration.md` for the import
inventory and asset recovery details.

The local pages are canonical; Medium source links are historical attribution,
not canonical URLs. Removing old Medium copies or changing their canonical
settings remains an account-owner action. Existing Medium URLs cannot be
redirected by this GitHub Pages repository.
