// src/components/main-footer.tsx
//
// "MainFooter" — dark footer with 3 columns of links + bottom legal row.
// Mirrors the original `<footer class="MainFooter relative text-white">` in
// apechain.com (see docs/research/components/footer.spec.md).
//
// Simplifications (consistent with the other 4 sections of this clone):
//   - Original `<canvas>` (decorative WebGL sphere) and `<picture>` (footer-bg
//     strip) are replaced with a CSS gradient band. The footer body uses
//     `bg-ape-dark-navy` as a fallback for the missing footer-bg image.
//   - Original UILink inner+clone slide animation is replaced with a simple
//     `hover:underline` for links. (The original is a 7-layer SVG-mask hover;
//     ship the simple version, swap in later if requested.)
//
// Server component — no state, no effects.

import { FOOTER } from "@/data/apechain-content";
import type { FooterColumn } from "@/types/apechain";
import { cn } from "@/lib/utils";

export function MainFooter() {
  return (
    <footer
      className={cn(
        "MainFooter relative overflow-hidden",
        "bg-ape-dark-navy text-white"
      )}
    >
      {/* Decorative WebGL canvas — replaced with a CSS gradient band
          (same approach as Hero's gradient sphere). */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(ellipse_at_70%_-10%,rgba(111,61,255,0.35),transparent_60%),radial-gradient(ellipse_at_30%_110%,rgba(14,98,255,0.30),transparent_60%)]"
        )}
      />

      {/* Main content wrapper (pt-48 matches original — clears the
          decorative band that sits above the columns). */}
      <div className="relative pt-48">
        {/* === 3-column link grid === */}
        <div
          className={cn(
            "flex flex-col md:flex-row md:gap-x-12 lg:gap-x-16 md:justify-end",
            "px-6 md:px-8 pb-22 md:pb-18",
            "pt-22 md:pt-20 sm:pt-40 sm:pb-18 sm:px-8"
          )}
        >
          {FOOTER.columns.map((col) => (
            <FooterColumnView key={col.heading} column={col} />
          ))}
        </div>

        {/* === Decorative band (empty in clone) ===
            Original had `<canvas>` here rendering the same sphere at a
            different aspect ratio. We leave the space but render nothing. */}
        <div
          aria-hidden
          className="w-full aspect-[3.8] md:aspect-[3]"
        />

        {/* === Bottom row: copyright + legal links === */}
        <div
          className={cn(
            "flex flex-col-reverse md:flex-row items-center justify-between",
            "px-6 md:px-8 pb-22 md:pb-18 pt-6 sm:pb-18 sm:px-8",
            "border-t border-white/10"
          )}
        >
          <span
            className={cn(
              "mt-4 md:mt-0 block",
              "font-mono text-[10px] md:text-[12px]",
              "leading-[14px] tracking-wide uppercase text-white/80"
            )}
          >
            {FOOTER.copyrightText}
          </span>
          <nav aria-label="Footer navigation links">
            <ul className="flex space-x-4 relative">
              {FOOTER.legalLinks.map((link, i) => (
                <li key={link.label} className="group">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "block font-mono leading-[14px] tracking-wide",
                      "text-[10px] md:text-[12px] uppercase",
                      "text-white/80 hover:text-white hover:underline",
                      // Pipe divider between the two legal links.
                      i < FOOTER.legalLinks.length - 1 &&
                        "mr-4 pr-4 relative after:content-['|'] after:absolute after:-right-1 after:top-0 after:text-white/40"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component
/* ------------------------------------------------------------------ */

function FooterColumnView({ column }: { column: FooterColumn }) {
  return (
    <div className="mb-6 md:mb-0 md:shrink-0">
      <h4
        className={cn(
          "mb-5 text-[26px] text-white",
          "font-heading font-normal uppercase leading-[1]",
          "whitespace-nowrap"
        )}
      >
        {column.heading}
      </h4>
      <nav aria-label="Footer navigation links">
        <ul className="space-y-2 md:space-y-4">
          {column.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cn(
                  "block font-mono text-[12px] leading-[14px]",
                  "tracking-wide uppercase text-white/80",
                  "hover:text-white hover:underline"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
