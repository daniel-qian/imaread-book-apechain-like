// src/app/page.tsx
//
// Landing page composition. Sections are imported individually so they
// can be developed and merged in their own worktrees.
//
// Section order (top to bottom):
//   1. HeroCarousel
//   2. SectionSpotlight
//   3. SectionAppsGrid
//   4. SectionDiscoverMarquee
//   5. MainFooter (dark, OUTSIDE the bg-ape-grey light wrapper —
//                 matches the original site's <footer.MainFooter> position)

import { HeroCarousel } from "@/components/hero-carousel";
import { SectionSpotlight } from "@/components/section-spotlight";
import { SectionAppsGrid } from "@/components/section-apps-grid";
import { SectionDiscoverMarquee } from "@/components/section-discover-marquee";
import { MainFooter } from "@/components/main-footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero is on a dark canvas; everything below sits on the
          landing-page light background (matches the original site's
          <div class="landing-page bg-ape-grey text-black"> wrapper). */}
      <HeroCarousel />
      <div className="bg-ape-grey text-black">
        <SectionSpotlight />
        <SectionAppsGrid />
        <SectionDiscoverMarquee />
      </div>
      {/* Dark footer sits OUTSIDE the light wrapper per the original. */}
      <MainFooter />
    </main>
  );
}
