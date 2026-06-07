# TopNav Specification

> Source: `.Header` (and inner `<nav>`) in `apechain.com` (extracted 2026-06-07, see `docs/research/PAGE_TOPOLOGY.md` §"Global UI Patterns" and the raw DOM in `/tmp/apechain.html` @4752–14231).

## Overview

- **Target file:** `src/components/top-nav.tsx`
- **Screenshot references:** `docs/design-references/top-nav/`
- **Interaction model:** **stateful**. A client component is needed because the mobile hamburger button toggles the side drawer. Desktop is static (no dropdowns observed in the markup — the 4 nav items are buttons with no children).
- **Wiring:** Renders in `src/app/layout.tsx`, ABOVE `<main>`. It is **fixed positioned** and overlays the page, so it must be the first child of `<body>` for the DOM order to be sensible (not strictly required, but conventional).

## Purpose

A persistent top header that:
- Identifies the site (logo, links to `/`)
- Provides primary navigation (4 entries: EXPLORE / LEARN / BUILD / BRIDGE)
- Adapts to mobile with a hamburger button that slides in a side drawer

## DOM Structure (extracted)

```
<header class="Header fixed left-0 top-0 z-[99] flex w-full h-96 md:h-[100px] items-center justify-center p-24">
  <div class="header_background__nr6uZ" />         ← decorative bg (original has blur/translucent fill)
  <button class="absolute top-1/2 -translate-y-1/2 left-24 md:hidden …" id="hamburgerButton">
    <svg> 3 horizontal lines (burger icon) </svg>
  </button>
  <a title="Home" class="relative md:hidden" href="/">
    <svg id="ape-chain-logo" width=140 height=48 …/>
  </a>
  <nav class="-left-full … md:left-0 md:right-0 top-0 z-30 flex w-screen md:flex-row …">
    <div class="hidden md:block fixed inset-0 bg-black/10 pointer-events-none" />  ← mobile scrim (desktop hidden)
    <div class="relative md:absolute p-24 md:p-0 z-10 md:top-32 md:left-32 flex md:block w-full items-center justify-center">
      <button aria-label="Close menu button" class="… md:hidden">  ← mobile-only close (X icon + "Close" text)
        <svg> X icon </svg> <p>Close</p>
      </button>
      <div>
        <a title="Home" tabindex="-1" href="/">  ← desktop logo
          <svg id="ape-chain-logo" …/>
        </a>
      </div>
      <div class="md:hidden m-0 h-[1px] bg-white opacity-20 absolute bottom-0 left-0 right-0" />  ← mobile divider
    </div>
    <ul class="p-24 md:p-0 flex w-full flex-col md:flex-row md:items-center md:justify-center gap-y-36 md:gap-y-0 gap-x-48">
      <li> <button class="… opacity-60 hover:opacity-100"> <h2 class="font-manuka text-64 md:text-26 uppercase">Explore</h2> <plus icon /> </button> </li>
      <li> <button> … <h2>Learn</h2> <plus icon /> </button> </li>
      <li> <button> … <h2>Build</h2> <plus icon /> </button> </li>
      <li> <button> … <h2>Bridge</h2> <plus icon /> </button> </li>
    </ul>
    <div class="hidden md:block … bg-white opacity-20 absolute bottom-0 …" />  ← desktop divider
  </nav>
  <div class="md:hidden … bg-white opacity-20 absolute bottom-0 …" />  ← mobile-only header divider
</header>
```

## Computed Styles (extracted from live site)

### Header container
- `position: fixed`
- `left: 0; top: 0`
- `z-index: 99` (above page content, below modal dialogs)
- `display: flex`
- `width: 100%`
- `height: 96px` mobile, `100px` desktop (Tailwind: `h-96 md:h-[100px]`)
- `align-items: center`
- `justify-content: center`
- `padding: 24px` (`p-24`)
- `color: white` (text on the dark sections — but the nav itself is on the page-level light section, so white works on the light bg too because the nav background fills the row)

### Nav background (`header_background__nr6uZ`)
- The original has a translucent/blurred panel — likely `bg-white/5 backdrop-blur-md` or similar. The exact class is hashed and not extractable from the SSR HTML.
- **For the clone:** use a subtle `bg-ape-dark-navy/40 backdrop-blur-md` so the nav is readable over the hero's bright sphere. The marquee/spotlight/apps sections have a `bg-ape-grey` body, so a translucent dark bar is the most flexible choice.

### Logo (`#ape-chain-logo`)
- An SVG, 140×48px, two `fill="currentColor"` paths
- Used twice in the markup: once for mobile-only, once for desktop-only (so the same SVG renders in both modes but the parent positions differently)
- **Clone decision:** Reuse the existing `ApechainLogo` from `src/components/icons.tsx`. It's a hand-drawn approximation of the original — fits the "Manuka → Boldonse" / "no real Manuka" compromise from the hero.

### Hamburger button (mobile only)
- `md:hidden` — never visible on desktop
- `position: absolute`, `top: 50%`, `-translate-y-1/2`, `left: 24px`
- 3 horizontal lines (32×32 viewBox)
- Hover: `hover:bg-white` (subtle white fill behind the burger)
- The lines hover-color: `hover:stroke-ape-blue` (Tailwind class — on hover the lines go blue)
- `aria-label="Open menu button"`
- `id="hamburgerButton"` (used by JS to toggle state — irrelevant for clone since we manage state via React)

### Close button (mobile drawer only)
- `md:hidden` — only inside the mobile drawer
- `position: absolute`, `top: 50%`, `-translate-y-1/2`, `left: 24px`
- X icon (16×16) + "Close" label (manuka 20px, white, uppercase)
- `aria-label="Close menu button"`

### Nav links (4 × `<li><button>`)
- `font-manuka font-medium leading-[0.785] uppercase`
- `text-64` (64px) on mobile, `text-26` (26px) on desktop
- `color: white`
- Default state: `opacity: 60%`
- Hover/focus: `opacity: 100%`
- `transition-all duration-300`
- **Each is a `<button>`, not an `<a>`** — interesting; the original didn't navigate on click, it likely opened a sub-menu (not observed in SSR HTML). For the clone, render as `<a href={navLink.href}>` for accessibility, and accept the visual change (cursor + role) as an acceptable divergence.

### Plus icon (mobile drawer, next to each link)
- 16×16 SVG with horizontal + vertical lines (the `+` icon)
- `md:hidden` — only in the mobile drawer
- Indicates that tapping a link opens a sub-menu (the original's pattern). For the clone we render it for visual fidelity but it has no click handler.

### Mobile drawer
- `position: fixed`
- `top: 0`
- `-left-full` when closed (off-screen left)
- On open: `left: 0`
- `width: 100vw`, `max-width: 500px` on `sm:`
- `height: 100vh`, `max-height: 100vh`
- `display: flex; flex-direction: column`
- `padding: 24px` (`p-24`)
- Background: a small image `bg-menu-bg-small` with `bg-cover bg-top` (we can substitute a solid `bg-ape-dark-navy`)
- `overflow: scroll` (mobile drawer is scrollable if content overflows)
- `transition-all duration-300 ease-in-out` for the slide

### Scrim (mobile drawer backdrop)
- A black 10% overlay behind the drawer
- `position: fixed; inset: 0; bg-black/10; pointer-events-none` (on desktop `hidden md:block` — visible only on mobile)
- Wait — re-reading: this is `hidden md:block`, which means it's hidden on mobile. That contradicts the "mobile scrim" intuition. **The original likely uses a separate scrim** (not extracted in our scan). For the clone, render a `md:hidden` scrim instead.
- **Clone decision:** Render `<div class="md:hidden fixed inset-0 bg-black/50 z-20" onClick={close}>` behind the drawer; only visible when `isOpen`.

### Divider line (bottom of header)
- A 1px tall bar at the bottom of the header
- `bg-white opacity-20`
- Visible on both mobile and desktop (the markup has it twice — once for the mobile path, once for the desktop path — but both are full-width)

## States & Behaviors

### State: Page load
- `isMenuOpen = false`
- Hamburger visible (mobile), logo visible (both), 4 links visible (desktop)
- Drawer off-screen (`-left-full`)

### Behavior: Click hamburger
- `isMenuOpen = true`
- Drawer slides in from left
- Scrim becomes visible (md:hidden) and tappable
- Body scroll lock is OPTIONAL (not in the original markup) — recommended for better UX

### Behavior: Click close button (X)
- `isMenuOpen = false`
- Drawer slides out

### Behavior: Click scrim (mobile)
- Same as close — `isMenuOpen = false`

### Behavior: Click nav link (mobile drawer)
- The original keeps the drawer open and presumably shows a sub-menu. For the clone: just navigate via `<a href>` and let the link click also close the drawer.
- **Clone decision:** Use `<a>` tags, and on click set `isMenuOpen = false` so the drawer dismisses on link tap.

### Behavior: Click nav link (desktop)
- `<a href>` navigates. No dropdown observed in the markup.
- **Note for future work:** The original likely opens a sub-menu on click (since the items are `<button>` not `<a>`). The clone skips this for now and treats the nav as direct links — call it out in qa-notes.

### Hover state on links
- Default: `opacity: 0.6`
- Hover/focus: `opacity: 1.0`
- `transition-all duration-300`

## Per-State Content (see `src/data/apechain-content.ts` `TOP_NAV`)

```ts
TOP_NAV = {
  logoText: "APECHAIN",
  primaryLinks: [
    { label: "EXPLORE", href: "/explore" },
    { label: "LEARN",   href: "/learn"   },
    { label: "BUILD",   href: "/build"   },
    { label: "BRIDGE",  href: "/bridge"  },
  ],
}
```

> The original used capitalized "Explore / Learn / Build / Bridge" (mixed case) in the DOM. The data file uses uppercase. The Tailwind `uppercase` class on the `<h2>` converts to all caps at render time — so the data file's uppercase form is just a redundant safety net. No change needed.

## Assets

- Logo: `<ApechainLogo />` from `src/components/icons.tsx` (existing, hand-drawn approximation)
- Burger icon: 3-line SVG (32×32). Inline as a React component, or use `Menu` from lucide-react.
- X (close) icon: inline SVG (16×16) — two crossing strokes. Or `X` from lucide-react.
- Plus icon (mobile sub-menu hint): inline SVG (16×16) — `+`. Or `Plus` from lucide-react.

## Text Content (verbatim from live site)

The 4 nav labels: **Explore**, **Learn**, **Build**, **Bridge** (the original used Title Case; the `uppercase` Tailwind class makes them display as ALL CAPS).
The mobile close label: **Close** (also ALL CAPS via the `uppercase` class).
The "Open menu" / "Close menu" aria-labels match the original (`Open menu button`, `Close menu button`).

## Responsive Behavior

| Viewport | Layout |
|----------|--------|
| < 768px (mobile) | Hamburger button left, logo center, no nav links visible. Drawer slides in from left on hamburger click, contains logo + close + 4 link buttons (huge, 64px text). |
| >= 768px (md) | No hamburger. Logo left, 4 nav links right (or centered, depending on flex). Drawer is hidden. |
| >= 1024px (lg) | Same as md, no change. |

### Mobile specifics
- Hamburger button visible
- 4 nav link buttons are **64px** font (`text-64` → 64px Tailwind, but it's used as a class so 64px / 4rem)
- Plus icons next to each link
- The mobile drawer is full-height and scrollable

### Desktop specifics
- No hamburger
- 4 nav link buttons are **26px** font (`text-26`)
- No plus icons
- Nav is `flex-row` with `gap-x-48` (48px gap between links)

## Implementation Notes

- Use `'use client'` directive (hamburger state, body scroll lock)
- Use `useState<boolean>` for `isMenuOpen`
- Use `useEffect` to lock body scroll when `isMenuOpen` is true (set `document.body.style.overflow = "hidden"`)
- For the slide animation, use Tailwind transitions on a single `transform: translateX` value, swapping the `-translate-x-full` / `translate-x-0` class
- For the scrim, use a separate element with `opacity-0` / `opacity-100` transitioned
- The header is `position: fixed`, so add `pt-24` or `pt-28` to `<main>` (in `page.tsx`) to offset the nav height — but actually the hero is `min-h-svh` (1 full viewport) so it already accounts for the nav overlay (the hero starts at the top of the viewport, under the nav). The nav is transparent-ish so this looks right.
- The 4 nav items are `<button>` in the original but render as `<a href>` in the clone — visually identical, but the role changes. Note in qa-notes.
- For Next.js 16 compliance, do NOT use `next/image` for SVG (the logo is inline SVG; using `Image` would require the file as a static import).
- **Turbopack cross-dir symlink pitfall:** do all the worktree dev/build in the main checkout, not the worktree.

## Out of Scope

- Sub-menus when clicking a nav item (the original likely had these but they're not in the SSR HTML — would need a re-curl + DOM walk)
- The `bg-menu-bg-small` image (small mobile menu background PNG) — substitute with a solid `bg-ape-dark-navy`
- The `bg-new-ape-dark-navy` body-level style (the `<main>` already has it; nav doesn't need to set it)
- The body scroll lock only on mobile (apply unconditionally — it's harmless on desktop since the drawer is hidden anyway)
