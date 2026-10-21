# Repository maintenance instructions

Read `documentation/README.md` and the relevant architecture, workflow, and
operations pages before changing this repository. These tracked documents are
the durable source of contributor knowledge; `.plans/` is local task state.

## Responsibilities and change lifecycle

- Use `.github/agents/planning.agent.md` to coordinate each change. The planner
  is a project manager only: no code, tests, documentation edits, or shell
  execution. It delegates plan writes to the documentation agent.
- Every change, including content, configuration, and documentation-only work,
  needs a plan in `.plans/` before implementation. Follow
  `.github/skills/change-plan/SKILL.md`. If invoked directly, an implementation
  agent must obtain a planner handoff and a documentation-created plan first.
- Delegate coding, testing, release, and documentation work to their respective
  agents. Keep handoffs bounded, with file ownership, dependencies, acceptance
  criteria, and a stop condition. Do not let agents edit the same files in
  parallel. Return failures to the planner rather than silently broadening scope.
- Before any push, the documentation agent must review the completed plan and
  actual diff, move durable decisions/procedures into `documentation/`, update
  relevant README/instructions, and explicitly report documentation readiness.
  Record validation evidence and unresolved issues in the plan.
- Plans are ignored, not committed or published. Never force-add them. Keep
  `documentation/` tracked. Do not copy entire plans or private source exports
  into tracked documentation.
- Commit/push/deploy only when authorized by the user. Documentation readiness
  is a workflow gate, not an installed Git hook or a CI-enforced restriction.
  A user asking for implementation does not automatically authorize a push.
- If delegation or skill discovery is unavailable on a Copilot surface, read
  the skill file directly and use explicit user-mediated handoffs. The planner
  must stop rather than doing another agent's work. Never claim tools or agents
  ran when they did not. Ignored plans do not travel between cloud sessions or
  checkouts; recreate a local plan through the documentation agent when needed.

## Code and design invariants

- Stack: Astro static output, TypeScript, ESM JavaScript, semantic HTML, plain
  CSS, Markdown content collections/Zod, RSS/sitemap, Node tests, GitHub Actions.
  Do not reintroduce Vue, a server runtime, or a UI framework without approval.
- Preserve the minimal, responsive design, CSS theme tokens, accessible labels,
  keyboard focus, skip link, one H1, alt text, and no-JavaScript article reading.
- Dark is the default. Light/dark preferences persist in local storage; blocked
  storage must not break toggling and persistence failures must be reported.
- Use `path()` in `src/lib/site.ts` for site links. Preserve trailing slashes and
  both deployment modes: local `/website/` and production custom-domain `/`.
  Derive canonical, RSS, and sitemap URLs from the configured site/base.
- External HTTP(S) links open a new tab with `noopener noreferrer`; internal
  links stay in the current tab. Reuse `src/middleware.ts`, including for
  Markdown output, instead of duplicating per-page or client-side link handling.
- Use `getPosts()` for published content. Preserve draft exclusion, UTC date
  formatting, stable published slugs, metadata, RSS, and sitemap membership.
- Do not invent personal claims or publish confidential employer information.
  Profile/project details need user-approved or public sources. Do not commit
  private drafts, account exports, credentials, or contact information from them.
- Make surgical changes, preserve unrelated work, use existing helpers, and
  update directly affected tests/docs. Do not weaken assertions to hide defects.
  Keep proper types and explicit errors; avoid broad catches or silent fallbacks.
- Use existing package scripts. Do not hand-edit lockfiles or generated `dist/`
  and `.astro/`. Install dependencies only after manifest changes or a verified
  missing-dependency failure. There is no configured lint command.

## Repeatable procedures

Read the applicable skill before execution:

- Planning and documentation gates: `.github/skills/change-plan/SKILL.md`
- Site/content/UI work: `.github/skills/site-change/SKILL.md`
- Build and behavioral validation: `.github/skills/validate-site/SKILL.md`
- Authorized publication: `.github/skills/release-site/SKILL.md`
