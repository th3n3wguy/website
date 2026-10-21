# Development and release operations

Use the supported Node version in `package.json` (currently 22.12+) and npm.
Restore dependencies with `npm ci` in a clean environment or after a missing
dependency failure. Use npm to update the lockfile when dependencies change.

## Development and verification

`npm run dev` serves the source with the default `/website/` base.
`npm run build` writes static output into `dist/`; `npm run preview` serves that
output. Run them with the same SITE_URL/BASE_PATH when checking another mode.
Do not run builds concurrently into the same output directory.

`npm test` builds and runs Node/Cheerio/VM checks in `tests/site.test.mjs`.
Production-path verification is:

```sh
SITE_URL=https://shanetarleton.com BASE_PATH=/ npm test
```

PowerShell users can set `$env:SITE_URL` and `$env:BASE_PATH` before running npm.
Restore prior environment values afterward.

See the [validation skill](../.github/skills/validate-site/SKILL.md) for coverage,
TypeScript checks, and manual/browser verification. No lint script or automated
real-browser suite is configured. Node VM behavior checks do not prove visual
quality or browser accessibility. Documentation-only work needs reference and
configuration checks, not an unrelated site rebuild.

## GitHub Pages

`.github/workflows/deploy.yml` triggers on `master` pushes or manual dispatch.
Its build job uses Node 22, `npm ci`, and `npm test` with production SITE_URL and
BASE_PATH. It uploads `dist/` and the deploy job publishes through GitHub's Pages
action. Preserve least-privilege build/deploy permissions and concurrency.

Production serves `https://shanetarleton.com/`, with repository Pages custom-domain
configuration and DNS maintained separately. Do not reset it to `/website/` in
production. The custom domain needs no repository CNAME file with this Actions
publishing mode. DNS/HTTPS changes require specific authorization and can take
time to propagate. Keep domain verification records in DNS.

Before any push, obtain documentation-agent readiness and explicit user
authorization. Follow the [release skill](../.github/skills/release-site/SKILL.md)
to stage scoped changes, identify the exact commit's run, and verify the live
result. A successful build or push alone is not deployment evidence.
