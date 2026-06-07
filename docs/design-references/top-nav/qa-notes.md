# TopNav — Visual QA Notes

> Generated 2026-06-07 after merging `feature/top-nav` into master at commit `f10752e`.
> Visual verification was done by loading the dev server (`http://localhost:3000/`) and inspecting the rendered DOM + accessibility tree + browser screenshot. The browser tool failed partway through QA (infinite loop in a `console.expression` call wedged the session) so a mobile-viewport screenshot was NOT captured. Desktop was captured.

## What works

- ✅ `npm run build` passes (no new errors; the `Boldonse font override values` warning is pre-existing and not introduced by TopNav)
- ✅ Page renders at `/`, title "APECHAIN — Clone"
- ✅ `<header role="banner">` is the first child of `<body>` (above `<main>`)
- ✅ Desktop (≥768px): logo on the LEFT (`h-12` = 48px tall, ~140px wide at original 140:48 ratio), 4 nav links on the RIGHT (EXPLORE / LEARN / BUILD / BRIDGE) in `font-heading text-[26px] font-medium uppercase leading-[0.785]`
- ✅ Nav link default opacity 60% (matches original)
- ✅ Bottom 1px divider line visible across the full width (`bg-white/20` opacity-20)
- ✅ Nav backdrop is translucent (`bg-ape-dark-navy/40 backdrop-blur-md`) — hero gradient sphere shows through
- ✅ **Logo renders correctly** as "APECHAIN" wordmark in a thin border frame (after the `fill-rule="evenodd"` fix on the border path; see "Bug fixed" below)
- ✅ Hero carousel still works (auto-advance, tabs, LAUNCH, etc.) — nav is layered on top via `z-[99]`
- ✅ A11y tree shows `banner > navigation[aria-label="Primary navigation"] > list > listitem > link` — clean semantic structure
- ✅ Hamburger button is `aria-expanded` + `aria-controls="primary-nav-drawer"` (clickable, screen-reader-friendly)
- ✅ Mobile drawer has `aria-hidden={!isOpen}` so the a11y tree skips it when closed
- ✅ Mobile scrim is rendered as a `<button aria-label="Close menu">` so keyboard users can dismiss

## Bug fixed (pre-existing, surfaced by TopNav)

### `ApechainLogo` border path was rendering as a solid white box

The last `<path>` in `ApechainLogo` (the border frame around the wordmark) was drawn with the default `nonzero` fill-rule. The path traces an outer rectangle clockwise and an inner rectangle clockwise; with `nonzero`, both fill (no subtraction) so the entire 140×48 box is white. The letters inside are also white (`fill="currentColor"`) → invisible.

The original apechain.com SVG has `fill-rule="evenodd" clip-rule="evenodd"` on this path. Our approximation dropped those attributes.

**Fix:** commit `016478d` — add `fillRule="evenodd" clipRule="evenodd"` to the border path. Verified by re-rendering: the wordmark now shows as "APECHAIN" inside a thin frame.

This bug was **pre-existing** in the codebase (introduced when the original `ApechainLogo` was hand-drawn during Phase 1). It only became visible when TopNav rendered the logo on a dark backdrop (white-on-white reads as "empty" / "blank rectangle"). On the lighter sections it would also have looked broken but less obviously so.

## Known gaps (vs. original)

These were called out in the spec; documenting here for completeness.

- **Nav links are `<a>` not `<button>`** — the original used `<button>` (probably to open sub-menus). For the clone we render `<a href>` for direct navigation. The visual is identical; the role/click-behavior differs. If you want sub-menus, this needs a re-spec.
- **The mobile drawer's `bg-menu-bg-small` background image is replaced** with a solid `bg-ape-dark-navy` — we don't have the small mobile menu PNG.
- **Sub-menu behavior on link click is not implemented** — the plus icon next to each drawer link is purely decorative (matches the original's visual contract; the original likely opened a sub-menu but it's not in the SSR HTML).
- **Hero carousel's `font-display` Tailwind class is a dead class** — the real Tailwind utility is `font-heading` (defined in `globals.css` `--font-heading` token). Hero uses `font-display` which doesn't resolve to anything. TopNav correctly uses `font-heading`. Hero is visually wrong because of this but the build still passes (Tailwind doesn't error on unknown classes). Flagged in spec, not fixed (out of scope for TopNav).
- **Dev-only "N" badge** (Next.js dev tools) is visible in the bottom-left of every dev-mode screenshot. Not a bug, just a dev-only artifact.
- **No mobile screenshot** in this folder — the browser tool session died during QA. To capture one manually:
  1. `npm run dev`
  2. Open Chrome DevTools → device toolbar → iPhone 14 Pro (390×844)
  3. Click the hamburger button in the top-left
  4. Save the screenshot here as `mobile-closed.png` and `mobile-open.png`

## Per-state DOM (verified at desktop viewport)

```
header.Header.fixed.z-[99]
  div.bg-ape-dark-navy/40.backdrop-blur-md   ← backdrop
  a[title=Home] > svg.ApechainLogo           ← logo
  nav[aria-label=Primary navigation]
    ul.flex.gap-x-12
      li > a.font-heading.text-[26px].uppercase  × 4  (EXPLORE, LEARN, BUILD, BRIDGE)
  div.bg-white/20.h-px                        ← bottom divider
```

The mobile-only elements (hamburger button, mobile logo link, mobile drawer, mobile scrim) are present in the DOM but rendered as `display: none` by Tailwind at desktop widths. Confirmed by SSR HTML inspection.

## What I would still do (out of scope for this section)

1. **Add a mobile-viewport screenshot** to this folder (see steps above)
2. **Add a desktop-viewport screenshot** (I saw it in the browser_vision response but the file was discarded; capture manually)
3. **Fix hero's `font-display` → `font-heading`** (one-line change, low risk, removes the "dead class" note from the spec)
4. **If you want sub-menus**, re-curl the site (handbook 2026-06-07 in `/tmp/apechain.html` doesn't include them) and add a spec for the dropdown behavior

## Next worktree

`feature/spotlight` — left text + right tilted card stack (no expected blockers; spec template is `hero-carousel.spec.md` and `top-nav.spec.md`).
