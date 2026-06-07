// src/data/apechain-content.ts
//
// Static content extracted from apechain.com. In the real site this comes from
// a Contentful CMS (see `images.ctfassets.net/opj3ybl4k7mx/...` URLs in the
// RSC payload). For the clone we keep the same image URLs so the visuals are
// identical; when the clone is ported to a real backend, swap the URLs.

import type {
  HeroItem,
  SpotlightCard,
  AppCard,
  DiscoverApps,
  TopNav,
  FooterProps,
} from "@/types/apechain";

// Image host — Contentful CDN for apechain.com.
// We keep this as a constant so the dev environment can switch to a local
// mirror (public/images/...) by changing one place.
const CTF = "https://images.ctfassets.net/opj3ybl4k7mx";

// =============================================================
// HERO CAROUSEL — 5 dApps
// =============================================================
export const HERO_ITEMS: HeroItem[] = [
  {
    slug: "otherside",
    title: "OTHERSIDE",
    category: "GAMES",
    tagline: "Web3-enabled virtual worlds on ApeChain",
    heroImage: `${CTF}/2J6KKq5u2F9zIl5L9maX9g/ab97e1bd1e38cbb58718e991ee123583/apeChain-hero-960x960-Otherside.jpg`,
    thumbnail: `${CTF}/7Cn10d3ErtqfrG6H7EFGg8/1942238297ed97ef14f5e9f1049389f7/apeChain-thumbnail-608x336-Otherside.jpg`,
    launchHref: "/apps/otherside",
  },
  {
    slug: "apechurch",
    title: "APECHURCH",
    category: "GAMES",
    tagline: "Where faith, culture, and community meet on ApeChain",
    heroImage: `${CTF}/3nywImyDrE1JQrDhISZHOU/e2eadfeb4c6c702ffba9628f8767fcab/ApeBanner.png`,
    thumbnail: `${CTF}/3nywImyDrE1JQrDhISZHOU/e2eadfeb4c6c702ffba9628f8767fcab/ApeBanner.png`,
    launchHref: "/apps/apechurch",
  },
  {
    slug: "opensea",
    title: "OPENSEA",
    category: "COLLECTIBLES",
    tagline: "The largest NFT marketplace. Now supporting ApeChain",
    heroImage: `${CTF}/1sIW0LN0KGP4fhqHJpaIbH/88bac67f63a64d4d6db478bc08f5b734/608x336_opensea.jpg`,
    thumbnail: `${CTF}/1sIW0LN0KGP4fhqHJpaIbH/88bac67f63a64d4d6db478bc08f5b734/608x336_opensea.jpg`,
    launchHref: "/apps/opensea",
  },
  {
    slug: "clutch-market",
    title: "CLUTCH MARKET",
    category: "GAMES",
    tagline: "Decentralized parlay platform on ApeChain",
    heroImage: `${CTF}/4RY933fgr5bhgvPho9Sl98/a27e42b0db63cc884c2bd355d95b840b/608x336-clutch.jpg`,
    thumbnail: `${CTF}/4RY933fgr5bhgvPho9Sl98/a27e42b0db63cc884c2bd355d95b840b/608x336-clutch.jpg`,
    launchHref: "/apps/clutch-market",
  },
  {
    slug: "slab-cash",
    title: "SLAB CASH",
    category: "FINANCE",
    tagline: "RWA platform built for the EVM, with support for ApeChain",
    heroImage: `${CTF}/606Ce7C4Bg7OEG0qjKb7W0/5c8d49fc02d156228b5d5e3c8b85de9f/Banner.png`,
    thumbnail: `${CTF}/606Ce7C4Bg7OEG0qjKb7W0/5c8d49fc02d156228b5d5e3c8b85de9f/Banner.png`,
    launchHref: "/apps/slab-cash",
  },
];

// =============================================================
// SPOTLIGHT
// =============================================================
export const SPOTLIGHT: SpotlightCard = {
  badge: "APECHAIN | SPOTLIGHT",
  headline: "WHERE DAPPS SHINE & YOU WIN",
  paragraphs: [
    "Spotlight will be broken down into rounds, with each one specifically tailored to the highlighted project(s). This ensures what creators are building is amplified and elevated, while encouraging community participation.",
    "At each round's end, the top APE placements score epic prizes made up of exclusive IRL, holy sh*t experiences and other unforgettable rewards. This system rewards both builders and individual collectors, ensuring engagement at all levels, while offering high-stakes rewards to the most active participants.",
    "Simple, fun, rewarding. Ready to make your mark? 🦍✨",
  ],
  primaryAction: { label: "GET STARTED", href: "/get-started" },
  secondaryAction: { label: "GO SPOTLIGHT", href: "/spotlight" },
  cardStack: {
    backImages: [
      `${CTF}/799tGxJK4QifSPw15l3T5Q/9501459206666bb641f11a9913f8ae36/608x336-dashbo.jpg`,
      `${CTF}/1sIW0LN0KGP4fhqHJpaIbH/88bac67f63a64d4d6db478bc08f5b734/608x336_opensea.jpg`,
    ],
    frontImage: `${CTF}/6YFNihGC1buza2pXFAOUJM/541107ef31672618dc2edf3eb1dffcd8/1800x1080-clutch.jpg`,
    overlay: {
      title: "CLUTCH MARKETS",
      href: "/apps/clutch-market",
      linkLabel: "WHAT'S THIS",
    },
  },
};

// =============================================================
// APPS GRID
// =============================================================
// Gradient colors from Contentful's `colorMain` per app entry.
export const APP_CARDS: AppCard[] = [
  { slug: "otherside",          categories: ["GAMES"],              name: "OTHERSIDE",         tagline: "Web3-enabled virtual worlds on ApeChain",     image: `${CTF}/2J6KKq5u2F9zIl5L9maX9g/ab97e1bd1e38cbb58718e991ee123583/apeChain-hero-960x960-Otherside.jpg`,          gradient: "from-[#1a2540] to-[#0a1330]", href: "/apps/otherside" },
  { slug: "made-by-apes",       categories: ["INTELLECTUAL PROPERTY"], name: "MADE BY APES",      tagline: "A club full of builders",                       image: `${CTF}/15yPALJilSS9qb07GSF8Zs/9bccadf42723734f55ec2a0b5d3f6fe7/apeChain-feature-608x960-MadeByApes.jpg`,      gradient: "from-[#2a4a8a] to-[#0a1330]", href: "/apps/made-by-apes" },
  { slug: "camelot",            categories: ["FINANCE"],            name: "CAMELOT",            tagline: "Decentralized exchange",                        image: `${CTF}/4ijmFGRSxNUrkTVE8HHCFo/d33fe69e8532d2bcfc6c401b221d733c/apeChain-hero-960x960-Camelot.jpg`,            gradient: "from-[#7a6f5a] to-[#3a342a]", href: "/apps/camelot" },
  { slug: "ape-portal",         categories: ["INFRASTRUCTURE"],     name: "APE PORTAL",         tagline: "Get on ApeChain",                                image: `${CTF}/7lOf1BD4ceSm1Ek4IqutpY/10199cab67dd68fc16a404adcbf3f41e/ape-portal-bg.png`,                            gradient: "from-[#2a3050] to-[#0a1330]", href: "/apps/ape-portal" },
  { slug: "blever",             categories: ["COLLECTIBLES"],       name: "BLEVER",             tagline: "An NFT launchpad for ApeChain",                 image: `${CTF}/0ra3fvTLz6tknfPdWbd7V/b0f1d2fb78030af319fbbb2054f06e3b/apeChain-hero-960x960-Blever.jpg`,             featured: true, gradient: "from-[#a281ff] to-[#3a1f7a]", href: "/apps/blever" },
  { slug: "ape-express",        categories: ["FINANCE"],            name: "APE EXPRESS",        tagline: "The ultimate memecoin toolkit",                 image: `${CTF}/1hUS9PZuBjADG8Jv0obB5e/1ea09046386d84d518c9381ed9bfce4f/apeChain-hero-960x960-apeExpress.jpg`,        gradient: "from-[#ff8280] to-[#7a2a3a]", href: "/apps/ape-express" },
  { slug: "apescan",            categories: ["INFRASTRUCTURE"],     name: "APESCAN",            tagline: "ApeChain's block explorer",                      image: `${CTF}/62HYCNzF636WEoHFQHb4YJ/6f280ad335524565a920cc8a453dc9de/apeChain-hero-960x960-Etherscan.jpg`,         gradient: "from-[#1a2540] to-[#0a1330]", href: "/apps/apescan" },
  { slug: "clutch-market",      categories: ["GAMES", "FINANCE"],   name: "CLUTCH MARKET",      tagline: "Decentralized parlay platform on ApeChain",     image: `${CTF}/4YlMJVGA2312YhmLtu4bGQ/a6144db6461b8e317e9722dd50ffc43e/960x960-clutch.jpg`,                            gradient: "from-[#1f5a3a] to-[#0a3320]", href: "/apps/clutch-market" },
  { slug: "gtrade",             categories: ["FINANCE"],            name: "GTRADE",             tagline: "PerpDex",                                        image: `${CTF}/56iy1xSMTycZMcQ5Iiqa5E/265998e1a0f024b5a4f04075ad5538a6/apeChain-thumbnail-608x336-Gains.jpg`,         gradient: "from-[#15886f] to-[#004043]", href: "/apps/gtrade" },
  { slug: "openocean",          categories: ["FINANCE"],            name: "OPENOCEAN",          tagline: "DEX aggregator",                                 image: `${CTF}/ri0XclUQp9DMTxmh3doJV/a07125cb74bb73f25a89ba47b1ec787e/apeChain-hero-608x960-OpenOcean.jpg`,          gradient: "from-[#0a4080] to-[#0a1330]", href: "/apps/openocean" },
  { slug: "cyan",               categories: ["FINANCE"],            name: "CYAN",               tagline: "BNPL for the metaverse",                         image: `${CTF}/73j9HuCXmaighegDhfnoyZ/bbaf72401cc5ee286330abd97c040558/apeChain-hero-960x960-Cyan.jpg`,               gradient: "from-[#1a2540] to-[#0a1330]", href: "/apps/cyan" },
  { slug: "apecoin-coinbase",   categories: ["NEWS"],               name: "APECOIN IN COINBASE 50", tagline: "Get in before the institutions",              image: `${CTF}/51ouUOLZHQ1dfsXZXUbSwO/1f87a7a4297220f190a8a35a70504507/Magic_Eden-feature-608x960_c50V04.jpg`,     gradient: "from-[#0a4080] to-[#0a1330]", href: "https://www.coinbase.com/price/apecoin" },
  { slug: "mintpad",            categories: ["COLLECTIBLES"],       name: "MINTPAD",            tagline: "Launch your NFT on ApeChain",                    image: `${CTF}/6IHAzV6dY08Fg4Nq1h0Swf/f78dbd958608f1556e61c12648d0e21f/apeChain-hero-960x960-MintPad.jpg`,            gradient: "from-[#3a2a1a] to-[#1a0a0a]", href: "/apps/mintpad" },
  { slug: "ormi",               categories: ["INFRASTRUCTURE"],     name: "ORMI",               tagline: "Unified Web3 data layer",                        image: `${CTF}/31bpk4PkFeVVMqhoiY7r9W/3a8ceccf0ae61057af272081ad8321a3/apeChain-hero-960x960-Ormi.jpg`,               featured: true, gradient: "from-[#6f3dff] to-[#2a1a4a]", href: "/apps/ormi" },
];

// =============================================================
// DISCOVER APPS (marquee)
//
// 2 rows of 5 categories total (matches the real apechain.com DOM):
//   Row 1 (left-scrolling): INTELLECTUAL PROPERTY, COLLECTIBLES, FINANCE
//   Row 2 (right-scrolling): GAMES, INFRASTRUCTURE
//
// Each link has BOTH a text label and a thumbnail (per the DOM, not
// alternating text-only / icon-only tokens). The content is duplicated
// in the component to enable seamless CSS marquee loop.
// =============================================================
export const DISCOVER_APPS: DiscoverApps = {
  rows: [
    {
      direction: "left",
      speed: "default",
      links: [
        {
          label: "INTELLECTUAL PROPERTY",
          href: "/apps?f=intellectual-property",
          iconSrc: `${CTF}/48OMy3cRzsdFbNYR8el1Zk/b2a2036389810b0ac2e3c6dff023d3fb/apeChain-thumbnail-608x336-MadeByApes.jpg`,
          iconAlt: "MADE BY APES",
        },
        {
          label: "COLLECTIBLES",
          href: "/apps?f=collectibles",
          iconSrc: `${CTF}/1sIW0LN0KGP4fhqHJpaIbH/88bac67f63a64d4d6db478bc08f5b734/608x336_opensea.jpg`,
          iconAlt: "OPENSEA",
        },
        {
          label: "FINANCE",
          href: "/apps?f=finance",
          iconSrc: `${CTF}/1e40wdhm9t2mNSVf2wczv4/fcff96473ce757556dfaf2739487b133/apeChain-thumbnail-608x336-OpenOcean.jpg`,
          iconAlt: "OPENOCEAN",
        },
      ],
    },
    {
      direction: "right",
      speed: "default",
      links: [
        {
          label: "GAMES",
          href: "/apps?f=games",
          iconSrc: `${CTF}/7Cn10d3ErtqfrG6H7EFGg8/1942238297ed97ef14f5e9f1049389f7/apeChain-thumbnail-608x336-Otherside.jpg`,
          iconAlt: "OTHERSIDE",
        },
        {
          label: "INFRASTRUCTURE",
          href: "/apps?f=infrastructure",
          iconSrc: `${CTF}/5qTr399OMjp1GwmRw6ihS8/ba02aefbeab5480901bddea9ea4b523b/apeChain-thumbnail-608x336-Alchemy.jpg`,
          iconAlt: "ALCHEMY",
        },
      ],
    },
  ],
  cta: { label: "BROWSE ALL APPS", href: "/apps" },
};

// =============================================================
// TOP NAV
// =============================================================
export const TOP_NAV: TopNav = {
  logoText: "APECHAIN",
  primaryLinks: [
    { label: "EXPLORE", href: "/explore" },
    { label: "LEARN", href: "/learn" },
    { label: "BUILD", href: "/build" },
    { label: "BRIDGE", href: "/bridge" },
  ],
};

// =============================================================
// FOOTER
// =============================================================
export const FOOTER: FooterProps = {
  backgroundImage: "/footer-bg.png",
  columns: [
    {
      heading: "BUILD ON APECHAIN",
      links: [
        { label: "DOCS",          href: "https://docs.apechain.com/" },
        { label: "MAINNET HUB",   href: "https://apechain.hub.caldera.xyz/" },
        { label: "TESTNET HUB",   href: "https://curtis.hub.caldera.xyz/" },
        { label: "BLOCK EXPLORER",href: "https://apescan.io" },
        { label: "APE PORTAL",    href: "https://github.com/yuga-labs/ape-portal-public" },
      ],
    },
    {
      heading: "APECOIN",
      links: [
        { label: "DISCORD",            href: "https://discord.gg/apecoindao" },
        { label: "TWITTER / X",        href: "https://x.com/apecoin" },
        { label: "OTHERSIDE CALENDAR", href: "https://othersidecalendar.apechain.com/" },
      ],
    },
    {
      heading: "APECHAIN",
      links: [
        { label: "BRIDGE",         href: "/portal#bridge" },
        { label: "RELAY BRIDGE",   href: "/relay-bridge" },
        { label: "THE BLUEPRINT",  href: "/the-blueprint" },
        { label: "TELEGRAM",       href: "https://t.me/apechainofficial" },
        { label: "TWITTER / X",    href: "https://x.com/ApeChainHUB" },
        { label: "BRAND KIT",      href: "https://live.standards.site/apechain/" },
      ],
    },
  ],
  copyrightText: "© 2026 APE FOUNDATION",
  legalLinks: [
    { label: "TERMS OF SERVICE", href: "/terms-of-service" },
    { label: "PRIVACY NOTICE",   href: "/privacy-notice" },
  ],
};
