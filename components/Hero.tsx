"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-28 md:pt-28"
    >
      {/* subtle neutral grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.04)_1px,transparent_1px)] [background-size:28px_28px,28px_28px] [mask-image:radial-gradient(1000px_500px_at_50%_30%,black_70%,transparent_95%)]"
      />

      {/* status badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-[12px] text-neutral-700 shadow-sm backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_1px] shadow-brand-400" />
        Online — Building Quietly
      </motion.div>

      {/* headline */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6 }}
        className="text-center font-display text-4xl leading-tight text-neutral-900 md:text-6xl"
      >
        <span className="font-semibold tracking-tight">OSMOS.</span>{" "}
        <span className="text-neutral-700">The Automation Layer.</span>
      </motion.h1>

      {/* subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="mt-5 max-w-2xl text-center text-base text-neutral-600 md:text-lg"
      >
        Systems that think, act, and deliver with surgical precision —
        <br className="hidden sm:block" />
        built to automate flawlessly and operate in silence.
      </motion.p>

      {/* call-to-actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="#what-they-do"
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
        >
          See What They Do
        </Link>
        <Link
          href="#contact"
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:border-neutral-400 transition"
        >
          Contact
        </Link>
      </motion.div>

      {/* subtle separators */}
      <div
        aria-hidden
        className="pointer-events-none mt-16 h-px w-[90%] bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none mt-3 h-px w-[70%] bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
      />
    </section>
  )
}
