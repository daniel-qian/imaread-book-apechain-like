// src/components/section-discover-marquee.tsx
//
// "Discover Apps" — 2 rows of horizontal marquee showing 5 categories
// (Intellectual Property, Collectibles, Finance, Games, Infrastructure).
// Mirrors the .SectionDiscoverApps markup from apechain.com (see
// docs/research/components/discover-marquee.spec.md for full spec).
//
// The original DOM has no animation markers, but uses the standard
// `flex-none overflow-hidden` + duplicated content pattern for CSS marquee.
// The clone adds CSS keyframe animation (the keyframes are already defined
// in globals.css: marquee-scroll-left / marquee-scroll-right).
//
// Server component — no state, no effects. Pure CSS marquee.

import Image from "next/image";
import { DISCOVER_APPS } from "@/data/apechain-content";
import type { MarqueeLink, MarqueeRow } from "@/types/apechain";
import { cn } from "@/lib/utils";

export function SectionDiscoverMarquee() {
  return (
    <section
      className={cn(
        "SectionDiscoverApps relative flex flex-col",
        "gap-16 py-24 md:py-24 lg:min-h-[80svh]",
        "text-black overflow-hidden"
      )}
    >
      {/* Rows container */}
      <div className="my-auto flex flex-col gap-16 lg:gap-24">
        {DISCOVER_APPS.rows.map((row, i) => (
          <MarqueeRow key={i} row={row} />
        ))}
      </div>

      {/* CTA button — "BROWSE ALL APPS" */}
      <div className="flex justify-center">
        <a
          href={DISCOVER_APPS.cta.href}
          className={cn(
            "group inline-flex items-center gap-2",
            "px-6 py-3 rounded-2",
            "border-2 border-black text-black",
            "font-mono text-[12px] font-medium uppercase tracking-widest",
            "transition-colors duration-200",
            "hover:bg-black hover:text-white"
          )}
        >
          {DISCOVER_APPS.cta.label}
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components
/* ------------------------------------------------------------------ */

function MarqueeRow({ row }: { row: MarqueeRow }) {
  // The marquee content is duplicated so the CSS keyframe can translate
  // from 0% to -50% for a seamless loop.
  return (
    <div className="flex overflow-hidden my-4 lg:my-16">
      <div
        className={cn(
          "flex-none flex flex-col lg:flex-row",
          "items-center lg:items-baseline",
          "justify-center lg:justify-start",
          "gap-2 lg:gap-0",
          row.direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        )}
      >
        {/* First copy of the links */}
        <RowContent links={row.links} />
        {/* Second copy — enables seamless loop with the -50% keyframe */}
        <RowContent links={row.links} />
      </div>
    </div>
  );
}

function RowContent({ links }: { links: MarqueeLink[] }) {
  // A single copy of the row's content. Two copies are rendered in MarqueeRow
  // for the marquee loop. The visual contract is: text label (huge) +
  // thumbnail (square, blue bg fallback), inline.
  return (
    <>
      {links.map((link) => (
        <a
          key={link.label + link.href}
          href={link.href}
          className={cn(
            "flex-none inline-flex flex-row items-center",
            "gap-4 lg:mr-12",
            "transition-opacity duration-200",
            "hover:opacity-70"
          )}
        >
          {/* Text label — huge Manuka-style, uppercase */}
          <span
            className={cn(
              "block relative",
              "font-heading text-[clamp(48px,8vw,120px)]",
              "font-normal uppercase",
              "leading-[0.95]",
              "text-black"
            )}
          >
            {link.label}
          </span>

          {/* Thumbnail — square, blue bg fallback, hidden on mobile */}
          <span
            className={cn(
              "relative hidden lg:block",
              "aspect-square w-[clamp(48px,8vw,120px)]",
              "rounded-2xl overflow-hidden",
              "bg-ape-blue"
            )}
          >
            <Image
              src={link.iconSrc}
              alt={link.iconAlt}
              fill
              sizes="120px"
              className="object-cover"
              unoptimized
            />
          </span>
        </a>
      ))}
    </>
  );
}
