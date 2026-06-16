import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nocturne — AI Resume & Career Intelligence Platform",
  description:
    "Elite AI-powered resume analysis, job matching, skill gap identification, and career intelligence. Maximize your interview success with data-driven insights.",
  keywords: [
    "AI resume analyzer",
    "job matching",
    "career intelligence",
    "resume optimization",
    "ATS optimization",
    "skill gap analysis",
  ],
  openGraph: {
    title: "Nocturne — AI Resume & Career Intelligence",
    description: "Data-driven career intelligence powered by AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
