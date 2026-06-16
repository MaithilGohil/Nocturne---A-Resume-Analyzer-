"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior ML Engineer → Google",
    content:
      "Nocturne identified that my resume was missing 14 critical keywords for senior ML roles. After optimization, I went from 2% callback rate to landing 6 interviews in 3 weeks.",
    score: "94",
    accent: "#F4F5F7",
    stars: 5,
  },
  {
    name: "Marcus Williams",
    role: "Product Manager → Stripe",
    content:
      "The gap analysis was brutally honest. It told me exactly what I was missing for PM roles at fintech companies—and gave me a 90-day roadmap to fix it. Worth every penny.",
    score: "88",
    accent: "#2A2D30",
    stars: 5,
  },
  {
    name: "Priya Patel",
    role: "Data Scientist → Anthropic",
    content:
      "The AI didn't flatter me. It told me my bullet points were weak and my experience section read like a job description. The rewritten version was 10x better.",
    score: "91",
    accent: "#00FFA3",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#555] uppercase block mb-4">
            Results
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">
            Real Outcomes,{" "}
            <span className="gradient-text-blue">Not Promises</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group"
            >
              {/* Score badge */}
              <div
                className="absolute top-6 right-6 w-12 h-12 rounded-xl flex flex-col items-center justify-center"
                style={{
                  background: `${t.accent}15`,
                  border: `1px solid ${t.accent}30`,
                }}
              >
                <span className="text-xs font-black" style={{ color: t.accent }}>
                  {t.score}
                </span>
                <span className="text-[8px] text-[#555] tracking-wide">FIT</span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-[#F4F5F7] text-[#F4F5F7]" />
                ))}
              </div>

              <p className="text-[#888] text-sm leading-relaxed mb-8 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: `${t.accent}20`, color: t.accent }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-[#555]">{t.role}</div>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
