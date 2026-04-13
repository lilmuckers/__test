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
  "state": "needs_review",
  "current_action": "QA approved PR #7 for issue #2; awaiting Spec mergeability review",
  "next_action": "Await explicit Spec callback on PR #7, then decide whether to apply orchestrator approval",
  "owner": "spec-lapwing",
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
    }
  ]
}
```
