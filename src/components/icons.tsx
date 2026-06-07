// src/components/icons.tsx
//
// Icon components used in the clone. Most decorative / repeated icons in the
// apechain.com DOM are gradient-border SVG masks (rendered inline next to
// buttons). For the clone we approximate with Lucide + 2-3 hand-coded SVG
// components for the brand mark and the play/pause button.
//
// All icons are presentational and inherit `currentColor` where possible.

import type { SVGProps } from "react";
import {
  Play,
  Pause,
  ArrowRight,
  ArrowUpRight,
  Plus,
  X,
  Menu,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Brand logo (Apechain wordmark) — vector reconstruction of the
/*  logo that appears in the top-left corner and the loader overlay.
/*  We hand-draw a simplified geometric "APE" mark in a 140x48 box.
/* ------------------------------------------------------------------ */
export function ApechainLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 140 48"
      width={140}
      height={48}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g fill="currentColor">
        <path d="M11 10.8h-5L3 37.8h4l.5-5.8h2.2l.5 5.8h4.2L11 10.8Zm-3.4 17.4.4-5.5.3-4.6h.1l.3 4.6.5 5.5h-1.6Z" />
        <path d="M19 37.8V10.8h4.3v16.7h1.3c3.1 0 5-1.8 5-5V16.1c0-3.3-1.9-5-5-5H19v26.7Zm5.3-13.3h-.9V14.3h.9c.7 0 1 .6 1 1.8v6.6c0 1.2-.3 1.8-1 1.8Z" />
        <path d="M34.6 37.8V10.8h8.4v3.5h-4.1V22.5h3.7v3.6h-3.7v8.2h4.1v3.5h-8.4Z" />
        <path d="M69.6 33.4v-6.2h-4.1v6.7c0 1.1-.3 1.7-1 1.7s-1-.6-1-1.7V15.4c0-1.1.3-1.7 1-1.7s1 .6 1 1.7v5.8h4.1v-5.5c0-3.5-1.7-5.4-5-5.4-3.3 0-5.4 1.9-5.4 5.4v16.6c0 3.5 2 5.4 5.4 5.4 3.3 0 5-1.9 5-5.4Z" />
        <path d="M81 26.1V10.8h4.4v11.4h2.3V10.8h4.3v27H87.7V25.5h-2.3v12.3H81V26.1Z" />
        <path d="M105.5 15.4c0-1.1.3-1.7 1-1.7s1 .6 1 1.7v18c0 1.1-.3 1.7-1 1.7s-1-.6-1-1.7v-18Z" />
        <path d="M115.6 24.5 113.3 10.8h-4.6v27h3.7V22.2h.1l3 15.6h3.9v-27h-3.7v13.7h-.1Z" />
        <path d="M0 .5C0 .3.3 0 .6 0H139.4c.3 0 .6.3.6.5v46.9c0 .3-.3.6-.6.6H.6C.3 48 0 47.7 0 47.5V.5Zm4 43.5V4h132v40H4Z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Re-exports of commonly-needed lucide icons
/* ------------------------------------------------------------------ */
export {
  Play,
  Pause,
  ArrowRight,
  ArrowUpRight,
  Plus,
  X,
  Menu,
};

/* ------------------------------------------------------------------ */
/*  GradientBorderFrame — a reusable wrapper that gives any child
/*  the apechain signature gradient stroke (purple → coral → sand → cyan).
/*  Used as a visual replacement for the inline SVG masks the original
/*  site uses around buttons.
/* ------------------------------------------------------------------ */
export function GradientBorderFrame({
  className = "",
  borderRadius = 16,
  strokeWidth = 2,
  children,
}: {
  className?: string;
  borderRadius?: number;
  strokeWidth?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ borderRadius }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="10%" stopColor="#A281FF" />
            <stop offset="33%" stopColor="#EB8280" />
            <stop offset="66%" stopColor="#EBBF9A" />
            <stop offset="90%" stopColor="#89D0FF" />
          </linearGradient>
        </defs>
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={borderRadius - strokeWidth / 2}
          ry={borderRadius - strokeWidth / 2}
          fill="none"
          stroke="url(#gradBorder)"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {children}
    </div>
  );
}
