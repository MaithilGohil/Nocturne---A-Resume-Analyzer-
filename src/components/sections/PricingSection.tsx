"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    mo: 0, yr: 0,
    desc: "For curious job seekers",
    features: ["3 analyses / month", "Basic ATS score", "Skill gap overview", "Standard recommendations"],
    cta: "Get Started", featured: false,
  },
  {
    name: "Pro",
    mo: 19, yr: 15,
    desc: "For serious candidates",
    features: ["Unlimited analyses", "7-axis radar scoring", "Full bullet rewrites", "Priority action roadmap", "AI career coaching", "Job match scoring"],
    cta: "Start Free Trial", featured: true,
  },
  {
    name: "Elite",
    mo: 49, yr: 39,
    desc: "For peak performers",
    features: ["Everything in Pro", "Company intelligence", "Interview generator", "Salary guide", "1-on-1 AI strategy", "White-glove onboarding"],
    cta: "Contact Sales", featured: false,
  },
];

function TiltCard({ plan, yearly, index, reduced }: {
  plan: typeof PLANS[0]; yearly: boolean; index: number; reduced: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, on: false });
  const price = yearly ? plan.yr : plan.mo;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * 13,
      y: -((e.clientX - r.left) / r.width - 0.5) * 13,
      on: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0, on: false })}
      style={{
        transform: reduced ? undefined : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.on ? -6 : 0}px)`,
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      }}
      className={`relative rounded-2xl p-px ${plan.featured ? "bg-gradient-to-b from-green-500/40 via-green-500/15 to-green-500/5" : "bg-[#2a2a2a]"}`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-green-500 text-black px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className={`h-full rounded-[calc(1rem-1px)] p-7 flex flex-col ${plan.featured ? "bg-[#0d1f12]" : "bg-[#141414]"}`}>
        <div className="mb-7">
          <h3 className="text-xs font-semibold text-white/50 tracking-widest uppercase mb-3">{plan.name}</h3>
          <div className="flex items-end gap-1 mb-1">
            <motion.span
              key={`${plan.name}-${yearly}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-white"
            >
              {price === 0 ? "Free" : `$${price}`}
            </motion.span>
            {price > 0 && (
              <span className="text-white/25 text-sm mb-1.5">
                /{yearly ? "mo, billed yearly" : "month"}
              </span>
            )}
          </div>
          <p className="text-xs text-white/30">{plan.desc}</p>
        </div>

        <ul className="space-y-3 flex-1 mb-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-white/45">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-px" />
              {f}
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            plan.featured
              ? "bg-green-500 text-black hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              : "border border-[#2a2a2a] text-white hover:border-green-500/40 hover:text-green-400"
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="pricing" className="py-28 px-4 sm:px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.3em] text-green-500 uppercase font-medium">Pricing</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
            Invest in your <span className="text-green-400">career</span>
          </h2>
          <p className="mt-4 text-white/40 text-sm max-w-xs mx-auto">Start free. Upgrade when you're ready to win.</p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full bg-[#141414] border border-[#2a2a2a]">
            <button
              onClick={() => setYearly(false)}
              className={`relative px-5 py-2 rounded-full text-sm transition-all duration-200 ${!yearly ? "text-black font-semibold" : "text-white/40 hover:text-white"}`}
            >
              {!yearly && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-green-500" style={{ zIndex: -1 }} />}
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative px-5 py-2 rounded-full text-sm transition-all duration-200 ${yearly ? "text-black font-semibold" : "text-white/40 hover:text-white"}`}
            >
              {yearly && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-green-500" style={{ zIndex: -1 }} />}
              Yearly <span className={`ml-1 text-[10px] font-bold ${yearly ? "text-black" : "text-green-500"}`}>−20%</span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan, i) => (
            <TiltCard key={plan.name} plan={plan} yearly={yearly} index={i} reduced={reduced} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-xs text-white/20 mt-10"
        >
          No contracts. Cancel anytime. All plans include a 7-day free trial.
        </motion.p>
      </div>
    </section>
  );
}
