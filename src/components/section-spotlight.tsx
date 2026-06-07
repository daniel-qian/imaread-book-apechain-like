// src/components/section-spotlight.tsx
//
// "Where DApps Shine & You Win" — left copy block + right tilted card stack
// (2 background cards + 1 foreground card with text overlay). Mirrors the
// .SectionSpotlight markup from apechain.com (see
// docs/research/components/spotlight.spec.md for full spec).
//
// Server component — no state, no effects. The 3D tilt is static (CSS
// transform), the buttons are simple outline (no SVG mask like the original).
// The "WHAT'S THIS" link on the foreground card uses the same simple outline
// button style for visual consistency.

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SPOTLIGHT } from "@/data/apechain-content";
import { GradientBorderFrame } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SectionSpotlight() {
  return (
    <section
      className={cn(
        "SectionSpotlight relative min-h-svh",
        "py-24 md:py-24",
        "overflow-hidden"
      )}
    >
      {/* Background tilted cards — 2 of them, positioned absolutely
          and peeking from the top of the section. Use the same 3D transform
          as the original (perspective 800px, rotateX 7.5deg, rotateY -15deg,
          rotateZ 2.5deg).
          aspect-[24/9] + top-[-60px] shrinks the cards and pulls them
          above the section so they don't overlap the badge / h2 below. */}
      <div className="pointer-events-none absolute inset-x-0 -top-15 z-0 px-7 md:px-7">
        <div className="grid grid-cols-12 gap-4">
          <BackgroundCard
            src={SPOTLIGHT.cardStack.backImages[0]}
            alt=""
            className="col-span-5 col-start-1 aspect-[24/9]"
          />
          <BackgroundCard
            src={SPOTLIGHT.cardStack.backImages[1]}
            alt=""
            className="col-span-5 col-start-8 aspect-[24/9]"
          />
        </div>
      </div>

      {/* Main grid: text (left) + card stack (right) */}
      <div
        className={cn(
          "relative z-10 grid min-h-svh",
          "grid-cols-6 lg:grid-cols-12",
          "gap-x-4 md:gap-x-4",
          "px-7 md:px-7",
          // pt-32 keeps the h2 below the back cards' bottom edge so
          // the tall Boldonse ascenders don't get clipped by
          // overflow-hidden on the section.
          "pt-32 md:pt-24",
          "items-center"
        )}
      >
        {/* LEFT: text block */}
        <div
          className={cn(
            "col-span-6 lg:col-start-2 lg:col-span-6",
            "max-w-[800px]",
            "flex flex-col gap-3 md:gap-6",
            "text-black"
          )}
        >
          {/* Badge — text label (clone compromise for the missing
              /apechain-spotlight.png asset). */}
          <span className="font-mono text-[12px] font-medium uppercase tracking-widest text-black/70">
            {SPOTLIGHT.badge}
          </span>

          {/* h2 headline — Boldonse display, 56/100px, uppercase.
              Leading is 1.0 (was 0.92) because Boldonse's tall
              ascenders extend above the cap height — tighter leading
              clips the tops of the letters. */}
          <h2
            className={cn(
              "font-heading text-[40px] sm:text-[56px]",
              "md:text-[clamp(56px,7vw,100px)]",
              "font-normal uppercase",
              "leading-[1.0] md:leading-[1.0]"
            )}
          >
            {SPOTLIGHT.headline}
          </h2>

          {/* Body copy — DM Sans, 14/16px */}
          <div className="md:w-10/12 font-sans text-[14px] md:text-[16px] leading-snug tracking-[0.24px] text-black/85 space-y-3 md:space-y-4">
            {SPOTLIGHT.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Button row — 2 outline buttons, white-on-black theme
              (background is light grey, so the outline needs to be dark
              for contrast). */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <SpotlightButton href={SPOTLIGHT.primaryAction.href}>
              {SPOTLIGHT.primaryAction.label}
            </SpotlightButton>
            <SpotlightButton href={SPOTLIGHT.secondaryAction.href}>
              {SPOTLIGHT.secondaryAction.label}
            </SpotlightButton>
          </div>
        </div>

        {/* RIGHT: tilted foreground card + text overlay */}
        <div
          className={cn(
            "relative",
            "py-8 md:py-0",
            "col-start-3 col-span-4",
            "lg:col-start-9 lg:col-span-4",
            "text-white"
          )}
        >
          <TiltedCard
            src={SPOTLIGHT.cardStack.frontImage}
            alt={SPOTLIGHT.cardStack.overlay.title}
          />

          {/* Text overlay on the bottom-left of the card. On mobile
              (where the card is absolutely positioned with overflow), use
              padding to push the text onto the card. On desktop (in-flow
              card), use absolute positioning at bottom-left. */}
          <div
            className={cn(
              "relative z-[2] flex flex-col gap-2",
              "pt-32 pb-16",
              "md:pt-0 md:pb-0 md:absolute md:bottom-6 md:left-6 md:right-6"
            )}
          >
            <h3
              className={cn(
                "font-heading text-[32px] md:text-[48px]",
                "font-normal uppercase",
                "leading-[0.95]"
              )}
            >
              {SPOTLIGHT.cardStack.overlay.title}
            </h3>
            <p
              className={cn(
                "max-w-[160px] md:max-w-[305px]",
                "font-mono text-[10px] md:text-[12px]",
                "leading-snug tracking-wide uppercase",
                "text-white/90"
              )}
            >
              Decentralized parlay platform on ApeChain.
            </p>
            <div className="pt-2">
              <SpotlightButton
                href={SPOTLIGHT.cardStack.overlay.href}
                variant="onDark"
                compact
              >
                {SPOTLIGHT.cardStack.overlay.linkLabel}
                <ArrowUpRight className="size-3" />
              </SpotlightButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components
/* ------------------------------------------------------------------ */

function BackgroundCard({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative size-full overflow-hidden rounded-lg", className)}>
      <div
        className="relative size-full overflow-hidden rounded-lg"
        style={{
          transform: "perspective(800px) rotateX(7.5deg) rotateY(-15deg) rotateZ(2.5deg)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 40vw, 30vw"
          className="object-cover"
          unoptimized
        />
        {/* Slight darken so the bg cards don't fight the foreground card visually */}
        <div className="absolute inset-0 bg-black/15" />
      </div>
    </div>
  );
}

function TiltedCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        // Mobile: absolutely positioned and offset (overflows column right)
        // Desktop: relative, in-flow
        "max-w-[600px]",
        "absolute top-[30%] left-[10%] -right-[50%]",
        "md:left-auto md:top-auto md:right-auto md:relative",
        // 3D tilt
        "p-px md:p-0.5"
      )}
      style={{
        transform:
          "perspective(1800px) rotateX(15deg) rotateY(15deg) rotateZ(-5deg)",
      }}
    >
      <GradientBorderFrame borderRadius={16} strokeWidth={2}>
        <div className="relative overflow-hidden rounded-2xl">
          {/* The image */}
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1080}
            sizes="(max-width: 768px) 80vw, 40vw"
            className="relative h-auto w-full rounded-2xl"
            unoptimized
          />
          {/* Inner dark gradient — bottom-up so the overlay text is readable */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(182deg, rgba(24, 83, 117, 0.00) 39.56%, rgba(24, 83, 117, 0.80) 93.99%)",
            }}
          />
        </div>
      </GradientBorderFrame>
    </div>
  );
}

function SpotlightButton({
  href,
  children,
  variant = "onLight",
  compact = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "onLight" | "onDark";
  compact?: boolean;
}) {
  // onLight: dark border + dark text on the light-grey section bg
  // onDark:  white border + white text on the dark card image
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2",
        compact ? "px-4 py-2 rounded-lg" : "px-6 py-3 rounded-2",
        "font-mono text-[12px] font-medium uppercase tracking-widest",
        "border-2 transition-colors duration-200",
        variant === "onLight"
          ? "border-black text-black hover:bg-black hover:text-white"
          : "border-white text-white hover:bg-white hover:text-black"
      )}
    >
      {children}
    </a>
  );
}
