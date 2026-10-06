"use client";

import Link from "next/link";
import { Zap, Code2, MessageCircle, Link2 } from "lucide-react";

const links = {
  Product: ["Resume Analyzer", "Job Matching", "Career Gaps", "Interview Prep"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-20 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#3B82F6] flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                <Zap className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="font-display font-bold tracking-widest text-white">
                NOCTURNE
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Elite AI career intelligence. Not motivational fluff — precision
              analysis that maximizes interview success.
            </p>
            <div className="flex gap-4 mt-6">
              {[Code2, MessageCircle, Link2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-[#FF6B00] hover:border-orange-500/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4 font-mono">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-white/40 hover:text-[#00D2FF] transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-white/30 font-mono">
            © 2025 Nocturne Intelligence. All rights reserved.
          </p>
          <p className="text-xs text-white/30 font-mono">
            Built for those who refuse to be average.
          </p>
        </div>
      </div>
    </footer>
  );
}
