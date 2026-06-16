import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Resume — Nocturne AI Career Intelligence",
  description:
    "Get a brutal, honest, data-driven analysis of your resume. ATS score, job fit assessment, skill gap analysis, and AI-optimized bullet points.",
};

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
