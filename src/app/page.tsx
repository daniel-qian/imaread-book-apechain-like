// src/app/page.tsx
//
// Landing page composition. Sections are imported individually so they
// can be developed and merged in their own worktrees.

import { HeroCarousel } from "@/components/hero-carousel";

export default function Home() {
  return (
    <main className="relative">
      <HeroCarousel />
    </main>
  );
}
