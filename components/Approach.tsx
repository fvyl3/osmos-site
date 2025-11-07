"use client"

import { motion } from "framer-motion"
import { FiCompass, FiCode, FiCheckCircle } from "react-icons/fi"

export default function Approach() {
  const steps = [
    {
      icon: <FiCompass className="h-6 w-6 text-brand-500" />,
      title: "Discovery",
      desc: "A short call to understand what matters. We identify the systems, automations, or agents that create leverage."
    },
    {
      icon: <FiCode className="h-6 w-6 text-brand-500" />,
      title: "Prototype",
      desc: "A working demo in days, not weeks. You see exactly how it performs — fast iteration, precise execution."
    },
    {
      icon: <FiCheckCircle className="h-6 w-6 text-brand-500" />,
      title: "Integration",
      desc: "Deployment and refinement until it runs flawlessly. Documented, monitored, and ready for scale."
    }
  ]

  return (
    <section
      id="approach"
      className="relative mx-auto max-w-6xl px-4 py-28 border-t border-white/5"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl md:text-5xl tracking-tight"
      >
        Our Approach
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="mx-auto mt-4 max-w-2xl text-center text-mute md:text-lg"
      >
        Simple, efficient, deliberate — every project follows the same three-phase flow.
      </motion.p>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
              {step.icon}
            </div>
            <h3 className="text-xl font-medium text-ink mb-3">
              {step.title}
            </h3>
            <p className="text-mute leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
