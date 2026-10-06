"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Loader2,
  AlertCircle,
  FileText,
  Briefcase,
} from "lucide-react";
import CustomCursor from "@/components/ui/CustomCursor";
import UploadZone from "@/components/analyze/UploadZone";
import AnalysisPanel from "@/components/analyze/AnalysisPanel";
import { analyzeResume, type AnalysisResult } from "@/lib/analyzer";

type State = "idle" | "analyzing" | "done" | "error";

const loadingMessages = [
  "Parsing resume structure...",
  "Extracting skill signals...",
  "Cross-referencing job market data...",
  "Calculating ATS compatibility...",
  "Analyzing achievement density...",
  "Generating intelligence report...",
];

export default function AnalyzePage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please provide your resume text before analyzing.");
      return;
    }
    if (resumeText.trim().split(/\s+/).length < 30) {
      setError("Resume text seems too short. Please provide at least 30 words.");
      return;
    }

    setError("");
    setState("analyzing");

    // Cycle loading messages
    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIdx]);
    }, 600);

    try {
      const analysis = await analyzeResume(resumeText, jobDesc);
      clearInterval(interval);
      setResult(analysis);
      setState("done");
    } catch (e) {
      clearInterval(interval);
      setError("Analysis failed. Please try again.");
      setState("error");
    }
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setResumeText("");
    setJobDesc("");
    setError("");
  };

  return (
    <>
      <CustomCursor />

      <div className="min-h-screen bg-[#050505] grid-overlay">
        {/* Top bar */}
        <div className="border-b border-white/5 px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-sm group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="w-px h-4 bg-white/10" />
              <Link href="/" className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#F4F5F7] to-[#888] flex items-center justify-center">
                  <Zap className="w-3 h-3 text-[#050505] fill-[#050505]" />
                </div>
                <span className="font-display font-bold text-sm tracking-wide">
                  Nocturne
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
              <span className="text-xs text-[#555] hidden sm:inline">Intelligence Engine Active</span>
              <span className="text-xs text-[#555] sm:hidden">Active</span>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            {state !== "done" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Page header */}
                <div className="mb-12 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4"
                  >
                    Resume{" "}
                    <span className="gradient-text-blue">Intelligence</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[#555] max-w-lg mx-auto text-sm leading-relaxed"
                  >
                    Provide your resume and optionally a target job description.
                    The more context you give, the more precise the analysis.
                  </motion.p>
                </div>

                {/* Input grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* Resume */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-xl bg-[#4F8EFF]/10 border border-[#4F8EFF]/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#4F8EFF]" />
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-white">
                          Your Resume
                        </h2>
                        <p className="text-xs text-[#444]">Required</p>
                      </div>
                    </div>
                    <UploadZone
                      onTextReady={setResumeText}
                      disabled={state === "analyzing"}
                    />
                  </div>

                  {/* Job Description */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/20 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-[#A78BFA]" />
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-white">
                          Target Job Description
                        </h2>
                        <p className="text-xs text-[#444]">
                          Optional — improves fit score accuracy
                        </p>
                      </div>
                    </div>
                    <textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      disabled={state === "analyzing"}
                      placeholder="Paste the job description here...&#10;&#10;Include requirements, responsibilities, and qualifications. Adding this enables precise fit scoring across 7 competency dimensions."
                      className="w-full h-64 bg-[#0A0A0A] border border-white/8 rounded-2xl p-5 text-sm text-[#aaa] placeholder-[#333] resize-none focus:outline-none focus:border-[#A78BFA]/50 focus:shadow-[0_0_20px_rgba(167,139,250,0.08)] transition-all duration-300 leading-relaxed"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 text-[#FF6B6B] text-sm mb-6"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                  {/* Analyze button */}
                <div className="flex justify-center">
                  <button
                    id="analyze-submit-btn"
                    onClick={handleAnalyze}
                    disabled={state === "analyzing"}
                    className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black font-bold text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 hover:shadow-[0_0_50px_rgba(255,107,0,0.35)] hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    {state === "analyzing" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span className="truncate max-w-[200px] sm:max-w-none text-black font-semibold">{loadingMsg}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-black text-black" />
                        Run Intelligence Analysis
                      </>
                    )}
                  </button>
                </div>

                {/* Loading bar */}
                <AnimatePresence>
                  {state === "analyzing" && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-8 max-w-md mx-auto"
                    >
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="h-full w-1/2 bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#3B82F6] rounded-full shadow-[0_0_12px_rgba(255,107,0,0.6)]"
                        />
                      </div>
                      <p className="text-center text-xs text-white/40 mt-3 font-mono">
                        Deep intelligence analysis in progress...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {state === "done" && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnalysisPanel result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
