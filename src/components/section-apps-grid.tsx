// src/components/section-apps-grid.tsx
//
// "ApeChain Apps" — horizontal scroll-snap carousel of 14 dApp cards.
// Mirrors the .SectionGridCarousel markup from apechain.com (see
// docs/research/components/apps-grid.spec.md for the full spec).
//
// The original is a horizontal slider with 5 "pages" (groups):
//   Group 1: 4 standard cards (2x2)
//   Group 2: 1 featured card  (1x1) — BLEVER
//   Group 3: 4 standard cards (2x2)
//   Group 4: 4 standard cards (2x2)
//   Group 5: 1 featured card  (1x1) — ORMI
//
// Server component. The scroll-snap behavior is native CSS (no JS state).
// No prev/next buttons — the original has none; users swipe or scroll.

import Image from "next/image";
import { Play, Rocket } from "lucide-react";
import { APP_CARDS } from "@/data/apechain-content";
import type { AppCard } from "@/types/apechain";
import { cn } from "@/lib/utils";

// Hard-coded group partitioning (see spec "Group partitioning" section).
// Each entry: { cards, layout: "2x2" | "1x1" }.
const GROUPS: Array<{ cards: AppCard[]; layout: "2x2" | "1x1" }> = [
  { cards: APP_CARDS.slice(0, 4), layout: "2x2" },   // otherside, made-by-apes, camelot, ape-portal
  { cards: APP_CARDS.slice(4, 5), layout: "1x1" },   // blever (FEATURED)
  { cards: APP_CARDS.slice(5, 9), layout: "2x2" },   // ape-express, apescan, clutch-market, gtrade
  { cards: APP_CARDS.slice(9, 13), layout: "2x2" },  // openocean, cyan, apechain-news, mintpad
  { cards: APP_CARDS.slice(13, 14), layout: "1x1" }, // ormi (FEATURED)
];

export function SectionAppsGrid() {
  return (
    <section
      className={cn(
        "SectionGridCarousel relative grid",
        "grid-cols-6 md:grid-cols-12",
        "md:place-items-baseline",
        "gap-x-2 gap-y-8 md:gap-x-6",
        "py-24 md:py-24",
        "overflow-hidden"
      )}
    >
      {/* Header row: rocket icon + h2 (left) + See All Apps link (right) */}
      <div
        className={cn(
          "col-start-1 col-span-6",
          "md:col-start-2 md:col-span-8",
          "flex flex-row items-baseline gap-2"
        )}
      >
        <Rocket className="size-8 text-black" strokeWidth={2} />
        <h2
          className={cn(
            "font-heading text-[32px] md:text-[40px]",
            "font-normal uppercase",
            "leading-tight"
          )}
        >
          ApeChain Apps
        </h2>
      </div>

      <div
        className={cn(
          "col-start-1 col-span-6",
          "md:col-start-10 md:col-span-2",
          "flex items-end justify-start md:justify-end",
          "pb-1 md:pb-0"
        )}
      >
        <a
          href="/apps"
          className={cn(
            "group inline-flex items-center gap-1.5",
            "font-mono text-[12px] font-medium uppercase",
            "tracking-widest leading-tight",
            "text-black transition-opacity duration-200",
            "hover:opacity-60"
          )}
        >
          See All Apps
          <Play
            className="size-3 fill-black transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={0}
          />
        </a>
      </div>

      {/* Slider track: 5 groups, scroll-snap horizontally */}
      <div
        className={cn(
          "col-start-1 col-span-6",
          "md:col-start-2 md:col-span-10",
          "w-full"
        )}
      >
        <div
          className={cn(
            "flex flex-row flex-nowrap",
            "overflow-x-auto",
            "snap-x snap-mandatory",
            "scroll-smooth",
            "gap-2 md:gap-6",
            // Hide the scrollbar (but keep it functional)
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
        >
          {GROUPS.map((group, gi) => (
            <div
              key={gi}
              className={cn(
                "snap-center shrink-0",
                "w-full",
                "md:max-w-[902px]",
                group.layout === "2x2"
                  ? "md:grid md:grid-cols-2 md:grid-rows-2 md:gap-6"
                  : "md:grid md:grid-cols-1 md:gap-6"
              )}
            >
              {group.cards.map((card) => (
                <AppCardLink key={card.slug} card={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components
/* ------------------------------------------------------------------ */

function AppCardLink({ card }: { card: AppCard }) {
  return (
    <a
      href={card.href}
      className={cn(
        "group block",
        "transition-transform duration-300 ease-out",
        "hover:scale-[1.02] hover:-translate-y-0.5"
      )}
    >
      <div
        className={cn(
          "relative flex flex-col gap-2 md:gap-6"
        )}
      >
        {/* Image preview with gradient background fallback */}
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-lg",
            "bg-gradient-to-br",
            card.gradient
          )}
        >
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Category pill(s) — top-left */}
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
            {card.categories.map((cat) => (
              <CategoryPill key={cat} label={cat} />
            ))}
          </div>
        </div>

        {/* Card name + tagline */}
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-heading text-[28px] md:text-[40px]",
              "font-normal uppercase",
              "leading-[0.95]",
              "text-black"
            )}
          >
            {card.name}
          </h3>
          <p
            className={cn(
              "font-mono text-[12px] uppercase leading-snug",
              "text-black/80"
            )}
          >
            {card.tagline}
          </p>
        </div>
      </div>
    </a>
  );
}

function CategoryPill({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-1 rounded-md",
        "bg-white/90 text-black",
        "font-mono text-[10px] font-medium uppercase tracking-wider",
        "leading-none backdrop-blur-sm"
      )}
    >
      {label}
    </span>
  );
}
