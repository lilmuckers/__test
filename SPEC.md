# SPEC.md

## Purpose

Define the current project scope for the single-page interactive boop app and act as the in-repo entrypoint into the fuller project definition.

## Project intent

- Keep the product as a single-page, comic-styled interactive toy.
- Make the crab substantially more expressive across the full boop range rather than using only a few coarse mood states.
- Simplify the primary screen so the character art is the star.
- Add one deliberately absurd secondary overlay that deepens the joke without turning the project into a multi-page app.

## Scope summary

- In scope:
  - One directly accessible single-page boop app
  - A dark-background comic-inspired visual presentation
  - A prominent wordmark or logo treatment reading `Boop the Crab!`
  - A large in-page SVG crab illustration as the primary focus of the screen
  - A visible `Boop` button and a visible `De-boop` button
  - A small `Why...?` button that opens an in-page overlay or modal
  - Richer crab-state variance tied directly to the boop count
  - Bounded, character-led SVG animation for special states such as sleep, high excitement, and related atmospheric cues
  - Local persistence of the boop count and the minimum state needed for deterministic restoration
  - Screen-reader support, keyboard accessibility, and high-contrast presentation
  - GitHub Pages release readiness for the repository subpath deployment target
- Out of scope / non-goals:
  - Multi-page navigation or route-based information architecture
  - Backend services, user accounts, analytics, or forms
  - Audio, physics simulation, or game-like progression systems
  - Long scrolling content outside the bounded overlay treatment
  - Unbounded lore expansion beyond the single overlay experience

## User flows

- A user opens the webpage and immediately sees the `Boop the Crab!` wordmark, the crab illustration, and the three buttons.
- A user presses `Boop` repeatedly and sees the crab become progressively more delighted as the count climbs.
- A user pushes the count above `1000` and sees the crab become animated and visibly jump with excitement.
- A user lands on a fresh zero state and sees a sleeping crab with animated `Z` markers.
- A user presses `De-boop` below zero and sees the crab become progressively more distressed, then dead, then rotten, then finally skeletal at the extreme threshold.
- A user presses `Why...?` and receives a comic, tongue-in-cheek but serious-toned philosophical overlay that can be dismissed without leaving the page.

## Usability requirements

- The primary interaction area must remain visible on initial load without requiring navigation.
- The default screen should stay visually simpler than the current implementation: logo, crab, and controls first.
- The page must remain readable and operable on standard desktop and mobile browser viewports.
- Primary buttons must be clearly labeled, keyboard accessible, touch accessible, and screen-reader accessible.
- The crab state and current boop meaning must be understandable to screen-reader users through semantic text or labels, not visual presentation alone.
- The overlay must trap neither focus nor scrolling incorrectly, must be dismissible, and must remain readable on mobile.
- The implementation should avoid unnecessary chrome outside the intentionally theatrical overlay.

## Design direction

- Keep the dark background as a firm product requirement.
- Shift the primary screen toward a comic-poster feel: bold title, large character art, minimal surrounding UI.
- The crab should stay vector-based and stylized rather than realistic.
- Emotional and physical progression should feel exaggerated and funny, with clear visual milestones across the count range.
- Zero is no longer neutral. On a fresh zero state the crab is asleep, with animated `Z` cues.
- Positive counts should escalate from mild delight into extreme celebration rather than flattening into one excited state.
- Counts above `1000` should feel special and visibly animated, including jumping excitement.
- Negative counts should degrade progressively from sadness into death, rot, and finally a skeletal scythe-wielding form only after the extreme threshold.
- The `Why...?` overlay should feel like an intentionally overcommitted comic manifesto in the same visual world, with vector illustrations of crabs being booped by vector hands.
- Humor should be dry, absurd, and played with a straight face.

## State model

- Counter starts at `0` on first visit when no prior local storage value exists.
- The current boop count must be stored in browser local storage and restored on reload.
- The app should persist the minimum local state needed to restore the same deterministic presentation after reload.
- `Boop` always adds `1`.
- `De-boop` always subtracts `1`.
- Fresh zero state renders a sleeping crab rather than a neutral awake crab.
- Positive counts use multiple increasing excitement tiers rather than a single excited state.
- Counts above `1000` enter a special animated jumping-excitement presentation.
- Counts below `0` use multiple worsening distress and decay tiers.
- Count `-300` is the explicit death threshold.
- Counts below `-300` should look progressively more rotten.
- By `-999` the crab should read as effectively an empty shell.
- Only counts below `-1000` should transition to the skeletal scythe-wielding crab.
- On reload, the app must restore the correct presentation for the persisted count, including threshold-specific animation and art states where relevant.

## Implementation direction

- Builder should keep the implementation static-site friendly and GitHub Pages compatible.
- Plain HTML, CSS, JavaScript, and inline SVG remain the preferred baseline unless Builder finds a compelling reason otherwise.
- Animation should stay lightweight and CSS/SVG-friendly rather than introducing heavyweight runtime dependencies.
- The simplified primary layout should not remove accessibility semantics just to achieve visual minimalism.

## Delivery slicing

The next requested evolution should be delivered through tightly bounded issues rather than one oversized ticket.

Planned issue decomposition:
1. Evolve the crab state ladder and simplify the primary comic layout
2. Add the `Why...?` overlay manifesto and illustrated modal treatment
3. Follow-up polish or bugfix slices as needed after QA review

Expected sequencing:
- The state-ladder/layout issue should land first because it changes the main product definition.
- The `Why...?` overlay should land second because it depends on the refreshed visual language.
- Any remaining polish should be split out rather than folded into the main redesign issue.

## Test strategy

- Required test types:
  - Executable local verification that the simplified screen shows the `Boop the Crab!` logo, crab art, and three buttons
  - Executable verification that fresh zero state renders the sleeping crab with animated `Z` cues
  - Executable verification that positive counts visibly escalate across multiple excitement tiers
  - Executable verification that counts above `1000` render the special animated jumping state
  - Executable verification that negative counts visibly worsen across multiple tiers
  - Executable verification that count `-300` renders the dead state
  - Executable verification that count `-999` renders an effectively empty-shell state
  - Executable verification that counts below `-1000` render the skeletal scythe-wielding state
  - Executable verification that persisted counts restore the correct tiered presentation after reload
  - Executable verification that the `Why...?` overlay opens, closes, remains keyboard accessible, and is readable on mobile and desktop
  - Executable verification that the overlay includes the comic manifesto copy and vector booped-crab imagery
- Coverage expectations:
  - At minimum, Builder must provide a reproducible verification path in the PR
  - If the chosen stack has a light automated path for interaction checks, Builder should add regression coverage for threshold transitions or modal open-close behavior where practical

## Acceptance criteria

- The main page presents a simplified comic-inspired layout with a visible `Boop the Crab!` logo or wordmark, the crab illustration, and the three controls.
- The primary screen removes non-essential supporting UI chrome while preserving accessibility semantics.
- A fresh first-load zero state shows a sleeping crab with animated `Z` markers.
- Positive boop counts visibly progress through more than one excitement tier.
- Counts above `1000` render a distinct animated jumping-excitement state.
- Negative counts visibly progress through worsening sadness and decay rather than jumping immediately to the skeletal death form.
- Count `-300` renders the explicit dead crab state.
- By `-999` the crab reads as an empty shell or equivalently extreme rotten-remains state.
- Only counts below `-1000` render the skeletal scythe-wielding crab.
- Reloading the page preserves the boop count from browser local storage and restores the correct tiered crab presentation for that count.
- The main controls and crab-state meaning remain available to screen readers through appropriate semantic markup or labels.
- The `Why...?` button opens an in-page overlay or modal rather than navigating away.
- The overlay contains a serious-toned but absurd philosophical treatise about the world-historical importance of booping the crab.
- The overlay includes vector illustrations of crabs being booped by vector hands and remains visually aligned with the main comic-dark theme.
- The overlay is keyboard accessible, dismissible, and usable on both desktop and mobile viewports.
- The implementation keeps the project as a single-page experience and does not introduce unrelated product surface area.
- A reviewer can build, run, and verify the page locally using documented README instructions.
- The released app remains compatible with the repository GitHub Pages deployment target and subpath-safe asset loading.

## Current delivery intent

- Current focus: spec the next evolution of the boop app around richer character progression, a simpler comic layout, and the `Why...?` overlay.
- Important constraints:
  - Keep the product single-page and joke-forward.
  - Prefer crisp visual thresholds over vague mood interpolation.
  - Preserve accessibility, persistence, and Pages compatibility while changing the presentation.
  - Avoid bloating the primary screen with explanatory copy.
- Success indicators:
  - Builder receives bounded issues with explicit thresholds and acceptance criteria.
  - QA can verify the major visual thresholds without guessing the intended art progression.
  - The refreshed app feels simpler on first glance but richer in character behavior.

## Authoritative wiki pages

- Product definition: not yet created
- Solution design: not yet created
- Architecture: not yet created
- Decision records / assumptions: this `SPEC.md` currently carries the active project-level assumptions for the current slice

## Notes

This file should stay concise.
Use the GitHub wiki as the authoritative home for deeper product, solution, architecture, and decision detail.
