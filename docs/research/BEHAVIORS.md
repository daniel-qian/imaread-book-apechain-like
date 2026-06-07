# Apechain.com — Behavior Sweep

> Interactive behaviors extracted during scroll/click/hover pass at 1280×633. This is the **single source of truth** for what changes when the user does something — the "feel" of the site.

## B1. Hero Carousel — Tab Click

- **Trigger:** click any of the 5 thumbnail buttons (48×48) at bottom of hero
- **Effect:** main panel swaps to that dApp's hero image, title, tagline. Active thumbnail gains white border + white glow. Inactive thumbnails lose the border (transition 300ms ease-in-out).
- **Mechanism:** React state (likely `useState<number>` for active index). No URL hash. No localStorage.
- **Initial state:** OTHERSIDE is active by default.
- **Auto-advance:** **Not confirmed** — to verify with a 10-second wait test.

## B2. Hero Carousel — Arrow Buttons

- **Trigger:** click the up/down 64×64 white-bordered circle buttons (right side of hero)
- **Effect:** cycles through the 5 apps (up = next? or random?). To verify.
- **Note:** Two buttons, vertical stack. Both unlabeled (icon-only).

## B3. Spotlight Section — Static + Scroll

- **Trigger:** scroll into the spotlight section
- **Effect:** no interactivity. The two tilted cards on the right (DashBo + OpenSea) are static images with CSS rotate transform. The Clutch Markets h2 overlay is also static.
- **Hover:** buttons ("GET STARTED", "GO SPOTLIGHT") likely have hover state (border darken, fill in). To verify.

## B4. Apps Grid — Card Hover

- **Trigger:** hover over an app card
- **Effect:** (assumed) scale-up + glow + ‹ › chevron appear. To verify.
- **Click:** navigates to /apps/{slug}

## B5. Discover Apps — Infinite Marquee

- **Trigger:** page load (autostart)
- **Effect:** 3 rows of category text scroll left continuously, at different speeds.
- **Mechanism:** CSS keyframes `transform: translateX(-N%)` with `animation-timing-function: linear; animation-iteration-count: infinite`. To verify exact speed and whether the rows alternate direction.
- **Items:** INTELLECTUAL PROPERTY / COLLECTIBLES / FINANCE / GAMES / INFRASTRUCTURE (5 categories), with icon embedded mid-text in some rows.

## B6. Footer — Static

- **Trigger:** none
- **Effect:** 3 columns of links. ©APE FOUNDATION. WebGL canvas above the text (background).

## B7. Hero 3D Scene — Drag (Canvas)

- **Trigger:** mousedown + drag on hero center
- **Effect:** 3D scene rotates (cursor changes to move; touch-pan-y enabled)
- **Out of scope** for the clone (we'll replace with static image).

## B8. Initial White Loader Overlay

- **Trigger:** page load
- **Effect:** a white div covers the entire viewport (`fixed inset-0 z-50 bg-white`), text "APECHAIN" or similar (need to extract), fades out (or already at opacity 0) once scene loads. We can omit this from the clone (just start with content visible).

## Responsive

| Breakpoint | Hero grid | Apps grid | Discover |
|------------|-----------|-----------|----------|
| < 768px (mobile) | 6-col, single column card stack | probably 2-col | probably stacked, no marquee or slower |
| >= 768px (md) | 12-col, side-by-side | 12-col grid | horizontal marquee |
| >= 1024px (lg) | 12-col, full layout | 12-col grid | 3-row marquee |

**Need to capture** mobile (390px) and tablet (768px) screenshots and CSS — to be done in next pass.

## What This Means for Implementation

- The hero carousel is the **most behavior-rich component** — needs React state, transition CSS, and the 5-item content data shape.
- Spotlight is mostly static layout work.
- Apps grid is mostly static layout work.
- Discover marquee is a single CSS keyframe rule (worth learning once, then reuse).
- Footer is layout + a static WebGL bg we'll replace with gradient.
