# HeroCarousel Specification

> Source: `.SectionHomepageHero` in `apechain.com` (extracted 2026-06-07).

## Overview

- **Target file:** `src/components/hero-carousel.tsx`
- **Screenshot references:** `docs/design-references/hero/`
- **Interaction model:** **time-driven (auto-advance) + click-driven (tab)**. The auto-advance is the dominant control; tab clicks are a way to override and to read the active item visually.

## Purpose

A 1-svh hero that showcases one of 5 dApps at a time, with a left-side text stack (category tag + huge title + tagline + 2 links) and a right-side 3D scene (here, replaced by a static hero image). Below the hero, 5 thumbnail tab buttons drive the active item. Two 64×64 round icon buttons on the right are play/pause + something else (likely a re-shuffle).

## DOM Structure (extracted)

```
<section class="relative min-h-svh text-white grid grid-cols-6 md:grid-cols-12 gap-x-12 md:gap-x-48 px-container pb-44 items-end overflow-visible">
  <div class="...">                    ← background canvas (WebGL — replaced by gradient sphere in clone)
  <div class="absolute ...">            ← top-right round button 1 (PLAY/PAUSE)
  <div class="absolute ...">            ← top-right round button 2 (?)
  <div class="col-start-1 col-span-6 md:col-start-2 md:col-span-4 ..."> ← text stack (left half)
    <div class="flex flex-row items-center gap-8">
      <span class="bg-[#FF7A3A] text-[#fff] px-2 ..."> 🔥 HOT </span>     ← HOT badge
      <span class="text-12 uppercase tracking-widest font-mono">GAMES</span> ← category
    </div>
    <h2 class="font-manuka text-32 md:text-[clamp(64px,7vw,120px)] uppercase leading-[0.78]">OTHERSIDE</h2>
    <p class="font-mono text-12 uppercase tracking-widest">WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN</p>
    <div class="flex items-center gap-16 mt-16">
      <a class="bg-white text-black px-24 py-12 rounded-16 ...">LAUNCH</a>
      <a class="text-white text-12 uppercase tracking-widest">SEE ALL APPS ▶</a>
    </div>
  </div>
  <div class="col-start-1 md:col-start-7 md:col-span-6 ..."> ← right half (3D scene / image)
    <img class="absolute inset-0 size-full object-cover" src="...hero image..." />
  </div>
  <div class="col-start-1 col-span-6 md:col-start-7 md:col-span-6 row-start-2 flex justify-center gap-8"> ← tab buttons
    <button class="size-48 rounded-8 border-2 ..."><img thumbnail></button> × 5
  </div>
</section>
```

## Computed Styles (extracted from live site)

### Section container
- `position: relative`
- `min-height: 100svh` (1 small viewport height)
- `display: grid`
- `grid-template-columns: repeat(6, 1fr)` mobile, `repeat(12, 1fr)` md+
- `column-gap: 12px` mobile, `48px` md+
- `padding-inline: 28.44px` (px-container)
- `padding-bottom: 44px` (pb-44)
- `align-items: end`
- `overflow: visible` (lets the 3D scene bleed past the section bounds)
- `color: rgb(255, 255, 255)` (text on dark)

### Background canvas (the WebGL scene)
- `position: fixed; top: 0; left: 0; width: 100vw; min-height: 100vh`
- WebGL2 — **out of scope**; replaced with a CSS gradient + animated shimmer

### HOT badge
- `background: #FF7A3A` (ape orange)
- `color: #fff`
- `padding: 4px 8px` (px-2 py-1)
- `border-radius: 4px`
- `font-size: 12px`
- `font-weight: 700`
- `text-transform: uppercase`
- Has a flame emoji or icon prefix (the original may use `🔥` or a custom SVG flame)

### Category tag (next to HOT)
- `font-size: 12px`
- `font-weight: 500`
- `font-family: DM Mono`
- `text-transform: uppercase`
- `letter-spacing: 1.2px` (tracking-widest)
- `color: white` (with reduced opacity on default, full on hover)

### h2 (big title)
- `font-family: Manuka` → replaced with `Boldonse`
- `font-size: 32px` mobile, `clamp(64px, 7vw, 120px)` desktop
- `font-weight: 400` (Manuka is geometric, no bold variant needed)
- `line-height: 0.78`
- `text-transform: uppercase`
- `letter-spacing: 0`

### p (tagline)
- `font-family: DM Sans`
- `font-size: 16px`
- `font-weight: 400`
- `line-height: 1.3` (20.8px)
- `text-transform: uppercase`
- `letter-spacing: normal`
- `max-width: 320px`

### LAUNCH button
- `background: #fff`
- `color: #000`
- `padding: 12px 24px`
- `border-radius: 16px`
- `font-family: DM Mono`
- `font-size: 12px`
- `font-weight: 500`
- `text-transform: uppercase`
- `letter-spacing: 1.2px`
- Has a `→` icon on the right (lucide `ArrowUpRight` or `ArrowRight`)

### SEE ALL APPS link
- `color: white`
- `font-family: DM Mono`
- `font-size: 12px`
- `font-weight: 500`
- `text-transform: uppercase`
- `letter-spacing: 1.2px`
- Has a `▶` icon on the right (lucide `Play` at 10×10 or custom)

### Right-side round buttons (64×64)
- `width: 64px; height: 64px`
- `border-radius: 16px` (square rounded, not full circle!)
- `background: transparent`
- `border: 2px solid` with a gradient stroke (purple→red→orange→cyan)
- Center icon: `Play` (filled triangle, from the original SVG path `M12.5 6.134a1 1 0 0 1 0 1.732L5 12.196...`)

### Tab buttons (5 × 48×48)
- `width: 48px; height: 48px`
- `border-radius: 8px`
- `overflow: hidden`
- **Active state:** `border: 2px solid white; box-shadow: 0 0 24px 0 rgba(255, 255, 255, 0.7)`
- **Inactive state:** `border: 2px solid transparent; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0)`
- `transition: all 300ms ease-in-out`
- Inside: `<img class="absolute inset-0 size-full object-cover" src="...thumbnail...">`
- Overlay: `<span class="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-50">` (darkens inactive thumbs)
- Bottom progress bar (the auto-advance indicator): `<span class="absolute left-0 w-full h-2 rounded-2 bg-white origin-left" style="transform: scaleX(N);">` where N grows from 0 to 1 over the interval

## States & Behaviors

### State: Page load (initial)
- `activeIndex = 0` (OTHERSIDE)
- All tab progress bars at `scaleX(0)`
- Auto-advance starts

### Behavior: Auto-advance
- **Trigger:** page load (if autoplay is on)
- **Mechanism:** `useEffect` with `setInterval(advance, 5000)`; the current tab's progress bar grows linearly via CSS `transform: scaleX(t)` where t goes 0 → 1 over 5s
- **State change:** at t=1, `activeIndex = (activeIndex + 1) % items.length`, progress resets
- **Implementation:** in clone, we use a single `progress` state (0–1) updated by `requestAnimationFrame` for the active tab

### Behavior: Tab click
- **Trigger:** click on a 48×48 tab button
- **Effect:** `activeIndex = clickedIndex`; progress resets to 0
- **State change:** active tab gains white border + glow; inactive lose it
- **Transition:** 300ms ease-in-out (border + box-shadow)

### Behavior: Round button 1 (PLAY/PAUSE)
- **Trigger:** click
- **Effect:** toggles `isPaused`; if paused, the progress bar freezes; if playing, resumes from current progress
- **Icon:** swaps between `Play` and `Pause` (lucide)

### Behavior: Round button 2 (SKIP / next)
- **Trigger:** click
- **Effect:** `activeIndex = (activeIndex + 1) % items.length`; progress resets to 0
- **Icon:** the original used the same Play path; we'll use `ArrowRight` to differentiate, OR a different shape. For the clone, use `SkipForward` (lucide).

### Hover state on tabs
- **Before:** scale(1), border transparent, image full brightness
- **After:** scale(1.05), border white(50%), image slightly brightened
- **Transition:** 300ms ease-in-out

### Hover state on LAUNCH
- **Before:** white bg, black text
- **After:** `bg-ape-grey` light blue bg, black text, slight upward translate
- **Transition:** 200ms

## Per-State Content (5 items, see `src/data/apechain-content.ts`)

| # | Title | Category | Tagline |
|---|-------|----------|---------|
| 0 | OTHERSIDE | GAMES | Web3-enabled virtual worlds on ApeChain |
| 1 | APECHURCH | GAMES | Where faith, culture, and community meet |
| 2 | OPENSEA | COLLECTIBLES | The largest NFT marketplace. Now supporting ApeChain |
| 3 | CLUTCH MARKET | GAMES | Decentralized parlay platform on ApeChain |
| 4 | SLAB CASH | FINANCE | RWA platform built for the EVM, with support for ApeChain |

## Assets

- Hero panel image: `heroImage` per item (CTF CDN)
- Tab thumbnail: `thumbnail` per item (CTF CDN)
- Icons: `Play`, `Pause`, `ArrowRight` (lucide-react)
- HOT badge: 🔥 emoji (or custom flame SVG) — for simplicity, use 🔥

## Text Content (verbatim from live site)

The exact text is in `HERO_ITEMS` in `src/data/apechain-content.ts`. The "LAUNCH" button label is **LAUNCH** (uppercase). The "SEE ALL APPS" link label is **SEE ALL APPS** with a `▶` or `→` suffix.

## Responsive Behavior

| Viewport | Layout |
|----------|--------|
| < 768px (mobile) | 6-col grid. Text stack spans all 6 columns on top. Tab buttons in a 5-col row below. Round buttons hidden. 3D scene replaced by a static hero image (square aspect, full-width). |
| >= 768px (md) | 12-col grid. Text stack left (cols 2–5), hero image right (cols 7–12). Tabs in a row at bottom-center. |
| >= 1024px (lg) | Same as md, but the right-side round buttons are visible at top-right. |

### Mobile specifics
- `h2` font-size drops to `32px`
- HOT badge + category stay side-by-side
- Tab buttons reduce to 40×40

## Implementation Notes

- Use `'use client'` directive (state + effect)
- Use `useState` for `activeIndex`, `isPaused`, `progress`
- Use `useEffect` with `requestAnimationFrame` to drive `progress` from 0 to 1 over 5000ms
- Use Tailwind utilities for all styling (no inline styles for layout)
- Replace the WebGL canvas with a CSS-only "gradient sphere" placeholder (a div with `radial-gradient` background and a subtle `animation: hero-sphere-rotate 60s linear infinite`)
- Real hero image renders as an `<img>` with `object-cover` and absolute positioning filling the right half
