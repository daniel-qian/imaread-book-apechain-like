# Hero Carousel Animation Pass 1 — QA Notes

## Status: ✅ Shipped

First small step of the animations layer: Hero "theater-style" carousel enhancements. Goal was to bring the existing static carousel closer to the live site's behavior.

## What was already working (from prior commits)

- 5 dApp slides with auto-advance every 5s
- Active thumbnail has a glow (`shadow-[0_0_24px_0_rgba(255,255,255,0.70)]`) + scale-105
- Progress bar fills 0→1 over the autoplay cycle on the active tab
- Pause / Resume (top-right round button)
- Skip to next (top-right round button)
- Click any thumbnail to jump to that slide

## What was wrong (vs. live site)

1. **Layout**: Tab buttons were centered at the bottom-center of the hero (I had placed them at `col-start-7 col-span-6 row-start-2`). The live site places them on the **right side** of the hero, right-aligned, below a "See All Apps" link.
2. **"SEE ALL APPS" duplication**: My code had "See All Apps" as a button on the LEFT text column (next to LAUNCH), AND a hidden tab row at the bottom. The live site only has "See All Apps" once — on the right side, above the thumbnails.
3. **Hero image transitions were instant cuts** — every 5s the image hard-cut to the next slide. The live site does a soft crossfade + slight scale.
4. **Tab button transitions**: my CSS used a custom `.tab-carousel-button` class with default 300ms. The live site uses `transition-all duration-300 ease-in-out` directly on the button.

## Changes landed (3 files, ~30 lines)

### 1. Layout fix: tab buttons moved to the right side

**`src/components/hero-carousel.tsx`** — Replaced the bottom-center tab row + duplicate "See All Apps" with a single right-side column:

```tsx
// NEW: right-side column (matches original DOM's
// "pointer-events-auto col-start-1 md:col-start-8 col-span-8 md:col-span-4
//  w-full flex flex-col gap-16 items-center md:items-end justify-end
//  text-right pb-4 md:pb-0 mt-48 md:mt-0")
<div className="pointer-events-auto col-start-1 md:col-start-8 col-span-8 md:col-span-4 w-full flex flex-col gap-16 items-center md:items-end justify-end text-right pb-4 md:pb-0 mt-48 md:mt-0">
  <a href="/apps" className="...">See All Apps <Play .../></a>
  <div className="flex gap-8">
    {HERO_ITEMS.map((it, i) => <TabButton ... />)}
  </div>
</div>
```

Result:
- Desktop: tab buttons + See All Apps sit at the right edge of the hero (cols 8-11 of 12)
- Mobile: centered at the bottom (cols 1-8 of 6)
- LAUNCH button is now alone in the left text column

### 2. TabButton style aligned with the live site

**`src/components/hero-carousel.tsx`** — Replaced `tab-carousel-button` with the original's `transition-all duration-300 ease-in-out` + per-state `border-2`:

```tsx
// OLD
"tab-carousel-button relative size-12 rounded-lg overflow-hidden border-2"

// NEW
"transition-all duration-300 ease-in-out relative rounded-lg overflow-hidden size-12"
```

Active state: `border-2 border-white shadow-[0_0_24px_0_rgba(255,255,255,0.70)] scale-105`
Inactive state: `border-2 border-transparent shadow-[0_0_0_0_rgba(255,255,255,0.70)] hover:scale-105`

The `transition-all` lets the border + shadow + transform all animate together when active changes — gives the "glow lights up" feel.

### 3. Hero image crossfade

**`src/components/hero-carousel.tsx`** — Added `key={active}` to the image wrapper + animation class:

```tsx
<div
  key={active}
  className="absolute inset-0 overflow-hidden rounded-2 animate-[hero-fade-in_500ms_ease-out]"
>
  <Image ... />
  ...
</div>
```

**`src/app/globals.css`** — Added the keyframe:

```css
@keyframes hero-fade-in {
  0%   { opacity: 0; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1.00); }
}
```

500ms ease-out fade-in. The `key={active}` ensures React remounts the wrapper on slide change, so the animation retriggers from 0% every time.

## Verified in browser

- ✅ Tab row right-aligned at desktop (centered at mobile)
- ✅ See All Apps link on the right, above the thumbnails
- ✅ LAUNCH button alone in left column
- ✅ Click thumbnail → active state glows, image crossfades
- ✅ Auto-advance still working (5s timer)
- ✅ Pause/Resume button works (icon swaps Pause↔Play)
- ✅ Skip button works (jumps to next slide)
- ✅ `animationName: hero-fade-in, animationDuration: 0.5s` confirmed via getComputedStyle

## Build status

```
✓ Compiled successfully in ~2s
✓ TypeScript clean
✓ Generating static pages (4/4)
```

Pre-existing Boldonse font warning, not a regression.

## What was NOT done (still pending for Hero)

- **HOT badge gating**: currently always shows; should only show on items with a `hot: true` flag in the data file
- **Hero text slide-up animation**: the headline + tagline + LAUNCH button should slide up + fade in on each slide change (not just the image)
- **Hover-to-pause**: original site pauses the autoplay when the user hovers the hero
- **Progress bar polish**: the bar is currently a single line at the bottom of the active thumb; original has a wider / more prominent progress indicator
- **Thumbnail labels**: original shows a small label below the active thumb (e.g., "OTHERSIDE" text)

## Next steps

The Hero still has 4-5 more animation improvements possible. The most impactful next one is **#1 (HOT badge gating)** — it's tiny but it makes the badge feel meaningful rather than decorative. Then **#3 (hover-to-pause)** which is a clear UX win. Then the bigger one: **#2 (text slide-up)** which would make each slide change feel like a true theater transition.

Want to keep going on Hero (pick one of the 4), or move to the next section (TopNav drawer animation)?
