"use client";

const items = [
  "Resume Analysis",
  "ATS Optimization",
  "Job Matching",
  "Skill Gap Analysis",
  "Interview Prep",
  "Market Intelligence",
  "Salary Benchmarking",
  "Career Roadmap",
  "Company Research",
  "Keyword Optimization",
  "Leadership Assessment",
  "Domain Expertise",
];

const doubled = [...items, ...items];

export default function FeaturesMarquee() {
  return (
    <div className="py-8 border-y border-white/5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

      <div className="marquee-content">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 mx-6 flex-shrink-0"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-[#555] hover:text-[#4F8EFF] transition-colors duration-300 cursor-default">
              {item}
            </span>
            <span className="text-[#222] text-lg font-light">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
