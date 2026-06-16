"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Loader2, Zap } from "lucide-react";

interface UploadZoneProps {
  onTextReady: (text: string) => void;
  disabled: boolean;
}

export default function UploadZone({ onTextReady, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"paste" | "upload">("paste");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
      onTextReady(content);
    };
    reader.readAsText(file);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    []
  );

  const onTextChange = (val: string) => {
    setText(val);
    onTextReady(val);
    if (val) setFileName(null);
  };

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-1 p-1 bg-[#111] rounded-xl w-fit">
        {(["paste", "upload"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === m
                ? "bg-[#4F8EFF] text-white"
                : "text-[#555] hover:text-white"
            }`}
          >
            {m === "paste" ? "Paste Text" : "Upload File"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode === "paste" ? (
          <motion.div
            key="paste"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              disabled={disabled}
              placeholder="Paste your resume text here...&#10;&#10;Include work experience, skills, education, and any other relevant content. The more complete, the more accurate the analysis."
              className="w-full h-64 bg-[#0A0A0A] border border-white/8 rounded-2xl p-5 text-sm text-[#aaa] placeholder-[#333] resize-none focus:outline-none focus:border-[#4F8EFF]/50 focus:shadow-[0_0_20px_rgba(79,142,255,0.08)] transition-all duration-300 font-mono leading-relaxed"
            />
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`drop-zone rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
              isDragging ? "dragging" : ""
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            {fileName ? (
              <>
                <div className="w-14 h-14 rounded-2xl bg-[#4F8EFF]/10 border border-[#4F8EFF]/30 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#4F8EFF]" />
                </div>
                <span className="text-white font-medium">{fileName}</span>
                <span className="text-xs text-[#555]">Click to replace</span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#555]" />
                </div>
                <div className="text-center">
                  <p className="text-[#888] text-sm mb-1">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-[#444]">TXT, PDF, DOC supported</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
