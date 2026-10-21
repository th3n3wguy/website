# Agent workflow and local plans

## Roles

Repository profiles live in `.github/agents/`. Select them by name in supporting
Copilot surfaces; all roles read `.github/copilot-instructions.md`.

| Agent | Owns | Must not do |
| --- | --- | --- |
| planning | Scope, dependencies, delegation, acceptance decisions | File writes, shell execution, implementation |
| coding | Assigned Astro/TS/JS/CSS/content changes | Plan/docs ownership or publication |
| testing | Tests, fixtures, verification evidence | Application fixes or weakening checks |
| build-release | Assigned build/workflow changes and authorized publication | Bypass validation/docs gates or assume push permission |
| documentation | `.plans/`, tracked documentation, related README/instructions | Application/test/deployment implementation or push |

The planner has read/search/agent tools only. It supplies plan content to the
documentation agent rather than writing files itself. Other roles do not have
the agent tool; they return results to the coordinating session instead of
starting recursive delegation chains. Prompts bound edit/execute-capable roles
to their assigned responsibilities; these are not filesystem security controls.

## Lifecycle

1. Planning defines the change and delegates initial plan creation to
   documentation. One plan per change, including documentation/content changes.
2. Documentation creates `.plans/YYYY-MM-DD-short-change-name.md` using the
   change-plan skill template and confirms the path before implementation.
3. Planning delegates bounded tasks with explicit owners and dependencies.
   Workers report changes, evidence, gaps, and documentation implications;
   documentation maintains the plan.
4. After execution/validation and before any push, documentation checks the
   actual diff against the plan, promotes durable information into this
   directory, updates relevant entry points, and records each disposition.
5. Documentation reports readiness for that diff. Further changes require a
   renewed review. Build-release also requires user authorization and passing
   relevant checks before commit/push; record release evidence for plan closure.
6. Without release authorization, leave the local plan ready, not released.

The `.plans/` directory is ignored at the repository root; never force-add it.
`documentation/` remains tracked. Do not archive raw plans in documentation:
preserve decisions and ongoing maintenance knowledge, not transient logs.
This gate is an agent workflow, not an installed hook or a CI check.

## Portability and limitations

Profiles use shared `name`, `description`, and tool aliases with no fixed model,
target restriction, IDE-only handoffs, or custom MCP requirements. Skills live
in `.github/skills/<name>/SKILL.md`. GitHub.com, CLI, VS Code, and JetBrains
support varies with the product/version and enabled tools.

Where native skill loading is unavailable, read the relevant SKILL.md directly.
Where delegation is unavailable, the planner produces named handoffs and stops
for the user to switch agents; it must not implement changes itself. Local
ignored plans do not sync across machines or cloud jobs. Documentation must
recreate local state from a factual handoff/task context in a new checkout,
never commit the plan to transport it. Do not claim automatic enforcement or
identical orchestration across all interfaces.

## Skills

- [change-plan](../.github/skills/change-plan/SKILL.md): create/update plans and
  promote durable documentation before push.
- [site-change](../.github/skills/site-change/SKILL.md): pages, responsive design,
  content, profile updates, and shared behavior.
- [validate-site](../.github/skills/validate-site/SKILL.md): builds and output/
  interaction checks in both base modes.
- [release-site](../.github/skills/release-site/SKILL.md): authorized publication
  and live verification.
