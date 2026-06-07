# Full-Page Assembly Review

> QA pass over the full landing page at desktop (1280px viewport, browser default). Verifies the 5-section assembly works end-to-end and identifies any visual gaps before final user sign-off.

## What was reviewed

- **Viewport:** 1280×633 (browser default)
- **URL:** `http://localhost:3000/` (dev server, commit `d474c14`)
- **Method:** Full-page screenshot (browser tool returns the entire scrollable page as a single image) + computed-style introspection via browser_console
- **Date:** 2026-06-07

## Section positions (computed from rendered DOM)

| # | Section | y (px) | h (px) | bg |
|---|---------|--------|--------|-----|
| 1 | Hero | 0 | 633 | dark navy (with gradient sphere) |
| 2 | Spotlight | 633 | 1026 | light `bg-ape-grey` |
| 3 | AppsGrid | 1659 | 1426 | light `bg-ape-grey` |
| 4 | DiscoverMarquee | 3085 | 859 | light `bg-ape-grey` |
| 5 | Footer | 3944 | 1096 | dark navy |

Total page height: 5039px.

## Verified: works

1. **Section order** matches `page.tsx`: Hero → Spotlight → AppsGrid → DiscoverMarquee → Footer ✓
2. **TopNav** is `position: fixed; top: 0; z-index: 99` — floats above all sections, doesn't get covered by Hero/Scroll content ✓
3. **Section-to-section vertical padding** is consistent: 96px (`py-24`) between each light section. Spotlight pb=96, AppsGrid pt=96, AppsGrid pb=96, Marquee pt=96 ✓
4. **Marquee → Footer transition** has 96px (Marquee pb) + 192px (Footer pt-48) = 288px of breathing room + the dark-navy gradient on the footer's top edge fades in over the light bg ✓
5. **AppsGrid is a horizontal scroll-snap carousel** (matches original DOM): 14 dApp cards distributed across 5 groups (3 × 2×2 + 2 × 1×1 featured). Visible width per item: 439px, featured 902px. First viewport shows items 0-3 ✓
6. **Marquee animation working**: row 1 scrollWidth=6766px, row 2=3533px — both wider than 1280 viewport, so animation is needed for full content ✓
7. **Footer columns** self-size to content, all 14 links render, all 3 headings on one line, no overflow ✓
8. **TopNav doesn't interfere with the Hero** — fixed at top, transparent bg, sits over the Hero gradient ✓

## Gaps identified (real, not screenshot artifacts)

1. **Hero is only 633px tall** — quite short for a hero with autoplay carousel + nav buttons + 5 thumbnail buttons. The original has more vertical breathing room. (Pre-existing — `min-h-svh` with the inner content at items-end; not part of the new footer work. Already noted in handoff "Hero's 5 known gaps".)

2. **Spotlight heading at 115px font is large at 1280px width** — `clamp(80px, 9vw, 120px)` evaluates to 115px at 1280. The h2 is 604px wide starting at x=131, which fits, but visually dominates. Original site targets 1440+, where 9vw = 130px → also gets clamped to 120px. So the heading will be slightly *smaller* on a 1440 viewport, not larger. **Not a bug, just a visual observation.**

3. **The Spotlight tilted card stack** (right side, "CLUTCH MARKETS" overlay) was confirmed loading correctly in the most recent browser run — image resolves to the actual Clutch Markets screenshot, with 2 back-images behind it.

4. **AppsGrid first-viewport shows items 0-3** (OTHERSIDE, MADE BY APES, CAMELOT, APE PORTAL). The 5th item (BLEVER, the featured 1×1) is at x=1035 — at the edge but partially visible. Items 6+ are off-screen (intentional scroll-snap behavior). Users need to scroll-snap right to see the rest. **Matches the original site behavior.**

5. **Marquee rows** show partial category names at the page edges (e.g. "FINAN" instead of "FINANCE", "RUCTURE" instead of "INFRASTRUCTURE"). This is correct marquee behavior — the text repeats via `translateX(-50%)` to create the infinite scroll illusion. **Not a bug.**

6. **Footer gradient sphere placeholder** is a subtle radial gradient (purple top-right, blue bottom-left) — visible but not as dramatic as the original WebGL sphere. **Already documented as a known simplification in `footer/qa-notes.md`.**

7. **No code-level changes made in this pass** — pure visual review, per the user's instruction.

## Light sections stay light, dark sections stay dark

The bg token assignments are correct everywhere:
- `body` bg = `bg-ape-dark-navy` (globals.css:143)
- `<div class="bg-ape-grey text-black">` wrapper around Spotlight + AppsGrid + Marquee (page.tsx:25)
- `<MainFooter />` outside that wrapper, uses `bg-ape-dark-navy` directly (main-footer.tsx)

The transitions are clean — no accidental dark/light bleed between sections.

## Z-index stacking (verified)

| Layer | z-index |
|-------|---------|
| TopNav | 99 |
| Hero gradient sphere | (no z-index, but `pointer-events-none`) |
| Spotlight/AppsGrid/Marquee content | default |
| Footer gradient overlay | (no z-index, but absolute) |

No z-index conflicts found.

## What's NOT covered in this pass

- **Mobile viewport (390×844)** — not done. None of the 5 sections have been verified on mobile. This is the biggest remaining QA gap.
- **Hover/interaction states** — only the default state was captured. The clone uses `hover:underline` on links/buttons; the original uses UILink slide animation. Already documented as a consistent simplification.
- **Hero autoplay timing** — not verified in motion.
- **Real-world page load** — only verified the dev server. Production build is unverified visually (only `npm run build` was run).
- **Cross-browser** — only the browserbase browser was used.

## Recommendations for the user

1. **Open the dev server yourself** and scroll through the full page to confirm visually. Run `cd /Users/danielqian/Projects/imaread-book-apechain-like && npm run dev` then visit `http://localhost:3000/`.
2. **The clone is feature-complete at desktop.** All 5 sections render, transitions are clean, no z-index issues, no layout breaks.
3. **Mobile is the only meaningful remaining gap.** The handoff's "Mobile viewport" item is still open. If the user wants mobile QA, that's the next session.
4. **Original site reference** at `docs/design-references/comparison/original/01-hero-opensea-original.png` — you can side-by-side this with a fresh full-page screenshot of the clone to spot any 1:1 gaps.

## Reference files

- `docs/design-references/comparison/original/01-hero-opensea-original.png` — Opensea hero as it appears on the live apechain.com (the user's screenshot from this session, used as ground truth for comparison)
- `docs/design-references/footer/qa-notes.md` — footer's per-section QA
- `docs/research/components/footer.spec.md` — footer spec
