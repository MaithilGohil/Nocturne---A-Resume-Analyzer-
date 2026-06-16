"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), { ssr: false });

const badges = [
  { label: "ATS Compatible", color: "#F4F5F7" },
  { label: "AI-Powered", color: "#888888" },
  { label: "Real-time", color: "#00FFA3" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      hero.style.setProperty("--mx", `${x}px`);
      hero.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay"
    >
      {/* Background radial */}
      <div className="absolute inset-0 bg-gradient-radial from-[#111214] via-[#050505] to-[#050505] opacity-80" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-6 blur-[120px]"
        style={{ background: "radial-gradient(circle, #F4F5F7, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-4 blur-[100px]"
        style={{ background: "radial-gradient(circle, #888888, transparent)" }}
      />

      {/* 3D Object */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] opacity-70">
          <ThreeCanvas />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {badges.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
              style={{
                color: b.color,
                borderColor: `${b.color}33`,
                background: `${b.color}0D`,
              }}
            >
              <Sparkles className="w-3 h-3" />
              {b.label}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-4xl sm:text-5xl md:text-7xl xl:text-8xl leading-[0.9] tracking-tighter mb-6"
        >
          <span className="block text-white">CAREER</span>
          <span className="block gradient-text-blue">INTELLIGENCE</span>
          <span className="block text-white text-3xl sm:text-4xl md:text-6xl xl:text-7xl mt-2 font-light tracking-tight">
            REDEFINED
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#999] text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Elite AI-powered resume analysis, job matching, and career gap
          identification. Think like a recruiter, act like a strategist.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/analyze"
            id="hero-primary-cta"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#F4F5F7] text-[#050505] font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,245,247,0.25)] hover:scale-105"
          >
            Analyze My Resume
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#platform"
            id="hero-secondary-cta"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-[#ccc] font-medium text-sm tracking-wide hover:border-white/30 hover:text-white transition-all duration-300 hover:bg-white/5"
          >
            Explore Platform
          </Link>
        </motion.div>

        {/* Stats inline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-6 sm:gap-10 mt-16 sm:mt-20 text-center"
        >
          {[
            { val: "98%", label: "Match Accuracy" },
            { val: "500K+", label: "Resumes Analyzed" },
            { val: "12K+", label: "Companies Tracked" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl font-display font-bold gradient-text-blue">
                {s.val}
              </div>
              <div className="text-xs text-[#555] tracking-widest uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444]"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
