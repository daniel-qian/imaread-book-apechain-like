import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { Boldonse } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/top-nav";

// Display font: Boldonse (close substitute for Manuka — geometric, bold,
// high x-height contrast, free via Google Fonts).
const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body font: DM Sans (matches the original's body).
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono font: DM Mono (matches the original's button labels).
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "APECHAIN — Clone",
  description: "Pixel-perfect clone of apechain.com built with Next.js + shadcn/ui + Tailwind v4.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${boldonse.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ape-dark-navy text-white">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
