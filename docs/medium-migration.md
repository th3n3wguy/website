# Medium migration

The five full-length published articles in the author's Medium export have been
migrated to `src/content/blog/`. They retain their original titles, UTC publication
dates, article text, links, image captions/credits, and code. The export's subtitles
are used as descriptions. Tags were not included in the individual article exports;
the small sets of relevant tags in the importer are inferred editorial metadata.

## Published inventory

| Publication date | Original title | Local slug | Local images | Code blocks |
| --- | --- | --- | --- | --- |
| 2019-01-28 | Why I include Lodash in (almost) every project… | `why-i-include-lodash-in-almost-every-project` | 2 | 13 |
| 2019-02-18 | A Hypothesis On How React.js Became So Popular | `a-hypothesis-on-how-react-js-became-so-popular` | 1 | 5 |
| 2020-08-19 | Data Scientists…what do you mean that you’re not “programmers”? | `data-scientists-what-do-you-mean-that-youre-not-programmers` | 4 | 0 |
| 2022-02-22 | Please stop using nested if statements. | `please-stop-using-nested-if-statements` | 1 | 3 |
| 2022-02-24 | Use map() instead of for() loops | `use-map-instead-of-for-loops` | 1 | 3 |

There are **five articles, nine local image files, and 24 fenced code blocks**.
The original examples are archival material: existing typos, syntax errors, and
historical technical claims have not been silently corrected.

`sourceUrl` identifies the original Medium article for attribution; it is **not**
a canonical URL override. Article canonical URLs belong to the local Astro site.
Frontmatter contains `title`, `description`, `pubDate` (`YYYY-MM-DD`), `tags`,
`sourceUrl`, and `draft: false`. The duplicated body title is removed because the
article layout renders the frontmatter title. The data-science subtitle, which
was only present in export metadata, is also included at the start of its body.

## Local images and deployment paths

All nine retained images were downloaded successfully from the export's public
Medium CDN URLs into `public/images/blog/`. Original captions and link attributions
remain immediately after the images. Existing alt text is preserved; missing alt
text uses the original caption or a neutral article-illustration label.

Markdown uses HTML `<img>` tags with `../../images/blog/<filename>` URLs. HTML
avoids Astro interpreting these public assets as source-relative image imports.
From an article at
`/blog/<slug>/` this resolves to `/images/blog/<filename>`; from
`/website/blog/<slug>/` it resolves to `/website/images/blog/<filename>`.
Keep trailing-slash article URLs. Feed generation must resolve image/link URLs
against the absolute article URL, rather than the feed URL, so images remain
absolute and deployment-base aware.

## Recovered embedded code

All six embedded gists were recovered as real source, not screenshots, fabricated
examples, or JavaScript embed dependencies. The importer fetches the public gist
JSON to discover its revision-pinned raw file URL, then downloads that raw text.
Each recovered code block includes a link to the exact raw revision used.

| Article | Gist ID | Source filename |
| --- | --- | --- |
| Nested if statements | `3e85857899595c9bd9ee8d103d88bf65` | `getDocuments_nestedIf.js` |
| Nested if statements | `5c8858d7cb94a112e3df2b19f55e5c0a` | `getDocuments_nonNestedIf.js` |
| Nested if statements | `1f582e4829106d389e9682b9795d78a6` | `getDocuments_ternary.js` |
| map() | `771a3a5f9e8eae24cd72b576d5eac037` | `getIdsFromObjectArray_forLoop.js` |
| map() | `0f7cd70cb81ea5af5910b4a8faf36478` | `getIdsFromObjectArray_map.js` |
| map() | `66bfd3f9d7915a131a7b52e30bdca660` | `getIdsFromObjectArray_mapExpanded.js` |

The Lodash and React articles also retain their 18 exported inline code blocks.
Exported `<br>` elements inside those blocks become actual source-code newlines.

## Intentional exclusions

- The one unpublished draft and five short responses are not imported.
- Profiles, session/IP records, reading history, following lists, bookmarks,
  highlights, and all other private export records are neither extracted nor read
  by the importer. The archive itself must remain outside version control.
- Export-only author/date/canonical/export footer markup is replaced by structured
  frontmatter and the site's own article layout.
- The React article's final publication promotion, section `2031`, is omitted:
  the Journal banner, “Read this story later in Journal” link, and Noteworthy
  newsletter solicitation.
- The map() article's section `e198` is an inserted Bit “Build in AI speed”
  advertisement. Section `8027` is the concluding Bit Cloud/composable-applications
  promotion and related promotional reading links. Both sections, including the
  advertisement image and promotional GIF, are omitted. No authored explanatory
  sections or the map() article's introductory image were removed.
- No tracking-pixel images were found among the retained article images.

## Re-running the migration

Prerequisites: Node.js matching the repository's supported version, the `unzip`
executable, installed project dependencies (`cheerio` and `turndown`), the author's
original ZIP, and access to the public image CDN and GitHub gist/raw endpoints.

```sh
node scripts/import-medium.mjs /absolute/path/to/medium-export.zip
# Equivalent package command:
npm run import:medium -- /absolute/path/to/medium-export.zip
```

The importer allowlists exactly five ZIP entry paths and reads each with
`unzip -p`; it never unpacks the archive or reads unrelated entries. It can be
invoked from any directory because output paths are relative to the script's
repository. It does not upload export content anywhere: network requests download
only the public assets referenced by these articles.

Every article is converted and every dependency downloaded before any published
output is written. Missing metadata, unexpected embeds, unsupported images,
network/HTTP failures, or missing gist source cause a nonzero exit with an explicit
error, rather than producing a silently incomplete article. Existing output remains
unchanged if conversion or asset retrieval fails. Identical output is not rewritten;
the allowlisted files are refreshed when source content changes. Unrelated files
are never deleted. Re-running requires network access even if images already exist.

There are **no known missing article text, code embeds, or images** in this migration.
The checked-in Markdown and images render without contacting Medium or GitHub.

## Verification

- `node --check scripts/import-medium.mjs` succeeds.
- Repeating the import produces identical SHA-256 hashes for every generated
  article and image.
- `npm test` builds all five articles and passes the five existing site tests,
  including generated local image/link checks, canonical metadata, RSS/sitemap
  membership, and search/topic filtering under the `/website` deployment base.
