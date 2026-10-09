"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Showcase", href: "#showcase" },
  { label: "Platform", href: "#platform" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Pricing", href: "#pricing" },
];

export default function FloatingNav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
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
          <span className="font-display font-bold text-base tracking-wide text-white group-hover:text-[#0C969C] transition-colors duration-200">
            Nocturne
          </span>
        </Link>

        {/* Desktop links + CTA + Sign In */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm text-white/60 hover:text-[#6BA3BE] transition-colors duration-200 tracking-wide font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-[#0A7075]/30">
            <button
              onClick={() => setAuthOpen(true)}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-[#0A7075]/40 text-white/90 hover:text-white hover:border-[#0C969C] hover:bg-[#0C969C]/10 transition-all duration-200 flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-[#0C969C]" />
              Sign in
            </button>

            <Link
              href="/analyze"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-[#0C969C] to-[#6BA3BE] text-black hover:brightness-110 transition-all duration-200 hover:shadow-[0_0_20px_rgba(12,150,156,0.4)]"
            >
              Analyze Resume
            </Link>
          </div>
        </div>

        {/* Mobile: CTA + Sign In + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setAuthOpen(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#0A7075]/40 text-white/80 hover:text-white"
          >
            Sign in
          </button>
          <Link
            href="/analyze"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0C969C] to-[#6BA3BE] text-black"
          >
            Analyze
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors ml-1"
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
            className="fixed top-[60px] left-0 right-0 z-40 bg-[#031716]/95 backdrop-blur-xl border-b border-[#0A7075]/30 px-5 py-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-white/70 hover:text-[#0C969C] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setAuthOpen(true);
              }}
              className="text-left text-sm text-[#0C969C] font-semibold py-1 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign in with Email, GitHub, LinkedIn
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
