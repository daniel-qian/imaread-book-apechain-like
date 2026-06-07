# SectionSpotlight — Visual QA Notes

> Generated 2026-06-07 after rendering SectionSpotlight at `http://localhost:3000/` and verifying the desktop layout. Build passes (`npm run build` ✓). Mobile layout is verified by code review (not screenshot — see "Mobile QA" below).

## What works

- ✅ `npm run build` passes (no new warnings; the pre-existing `Boldonse font override values` warning is unchanged)
- ✅ Page renders at `/`, title "APECHAIN — Clone"
- ✅ Hero is unchanged (auto-advance still works; nav is layered on top)
- ✅ **Spotlight section background is `bg-ape-grey` (light blue, #E2F0FF)** — matches the original site's `landing-page` wrapper
- ✅ Section heading hierarchy: "APECHAIN | SPOTLIGHT" badge text → "WHERE DAPPS SHINE & YOU WIN" h2 → 3 paragraphs → 2 outline buttons
- ✅ h2 typography: Boldonse (`font-heading`) 56/120px, uppercase, leading 0.85-0.95 — close to Manuka's geometric look
- ✅ Body copy: DM Sans 14/16px, leading-snug, dark grey readable on light bg
- ✅ GET STARTED + GO SPOTLIGHT buttons: outline style with `border-2 border-black text-black`, hover inverts to `bg-black text-white`. Matches the visual contract of "outline button on light section"
- ✅ **2 background tilted cards** (Dashbo + OpenSea) visible peeking from the top of the section, both with the `perspective(800px) rotateX(7.5deg) rotateY(-15deg) rotateZ(2.5deg)` 3D tilt
- ✅ **Foreground Clutch Markets card** rendered with the gradient border frame (`GradientBorderFrame` from `src/components/icons`), tilted at `perspective(1800px) rotateX(15deg) rotateY(15deg) rotateZ(-5deg)`, blue-to-transparent overlay gradient for text readability
- ✅ Card text overlay: "CLUTCH MARKETS" h3 (Boldonse 32/48px) + tagline (DM Mono 10/12px) + "WHAT'S THIS" outline button (white-on-dark variant for the dark card)
- ✅ Section uses `min-h-svh` (1 viewport) like Hero
- ✅ Hero stays in the dark section, Spotlight in the light section — no global bg bleed

## Bugs fixed during QA

### Spotlight section was on the wrong (dark) background

The first render of the section had `bg-ape-dark-navy` (from the `<body>` style in `layout.tsx`) bleeding through. The original apechain.com wraps the light sections (Spotlight, Apps Grid, Discover) in `<div class="landing-page bg-ape-grey text-black">` so they sit on a separate light background while the Hero stays dark.

**Fix:** wrapped `<SectionSpotlight />` in a `<div className="bg-ape-grey text-black">` in `src/app/page.tsx`. Future light sections (Apps Grid, Discover) should go inside the same wrapper (or a new one) so the page background is correct.

```tsx
<main className="relative">
  <HeroCarousel />            {/* dark section */}
  <div className="bg-ape-grey text-black">   {/* light section wrapper */}
    <SectionSpotlight />
    {/* future: <AppsGrid />, <DiscoverApps /> */}
  </div>
  {/* future: <MainFooter />  — dark, outside the wrapper */}
</main>
```

## Known gaps (vs. original)

These are deliberate simplifications, documented in `spotlight.spec.md`.

- **Badge is text, not image.** The original uses `/apechain-spotlight.png` (a 213×38 "APECHAIN | SPOTLIGHT" wordmark). We don't have that asset and downloading creates a copyright risk the user doesn't want, so we render the badge string as a `font-mono` text label. **Visual gap:** the original is a designed wordmark; the clone is a plain text label. Tradeoff accepted.
- **Buttons are simple outline, not the original's SVG-mask style.** The original's buttons have an elaborate 7-layer SVG mask (feGaussianBlur + radial gradient + echo-border + hover label slide). The clone uses a 1-line outline button with bg/text inversion on hover. **Visual gap:** the original's buttons are animated and eye-catching; the clone's are static and minimal. Tradeoff accepted (clone is cleaner / more accessible).
- **Background cards are dimmed with `bg-black/15`.** The original has no overlay; the cards are full brightness. We added a 15% black overlay so the bg cards don't visually fight the foreground card. **Tradeoff:** slightly more muted, easier to scan. Can be removed (set overlay to transparent) if you want the original's punch.
- **Foreground card "CH" text visible in the bottom-right.** The clutch.jpg image has "CH" baked into the right edge. The original's layout has the same artifact (it's a feature of the source image, not a rendering bug). Noting it here in case you think it's an issue.
- **Mobile layout is not screenshot-verified.** Code review confirms the responsive behavior (text block first, card overflows to the right on mobile with `pt-32 pb-16` for the text overlay; desktop uses `absolute bottom-6 left-6 right-6`). To verify visually:
  1. `npm run dev`
  2. Chrome DevTools → device toolbar → iPhone 14 Pro (390×844)
  3. Scroll to the Spotlight section
  4. Save the screenshot here as `mobile.png`

## A11y

- ✅ Section is `<section>` with no explicit `aria-label` (semantic from context within `<main>`)
- ✅ h2 + h3 use correct heading levels (h2 for the main headline, h3 for the card title)
- ✅ All links are `<a href>` with text labels
- ✅ Background cards have `alt=""` (decorative)
- ✅ Foreground card has `alt={SPOTLIGHT.cardStack.overlay.title}` ("Clutch Markets")

## File-level summary

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/section-spotlight.tsx` | ~230 | Section server component + 3 sub-components (`BackgroundCard`, `TiltedCard`, `SpotlightButton`) |
| `src/app/page.tsx` | +6 / -1 | Wraps `<SectionSpotlight />` in `bg-ape-grey text-black` div |
| `docs/research/components/spotlight.spec.md` | 230 | Full spec with DOM, computed styles, behaviors, data shapes |

## Next section (in order)

`SectionGridCarousel` / "ApeChain Apps" — h2 + "SEE ALL APPS" link + 14-card grid (3 visual variants). Most visually rich section. Spec template is `hero-carousel.spec.md` / `top-nav.spec.md` / `spotlight.spec.md`.
