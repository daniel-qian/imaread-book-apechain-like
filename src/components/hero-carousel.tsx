"use client";

// src/components/hero-carousel.tsx
//
// Carousel of 5 hero dApp cards. Mirrors the layout, typography, and tab
// interaction from apechain.com. The 3D WebGL background is replaced by a
// CSS gradient sphere placeholder (see globals.css `.hero-sphere`).
//
// Interaction model: time-driven (auto-advance) + click-driven (tab + skip +
// play/pause). The active tab's progress bar grows 0 → 1 over AUTOPLAY_MS,
// then advances to the next item.

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Pause, Play, SkipForward, ArrowUpRight, Flame } from "lucide-react";
import { HERO_ITEMS } from "@/data/apechain-content";
import type { HeroItem } from "@/types/apechain";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5_000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 for the active tab
  const startRef = useRef<number>(performance.now());

  const goTo = useCallback((idx: number) => {
    setActive(((idx % HERO_ITEMS.length) + HERO_ITEMS.length) % HERO_ITEMS.length);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  const advance = useCallback(() => {
    setActive((a) => (a + 1) % HERO_ITEMS.length);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  // rAF loop drives the progress bar
  useEffect(() => {
    if (paused) return;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(p);
      if (p >= 1) {
        advance();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, active, advance]);

  // When paused, freeze the progress at its current value
  useEffect(() => {
    if (!paused) {
      // Reset the clock so the animation continues smoothly
      startRef.current = performance.now() - progress * AUTOPLAY_MS;
    }
  }, [paused, progress]);

  const item = HERO_ITEMS[active];

  return (
    <section
      className={cn(
        "relative min-h-svh w-full overflow-hidden",
        "grid grid-cols-6 md:grid-cols-12 gap-x-3 md:gap-x-12",
        "px-7 md:px-7 pb-11 items-end",
        "text-white"
      )}
    >
      {/* Background gradient sphere (placeholder for the original WebGL canvas) */}
      <div
        aria-hidden
        className="hero-sphere absolute inset-0 -z-10"
      />

      {/* Right-side round controls (PAUSE + SKIP) — md+ only */}
      <div className="hidden md:flex absolute right-7 top-1/3 z-20 flex-col gap-2">
        <RoundIconButton
          ariaLabel={paused ? "Resume autoplay" : "Pause autoplay"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <Play className="size-5 fill-white" /> : <Pause className="size-5 fill-white" />}
        </RoundIconButton>
        <RoundIconButton
          ariaLabel="Skip to next"
          onClick={advance}
        >
          <SkipForward className="size-5 fill-white" />
        </RoundIconButton>
      </div>

      {/* Text stack (left half on desktop, top on mobile) */}
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-5 z-10 flex flex-col gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded",
              "bg-ape-orange text-white text-[12px] font-bold leading-none uppercase"
            )}
          >
            <Flame className="size-3 fill-white" />
            HOT
          </span>
          <span className="font-mono text-[12px] font-medium uppercase tracking-widest text-white/70">
            {item.category}
          </span>
        </div>
        <h2 className="font-display text-[64px] md:text-[clamp(80px,9vw,140px)] uppercase leading-[0.78] tracking-tight">
          {item.title}
        </h2>
        <p className="font-mono text-[12px] md:text-[14px] uppercase tracking-widest max-w-[340px] text-white/85">
          {item.tagline}
        </p>
        <div className="mt-4 flex items-center gap-6">
          <a
            href={item.launchHref}
            className={cn(
              "group inline-flex items-center gap-2",
              "bg-white text-black rounded-2 px-6 py-3",
              "font-mono text-[12px] font-medium uppercase tracking-widest",
              "transition-colors duration-200 hover:bg-ape-grey"
            )}
          >
            LAUNCH
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Hero image (right half) — replaces the 3D WebGL scene.
          The outer wrapper has a `key={active}` so React remounts it
          on slide change, retriggering the fade-in animation. */}
      <div className="col-start-1 col-span-6 md:col-start-7 md:col-span-6 z-0 relative aspect-[4/3] md:aspect-auto md:h-full">
        <div
          key={active}
          className="absolute inset-0 overflow-hidden rounded-2 animate-[hero-fade-in_500ms_ease-out]"
        >
          <Image
            src={item.heroImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            unoptimized
          />
          {/* Bottom-up darken gradient so the text remains readable on light images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
      </div>

      {/* Right-side column: "SEE ALL APPS" link + tab buttons row.
          Original: <div class="pointer-events-auto col-start-1 md:col-start-8
          col-span-8 md:col-span-4 w-full flex flex-col gap-16
          items-center md:items-end justify-end text-right pb-4 md:pb-0
          mt-48 md:mt-0"> — right-aligned on desktop, centered on mobile. */}
      <div className="pointer-events-auto col-start-1 md:col-start-8 col-span-8 md:col-span-4 w-full flex flex-col gap-16 items-center md:items-end justify-end text-right pb-4 md:pb-0 mt-48 md:mt-0">
        <a
          href="/apps"
          className={cn(
            "inline-flex items-center gap-2",
            "font-mono text-[12px] font-medium uppercase tracking-widest text-white",
            "hover:opacity-80 transition-opacity"
          )}
        >
          See All Apps
          <Play className="size-3 fill-white" strokeWidth={0} />
        </a>

        <div className="flex gap-8">
          {HERO_ITEMS.map((it, i) => (
            <TabButton
              key={it.slug}
              item={it}
              active={i === active}
              // Show progress only on the active tab. When not active, show 0.
              progress={i === active ? progress : 0}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components
/* ------------------------------------------------------------------ */

function RoundIconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "size-16 rounded-2 grid place-items-center",
        "bg-transparent border-2 transition-colors duration-200",
        "hover:bg-white/10"
      )}
      style={{
        borderImage: "linear-gradient(135deg, #A281FF 0%, #EB8280 33%, #EBBF9A 66%, #89D0FF 100%) 1",
      }}
    >
      {children}
    </button>
  );
}

function TabButton({
  item,
  active,
  progress,
  onClick,
}: {
  item: HeroItem;
  active: boolean;
  progress: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show ${item.title}`}
      aria-pressed={active}
      className={cn(
        // Original: "transition-all duration-300 ease-in-out relative
        // rounded-8 overflow-hidden size-48 border-2 ..."
        "transition-all duration-300 ease-in-out",
        "relative rounded-lg overflow-hidden size-12",
        active
          ? "border-2 border-white shadow-[0_0_24px_0_rgba(255,255,255,0.70)] scale-105"
          : "border-2 border-transparent shadow-[0_0_0_0_rgba(255,255,255,0.70)] hover:scale-105"
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={item.thumbnail}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          unoptimized
        />
        {/* Darken non-active thumbs */}
        <span
          className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            active ? "opacity-0" : "opacity-50"
          )}
        />
      </div>

      {/* Auto-advance progress bar at the bottom of the active tab */}
      <div className="absolute bottom-1.5 left-2 right-2 z-10 h-0.5 rounded-2 bg-white/20 overflow-hidden">
        <span
          className="block h-full bg-white origin-left transition-transform duration-100"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </button>
  );
}
