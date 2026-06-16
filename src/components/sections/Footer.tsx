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
    <footer className="border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F8EFF] to-[#A78BFA] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display font-bold tracking-widest text-white">
                NOCTURNE
              </span>
            </Link>
            <p className="text-[#444] text-sm leading-relaxed max-w-xs">
              Elite AI career intelligence. Not motivational fluff — precision
              analysis that maximizes interview success.
            </p>
            <div className="flex gap-4 mt-6">
              {[Code2, MessageCircle, Link2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-[#444] hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[#444] hover:text-white transition-colors duration-200"
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
          <p className="text-xs text-[#333]">
            © 2025 Nocturne Intelligence. All rights reserved.
          </p>
          <p className="text-xs text-[#333]">
            Built for those who refuse to be average.
          </p>
        </div>
      </div>
    </footer>
  );
}
