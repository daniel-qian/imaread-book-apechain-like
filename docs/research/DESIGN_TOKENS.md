# Apechain.com — Design Tokens

> Extracted 2026-06-07 from computed styles via getComputedStyle() at 1280×633.

## Colors

### Surfaces
| Token | Value | Where |
|-------|-------|-------|
| `bg-ape-dark-navy` | `rgb(3, 10, 33)` → **#030A21** | main bg, footer bg |
| `bg-ape-grey` | `rgb(226, 240, 255)` → **#E2F0FF** | hero, spotlight, apps grid, discover bg |
| `body` | `rgb(0, 0, 0)` → **#000000** | outer page bg (body) |
| `loader-overlay` | `rgb(255, 255, 255)` → **#FFFFFF** | initial white overlay (opacity 0 once loaded) |

### Text
| Token | Value | Where |
|-------|-------|-------|
| `text-white` | `#FFFFFF` | hero text, footer text |
| `text-black` | `#000000` | spotlight, apps, discover text (on light bg) |
| `accent-orange` | `rgb(255, ~85, ~50)` | "HOT" badge bg (need exact pixel sample) |

### Buttons / Outlines
| Token | Value | Where |
|-------|-------|-------|
| `border-white` | `#FFFFFF` | launch button border, tab border (active) |
| `launch-btn-bg` | `#FFFFFF` | LAUNCH button bg, "GET STARTED" outline button |
| `btn-text` | `rgb(0, 0, 0)` | LAUNCH button text |
| `tab-shadow-active` | `rgba(255, 255, 255, 0.70)` | active tab glow |
| `outline-btn-border` | `rgb(0, 0, 0)` (transparent on outline variant) | "GET STARTED" / "GO SPOTLIGHT" |

## Typography

| Role | Family (loaded) | Approx. | Size (px) | Weight | Style |
|------|----------------|---------|-----------|--------|-------|
| **Display (h1, big titles)** | `__manuka_3a9134` | **Manuka** (custom, webfont) | 32 / 48 / 120 | 400 (manuka is geometric) | uppercase, line-height 0.78–0.94 |
| Body | `__dmSans_5f9d34` | **DM Sans** (Google Fonts) | 16 | 400 / 500 | normal |
| Mono / button label | `__DM_Mono_cd75b1` | **DM Mono** (Google Fonts) | 12 | 500 | uppercase, letter-spacing 1.2px (tracking-widest) |

> **Manuka** is a custom/paid display font from Pangram Pangram. We'll substitute with **Boldonse** (Google Fonts, very close geometric display feel) or **Manrope** at extreme weight. Decision: **Boldonse** (closest match: similar geometric, similar x-height contrast, free).

### Specific size tokens
- `h1.HOT`: 32px / 35.84px line / uppercase / manuka
- `h2.Slab Cash` (small h2 in nav): 26px / 20.41px / uppercase / manuka weight 500
- `h2.Where DApps Shine` (hero spotlight): **120px / 94.2px** / manuka / uppercase
- `h2.Clutch Markets`: 48px / 37.68px / manuka / uppercase
- `h2.ApeChain Apps`: 32px / 35.84px / manuka / uppercase
- `h4.footer-col`: 26px / uppercase / DM Sans or manuka (need to confirm — extracted only as manuka fallback in scan; will revisit)
- `p` body: 16px / 24px (1.5) or 20.8px (1.3) — two different body styles
- `a` button: 12px / DM Mono / weight 500 / uppercase / letter-spacing 1.2px

## Spacing

| Token | Value | Use |
|-------|-------|-----|
| `px-container` | 28.44px (px-7 ≈ 1.78rem) | horizontal page padding |
| `gap-grid-x` | 12px (mobile) / 48px (md+) | grid column gap |
| `py-96` | 96px | section vertical padding |
| `pb-44` | 44px | hero bottom padding |
| `gap-64` | 64px | discover flex column gap |
| `gap-32` | 32px | grid vertical gap (apps section) |

## Radii

| Token | Value | Use |
|-------|-------|-----|
| `rounded-8` | 8px | small thumbnails, button border radius |
| `rounded-16` | 16px | large card border radius (icons, cards) |

## Borders & Shadows

- Tab active state: `border-2 border-white shadow-[0_0_24px_0_rgba(255,255,255,0.70)]`
- Tab inactive: `border-2 border-transparent shadow-[0_0_0_0_rgba(255,255,255,0.70)]`
- 64×64 icon button: `border-radius: 16px`, no fill, white border

## Layout

- Grid: **12 columns on desktop** (md:), **6 columns on mobile**
- Container: full-width with 28.44px horizontal padding
- Hero is **min-h-svh** (1 small viewport height) — fills first viewport
- Apps grid uses **md:place-items-baseline** for vertical alignment

## Animations / Transitions

- Tab button: `transition-all duration-300 ease-in-out` (border + shadow swap)
- Card hover (likely): scale + glow (need to verify on hover)
- Marquee: infinite horizontal scroll, pure CSS keyframes (animation details to capture next pass)
- Hero 3D canvas: cursor-move, draggable
