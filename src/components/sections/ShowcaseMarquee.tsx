"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ── Showcase Data Array (Easily customizable) ────────────────── */
export interface ShowcaseItem {
  id: string;
  src: string;
  alt: string;
  widthType: "portrait" | "square" | "wide";
  tag?: string;
  caption?: string;
  role?: string;
}

export const ROW_1_ITEMS: ShowcaseItem[] = [
  {
    id: "r1-1",
    src: "/showcase/showcase-1.png",
    alt: "J.P. Morgan Placement",
    widthType: "wide",
    tag: "Investment Banking",
    caption: "Quantitative Analyst Portfolio",
    role: "J.P. Morgan • New York",
  },
  {
    id: "r1-2",
    src: "/showcase/showcase-2.jpg",
    alt: "Ferrari Engineering",
    widthType: "portrait",
    tag: "Automotive & Aerodynamics",
    caption: "Formula 1 Vehicle Dynamics",
    role: "Scuderia Ferrari • Maranello",
  },
  {
    id: "r1-3",
    src: "/showcase/showcase-3.png",
    alt: "ISRO Space Systems",
    widthType: "portrait",
    tag: "Aerospace Systems",
    caption: "Lunar & Solar Mission Systems",
    role: "ISRO • Propulsion Division",
  },
  {
    id: "r1-4",
    src: "/showcase/showcase-4.jpg",
    alt: "Apple Product Design",
    widthType: "square",
    tag: "Industrial Design",
    caption: "Human Interface & Hardware",
    role: "Apple • Cupertino",
  },
  {
    id: "r1-5",
    src: "/showcase/showcase-5.png",
    alt: "Hublot Precision Horology",
    widthType: "square",
    tag: "Haute Horlogerie",
    caption: "Chronograph Movement Architecture",
    role: "Hublot • Geneva",
  },
];

export const ROW_2_ITEMS: ShowcaseItem[] = [
  {
    id: "r2-1",
    src: "/showcase/showcase-3.png",
    alt: "ISRO Space Flight Division",
    widthType: "portrait",
    tag: "Mission Control",
    caption: "Orbital Mechanics & Telemetry",
    role: "ISRO • Bangalore",
  },
  {
    id: "r2-2",
    src: "/showcase/showcase-4.jpg",
    alt: "Apple Architecture",
    widthType: "wide",
    tag: "Silicon Engineering",
    caption: "Neural Engine System Architecture",
    role: "Apple • Hardware Technologies",
  },
  {
    id: "r2-3",
    src: "/showcase/showcase-5.png",
    alt: "Hublot Precision Craft",
    widthType: "portrait",
    tag: "Mechanical Precision",
    caption: "High-Complication Calibre Lead",
    role: "Hublot • Nyon",
  },
  {
    id: "r2-4",
    src: "/showcase/showcase-1.png",
    alt: "J.P. Morgan Global Finance",
    widthType: "square",
    tag: "Algorithmic Trading",
    caption: "High Frequency Execution Systems",
    role: "J.P. Morgan • London",
  },
  {
    id: "r2-5",
    src: "/showcase/showcase-2.jpg",
    alt: "Ferrari Performance Engineering",
    widthType: "wide",
    tag: "Telemetry & Performance",
    caption: "Trackside Race Strategy & Telemetry",
    role: "Scuderia Ferrari • Racing Team",
  },
];

/* ── Card Component ───────────────────────────────────────────── */
function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const widthClasses = {
    portrait: "w-[180px] sm:w-[260px] md:w-[280px]",
    square: "w-[220px] sm:w-[340px] md:w-[400px]",
    wide: "w-[300px] sm:w-[520px] md:w-[680px]",
  }[item.widthType];

  return (
    <div
      className={`group marquee-card relative shrink-0 ${widthClasses} h-[220px] sm:h-[320px] rounded-2xl border border-[#2a2a2a] bg-[#141414] overflow-hidden transition-all duration-300 hover:border-[#22c55e]/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.15)] select-none`}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Media */}
      <div className="relative w-full h-full bg-[#0d0d0d] overflow-hidden flex items-center justify-center">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 500px, 700px"
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* Top Tag */}
      {item.tag && (
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase bg-black/60 backdrop-blur-md border border-white/10 text-white/80 group-hover:border-[#22c55e]/40 group-hover:text-[#22c55e] transition-colors duration-300">
            {item.tag}
          </span>
        </div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
        {item.role && (
          <span className="text-[11px] font-mono text-[#22c55e] font-medium tracking-wide mb-1">
            {item.role}
          </span>
        )}
        {item.caption && (
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
            {item.caption}
          </h3>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function ShowcaseMarquee() {
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause animation when off-screen to preserve GPU/CPU cycles
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const playState = isVisible ? "running" : "paused";

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-24 sm:py-32 bg-[#0a0a0a] overflow-hidden border-t border-b border-[#2a2a2a]/40"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-green-500/5 blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-14 sm:mb-18"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs tracking-[0.3em] text-[#22c55e] uppercase font-mono font-medium">
            SHOWCASE
          </span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
          Built for people who <span className="text-[#22c55e]">get hired</span>
        </h2>
        <p className="mt-4 text-white/40 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          From Wall Street quant desks to aerospace command centers — candidate portfolios optimized by Nocturne.
        </p>
      </motion.div>

      {/* Marquee Rows Container */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="space-y-3 sm:space-y-4 w-full"
      >
        {/* ROW 1: Moves LEFT TO RIGHT (45s) */}
        <div className={`marquee-row relative w-full ${reducedMotion ? "overflow-x-auto scrollbar-hide px-4" : "overflow-hidden marquee-mask"}`}>
          <div
            className={`marquee-track flex w-max ${reducedMotion ? "" : "animate-marquee-ltr"}`}
            style={reducedMotion ? {} : { animationPlayState: playState }}
          >
            {/* Set 1 */}
            <div className="flex gap-3 shrink-0 pr-3">
              {ROW_1_ITEMS.map((item) => (
                <ShowcaseCard key={`r1-s1-${item.id}`} item={item} />
              ))}
            </div>
            {/* Set 2 (Duplicate for infinite seamless loop) */}
            <div className="flex gap-3 shrink-0 pr-3" aria-hidden={!reducedMotion ? "true" : undefined}>
              {ROW_1_ITEMS.map((item) => (
                <ShowcaseCard key={`r1-s2-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Moves RIGHT TO LEFT (55s) */}
        <div className={`marquee-row relative w-full ${reducedMotion ? "overflow-x-auto scrollbar-hide px-4" : "overflow-hidden marquee-mask"}`}>
          <div
            className={`marquee-track flex w-max ${reducedMotion ? "" : "animate-marquee-rtl"}`}
            style={reducedMotion ? {} : { animationPlayState: playState }}
          >
            {/* Set 1 */}
            <div className="flex gap-3 shrink-0 pr-3">
              {ROW_2_ITEMS.map((item) => (
                <ShowcaseCard key={`r2-s1-${item.id}`} item={item} />
              ))}
            </div>
            {/* Set 2 (Duplicate for infinite seamless loop) */}
            <div className="flex gap-3 shrink-0 pr-3" aria-hidden={!reducedMotion ? "true" : undefined}>
              {ROW_2_ITEMS.map((item) => (
                <ShowcaseCard key={`r2-s2-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
