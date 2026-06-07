# Apechain.com — Page Topology

> Captured 2026-06-07 from https://apechain.com/ at 1280×633 viewport (browser default desktop).
> Document height: ~3748px scrollHeight. Built with Next.js 14+ (App Router, _next/static/css).

## High-Level Structure

```
<main class="relative bg-new-ape-dark-navy">       ← dark navy background, #030A21
  <div class="fixed inset-0 z-50 bg-white">        ← white screen / loader? opacity 0 (hidden)
  <div class="landing-page bg-ape-grey text-black"> ← light blue content area, #E2F0FF
    <canvas class="fixed top-0 left-0 w-screen min-h-screen" />  ← fixed WebGL background glow
    <section.SectionHomepageHero>                  ← HERO: poster carousel (5 apps)
    <section.SectionSpotlight>                     ← SPOTLIGHT: "Where DApps Shine & You Win"
    <section.SectionGridCarousel>                  ← APPS GRID: "ApeChain Apps" cards
    <section.SectionDiscoverApps>                  ← MARQUEE: infinite horizontal scroll
  </div>
</main>
<footer class="MainFooter relative text-white">    ← dark footer
  <canvas />  <picture /> (footer-bg)  <div.pt-48> (3 columns + copyright)
</footer>
```

## Section Breakdown (top to bottom)

| # | Section | Y range | Height | BG | Layout | Notes |
|---|---------|---------|--------|-----|--------|-------|
| 1 | **Hero (HomepageHero)** | 0 – 633 | ~633 (1 svh) | transparent over WebGL canvas | 12-col grid, items-end | Carousel of 5 dApp cards (OTHERSIDE / ApeChurch / OpenSea / Clutch Market / Slab Cash), with HOT/tab title/subtitle/launch/see-all-apps, ‹ › arrow buttons, and 5 thumbnail tab buttons (48×48) at bottom-center |
| 2 | **Spotlight** | ~870 – 1500 | ~630 | light blue (#E2F0FF) | 2-col on desktop | Left: 1 big bold h2 "Where DApps Shine & You Win" (120px manuka) + 3 paragraphs + 2 outline buttons. Right: tilted card stack of 2 images with "CLUTCH MARKETS" overlay. |
| 3 | **Apps Grid (GridCarousel)** | ~1500 – 2400 | ~900 | light blue | 12-col grid | "ApeChain Apps" h2 + "SEE ALL APPS ▶" link, then 3-row grid of app cards (varying widths). Each card: dark gradient bg + category badge (top-left) + app name (manuka) + tagline + ‹ › on hover. |
| 4 | **Discover Apps (marquee)** | ~2400 – 2900 | ~500 | light blue | flex column, gap-64, 80svh | 3 rows of infinite horizontal scrolling big text (manuka 120px) — Categories with icon inserted mid-text. "BROWSE ALL APPS" button centered below. |
| 5 | **Footer** | ~2900 – 3748 | ~850 | dark navy/black | flex column | Top: full-bleed WebGL canvas (752h) + footer-bg.png bottom strip. Content: 3 column lists (Build on ApeChain / ApeCoin / ApeChain) + © APE FOUNDATION + TERMS / PRIVACY links. |

## Hero Carousel — Internal State

The hero is a **tab-driven carousel of 5 apps**, NOT a generic image slider:

```
5 active items, each with:
  - thumbnail image (44×44, 4:3 cropped) → drives tab button (border + glow on active)
  - hero image (displayed in main panel, full-height, 3D-rendered scene)
  - title (e.g., "OTHERSIDE")
  - category tag (e.g., "GAMES")
  - tagline (e.g., "WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN")
  - launch link (CTA button)
  - "SEE ALL APPS" link
```

| # | App | Category | Tagline |
|---|-----|----------|---------|
| 1 | OTHERSIDE | GAMES | Web3-enabled virtual worlds on ApeChain |
| 2 | ApeChurch | GAMES | (varies) |
| 3 | OpenSea | FINANCE / collectibles | (varies) |
| 4 | Clutch Market | GAMES, FINANCE | Decentralized parlay platform on ApeChain |
| 5 | Slab Cash | FINANCE | RWA platform built for the EVM, with support for ApeChain |

Tab interaction: clicking a thumbnail swaps the hero panel content. No autoplay confirmed yet (to be tested). 2 arrow buttons on the right (64×64, white border, no fill) act as prev/next.

## Global UI Patterns

- **WebGL canvas** (5 total): full-viewport fixed glow + per-section 3D backgrounds. **All 5 use WebGL2**. Hero's main canvas has `cursor-move select-none touch-pan-y` → draggable 3D scene.
- **Smooth scroll**: not confirmed (need to check for `.lenis` or scroll-snap).
- **Top nav**: fixed? No, appears in document flow at top of main. Contains 4 menu buttons (EXPLORE/LEARN/BUILD/BRIDGE) + Home logo on left.
- **No dark/light mode toggle** observed.

## What's Static vs. Animated

| Surface | Type | Tech |
|---------|------|------|
| Hero main image | WebGL 3D scene | Canvas + WebGL2, draggable |
| Background glow | WebGL | Canvas + WebGL2, fixed |
| Spotlight card stack | Static images, CSS transform rotate | PNG + transform: rotate(...) |
| Apps grid cards | Static images | PNG, hover scale + border glow |
| Discover marquee | CSS keyframes translateX | Inline CSS animation |
| Footer bg | WebGL | Canvas + WebGL2 |

## What This Means for the Clone

The WebGL 3D scenes (hero, footer) are **the single most expensive thing to clone** — they're likely custom Three.js / R3F scenes. The clone will replace them with **static hero images + a fallback gradient sphere** rather than rebuilding the 3D pipeline. This is acceptable per the "mock data for demo purposes" scope, but should be called out as a known gap in the QA report.
