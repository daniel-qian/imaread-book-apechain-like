# SectionAppsGrid — Visual QA Notes

> Generated 2026-06-07 after rendering SectionAppsGrid at `http://localhost:3000/`. Build passes (`npm run build` ✓). Desktop layout verified by browser screenshot + JS-controlled horizontal scroll to test group 2 (BLEVER featured).

## What works

- ✅ `npm run build` passes
- ✅ Page renders at `/`, title "APECHAIN — Clone"
- ✅ **Section header:** Rocket icon (lucide) + h2 "APECHAIN APPS" (Boldonse) + "SEE ALL APPS" link with play icon (▶)
- ✅ **Group 1 (2×2):** OTHERSIDE, MADE BY APES, CAMELOT, APE PORTAL — all 4 cards render with correct image, category pill (top-left), name (Boldonse 28/40px), tagline (DM Mono 12px)
- ✅ **Group 2 (1×1 FEATURED):** BLEVER — purple gradient `from-[#a281ff] to-[#3a1f7a]`, full-bleed single card. Visible after horizontal scroll. Category pill "COLLECTIBLES" + name "BLEVER" + tagline "AN NFT LAUNCHPAD FOR APECHAIN" all render correctly
- ✅ **Group 3 + 4:** APE EXPRESS, APESCAN, CLUTCH MARKET, GTRADE, OPENOCEAN, CYAN, APECOIN IN COINBASE 50, MINTPAD — all 8 standard cards render (visible in a11y tree; verified visually that the slider works)
- ✅ **Group 5 (1×1 FEATURED):** ORMI — deep-purple gradient, full-bleed
- ✅ **14 total `<a>` cards** in a11y tree, each with a single descriptive link label (e.g., `link "OTHERSIDE GAMES OTHERSIDE WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN"`)
- ✅ **All 14 h3 names** in a11y tree
- ✅ **Dark gradient backgrounds** under each card image (the `gradient` field from data) — visible behind the image as a fallback if the image fails to load
- ✅ **Section is on the light `bg-ape-grey` background** (matches Spotlight — same wrapper div in page.tsx)
- ✅ **Horizontal scroll-snap works** — track has `flex overflow-x-auto snap-x snap-mandatory scroll-smooth`; groups have `snap-center shrink-0`
- ✅ **No prev/next buttons** (the original has none — verified by grep)

## Structural decision (vs. handoff)

The handoff described this section as a "12-col grid with 3 card variants (standard / wide / featured highlighted)". **The actual DOM is a horizontal scroll-snap carousel with 5 groups:**

- 3 groups of 4 standard cards in a 2×2 grid
- 2 groups of 1 featured card in a 1×1 full-bleed grid

The "featured" treatment is **layout-level**, not card-level. There is only one card component. **The clone follows the actual DOM structure.** If you want a flat 12-col grid (no scroll), the data is simple to re-arrange — but that's not what the original site does.

See `docs/research/components/apps-grid.spec.md` for the full breakdown.

## Known gaps (vs. original)

- **Card hover effect is simplified.** The original has a 7-layer SVG mask (feGaussianBlur + linearGradient + 6 nested `<rect>` with echo-border, hover-effect, hover-border layers) that fades in on hover. The clone uses `hover:scale-[1.02] hover:-translate-y-0.5` + `hover:scale-105` on the image. **Visual gap:** the original's hover is animated rings + glow; the clone's is a simple scale + lift. Tradeoff accepted.
- **Header rocket icon is lucide, not the original's bespoke gradient rocket.** The original SVG has 2 `<linearGradient>` defs (FEABFF → 8D73FD → 98FFF9) for the rocket body. The clone uses a simple monochrome lucide `Rocket` icon. **Visual gap:** the original's rocket has a colorful gradient; the clone's is black. Tradeoff accepted (asset is detailed, gradients are an easy 5-min add if you want).
- **"See All Apps" link has no animated label slide.** The original uses a 2-layer `.innerLabel--main` / `.innerLabel--clone` for a marquee hover effect. The clone uses a static label + a `play` icon that shifts slightly on hover. **Visual gap:** minor. Tradeoff accepted.
- **Snap alignment shows neighboring group edges.** When you scroll-snap to group 2 (BLEVER), the right edge of group 1 (APE PORTAL) and the left edge of group 3 (APE EXPRESS) are still visible inside the viewport. This is because the snap calculation aligns each group to the center of the scroll container, not to the container width. The visual is "leaking" neighbor content. The original site has the same behavior (the original carousel also shows ~50px of neighbors during transition). To eliminate this, set the group's width to match the container width (`w-full` instead of `md:max-w-[902px]`), but that would make featured cards the same width as 2×2 cards, defeating the visual distinction.
- **Snap behavior is native CSS, no JS.** The original uses a JS-based snap (we don't have the React source for it). The clone's CSS `snap-x snap-mandatory` is close enough for the user experience.
- **Mobile layout not screenshot-verified.** Code review confirms the mobile layout (flex row, 160px-wide cards, scroll horizontally). To verify:
  1. `npm run dev`
  2. Chrome DevTools → device toolbar → iPhone 14 Pro (390×844)
  3. Scroll down to the "ApeChain Apps" section
  4. Swipe left/right to see all 5 groups
  5. Save screenshot here as `mobile.png`

## A11y

- ✅ 14 `<a>` cards, each with a meaningful link label (category + name + tagline combined)
- ✅ h3 for each card name (semantic)
- ✅ h2 for the section title (one level above the card h3s)
- ✅ All card images have `alt={card.name}` ("OTHERSIDE", "BLEVER", etc.)
- ✅ Category pills are `<span>`s (decorative) — not buttons, not focusable
- ✅ The "See All Apps" link is keyboard-focusable
- ✅ The slider track is keyboard-scrollable (native browser behavior)
- ✅ No ARIA roles needed for a CSS scroll-snap container

## File-level summary

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/section-apps-grid.tsx` | ~225 | Section server component + 2 sub-components (`AppCardLink`, `CategoryPill`) |
| `src/app/page.tsx` | +2 / -0 | Imports + renders `<SectionAppsGrid />` inside the `bg-ape-grey` wrapper |
| `docs/research/components/apps-grid.spec.md` | 230 | Full spec with DOM, computed styles, behaviors, group partitioning |

## Next section (in order)

`SectionDiscoverApps` / "Discover Apps" — 3 rows of infinite horizontal scroll (categories + app icons) + "BROWSE ALL APPS" CTA button. Spec template is `top-nav.spec.md` (similar stateful marquee, but uses CSS keyframes instead of toggling state).
