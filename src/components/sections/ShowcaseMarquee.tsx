"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ── Showcase Data Array (Updated with Mercedes Neon & IBM Quantum) ── */
export interface ShowcaseItem {
  id: string;
  src: string;
  alt: string;
  widthType: "portrait" | "square" | "wide";
  tag?: string;
  caption?: string;
  role?: string;
  accentColor?: string;
}

export const ROW_1_ITEMS: ShowcaseItem[] = [
  {
    id: "r1-1",
    src: "/showcase/porsche-green.png",
    alt: "Porsche GT3 RS Motorsport Engineering",
    widthType: "wide",
    tag: "Automotive Dynamics",
    caption: "GT3 RS Aerodynamics & Trackside Telemetry",
    role: "Porsche Motorsport • Weissach",
    accentColor: "#0C969C",
  },
  {
    id: "r1-3",
    src: "/showcase/showcase-1.png",
    alt: "J.P. Morgan Quantitative Finance",
    widthType: "square",
    tag: "Investment Banking",
    caption: "Quantitative Portfolio & Risk Architecture",
    role: "J.P. Morgan • New York",
    accentColor: "#6BA3BE",
  },
  {
    id: "r1-4",
    src: "/showcase/showcase-9.png",
    alt: "Cyberpunk Spatial Computing",
    widthType: "portrait",
    tag: "Spatial Computing",
    caption: "Neural XR Headset & Haptics",
    role: "DeepMind XR • London",
    accentColor: "#0C969C",
  },
  {
    id: "r1-5",
    src: "/showcase/ferrari.png",
    alt: "Scuderia Ferrari Aerodynamics & Powertrain",
    widthType: "portrait",
    tag: "Formula 1 Racing",
    caption: "F1 Hybrid Powertrain & Telemetry Architecture",
    role: "Scuderia Ferrari • Maranello",
    accentColor: "#6BA3BE",
  },
];

export const ROW_2_ITEMS: ShowcaseItem[] = [
  {
    id: "r2-1",
    src: "/showcase/oculus.png",
    alt: "Oculus Neural Cybernetics & VR Systems",
    widthType: "portrait",
    tag: "Spatial XR",
    caption: "Neural XR Interface & Sensory Telemetry",
    role: "Oculus Research • Menlo Park",
    accentColor: "#0C969C",
  },
  {
    id: "r2-2",
    src: "/showcase/showcase-3.png",
    alt: "ISRO Lunar Exploration",
    widthType: "portrait",
    tag: "Aerospace Systems",
    caption: "Deep Space Propulsion & Telemetry",
    role: "ISRO • Mission Operations",
    accentColor: "#6BA3BE",
  },
  {
    id: "r2-3",
    src: "/showcase/ibm-quantum.png",
    alt: "IBM Quantum Systems & Research",
    widthType: "wide",
    tag: "Quantum Computing",
    caption: "Qiskit Quantum Hardware & Superconducting Qubits",
    role: "IBM Research • Yorktown Heights",
    accentColor: "#0C969C",
  },
  {
    id: "r2-4",
    src: "/showcase/showcase-8.png",
    alt: "Neural Architecture & Cybernetic UI",
    widthType: "portrait",
    tag: "Human Interface",
    caption: "Synthetic Neuro-Visual Systems",
    role: "Neuralink • Fremont",
    accentColor: "#0A7075",
  },
];

/* ── 3D Tilt Card Component ───────────────────────────────────── */
function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const reducedMotion = useReducedMotion() ?? false;
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6; // max 6deg
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    setTilt({ x, y, hovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, hovered: false });
  };

  const widthClasses = {
    portrait: "w-[190px] sm:w-[260px] md:w-[290px]",
    square: "w-[230px] sm:w-[340px] md:w-[410px]",
    wide: "w-[310px] sm:w-[530px] md:w-[700px]",
  }[item.widthType];

  const transformStyle = reducedMotion
    ? undefined
    : tilt.hovered
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.02)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";

  return (
    <div
      className={`group marquee-card relative shrink-0 ${widthClasses} h-[220px] sm:h-[320px] rounded-2xl glass-card-3d bg-[#032F30]/40 overflow-hidden select-none cursor-pointer border border-[#0A7075]/25`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTilt((t) => ({ ...t, hovered: true }))}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        willChange: "transform, opacity",
      }}
    >
      {/* Light Sheen Sweep Effect on Hover */}
      <div className="sheen-layer" />

      {/* Media Container */}
      <div className="relative w-full h-full bg-[#031716] overflow-hidden flex items-center justify-center">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 310px, (max-width: 1024px) 540px, 720px"
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/95 via-[#031716]/45 to-transparent pointer-events-none" />
      </div>

      {/* Top Tag with Dynamic Accent */}
      {item.tag && (
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase bg-[#031716]/85 backdrop-blur-md border border-[#0A7075]/40 text-[#6BA3BE] group-hover:border-[#0C969C] group-hover:text-[#0C969C] transition-colors duration-300">
            {item.tag}
          </span>
        </div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
        {item.role && (
          <span
            className="text-[11px] font-mono font-medium tracking-wide mb-1"
            style={{ color: item.accentColor || "#0C969C" }}
          >
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
      className="relative py-24 sm:py-32 bg-[#031716] overflow-hidden border-t border-b border-[#0A7075]/25"
    >
      {/* Dual ambient glow: Electric Cyan left, Ocean Teal right */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#0C969C]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#0A7075]/15 blur-[150px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-14 sm:mb-18"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#032F30]/60 border border-[#0A7075]/40 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0C969C] animate-pulse" />
          <span className="text-xs tracking-[0.3em] text-[#0C969C] uppercase font-mono font-medium">
            SHOWCASE
          </span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
          This Dreams Need to be{" "}
          <span className="bg-gradient-to-r from-[#0C969C] via-[#6BA3BE] to-[#0A7075] bg-clip-text text-transparent">
            Achieved
          </span>
        </h2>
        <p className="mt-4 text-[#98b2ba] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          From Wall Street quant desks to aerospace engineering labs — candidate portfolios optimized by Nocturne.
        </p>
      </motion.div>

      {/* Marquee Rows Container */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="space-y-4 sm:space-y-5 w-full"
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
