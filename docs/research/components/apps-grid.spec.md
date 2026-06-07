# SectionAppsGrid Specification

> Source: `.SectionGridCarousel` in `apechain.com` (extracted 2026-06-07, see `docs/research/PAGE_TOPOLOGY.md` §3 and the raw DOM in `/tmp/apechain.html` @51503–91288).

## Overview

- **Target file:** `src/components/section-apps-grid.tsx`
- **Screenshot references:** `docs/design-references/apps-grid/`
- **Interaction model:** **scroll-snap horizontal slider**. The original apechain.com wraps all 14 cards in a horizontal `flex` / scrollable container with 5 "pages" (groups of cards). On desktop, each page is either a 2×2 grid (4 cards) or a 1×1 full-bleed card (1 card); on mobile, each page is a horizontal flex of 160px-wide cards. There are **no prev/next buttons** in the original markup — users swipe horizontally or scroll.
- **Wiring:** Renders in `src/app/page.tsx`, **inside the `bg-ape-grey text-black` wrapper**, **below** `<SectionSpotlight />`. Sits on the light landing-page background.

## Purpose

A showcase of 14 dApps built on ApeChain. The original visual design uses a horizontal carousel that walks users through categories (GAMES / FINANCE / COLLECTIBLES / INFRASTRUCTURE / NEWS / INTELLECTUAL PROPERTY). Two apps are flagged as "featured" (BLEVER, ORMI) and get their own full-bleed single-card group.

## What the original actually is (vs. handoff's "12-col grid" guess)

The handoff document described this as a "12-col grid with 3 card variants (standard / wide / featured highlighted)". **This is wrong.** The actual structure is a **horizontal scroll-snap carousel** with 5 groups:

| Group | Cards | Layout | Notes |
|-------|-------|--------|-------|
| 1 | otherside, made-by-apes, camelot, ape-portal | 2×2 grid | 4 standard cards |
| 2 | blever | 1×1 (full-bleed) | FEATURED — single card takes the whole viewport width |
| 3 | ape-express, apescan, clutch-market, gtrade | 2×2 grid | 4 standard cards |
| 4 | openocean, cyan, apechain-news, mintpad | 2×2 grid | 4 standard cards |
| 5 | ormi | 1×1 (full-bleed) | FEATURED |

The "featured" treatment is **layout-level**, not card-level: featured apps get their own group with a single full-bleed card. The card component itself is the same for all 14 apps.

The 3 variants the handoff guessed at (standard / wide / featured) **don't exist in the DOM** as distinct card components — there's only one `SimpleSliderCard_root` variant. We honor the original's actual structure.

## DOM Structure (extracted, simplified)

```
<section class="SectionGridCarousel relative grid grid-cols-6 md:grid-cols-12 md:place-items-baseline gap-x-8 gap-y-32 md:gap-x-24 py-96 overflow-hidden">
  <div class="col-start-1 col-span-3 md:col-start-2 md:col-span-8 flex flex-row items-baseline gap-8">  ← HEADER LEFT
    <svg>rocket icon</svg>
    <h2 class="font-manuka text-32 uppercase leading-tight">ApeChain Apps</h2>
  </div>
  <div class="col-span-3 flex items-end justify-end text-right pb-4 md:pb-0">  ← HEADER RIGHT
    <a class="font-mono leading-tight tracking-widest text-12 uppercase" href="/apps">
      <span>See All Apps</span>
      <svg>play icon</svg>
    </a>
  </div>
  <div class="SimpleSlider w-full col-start-1 col-span-6 md:col-start-2 md:col-span-10">  ← SLIDER
    <div class="SimpleSlider__Track w-max">
      <div class="item-group md:w-cols-5 md:max-w-[902px] md:grid grid-cols-2 grid-rows-2 content-stretch gap-8 md:gap-24">  ← group 1 (2x2)
        <a href="/apps/otherside">    <SimpleSliderCard> otherside    </SimpleSliderCard> </a>
        <a href="/apps/made-by-apes"> <SimpleSliderCard> made-by-apes </SimpleSliderCard> </a>
        <a href="/apps/camelot">      <SimpleSliderCard> camelot      </SimpleSliderCard> </a>
        <a href="/apps/ape-portal">   <SimpleSliderCard> ape-portal   </SimpleSliderCard> </a>
      </div>
      <div class="item-group md:w-cols-5 md:max-w-[902px] md:grid grid-cols-1 content-stretch gap-8 md:gap-24">  ← group 2 (1x1)
        <a href="/apps/blever">       <SimpleSliderCard> blever (FEATURED) </SimpleSliderCard> </a>
      </div>
      <div class="item-group ..."> ... group 3 (2x2) ... </div>
      <div class="item-group ..."> ... group 4 (2x2) ... </div>
      <div class="item-group ..."> ... group 5 (1x1) ... </div>
    </div>
  </div>
</section>
```

## Computed Styles (extracted from live site)

### Section container
- `position: relative`
- `display: grid`
- `grid-template-columns: repeat(6, 1fr)` mobile, `repeat(12, 1fr)` desktop
- `column-gap: 8px` (mobile), `24px` (desktop)
- `row-gap: 32px`
- `padding-block: 96px` (`py-96`)
- `padding-inline: 28.44px` (the standard `px-container` token, `px-7` in Tailwind)
- `place-items: baseline` (desktop) — column-baseline alignment for the header row
- `overflow: hidden` (the section hides the horizontal overflow; the slider handles its own scroll)

### Header row
- Left: cols 2-9 (desktop), full width mobile — rocket SVG icon + h2 "ApeChain Apps" (Manuka 32px uppercase)
- Right: cols 10-12 (desktop), full width mobile — "See All Apps" link with play icon
- The h2 has an inline SVG rocket icon to its left (Manuka font, 32px font-size matches the icon)

### Rocket icon
- An SVG with 2 `<linearGradient>` defs (the rocket body uses a 3-stop gradient: `#FEABFF` → `#8D73FD` → `#98FFF9`)
- ViewBox: 0 0 24 25
- Color via `text-32` Tailwind class (currentColor on fill, with gradient overrides)
- **For the clone:** use a simpler lucide-react `Rocket` icon (or just text "🚀" emoji). The original's bespoke gradient rocket is too detailed to reproduce quickly. The visual contract is "small icon + section title".

### "See All Apps" link
- `font-family: DM Mono; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.2px; line-height: tight`
- The link has a play icon (▶) on the right
- Original uses a 2-layer label (`.innerLabel--main` and `.innerLabel--clone`) for an animated slide on hover. **For the clone:** plain static text. The visual contract is "see all apps link with a play indicator".

### Slider container
- `SimpleSlider w-full` (full width of the column)
- `SimpleSlider__Track w-max` (the inner track is as wide as all the groups; overflow handled by the section's `overflow-hidden` + the track's own scroll)
- **Important:** the original does NOT use CSS `scroll-snap` explicitly in the className (the snap behavior is implemented via JavaScript in the original React component, which we don't have). For the clone we add `snap-x snap-mandatory` so native CSS scroll-snap works without JS.
- **Clone change:** use `flex overflow-x-auto snap-x snap-mandatory scroll-smooth` on the track, and `snap-center shrink-0` on each item-group.

### Item group (2×2)
- `display: flex; flex-direction: row; flex-wrap: nowrap` mobile (horizontal carousel)
- `display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr)` desktop (2×2 grid)
- `gap: 8px` mobile, `24px` desktop
- `width: max-content` mobile (driven by card width), `max-width: 902px` desktop
- 4 cards in a 2×2 grid; each card is 1 column × 1 row

### Item group (1×1 featured)
- Same wrapper, but `grid-template-columns: 1fr` (no rows definition)
- 1 card filling the full width of the group

### Card (SimpleSliderCard)
- The card itself is a `<div class="relative flex flex-col gap-8 md:gap-24 SimpleSliderCard_root">` wrapped in an `<a href>`
- Children:
  1. **Image preview** — `<div class="rounded-8 overflow-hidden SimpleSliderCard_preview">` containing an absolutely-positioned `<img class="absolute inset-0 size-full object-cover">` (1:1 aspect ratio; 960x960 source)
  2. **Category pill** — `<div class="z-10 SimpleSliderCard_category"><div class="UIPill_root">Games</div></div>` (positioned at top-left, overlaying the image)
  3. **SVG mask** — a 7-layer SVG with feGaussianBlur + linearGradient + 6 nested `<rect>` (same pattern as the Spotlight buttons). The SVG has `class="... hidden"` so it's only visible on hover. **For the clone:** SKIP the SVG mask entirely (too complex; visual is "hover ring glow" which we can fake with a CSS `box-shadow` on hover).
  4. **Content block** — `<div class="flex flex-col justify-end SimpleSliderCard_content">` containing:
     - Name: `font-family: Manuka; font-size: 32px` mobile, `48px` desktop; `text-transform: uppercase; line-height: none`
     - Tagline: `font-family: DM Mono; font-size: 12px; text-transform: uppercase; line-height: none`
- Card has `flex flex-col gap-8 md:gap-24` — the image takes its natural aspect, the text block sits below

### Card hover (original)
- The hidden SVG mask fades in via opacity transition (`echo-border`, `hover-effect`, `hover-border`, `hover-border-effect` rects with different opacities)
- A radial gradient fill appears on the hover-effect rect
- Drop shadow on the hover border
- **For the clone:** apply `hover:scale-[1.02] transition-transform duration-300` + `hover:shadow-2xl` — simple scale + drop shadow. The visual contract is "card lifts on hover".

### Card background
- The original places the card on the section's `bg-ape-grey` light blue. The image fills the card, the text is below the image.
- **Each card has a `gradient` field** in the data file (e.g. `from-[#1a2540] to-[#0a1330]`) — this is the **dark gradient background** used by the original **behind the image** to make the white text on light images readable. **For the clone:** apply this gradient as a background to the image wrapper (`bg-gradient-to-br ${gradient}`) so even if the image fails to load, the gradient is visible. The image sits on top of the gradient.

## Per-State Content (see `src/data/apechain-content.ts` `APP_CARDS`)

14 cards total, with 2 marked `featured: true`:
- **blever** (COLLECTIBLES) — featured, gradient `from-[#a281ff] to-[#3a1f7a]` (purple)
- **ormi** (INFRASTRUCTURE) — featured, gradient `from-[#6f3dff] to-[#2a1a4a]` (deep purple)

The data file orders them in a specific sequence: otherside → made-by-apes → camelot → ape-portal → blever → ape-express → apescan → clutch-market → gtrade → openocean → cyan → apechain-news → mintpad → ormi. This matches the original's group ordering.

**Group partitioning** (for the clone's `<AppCardGroup>` rendering):
- Group 1: cards 0-3 (otherside, made-by-apes, camelot, ape-portal)
- Group 2: card 4 (blever) — FEATURED, single-card group
- Group 3: cards 5-8 (ape-express, apescan, clutch-market, gtrade)
- Group 4: cards 9-12 (openocean, cyan, apechain-news, mintpad)
- Group 5: card 13 (ormi) — FEATURED, single-card group

The clone can compute groups dynamically: take 4 cards at a time, then any `featured` card after those 4 starts a new group. **For simplicity in the clone:** hard-code the 5 groups (the data is fixed and won't change). The grouping is essentially "first 4, then featured solo, then next 4, then next 4, then featured solo".

## Assets

- 14 card images (CTF CDN URLs, in the data file)
- 1 rocket icon (replaced with lucide `Rocket` for the clone)
- 1 play icon (replaced with lucide `Play` for the "See All Apps" link)

## Text Content (verbatim from live site)

- h2: **ApeChain Apps**
- Header link: **See All Apps**
- 14 card names + taglines: all in `APP_CARDS` data (no changes needed)

## Implementation Notes

- Server component is fine (the slider is CSS-only, no JS state for slide position)
- Use `next/image` for the 14 card images (`unoptimized` for CTF CDN)
- Use `Rocket` from lucide-react for the section icon
- Use `Play` from lucide-react for the "See All Apps" link
- Use `ArrowUpRight` from lucide-react as a hover indicator on cards
- **No `use client` directive** — purely static layout, native CSS scroll-snap handles the carousel
- **Group layout:** use `grid-cols-2 grid-rows-2` for the 4-card groups, `grid-cols-1` for the 1-card featured groups
- **Track layout:** use `flex overflow-x-auto snap-x snap-mandatory scrollbar-hide` on the slider track, `snap-center shrink-0` on each group
- **Featured visual treatment:** the same card component is used; the only difference is the group is `grid-cols-1` (full-bleed) instead of `grid-cols-2` (1/2 width)
- **`font-heading`** for the Manuka equivalent (not the dead `font-display` class)
- **`font-mono`** for the taglines + "See All Apps" link

## Out of Scope

- The original's bespoke 7-layer SVG mask on card hover (replaced with simple scale + shadow)
- The original's "label slide" animation on the "See All Apps" link hover (replaced with a static arrow)
- Prev/next slider buttons (the original doesn't have them; users swipe or scroll)
- The rocket icon's bespoke gradient (replaced with lucide `Rocket`)
- Mouse wheel horizontal scroll (native browser behavior is fine)
- Lazy loading of off-screen card images (Next/Image handles this automatically)

## Known divergence from the handoff's "12-col grid" guess

The handoff described this section as a static 12-col grid with 3 card variants (standard / wide / featured). **The actual structure is a horizontal scroll-snap carousel with 5 groups** (3 2×2 groups + 2 single-card featured groups). The clone follows the actual DOM. If you specifically want a static grid layout (no scrolling), the data structure is simple enough to re-render as a flat 4×4 grid — but that's a different visual from the original site.
