"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FileSearch, Activity, GitBranch, BarChart3, MessageCircle } from "lucide-react";

/* ── Mini Animations (Orange & Electric Blue Palette) ────────── */

function ScanAnim({ r }: { r: boolean }) {
  return (
    <div className="relative h-24 overflow-hidden rounded-xl bg-black/40 p-4">
      {[100, 75, 90, 60, 82].map((w, i) => (
        <div key={i} className="mb-2 h-1.5 rounded-full bg-white/8" style={{ width: `${w}%` }} />
      ))}
      {!r && (
        <>
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
            animate={{ top: ["8%", "92%", "8%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-x-0 h-10 bg-gradient-to-b from-[#FF6B00]/15 to-transparent"
            animate={{ top: ["0%", "82%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}

function RadarAnim({ r }: { r: boolean }) {
  const n = 7;
  const R = 38;
  const cx = 50, cy = 50;
  const angles = Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
  const scores = [0.82, 0.67, 0.91, 0.74, 0.88, 0.59, 0.77];
  const dataPts = scores.map((s, i) => `${cx + s * R * Math.cos(angles[i])},${cy + s * R * Math.sin(angles[i])}`).join(" ");
  const ring = (rad: number) => angles.map(a => `${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`).join(" ");

  return (
    <div className="flex justify-center py-1">
      <svg viewBox="0 0 100 100" className="h-24 w-24">
        {[R, R * 0.66, R * 0.33].map((rad, i) => (
          <polygon key={i} points={ring(rad)} fill="none" stroke="white" strokeOpacity={0.06} strokeWidth={0.5} />
        ))}
        {angles.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)} stroke="white" strokeOpacity={0.06} strokeWidth={0.5} />
        ))}
        <motion.polygon
          points={dataPts}
          fill="rgba(59,130,246,0.18)"
          stroke="#00D2FF"
          strokeWidth={1.2}
          initial={{ opacity: 0, scale: 0 }}
          animate={r ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
          transition={r ? { duration: 0.5 } : { duration: 3, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </svg>
    </div>
  );
}

function RoadmapAnim({ r }: { r: boolean }) {
  const nodes = [{ x: 15, y: 50, l: "Upload" }, { x: 50, y: 18, l: "Analyze" }, { x: 85, y: 50, l: "Results" }];
  return (
    <svg viewBox="0 0 100 70" className="w-full h-20">
      <motion.path
        d="M15,50 C30,50 35,18 50,18 C65,18 70,50 85,50"
        fill="none" stroke="#FF6B00" strokeWidth={1.5} strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={r ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
        transition={r ? { duration: 0.8 } : { duration: 2.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      />
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x} cy={n.y} r={3.5}
            fill="#141414" stroke="#FFA800" strokeWidth={1.2}
            initial={{ scale: 0, opacity: 0 }}
            animate={r ? { scale: 1, opacity: 1 } : { scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={r ? { duration: 0.5, delay: i * 0.2 } : { duration: 3.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 0 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
          <text x={n.x} y={n.y + 12} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={5}>{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

function BarAnim({ r }: { r: boolean }) {
  const bars = [
    { h: 50, c: "rgba(59,130,246,0.5)" }, { h: 65, c: "rgba(255,107,0,0.7)" },
    { h: 44, c: "rgba(0,210,255,0.45)" }, { h: 80, c: "rgba(249,115,22,0.85)" },
    { h: 38, c: "rgba(59,130,246,0.4)" }, { h: 60, c: "rgba(255,107,0,0.6)" },
  ];
  return (
    <div className="flex items-end gap-2 h-24">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{ height: b.h, background: b.c, originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={r ? { scaleY: 1 } : { scaleY: [0, 1, 1, 0] }}
          transition={r ? { duration: 0.6, delay: i * 0.08 } : {
            duration: 3, delay: i * 0.12, repeat: Infinity, repeatDelay: 0.6,
            ease: "easeOut", times: [0, 0.35, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}

function ChatAnim({ r }: { r: boolean }) {
  const bubbles = [
    { right: false, delay: 0 }, { right: true, delay: 0.9 }, { right: false, delay: 1.8 },
  ];
  return (
    <div className="space-y-2 py-1">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`flex ${b.right ? "justify-end" : ""}`}
          initial={{ opacity: 0, x: b.right ? 8 : -8 }}
          animate={r ? { opacity: 1, x: 0 } : { opacity: [0, 1, 1, 0], x: [b.right ? 8 : -8, 0, 0, 0] }}
          transition={r ? { duration: 0.4, delay: i * 0.2 } : {
            duration: 4, delay: b.delay, repeat: Infinity, repeatDelay: 0, times: [0, 0.15, 0.75, 1],
          }}
        >
          <div className={`rounded-2xl px-3 py-2 max-w-[80%] ${b.right ? "bg-orange-500/20 text-orange-200 rounded-br-sm border border-orange-500/20" : "bg-blue-500/15 text-blue-200 rounded-bl-sm border border-blue-500/20"}`}>
            <span className="flex gap-0.5">
              {[0, 0.2, 0.4].map((d, j) => (
                <motion.span key={j} className="text-[10px] text-white/60" animate={r ? {} : { opacity: [0.2, 1, 0.2] }} transition={r ? {} : { duration: 0.8, delay: d, repeat: Infinity }}>●</motion.span>
              ))}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Spotlight Card with Dynamic Border Glow ─────────────────── */

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`group relative rounded-2xl p-px transition-all duration-500 ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(255,107,0,0.32), rgba(59,130,246,0.2) 40%, #2a2a2a 70%)`
          : "#1e1e1e",
      }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative h-full rounded-[calc(1rem-1px)] bg-[#141414] overflow-hidden"
        style={hovered ? { background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(255,107,0,0.04), #141414 55%)` } : {}}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */

const CARDS = [
  { icon: FileSearch, title: "Resume Scanner", desc: "Scans every line for ATS signals, keyword density, and formatting red flags.", anim: "scan", span: "lg:col-span-2", color: "text-[#FF6B00] bg-orange-500/10 border-orange-500/20" },
  { icon: Activity,   title: "7-Axis Radar",    desc: "Scores across seven competency dimensions simultaneously.", anim: "radar", span: "", color: "text-[#00D2FF] bg-blue-500/10 border-blue-500/20" },
  { icon: GitBranch,  title: "Career Roadmap",  desc: "Auto-generates a prioritised skill development path.", anim: "roadmap", span: "", color: "text-[#F97316] bg-orange-500/10 border-orange-500/20" },
  { icon: BarChart3,  title: "Market Trends",   desc: "Real-time job market demand mapped to your skill profile.", anim: "bars", span: "", color: "text-[#3B82F6] bg-blue-500/10 border-blue-500/20" },
  { icon: MessageCircle, title: "AI Coach",     desc: "Conversational guidance through every career decision.", anim: "chat", span: "", color: "text-[#FFA800] bg-amber-500/10 border-amber-500/20" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function PlatformSection() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const renderAnim = (type: string) => {
    switch (type) {
      case "scan":    return <ScanAnim r={reduced} />;
      case "radar":   return <RadarAnim r={reduced} />;
      case "roadmap": return <RoadmapAnim r={reduced} />;
      case "bars":    return <BarAnim r={reduced} />;
      case "chat":    return <ChatAnim r={reduced} />;
    }
  };

  return (
    <section id="platform" className="py-28 px-4 sm:px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-[#FF6B00] uppercase font-mono font-medium">Platform</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#3B82F6] bg-clip-text text-transparent">
              outperform
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg text-sm leading-relaxed">
            Five intelligent tools. One unified platform. Built to turn your resume into a precision instrument.
          </p>
        </motion.div>

        {/* Bento */}
        <motion.div
          ref={ref} variants={container} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} variants={item} className={`${card.span} flex`}>
                <SpotlightCard className="flex-1">
                  <div className="p-6 h-full flex flex-col">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${card.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
                    <p className="text-xs text-white/35 leading-relaxed mb-5">{card.desc}</p>
                    <div className="mt-auto">{renderAnim(card.anim)}</div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}

          {/* Laptop image — full-width showcase */}
          <motion.div variants={item} className="sm:col-span-2 lg:col-span-3">
            <SpotlightCard>
              <div className="relative overflow-hidden rounded-[calc(1rem-1px)]" style={{ minHeight: 260 }}>
                <Image src="/laptop-saas.png" alt="Nocturne platform in action" fill className="object-cover object-top opacity-75" sizes="(max-width: 1200px) 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="inline-flex items-center gap-2 text-xs text-[#FF6B00] bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                    Intelligence Engine Active
                  </div>
                  <p className="text-white font-semibold text-lg max-w-md leading-snug">
                    The most precise career intelligence platform ever built for job seekers.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
