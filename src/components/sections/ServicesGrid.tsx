"use client";

import { motion, type Variants } from "framer-motion";
import {
  FileSearch,
  Target,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Building2,
} from "lucide-react";

const services = [
  {
    icon: FileSearch,
    title: "Resume Analysis",
    desc: "Deep ATS audit, keyword optimization, achievement quantification, and recruiter-eye view of your document.",
    accent: "#F4F5F7",
    span: "col-span-2",
  },
  {
    icon: Target,
    title: "Job Matching",
    desc: "Fit score breakdown across 7 dimensions including technical skills, domain expertise, and leadership signals.",
    accent: "#2A2D30",
    span: "col-span-1",
  },
  {
    icon: TrendingUp,
    title: "Career Gap Analysis",
    desc: "Compare your profile against target roles. Get a prioritized, impact-ranked roadmap to close every gap.",
    accent: "#00FFA3",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    desc: "Real-time salary benchmarks, in-demand skill signals, geographic demand maps, and hiring trend data.",
    accent: "#F4F5F7",
    span: "col-span-1",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    desc: "Role-specific technical and behavioral questions with probability scoring and ideal answer frameworks.",
    accent: "#2A2D30",
    span: "col-span-1",
  },
  {
    icon: Building2,
    title: "Company Intelligence",
    desc: "Funding status, tech stack, growth signals, hiring velocity, and interview format analysis.",
    accent: "#00FFA3",
    span: "col-span-2",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function ServicesGrid() {
  return (
    <section id="platform" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[10px] tracking-[0.4em] text-[#555] uppercase">Platform</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h2 className="font-display font-black text-4xl md:text-5xl text-center tracking-tight">
          Everything You Need to
          <br />
          <span className="gradient-text-blue">Win the Hiring Game</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.title}
              variants={cardVariants}
              className={`glass glass-hover rounded-2xl p-6 sm:p-8 group cursor-default relative overflow-hidden ${
                svc.span === "col-span-2" ? "sm:col-span-2 md:col-span-2" : "col-span-1"
              }`}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: svc.accent }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: `${svc.accent}15`,
                  border: `1px solid ${svc.accent}25`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: svc.accent }} />
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">
                {svc.title}
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">{svc.desc}</p>

              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.accent}, transparent)` }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
