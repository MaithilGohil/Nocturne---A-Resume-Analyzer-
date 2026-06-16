// Simulated AI analysis engine
export interface AnalysisResult {
  executiveSummary: string;
  fitScore: number;
  finalScore: number;
  confidenceLevel: "High" | "Medium" | "Low";
  strengths: Strength[];
  weaknesses: Weakness[];
  skillBreakdown: SkillCategory[];
  skillGaps: SkillGap[];
  improvements: Improvement[];
  highPriorityActions: Action[];
  mediumPriorityActions: Action[];
  careerStrategy: string;
  marketAnalysis: string;
  rewrittenBullets: RewrittenBullet[];
  atsScore: number;
  keywordDensity: number;
  achievementScore: number;
}

export interface Strength {
  title: string;
  detail: string;
  impact: "High" | "Medium" | "Low";
}

export interface Weakness {
  title: string;
  detail: string;
  risk: "Critical" | "High" | "Medium" | "Low";
}

export interface SkillCategory {
  name: string;
  score: number;
  color: string;
}

export interface SkillGap {
  skill: string;
  importance: "Critical" | "High" | "Medium" | "Low";
  effort: string;
  color: string;
}

export interface Improvement {
  original: string;
  improved: string;
}

export interface Action {
  action: string;
  timeframe: string;
  impact: string;
}

export interface RewrittenBullet {
  original: string;
  improved: string;
}

function extractKeywords(text: string): string[] {
  const techKeywords = [
    "python", "javascript", "typescript", "react", "node", "aws", "docker",
    "kubernetes", "sql", "nosql", "machine learning", "deep learning", "api",
    "microservices", "ci/cd", "agile", "scrum", "data analysis", "tensorflow",
    "pytorch", "java", "c++", "go", "rust", "redis", "postgresql", "mongodb"
  ];
  return techKeywords.filter(kw => text.toLowerCase().includes(kw));
}

function calculateFitScore(resumeText: string, jobDesc: string): number {
  if (!jobDesc.trim()) return Math.floor(Math.random() * 20) + 60;
  
  const resumeWords = new Set(resumeText.toLowerCase().split(/\W+/));
  const jobWords = jobDesc.toLowerCase().split(/\W+/).filter(w => w.length > 4);
  const matches = jobWords.filter(w => resumeWords.has(w));
  const base = Math.min(95, Math.floor((matches.length / jobWords.length) * 100 * 1.8));
  return Math.max(35, base);
}

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  // Simulate processing time
  await new Promise((r) => setTimeout(r, 2800));

  const keywords = extractKeywords(resumeText);
  const fitScore = calculateFitScore(resumeText, jobDescription);
  const hasMetrics = /\d+%|\$\d+|[0-9]+\s*(million|billion|k\b|users|customers)/i.test(resumeText);
  const hasActionVerbs = /\b(led|built|designed|architected|scaled|reduced|improved|launched|managed|optimized)\b/i.test(resumeText);
  const wordCount = resumeText.split(/\s+/).length;
  const atsScore = Math.min(95, 50 + keywords.length * 4 + (hasActionVerbs ? 10 : 0));
  const achievementScore = hasMetrics ? Math.floor(Math.random() * 20) + 65 : Math.floor(Math.random() * 20) + 30;

  const skillBreakdown: SkillCategory[] = [
    { name: "Technical Skills", score: Math.min(95, 45 + keywords.length * 5), color: "#4F8EFF" },
    { name: "Experience Quality", score: hasActionVerbs ? Math.floor(Math.random()*15)+70 : Math.floor(Math.random()*20)+40, color: "#A78BFA" },
    { name: "Industry Alignment", score: fitScore, color: "#00FFA3" },
    { name: "Achievement Impact", score: achievementScore, color: "#C0C0C0" },
    { name: "ATS Compatibility", score: atsScore, color: "#4F8EFF" },
    { name: "Leadership Signals", score: /\b(led|managed|mentored|directed|oversaw)\b/i.test(resumeText) ? Math.floor(Math.random()*20)+65 : Math.floor(Math.random()*25)+25, color: "#A78BFA" },
    { name: "Communication", score: Math.min(90, 55 + Math.floor(Math.random()*30)), color: "#00FFA3" },
  ];

  const missingKeywords = ["GraphQL", "System Design", "Cross-functional Leadership", "OKRs", "Data-driven Decision Making"]
    .filter(k => !resumeText.toLowerCase().includes(k.toLowerCase()));

  const skillGaps: SkillGap[] = missingKeywords.slice(0, 5).map((skill, i) => ({
    skill,
    importance: i === 0 ? "Critical" : i < 2 ? "High" : "Medium",
    effort: i < 2 ? "2-4 weeks" : "1-2 months",
    color: i === 0 ? "#FF4F4F" : i < 2 ? "#FF9F4F" : "#4F8EFF",
  }));

  const strengths: Strength[] = [
    ...(keywords.length > 5 ? [{ title: "Strong Technical Keyword Coverage", detail: `Your resume contains ${keywords.length} relevant technical keywords, placing it above 70% of candidates for similar roles.`, impact: "High" as const }] : []),
    ...(hasActionVerbs ? [{ title: "Action-Oriented Language", detail: "Use of strong action verbs (led, built, designed) signals ownership and initiative to recruiters.", impact: "High" as const }] : []),
    ...(wordCount > 300 ? [{ title: "Adequate Content Depth", detail: "Resume length suggests sufficient experience documentation to pass initial screening.", impact: "Medium" as const }] : []),
    { title: "Quantifiable Experience Present", detail: hasMetrics ? "Your resume contains measurable achievements which are critical for senior roles." : "Opportunity: Add metrics to significantly increase impact.", impact: hasMetrics ? "High" as const : "Medium" as const },
  ];

  const weaknesses: Weakness[] = [
    ...(!hasMetrics ? [{ title: "Missing Quantifiable Achievements", detail: "0 bullet points contain measurable outcomes. Recruiters at top companies require data-backed impact statements for every major achievement.", risk: "Critical" as const }] : []),
    { title: "Generic Summary Section", detail: "Opening summary reads as a job description rather than a value proposition. This is the first recruiter touchpoint and must be compelling.", risk: "High" as const },
    ...(keywords.length < 8 ? [{ title: "Insufficient Technical Keyword Density", detail: `Only ${keywords.length} technical keywords detected. Target 15+ for ATS optimization at FAANG-tier companies.`, risk: "High" as const }] : []),
    { title: "Lack of Industry-Specific Signal", detail: "Resume lacks domain-specific terminology that differentiates senior candidates from mid-level in competitive markets.", risk: "Medium" as const },
  ];

  const improvements: Improvement[] = [
    { original: "Worked on backend APIs", improved: "Architected and maintained 15+ production REST APIs serving 50,000+ monthly active users with 99.9% uptime SLA compliance." },
    { original: "Helped improve system performance", improved: "Identified and resolved 3 critical database bottlenecks, reducing average query latency by 68% (from 420ms to 134ms), saving $18K/month in infrastructure costs." },
    { original: "Managed a team", improved: "Led cross-functional team of 8 engineers across 3 time zones, delivering $2.4M product initiative 3 weeks ahead of schedule with zero critical post-launch bugs." },
  ];

  const highPriorityActions: Action[] = [
    { action: "Quantify every bullet point with specific metrics, percentages, or dollar amounts", timeframe: "Immediate (1-2 hours)", impact: "+25-40 points on fit score" },
    { action: "Rewrite your professional summary as a 3-sentence value proposition targeting your specific role", timeframe: "Immediate (30 min)", impact: "+15% recruiter engagement" },
    { action: `Add missing critical keywords: ${missingKeywords.slice(0, 3).join(", ")}`, timeframe: "Today", impact: "ATS pass rate +35%" },
  ];

  const mediumPriorityActions: Action[] = [
    { action: "Create 2-3 portfolio projects demonstrating full-stack or domain-specific competency", timeframe: "2-4 weeks", impact: "Interview conversion +20%" },
    { action: "Obtain at least 1 industry-recognized certification relevant to target role", timeframe: "4-8 weeks", impact: "Salary negotiation leverage +12%" },
    { action: "Restructure experience section in reverse-chronological with STAR-format achievements", timeframe: "2-3 hours", impact: "Readability score +40%" },
  ];

  return {
    executiveSummary: `This resume demonstrates ${fitScore > 75 ? "above-average" : fitScore > 60 ? "moderate" : "below-average"} market positioning for the target role. The candidate has ${strengths.length} identifiable strengths and ${weaknesses.length} material weaknesses that will significantly impact interview conversion rates at competitive organizations. ${hasMetrics ? "Quantifiable achievements are present but insufficient in density." : "Critical absence of measurable achievements is the primary risk factor."} ATS compatibility score is ${atsScore}/100 — ${atsScore > 75 ? "sufficient for most ATS systems" : "needs immediate improvement"}. Estimated callback probability at mid-market companies: ${fitScore > 75 ? "35-50%" : fitScore > 60 ? "15-30%" : "5-12%"}.`,
    fitScore,
    finalScore: Math.round((fitScore + atsScore + achievementScore) / 3),
    confidenceLevel: jobDescription.trim() ? "High" : "Medium",
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    skillBreakdown,
    skillGaps: skillGaps.slice(0, 5),
    improvements: improvements.slice(0, 3),
    highPriorityActions,
    mediumPriorityActions,
    careerStrategy: `Long-term trajectory analysis suggests strong positioning for ${fitScore > 75 ? "senior IC or engineering management" : "mid-senior"} roles within 18-24 months if skill gaps are systematically addressed. Priority domains: system design depth, cross-functional leadership evidence, and measurable business impact documentation. Target companies: Series B-D startups for maximum equity upside, or FAANG for compensation ceiling.`,
    marketAnalysis: `Current market signal: ${keywords.includes("python") || keywords.includes("machine learning") ? "AI/ML roles seeing 340% increase in postings YoY. Python and ML skills are highly competitive." : "Full-stack and cloud roles remain in sustained high demand."} Salary range for this profile: $${fitScore > 75 ? "140,000-$210,000" : "$95,000-$140,000"} USD (remote), adjusted for skill level. Geographic hotspots: San Francisco, New York, Seattle, Austin, Remote-first companies.`,
    rewrittenBullets: improvements,
    atsScore,
    keywordDensity: Math.min(100, keywords.length * 6),
    achievementScore,
  };
}
