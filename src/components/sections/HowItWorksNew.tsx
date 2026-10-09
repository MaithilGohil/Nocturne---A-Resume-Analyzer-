"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Upload, Cpu, Trophy } from "lucide-react";

const STEPS = [
  {
    num: "01", icon: Upload,
    title: "Upload Your Resume",
    desc: "Paste your resume text. Our parser extracts every signal — skills, achievements, gaps, and formatting flaws — in under 3 seconds.",
    details: ["Instant extraction", "Format preservation", "Multi-page support"],
    accent: "#0C969C",
  },
  {
    num: "02", icon: Cpu,
    title: "AI Analyzes Everything",
    desc: "Seven dimensions. Hundreds of data points. Cross-referenced against live job market trends, ATS rules, and hiring patterns from 12,000+ companies.",
    details: ["7-axis scoring", "ATS compatibility check", "Market demand mapping"],
    accent: "#6BA3BE",
  },
  {
    num: "03", icon: Trophy,
    title: "Get Your Competitive Edge",
    desc: "Receive a precise intelligence report: your final score, rewritten bullet points, prioritised action items, and a long-term career strategy.",
    details: ["Rewritten bullet points", "Priority action plan", "Career strategy roadmap"],
    accent: "#0C969C",
  },
];

export default function HowItWorksNew() {
  const reduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progressH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActiveStep(0);
    else if (v < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-[#000000] border-t border-white/10"
      style={{ height: reduced ? "auto" : "290vh" }}
    >
      <div className={reduced ? "" : "sticky top-0 h-screen overflow-hidden"}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col py-20 sm:py-24">

          {/* Header */}
          <div className="mb-12">
            <span className="text-xs tracking-[0.3em] text-[#0C969C] uppercase font-mono font-medium">Methodology</span>
            <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
              How It <span className="bg-gradient-to-r from-[#0C969C] via-[#6BA3BE] to-[#0A7075] bg-clip-text text-transparent">Works</span>
            </h2>
          </div>

          <div className="flex gap-10 lg:gap-16 flex-1 min-h-0 items-center">

            {/* Left: Steps */}
            <div className="flex-1 relative">
              {/* Progress line */}
              <div className="absolute left-5 top-3 bottom-3 w-px bg-white/10">
                {!reduced && (
                  <motion.div
                    className="absolute top-0 w-full bg-gradient-to-b from-[#0C969C] via-[#6BA3BE] to-[#0A7075] rounded-full shadow-[0_0_12px_rgba(12,150,156,0.5)]"
                    style={{ height: progressH }}
                  />
                )}
              </div>

              <div className="space-y-10 sm:space-y-14">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const active = reduced || activeStep === i;
                  return (
                    <motion.div
                      key={i}
                      className="flex gap-6 sm:gap-8 pl-14 relative"
                      animate={reduced ? {} : { opacity: active ? 1 : 0.2, x: active ? 0 : -6 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Dot */}
                      <div
                        className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          active
                            ? "border-[#0C969C] bg-[#0C969C]/15 shadow-[0_0_15px_rgba(12,150,156,0.35)]"
                            : "border-white/10 bg-[#0a0a0a]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${active ? "text-[#0C969C]" : "text-white/20"}`} />
                      </div>

                      <div className="flex-1">
                        <div className="text-xs text-[#0C969C] font-mono mb-1">{step.num}</div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-[#98b2ba] leading-relaxed max-w-sm mb-4">{step.desc}</p>
                        <div className="space-y-1.5">
                          {step.details.map((d, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs text-white/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0C969C] flex-shrink-0" />
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right: Resume image with step-reactive overlays (enlarged & prominent) */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <motion.div
                className="relative w-full max-w-[480px]"
                animate={reduced ? {} : {
                  rotateY: activeStep === 0 ? -4 : activeStep === 2 ? 4 : 0,
                  rotateX: activeStep === 1 ? -2 : 0,
                }}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black border border-[#0A7075]/40 glass-card-3d bg-[#080808]">
                  <Image
                    src="/resume-poster-red.png"
                    alt="Resume being analyzed"
                    width={520}
                    height={650}
                    className="object-contain w-full max-h-[520px] bg-[#050505]"
                  />

                  {/* Step 1 — scanning overlay */}
                  {!reduced && activeStep === 1 && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 bg-[#0C969C]/10" />
                      <motion.div
                        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0C969C] to-transparent opacity-90"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute inset-x-0 h-14 bg-gradient-to-b from-[#0C969C]/25 to-transparent"
                        animate={{ top: ["0%", "90%", "0%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  )}

                  {/* Step 2 — score overlay */}
                  {!reduced && activeStep === 2 && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#0a0a0a]/95 backdrop-blur-md rounded-2xl p-7 border border-[#0C969C]/50 text-center shadow-[0_0_35px_rgba(12,150,156,0.3)]"
                      >
                        <div className="text-5xl font-black bg-gradient-to-r from-[#0C969C] to-[#6BA3BE] bg-clip-text text-transparent">87</div>
                        <div className="text-xs text-white/50 mt-1 tracking-widest uppercase font-mono">Intelligence Score</div>
                        <div className="mt-3 text-[11px] text-[#0C969C] font-semibold">Top 8% of analyzed resumes</div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
