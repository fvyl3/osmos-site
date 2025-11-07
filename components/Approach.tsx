"use client"

import { motion } from "framer-motion"
import { FiCompass, FiCode, FiCheckCircle } from "react-icons/fi"

export default function Approach() {
  const steps = [
    {
      icon: <FiCompass className="h-6 w-6 text-brand-500" />,
      title: "Discovery",
      desc: "A short call to understand what matters most. We identify the systems, automations, or agents that create true leverage."
    },
    {
      icon: <FiCode className="h-6 w-6 text-brand-500" />,
      title: "Prototype",
      desc: "A functional demo in days, not weeks. You see it run — rapid iteration, refined precision, real performance."
    },
    {
      icon: <FiCheckCircle className="h-6 w-6 text-brand-500" />,
      title: "Integration",
      desc: "Seamless deployment, testing, and documentation until it runs autonomously — monitored, scalable, and self-reliant."
    }
  ]

  return (
    <section
      id="approach"
      className="relative mx-auto max-w-6xl px-4 py-28 border-t border-neutral-200 overflow-hidden"
    >
      {/* subtle grid + radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.05)_1px,transparent_1px)] [background-size:40px_40px,40px_40px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)] blur-3xl"
      />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl md:text-5xl text-neutral-900 tracking-tight"
      >
        Our Approach
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="mx-auto mt-4 max-w-2xl text-center text-neutral-600 md:text-lg"
      >
        Simple, deliberate, and efficient — every project follows the same three-phase flow.
      </motion.p>

      {/* Steps */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            {/* accent glow */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(255,34,71,0.08),transparent_60%)]"
            />

            {/* icon */}
            <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white/60 shadow-sm backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {step.icon}
              </motion.div>
            </div>

            <h3 className="relative z-10 mb-3 text-xl font-semibold text-neutral-900">
              {step.title}
            </h3>
            <p className="relative z-10 text-neutral-600 leading-relaxed">
              {step.desc}
            </p>

            {/* subtle brand accent line */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 origin-left bg-gradient-to-r from-brand-500/40 via-brand-400/70 to-transparent transition-transform duration-700 group-hover:scale-x-100"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
