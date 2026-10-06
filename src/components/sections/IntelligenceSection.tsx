"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ── Count-up hook ───────────────────────────────────────────── */
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let n = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); return; }
      setCount(Math.round(n));
    }, 16);
    return () => clearInterval(t);
  }, [trigger, target, duration]);
  return count;
}

/* ── Score Ring ──────────────────────────────────────────────── */
function ScoreRing({ score, label, color, trigger, reduced }: {
  score: number; label: string; color: string; trigger: boolean; reduced: boolean;
}) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const count = useCountUp(score, 1400, trigger);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="110" height="110" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
          <motion.circle
            cx="50" cy="50" r={r}
            fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={trigger ? { strokeDashoffset: circ - (score / 100) * circ } : {}}
            transition={reduced ? { duration: 0 } : { duration: 1.4, ease: "easeOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50px 50px" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white leading-none">{count}</span>
          <span className="text-[10px] text-white/25 mt-0.5">/100</span>
        </div>
      </div>
      <span className="text-xs text-white/40 text-center">{label}</span>
    </div>
  );
}

/* ── Skill Bar ───────────────────────────────────────────────── */
function SkillBar({ skill, score, color, delay, trigger, reduced }: {
  skill: string; score: number; color: string; delay: number; trigger: boolean; reduced: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-white/45">{skill}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={trigger ? { width: `${score}%` } : {}}
          transition={reduced ? { duration: 0 } : { duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const SCORES = [
  { label: "ATS Score",          score: 91, color: "#22c55e" },
  { label: "Job Fit",             score: 84, color: "#4ade80" },
  { label: "Achievement Density", score: 77, color: "#86efac" },
  { label: "Final Score",         score: 87, color: "#22c55e" },
];

const SKILLS = [
  { skill: "Technical Skills",    score: 88, color: "#22c55e" },
  { skill: "Communication",       score: 74, color: "#4ade80" },
  { skill: "Leadership",          score: 61, color: "#86efac" },
  { skill: "Industry Knowledge",  score: 82, color: "#22c55e" },
  { skill: "Domain Expertise",    score: 79, color: "#4ade80" },
  { skill: "Education",           score: 95, color: "#86efac" },
];

export default function IntelligenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="intelligence" className="relative py-28 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">

      {/* 3D mockup as ambient background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none">
        <Image src="/resume-3d-mockup.png" alt="" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-xs tracking-[0.3em] text-green-500 uppercase font-medium">Intelligence</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
            Precision <span className="text-green-400">scoring</span>,<br />not estimates
          </h2>
          <p className="mt-4 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Every dimension of your resume is quantified. No guesswork. No generic advice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Score Rings */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="rounded-2xl border border-[#2a2a2a] bg-[#141414]/80 backdrop-blur-sm p-8"
          >
            <p className="text-xs text-white/25 tracking-widest uppercase mb-8">Score Breakdown</p>
            <div className="grid grid-cols-2 gap-8">
              {SCORES.map((s) => (
                <ScoreRing key={s.label} score={s.score} label={s.label} color={s.color} trigger={inView} reduced={reduced} />
              ))}
            </div>

            {/* 3D mockup inset image */}
            <div className="mt-8 relative rounded-xl overflow-hidden h-32 border border-white/5">
              <Image src="/resume-3d-mockup.png" alt="Premium resume mockup" fill className="object-cover object-top" sizes="500px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] text-green-400/60 font-mono tracking-widest">SAMPLE OUTPUT</span>
              </div>
            </div>
          </motion.div>

          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-2xl border border-[#2a2a2a] bg-[#141414]/80 backdrop-blur-sm p-8"
          >
            <p className="text-xs text-white/25 tracking-widest uppercase mb-8">Dimension Analysis</p>
            <div className="space-y-5">
              {SKILLS.map((s, i) => (
                <SkillBar key={s.skill} skill={s.skill} score={s.score} color={s.color} delay={i * 0.1} trigger={inView} reduced={reduced} />
              ))}
            </div>

            {/* Result badge */}
            <div className="mt-8 p-4 rounded-xl bg-green-500/6 border border-green-500/15 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-black text-lg">87</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Elite Candidate Profile</div>
                <div className="text-xs text-white/30 mt-0.5">Top 8% of all analyzed resumes</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
