"use client";

// src/components/top-nav.tsx
//
// Persistent top header for the apechain.com clone. Mirrors the .Header
// markup from the live site (see `docs/research/components/top-nav.spec.md`):
// a fixed bar with a translucent dark backdrop, the Apechain logo on the
// left, 4 nav links on the right (desktop) and a hamburger that opens a
// side drawer (mobile).
//
// Interactive state lives here because the hamburger toggle is the only
// client-side behavior. Desktop nav is essentially static; mobile adds a
// drawer + scrim + body scroll lock.

import { useEffect, useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import { ApechainLogo } from "@/components/icons";
import { TOP_NAV } from "@/data/apechain-content";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when the mobile drawer is open so the underlying page
  // doesn't scroll on touch devices.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Close drawer on Escape — small a11y win.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header
      className={cn(
        "Header fixed left-0 top-0 z-[99]",
        "flex w-full h-24 md:h-[100px]",
        "items-center justify-center p-6"
      )}
    >
      {/* Translucent dark backdrop — readable over hero/spotlight/apps. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-ape-dark-navy/40 backdrop-blur-md"
      />

      {/* Mobile hamburger button (md:hidden) */}
      <button
        type="button"
        aria-label="Open menu button"
        aria-expanded={isOpen}
        aria-controls="primary-nav-drawer"
        onClick={() => setIsOpen(true)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-6 md:hidden",
          "z-20 p-1.5 rounded-sm",
          "transition-colors duration-300 ease-in-out",
          "hover:bg-white/10"
        )}
      >
        <Menu className="size-8 text-white" strokeWidth={2} />
      </button>

      {/* Mobile-only logo (md:hidden) — sits in the same row as the hamburger */}
      <a
        href="/"
        title="Home"
        className="relative md:hidden flex items-center"
      >
        <ApechainLogo className="h-12 w-auto text-white" />
      </a>

      {/* Mobile drawer (md:hidden). Slides in from the left. */}
      <nav
        id="primary-nav-drawer"
        aria-label="Primary navigation (mobile)"
        aria-hidden={!isOpen}
        className={cn(
          "md:hidden",
          "fixed top-0 z-30 h-full max-h-screen w-screen sm:max-w-[500px]",
          "flex flex-col items-start",
          "bg-ape-dark-navy",
          "p-6 overflow-y-scroll",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer header: close button + logo + bottom divider */}
        <div className="relative w-full pb-6">
          <button
            type="button"
            aria-label="Close menu button"
            onClick={() => setIsOpen(false)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-6",
              "flex items-center gap-2 px-1.5 py-1.5",
              "text-white transition-colors duration-200",
              "hover:text-ape-blue"
            )}
          >
            <X className="size-4" strokeWidth={2} />
            <span className="font-heading text-xl uppercase leading-[0.785]">
              Close
            </span>
          </button>

          <div className="flex w-full items-center justify-center">
            <a
              href="/"
              title="Home"
              tabIndex={-1}
              onClick={() => setIsOpen(false)}
            >
              <ApechainLogo className="h-12 w-auto text-white" />
            </a>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px bg-white/20"
          />
        </div>

        {/* Drawer link list */}
        <ul className="flex w-full flex-col gap-y-9 p-6">
          {TOP_NAV.primaryLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "relative z-10 flex w-full items-start justify-between",
                  "text-white",
                  "transition-opacity duration-300",
                  "opacity-60 hover:opacity-100 focus:opacity-100"
                )}
              >
                <span className="font-heading text-[64px] font-medium uppercase leading-[0.785]">
                  {link.label}
                </span>
                {/* Plus icon hints at a sub-menu (matches the original's
                    visual contract). No click handler — links are direct. */}
                <Plus
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 right-4 size-4"
                  strokeWidth={2}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile scrim — tappable backdrop behind the drawer */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
        className={cn(
          "md:hidden fixed inset-0 z-20 bg-black/50",
          "transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Desktop nav (hidden on mobile). Logo left, links right. */}
      <nav
        aria-label="Primary navigation"
        className={cn(
          "hidden md:flex",
          "absolute left-8 right-8 top-0 h-full",
          "items-center justify-between"
        )}
      >
        <a href="/" title="Home" className="flex items-center">
          <ApechainLogo className="h-12 w-auto text-white" />
        </a>

        <ul className="flex items-center gap-x-12">
          {TOP_NAV.primaryLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={cn(
                  "font-heading text-[26px] font-medium uppercase leading-[0.785]",
                  "text-white",
                  "transition-opacity duration-300",
                  "opacity-60 hover:opacity-100 focus:opacity-100"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom divider line — full width, visible on both breakpoints. */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-white/20"
      />
    </header>
  );
}
