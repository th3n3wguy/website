---
name: release-site
description: Publish an authorized, validated, documentation-reviewed change through the existing GitHub Pages workflow and verify the live result.
---

# Release the site

Read `documentation/operations.md`. Never infer push authorization.

1. Require explicit user authorization for commit/push, completed acceptance
   criteria, relevant validation evidence, and documentation-agent readiness for
   the current diff. If any are absent, stop and report the missing gate.
2. Inspect `git status --short` and the full intended diff, including new files.
   Confirm `.plans/` is ignored and not tracked; exclude private inputs,
   `node_modules/`, `.astro/`, and `dist/`. Review dependency lock consistency
   if manifests changed.
3. Stage only the intended reviewed paths (not an indiscriminate `git add -A`
   in a shared/dirty worktree). Inspect `git diff --cached`. With authorization,
   commit with an accurate message and, unless the user opts out, trailer:

   ```text
   Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
   ```

4. Verify branch/remote and publish only the authorized branch. The current
   production workflow triggers on `master`; pushing there deploys the site.
   Do not force-push, change branch protection, or alter Pages/DNS without
   separate authorization.
5. Use `gh run list --workflow deploy.yml --limit 5 --json databaseId,headSha,status,conclusion,url`
   and match the pushed commit. Then use
   `gh run watch <run-id> --exit-status --interval 10`.
   On failure inspect that run's logs, report the actual cause, and route fixes
   through planning rather than bypass tests or documentation review.
6. Check the changed public page and referenced assets at
   `https://shanetarleton.com/`, including expected content/behavior. For domain
   work, verify certificate/HTTPS and redirects. A queued run or successful push
   is not proof of publication; state CDN/certificate delays honestly.
7. Return commit, run URL, live evidence, and remaining issues to planning and
   documentation for local-plan closure. Do not add release-only changes that
   would themselves bypass the pre-push documentation gate.
