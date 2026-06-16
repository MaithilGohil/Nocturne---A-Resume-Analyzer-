import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0A0A0A",
        "surface-2": "#111111",
        border: "#1A1A1A",
        "border-light": "#222222",
        blue: {
          electric: "#4F8EFF",
          dim: "#1E3A8A",
        },
        emerald: {
          glow: "#00FFA3",
          dim: "#00805C",
        },
        purple: {
          soft: "#A78BFA",
          dim: "#4C1D95",
        },
        silver: "#C0C0C0",
        "text-primary": "#FFFFFF",
        "text-secondary": "#999999",
        "text-muted": "#555555",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(79, 142, 255, 0.15)",
        "glow-emerald": "0 0 40px rgba(0, 255, 163, 0.15)",
        "glow-purple": "0 0 40px rgba(167, 139, 250, 0.15)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
