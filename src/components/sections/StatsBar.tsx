"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { val: 98, suffix: "%", label: "Analysis Accuracy", color: "#4F8EFF" },
  { val: 500, suffix: "K+", label: "Resumes Analyzed", color: "#A78BFA" },
  { val: 12, suffix: "K+", label: "Companies Tracked", color: "#00FFA3" },
  { val: 4.9, suffix: "/5", label: "User Satisfaction", color: "#C0C0C0" },
];

function Counter({ val, suffix }: { val: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const isDecimal = !Number.isInteger(val);
          const start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (val - start) * eased;
            el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          };

          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [val, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section id="intelligence" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0d1a35]/30 to-[#0A0A0A]" />
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#555] uppercase">By the numbers</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div
                className="font-display font-black text-5xl md:text-6xl mb-2 transition-all duration-300 group-hover:scale-105"
                style={{ color: stat.color }}
              >
                <Counter val={stat.val} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-[#555] tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
