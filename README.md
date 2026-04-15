# lapwing

A tiny static boop app that now presents a comic-inspired `Boop the Crab!` layout, threshold-driven crab progression, local persistence, accessibility semantics, and GitHub Pages-friendly subpath support.

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

1. Load the page at `http://127.0.0.1:4173/` and confirm the comic-style `Boop the Crab!` layout renders with the wordmark, crab art, count, and `Boop` / `De-boop` buttons.
2. Start `python3 scripts/serve-pages-subpath.py`, then load `http://127.0.0.1:4173/__test/` and confirm the app still works from the repository-subpath-style URL.
3. Confirm the stylesheet and script load correctly from both URLs, which verifies the app is using subpath-safe relative asset references.
4. Clear local storage and confirm the fresh zero state shows a sleeping crab with animated `Z` cues.
5. Verify representative positive tiers: `1` shows a perked-up crab, `10` shows a more thrilled crab, `100` shows a more ecstatic crab, and counts above `1000` show the animated jumping-excitement state.
6. Verify representative negative tiers: `-1` shows a glum crab, `-100` shows a decaying crab, `-300` shows the explicit dead crab state, `-999` shows the empty-shell state, and only counts below `-1000` show the skeletal scythe crab.
7. Reload the page after representative threshold values and confirm the correct threshold-based crab presentation is restored from local storage.
8. Confirm the count summary and crab-state meaning are announced to assistive technology through the visible semantic copy and live regions.
9. Confirm the layout stays usable at an iPhone X sized viewport and on desktop.
10. After release, verify the live GitHub Pages URL `https://lilmuckers.github.io/__test/` and confirm the published app loads and works there.
11. Confirm the browser tab title is `Boop the Crab!`.

## Specification

See `SPEC.md` for the broader project specification and delivery plan.
