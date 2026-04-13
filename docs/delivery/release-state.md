# Release State

Use this file as the durable release-status record for the current planned release.
Update it whenever Release Manager changes the active version, stage, blocking issues, or next action.

## Current Release

```json
{
  "version": "v0.1.0",
  "stage": "planning",
  "status": "in_progress",
  "tracking_issue": "#6",
  "beta_iteration": 0,
  "rc_iteration": 0,
  "target_date": null,
  "updated_at": "2026-04-13T11:54:00Z",
  "updated_by": "spec-lapwing"
}
```

## Blocking Issues

- #2 Build boop app core shell and counter interactions
- #3 Add SVG crab states and visual design
- #4 Add persistence, accessibility, and mobile support
- #5 Prepare GitHub Pages release readiness for the boop app

## Next Action

- Orchestrator should route the bounded implementation issues to Builder and keep #6 as the release coordination umbrella.

## Notes

- Release artifact target is the repository GitHub Pages URL for `__test`.
- Final release verification must include checking the live GitHub Pages URL and confirming it loads and works.
