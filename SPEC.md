# SPEC.md

## Purpose

Define the minimum viable scope for a single-page interactive boop app and act as the in-repo entrypoint into the fuller project definition.

## Project intent

- Provide the smallest useful user-facing webpage in this repo that still exercises meaningful end-to-end delivery.
- Give Builder an unambiguous first implementation target with visible interaction, state changes, and presentational character design.
- Establish a strict spec-first baseline before any implementation PR is opened.

## Scope summary

- In scope:
  - One directly accessible single-page boop app
  - A dark-background layout with a clearly intentional visual design rather than an unstyled placeholder page
  - A simple vector-designed crab character rendered in-page as SVG
  - A visible boop counter
  - A `Boop` button that increments the counter by 1
  - A `De-boop` button that decrements the counter by 1
  - Crab expression/state changes tied directly to boop count state
  - Local persistence of the boop count using browser local storage
  - Screen-reader support with a high-contrast accessible presentation, including an orange crab against the dark background
  - Basic page metadata, including a meaningful document title
  - Minimal supporting copy only if needed to make the interaction legible
  - Release readiness that includes a deployable GitHub Pages output for the project repository
- Out of scope / non-goals:
  - Authentication, APIs, forms, analytics, or routing beyond the single page
  - Multi-page navigation, user accounts, or back-end services
  - Audio, physics, complex animation systems, or elaborate game mechanics
  - SEO, telemetry, cookies, or release automation beyond normal repo checks

## User Flows

- A user opens the webpage and immediately sees the crab, the current boop count, and the two primary actions.
- A user presses `Boop` and sees the count increase by 1 while the crab looks excited.
- A user presses `De-boop` and sees the count decrease by 1 while the crab looks sad, unless the total has gone negative.
- A user drives the count below zero and sees the crab transform into a skeletal death-like version holding a scythe.

## Usability Requirements

- The primary interaction area must be visible on initial load without requiring navigation.
- The page must remain readable on standard desktop and mobile browser viewports.
- The boop count must always be visually clear and easy to find.
- Both primary buttons must be clearly labeled, keyboard accessible, and screen-reader accessible.
- The crab state and current count must be understandable to screen-reader users through appropriate semantic text or labels, not visual presentation alone.
- The layout and controls must remain usable at mobile touch sizes as well as desktop scales.
- Mobile support baseline is iPhone X class width and height as the lower-bound target for this first slice.
- The implementation should avoid unnecessary UI chrome for this first slice.

## Design Direction

- Keep the page intentionally minimal, but visibly designed.
- Use a dark background as a firm product requirement.
- The crab should be implemented as simple SVG artwork and should be charming rather than highly detailed.
- The live crab should read clearly as orange against the dark background with strong visual contrast.
- On first load with a zero count and no prior interaction history, the crab should appear neutral.
- The emotional state changes should be obvious at a glance and must be derived from boop-count state in a deterministic way that survives reload.
- Negative total: skeletal death-crab holding a scythe.
- Visual transitions between crab states may be lightly animated, but should remain simple and non-essential to understanding the state.
- Styling may be playful, but should stay clean and bounded to this single-screen experience.

## State Model

- Counter starts at `0` on first visit when no prior local storage value exists.
- The current boop count must be stored in browser local storage and restored on reload.
- The app should persist only the minimum local state needed to restore the same mood on reload as the user last saw for the current count state.
- `Boop` always adds `1`.
- `De-boop` always subtracts `1`.
- Mood must remain linked to boop-count state and the latest user interaction so the same visible mood is restored after reload.
- On first load with no prior interaction history and a zero count, the crab renders neutral.
- When the current count is below `0`, the crab must render in its skeletal scythe-holding death form regardless of the latest action.
- When the current count is `0` or greater and the latest action was `Boop`, the crab renders excited.
- When the current count is `0` or greater and the latest action was `De-boop`, the crab renders sad.
- On reload, the app must restore the same mood the user last saw for the persisted count rather than recomputing a different non-death default.

## Implementation Direction

- Builder should prefer the lightest viable static-compatible stack that makes GitHub Pages deployment straightforward.
- The stack should avoid unnecessary framework complexity for this first slice.
- My current recommendation is a minimal static site implementation using plain HTML, CSS, JavaScript, and inline SVG unless Builder finds a compelling repo-local reason to choose otherwise.

## Delivery Slicing

The implementation should be delivered through tightly bounded issues rather than one oversized build ticket.

Planned issue decomposition:
1. Core app shell and counter interactions
2. SVG crab states and visual design
3. Persistence, accessibility, and mobile support
4. GitHub Pages release readiness and repository-path deployment validation
5. Release tracking for `v0.1.0`

Expected sequencing:
- Issue 1 establishes the working app shell and button mechanics.
- Issue 2 adds the crab artwork and visual state presentations.
- Issue 3 adds durable state restoration and quality requirements.
- Issue 4 makes the app release-ready from the repository GitHub Pages subpath.
- The release-tracking issue coordinates final verification and publication state.

## Test Strategy

- Required test types:
  - Executable local verification that the page renders and shows the crab, controls, and boop count
  - Executable local verification that `Boop` increments by 1 and changes the crab to excited
  - Executable local verification that `De-boop` decrements by 1 and changes the crab to sad when count remains non-negative
  - Executable local verification that a negative count changes the crab into the skeletal scythe-holding form
  - Executable local verification that the count persists across reloads via local storage
  - Executable local verification that the same crab mood is restored on reload for neutral, non-negative, and negative cases
  - Executable local verification that the page remains usable on an iPhone X baseline viewport and on a standard desktop viewport
  - Executable local verification that screen-reader-relevant semantics and visible contrast expectations are met
  - Automated test coverage if the chosen stack has a lightweight default path for interaction testing
- Tooling:
  - Use the repo's existing or newly introduced minimal frontend tooling as justified by Builder
- Coverage expectations:
  - At minimum, Builder must provide a reproducible verification path in the PR

## Acceptance Criteria

- A single webpage exists in the repo and is the only user-facing scope introduced for this task.
- Loading the page shows a dark-background boop app with a visible orange SVG crab character, visible boop count, and both `Boop` and `De-boop` buttons without requiring user interaction.
- Pressing `Boop` increases the displayed count by exactly 1 and changes the crab to an excited presentation.
- Pressing `De-boop` decreases the displayed count by exactly 1 and changes the crab to a sad presentation whenever the resulting count is still `0` or greater.
- If the displayed count becomes negative, the crab changes into a skeletal death-like form holding a scythe.
- Reloading the page preserves the boop count from browser local storage.
- Reloading the page restores the same visible mood the user last saw for the persisted state, including immediate death-crab rendering for negative persisted counts and neutral rendering for a fresh zero-state first visit.
- State changes may use light visual transitions, but the page must remain understandable without relying on animation.
- The page remains usable and readable on both desktop viewport sizes and an iPhone X baseline mobile viewport.
- Buttons, count, and crab-state meaning are available to screen readers through appropriate semantic markup or labels.
- The page uses strong visual contrast, including an orange live crab against the dark background.
- The page includes a meaningful document title, not an empty or placeholder title.
- The implementation keeps scope minimal and does not introduce unrelated product surface area.
- A reviewer can build, run, and verify the page locally using documented README instructions.
- The released app is published as the root index page for the `__test` repository GitHub Pages site and works correctly at `https://lilmuckers.github.io/__test/` or equivalent repository-path hosting such as `https://patrick-mckinley.com/__test/`.
- All app asset and navigation paths required for this single-page experience work correctly as relative paths from the repository GitHub Pages subpath.
- Once the release is treated as proper/released, release verification must include checking the live GitHub Pages URL and confirming it loads and works.

## Current delivery intent

- Current focus: define a build-ready first slice for a single-page boop app with expressive state changes and a GitHub Pages release target
- Important constraints:
  - Spec-first only, no implementation in this phase
  - Builder must open the implementation PR
  - Avoid duplicate implementation PRs
  - Release readiness includes whatever minimal deployment configuration is required for the repository's GitHub Pages location
  - The release artifact must function from the repository Pages subpath rather than assuming site-root hosting
- Success indicators:
  - Builder receives one clear issue or equivalent visible artifact with bounded scope and testable acceptance criteria
  - QA can verify all visual state changes without needing hidden implementation knowledge
  - Release Manager can point to a live GitHub Pages URL as the release artifact and verify it loads correctly

## Authoritative wiki pages

- Product definition: not yet created
- Solution design: not yet created
- Architecture: not yet created
- Decision records / assumptions: this `SPEC.md` currently carries the minimal project-level assumptions for the first slice

## Notes

This file should stay concise.
Use the GitHub wiki as the authoritative home for deeper product, solution, architecture, and decision detail.
