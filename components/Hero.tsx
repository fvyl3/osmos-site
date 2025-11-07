"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"

export default function Hero() {
  // ────────────────────────────────────────────────
  // 3D tilt interaction
  // ────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rx = useTransform(y, [-0.5, 0.5], [12, -12]) // rotateX
  const ry = useTransform(x, [-0.5, 0.5], [-12, 12]) // rotateY
  const rotateX = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.2 })
  const rotateY = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.2 })

  const handleMouse = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px - 0.5)
    y.set(py - 0.5)
  }

  const resetMouse = () => {
    x.set(0)
    y.set(0)
  }

  // ────────────────────────────────────────────────
  // Layout
  // ────────────────────────────────────────────────
  return (
    <section
      id="hero"
      className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-12 pb-28 md:pt-20"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-brand-400/25 blur-3xl"
      />

      {/* subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] [background-size:26px_26px,26px_26px] [mask-image:radial-gradient(900px_500px_at_50%_30%,black_60%,transparent_85%)]"
      />

      {/* status badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-[12px] text-neutral-700 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_20px_2px] shadow-brand-400" />
        Online — Building quietly
      </motion.div>

      {/* headline */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6 }}
        className="text-center font-display text-4xl leading-tight text-neutral-900 md:text-6xl"
      >
        <span className="pr-2">OSMOS.</span>
        <span className="text-brand-600">The Automation Layer.</span>
      </motion.h1>

      {/* subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.6 }}
        className="mt-5 max-w-2xl text-center text-base text-neutral-600 md:text-lg"
      >
        Solo-engineered systems that replace repetition with precision.
        Built to execute one function perfectly — efficient, private, and reliable.
      </motion.p>

      {/* interactive 3D card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        style={{ rotateX, rotateY }}
        className="group relative mt-12 w-full max-w-3xl rounded-3xl border border-black/10 bg-white/60 p-8 shadow-[0_20px_60px_rgba(0,0,0,.08)] backdrop-blur-xl will-change-transform"
      >
        {/* inner shine */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,rgba(255,255,255,.65)_0%,rgba(255,255,255,.2)_35%,transparent_60%)] opacity-70 transition-opacity group-hover:opacity-90"
        />
        {/* red accent ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[2px] -z-10 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,34,71,.25),transparent_60%)]"
        />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            Precision Systems
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
            Automated agents that think, move, and execute{" "}
            <span className="text-brand-600">without the noise.</span>
          </h2>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
            <Link href="#what-they-do" className="btn btn-primary">
              See What They Do
            </Link>
            <Link href="#contact" className="btn btn-ghost">
              Contact
            </Link>
          </div>
        </div>

        {/* moving highlight on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-[140%] w-40 -rotate-12 bg-[linear-gradient(to_right,rgba(255,255,255,.0),rgba(255,255,255,.6),rgba(255,255,255,.0))] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.div>

      {/* separators */}
      <div
        aria-hidden
        className="pointer-events-none mt-14 h-px w-[92%] bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none mt-3 h-px w-[70%] bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
      />
    </section>
  )
}
