# MainFooter — QA Notes

## Status: ✅ Shipped

Last verified on master after commit (this section). Footer renders all 3 columns + bottom legal row, builds clean, no TS errors.

## What was built

- **Component:** `src/components/main-footer.tsx`
- **Wired into:** `src/app/page.tsx` (OUTSIDE the `bg-ape-grey` light wrapper, as `<MainFooter />` after `</div>`)
- **Spec:** `docs/research/components/footer.spec.md`
- **Data:** `FOOTER` in `src/data/apechain-content.ts` (text casing updated to match the live DOM — column headings + copyright use CSS `uppercase`, not pre-uppercased in data)

## What works (verified visually in browser)

- ✅ Dark navy background (`bg-ape-dark-navy`)
- ✅ Subtle radial gradient (purple top-right + blue bottom-left) as placeholder for the WebGL sphere
- ✅ 3 columns of links right-justified on desktop:
  - Build on ApeChain (5 links): Docs / Mainnet Hub / Testnet Hub / Block Explorer / Ape Portal
  - ApeCoin (3 links): Discord / Twitter / X / Otherside Calendar
  - ApeChain (6 links): Bridge / Relay Bridge / The Blueprint / Telegram / Twitter / X / Brand Kit
- ✅ All 3 column headings render on a single line at desktop width
- ✅ All 14 link labels render with no overflow
- ✅ Column gap is reasonable (12 on md, 16 on lg)
- ✅ External links get `target="_blank" rel="noopener noreferrer"`
- ✅ Internal links get neither target nor rel
- ✅ Decorative band area (empty div with `aspect-[3.8]`/`aspect-[3]`) reserves the original's space
- ✅ Bottom row: copyright on left, legal links on right
- ✅ "© 2026 Ape Foundation" rendered with `text-[10px] md:text-[12px] font-mono uppercase tracking-wide`
- ✅ "Terms of Service" + "|" + "Privacy Notice" rendered (the `|` is a `::after` pseudo-element)
- ✅ `border-t border-white/10` separates the bottom row from the decorative band area
- ✅ Mobile layout: columns stack vertically (`flex-col` on mobile), bottom row reverses (`flex-col-reverse` → legal links above copyright)

## Known gaps (consistent simplifications, same as other 4 sections)

1. **No WebGL canvas** — replaced with a CSS radial gradient. Original has a 3D sphere rendered to canvas. If the user wants the actual sphere, spike with `prototype` skill + `@react-three/drei`.
2. **No `footer-bg.webp` / `footer-bg-mobile.webp`** — replaced with solid `bg-ape-dark-navy` + subtle gradient overlay. The original has a decorative bottom strip image.
3. **No UILink inner+clone slide animation** — replaced with `hover:underline` (matches Spotlight/AppsGrid/DiscoverMarquee). The original is a 7-layer SVG-mask hover that slides a clone label up over the original. ~50 lines of nested `<span>` markup to add if the user wants it.
4. **No mobile QA screenshot** — desktop only verified. Mobile responsiveness uses standard Tailwind breakpoints (`md:`, `lg:`) so it should work, but the dev server wasn't resized to iPhone 14 Pro in this session.
5. **The `|` separator between the two legal links is subtle** — the `::after` pseudo renders at `-right-1` with `text-white/40`. The original DOM uses `right-14` (56px to the right, between the links). My version is more compact; visually it works but is a bit close to the link text. Low priority.

## Build status

```
✓ Compiled successfully in 1980ms
✓ TypeScript clean
✓ Generating static pages (4/4)
Route (app)
┌ ○ /
└ ○ /_not-found
```

Pre-existing warning (not a regression): `Failed to find font override values for font 'Boldonse'`. Same as the 4 prior section commits.

## Visual reference

A full footer screenshot was captured during this session (see chat history). Key visual checks:
- Footer starts ~`pt-48` below the previous section (the gradient bleed-through provides a soft transition)
- 3 columns right-justified with a clear gap to the page right edge
- Empty dark band area between columns and bottom row (decorative placeholder)
- Bottom legal row separated by a subtle `border-t border-white/10`

## Open issues for the user

- Want the actual 3D sphere instead of the CSS gradient? → `prototype` skill + drei spike
- Want the original UILink slide hover? → add nested `<span class="UILink_inner__ubTi9"><span class="innerLabel--main">...</span><span class="innerLabel--clone">...</span></span>` per link
- Want the `footer-bg.webp` asset downloaded? → not in Contentful CDN; would need to fetch from `apechain.com/footer-bg.webp` and add to `public/`

## Per-component gotchas (for next session)

- `w-cols-2` in the spec was a doc error (column width was never a Tailwind utility). The component uses `md:shrink-0` and lets the columns self-size to content, which matches the original's `flex md:justify-end` behavior.
- `font-manuka` in the spec was also a doc error (no such class exists). Component uses `font-heading` (the Boldonse variable).
- The footer body is `bg-ape-dark-navy` — the pre-existing token in `globals.css:45` (`/* main bg, footer */`) confirms the color was already chosen for this use case.
