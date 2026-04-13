# lapwing

A tiny static boop app that currently implements the core shell, counter interactions, and SVG crab state visuals.

## Build

No build step is required for the current implementation. The app is a static HTML, CSS, and JavaScript page.

## Run

From the repository root, serve the files with any simple static server. For example:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/` in a browser.

## Verify

1. Load the page and confirm the dark app shell renders with a visible orange SVG crab, the count, and `Boop` / `De-boop` buttons.
2. Confirm the fresh first-load zero state shows the neutral crab.
3. Press `Boop` and confirm the displayed count increases by exactly 1 and the crab changes to an excited state.
4. Press `De-boop` while the count remains non-negative and confirm the displayed count decreases by exactly 1 and the crab changes to a sad state.
5. Press `De-boop` until the count becomes negative and confirm the crab changes to the skeletal scythe-holding death form.
6. Confirm the browser tab title is `Boop Crab Counter`.

## Specification

See `SPEC.md` for the broader project specification and delivery plan.
