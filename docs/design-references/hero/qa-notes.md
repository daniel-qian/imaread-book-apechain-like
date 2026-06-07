# Hero Carousel — Visual QA Notes

> Generated 2026-06-07 after dev server first load at http://localhost:3001.

## What works

- ✅ Page renders at /, title "APECHAIN — Clone"
- ✅ Hero section is 1 svh (633px @ 1280×633 viewport), 12-col grid
- ✅ Auto-advance cycles through 5 items every 5s (verified: OTHERSIDE → APECHURCH → ...)
- ✅ Active tab shows progress bar growing 0 → 1 (`scaleX(0.3871)` captured mid-cycle)
- ✅ Inactive tabs have darkened thumbnails (opacity 50%)
- ✅ LAUNCH button + SEE ALL APPS link render with correct mono-uppercase type
- ✅ OTHERSIDE / OPENSEA / SLAB CASH / etc. h2 renders in Boldonse (clean geometric display, close to Manuka)
- ✅ HOT badge has orange background + flame icon
- ✅ Right-side round buttons (PAUSE / SKIP) are visible, render with gradient stroke (faint)
- ✅ Hero image (CTF CDN URL) loads and covers the right half
- ✅ Gradient sphere background visible behind text (radial + conic shimmer)

## Known gaps (vs. original)

- **3D WebGL background** replaced with CSS gradient + conic shimmer. Loses parallax, drag interaction, and reflective sphere look. Acceptable per scope.
- **Round buttons** gradient stroke is very faint — only the upper-left corner shows. Original used inline SVG with linearGradient stops. Improvement: replace `border-image` with an SVG mask or a `bg-clip` with gradient.
- **Text stack** sits at the very bottom of the section (items-end). Original places it more centered/upper-middle. May be the result of `items-end` overriding the intended mid-placement.
- **Image right-half** is bottom-aligned in its column instead of overflowing the section (the original's `overflow-visible` lets it bleed upward into the next section). Current layout keeps it inside the section.
- **Top navigation** is NOT included in this hero component. It's a separate component that lives above the main `<main>`. To be added in a future worktree.
- **Auto-advance progress bar** is very thin (0.5px = h-0.5) and may be hard to see. Original was more visible. Bump to h-1 or h-1.5.

## Next worktrees (in order)

1. `feature/top-nav` — fixed top nav with logo + 4 menu links + mobile hamburger
2. `feature/spotlight` — left text + right tilted card stack
3. `feature/apps-grid` — 12-col grid of app cards (3-4 visual variants)
4. `feature/discover-marquee` — 3-row infinite horizontal scroll of categories
5. `feature/footer` — 3 columns + copyright + decorative canvas bg
