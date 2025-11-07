import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";

export const metadata = {
  title: "OSMOS — Precision Systems",
  description:
    "OSMOS builds automated agents and integration systems that perform a single function flawlessly.",
  openGraph: {
    title: "OSMOS — Precision Systems",
    description:
      "Automated agents that think, move, and execute — designed for efficiency, not excess.",
    type: "website"
  },
  metadataBase: new URL("https://osmos.example") // replace with your actual domain
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          antialiased
          bg-white
          text-neutral-900
          selection:bg-[#ff2247]/20
          selection:text-neutral-900
          grain
        "
      >
        {/* Optional subtle background grid */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 grid-overlay bg-grid"
        />

        {/* header */}
        <Header />

        {/* page content */}
        <main>{children}</main>

        {/* light grain overlay (subtle texture) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.15] mix-blend-lighten"
        />
      </body>
    </html>
  );
}
