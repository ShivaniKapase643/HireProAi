const pptxgen = require("pptxgenjs");

// ============================================================
// SmartHire AI - Final Hackathon Deck (v3)
// Following exact 15-slide sequence:
// 1. Title 2. Problem 3. Existing 4. Solution 5. Objectives
// 6. Architecture 7. Tech Stack 8. Features 9. Demo
// 10. Innovation 11. Scalability 12. Business Impact
// 13. Future Scope 14. Team 15. Thank You
// ============================================================

const pres = new pptxgen();

const C = {
  orange: "E97B1F", orangeLight: "FFF3E0", orangeDark: "C4600A",
  green: "2D6B22", greenLight: "E8F5E9", greenDark: "1B5E20",
  blue: "1E40AF", blueLight: "DBEAFE", teal: "0891B2", red: "DC2626",
  purple: "7C3AED", yellow: "F59E0B",
  dark: "1A1A1A", text: "333333", lightText: "666666", muted: "999999",
  white: "FFFFFF", cream: "FFF8F0", cardBorder: "F5DEB3",
};

pres.defineLayout({ name: "CUSTOM", width: 13.33, height: 7.5 });
pres.layout = "CUSTOM";
pres.author = "Team TwinTech - Yashvant & Shivani";
pres.title = "SmartHire AI - Final Hackathon Deck";

const TOTAL = 15;

// Helpers
function baseSlide(slide) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: C.cream } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.07, fill: { color: C.orange } });
}

function addFooter(slide, num) {
  slide.addText("SmartHire AI \u00B7 AI-Powered Placement Preparation Platform", {
    x: 0.5, y: 7.15, w: 8, h: 0.3, fontSize: 8, color: C.muted, fontFace: "Calibri",
  });
  slide.addText(`${num} / ${TOTAL}`, {
    x: 11.5, y: 7.15, w: 1.5, h: 0.3, fontSize: 8, color: C.muted, align: "right", fontFace: "Calibri",
  });
}

function addHeader(slide, label, title) {
  slide.addText(label.toUpperCase(), {
    x: 0.7, y: 0.35, w: 11, h: 0.4, fontSize: 12, bold: true, color: C.orange, fontFace: "Calibri",
  });
  slide.addText(title, {
    x: 0.7, y: 0.75, w: 12, h: 0.95, fontSize: 32, bold: true, color: C.dark, fontFace: "Calibri",
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 0.7, y: 1.7, w: 12, h: 0.04, fill: { color: C.orange },
  });
}

// ============================================================
// SLIDE 1: TITLE
// ============================================================
const s1 = pres.addSlide();
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: C.cream } });
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.12, fill: { color: C.orange } });
// Logo
s1.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 0.5, w: 0.7, h: 0.7, fill: { color: C.orange }, rectRadius: 0.08 });
s1.addText("S", { x: 0.7, y: 0.5, w: 0.7, h: 0.7, fontSize: 32, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
s1.addText("SmartHire AI", { x: 1.55, y: 0.55, w: 4, h: 0.6, fontSize: 22, color: C.dark, fontFace: "Calibri" });

// Hackathon badge
s1.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 1.6, w: 4.5, h: 0.55, fill: { color: C.orange }, rectRadius: 0.05 });
s1.addText("HACKATHON ROUND 1 \u00B7 2026", { x: 0.7, y: 1.6, w: 4.5, h: 0.55, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });

// Main Title
s1.addText("AI-Powered Placement\nPreparation Platform", { x: 0.7, y: 2.5, w: 12, h: 1.8, fontSize: 48, bold: true, color: C.dark, fontFace: "Calibri", lineSpacingMultiple: 1.05 });

// Tagline
s1.addText("\"Prepare. Perform. Get Placed.\"", { x: 0.7, y: 4.5, w: 10, h: 0.6, fontSize: 20, italic: true, color: C.orange, fontFace: "Calibri" });

// Description
s1.addText("Transform placement preparation from scattered guesswork to AI-driven,\nstructured, personalized career readiness for every student.", { x: 0.7, y: 5.2, w: 11, h: 0.8, fontSize: 13, color: C.lightText, fontFace: "Calibri", lineSpacingMultiple: 1.4 });

// Team
s1.addText("Team TwinTech  |  Yashvant & Shivani", { x: 0.7, y: 6.1, w: 8, h: 0.4, fontSize: 12, color: C.text, fontFace: "Calibri" });

// Bottom stat cards
const titleStats = [
  { val: "80%", label: "Students feel\nunprepared" },
  { val: "75%", label: "Resumes rejected\nby ATS" },
  { val: "5-10", label: "Platforms juggled\nfor prep" },
  { val: "$2.1B", label: "Ed-tech placement\nmarket" },
];
titleStats.forEach((s, i) => {
  const x = 0.7 + i * 3.05;
  s1.addShape(pres.ShapeType.roundRect, { x: x, y: 6.6, w: 2.85, h: 0.7, fill: { color: C.orange }, rectRadius: 0.05 });
  s1.addText(s.val, { x: x + 0.15, y: 6.6, w: 1, h: 0.7, fontSize: 18, bold: true, color: C.white, valign: "middle", fontFace: "Calibri" });
  s1.addText(s.label, { x: x + 1.1, y: 6.6, w: 1.7, h: 0.7, fontSize: 8, color: "FFE0B2", valign: "middle", fontFace: "Calibri" });
});

// ============================================================
// SLIDE 2: PROBLEM STATEMENT
// ============================================================
const s2 = pres.addSlide();
baseSlide(s2);
addHeader(s2, "Problem Statement", "Placement Preparation Faces a Multi-Dimensional Crisis");

s2.addText("Students are trapped in a cycle of scattered preparation. Without unified AI tools, they face compounding challenges from fragmented resources, interview anxiety, and missed opportunities.", { x: 0.7, y: 1.85, w: 12, h: 0.5, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

const problems = [
  { num: "1", title: "Resource\nFragmentation", items: "\u2022 5-10 different platforms\n\u2022 No unified progress tracking\n\u2022 Context-switching overhead\n\u2022 Inconsistent quality", color: C.orange },
  { num: "2", title: "Interview\nAnxiety", items: "\u2022 78% report high stress\n\u2022 Coaching costs \u20B910K-50K+\n\u2022 No realistic practice access\n\u2022 No feedback on performance", color: C.blue },
  { num: "3", title: "ATS Resume\nRejection", items: "\u2022 75% never reach recruiters\n\u2022 Wrong keywords & format\n\u2022 No professional feedback\n\u2022 Generic templates fail", color: C.teal },
  { num: "4", title: "Zero\nVisibility", items: "\u2022 20-50+ applications untracked\n\u2022 Missed deadlines & follow-ups\n\u2022 No analytics on success rate\n\u2022 Lost opportunities", color: C.purple },
];

problems.forEach((p, i) => {
  const x = 0.7 + i * 3.05;
  s2.addShape(pres.ShapeType.roundRect, { x: x, y: 2.5, w: 2.85, h: 3.7, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s2.addShape(pres.ShapeType.rect, { x: x, y: 2.5, w: 2.85, h: 0.06, fill: { color: p.color } });
  s2.addShape(pres.ShapeType.ellipse, { x: x + 0.2, y: 2.75, w: 0.55, h: 0.55, fill: { color: p.color } });
  s2.addText(p.num, { x: x + 0.2, y: 2.75, w: 0.55, h: 0.55, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
  s2.addText(p.title, { x: x + 0.85, y: 2.75, w: 1.95, h: 0.7, fontSize: 13, bold: true, color: C.dark, fontFace: "Calibri" });
  s2.addText(p.items, { x: x + 0.2, y: 3.6, w: 2.5, h: 2.4, fontSize: 10.5, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.4 });
});

// Stat bar
s2.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 6.4, w: 12, h: 0.65, fill: { color: C.green }, rectRadius: 0.05 });
s2.addText("\u20B950,000+ Crore", { x: 1, y: 6.4, w: 3.5, h: 0.65, fontSize: 18, bold: true, color: C.orange, valign: "middle", fontFace: "Calibri" });
s2.addText("Annual productivity lost by Indian students due to poor placement prep, scattered resources, and lack of affordable coaching.", { x: 4.6, y: 6.4, w: 8, h: 0.65, fontSize: 10, color: "DDDDDD", valign: "middle", fontFace: "Calibri" });

addFooter(s2, 2);

// ============================================================
// SLIDE 3: EXISTING SYSTEM
// ============================================================
const s3 = pres.addSlide();
baseSlide(s3);
addHeader(s3, "Existing System", "Current Solutions Are Fragmented & Ineffective");

s3.addText("Students today rely on a patchwork of disconnected tools, none of which provide end-to-end placement preparation. Each tool solves only one piece of the puzzle.", { x: 0.7, y: 1.85, w: 12, h: 0.5, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

// Comparison table
const tableData = [
  [
    { text: "Solution Category", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "Examples", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "Strengths", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "Limitations", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
  ],
  [
    { text: "Coaching Centers", options: { fontFace: "Calibri" } },
    { text: "T.I.M.E., Career Launcher", options: { fontFace: "Calibri" } },
    { text: "Personalized mentorship", options: { fontFace: "Calibri" } },
    { text: "\u20B910K-50K cost, location-bound", options: { fontFace: "Calibri", color: "C00000" } },
  ],
  [
    { text: "Interview Apps", options: { fontFace: "Calibri" } },
    { text: "InterviewBit, Pramp", options: { fontFace: "Calibri" } },
    { text: "Practice problems, mock", options: { fontFace: "Calibri" } },
    { text: "No resume analysis or tracking", options: { fontFace: "Calibri", color: "C00000" } },
  ],
  [
    { text: "Resume Tools", options: { fontFace: "Calibri" } },
    { text: "Canva, Resume.io", options: { fontFace: "Calibri" } },
    { text: "Templates & formatting", options: { fontFace: "Calibri" } },
    { text: "No ATS scoring or AI feedback", options: { fontFace: "Calibri", color: "C00000" } },
  ],
  [
    { text: "Job Portals", options: { fontFace: "Calibri" } },
    { text: "Naukri, LinkedIn, Indeed", options: { fontFace: "Calibri" } },
    { text: "Job listings & networking", options: { fontFace: "Calibri" } },
    { text: "No prep, no AI guidance", options: { fontFace: "Calibri", color: "C00000" } },
  ],
  [
    { text: "Spreadsheets", options: { fontFace: "Calibri" } },
    { text: "Excel, Google Sheets", options: { fontFace: "Calibri" } },
    { text: "Free, customizable", options: { fontFace: "Calibri" } },
    { text: "Manual, no automation/insights", options: { fontFace: "Calibri", color: "C00000" } },
  ],
];

s3.addTable(tableData, {
  x: 0.7, y: 2.5, w: 12, h: 3.5, fontSize: 10.5, fontFace: "Calibri",
  border: { type: "solid", pt: 0.5, color: C.cardBorder },
  colW: [2.5, 3, 3, 3.5], rowH: [0.5, 0.55, 0.55, 0.55, 0.55, 0.55],
  align: "left", valign: "middle",
});

// Bottom callout
s3.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 6.3, w: 12, h: 0.75, fill: { color: C.orangeLight }, line: { color: C.orange, width: 1 }, rectRadius: 0.05 });
s3.addText("\uD83D\uDCA1 The Gap: No single platform unifies AI mock interviews + ATS resume scoring + smart job tracking with personalized career guidance \u2014 until SmartHire AI.", { x: 1, y: 6.3, w: 11.5, h: 0.75, fontSize: 11, italic: true, color: C.dark, valign: "middle", fontFace: "Calibri" });

addFooter(s3, 3);

// ============================================================
// SLIDE 4: PROPOSED SOLUTION
// ============================================================
const s4 = pres.addSlide();
baseSlide(s4);
addHeader(s4, "Proposed Solution", "SmartHire AI \u2014 Complete Placement Ecosystem");

s4.addText("An integrated AI platform that transforms scattered preparation into a structured, personalized, and intelligent placement readiness journey for every student.", { x: 0.7, y: 1.85, w: 12, h: 0.5, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

const features = [
  { icon: "\uD83E\uDD16", title: "MOCK INTERVIEW", desc: "AI-powered chatbot conducts realistic technical & HR interviews with adaptive difficulty & scoring", color: C.green },
  { icon: "\uD83D\uDCDD", title: "RESUME ANALYZER", desc: "ATS scoring engine with keyword optimization, format validation & actionable recommendations", color: C.orange },
  { icon: "\uD83D\uDCCB", title: "JOB TRACKER", desc: "Kanban dashboard to manage applications, deadlines, interviews with analytics & calendar sync", color: C.teal },
  { icon: "\u26A1", title: "AI FEEDBACK", desc: "Personalized improvement plans based on interview performance & resume quality analysis", color: C.yellow },
  { icon: "\uD83D\uDCCA", title: "ANALYTICS", desc: "Progress tracking, success rates, weakness identification & skill gap analysis over time", color: C.yellow },
  { icon: "\uD83C\uDF99\uFE0F", title: "VOICE MODE", desc: "Speech-to-text interview practice with pronunciation feedback & confidence scoring", color: C.yellow },
];

features.forEach((f, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = 0.7 + col * 4.1, y = 2.45 + row * 2.3;
  s4.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 3.9, h: 2.1, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s4.addShape(pres.ShapeType.rect, { x: x, y: y, w: 3.9, h: 0.06, fill: { color: f.color } });
  s4.addText(`${f.icon}    ${f.title}`, { x: x + 0.25, y: y + 0.2, w: 3.5, h: 0.5, fontSize: 12, bold: true, color: C.dark, fontFace: "Calibri" });
  s4.addText(f.desc, { x: x + 0.25, y: y + 0.85, w: 3.5, h: 1.2, fontSize: 10, color: C.lightText, fontFace: "Calibri", lineSpacingMultiple: 1.4 });
});

addFooter(s4, 4);

// ============================================================
// SLIDE 5: OBJECTIVES
// ============================================================
const s5 = pres.addSlide();
baseSlide(s5);
addHeader(s5, "Objectives", "Our Goals & Mission");

s5.addText("SmartHire AI is built with clear, measurable objectives to revolutionize placement preparation for every Indian student.", { x: 0.7, y: 1.85, w: 12, h: 0.5, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

const objectives = [
  { num: "01", title: "Democratize Quality Prep", desc: "Make AI-powered placement preparation accessible to every student regardless of college tier or financial background.", color: C.orange },
  { num: "02", title: "Unify Fragmented Tools", desc: "Replace 5-10 disconnected platforms with one cohesive AI ecosystem that handles every aspect of placement prep.", color: C.green },
  { num: "03", title: "Improve Interview Skills", desc: "Provide unlimited realistic mock interviews with adaptive difficulty, instant NLP-based feedback, and progress tracking.", color: C.blue },
  { num: "04", title: "Boost Resume Quality", desc: "Help students build ATS-compliant resumes with 85%+ compatibility scores using AI-powered optimization & keyword analysis.", color: C.teal },
  { num: "05", title: "Track Career Progress", desc: "Centralize all job applications, deadlines, and interviews with smart analytics and AI-driven insights.", color: C.purple },
  { num: "06", title: "Deliver Career Guidance", desc: "Offer personalized career path recommendations with skill gap analysis, learning resources, and market trends.", color: C.red },
];

objectives.forEach((o, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = 0.7 + col * 4.1, y = 2.5 + row * 2.2;
  s5.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 3.9, h: 2.0, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s5.addShape(pres.ShapeType.roundRect, { x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.5, fill: { color: o.color }, rectRadius: 0.04 });
  s5.addText(o.num, { x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.5, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
  s5.addText(o.title, { x: x + 1.0, y: y + 0.2, w: 2.7, h: 0.5, fontSize: 12, bold: true, color: C.dark, valign: "middle", fontFace: "Calibri" });
  s5.addText(o.desc, { x: x + 0.2, y: y + 0.85, w: 3.5, h: 1.1, fontSize: 9.5, color: C.lightText, fontFace: "Calibri", lineSpacingMultiple: 1.4 });
});

addFooter(s5, 5);

// ============================================================
// SLIDE 6: ARCHITECTURE DIAGRAM
// ============================================================
const s6 = pres.addSlide();
baseSlide(s6);
addHeader(s6, "Architecture Diagram", "System Design \u2014 Scalable, Modular, Cloud-Native");

s6.addText("Layered microservices architecture designed for 100K+ concurrent users with 99.9% uptime.", { x: 0.7, y: 1.85, w: 12, h: 0.4, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

const layers = [
  { label: "Client Layer (Frontend)", desc: "React 18 + Vite + Tailwind CSS + Redux Toolkit \u2022 Responsive UI \u2022 Real-time updates via Socket.io", color: C.blue, y: 2.4 },
  { label: "API Gateway", desc: "Express.js \u2022 JWT/OAuth Auth \u2022 Rate Limiting \u2022 CORS \u2022 Request Validation \u2022 Helmet Security", color: C.green, y: 3.25 },
  { label: "Microservices Layer", desc: "Auth Service  |  Interview Service  |  Resume Service  |  Tracker Service  |  Notification Service", color: C.teal, y: 4.1 },
  { label: "AI/ML Pipeline", desc: "Google Gemini Pro API  |  spaCy NLP  |  Speech-to-Text  |  Scoring Models  |  Vector Search", color: C.orange, y: 4.95 },
  { label: "Data Layer", desc: "MongoDB Atlas \u2022 Redis Cache \u2022 AWS S3 Storage \u2022 Cloudinary CDN \u2022 Pinecone Vector DB", color: C.purple, y: 5.8 },
];

layers.forEach((l) => {
  s6.addShape(pres.ShapeType.roundRect, { x: 1, y: l.y, w: 11.3, h: 0.75, fill: { color: C.white }, line: { color: l.color, width: 2 }, rectRadius: 0.06 });
  s6.addShape(pres.ShapeType.rect, { x: 1, y: l.y, w: 0.15, h: 0.75, fill: { color: l.color } });
  s6.addText(l.label, { x: 1.4, y: l.y, w: 3.2, h: 0.75, fontSize: 12, bold: true, color: l.color, valign: "middle", fontFace: "Calibri" });
  s6.addText(l.desc, { x: 4.7, y: l.y, w: 7.5, h: 0.75, fontSize: 10, color: C.text, valign: "middle", fontFace: "Calibri" });
});

// Arrows between layers
for (let i = 0; i < 4; i++) {
  s6.addText("\u25BC", { x: 6.5, y: 3.16 + i * 0.85, w: 0.4, h: 0.15, fontSize: 10, color: C.muted, align: "center" });
}

// Stats bar
s6.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 6.7, w: 12, h: 0.55, fill: { color: C.green }, rectRadius: 0.05 });
const archStats = [
  { val: "99.9%", label: "Uptime" },
  { val: "<200ms", label: "API Response" },
  { val: "100K+", label: "Concurrent Users" },
  { val: "Auto-Scale", label: "Cloud Native" },
];
archStats.forEach((s, i) => {
  const x = 1 + i * 2.95;
  s6.addText(s.val, { x: x, y: 6.7, w: 1.8, h: 0.3, fontSize: 12, bold: true, color: C.orange, fontFace: "Calibri" });
  s6.addText(s.label, { x: x, y: 7.0, w: 1.8, h: 0.25, fontSize: 8.5, color: "DDDDDD", fontFace: "Calibri" });
});

addFooter(s6, 6);

// ============================================================
// SLIDE 7: TECHNOLOGY STACK
// ============================================================
const s7 = pres.addSlide();
baseSlide(s7);
addHeader(s7, "Technology Stack", "Enterprise-Grade, Modern & Scalable Infrastructure");

const techCols = [
  { title: "FRONTEND", items: "\u2022 React 18 + Vite\n\u2022 Tailwind CSS\n\u2022 Shadcn/UI\n\u2022 Redux Toolkit\n\u2022 Chart.js / Recharts", color: C.green },
  { title: "BACKEND", items: "\u2022 Node.js 20 LTS\n\u2022 Express.js\n\u2022 Socket.io\n\u2022 JWT + OAuth 2.0\n\u2022 REST APIs", color: C.teal },
  { title: "AI / ML", items: "\u2022 Google Gemini Pro\n\u2022 spaCy (NLP)\n\u2022 TensorFlow.js\n\u2022 Web Speech API\n\u2022 LangChain.js", color: C.orange },
  { title: "DATABASE", items: "\u2022 MongoDB Atlas\n\u2022 Redis (Caching)\n\u2022 AWS S3 (Storage)\n\u2022 Cloudinary\n\u2022 Pinecone (Vector)", color: C.blue },
  { title: "DEVOPS", items: "\u2022 Docker + K8s\n\u2022 GitHub Actions\n\u2022 Vercel + Render\n\u2022 Jest + Cypress\n\u2022 SonarQube", color: C.purple },
];

techCols.forEach((t, i) => {
  const x = 0.5 + i * 2.55;
  s7.addShape(pres.ShapeType.roundRect, { x: x, y: 2.0, w: 2.35, h: 4.2, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s7.addShape(pres.ShapeType.roundRect, { x: x, y: 2.0, w: 2.35, h: 0.6, fill: { color: t.color }, rectRadius: 0.08 });
  s7.addShape(pres.ShapeType.rect, { x: x, y: 2.4, w: 2.35, h: 0.2, fill: { color: t.color } });
  s7.addText(t.title, { x: x, y: 2.0, w: 2.35, h: 0.6, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
  s7.addText(t.items, { x: x + 0.15, y: 2.85, w: 2.1, h: 3.2, fontSize: 10, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.6 });
});

// Stats bar
s7.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 6.4, w: 12.3, h: 0.7, fill: { color: C.green }, rectRadius: 0.05 });
const techStats = [
  { val: "99.9%", label: "Platform uptime" },
  { val: "<200ms", label: "API response" },
  { val: "100K+", label: "Concurrent users" },
  { val: "Auto-scale", label: "Cloud infra" },
];
techStats.forEach((m, i) => {
  const x = 0.8 + i * 3.1;
  s7.addText(m.val, { x: x, y: 6.43, w: 2.5, h: 0.32, fontSize: 13, bold: true, color: C.orange, fontFace: "Calibri" });
  s7.addText(m.label, { x: x, y: 6.78, w: 2.5, h: 0.28, fontSize: 9, color: "DDDDDD", fontFace: "Calibri" });
});

addFooter(s7, 7);

// ============================================================
// SLIDE 8: KEY FEATURES
// ============================================================
const s8 = pres.addSlide();
baseSlide(s8);
addHeader(s8, "Key Features", "AI Innovations That Set SmartHire Apart");

const keyFeatures = [
  { icon: "\uD83E\uDD16", title: "AI Interview Copilot", desc: "Real-time hints & coaching during live mock sessions" },
  { icon: "\uD83C\uDFE2", title: "Company-Specific Prep", desc: "Curated banks for TCS, Infosys, Google, Amazon" },
  { icon: "\uD83D\uDCCA", title: "Peer Benchmarking", desc: "Compare progress with anonymous cohort data" },
  { icon: "\uD83D\uDD14", title: "Smart Notifications", desc: "AI-prioritized alerts for deadlines & opportunities" },
  { icon: "\uD83D\uDD17", title: "LinkedIn Integration", desc: "Auto-optimize LinkedIn profile from resume analysis" },
  { icon: "\uD83C\uDFA5", title: "Video Interview Mode", desc: "Camera practice with body language scoring" },
  { icon: "\uD83D\uDDFA\uFE0F", title: "Skill Gap Roadmap", desc: "Personalized learning path with resources" },
  { icon: "\uD83D\uDC65", title: "Group Mock Sessions", desc: "Collaborative practice with peer feedback" },
  { icon: "\uD83C\uDF10", title: "Portfolio Generator", desc: "Auto-generate portfolio website from resume" },
  { icon: "\uD83C\uDFEB", title: "TPO Dashboards", desc: "College-level analytics with cohort insights" },
];

keyFeatures.forEach((f, i) => {
  const col = i % 5, row = Math.floor(i / 5);
  const x = 0.5 + col * 2.55, y = 2.0 + row * 2.45;
  s8.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 2.35, h: 2.3, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s8.addText(f.icon, { x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.7, fontSize: 22 });
  s8.addText(f.title, { x: x + 0.2, y: y + 0.95, w: 2, h: 0.45, fontSize: 11, bold: true, color: C.dark, fontFace: "Calibri" });
  s8.addText(f.desc, { x: x + 0.2, y: y + 1.4, w: 2, h: 0.85, fontSize: 9, color: C.lightText, fontFace: "Calibri", lineSpacingMultiple: 1.3 });
});

addFooter(s8, 8);

// ============================================================
// SLIDE 9: SCREENSHOTS / DEMO
// ============================================================
const s9 = pres.addSlide();
baseSlide(s9);
addHeader(s9, "Screenshots / Demo", "Glimpse Into the SmartHire AI Experience");

s9.addText("A walkthrough of our key user-facing modules \u2014 from dashboard to interview to resume analysis.", { x: 0.7, y: 1.85, w: 12, h: 0.4, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

const screens = [
  { icon: "\uD83C\uDFE0", title: "Dashboard", desc: "Welcome banner, stats cards, Career Recommendations, Quick Actions, Recent Activity, Resume Score Trend & Placement Readiness gauge", color: C.orange },
  { icon: "\uD83C\uDFA4", title: "Mock Interview", desc: "Domain selection (DSA, WebDev, DBMS, OS, HR), 3 difficulty levels, real-time AI scoring with metrics, adaptive difficulty, full interview report", color: C.blue },
  { icon: "\uD83D\uDCC4", title: "Resume Analyzer", desc: "PDF/DOCX upload, ATS score (0-100), keyword analysis, AI suggestions by priority, JD matching, live resume builder with PDF export", color: C.green },
  { icon: "\uD83D\uDCBC", title: "Job Tracker", desc: "Add applications with company, role, salary, mode. Kanban view + Table view, stage filters, search, analytics dashboard", color: C.teal },
  { icon: "\uD83C\uDFAF", title: "Career Guide", desc: "18+ career paths with match scores, skill gaps, learning roadmap, market trends, company insights, salary projections", color: C.purple },
  { icon: "\uD83D\uDC64", title: "Profile", desc: "Picture upload, edit personal info, education, skills, projects, certifications with PDF upload, career goals \u2014 fully editable", color: C.red },
];

screens.forEach((s, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = 0.7 + col * 4.1, y = 2.4 + row * 2.4;
  s9.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 3.9, h: 2.2, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s9.addShape(pres.ShapeType.rect, { x: x, y: y, w: 3.9, h: 0.06, fill: { color: s.color } });
  s9.addText(s.icon, { x: x + 0.25, y: y + 0.25, w: 0.6, h: 0.6, fontSize: 22 });
  s9.addText(s.title, { x: x + 1.0, y: y + 0.3, w: 2.8, h: 0.5, fontSize: 13, bold: true, color: s.color, fontFace: "Calibri" });
  s9.addText(s.desc, { x: x + 0.25, y: y + 0.95, w: 3.4, h: 1.2, fontSize: 9.5, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.4 });
});

addFooter(s9, 9);

// ============================================================
// SLIDE 10: INNOVATION & IMPACT
// ============================================================
const s10 = pres.addSlide();
baseSlide(s10);
addHeader(s10, "Innovation & Impact", "Why SmartHire AI Stands Out");

s10.addText("Others solve one piece of the puzzle. SmartHire AI is the only platform that fuses mock interviews, resume intelligence, and job tracking into a single, student-friendly AI experience.", { x: 0.7, y: 1.85, w: 12, h: 0.6, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

const compTable = [
  [
    { text: "Feature", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "Generic\nPlatforms", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "Interview\nApps", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "Resume\nTools", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
    { text: "SmartHire\nAI", options: { bold: true, color: C.white, fill: { color: C.green }, fontFace: "Calibri" } },
  ],
  [{ text: "AI Mock Interviews" }, { text: "\u274C" }, { text: "\u26A0\uFE0F" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "ATS Resume Scoring" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u26A0\uFE0F" }, { text: "\u2705" }],
  [{ text: "Job Application Tracker" }, { text: "\u26A0\uFE0F" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Adaptive AI Difficulty" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Voice Interview Mode" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Career Recommendations" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Free for Students" }, { text: "\u274C" }, { text: "\u26A0\uFE0F" }, { text: "\u274C" }, { text: "\u2705" }],
];

s10.addTable(compTable, {
  x: 0.7, y: 2.55, w: 12, h: 3.7, fontSize: 10, fontFace: "Calibri",
  border: { type: "solid", pt: 0.5, color: C.cardBorder },
  colW: [3.5, 2.125, 2.125, 2.125, 2.125], rowH: [0.55, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
  align: "center", valign: "middle",
});

// Moat box
s10.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 6.4, w: 12, h: 0.7, fill: { color: C.orangeLight }, line: { color: C.orange, width: 1 }, rectRadius: 0.05 });
s10.addText("\uD83C\uDFC6 Our Moat: Unified AI ecosystem where interview performance informs resume improvements, and job tracking drives preparation priorities \u2014 creating a continuous feedback loop.", { x: 1, y: 6.4, w: 11.5, h: 0.7, fontSize: 10.5, italic: true, color: C.dark, valign: "middle", fontFace: "Calibri" });

addFooter(s10, 10);

// ============================================================
// SLIDE 11: SCALABILITY
// ============================================================
const s11 = pres.addSlide();
baseSlide(s11);
addHeader(s11, "Scalability", "Built for National Scale \u2014 1M+ Users Ready");

s11.addText("From day one, SmartHire AI's architecture is designed to scale horizontally with growing demand, ensuring sub-200ms response times even at peak load.", { x: 0.7, y: 1.85, w: 12, h: 0.5, fontSize: 11, color: C.lightText, fontFace: "Calibri" });

// Scalability pillars
const scaleData = [
  { title: "Microservices Architecture", desc: "Each module (Auth, Interview, Resume, Tracker) scales independently based on load. No bottleneck.", icon: "\uD83C\uDFD7\uFE0F", color: C.orange },
  { title: "MongoDB Atlas + Sharding", desc: "Auto-scaling clusters with sharding strategies for millions of resume documents and user records.", icon: "\uD83D\uDDC4\uFE0F", color: C.green },
  { title: "Redis Caching Layer", desc: "Hot data (sessions, AI responses) cached in Redis for <50ms access. CDN for static assets.", icon: "\u26A1", color: C.blue },
  { title: "Docker + Kubernetes", desc: "Containerized deployment with K8s orchestration. Auto-scaling pods based on CPU/memory metrics.", icon: "\uD83D\uDC33", color: C.teal },
  { title: "Event-Driven Pipeline", desc: "Async processing with message queues (RabbitMQ) for AI tasks, notifications & background jobs.", icon: "\uD83D\uDD04", color: C.purple },
  { title: "Multi-Region Deployment", desc: "Active-active deployment across AWS regions for low latency, fault tolerance & disaster recovery.", icon: "\uD83C\uDF0D", color: C.red },
];

scaleData.forEach((s, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = 0.7 + col * 4.1, y = 2.5 + row * 2.05;
  s11.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 3.9, h: 1.85, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s11.addShape(pres.ShapeType.roundRect, { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, fill: { color: s.color }, rectRadius: 0.04 });
  s11.addText(s.icon, { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, fontSize: 16, align: "center", valign: "middle" });
  s11.addText(s.title, { x: x + 0.85, y: y + 0.2, w: 2.9, h: 0.55, fontSize: 11.5, bold: true, color: C.dark, valign: "middle", fontFace: "Calibri" });
  s11.addText(s.desc, { x: x + 0.2, y: y + 0.85, w: 3.5, h: 0.95, fontSize: 9.5, color: C.lightText, fontFace: "Calibri", lineSpacingMultiple: 1.4 });
});

// Performance metrics
s11.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 6.7, w: 12, h: 0.55, fill: { color: C.green }, rectRadius: 0.05 });
const scaleStats = [
  { val: "1M+", label: "Users supported" },
  { val: "<200ms", label: "p95 response" },
  { val: "99.9%", label: "Uptime SLA" },
  { val: "Auto-scale", label: "Horizontal" },
];
scaleStats.forEach((m, i) => {
  const x = 1 + i * 2.95;
  s11.addText(`${m.val} \u2014 ${m.label}`, { x: x, y: 6.72, w: 2.95, h: 0.5, fontSize: 11, bold: true, color: C.orange, valign: "middle", fontFace: "Calibri" });
});

addFooter(s11, 11);

// ============================================================
// SLIDE 12: BUSINESS / SOCIAL IMPACT
// ============================================================
const s12 = pres.addSlide();
baseSlide(s12);
addHeader(s12, "Business & Social Impact", "Empowering Students, Strengthening Institutions");

const impactCards = [
  {
    title: "Student Impact",
    color: C.orange,
    items: [
      { val: "60%", desc: "Reduction in preparation time" },
      { val: "3x", desc: "Higher interview confidence" },
      { val: "85%+", desc: "ATS-compatible resumes created" },
      { val: "10+ hrs", desc: "Saved per week" },
    ],
  },
  {
    title: "Institutional Impact",
    color: C.blue,
    items: [
      { val: "40%", desc: "Higher placement success rate" },
      { val: "Digital", desc: "Data-driven analytics" },
      { val: "Better", desc: "Institutional reputation" },
      { val: "Equitable", desc: "Tier 2-3 college support" },
    ],
  },
  {
    title: "Industry Impact",
    color: C.teal,
    items: [
      { val: "50%", desc: "Reduced screening time" },
      { val: "Higher", desc: "Quality of candidates" },
      { val: "Wider", desc: "Talent pipeline access" },
      { val: "Lower", desc: "Cost-per-hire" },
    ],
  },
];

impactCards.forEach((cat, i) => {
  const x = 0.7 + i * 4.1;
  s12.addShape(pres.ShapeType.roundRect, { x: x, y: 2.0, w: 3.9, h: 3.4, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s12.addShape(pres.ShapeType.rect, { x: x, y: 2.0, w: 3.9, h: 0.06, fill: { color: cat.color } });
  s12.addText(cat.title, { x: x + 0.25, y: 2.2, w: 3.4, h: 0.45, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri" });
  cat.items.forEach((item, j) => {
    s12.addText(item.val, { x: x + 0.25, y: 2.75 + j * 0.6, w: 1.2, h: 0.4, fontSize: 14, bold: true, color: cat.color, valign: "middle", fontFace: "Calibri" });
    s12.addText(item.desc, { x: x + 1.5, y: 2.75 + j * 0.6, w: 2.3, h: 0.4, fontSize: 9.5, color: C.text, valign: "middle", fontFace: "Calibri" });
  });
});

// SDG section
s12.addText("ALIGNED WITH UN SUSTAINABLE DEVELOPMENT GOALS", { x: 0.7, y: 5.6, w: 11, h: 0.4, fontSize: 11, bold: true, color: C.orange, fontFace: "Calibri" });
const sdgs = [
  { num: "SDG 4", label: "Quality Education" },
  { num: "SDG 5", label: "Gender Equality" },
  { num: "SDG 8", label: "Decent Work" },
  { num: "SDG 9", label: "Innovation" },
  { num: "SDG 10", label: "Reduced Inequality" },
];
sdgs.forEach((s, i) => {
  const x = 0.7 + i * 2.45;
  s12.addShape(pres.ShapeType.roundRect, { x: x, y: 6.05, w: 2.3, h: 0.95, fill: { color: C.green }, rectRadius: 0.05 });
  s12.addText(s.num, { x: x, y: 6.1, w: 2.3, h: 0.45, fontSize: 12, bold: true, color: C.orange, align: "center", fontFace: "Calibri" });
  s12.addText(s.label, { x: x, y: 6.55, w: 2.3, h: 0.4, fontSize: 9, color: "DDDDDD", align: "center", fontFace: "Calibri" });
});

addFooter(s12, 12);

// ============================================================
// SLIDE 13: FUTURE SCOPE / ROADMAP
// ============================================================
const s13 = pres.addSlide();
baseSlide(s13);
addHeader(s13, "Future Scope", "Roadmap \u2014 From Prototype to National Scale");

// Timeline
s13.addShape(pres.ShapeType.rect, { x: 1.2, y: 2.5, w: 11, h: 0.04, fill: { color: C.cardBorder } });
const phaseColors = [C.green, C.teal, C.orange, C.purple];
phaseColors.forEach((clr, i) => {
  s13.addShape(pres.ShapeType.ellipse, { x: 1.2 + i * 3.65, y: 2.32, w: 0.4, h: 0.4, fill: { color: clr } });
});

const phases = [
  { phase: "PHASE 1\n0-3 Months", title: "Prototype", items: "\u2022 Requirements & system design\n\u2022 Core API development\n\u2022 Mock interview MVP\n\u2022 Resume parser v1\n\u2022 Auth & user management", color: C.green },
  { phase: "PHASE 2\n3-6 Months", title: "Beta Launch", items: "\u2022 Full feature development\n\u2022 AI model fine-tuning\n\u2022 5 college pilot testing\n\u2022 User feedback iteration\n\u2022 LinkedIn integration", color: C.teal },
  { phase: "PHASE 3\n6-12 Months", title: "Scale", items: "\u2022 25+ college deployment\n\u2022 Voice + vernacular support\n\u2022 Mobile app (React Native)\n\u2022 B2B API launch\n\u2022 Video interview mode", color: C.orange },
  { phase: "PHASE 4\n1-3 Years", title: "National", items: "\u2022 1L+ students served\n\u2022 Pan-India coverage\n\u2022 Full AI ecosystem\n\u2022 Marketplace launch\n\u2022 Government partnerships", color: C.purple },
];

phases.forEach((p, i) => {
  const x = 0.5 + i * 3.2;
  s13.addShape(pres.ShapeType.roundRect, { x: x, y: 2.9, w: 3.0, h: 3.4, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s13.addShape(pres.ShapeType.roundRect, { x: x, y: 2.9, w: 3.0, h: 0.7, fill: { color: p.color }, rectRadius: 0.08 });
  s13.addShape(pres.ShapeType.rect, { x: x, y: 3.4, w: 3.0, h: 0.2, fill: { color: p.color } });
  s13.addText(p.phase, { x: x, y: 2.9, w: 3.0, h: 0.7, fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
  s13.addText(p.title, { x: x + 0.2, y: 3.7, w: 2.6, h: 0.4, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri" });
  s13.addText(p.items, { x: x + 0.2, y: 4.2, w: 2.6, h: 2.0, fontSize: 9.5, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.5 });
});

// Vision 2030
s13.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 6.45, w: 12.3, h: 0.75, fill: { color: C.green }, rectRadius: 0.05 });
s13.addText("VISION 2030", { x: 0.8, y: 6.48, w: 2, h: 0.35, fontSize: 11, bold: true, color: C.orange, fontFace: "Calibri" });
s13.addText("SmartHire AI becomes India's most trusted AI placement platform \u2014 1 Million+ students across 1000+ colleges, transforming campus hiring forever.", { x: 0.8, y: 6.83, w: 11.8, h: 0.35, fontSize: 9.5, color: "DDDDDD", fontFace: "Calibri" });

addFooter(s13, 13);

// ============================================================
// SLIDE 14: TEAM DETAILS
// ============================================================
const s14 = pres.addSlide();
baseSlide(s14);
addHeader(s14, "Team Details", "Meet Team TwinTech");

s14.addText("Two minds, one mission \u2014 making placement preparation smarter for every Indian student.", { x: 0.7, y: 1.85, w: 12, h: 0.4, fontSize: 12, italic: true, color: C.lightText, fontFace: "Calibri" });

// Team member cards
const team = [
  {
    name: "Yashvant",
    role: "Full Stack Developer & AI Engineer",
    skills: ["Backend Architecture", "Node.js / Express", "MongoDB / Database Design", "Google Gemini AI Integration", "NLP & ML Algorithms", "DevOps & Cloud (AWS)"],
    color: C.orange,
    initial: "Y",
  },
  {
    name: "Shivani Kapase",
    role: "Frontend Developer & UX Designer",
    skills: ["React.js & Redux", "UI/UX Design", "Tailwind CSS", "Data Visualization", "User Research & Testing", "Frontend Architecture"],
    color: C.teal,
    initial: "S",
  },
];

team.forEach((m, i) => {
  const x = 0.7 + i * 6.1;
  s14.addShape(pres.ShapeType.roundRect, { x: x, y: 2.5, w: 5.9, h: 4.2, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  // Avatar
  s14.addShape(pres.ShapeType.ellipse, { x: x + 2.45, y: 2.8, w: 1.0, h: 1.0, fill: { color: m.color }, line: { color: C.white, width: 3 } });
  s14.addText(m.initial, { x: x + 2.45, y: 2.8, w: 1.0, h: 1.0, fontSize: 36, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
  // Name
  s14.addText(m.name, { x: x + 0.3, y: 4.0, w: 5.3, h: 0.5, fontSize: 20, bold: true, color: C.dark, align: "center", fontFace: "Calibri" });
  // Role
  s14.addText(m.role, { x: x + 0.3, y: 4.5, w: 5.3, h: 0.4, fontSize: 12, color: m.color, align: "center", fontFace: "Calibri" });
  // Skills
  m.skills.forEach((sk, j) => {
    const col = j % 2;
    const row = Math.floor(j / 2);
    s14.addText(`\u2022 ${sk}`, { x: x + 0.4 + col * 2.65, y: 5.0 + row * 0.4, w: 2.6, h: 0.35, fontSize: 9.5, color: C.text, fontFace: "Calibri" });
  });
});

// Quote
s14.addShape(pres.ShapeType.roundRect, { x: 1.5, y: 6.85, w: 10.3, h: 0.4, fill: { color: C.orangeLight }, rectRadius: 0.2 });
s14.addText("\"Twin minds, one mission \u2014 making placement prep smarter for every student.\"", { x: 1.5, y: 6.85, w: 10.3, h: 0.4, fontSize: 11, italic: true, color: C.orange, align: "center", valign: "middle", fontFace: "Calibri" });

addFooter(s14, 14);

// ============================================================
// SLIDE 15: THANK YOU
// ============================================================
const s15 = pres.addSlide();
s15.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: C.cream } });
s15.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.12, fill: { color: C.orange } });

// Logo
s15.addShape(pres.ShapeType.roundRect, { x: 5.95, y: 0.7, w: 0.85, h: 0.85, fill: { color: C.orange }, rectRadius: 0.1 });
s15.addText("S", { x: 5.95, y: 0.7, w: 0.85, h: 0.85, fontSize: 38, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
s15.addText("SmartHire AI", { x: 6.95, y: 0.85, w: 4, h: 0.6, fontSize: 22, color: C.dark, fontFace: "Calibri" });

// Thank You
s15.addText("Thank You!", { x: 0, y: 1.9, w: 13.33, h: 1.3, fontSize: 60, bold: true, color: C.dark, align: "center", fontFace: "Calibri" });
s15.addText("\"Prepare. Perform. Get Placed.\"", { x: 0, y: 3.2, w: 13.33, h: 0.6, fontSize: 20, italic: true, color: C.orange, align: "center", fontFace: "Calibri" });

// Summary box
s15.addShape(pres.ShapeType.roundRect, { x: 2.5, y: 4.0, w: 8.3, h: 2.2, fill: { color: C.orange }, rectRadius: 0.1 });
const summary = [
  "\uD83E\uDD16  AI Mock Interview \u2014 NLP + Voice + Adaptive Difficulty",
  "\uD83D\uDCDD  Resume Analyzer \u2014 ATS Scoring + ML Optimization",
  "\uD83D\uDCCB  Job Tracker \u2014 Kanban + Analytics + Calendar Sync",
  "\u2699\uFE0F  MERN Stack + Gemini AI + Microservices + DevOps",
  "\uD83C\uDF1F  Freemium Model | 1L+ Users Target | College Partnerships",
];
summary.forEach((line, i) => {
  s15.addText(line, { x: 2.85, y: 4.15 + i * 0.4, w: 7.7, h: 0.38, fontSize: 11, color: C.white, fontFace: "Calibri" });
});

// Team footer
s15.addShape(pres.ShapeType.roundRect, { x: 3.5, y: 6.4, w: 6.3, h: 0.85, fill: { color: C.orangeDark }, rectRadius: 0.08 });
s15.addText("Team TwinTech", { x: 3.5, y: 6.45, w: 6.3, h: 0.4, fontSize: 16, bold: true, color: C.white, align: "center", fontFace: "Calibri" });
s15.addText("Yashvant  \u2022  Shivani  \u2022  Hackathon Round 1  |  June 2026", { x: 3.5, y: 6.85, w: 6.3, h: 0.35, fontSize: 11, color: "FFE0B2", align: "center", fontFace: "Calibri" });

s15.addText(`15 / ${TOTAL}`, { x: 11.5, y: 7.15, w: 1.5, h: 0.3, fontSize: 8, color: C.muted, align: "right", fontFace: "Calibri" });

// ============================================================
// SAVE
// ============================================================
pres.writeFile({ fileName: "./SmartHire_AI_Final_Deck_v3.pptx" })
  .then(() => {
    console.log("");
    console.log("  ===================================================");
    console.log("  |  SmartHire AI - Final Deck Generated!           |");
    console.log("  ===================================================");
    console.log("  File: SmartHire_AI_Final_Deck_v3.pptx");
    console.log("  Slides: 15 (matches required structure)");
    console.log("  Theme: Orange (Calibri font)");
    console.log("  ===================================================");
    console.log("");
  })
  .catch(err => console.error("Error:", err));
