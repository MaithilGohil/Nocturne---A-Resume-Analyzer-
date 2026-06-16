"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#F4F5F7]/5 via-transparent to-transparent blur-3xl" />

        <div className="glass rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0 grid-overlay opacity-50 rounded-3xl" />

          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4F8EFF]/5 rounded-br-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#A78BFA]/5 rounded-tl-full blur-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <span className="text-[10px] tracking-[0.4em] text-[#555] uppercase block mb-6">
              Start Now
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight mb-6">
              Your Next Interview
              <br />
              <span className="gradient-text-blue">Starts Here</span>
            </h2>
            <p className="text-[#666] max-w-lg mx-auto mb-12 leading-relaxed">
              Upload your resume. Get a brutal, honest, data-driven analysis in
              seconds. No fluff. No motivational speeches. Just intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/analyze"
                id="cta-section-primary"
                className="group flex items-center gap-3 px-10 py-5 rounded-full bg-[#F4F5F7] text-[#050505] font-bold text-sm tracking-wide hover:bg-white transition-all duration-300 hover:shadow-[0_0_60px_rgba(244,245,247,0.2)] hover:scale-105"
              >
                Analyze Resume Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-xs text-[#444]">
                No sign-up required &middot; Instant results
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
