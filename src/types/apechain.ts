// src/types/apechain.ts
// Content data shapes for the apechain.com clone.
// All visual content is in this file (or its consumers) so the visual
// components are decoupled from data — same pattern as the original site
// pulls from a CMS (Contentful — see image hostnames `images.ctfassets.net`).

export type HeroCategory = "GAMES" | "FINANCE" | "COLLECTIBLES" | "INFRASTRUCTURE" | "INTELLECTUAL PROPERTY" | "NEWS";

export interface HeroItem {
  /** Unique slug for the dApp / app */
  slug: string;
  /** Display title shown in the hero headline (h2) */
  title: string;
  /** Category tag rendered in the small badge next to HOT / NEW */
  category: HeroCategory;
  /** Tagline (one-line, uppercase) */
  tagline: string;
  /** Hero panel background image (the 3D scene / main visual) */
  heroImage: string;
  /** Thumbnail used for the tab button (4:3, 44px square on desktop) */
  thumbnail: string;
  /** Target URL when LAUNCH is clicked */
  launchHref: string;
  /** Optional alt text (otherwise falls back to title) */
  alt?: string;
}

export interface HeroCarouselProps {
  items: HeroItem[];
  /** Optional initial active index, defaults to 0 */
  initialActiveIndex?: number;
  /** Optional auto-advance interval in ms; 0 disables (default) */
  autoAdvanceMs?: number;
}

// ---------- Spotlight ----------

export interface SpotlightCard {
  /** Small label above the title (e.g., "APECHAIN | SPOTLIGHT") */
  badge?: string;
  /** Massive display headline (manuka 120px on desktop) */
  headline: string;
  /** 2–3 paragraphs of body copy */
  paragraphs: string[];
  /** Two outline buttons */
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  /** Right-side tilted card stack: 2 background images + 1 overlay card */
  cardStack: {
    /** The two images shown on the left of the stack (tilted) */
    backImages: string[];
    /** The big rotated image on the right of the stack */
    frontImage: string;
    /** Overlay card text + link ("CLUTCH MARKETS" + "WHAT'S THIS" link) */
    overlay: {
      title: string;
      href: string;
      linkLabel: string;
    };
  };
}

// ---------- Apps Grid ----------

export interface AppCard {
  slug: string;
  /** Category tags rendered in the top-left badge (1 or more) */
  categories: HeroCategory[];
  /** Display name (e.g., "OTHERSIDE") */
  name: string;
  /** Tagline (uppercase, single line) */
  tagline: string;
  /** Hero / cover image (960x960 in the original) */
  image: string;
  /** Optional "featured" flag for the larger highlighted card */
  featured?: boolean;
  /** Background gradient (color) used under the image (varies per card) */
  gradient: string;
  href: string;
}

// ---------- Discover (Marquee) ----------

export interface MarqueeRow {
  /** Direction: "left" or "right" */
  direction: "left" | "right";
  /** Animation speed: "fast" (40s), "default" (50s), "slow" (60s) */
  speed: "fast" | "default" | "slow";
  /** Tokens to render in the row. Each token is either a plain text label
   *  or an icon (logo image). Repeat the array to create a seamless loop. */
  tokens: Array<{ kind: "text"; label: string } | { kind: "icon"; src: string; alt: string }>;
}

export interface DiscoverApps {
  /** The 3 rows of the marquee */
  rows: MarqueeRow[];
  /** "BROWSE ALL APPS" CTA button */
  cta: { label: string; href: string };
}

// ---------- Top Nav ----------

export interface TopNavLink {
  label: string;
  href: string;
}

export interface TopNav {
  logoText: string;        // "APECHAIN"
  primaryLinks: TopNavLink[];   // EXPLORE / LEARN / BUILD / BRIDGE
}

// ---------- Footer ----------

export interface FooterColumn {
  heading: string;         // "BUILD ON APECHAIN" / "APECOIN" / "APECHAIN"
  links: TopNavLink[];
}

export interface FooterProps {
  columns: FooterColumn[];
  copyrightText: string;   // "© 2026 APE FOUNDATION"
  legalLinks: TopNavLink[];  // TERMS OF SERVICE | / PRIVACY NOTICE
  backgroundImage: string;   // decorative bottom strip
}
