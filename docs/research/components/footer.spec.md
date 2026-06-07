# MainFooter Specification

## Overview

- **Target file:** `src/components/main-footer.tsx`
- **Source DOM:** `<footer class="MainFooter relative text-white">` in `/tmp/apechain.html`
- **Interaction model:** static (no scroll/click behavior). Links have a hover-slide animation (UILink inner+clone pattern) — for now we ship a simple `hover:underline` to match the consistent simplification used by Spotlight/AppsGrid/DiscoverMarquee. A `TODO: SVG-mask hover` is noted in the qa-notes.
- **Position in page:** OUTSIDE the `<div class="bg-ape-grey text-black">` wrapper. Original structure: `<div class="landing-page bg-ape-grey text-black">` (Spotlight + AppsGrid + DiscoverMarquee) followed by `<footer class="MainFooter">` as a sibling.

## DOM Structure (extracted from /tmp/apechain.html)

```html
<footer class="MainFooter relative text-white">
  <div class="absolute size-full user-select-none pointer-events-none">
    <canvas class="pointer-events-none absolute h-full w-full"></canvas>   <!-- decorative WebGL sphere -->
  </div>
  <picture class="absolute w-full bottom-0">                                  <!-- decorative bg strip -->
    <source media="(min-width:985px)" srcSet="/footer-bg.webp" type="image/webp"/>
    <source media="(max-width:985px)" srcSet="/footer-bg-mobile.webp" type="image/webp"/>
    <source media="(min-width:985px)" srcSet="/footer-bg.png" type="image/png"/>
    <source media="(max-width:985px)" srcSet="/footer-bg-mobile.png" type="image/png"/>
    <img src="/footer-bg.png" alt="Apechain" class="size-full object-cover"/>
  </picture>

  <div class="pt-48">                                                        <!-- main content wrapper -->
    <div class="flex flex-col md:flex-row md:gap-x-24 md:justify-end
                px-24 md:px-32 pb-22 md:pb-18
                pt-88 md:pt-80 sm:pt-160 sm:pb-18 sm:px-32">
      <div class="gap-16 md:w-cols-2 md:gap-0 mb-24 md:mb-0">
        <h4 class="mb-22 text-26 text-white font-manuka font-normal uppercase leading-[1]">
          Build on ApeChain
        </h4>
        <nav aria-label="Footer navigation links">
          <ul class="space-y-8 md:space-y-16">
            <li class="group"><a ...>Docs</a></li>
            <li class="group"><a ...>Mainnet Hub</a></li>
            <li class="group"><a ...>Testnet Hub</a></li>
            <li class="group"><a ...>Block Explorer</a></li>
            <li class="group"><a ...>Ape Portal</a></li>
          </ul>
        </nav>
      </div>
      <!-- 2 more columns: "ApeCoin" (3 links), "ApeChain" (6 links) — same structure -->
    </div>

    <div class="w-full aspect-[3.8]">                                        <!-- decorative band: empty canvas placeholder above bottom row -->
      <canvas class="pointer-events-none absolute w-full px-18 md:px-0 aspect-[9/3] -translate-y-[10%]"></canvas>
    </div>

    <div class="flex flex-col-reverse md:flex-row items-center justify-between
                px-24 md:px-32 pb-22 md:pb-18 pt-24 sm:pb-18 sm:px-32">
      <span class="mt-16 md:mt-0 block uppercase font-mono text-10 md:text-12
                   leading-[14px] tracking-wide text-white">
        © 2026 Ape Foundation
      </span>
      <nav aria-label="Footer navigation links">
        <ul class="flex space-x-16 relative">
          <li class="group">
            <a class="... mr-8 after:absolute after:-top-[1px] after:-right-14
                      after:content-['|'] after:text-white"
               href="/terms-of-service">Terms of Service</a>
          </li>
          <li class="group">
            <a class="..." href="/privacy-notice">Privacy Notice</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</footer>
```

## Computed Styles (target — what we're emulating)

### Container (`<footer>`)
- `position: relative`
- `color: text-white` (white text on dark)
- `width: 100%` of viewport
- **Background color:** original is `bg-ape-dark-navy` (per handoff note + project token). We use that token for the body of the footer, since we don't have `footer-bg.webp` / `footer-bg-mobile.webp`.

### Decorative band (between columns and bottom row)
- `width: 100%`
- `aspect-ratio: 3.8 / 1` (mobile) / `9 / 3` (md+) — emulated as a tall empty gradient band
- Originally contains a WebGL canvas — we replace with a CSS gradient sphere (same approach as Hero's gradient sphere)

### Bottom row
- Flex, `flex-col-reverse` on mobile (legal links above copyright) / `flex-row` on md+
- `align-items: center`, `justify-content: space-between`
- `padding: 24px 32px 18px 32px` (md) / `24px 32px 18px 32px` (sm)
- Copyright: `font-mono text-10 md:text-12 leading-[14px] tracking-wide uppercase text-white`
- Legal links: `font-mono text-10 md:text-12 leading-[14px] tracking-wide uppercase text-white`
  - Between the two legal `<a>`s: a `|` divider (DOM uses `::after` with `content: '|'`, positioned `right: -14px`)
  - First legal link has `mr-8` to make room for the divider

### Columns
- Layout: `flex flex-col md:flex-row md:gap-x-24 md:justify-end`
- Padding: `px-24 md:px-32 pt-88 md:pt-80 sm:pt-160 pb-22 md:pb-18`
- Each column: `md:w-cols-2` (Tailwind config: 2/12 of container width on desktop)
- Column heading: `text-26 font-manuka font-normal uppercase leading-[1] mb-22 text-white`
- Column link list: `space-y-8 md:space-y-16`
- Column links: `font-mono text-12 leading-[14px] tracking-wide uppercase text-white block`
  - `hover:` state uses the UILink inner+clone slide animation in the original; for now we use `hover:underline` (consistent with the other 4 sections)

## Text Content (verbatim from DOM)

### Column 1: "Build on ApeChain"
- Docs → `https://docs.apechain.com/`
- Mainnet Hub → `https://apechain.hub.caldera.xyz/`
- Testnet Hub → `https://curtis.hub.caldera.xyz/`
- Block Explorer → `https://apescan.io`
- Ape Portal → `https://github.com/yuga-labs/ape-portal-public`

### Column 2: "ApeCoin"
- Discord → `https://discord.gg/apecoindao`
- Twitter / X → `https://x.com/apecoin`
- Otherside Calendar → `https://othersidecalendar.apechain.com/`

### Column 3: "ApeChain"
- Bridge → `/portal#bridge`
- Relay Bridge → `/relay-bridge`
- The Blueprint → `/the-blueprint`
- Telegram → `https://t.me/apechainofficial`
- Twitter / X → `https://x.com/ApeChainHUB`
- Brand Kit → `https://live.standards.site/apechain/`

### Bottom row
- Copyright: `© 2026 Ape Foundation`
- Legal link 1: `Terms of Service` → `/terms-of-service`
- Legal link 2: `Privacy Notice` → `/privacy-notice`

## Assets

- **No images to download.** `footer-bg.webp` and `footer-bg-mobile.webp` are not used — we substitute `bg-ape-dark-navy` for the footer body.
- **Decorative WebGL canvas** → replaced with a CSS gradient sphere (`bg-gradient-radial from-ape-purple/40 via-ape-magenta/20 to-transparent`). Same approach as Hero's gradient sphere.

## Page Assembly

In `src/app/page.tsx`:

```tsx
<main className="relative">
  <HeroCarousel />
  <div className="bg-ape-grey text-black">
    <SectionSpotlight />
    <SectionAppsGrid />
    <SectionDiscoverMarquee />
  </div>
  <MainFooter />          {/* NEW: dark footer, OUTSIDE the light wrapper */}
</main>
```

## Responsive Behavior

- **Desktop (≥ 768px / md):** 3 columns laid out in a flex row, right-justified, each `w-cols-2` (1/6 width). Bottom row: copyright left, legal links right. Decorative band: `aspect-[9/3]`.
- **Mobile (< 768px):** columns stack vertically with `mb-24` between them. Bottom row reverses (`flex-col-reverse`) so legal links appear above copyright. Decorative band: `aspect-[3.8]`.

## Open Simplifications (consistent with other sections)

- **No SVG-mask button hover** — replaced with `hover:underline` (matches Spotlight/AppsGrid/DiscoverMarquee). If the user wants the original UILink slide animation, that's ~50 lines of nested `<span>` markup.
- **No `footer-bg.webp` image** — replaced with solid `bg-ape-dark-navy`.
- **No WebGL canvas** — replaced with a CSS gradient sphere.
