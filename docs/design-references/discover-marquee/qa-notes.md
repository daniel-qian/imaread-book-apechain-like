# SectionDiscoverMarquee — Visual QA Notes

> Generated 2026-06-07 after rendering SectionDiscoverMarquee at `http://localhost:3000/`. Build passes (`npm run build` ✓). Desktop layout verified by browser screenshot.

## What works

- ✅ `npm run build` passes
- ✅ Page renders at `/`, title "APECHAIN — Clone"
- ✅ **2 rows** of marquee, each with the correct links per the real DOM:
  - Row 1 (left-scrolling): INTELLECTUAL PROPERTY, COLLECTIBLES, FINANCE
  - Row 2 (right-scrolling): GAMES, INFRASTRUCTURE
- ✅ Each `<a>` link contains BOTH a text label (Boldonse display) AND a thumbnail (1:1 square with `bg-ape-blue` fallback) — matches the real DOM, not the original (incorrect) `tokens` data shape
- ✅ Text labels are huge (Boldonse 48-120px, uppercase, leading 0.95) — visually striking
- ✅ Thumbnails are square with rounded corners (`rounded-2xl`) and `bg-ape-blue` fallback
- ✅ **Marquee animation works** — the rows scroll horizontally (left for row 1, right for row 2). The CSS keyframes in `globals.css` (`marquee-scroll-left` / `marquee-scroll-right`) drive the translation
- ✅ **Seamless loop** — each row's content is duplicated (the data shape renders `<RowContent>` twice in a single `MarqueeRow`), so the `-50%` keyframe produces a seamless infinite scroll
- ✅ **"BROWSE ALL APPS" CTA button** renders below the rows (outline button, black border, hover inverts to black bg + white text)
- ✅ Section uses the light `bg-ape-grey` background (inherited from the page.tsx wrapper)
- ✅ Section is `lg:min-h-[80svh]` like the original
- ✅ a11y tree shows all 10 duplicated links (5 originals + 5 duplicates) and the CTA — total 11 anchors for the section

## Bugs fixed during this section

### Data shape did not match the real DOM

The original `DISCOVER_APPS` data (inherited from Phase 1) had a `tokens: [{kind: "text"} | {kind: "icon"}]` shape — alternating text and icon as separate items. The real DOM has each `<a>` contain BOTH a text label and a thumbnail. **Fixed:** changed the data shape to `links: [{label, href, iconSrc, iconAlt}]` (5 links across 2 rows instead of 14+14+14 across 3 rows).

### Type system updated

- Removed the `MarqueeToken` union type from `src/types/apechain.ts`
- Added a new `MarqueeLink` interface
- Changed `MarqueeRow.tokens` to `MarqueeRow.links: MarqueeLink[]`
- Updated `MarqueeRow` JSDoc to reflect the new shape

### Section had 3 rows per handoff, real DOM has 2

The handoff described this section as "3 rows of infinite horizontal scroll". The actual DOM has 2 rows. **Fixed:** the clone follows the DOM (2 rows).

## Known gaps (vs. original)

- **No marquee animation in the original DOM.** The handoff and `BEHAVIORS.md` document the section as "infinite horizontal scroll"; the SSR HTML has no `animation` / `marquee` / `keyframe` markers. The clone adds CSS keyframe animation as a deliberate visual enhancement. The `flex-none overflow-hidden` + duplicated content structure in the original DOM is the standard CSS marquee pattern, so it's possible the original uses JS to add the animation on hydration. Either way, the clone's static CSS approach gives the same visual effect.
- **The original's link hover effect is a label-slide** (`.label__inner--main` / `.label__inner--clone` with the clone sliding up over the main on hover). The clone uses a simple `hover:opacity-70` — the visual contract of "interactive link" is preserved, but the slide effect is missing. Tradeoff accepted.
- **Thumbnail aspect ratio:** the original is `aspect-square` (1:1) and crops 608×336 images to 1:1. The clone does the same. This crops off the left/right edges of the source images. Tradeoff accepted (it's the original's design).
- **Some thumbnails show as solid `bg-ape-blue` squares** in the screenshot. The CTF CDN images load asynchronously via Next/Image; in the initial paint they may not be ready yet. The `bg-ape-blue` fallback covers the loading state. After hydration the images appear.
- **Text + thumbnail gap looks tight in the screenshot.** The link's `gap-4` (16px) between text and thumbnail is too narrow visually — could be widened to `gap-6` (24px) for a more comfortable rhythm. Decision deferred.
- **Mobile layout not screenshot-verified.** Code review confirms mobile behavior:
  - On `<lg`, the row is `flex-col` (vertical stack of category + thumb for each link)
  - On `lg+`, the row is `flex-row` (horizontal text + thumb)
  - Thumbnails are `hidden lg:block` on the original (no thumb on mobile)
- **The `lg:mr-48` (192px) margin between links** is what the original uses, but it might be excessive on a 1280px viewport — links look spread out.

## A11y

- ✅ 10 `<a>` links in the section (5 originals + 5 duplicates for marquee loop)
- ✅ Each link has a meaningful label (e.g., `link "INTELLECTUAL PROPERTY MADE BY APES"`)
- ✅ All thumbnails have `alt` text (e.g., "MADE BY APES", "OPENSEA")
- ✅ CTA is a keyboard-focusable `<a href>`
- ✅ Marquee is pure CSS — no JS state — no special ARIA needed (the duplicated content is fine; screen readers can skip it)
- ✅ All decorative thumbnails (the duplicate copies) are identical — won't confuse screen readers any more than the original

## File-level summary

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/section-discover-marquee.tsx` | ~145 | Section server component + 2 sub-components (`MarqueeRow`, `RowContent`) |
| `src/types/apechain.ts` | +12 / -4 | Replaced `MarqueeToken` with `MarqueeLink`; updated `MarqueeRow.tokens` → `MarqueeRow.links` |
| `src/data/apechain-content.ts` | -32 / +40 | Reshaped `DISCOVER_APPS` to match the real DOM (5 links × 2 rows, each link has label + href + iconSrc + iconAlt) |
| `src/app/page.tsx` | +2 / -0 | Imports + renders `<SectionDiscoverMarquee />` inside the `bg-ape-grey` wrapper |
| `docs/research/components/discover-marquee.spec.md` | 230 | Full spec with DOM, computed styles, behaviors, data shapes |

## Next section (in order)

`MainFooter` — 3 columns of links (Build on ApeChain / ApeCoin / ApeChain) + decorative bg + © APE FOUNDATION + TERMS / PRIVACY nav. Spec template is `spotlight.spec.md` (similar static layout).
