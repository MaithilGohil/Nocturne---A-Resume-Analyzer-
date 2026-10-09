"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#000000] border-t border-white/10">
      <div className="max-w-4xl mx-auto relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0C969C]/10 via-[#6BA3BE]/5 to-transparent blur-3xl" />

        <div className="rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden glass-card-3d bg-[#0a0a0a] border border-[#0A7075]/30">
          {/* Grid */}
          <div className="absolute inset-0 grid-overlay opacity-50 rounded-3xl" />

          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#0C969C]/10 rounded-br-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#6BA3BE]/10 rounded-tl-full blur-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <span className="text-[10px] tracking-[0.4em] text-[#0C969C] uppercase font-mono block mb-6 font-semibold">
              Start Now
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight mb-6 text-white">
              Your Next Interview
              <br />
              <span className="bg-gradient-to-r from-[#0C969C] via-[#6BA3BE] to-[#0A7075] bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>
            <p className="text-[#98b2ba] max-w-lg mx-auto mb-12 leading-relaxed text-sm sm:text-base">
              Upload your resume. Get a brutal, honest, data-driven analysis in
              seconds. No fluff. No motivational speeches. Just intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/analyze"
                id="cta-section-primary"
                className="group flex items-center gap-3 px-10 py-4.5 rounded-full bg-gradient-to-r from-[#0C969C] to-[#6BA3BE] text-black font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 hover:shadow-[0_0_50px_rgba(12,150,156,0.4)] hover:scale-105"
              >
                Analyze Resume Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-xs text-[#98b2ba]/60 font-mono">
                No sign-up required &middot; Instant results
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
