"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-[#0A7075]/40 bg-[#031716] p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(3,23,22,0.98)] z-10 glass-card-3d overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#032F30] border border-[#0A7075]/40 text-[#0C969C] text-[11px] font-mono font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0C969C] animate-pulse" />
                Nocturne Access
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight font-display">
                Sign in to Nocturne
              </h3>
              <p className="text-xs text-[#98b2ba] mt-1.5 max-w-xs mx-auto leading-relaxed">
                Save your resume versions, unlock 7-axis radar intelligence, and manage ATS tailoring.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0C969C]/15 border border-[#0C969C]/30 flex items-center justify-center mx-auto text-[#0C969C]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Magic Link Dispatched</h4>
                <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
                  We sent a temporary sign-in link to <span className="text-[#0C969C] font-mono">{email}</span>. Click the link to log in instantly.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0C969C]/20 border border-[#0C969C]/40 text-white hover:bg-[#0C969C]/30 transition-colors"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {/* Social Auth Providers */}
                <div className="space-y-2.5">
                  {/* GitHub */}
                  <button
                    type="button"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => setSubmitted(true), 600);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#0A7075]/40 bg-[#032F30]/40 hover:bg-[#032F30]/80 hover:border-[#0C969C]/60 text-white font-medium text-xs sm:text-sm transition-all duration-200 group"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Continue with GitHub
                  </button>

                  {/* LinkedIn */}
                  <button
                    type="button"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => setSubmitted(true), 600);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#0A7075]/40 bg-[#032F30]/40 hover:bg-[#032F30]/80 hover:border-[#0C969C]/60 text-white font-medium text-xs sm:text-sm transition-all duration-200 group"
                  >
                    <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                    </svg>
                    Continue with LinkedIn
                  </button>

                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => setSubmitted(true), 600);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#0A7075]/40 bg-[#032F30]/40 hover:bg-[#032F30]/80 hover:border-[#0C969C]/60 text-white font-medium text-xs sm:text-sm transition-all duration-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z" />
                    </svg>
                    Continue with Google
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#0A7075]/30" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                    <span className="bg-[#031716] px-3 text-[#6BA3BE]/60">Or with Email</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6BA3BE]/50" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#032F30]/50 border border-[#0A7075]/40 text-white placeholder-[#6BA3BE]/40 text-xs sm:text-sm focus:outline-none focus:border-[#0C969C] focus:shadow-[0_0_15px_rgba(12,150,156,0.3)] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0C969C] to-[#6BA3BE] text-black font-bold text-xs sm:text-sm hover:brightness-110 hover:shadow-[0_0_25px_rgba(12,150,156,0.4)] transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      "Sending Magic Link..."
                    ) : (
                      <>
                        Continue with Email
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer note */}
                <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#98b2ba]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0C969C]" />
                  <span>No credit card required. Encrypted & private.</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
