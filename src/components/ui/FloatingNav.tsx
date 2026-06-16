"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Pricing", href: "#pricing" },
];

export default function FloatingNav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY.current && y > 80 && !menuOpen);
    setScrolled(y > 20);
    lastY.current = y;
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 transition-all duration-500 ${
          scrolled || menuOpen
            ? "glass border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
            : ""
        }`}
      >
        {/* Brand */}
        <Link href="/" className="group" onClick={() => setMenuOpen(false)}>
          <span className="font-display font-bold text-base tracking-wide text-white group-hover:text-[#F4F5F7] transition-colors duration-200">
            Nocturne
          </span>
        </Link>

        {/* Desktop links + CTA */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#999] hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/analyze"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-[#F4F5F7] text-[#050505] hover:bg-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(244,245,247,0.15)]"
          >
            Analyze Resume
          </Link>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/analyze"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F4F5F7] text-[#050505]"
          >
            Analyze
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 flex items-center justify-center text-[#999] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass border-b border-white/5 px-5 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#888] hover:text-white transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
