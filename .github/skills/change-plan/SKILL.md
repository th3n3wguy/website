---
name: change-plan
description: Create and maintain a local change plan through delegated documentation ownership, then promote durable knowledge before any push.
---

# Change plan lifecycle

Use for every change, including documentation-only and content work.
Read `.github/copilot-instructions.md` from the repository root.
The workflow reference is `documentation/agent-workflow.md` from repository root.

## Define and create

1. The planning agent reads relevant code/docs and defines scope, explicit
   exclusions, acceptance criteria, tasks, owners, dependencies, and validation.
2. It delegates plan creation to documentation, supplying that information.
   Documentation copies the structure in `plan-template.md` into
   `.plans/YYYY-MM-DD-short-change-name.md` (use a unique suffix for collisions).
   Only `.plans/` is ignored; `documentation/` must remain tracked.
3. Documentation confirms the plan exists and returns its path. Planning then
   delegates implementation. If delegation is unavailable, stop for a
   user-mediated handoff; the read-only planner must not write the plan itself.

## Execute and maintain

Workers read the plan, stay within assigned file ownership, and return changed
files, outcomes, commands/results, blockers, and documentation implications.
Documentation updates plan state from evidence. Do not mark unchecked tasks
complete or treat assumptions as approval. New scope requires planner review.
Never put private inputs or credentials in plans even though they are ignored.

## Pre-push documentation gate

1. After implementation and validation, planning delegates documentation review.
2. Documentation compares the actual diff with the plan and checks worker
   evidence. Move durable knowledge into `documentation/architecture.md`,
   `documentation/operations.md`, `documentation/agent-workflow.md`, or a focused
   new document linked by `documentation/README.md`.
3. Update related README/instructions as needed; record each disposition in the
   plan. Keep task checklists, raw logs, and transient investigation notes local.
4. Confirm the plan is ignored (`git check-ignore <plan-path>`) and untracked
   (`git ls-files .plans` should list nothing). Review documentation references.
5. Report "documentation ready" for the reviewed diff, or the exact blockers.
   Build-release must not push without readiness and user authorization.
   Re-review any subsequent behavior or documentation changes.
6. After release, record commit/run/live evidence and close the plan. If release
   is not authorized, leave it ready and state that it has not been published.

These are agent procedures, not a mechanical Git push restriction. Do not claim
CI or hooks enforce the gate. In a fresh checkout, documentation creates a new
local plan from the user/task context because ignored plans do not sync.
