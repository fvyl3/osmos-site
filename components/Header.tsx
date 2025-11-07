"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  })

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* top progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 h-[2px] bg-black"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
      />

      <header
        className={[
          "fixed top-0 z-30 w-full transition-all",
          scrolled
            ? "backdrop-blur-xl bg-white/70 border-b border-neutral-200 shadow-sm"
            : "bg-transparent",
        ].join(" ")}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 md:py-5">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-xl font-semibold tracking-wide text-neutral-900 transition group-hover:text-neutral-700">
              OSMOS
            </span>
          </Link>
        </div>
      </header>

      {/* spacer so hero isn't hidden */}
      <div aria-hidden className="h-20" />
    </>
  )
}
