# lapwing

A tiny static boop app that currently implements the core shell, counter interactions, SVG crab state visuals, local persistence, accessibility semantics, and a tighter mobile layout.

## Build

No asset build step is required. Release readiness for this slice is handled by the GitHub Pages deployment workflow in `.github/workflows/deploy-pages.yml`, which publishes the static repository root on pushes to `main`.

## Run

From the repository root, you can use either of these local run paths:

```bash
python3 -m http.server 4173
```

for standard root-path verification, or:

```bash
python3 scripts/serve-pages-subpath.py
```

for repository-subpath verification that mirrors GitHub Pages hosting at `/__test/`.

Then open `http://127.0.0.1:4173/` for the root-path check or `http://127.0.0.1:4173/__test/` for the GitHub Pages style subpath check.

## Verify

1. Load the page at `http://127.0.0.1:4173/` and confirm the dark app shell renders with a visible orange SVG crab, the count, and `Boop` / `De-boop` buttons.
2. Start `python3 scripts/serve-pages-subpath.py`, then load `http://127.0.0.1:4173/__test/` and confirm the app still works from the repository-subpath-style URL.
3. Confirm the stylesheet and script load correctly from both URLs, which verifies the app is using subpath-safe relative asset references.
4. Confirm the fresh first-load zero state shows the neutral crab.
5. Press `Boop` and confirm the displayed count increases by exactly 1 and the crab changes to an excited state.
6. Press `De-boop` while the count remains non-negative and confirm the displayed count decreases by exactly 1 and the crab changes to a sad state.
7. Reload the page and confirm the boop count and the same visible crab mood are restored from local storage.
8. Confirm a fresh first visit with cleared local storage restores a neutral crab at count `0`.
9. Press `De-boop` until the count becomes negative, reload, and confirm the skeletal scythe-holding death form returns immediately.
10. Confirm the count summary and crab-state meaning are announced to assistive technology through the visible semantic copy and live regions.
11. Confirm the layout stays usable at an iPhone X sized viewport and on desktop.
12. After release, verify the live GitHub Pages URL `https://lilmuckers.github.io/__test/` and confirm the published app loads and works there.
13. Confirm the browser tab title is `Boop Crab Counter`.

## Specification

See `SPEC.md` for the broader project specification and delivery plan.
