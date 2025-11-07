"use client"

import { motion } from "framer-motion"
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { CheckCircle2, Mail, Database, Globe, Shield, BarChart3, Filter } from "lucide-react"

/* ============================================================
   Clean Light Mode — Fully Working Responsive Nodes Demo
============================================================ */

type NodeId = string
type NodeKind =
  | "source"
  | "transform"
  | "enrich"
  | "validate"
  | "ml"
  | "select"
  | "outreach"
  | "storage"
  | "end"

interface WNode {
  id: NodeId
  label: string
  x: number
  y: number
  color: string
  kind: NodeKind
  status?: "idle" | "running" | "done" | "error"
}

const NODE_W = 160
const NODE_H = 58
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)

const icons: Record<NodeKind, React.ReactNode> = {
  source: <Globe className="w-4 h-4" />,
  transform: <Filter className="w-4 h-4" />,
  enrich: <Database className="w-4 h-4" />,
  validate: <Shield className="w-4 h-4" />,
  ml: <BarChart3 className="w-4 h-4" />,
  select: <Filter className="w-4 h-4" />,
  outreach: <Mail className="w-4 h-4" />,
  storage: <Database className="w-4 h-4" />,
  end: <CheckCircle2 className="w-4 h-4" />,
}

export default function Demo() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20 border-t border-neutral-200">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl md:text-5xl text-neutral-900 tracking-tight"
      >
        Lead Scraper & Outreach
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        viewport={{ once: true }}
        className="mx-auto mt-3 max-w-2xl text-center text-neutral-500"
      >
        Lightweight visual demo — nodes only. Clean, minimal, production-style.
      </motion.p>

      {/* Canvas Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="relative mx-auto mt-8 w-full max-w-5xl h-[640px] sm:h-[540px] md:h-[560px] rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.05)_1px,transparent_1px)] [background-size:42px_42px,42px_42px]"
        />
        <NodesCanvas />
      </motion.div>
    </section>
  )
}

function NodesCanvas() {
  const ref = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<WNode[]>([])
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)

  // generate nodes dynamically after mount
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640
      setNodes(mobile ? mobileNodes() : desktopNodes())
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const fitView = useCallback(() => {
    if (!ref.current || !nodes.length) return
    const rect = ref.current.getBoundingClientRect()
    const isMobile = window.innerWidth < 640
    const pad = isMobile ? 80 : 100

    const xs = nodes.map((n) => n.x)
    const ys = nodes.map((n) => n.y)
    const minX = Math.min(...xs) - NODE_W / 2
    const maxX = Math.max(...xs) + NODE_W / 2
    const minY = Math.min(...ys) - NODE_H / 2
    const maxY = Math.max(...ys) + NODE_H / 2
    const gw = maxX - minX
    const gh = maxY - minY

    const minScale = isMobile ? 0.9 : 0.35
    const s = clamp(Math.min((rect.width - pad) / gw, (rect.height - pad) / gh), minScale, 1.6)
    setScale(s)
    setTx(rect.width / 2 - (minX + gw / 2) * s)
    setTy(rect.height / 2 - (minY + gh / 2) * s)
  }, [nodes])

  useEffect(() => {
    requestAnimationFrame(fitView)
  }, [fitView, nodes])

  // animate run sequence
  const steps = useMemo(() => runOrder(), [])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!nodes.length) return
    let raf: number
    let last = performance.now()
    const interval = 800

    const tick = (t: number) => {
      if (t - last >= interval) {
        last = t
        setIdx((i) => {
          const next = (i + 1) % steps.length
          setNodes((ns) =>
            ns.map((n) =>
              n.id === steps[next]
                ? { ...n, status: "running" }
                : {
                    ...n,
                    status:
                      n.id === steps[(next - 1 + steps.length) % steps.length]
                        ? "done"
                        : n.status === "running"
                        ? "done"
                        : n.status,
                  }
            )
          )
          return next
        })
      }
      raf = requestAnimationFrame(tick)
    }

    setNodes((ns) => ns.map((n, i) => ({ ...n, status: i === 0 ? "running" : "idle" })))
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [steps, nodes.length])

  const style = {
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    transformOrigin: "0 0" as const,
  }

  return (
    <div ref={ref} className="absolute inset-0">
      <div className="absolute inset-0" style={style}>
        {nodes.map((n) => (
          <div
            key={n.id}
            className="absolute"
            style={{
              transform: `translate(${n.x - NODE_W / 2}px, ${n.y - NODE_H / 2}px)`,
            }}
          >
            <NodeCard node={n} />
          </div>
        ))}
      </div>
    </div>
  )
}

function NodeCard({ node }: { node: WNode }) {
  const border =
    node.status === "running"
      ? "border-amber-400"
      : node.status === "done"
      ? "border-emerald-400"
      : "border-neutral-300"
  return (
    <div
      className={`rounded-lg border ${border} bg-white/95 shadow-sm transition-all duration-300`}
      style={{ width: NODE_W, height: NODE_H }}
    >
      <div className="flex h-full flex-col justify-center px-3">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">{icons[node.kind]}</span>
          <span className="text-[13px] font-medium text-neutral-800">
            {node.label}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Node Layout Definitions
============================================================ */

function desktopNodes(): WNode[] {
  const C0 = -500
  const C1 = -300
  const C2 = -100
  const C3 = 100
  const C4 = 300
  const C5 = 500

  const n = (id: string, label: string, x: number, y: number, color: string, kind: NodeKind): WNode => ({
    id,
    label,
    x,
    y,
    color,
    kind,
    status: "idle",
  })

  return [
    n("plan", "Plan (Roofers, Swansea)", C0, -40, "#0284c7", "transform"),
    n("google", "Google Maps", C1, -100, "#0ea5e9", "source"),
    n("yelp", "Yelp", C1, 0, "#38bdf8", "source"),
    n("facebook", "Facebook Pages", C1, 100, "#3b82f6", "source"),
    n("merge", "Merge & Dedupe", C2, 0, "#a855f7", "transform"),
    n("crawl", "Website Crawler", C3, 0, "#ec4899", "enrich"),
    n("score", "Lead Score", C4, 0, "#f59e0b", "ml"),
    n("outreach", "Outreach (mock)", C5, 0, "#ef4444", "outreach"),
    n("done", "Done", C5, 100, "#22c55e", "end"),
  ]
}

function mobileNodes(): WNode[] {
  const n = (id: string, label: string, y: number, color: string, kind: NodeKind): WNode => ({
    id,
    label,
    x: 0,
    y,
    color,
    kind,
    status: "idle",
  })

  return [
    n("plan", "Plan (Roofers, Swansea)", -280, "#0284c7", "transform"),
    n("google", "Google Maps", -200, "#0ea5e9", "source"),
    n("yelp", "Yelp", -120, "#38bdf8", "source"),
    n("facebook", "Facebook Pages", -40, "#3b82f6", "source"),
    n("merge", "Merge & Dedupe", 40, "#a855f7", "transform"),
    n("crawl", "Website Crawler", 120, "#ec4899", "enrich"),
    n("score", "Lead Score", 200, "#f59e0b", "ml"),
    n("outreach", "Outreach (mock)", 280, "#ef4444", "outreach"),
    n("done", "Done", 360, "#22c55e", "end"),
  ]
}

function runOrder(): NodeId[] {
  return ["plan", "google", "yelp", "facebook", "merge", "crawl", "score", "outreach", "done"]
}
