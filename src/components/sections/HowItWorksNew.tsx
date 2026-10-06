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
  },
  {
    num: "02", icon: Cpu,
    title: "AI Analyzes Everything",
    desc: "Seven dimensions. Hundreds of data points. Cross-referenced against live job market trends, ATS rules, and hiring patterns from 12,000+ companies.",
    details: ["7-axis scoring", "ATS compatibility check", "Market demand mapping"],
  },
  {
    num: "03", icon: Trophy,
    title: "Get Your Competitive Edge",
    desc: "Receive a precise intelligence report: your final score, rewritten bullet points, prioritised action items, and a long-term career strategy.",
    details: ["Rewritten bullet points", "Priority action plan", "Career strategy roadmap"],
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
      className="relative bg-[#050505]"
      style={{ height: reduced ? "auto" : "290vh" }}
    >
      <div className={reduced ? "" : "sticky top-0 h-screen overflow-hidden"}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col py-20 sm:py-24">

          {/* Header */}
          <div className="mb-12">
            <span className="text-xs tracking-[0.3em] text-green-500 uppercase font-medium">Methodology</span>
            <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
              How It <span className="text-green-400">Works</span>
            </h2>
          </div>

          <div className="flex gap-10 lg:gap-20 flex-1 min-h-0">

            {/* Left: Steps */}
            <div className="flex-1 relative">
              {/* Progress line */}
              <div className="absolute left-5 top-3 bottom-3 w-px bg-white/6">
                {!reduced && (
                  <motion.div className="absolute top-0 w-full bg-green-400 rounded-full" style={{ height: progressH }} />
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
                      <div className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${active ? "border-green-400 bg-green-500/10" : "border-[#2a2a2a] bg-[#141414]"}`}>
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${active ? "text-green-400" : "text-white/15"}`} />
                      </div>

                      <div className="flex-1">
                        <div className="text-xs text-green-500/50 font-mono mb-1">{step.num}</div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-white/35 leading-relaxed max-w-sm mb-4">{step.desc}</p>
                        <div className="space-y-1.5">
                          {step.details.map((d, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs text-white/25">
                              <span className="w-1 h-1 rounded-full bg-green-400/50 flex-shrink-0" />
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

            {/* Right: Resume image with step-reactive overlays */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <motion.div
                className="relative w-full max-w-[420px]"
                animate={reduced ? {} : {
                  rotateY: activeStep === 0 ? -4 : activeStep === 2 ? 4 : 0,
                  rotateX: activeStep === 1 ? -2 : 0,
                }}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-white/6">
                  <Image
                    src="/resume-templates.png"
                    alt="Resume being analyzed"
                    width={460}
                    height={360}
                    className="object-cover w-full"
                  />

                  {/* Step 1 — scanning overlay */}
                  {!reduced && activeStep === 1 && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 bg-green-400/4" />
                      <motion.div
                        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-70"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute inset-x-0 h-12 bg-gradient-to-b from-green-400/10 to-transparent"
                        animate={{ top: ["0%", "90%", "0%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  )}

                  {/* Step 2 — score overlay */}
                  {!reduced && activeStep === 2 && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/50"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#0a0a0a]/90 backdrop-blur-sm rounded-2xl p-7 border border-green-500/30 text-center"
                      >
                        <div className="text-5xl font-black text-green-400">87</div>
                        <div className="text-xs text-white/40 mt-1 tracking-widest uppercase">Intelligence Score</div>
                        <div className="mt-3 text-[11px] text-green-400/70">Top 8% of analyzed resumes</div>
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
