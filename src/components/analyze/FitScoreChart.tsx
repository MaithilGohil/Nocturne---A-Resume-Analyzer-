"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FitScoreChartProps {
  score: number;
  label?: string;
  color?: string;
  size?: number;
}

export default function FitScoreChart({
  score,
  label = "Fit Score",
  color = "#4F8EFF",
  size = 160,
}: FitScoreChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 16;
    const startAngle = -Math.PI / 2;
    const duration = 1500;
    const startTime = performance.now();

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentScore = score * eased;
      const endAngle = startAngle + (currentScore / 100) * Math.PI * 2;

      ctx.clearRect(0, 0, size, size);

      // Track
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 8;
      ctx.stroke();

      // Fill
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + "88");

      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.stroke();

      // Glow
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.strokeStyle = color + "22";
      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.stroke();

      if (progress < 1) requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }, [score, color, size]);

  const scoreColor =
    score >= 80 ? "#00FFA3" : score >= 60 ? "#4F8EFF" : "#FF6B6B";

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <canvas ref={canvasRef} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display font-black text-4xl"
            style={{ color: scoreColor }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-[#555] tracking-widest">/100</span>
        </div>
      </div>
      <span className="text-xs text-[#666] tracking-widest uppercase">{label}</span>
    </div>
  );
}
