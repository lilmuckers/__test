# Task Ledger

This ledger is the Orchestrator's durable record of in-flight delegated work.
It is the sole persistence mechanism for task state across agent sessions.

## Operating Rules

- Each task entry must use a level-2 heading in the form `## Task <task-id> - <title>`.
- Each task entry must contain exactly one fenced `json` block.
- The JSON payload is the machine-updatable source of truth for task state.
- Human notes belong outside the JSON block only when they add context the payload does not carry.

## Required JSON Fields

- `task`
- `state`
- `current_action`
- `next_action`
- `history`

## Optional Operational Fields

- `owner` — the named agent currently accountable for the task
- `branch` — active implementation branch (set by Orchestrator when Builder starts)
- `pr` — GitHub PR number or URL (set when Builder raises the PR)
- `expected_callback_at` — ISO-8601 timestamp used by the OpenClaw watchdog cron to detect overdue callbacks

## Allowed States

- `queued`
- `in_progress`
- `blocked`
- `needs_review`
- `done`

## Entry Template

```

## Task TASK-ID - Short title

```json
{
  "task": "TASK-ID",
  "state": "queued",
  "current_action": "Describe what is happening now",
  "next_action": "Describe the next expected transition",
  "owner": "orchestrator-<project>",
  "branch": null,
  "pr": null,
  "expected_callback_at": null,
  "history": [
    {
      "at": "2026-01-01T00:00:00Z",
      "action": "Task created",
      "by": "orchestrator-<project>"
    }
  ]
}
```
```
## Task boop-webpage-spec - Minimal boop webpage spec-first definition

```json
{
  "task": "boop-webpage-spec",
  "state": "done",
  "current_action": "PR #7 merged and issue #2 closed",
  "next_action": "Proceed to the next ready implementation slice on issue #3",
  "owner": "orchestrator-lapwing",
  "branch": "feat/issue-2-boop-core-shell",
  "pr": "https://github.com/lilmuckers/__test/pull/7",
  "history": [
    {
      "at": "2026-04-12T21:12:57Z",
      "action": "Started strict spec-first workflow and prepared spec handoff",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-12T21:13:20Z",
      "action": "Named-agent dispatch failed; workflow blocked pending operator intervention",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T10:00:00Z",
      "action": "Spec session resumed and refined the single-page boop crab app definition",
      "by": "spec-lapwing"
    },
    {
      "at": "2026-04-13T11:54:00Z",
      "action": "Created umbrella issue #1, implementation issues #2-#5, and release tracker #6; spec package ready for Builder routing",
      "by": "spec-lapwing"
    },
    {
      "at": "2026-04-13T10:58:17Z",
      "action": "Stopped before Builder because issue #2 failed readiness validation",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T15:11:11Z",
      "action": "Issue #2 validated ready; preparing Builder dispatch for first implementation slice",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T16:40:36Z",
      "action": "Re-dispatched Builder for issue #2 after prompt correction",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T16:46:00Z",
      "action": "Builder reported PR #7 on branch feat/issue-2-boop-core-shell and requested review",
      "by": "builder-lapwing"
    },
    {
      "at": "2026-04-13T16:46:30Z",
      "action": "Recorded Builder PR details and routed PR #7 to QA review",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T19:33:09Z",
      "action": "Re-dispatched QA for PR #7 review",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T19:37:45Z",
      "action": "QA approved PR #7 and routed to Spec for mergeability review",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T19:40:06Z",
      "action": "Applied orchestrator-approved to PR #7",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T21:42:46Z",
      "action": "Merged PR #7 as 6f39dee0d7403777c5d90f2179c496edc3b42837 and confirmed issue #2 closed",
      "by": "orchestrator-lapwing"
    }
  ]
}
```
## Task boop-webpage-issue-3 - Add SVG crab states and visual design

```json
{
  "task": "boop-webpage-issue-3",
  "state": "done",
  "current_action": "PR #8 merged and issue #3 is being closed",
  "next_action": "Proceed to issue #4 for persistence, accessibility, and mobile support",
  "owner": "orchestrator-lapwing",
  "branch": "feat/issue-3-svg-crab-states",
  "pr": "https://github.com/lilmuckers/__test/pull/8",
  "expected_callback_at": null,
  "history": [
    {
      "at": "2026-04-13T21:44:30Z",
      "action": "Selected issue #3 as the next ready-for-build slice after merging PR #7",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T21:46:00Z",
      "action": "Dispatched Builder for issue #3 with a new-branch, new-PR handoff packet",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T21:50:00Z",
      "action": "Builder reported PR #8 on branch feat/issue-3-svg-crab-states and requested review",
      "by": "builder-lapwing"
    },
    {
      "at": "2026-04-13T21:52:00Z",
      "action": "QA reported review blocked because its local checkout was on pr-7 instead of main",
      "by": "qa-lapwing"
    },
    {
      "at": "2026-04-13T21:53:00Z",
      "action": "Repaired QA workspace checkout back to main, synced to 4300d86, and prepared QA retry for PR #8",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-13T21:56:00Z",
      "action": "QA approved PR #8, posted a visible review summary, and applied qa-approved",
      "by": "qa-lapwing"
    },
    {
      "at": "2026-04-13T22:00:00Z",
      "action": "Spec approved PR #8, posted a visible review summary, and applied spec-satisfied",
      "by": "spec-lapwing"
    },
    {
      "at": "2026-04-13T22:02:00Z",
      "action": "Applied orchestrator-approved, cleared draft state, and confirmed merge gate success for PR #8",
      "by": "orchestrator-lapwing"
    }
  ]
}
```
## Task boop-webpage-issue-4 - Add persistence, accessibility, and mobile support

```json
{
  "task": "boop-webpage-issue-4",
  "state": "done",
  "current_action": "PR #9 merged as 1442cbe and issue #4 closed",
  "next_action": "Proceed to issue #5 for GitHub Pages release readiness",
  "owner": "orchestrator-lapwing",
  "branch": null,
  "pr": null,
  "expected_callback_at": "2026-04-15T00:10:00Z",
  "history": [
    {
      "at": "2026-04-13T22:03:00Z",
      "action": "Selected issue #4 as the next ready-for-build slice after merging PR #8",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:22:00Z",
      "action": "Reset task to in_progress to unblock it after the erroneous watchdog blocked status.",
      "by": "Sable"
    },
    {
      "at": "2026-04-14T22:35:00Z",
      "action": "Reset task back to the status it was before it was blocked in order to retest the cron trigger properly.",
      "by": "Patrick"
    },
    {
      "at": "2026-04-14T22:38:53Z",
      "action": "Watchdog classified task as stalled, sent named-agent nudge, and extended expected callback by 30 minutes",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:42:18Z",
      "action": "Builder callback reported FAILED with no visible implementation artifacts; re-dispatched Builder for a clean retry from current main",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:44:03Z",
      "action": "Second Builder callback reported FAILED with no visible implementation artifacts; task escalated to blocked to avoid blind redispatch loops",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:49:42Z",
      "action": "Builder reported NEEDS_REVIEW with draft PR #9 on branch feat/issue-4-persistence-a11y-mobile; routed to QA",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:55:36Z",
      "action": "QA approved PR #9, posted visible review artifacts, and applied qa-approved; routed to Spec for mergeability review",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:58:17Z",
      "action": "Spec approved PR #9, applied spec-satisfied, and confirmed mergeability in project context",
      "by": "orchestrator-lapwing"
    },
    {
      "at": "2026-04-14T22:59:33Z",
      "action": "Merged PR #9, synced repo to 1442cbe, and confirmed issue #4 closed",
      "by": "orchestrator-lapwing"
    }
  ]
}
```
## Task boop-webpage-issue-5 - Prepare GitHub Pages release readiness for the boop app

```json
{
  "task": "boop-webpage-issue-5",
  "state": "in_progress",
  "current_action": "Selected issue #5 as the next ready-for-build slice after merging PR #9",
  "next_action": "Await builder-lapwing callback with draft PR or blocker for issue #5",
  "owner": "builder-lapwing",
  "expected_callback_at": "2026-04-15T00:35:00Z",
  "history": [
    {
      "at": "2026-04-14T22:59:33Z",
      "action": "Issue #5 validated ready and dispatched to Builder as the next slice after issue #4",
      "by": "orchestrator-lapwing"
    }
  ]
}
```
