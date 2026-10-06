"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  FileText,
  Key,
  ShieldCheck,
  Share2,
  Cpu,
  RefreshCw,
  Layers,
  ArrowRight,
  Database,
  SlidersHorizontal,
} from "lucide-react";

/* ── Bullet Rewriter Sample Data ──────────────────────────────── */
const BULLET_EXAMPLES = [
  {
    id: "eng",
    role: "Staff Software Engineer",
    oldBullet: "Responsible for managing a team and improving deployment processes.",
    newBullet:
      "Spearheaded a 14-engineer team to architect automated CI/CD pipelines, slashing deployment latency by 42% and processing $45M+ in daily transaction volume with 99.999% uptime.",
    metrics: ["+42% Pipeline Speed", "$45M+ Daily Volume", "99.999% SLA"],
    matchedKeywords: ["CI/CD Pipelines", "Transaction Volume", "High Availability", "Distributed Systems"],
    missingKeywords: ["Kubernetes Operator", "gRPC Mesh"],
  },
  {
    id: "pm",
    role: "Principal Product Manager",
    oldBullet: "Worked with cross-functional teams to launch new app features.",
    newBullet:
      "Led end-to-end GTM for core SaaS enterprise tier across 6 squads, accelerating annual recurring revenue (ARR) from $8M to $22M (+175%) within 11 months.",
    metrics: ["+$14M ARR Growth", "6 Product Squads", "+175% YoY Lift"],
    matchedKeywords: ["GTM Strategy", "Enterprise SaaS", "Cross-functional Leadership", "ARR Scaling"],
    missingKeywords: ["PLG Monetization", "Cohort Retention"],
  },
  {
    id: "quant",
    role: "Quantitative Trader",
    oldBullet: "Built trading algorithms and monitored market risks.",
    newBullet:
      "Engineered low-latency C++ arbitrage execution models generating $19.4M in annual alpha while tightening maximum portfolio drawdown from 8.2% to 3.1%.",
    metrics: ["$19.4M Annual Alpha", "3.1% Max Drawdown", "<15μs Execution"],
    matchedKeywords: ["Low-Latency C++", "Arbitrage Execution", "Risk Attribution", "Alpha Generation"],
    missingKeywords: ["Order Book Imbalance"],
  },
];

/* ── Template Archetypes ──────────────────────────────────────── */
const TEMPLATES = [
  { id: "aurora", name: "Aurora Modern", type: "Full-Bleed Header", font: "font-sans", color: "from-[#FF6B00] to-[#FFA800]" },
  { id: "sterling", name: "Sterling Executive", type: "Classic Serif", font: "font-serif", color: "from-[#3B82F6] to-[#00D2FF]" },
  { id: "prism", name: "Prism Minimalist", type: "Clean Rail", font: "font-sans", color: "from-[#F97316] to-[#3B82F6]" },
  { id: "timeline", name: "Pulse Timeline", type: "Visual Timeline", font: "font-mono", color: "from-[#00D2FF] to-[#3B82F6]" },
];

export default function AITailorIntelligence() {
  const reduced = useReducedMotion() ?? false;
  const [selectedExample, setSelectedExample] = useState(0);
  const [isRewritten, setIsRewritten] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState(0);

  const currentExample = BULLET_EXAMPLES[selectedExample];

  return (
    <section id="intelligence" className="relative py-28 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden border-t border-b border-[#2a2a2a]/40">
      {/* Background ambient dual glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-orange-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="text-xs tracking-[0.3em] text-[#FF6B00] uppercase font-mono font-medium">
              RESUME INTELLIGENCE
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            See what recruiters see.{" "}
            <br />
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#3B82F6] bg-clip-text text-transparent">
              Rewrite with real impact.
            </span>
          </h2>
          <p className="mt-4 text-white/40 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Applicant Tracking Systems filter out 75% of resumes before human eyes touch them. Nocturne parses, quantifies, and tailors every bullet in seconds.
          </p>
        </motion.div>

        {/* ── MODULE 1: Live Interactive AI Bullet Tailor ────────── */}
        <div className="grid lg:grid-cols-12 gap-6 mb-16 items-stretch">
          
          {/* Left Panel: Role Switcher & ATS Signals */}
          <div className="lg:col-span-4 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 flex flex-col justify-between glass-card-3d">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono tracking-wider text-white/50 uppercase font-semibold">Select Role Profile</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-[#FF6B00] border border-orange-500/20">
                  Live ATS Demo
                </span>
              </div>

              {/* Role Buttons */}
              <div className="space-y-2 mb-6">
                {BULLET_EXAMPLES.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      setSelectedExample(idx);
                      setIsRewritten(true);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                      selectedExample === idx
                        ? "bg-gradient-to-r from-orange-500/15 to-blue-500/10 border border-[#FF6B00]/40 text-white shadow-[0_0_20px_rgba(255,107,0,0.15)]"
                        : "bg-white/[0.02] border border-white/5 text-white/50 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{ex.role}</span>
                    {selectedExample === idx && <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00]" />}
                  </button>
                ))}
              </div>

              {/* ATS Keyword Match Audit */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-white/60">ATS Keywords Matched</span>
                  <span className="text-[#00D2FF] font-bold">4 / 6 signals</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {currentExample.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/25 text-[#00D2FF]"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {kw}
                    </span>
                  ))}
                  {currentExample.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-white/30"
                    >
                      <AlertCircle className="w-2.5 h-2.5 text-orange-400" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom ATS Pass Status */}
            <div className="p-3.5 rounded-xl bg-orange-500/8 border border-orange-500/20 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-xs font-semibold text-white">Parser Integrity</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#FF6B00]">98.4% Clean</span>
            </div>
          </div>

          {/* Right Panel: Interactive Transformation Card */}
          <div className="lg:col-span-8 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 sm:p-8 flex flex-col justify-between glass-card-3d">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-xs font-mono tracking-widest text-[#FF6B00] uppercase font-bold">
                    AI Transformation Engine
                  </span>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => setIsRewritten(!isRewritten)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-[#FF6B00]/40 transition-all duration-200"
                >
                  <RefreshCw className="w-3 h-3 text-[#FF6B00]" />
                  {isRewritten ? "View Original Bullet" : "Apply AI Transformation"}
                </button>
              </div>

              {/* Content Area */}
              <div className="min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isRewritten ? (
                    <motion.div
                      key="new"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-[#00D2FF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                        QUANTIFIED & IMPACT-OPTIMIZED (CURRENT)
                      </div>
                      <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                        &ldquo;{currentExample.newBullet}&rdquo;
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="old"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        ORIGINAL WEAK / PASSIVE BULLET
                      </div>
                      <p className="text-base sm:text-lg font-normal text-white/50 leading-relaxed line-through decoration-orange-500/50">
                        &ldquo;{currentExample.oldBullet}&rdquo;
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Key Metrics Extracted */}
            <div className="pt-6 border-t border-white/5 mt-6">
              <span className="text-[11px] font-mono uppercase text-white/40 tracking-wider block mb-3">
                Extracted Value Metrics
              </span>
              <div className="grid grid-cols-3 gap-3">
                {currentExample.metrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-xs sm:text-sm font-bold font-mono text-[#FF6B00] block">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MODULE 2: 4 Pillars of Nocturne Intelligence ────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          
          {/* Feature 1 */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 glass-card-3d flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">ATS-Clean Architecture</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Zero parsing errors. Structured single-pass hierarchies parse through Workday, Taleo, Greenhouse, and Lever without garbling.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-[#FF6B00]">
              100% Parser Compliant
            </div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 glass-card-3d flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Key className="w-5 h-5 text-[#00D2FF]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Bring Your Own Key</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Connect your OpenAI, Claude, or Gemini API keys directly to run unlimited tailoring at raw token wholesale cost with zero markups.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-[#00D2FF]">
              Zero Subscription Trap
            </div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 glass-card-3d flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-[#F97316]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Full Token Audit</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Every LLM call logged transparently: prompt tokens, completion latency, and model fingerprint for full auditability.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-[#F97316]">
              Real-time Token Log
            </div>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 glass-card-3d flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Data Privacy First</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Your career history is stored locally in your browser session or encrypted vault. Never harvested, never sold to recruiters.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-[#3B82F6]">
              Private & GDPR Safe
            </div>
          </div>
        </div>

        {/* ── MODULE 3: 4-Way Universal Export Banner ─────────────── */}
        <div className="rounded-2xl border border-[#2a2a2a] bg-gradient-to-r from-[#141414] via-[#161311] to-[#141414] p-8 sm:p-10 glass-card-3d flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] block mb-2 font-bold">
              PORTABILITY & EXPORTS
            </span>
            <h3 className="text-2xl font-black text-white">Take your resume everywhere.</h3>
            <p className="text-xs text-white/40 mt-2 leading-relaxed">
              Export whenever you're ready with zero watermarks and no hidden fees. Keep JSON backups to re-import anytime.
            </p>
          </div>

          {/* Export Formats */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: "Vector PDF", icon: FileText, color: "text-[#FF6B00] border-orange-500/30 bg-orange-500/10" },
              { label: "Word DOCX", icon: FileText, color: "text-[#3B82F6] border-blue-500/30 bg-blue-500/10" },
              { label: "JSON Schema", icon: Database, color: "text-[#00D2FF] border-cyan-500/30 bg-cyan-500/10" },
              { label: "Shareable Link", icon: Share2, color: "text-[#FFA800] border-amber-500/30 bg-amber-500/10" },
            ].map((exp, i) => {
              const Icon = exp.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold ${exp.color} transition-transform hover:scale-105 select-none`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {exp.label}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
