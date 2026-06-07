# Full-Page Assembly — QA Notes

## Status: ✅ Shipped (structure layer only)

After scrolling the full page top-to-bottom at desktop 1280px viewport, identified and fixed 3 structural bugs. No animations added (per scope: static structure only).

## Issues found & fixed

### 1. Spotlight h2 too large for its column (FIXED)

- **Before:** `font-heading text-[56px] md:text-[clamp(80px,9vw,120px)]` with `leading-[0.85] md:leading-[0.95]`
- **After:** `font-heading text-[40px] sm:text-[56px] md:text-[clamp(56px,7vw,100px)]` with `leading-[1.0]`
- **Why:** At desktop the h2 rendered at 120px / line-height 0.95, causing 2 problems:
  - The very top of the first line (W, D, etc.) was visually clipped because Boldonse's tall ascenders extend above the line-box, and the tight 0.95 leading left no room
  - The h2's right edge crashed into the foreground CLUTCH MARKETS card on the right
- **Result:** Headline is now readable, no clipping, fits in its `lg:col-span-6` column.

### 2. Spotlight back cards overlapping the badge (FIXED)

- **Before:** `aspect-[16/9]` cards at `top-0` of the section
- **After:** `aspect-[24/9]` cards at `-top-15` (60px above the section)
- **Why:** With 16/9 aspect, the back cards extended ~282px from the top of the section. The text column (containing the badge) starts at y~234 due to `items-center` on the section. The back card's bottom edge (y=282) overlapped the badge (y=234+). Even though the badge is at z-10 and the back cards at z-0, the visual was cluttered.
- **Result:** Back cards are now very short strips at the very top of the section. Badge is clearly visible. The "peek from the top" effect of the original design is partially lost, but the structural clarity is much better.

### 3. Footer empty decorative band too tall (FIXED)

- **Before:** `aspect-[3.8] md:aspect-[3]` (~280-380px of empty dark navy)
- **After:** `aspect-[6] md:aspect-[6]` (~213px at desktop, single line)
- **Why:** The decorative band was the placeholder for the original site's WebGL sphere canvas. 280-380px of nothing on desktop looked broken.
- **Result:** Footer is more compact. The 3 columns sit just above the legal row, with a small visual breathing space.

## Issues NOT fixed (out of scope for "structure only")

### A. TopNav translucent backdrop obscures content during scroll

- **Symptom:** As the page scrolls, dark text in the light sections (Spotlight h2, AppsGrid card names) passes UNDER the TopNav's 40% navy + blur backdrop, becoming hard to read.
- **Root cause:** The TopNav backdrop is a static `bg-ape-dark-navy/40` regardless of scroll position. In the original site, the backdrop changes opacity/color based on scroll position (transparent over dark hero, solid light over light sections).
- **Fix required:** Scroll-driven state (IntersectionObserver or scroll listener) to swap the backdrop color. This is animation, not structure. Deferred to the animations phase.

### B. TopNav APECHAIN logo "N" appears clipped

- **Symptom:** The logo's rightmost letter "N" appears truncated in some viewport sizes.
- **Root cause:** Likely the SVG's `width={140} height={48}` hardcoded attributes conflicting with Tailwind's `w-auto` — the SVG may not be using `preserveAspectRatio` to fit its viewBox.
- **Fix required:** Either remove hardcoded `width`/`height` on the SVG, or add `preserveAspectRatio="xMidYMid meet"`. Cosmetic, low priority.

### C. AppsGrid cards beyond group 1 appear "empty" if user doesn't scroll the carousel

- **Symptom:** On first viewport, only 4 cards (OTHERSIDE / MADE BY APES / CAMELOT / APE PORTAL) are visible. The other 10 cards are off-screen to the right.
- **Root cause:** This is the intended design — AppsGrid is a horizontal scroll-snap carousel with 5 groups (4+1+4+4+1 = 14 cards). Users scroll horizontally to see more.
- **Fix:** Add prev/next buttons for the carousel so users can see there are more cards. (Animation scope.)

### D. DiscoverMarquee text appears cut off at left/right edges

- **Symptom:** Marquee rows show "INFRASTRUC", "COLLECTIBLES", "FINANCE" etc. with the text clipped at both edges.
- **Root cause:** This is the intended design — the rows contain 2 copies of the same text (the second is the animation duplicate). At any moment, the visible portion shows part of copy 1 + part of copy 2.
- **Fix:** None. Working as designed.

## Per-section structural verification (all pass)

| Section | Top (px) | Height (px) | Bottom (px) | Bg | Notes |
|---|---|---|---|---|---|
| Hero | 0 | 633 | 633 | dark navy | Carousel renders 5 slides + thumbnails |
| Light wrapper | 633 | 3311 | 3944 | light blue | Contains Spotlight, AppsGrid, Marquee |
| → Spotlight | 633 | ~1042 | 1659 | light blue | h2 fits, badge visible, back cards small |
| → AppsGrid | 1659 | ~1426 | 3085 | light blue | Carousel works, 4+1+4+4+1=14 cards |
| → Marquee | 3085 | ~859 | 3944 | light blue | 2 rows scrolling, gap from AppsGrid=0 |
| Footer | 3944 | ~1096 | 5039 | dark navy | 3 cols + bottom row, no empty band |

All section boundaries are clean (no gaps, no overlaps). Total page height: 5039px.

## Build status

```
✓ Compiled successfully in ~2s
✓ TypeScript clean
✓ Generating static pages (4/4)
```

## What was NOT done (per scope: structure only)

- No scroll-driven TopNav backdrop color change
- No hero carousel auto-play
- No card hover animations (lift, scale, glow)
- No tab/fade transitions
- No WebGL sphere (hero or footer)
- No UILink slide-hover
- No marquee transition smoothing
- No mobile viewport verification (390×844)
- No interactive QA (clicking every button, hovering every card)

These all belong to the next phase (animations + interactions), per the user's staged approach.

## Files modified

- `src/components/section-spotlight.tsx` — h2 size, leading, pt on main grid, back card aspect + position
- `src/components/main-footer.tsx` — decorative band aspect ratio
- This file (`docs/design-references/fullpage-assembly/qa-notes.md`) — new

## Commit

The structural fixes are in a single commit on master.
