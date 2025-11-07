"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* top progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 h-[2px] bg-brand-500"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
      />
      <header
        className={[
          "fixed top-0 z-30 w-full transition-all",
          scrolled ? "backdrop-blur-xl bg-black/30 shadow-glass" : "bg-transparent"
        ].join(" ")}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:py-5">
          <Link href="/" className="group">
            <span className="font-display text-lg tracking-wide">
              OSMOS
            </span>
            <span className="sr-only">OSMOS Home</span>
            <span className="ml-2 inline-block translate-y-[1px] select-none text-xs text-mute transition group-hover:text-brand-400">
              / precision systems
            </span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            <Link className="text-sm text-mute hover:text-ink transition" href="#work">Work</Link>
            <Link className="text-sm text-mute hover:text-ink transition" href="#approach">Approach</Link>
            <Link className="text-sm text-mute hover:text-ink transition" href="#contact">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Link href="#contact" className="btn btn-ghost">
              Contact
            </Link>
          </div>

          {/* mobile */}
          <details className="md:hidden">
            <summary className="cursor-pointer rounded-md px-3 py-2 text-sm text-mute hover:text-ink">
              Menu
            </summary>
            <div className="mt-2 flex flex-col gap-2 rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-xl">
              <Link className="text-sm text-ink/90" href="#work">Work</Link>
              <Link className="text-sm text-ink/90" href="#approach">Approach</Link>
              <Link className="text-sm text-ink/90" href="#contact">Contact</Link>
            </div>
          </details>
        </div>
      </header>
      {/* header spacer so hero isn't hidden */}
      <div aria-hidden className="h-20" />
    </>
  );
}
