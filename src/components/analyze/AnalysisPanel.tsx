"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Target,
  Zap,
  TrendingUp,
  BarChart3,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import type { AnalysisResult } from "@/lib/analyzer";
import FitScoreChart from "./FitScoreChart";

interface AnalysisPanelProps {
  result: AnalysisResult;
  onReset: () => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "gaps", label: "Skill Gaps", icon: Target },
  { id: "rewrites", label: "Rewrites", icon: BookOpen },
  { id: "actions", label: "Actions", icon: Zap },
  { id: "strategy", label: "Strategy", icon: TrendingUp },
];

export default function AnalysisPanel({ result, onReset }: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const riskColor = (risk: string) => {
    if (risk === "Critical") return "#FF4F4F";
    if (risk === "High") return "#FF9F4F";
    if (risk === "Medium") return "#4F8EFF";
    return "#00FFA3";
  };

  const impactColor = (impact: string) => {
    if (impact === "High") return "#00FFA3";
    if (impact === "Medium") return "#4F8EFF";
    return "#888";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
          <span className="text-sm text-[#00FFA3] font-medium tracking-wide">
            Analysis Complete
          </span>
          <span className="text-xs text-[#444] border border-white/8 px-2 py-0.5 rounded-full">
            Confidence: {result.confidenceLevel}
          </span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs text-[#555] hover:text-white transition-colors group"
        >
          <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
          New Analysis
        </button>
      </div>

      {/* Score row */}
      <div className="glass rounded-2xl p-5 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 items-center">
          <FitScoreChart score={result.fitScore} label="Job Fit" color="#F4F5F7" size={120} />
          <FitScoreChart score={result.atsScore} label="ATS Score" color="#888888" size={120} />
          <FitScoreChart score={result.achievementScore} label="Achievement" color="#00FFA3" size={120} />
          <FitScoreChart score={result.finalScore} label="Final Score" color="#C0C0C0" size={120} />
        </div>
      </div>

      {/* Executive summary */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
          Executive Summary
        </h3>
        <p className="text-[#aaa] text-sm leading-relaxed">{result.executiveSummary}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[#0A0A0A] rounded-xl overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#F4F5F7] text-[#050505]"
                  : "text-[#555] hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[#00FFA3] uppercase mb-5 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Candidate Strengths
                </h3>
                <div className="space-y-4">
                  {result.strengths.map((s, i) => (
                    <div key={i} className="border-l-2 border-[#00FFA3]/30 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{s.title}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border"
                          style={{
                            color: impactColor(s.impact),
                            borderColor: `${impactColor(s.impact)}33`,
                            background: `${impactColor(s.impact)}11`,
                          }}
                        >
                          {s.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-[#666] leading-relaxed">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[#FF6B6B] uppercase mb-5 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Weaknesses & Risks
                </h3>
                <div className="space-y-4">
                  {result.weaknesses.map((w, i) => (
                    <div key={i} className="border-l-2 pl-4" style={{ borderColor: `${riskColor(w.risk)}40` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{w.title}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border"
                          style={{
                            color: riskColor(w.risk),
                            borderColor: `${riskColor(w.risk)}33`,
                            background: `${riskColor(w.risk)}11`,
                          }}
                        >
                          {w.risk}
                        </span>
                      </div>
                      <p className="text-xs text-[#666] leading-relaxed">{w.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill breakdown */}
              <div className="glass rounded-2xl p-6 md:col-span-2">
                <h3 className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-5">
                  Skill Dimension Breakdown
                </h3>
                <div className="space-y-4">
                  {result.skillBreakdown.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm text-[#888] w-28 sm:w-44 shrink-0 truncate">{skill.name}</span>
                      <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.score}%` }}
                          transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{ background: skill.color }}
                        />
                      </div>
                      <span className="text-sm font-mono font-bold w-10 text-right" style={{ color: skill.color }}>
                        {skill.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SKILL GAPS */}
          {activeTab === "gaps" && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-6">
                Gap Analysis — Missing Competencies
              </h3>
              <div className="space-y-4">
                {result.skillGaps.map((gap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-6 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div
                      className="w-2 h-10 rounded-full flex-shrink-0"
                      style={{ background: gap.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-white">{gap.skill}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                          style={{
                            color: gap.color,
                            borderColor: `${gap.color}33`,
                            background: `${gap.color}11`,
                          }}
                        >
                          {gap.importance}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#555]">
                        <Clock className="w-3 h-3" />
                        <span>Estimated acquisition: {gap.effort}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#333]" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* REWRITES */}
          {activeTab === "rewrites" && (
            <div className="space-y-4">
              <p className="text-xs text-[#555] mb-2">
                AI-optimized bullet point transformations using action verbs, quantifiable achievements, and ATS-friendly language.
              </p>
              {result.improvements.map((imp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  <div className="p-5 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      <span className="text-[10px] tracking-widest text-[#FF6B6B] uppercase font-medium">
                        Weak Original
                      </span>
                    </div>
                    <p className="text-[#555] text-sm italic">&ldquo;{imp.original}&rdquo;</p>
                  </div>
                  <div className="p-5 bg-[#00FFA3]/3">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFA3]" />
                      <span className="text-[10px] tracking-widest text-[#00FFA3] uppercase font-medium">
                        Optimized Version
                      </span>
                    </div>
                    <p className="text-white text-sm leading-relaxed">&ldquo;{imp.improved}&rdquo;</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          {activeTab === "actions" && (
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[#FF4F4F] uppercase mb-5 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  High Priority Actions
                </h3>
                <div className="space-y-4">
                  {result.highPriorityActions.map((a, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#FF4F4F]/5 border border-[#FF4F4F]/15">
                      <div className="w-6 h-6 rounded-full bg-[#FF4F4F]/20 text-[#FF4F4F] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white mb-2">{a.action}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-[#555] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {a.timeframe}
                          </span>
                          <span className="text-[#00FFA3] flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> {a.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[#4F8EFF] uppercase mb-5 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  Medium Priority Actions
                </h3>
                <div className="space-y-4">
                  {result.mediumPriorityActions.map((a, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#4F8EFF]/5 border border-[#4F8EFF]/15">
                      <div className="w-6 h-6 rounded-full bg-[#4F8EFF]/20 text-[#4F8EFF] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white mb-2">{a.action}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-[#555] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {a.timeframe}
                          </span>
                          <span className="text-[#4F8EFF] flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> {a.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STRATEGY */}
          {activeTab === "strategy" && (
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[#A78BFA] uppercase mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Long-Term Career Strategy
                </h3>
                <p className="text-[#aaa] text-sm leading-relaxed">{result.careerStrategy}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[#00FFA3] uppercase mb-4 flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Market Analysis
                </h3>
                <p className="text-[#aaa] text-sm leading-relaxed">{result.marketAnalysis}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
