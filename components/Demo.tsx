"use client"

import { motion } from "framer-motion"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, AlertTriangle, Mail, Database, Globe, Shield, BarChart3, Filter } from "lucide-react"

/* ============================================================
   Minimal Nodes-Only Demo (LOCKED: no pan/zoom)
   – fixed-size panel on desktop, responsive on mobile
   – only nodes (no bars/minimap/palette)
   – page scroll works normally over the panel
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
  note?: string
}

const NODE_W = 168
const NODE_H = 64
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)

const iconForKind: Record<NodeKind, React.ReactNode> = {
  source: <Globe className="w-3.5 h-3.5" />,
  transform: <Filter className="w-3.5 h-3.5" />,
  enrich: <Database className="w-3.5 h-3.5" />,
  validate: <Shield className="w-3.5 h-3.5" />,
  ml: <BarChart3 className="w-3.5 h-3.5" />,
  select: <Filter className="w-3.5 h-3.5" />,
  outreach: <Mail className="w-3.5 h-3.5" />,
  storage: <Database className="w-3.5 h-3.5" />,
  end: <CheckCircle2 className="w-3.5 h-3.5" />,
}

const kindChipBg: Record<NodeKind, string> = {
  source: "bg-sky-400/15 text-sky-200 border-sky-300/30",
  transform: "bg-purple-400/15 text-purple-200 border-purple-300/30",
  enrich: "bg-emerald-400/15 text-emerald-200 border-emerald-300/30",
  validate: "bg-amber-400/15 text-amber-200 border-amber-300/30",
  ml: "bg-fuchsia-400/15 text-fuchsia-200 border-fuchsia-300/30",
  select: "bg-yellow-400/15 text-yellow-200 border-yellow-300/30",
  outreach: "bg-rose-400/15 text-rose-200 border-rose-300/30",
  storage: "bg-cyan-400/15 text-cyan-200 border-cyan-300/30",
  end: "bg-emerald-400/15 text-emerald-200 border-emerald-300/30",
}

export default function Demo() {
  return (
    <section id="demo" className="relative mx-auto max-w-6xl px-4 py-24 border-t border-white/5">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl md:text-5xl tracking-tight"
      >
        Lead Scraper & Outreach — Nodes
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="mx-auto mt-3 max-w-2xl text-center text-mute md:text-lg"
      >
        Minimal, production-style mock. <span className="text-neutral-400">Fixed view (no zoom or pan).</span>
      </motion.p>

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
        className="relative mx-auto mt-8 w-full max-w-5xl h-[420px] sm:h-[500px] md:h-[560px] rounded-3xl border border-white/10 bg-[#121314]/95 shadow-[0_20px_60px_rgba(0,0,0,.45)] overflow-hidden"
      >
        {/* grid + subtle underglow */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:42px_42px,42px_42px] opacity-35"
        />
        <div
          aria-hidden
          className="absolute bottom-[-30px] left-1/2 h-[280px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(60%_60%_at_50%_95%,rgba(255,34,71,.12),transparent_74%)] blur-3xl"
        />

        <NodesOnlyCanvas />
      </motion.div>
    </section>
  )
}

function NodesOnlyCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // viewport (locked after fit)
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)

  // graph
  const [nodes, setNodes] = useState<WNode[]>(() => defaultNodes())

  const fitView = useCallback(() => {
    if (!wrapperRef.current || nodes.length === 0) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const pad = 120
    const xs = nodes.map((n) => n.x)
    const ys = nodes.map((n) => n.y)
    const minX = Math.min(...xs) - NODE_W / 2
    const maxX = Math.max(...xs) + NODE_W / 2
    const minY = Math.min(...ys) - NODE_H / 2
    const maxY = Math.max(...ys) + NODE_H / 2
    const gw = maxX - minX
    const gh = maxY - minY
    const s = clamp(Math.min((rect.width - pad) / gw, (rect.height - pad) / gh), 0.22, 2.5)
    setScale(s)
    setTx(rect.width / 2 - (minX + gw / 2) * s)
    setTy(rect.height / 2 - (minY + gh / 2) * s)
  }, [nodes])

  // initial + resize fit
  useEffect(() => {
    requestAnimationFrame(fitView)
  }, [fitView])

  useEffect(() => {
    const onResize = () => fitView()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [fitView])

  /* --------- mock run: status pulse across nodes --------- */
  const steps = useMemo(() => nodeRunOrder(), [])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    let raf: number
    let last = performance.now()
    const interval = 720

    const frame = (t: number) => {
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
      raf = requestAnimationFrame(frame)
    }

    // seed
    setNodes((ns) => ns.map((n, i) => ({ ...n, status: i === 0 ? "running" : "idle" })))
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [steps])

  // locked view transform
  const inPanelStyle = {
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    transformOrigin: "0 0" as const,
  }

  return (
    <div
      ref={wrapperRef}
      // No wheel/pinch/drag handlers -> panel will NOT zoom/pan.
      className="absolute inset-0"
      // Allow normal page scrolling over the panel:
      // (no preventDefault anywhere; nothing to intercept the wheel)
    >
      <div className="absolute inset-0" style={inPanelStyle}>
        {nodes.map((n) => (
          <div key={n.id} className="absolute" style={{ transform: `translate(${n.x - NODE_W / 2}px, ${n.y - NODE_H / 2}px)` }}>
            <NodeCard node={n} />
          </div>
        ))}
      </div>
    </div>
  )
}

function NodeCard({ node }: { node: WNode }) {
  const statusColor =
    node.status === "running"
      ? "ring-amber-300/70"
      : node.status === "done"
      ? "ring-emerald-400/70"
      : node.status === "error"
      ? "ring-rose-400/70"
      : "ring-white/10"
  const borderColor = "rgba(255,255,255,0.14)"
  return (
    <div
      className={`relative rounded-xl border shadow-[0_10px_40px_rgba(0,0,0,.45)] ring-1 ${statusColor}`}
      style={{ width: NODE_W, height: NODE_H, borderColor, background: "rgba(10,11,12,0.92)" }}
    >
      <div className="absolute inset-0 rounded-xl" style={{ background: node.color, opacity: 0.12 }} />
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: node.color, opacity: 0.7 }} />
      <div className="flex flex-col justify-center h-full px-3 gap-1">
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-1.5 text-[10px] px-1.5 py-0.5 rounded border ${kindChipBg[node.kind]}`}>
            {iconForKind[node.kind]}
            <span className="capitalize">{node.kind}</span>
          </div>
          <div className="text-[13px] font-semibold text-neutral-100 leading-tight line-clamp-1">{node.label}</div>
        </div>
        {node.note && <div className="text-[11px] text-neutral-400 leading-tight line-clamp-1">{node.note}</div>}
      </div>
    </div>
  )
}

/* ============================================================
   Graph data & helpers
============================================================ */

function defaultNodes(): WNode[] {
  const C0 = -520
  const C1 = -320
  const C2 = -120
  const C3 = 80
  const C4 = 300
  const C5 = 520

  const nodes: WNode[] = [
    n("plan", "Plan (niche=Roofers, location=Swansea, limit=50)", C0, -60, "#F02247", "transform"),

    // sources
    n("google", "Google Maps", C1, -180, "#22D3EE", "source"),
    n("yelp", "Yelp", C1, -60, "#38BDF8", "source"),
    n("cohouse", "Companies House", C1, 60, "#60A5FA", "source"),
    n("facebook", "Facebook Pages", C1, 180, "#3b82f6", "source"),
    n("trustpilot", "Trustpilot", C1, 300, "#22c55e", "source"),

    // transform
    n("merge", "Merge & Dedupe (domain/phone)", C2, -60, "#A78BFA", "transform"),
    n("normalize", "Normalize Fields", C2, 60, "#8b5cf6", "transform"),

    // enrich / validate
    n("crawl", "Website Crawler", C3, -60, "#F472B6", "enrich"),
    n("emailPatterns", "Email Finder (patterns)", C3, 40, "#fb7185", "enrich"),
    n("mx", "MX Lookup", C3, 140, "#34D399", "validate"),
    n("smtp", "SMTP Verify", C3, 240, "#10b981", "validate"),
    n("linkedin", "LinkedIn Enrich", C3, 340, "#4ADE80", "enrich"),

    // scoring
    n("score", "Fit Score (niche × intent × quality)", C4, 40, "#F59E0B", "ml"),
    n("select", "Select Top-K (20)", C4, 140, "#EAB308", "select"),

    // outreach/output
    n("sequencer", "Outreach Sequencer", C5, 40, "#FB7185", "outreach"),
    n("send", "Send (mock)", C5, 140, "#f43f5e", "outreach"),
    n("crm", "Route → CRM (mock)", C5, 240, "#22D3EE", "storage"),
    n("export", "Export CSV", C5, 340, "#06b6d4", "storage"),
    n("done", "Done", C5, 440, "#34D399", "end"),
  ]
  return nodes.map((x) => ({ ...x, status: "idle" as const }))
}

function n(id: NodeId, label: string, x: number, y: number, color: string, kind: NodeKind): WNode {
  return { id, label, x, y, color, kind, status: "idle" }
}

function nodeRunOrder(): NodeId[] {
  return [
    "plan",
    "google",
    "yelp",
    "cohouse",
    "facebook",
    "trustpilot",
    "merge",
    "normalize",
    "crawl",
    "emailPatterns",
    "mx",
    "smtp",
    "linkedin",
    "score",
    "select",
    "sequencer",
    "send",
    "crm",
    "export",
    "done",
  ]
}
