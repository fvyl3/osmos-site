"use client"

import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // mock submit — replace with API or backend integration
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setEmail("")
  }

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-4xl px-6 py-28 text-center border-t border-neutral-200 bg-white"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl tracking-tight text-black"
      >
        Get in Touch
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-4 text-neutral-600 md:text-lg leading-relaxed"
      >
        For collaborations, projects, or updates on the OSMOS ecosystem — leave your email below.
      </motion.p>

      {/* Contact form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        viewport={{ once: true }}
        className="mt-10 mx-auto flex w-full max-w-md items-center rounded-xl border border-neutral-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-black transition"
      >
        <Mail className="ml-3 w-5 h-5 text-neutral-400" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-transparent px-3 py-3 text-sm text-black placeholder-neutral-400 outline-none"
        />
        <button
          type="submit"
          disabled={sent}
          className="mr-1.5 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.97]"
        >
          {sent ? "Sent!" : "Send"}
          {!sent && <ArrowRight className="w-4 h-4" />}
        </button>
      </motion.form>

      {/* Direct email link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <a
          href="mailto:hello@osmos.dev"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-black transition"
        >
          hello@osmos.dev
        </a>
      </motion.div>
    </section>
  )
}
