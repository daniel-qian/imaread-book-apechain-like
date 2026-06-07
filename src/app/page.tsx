// src/app/page.tsx
//
// Landing page composition. Sections are imported individually so they
// can be developed and merged in their own worktrees.
//
// Section order (top to bottom):
//   1. HeroCarousel      (done: feature/hero-carousel)
//   2. SectionSpotlight  (done: feature/spotlight)
//   3. SectionGridCarousel / AppsGrid     (TODO)
//   4. SectionDiscoverApps / Marquee       (TODO)
//   5. MainFooter                          (TODO)

import { HeroCarousel } from "@/components/hero-carousel";
import { SectionSpotlight } from "@/components/section-spotlight";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero is on a dark canvas; everything below sits on the
          landing-page light background (matches the original site's
          <div class="landing-page bg-ape-grey text-black"> wrapper). */}
      <HeroCarousel />
      <div className="bg-ape-grey text-black">
        <SectionSpotlight />
      </div>
    </main>
  );
}
