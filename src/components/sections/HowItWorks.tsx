"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Upload & Extract",
    desc: "Paste or upload your resume. Our AI extracts every signal: skills, experience quality, achievement density, formatting, and ATS compatibility.",
    accent: "#F4F5F7",
    tag: "Instant parsing",
  },
  {
    num: "02",
    title: "Deep Analysis",
    desc: "Cross-reference against 12M+ job postings, industry benchmarks, and role-specific recruiter patterns. Calculate your exact market position.",
    accent: "#2A2D30",
    tag: "Market calibrated",
  },
  {
    num: "03",
    title: "Intelligence Report",
    desc: "Receive an executive-grade breakdown: fit scores, skill gaps, rewritten bullet points, priority actions, and a long-term career strategy.",
    accent: "#00FFA3",
    tag: "Actionable output",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-[#555] uppercase block mb-4">
              Methodology
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
              How It <span className="gradient-text-blue">Works</span>
            </h2>
          </div>
          <p className="text-[#555] max-w-xs text-sm leading-relaxed md:text-right">
            Three precise steps between you and your next interview.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex gap-6 md:gap-16 items-start ${
                  i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                {/* Step number / connector */}
                <div className="flex-shrink-0 flex flex-col items-center md:w-1/2 md:items-end md:pr-12 relative">
                  {i % 2 === 1 && <div className="hidden md:block" />}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: `${step.accent}10`,
                      border: `1px solid ${step.accent}30`,
                    }}
                  >
                    <span
                      className="font-display font-black text-xl"
                      style={{ color: step.accent }}
                    >
                      {step.num}
                    </span>
                    {/* Dot on timeline */}
                    <div
                      className="absolute -right-[calc(3rem+1px)] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#050505] hidden md:block"
                      style={{ background: step.accent }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 md:w-1/2 pb-4">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3 block"
                    style={{ color: step.accent }}
                  >
                    {step.tag}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#666] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
