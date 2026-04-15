# Decision Record: DR-001-boop-app-comic-escalation

## Date

2026-04-15

## Decision

- Treat the requested change as a project-level evolution of the product, not a minor polish pass.
- Simplify the primary screen to a comic-poster style centered on `Boop the Crab!`, the crab illustration, and compact controls.
- Replace the coarse crab mood model with an explicit threshold ladder, including these required milestones:
  - zero renders sleeping with animated `Z` cues
  - high positive counts escalate visually
  - counts above `1000` enter a special animated jumping state
  - count `-300` is the explicit death threshold
  - by `-999` the crab reads as an empty shell or equivalent extreme rotten-remains state
  - only counts below `-1000` render the skeletal scythe-wielding crab
- Deliver the new direction in two bounded issues rather than one oversized implementation ticket:
  - main screen redesign plus crab-state ladder
  - `Why...?` overlay and illustrated manifesto

## Rationale

The request materially changes product tone, presentation, and acceptance expectations. Keeping the old definition would force Builder and QA to guess whether this is a mild visual polish pass or a new product direction. A durable decision is needed because the simplified main screen, expanded threshold ladder, and optional manifesto overlay all change what "done" means.

The chosen direction keeps the product single-page and static-hosting friendly while making the crab itself more expressive and memorable. Splitting the work into two issues keeps the main-screen redesign from getting tangled up with the long-form overlay content.

## Alternatives Rejected

- Keep the current coarse mood model and only tweak the illustration slightly.
- Put the manifesto copy directly on the main screen instead of in an overlay.
- Turn the manifesto into a separate page or route.

## Constraints Applied

- Preserve keyboard accessibility, screen-reader semantics, and deterministic reload behavior.
- Keep the project compatible with repository-subpath GitHub Pages hosting.
- Use lightweight static-site-friendly techniques for animation and vector illustration.
- Keep the primary screen visually simpler even while the character behavior becomes richer.

## Source Pointers

- `SPEC.md`
- GitHub issue #1
- GitHub issue #13
- GitHub issue #14
