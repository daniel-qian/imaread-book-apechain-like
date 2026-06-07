# SectionSpotlight Specification

> Source: `.SectionSpotlight` in `apechain.com` (extracted 2026-06-07, see `docs/research/PAGE_TOPOLOGY.md` §2 and the raw DOM in `/tmp/apechain.html` @39716–51503).

## Overview

- **Target file:** `src/components/section-spotlight.tsx`
- **Screenshot references:** `docs/design-references/spotlight/`
- **Interaction model:** **static**. No observed state, no scroll triggers, no hover triggers that change content. The 3D card-stack uses CSS `transform: perspective() rotateX/Y/Z()` (static, not animated). Hover on the buttons is the only "interaction" and it just brightens the border.
- **Wiring:** Renders in `src/app/page.tsx`, **below** `<HeroCarousel />`, still inside `<main>`.

## Purpose

A spotlight section that introduces the "Spotlight" campaign ("WHERE DAPPS SHINE & YOU WIN") and features one highlighted project ("CLUTCH MARKETS") via a tilted card stack on the right. The left side is a copy block; the right side is a visual stack of 2 background cards + 1 foreground card with text overlay.

## DOM Structure (extracted, simplified)

```
<section class="SectionSpotlight relative min-h-svh py-96">
  <div class="SectionSpotlightBackground absolute">  ← absolute, fills the section
    <grid wrap>
      <BackgroundCard tilted> img: dashbo.jpg  </BackgroundCard>  ← back, top-left
      <BackgroundCard tilted> img: opensea.jpg </BackgroundCard>  ← back, top-right
    </grid wrap>
  </div>
  <div class="grid grid-cols-6 lg:grid-cols-12 gap-x-16 px-container items-center min-h-svh relative">
    <div class="col-span-6 lg:col-start-2 lg:col-span-6 max-w-[800px] flex flex-col gap-12 md:gap-24">  ← LEFT
      <img src="/apechain-spotlight.png" alt="Apechain Spotlight" class="w-[213px] h-[38px]"/>
      <h2 class="text-56 md:text-120 font-manuka uppercase leading-tighter">Where DApps Shine &amp; You Win</h2>
      <div class="md:w-10/12 font-sans text-14 md:text-16 leading-snug tracking-[0.24px]">
        [3 <p> paragraphs of body copy ]
      </div>
      <div class="flex gap-24">
        <a [SVG mask]><span>Get Started</span></a>
        <a [SVG mask]><span>Go Spotlight</span></a>
      </div>
    </div>
    <div class="relative py-32 md:py-0 col-start-3 col-span-4 lg:col-start-9 lg:col-span-4 text-white">  ← RIGHT
      <div class="max-w-[600px] stroke-1 md:stroke-2 absolute md:relative p-px md:p-0.5 top-[30%] left-[10%] -right-[50%] md:left-auto md:top-auto md:right-auto" style="transform:perspective(1800px) rotateX(15deg) rotateY(15deg) rotateZ(-5deg)">
        <div class="absolute inset-0 rounded-16 overflow-hidden" style="background:linear-gradient(45deg, #A281FF 10%, #EB8280 33%, #EBBF9A 66%, #89D0FF 90%)"></div>
        <div class="absolute inset-px md:inset-2 z-10 rounded-16 overflow-hidden" style="background:linear-gradient(182deg, rgba(24, 83, 117, 0.00) 39.56%, rgba(24, 83, 117, 0.80) 93.99%), …"></div>
        <img class="relative h-auto rounded-16 overflow-hidden" src=".../1800x1080-clutch.jpg" alt="Clutch Markets"/>
      </div>
      <div class="relative flex flex-col gap-8 z-1 pt-120 pb-70 md:pt-0 md:pb-0 md:absolute bottom-0 left-0">  ← text overlay on the card
        <h2 class="text-32 md:text-48 font-manuka uppercase leading-tighter">Clutch Markets</h2>
        <p class="max-w-[160px] md:max-w-[305px] font-mono text-10 md:text-12 leading-snug tracking-wide uppercase">Decentralized parlay platform on ApeChain.</p>
        <a [SVG mask]><span>What's this</span></a>
      </div>
    </div>
  </div>
</section>
```

## Computed Styles (extracted from live site)

### Section container
- `position: relative`
- `min-height: 100svh` (1 full viewport — same as Hero)
- `padding-block: 96px` (`py-96` → 96px top + bottom)
- The section background is `bg-ape-grey` (set on the parent `<div class="landing-page bg-ape-grey text-black">`)

### Background cards (the tilted stack behind the text)
- 2 cards, both `absolute` positioned (the parent `SectionSpotlightBackground` is `absolute` filling the section)
- Each card is a `<div class="BackgroundCard_root__HmYr7 grid__item …">` containing a `<div class="rounded-8 overflow-hidden" style="transform:perspective(800px) rotateX(7.5deg) rotateY(-15deg) rotateZ(2.5deg)">` with an `<img>` inside
- Both cards use the **same 3D transform** (perspective 800px, rotateX 7.5deg, rotateY -15deg, rotateZ 2.5deg) — they're stacked identically but at different grid positions
- Grid positions: first card top-left of the section background; second card top-right
- `border-radius: 8px` (`rounded-8`)
- The `<img>` fills the card with `object-cover`

### Left column (text block)
- `grid-column: 1 / span 6` mobile, `2 / span 6` desktop
- `max-width: 800px`
- `display: flex; flex-direction: column; gap: 12px` mobile, `24px` desktop
- Children:
  1. Badge image: `width: 213px; height: 38px` (the "APECHAIN | SPOTLIGHT" wordmark image)
  2. h2: `font-family: Manuka; font-size: 56px` mobile, `120px` desktop; `font-weight: 400`; `text-transform: uppercase`; `line-height: tighter`
  3. Body div: `width: 10/12` (md+); `font-family: DM Sans`; `font-size: 14px` mobile, `16px` desktop; `line-height: snug`; `letter-spacing: 0.24px`
  4. Button row: `display: flex; gap: 24px;` — 2 outline buttons

### h2 typography
- Family: **Manuka** (custom paid font) → replaced with **Boldonse** (or `font-heading` in Tailwind)
- Mobile: `text-56` = 56px
- Desktop: `text-120` = 120px
- Weight: 400 (Manuka is geometric, no bold needed)
- `line-height: tighter` (Tailwind = 1.125)
- `text-transform: uppercase`

### Body copy
- Family: DM Sans
- Mobile: 14px (`text-14`)
- Desktop: 16px (`text-16`)
- `line-height: snug` (1.375)
- `letter-spacing: 0.24px` (very subtle, almost default)
- Mobile: full width; Desktop: 10/12 width

### Buttons (left column: GET STARTED + GO SPOTLIGHT)
The original uses an extremely complex SVG mask with:
- `<feGaussianBlur stdDeviation="4">` for a soft border
- `<feGaussianBlur in="SourceAlpha" stdDeviation="20">` + `<feFlood flood-color="white" flood-opacity="0.5">` for a hover drop-shadow effect
- A 4-stop linear gradient (`#A281FF 10%` → `#EB8280 33%` → `#EBBF9A 66%` → `#89D0FF 90%`) for the border stroke
- A radial gradient for the hover fill (`#00A7FA` → `#0054FA`)
- 7 nested `<rect>` layers with classes `echo-border`, `border`, `hover-effect`, `hover-border`, `hover-border-effect` for the animation states
- A label with two layered `<span>`s (`.label__inner--main` and `.label__inner--clone`) for a marquee-style slide on hover

**For the clone:** we **will not replicate the SVG mask**. The clone uses a simpler outline button: white text + transparent bg + 1px white border, with a hover that inverts to white bg + black text. This matches the visual contract of "outline button on light bg" without the bespoke WebGL-flavored effect. The intent of the original (an interactive, eye-catching CTA) is preserved; the execution is simplified.

### Right column (tilted card stack)
- `grid-column: 3 / span 4` mobile, `9 / span 4` desktop
- Padding: `py-32` mobile, `py-0` desktop
- Children:
  1. **Tilted card** (the foreground visual)
     - `max-width: 600px`
     - `position: absolute` mobile (with `top-[30%] left-[10%] -right-[50%]` to offset), `relative` desktop
     - `padding: 1px` mobile, `0.5` desktop (the border padding for the gradient frame)
     - `transform: perspective(1800px) rotateX(15deg) rotateY(15deg) rotateZ(-5deg)` (note: different from the bg cards — this is rotated to face the right, not the left)
     - Layers (inside, paint order):
       1. **Outer gradient frame** — `position: absolute; inset: 0; border-radius: 16px; overflow: hidden; background: linear-gradient(45deg, #A281FF 10%, #EB8280 33%, #EBBF9A 66%, #89D0FF 90%)`
       2. **Inner background overlay** — `position: absolute; inset: 1px` mobile, `2px` desktop; `z-index: 10; border-radius: 16px; overflow: hidden; background: linear-gradient(182deg, rgba(24, 83, 117, 0.00) 39.56%, rgba(24, 83, 117, 0.80) 93.99%), …` (this is a blue-to-transparent dark gradient that overlays the image to make the bottom-left text readable)
       3. **The image** — `<img class="relative h-auto rounded-16 overflow-hidden" src="…clutch.jpg">` (fills the card, `rounded-16`)
  2. **Text overlay** (positioned on the bottom-left of the card)
     - `position: relative` mobile, `absolute bottom-0 left-0` desktop
     - `z-index: 1` (above the inner bg but below the gradient frame)
     - `padding-top: 120px; padding-bottom: 70px` mobile, `0` desktop
     - `display: flex; flex-direction: column; gap: 8px`
     - Children:
       1. h2: `font-family: Manuka; font-size: 32px` mobile, `48px` desktop; `font-weight: 400`; `text-transform: uppercase`; `line-height: tighter` — text is "CLUTCH MARKETS"
       2. p (tagline): `max-width: 160px` mobile, `305px` desktop; `font-family: DM Mono`; `font-size: 10px` mobile, `12px` desktop; `line-height: snug`; `text-transform: uppercase`; `letter-spacing: wide` — "DECENTRALIZED PARLAY PLATFORM ON APECHAIN."
       3. **"WHAT'S THIS" link** — same SVG-mask button as the left column. **For the clone:** use the same simple outline button (white text + transparent bg + 1px white border, with a hover that inverts to white bg + black text).

### Background card images
- Card 1: `dashbo.jpg` (608×336)
- Card 2: `opensea.jpg` (608×336)

## States & Behaviors

### State: Page load (initial)
- Static layout. No animations, no scroll triggers.
- Background cards visible (positioned absolutely, peeking from the top edge of the section)

### Behavior: Hover on left column buttons (GET STARTED / GO SPOTLIGHT)
- Original: the SVG mask has hover layers (`hover-effect`, `hover-border`, `hover-border-effect`) that animate in via opacity transition. The label has 2 stacked spans that slide up on hover (one comes from above, one from below).
- **For the clone:** apply `hover:bg-white hover:text-black transition-colors duration-200` — simple inversion. Same for the "WHAT'S THIS" link on the right.

### Behavior: Hover on background cards
- **Original:** none observed. The cards are static.
- **For the clone:** no hover effect. Static.

### Behavior: Responsive
| Viewport | Layout |
|----------|--------|
| < 768px (mobile) | Single column. Text block first, then card stack below. Card is `position: absolute; top: 30%; left: 10%; right: -50%` (overflows the column on the right). Text overlay has `padding-top: 120px; padding-bottom: 70px` to push the text below the image (since the card is offset, the overlay needs explicit padding to land on it). |
| >= 768px (md) | Two columns: text (cols 2-7) + card (cols 9-12). Card is `position: relative; top: auto; left: auto; right: auto` (in-flow). Text overlay is `position: absolute; bottom: 0; left: 0;` and `padding: 0` (lands directly on the card). |
| >= 1024px (lg) | Same as md. |

## Per-State Content (see `src/data/apechain-content.ts` `SPOTLIGHT`)

```ts
SPOTLIGHT = {
  badge: "APECHAIN | SPOTLIGHT",   // (currently rendered as an image at /apechain-spotlight.png)
  headline: "WHERE DAPPS SHINE & YOU WIN",
  paragraphs: [3 strings],
  primaryAction:   { label: "GET STARTED",  href: "/get-started" },
  secondaryAction: { label: "GO SPOTLIGHT", href: "/spotlight"  },
  cardStack: {
    backImages: [dashbo.jpg, opensea.jpg],
    frontImage: clutch.jpg,
    overlay: {
      title: "CLUTCH MARKETS",
      href: "/apps/clutch-market",
      linkLabel: "WHAT'S THIS",
    },
  },
}
```

## Assets

- **Badge image:** `apechain-spotlight.png` (213×38) — the "APECHAIN | SPOTLIGHT" wordmark. **NOT in `public/`** — would need to download. **For the clone:** render the badge text as `<span class="font-mono text-12 uppercase tracking-widest">{badge}</span>` (a stylized text label) since the data file already has the badge string. This is a small visual compromise but avoids adding an asset.
- **Background images:** CTF CDN URLs from `SPOTLIGHT.cardStack.backImages`
- **Foreground image:** CTF CDN URL from `SPOTLIGHT.cardStack.frontImage`
- **Gradient:** the 4-stop linear gradient is hardcoded (matches `GradientBorderFrame` in `src/components/icons.tsx`)

## Text Content (verbatim from live site)

- h2: **Where DApps Shine & You Win** (uppercase via CSS)
- p1: **Spotlight will be broken down into rounds, with each one specifically tailored to the highlighted project(s). This ensures what creators are building is amplified and elevated, while encouraging community participation.**
- p2: **At each round's end, the top APE placements score epic prizes made up of exclusive IRL, holy sh*t experiences and other unforgettable rewards. This system rewards both builders and individual collectors, ensuring engagement at all levels, while offering high-stakes rewards to the most active participants.**
- p3: **Simple, fun, rewarding. Ready to make your mark? 🦍✨**
- Primary button: **Get Started**
- Secondary button: **Go Spotlight**
- Card h2: **Clutch Markets**
- Card p: **Decentralized parlay platform on ApeChain.**
- Card link: **What's this**

The data file (`SPOTLIGHT` in `src/data/apechain-content.ts`) already has all of this.

## Implementation Notes

- Server component is fine (no state, no effects)
- Use `next/image` for the 3 images (1 foreground + 2 background) — mark them `unoptimized` since they're on the CTF CDN (not configured in `next.config.js`)
- Use `GradientBorderFrame` from `@/components/icons` for the card's outer gradient frame (already exists, used the same gradient stops as the original)
- The 3D tilt transforms are inline `style` — acceptable per the handoff rule ("inline styles are only acceptable for dynamically-computed values") because the 3D `transform` string isn't easy to express in Tailwind utilities
- The badge text label uses `font-mono` to match the mono-uppercase-tracked style of the rest of the brand
- Buttons: use a shared `SpotlightButton` sub-component to avoid duplicating the outline-button + hover styles
- `font-display` issue (pre-existing): use `font-heading` (the correct Tailwind utility for the Boldonse variable) — applies to the h2

## Out of Scope

- The original's SVG-mask button (replaced with simple outline buttons)
- The "label slide" hover effect on buttons (replaced with simple bg/text color inversion)
- The `bg-menu-bg-small`-style background image on the badge (replaced with text)
- The `dashbo.jpg` and `opensea.jpg` background cards could be removed entirely if they complicate the layout — but they're in the data and add visual depth, so include them
- The `BackgroundCard` is a server component; no `use client` needed

## Known divergence from Top Nav pattern

Top Nav uses 3 separate component sub-files (TopNav with inline sub-components). Spotlight will use a single file with sub-components at the bottom (like hero-carousel.tsx). The choice is based on file size: spotlight is ~200-300 lines of JSX, splitting into 3 files would be overkill. If a future refactor needs them, splitting is straightforward.
