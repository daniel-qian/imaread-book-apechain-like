# SectionDiscoverMarquee Specification

> Source: `.SectionDiscoverApps` in `apechain.com` (extracted 2026-06-07, raw DOM in `/tmp/apechain.html` @91299–98704). See `docs/research/PAGE_TOPOLOGY.md` §4.

## Overview

- **Target file:** `src/components/section-discover-marquee.tsx`
- **Screenshot references:** `docs/design-references/discover-marquee/`
- **Interaction model:** **CSS keyframe marquee** (infinite horizontal scroll). The original DOM has no `animation` / `@keyframes` / `marquee` markers, but the `flex-none overflow-hidden` + `flex` structure is the standard pattern for CSS marquee, and the handoff documents the section as "infinite horizontal scroll". The clone adds the CSS keyframe animation to match the visual contract.
- **Wiring:** Renders in `src/app/page.tsx`, **inside the `bg-ape-grey text-black` wrapper**, **below** `<SectionAppsGrid />`.

## What the original actually is (vs. handoff's "3 rows of marquee" guess)

The handoff described this section as "3 rows of infinite horizontal scroll, tokens mix text labels with icon images, animate-marquee-left/right". **The actual structure is 2 rows of static links**, not 3, and not animated in the SSR HTML:

| Row | Categories (real DOM order) |
|-----|------------------------------|
| 1   | Intellectual Property, Collectibles, Finance |
| 2   | Games, Infrastructure |

**5 categories total, no GAMES repeated across rows.** The data file (`DISCOVER_APPS` in `src/data/apechain-content.ts`) has 3 rows of `[text, icon, text, icon, ...]` alternating tokens, which **does not match the real DOM** — it's a 14+14+14 list of text/icon tokens designed for marquee animation, but the original site actually shows 5 distinct categories (one per `<a>` link) split across 2 rows.

**The clone:**
- Updates the data shape to `{ rows: [{ direction, speed, links: [{label, href, iconSrc, iconAlt}] }] }` — matches the real DOM
- Renders each link as `<a>` with both a text label AND a thumbnail (matches DOM)
- Adds CSS marquee animation to scroll each row (the visual contract from handoff)
- This is a **deliberate divergence from a literal DOM reproduction** in favor of a more visually interesting section. The data shape matches DOM, the layout matches DOM, only the motion is added.

If you want a strictly-static clone (no animation), the CSS is one line to remove.

## DOM Structure (extracted, simplified)

```
<section class="SectionDiscoverApps relative flex flex-col gap-64 py-96 lg:min-h-[80svh] text-black">
  <div class="col-start-1 col-span-12 my-auto flex flex-col gap-64 lg:gap-96">
    <div class="flex flex-col items-center discover-apps_groups">
      <div class="flex overflow-hidden my-4 lg:my-16 discover-apps_group">  ← ROW 1
        <div class="flex-none flex flex-col lg:flex-row items-center lg:items-baseline gap-8 lg:gap-0 discover-apps_duplicatedGroup">
          <a class="flex-none inline-flex flex-row items-center gap-16 lg:mr-48 discover-apps_categoryLabel" href="/apps?f=intellectual-property">
            <span class="block label relative overflow-hidden">
              <span class="label__inner label__inner--main">Intellectual Property</span>
              <span aria-hidden="true" class="label__inner label__inner--clone absolute top-full left-0 size-full text-ape-blue">Intellectual Property</span>
            </span>
            <span class="relative hidden lg:block aspect-square rounded-16 bg-ape-blue overflow-hidden discover-apps_thumb">
              <img class="absolute inset-0 size-full object-cover" src=".../apeChain-thumbnail-608x336-MadeByApes.jpg"/>
            </span>
          </a>
          <a class="..." href="/apps?f=collectibles">  ← NEXT LINK ... </a>
          <a class="..." href="/apps?f=finance">  ← NEXT LINK ... </a>
        </div>
      </div>
      <div class="flex overflow-hidden my-4 lg:my-16 discover-apps_group">  ← ROW 2
        <div class="flex-none flex flex-col lg:flex-row items-center lg:items-baseline gap-8 lg:gap-0 discover-apps_duplicatedGroup">
          <a class="..." href="/apps?f=games">  ← Games link </a>
          <a class="..." href="/apps?f=infrastructure">  ← Infrastructure link </a>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <a class="UIBtn UIBtn_big UIBtn_secondary font-mono font-medium text-12 uppercase tracking-widest" href="/apps">BROWSE ALL APPS</a>  ← CTA
    </div>
  </div>
</section>
```

## Computed Styles (extracted from live site)

### Section container
- `position: relative`
- `display: flex; flex-direction: column; gap: 64px; padding-block: 96px; min-height: 80svh` (lg+)
- `text-black` (the section is on the light `bg-ape-grey` background)
- `color: black` for all text

### Row container (`.discover-apps_group`)
- `display: flex; overflow: hidden; margin-block: 16px` (mobile), `64px` (desktop)
- `flex` row of categories that gets clipped on the sides

### Inner group (`.discover-apps_duplicatedGroup`)
- `display: flex; flex-direction: column` (mobile), `row` (lg+)
- `align-items: center` (mobile), `baseline` (lg+)
- `justify-content: center` (mobile), `start` (lg+)
- `gap: 8px` (mobile), `0` (lg+) — the `lg:gap-0` is intentional so the link's own internal `gap-16` (between text and thumb) is the spacing
- `flex: none` — doesn't shrink; this is the "infinite scroll content"

### Category link (`.discover-apps_categoryLabel`)
- `<a class="flex-none inline-flex flex-row items-center gap-16 lg:mr-48">`
- `display: inline-flex; flex-direction: row; align-items: center; gap: 16px`
- `margin-right: 48px` (lg+) — spacing between links
- Children:
  1. **Text label** — a `<span class="block label relative overflow-hidden">` containing two `<span>`s:
     - `.label__inner--main` — the default state (black text)
     - `.label__inner--clone` (aria-hidden) — `.absolute top-full left-0 size-full text-ape-blue` — sits below the main, slides up on hover for a marquee effect
  2. **Thumbnail** — `<span class="relative hidden lg:block aspect-square rounded-16 bg-ape-blue overflow-hidden">` containing an `<img class="absolute inset-0 size-full object-cover">`. Hidden on mobile (`.hidden lg:block`), so on mobile only the text label is shown.
     - The thumbnail is `aspect-square` (1:1) with `rounded-16` and a `bg-ape-blue` fallback
     - The image is 608×336 (landscape, not square — but the container is `aspect-square` so the image gets cropped to 1:1)

### Text label typography
- Family: Manuka (Boldonse in clone)
- Size: ~120px (manuka 120px on desktop; need to verify with viewport screenshots)
- `text-transform: uppercase; line-height: tighter`
- The clone uses `font-heading text-[clamp(80px,9vw,120px)] uppercase leading-[0.95]` to match

### CTA button ("BROWSE ALL APPS")
- `font-mono font-medium text-12 uppercase tracking-widest leading-none`
- Original uses the same SVG-mask secondary button style as the Spotlight section
- **For the clone:** use a simple outline button (border-2 black, hover inverts), same as Spotlight's "Get Started" buttons

## Marquee animation (clone decision)

The original DOM has no animation markers. The clone adds CSS keyframe animation because:
1. The handoff documents the section as "infinite horizontal scroll"
2. The `flex-none overflow-hidden` + duplicated content is the standard marquee pattern
3. A static section looks lifeless and the visual contract is "active marquee"

**Keyframe (already in `globals.css`):**

```css
@keyframes marquee-scroll-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}
.animate-marquee-left  { animation: marquee-scroll-left  40s linear infinite; }
.animate-marquee-right { animation: marquee-scroll-right 50s linear infinite; }
```

**Seamless loop technique:** the marquee content is **duplicated** in the DOM (e.g., row 1 has links A, B, C, then again A, B, C). The keyframe translates from `0%` to `-50%` (i.e., exactly one copy's width). When the animation restarts, the user can't see the seam because the second copy is now at position 0. This is the standard CSS marquee pattern.

**Speed:** use 40s for one direction, 50s for the other (already in globals.css). Slight speed difference makes the two rows feel intentionally out of sync.

**Pause on hover:** the original's hover effect is on the link (label slide + glow), not the marquee. We don't pause the marquee on row hover — let it keep scrolling.

## Per-State Content (see `src/data/apechain-content.ts` `DISCOVER_APPS`)

**Current data shape (incorrect, doesn't match DOM):**
```ts
{ rows: [{ direction, speed, tokens: [{kind: "text", label} | {kind: "icon", src, alt}] }] }
```

**New data shape (matches DOM):**
```ts
{ rows: [{ direction, speed, links: [{label, href, iconSrc, iconAlt}] }] }
```

**New data (5 categories, 2 rows):**
```ts
{
  rows: [
    {
      direction: "left",
      speed: "default",
      links: [
        { label: "INTELLECTUAL PROPERTY", href: "/apps?f=intellectual-property", iconSrc: ".../MadeByApes.jpg", iconAlt: "MADE BY APES" },
        { label: "COLLECTIBLES",         href: "/apps?f=collectibles",          iconSrc: ".../opensea.jpg",    iconAlt: "OPENSEA" },
        { label: "FINANCE",              href: "/apps?f=finance",               iconSrc: ".../OpenOcean.jpg",   iconAlt: "OPENOCEAN" },
      ],
    },
    {
      direction: "right",
      speed: "default",
      links: [
        { label: "GAMES",          href: "/apps?f=games",          iconSrc: ".../Otherside.jpg", iconAlt: "OTHERSIDE" },
        { label: "INFRASTRUCTURE", href: "/apps?f=infrastructure", iconSrc: ".../Alchemy.jpg",   iconAlt: "ALCHEMY" },
      ],
    },
  ],
  cta: { label: "BROWSE ALL APPS", href: "/apps" },
}
```

**Type changes needed in `src/types/apechain.ts`:**
- `MarqueeRow.tokens: Array<{kind, ...}>` → `MarqueeRow.links: Array<{label, href, iconSrc, iconAlt}>`
- Remove the `MarqueeToken` type (replaced by `MarqueeLink`)

## Assets

- 5 thumbnails (CTF CDN URLs, 608×336, displayed in 1:1 cropped squares)
- All 5 are in the current `DISCOVER_APPS` data — just need to be re-grouped under `links[].iconSrc`

## Text Content (verbatim from live site)

- 5 category labels (Title Case in DOM, uppercase via CSS): Intellectual Property, Collectibles, Finance, Games, Infrastructure
- CTA: "BROWSE ALL APPS"

## Implementation Notes

- Server component is fine (CSS-only animation, no JS state)
- Each row's content is **duplicated** in the render (the same links twice) to enable the seamless CSS marquee loop. Use a `RowContent` sub-component to avoid JSX duplication.
- Use `next/image` for the 5 thumbnails (`unoptimized` for CTF CDN)
- Apply the appropriate marquee class based on `row.direction`:
  - `direction: "left"` → `animate-marquee-left`
  - `direction: "right"` → `animate-marquee-right`
- The thumbnail `aspect-square rounded-16 bg-ape-blue` wrapper matches the original's `bg-ape-blue` fallback. On the light section bg, the blue thumb bg is visible if the image hasn't loaded yet.
- The 3 inline `<a>` per row have `lg:mr-48` for spacing (48px right margin)
- The CTA button uses the same `SpotlightButton` pattern from `section-spotlight.tsx` — but it's not exported. **Decision:** inline a simple `<a>` with the same classes (or extract `OutlineButton` to a shared component later)
- The hover label slide effect on each link is replaced with a simpler `hover:opacity-80` — matches the visual contract of "interactive category link"
- Use `font-heading` (not the dead `font-display`) for the category labels

## Out of Scope

- The original's exact hover label slide (the marquee "label__inner--main" / "label__inner--clone" mechanism) — replaced with simple opacity change on hover
- Pixel-perfect sizing of the 120px Manuka labels — clone uses `clamp(80px, 9vw, 120px)` which adapts
- The CTA button's SVG mask (same 7-layer pattern as Spotlight) — replaced with simple outline
- A real "re-curl" of the site to see if there's a JS marquee driver — we accept CSS keyframes as the visual contract

## Known divergence from handoff

- **3 rows vs. 2 rows:** the handoff says 3 rows; DOM has 2 rows. We follow DOM.
- **Tokens (text/icon alternating) vs. links (combined text+icon):** the handoff and current data file model the row content as a list of alternating text labels and icon images. The actual DOM has each `<a>` contain BOTH a text label and a thumbnail. We restructure the data shape to match.
- **No animation in original:** the handoff and `BEHAVIORS.md` document the section as "infinite horizontal scroll"; the DOM has no animation markers. We add CSS keyframe animation as a deliberate visual enhancement.
