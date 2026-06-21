const pptxgen = require("pptxgenjs");

// ============================================================
// SmartHire AI - Hackathon Round 1 | Team TwinTech
// Format Reference: AgroVision AI style
// Theme: Orange shade, light cream background
// ============================================================

const pres = new pptxgen();

// ------ ORANGE LIGHT THEME (Complete Orange) ------
const C = {
  orange: "E97B1F",        // Primary Orange (headings, labels)
  orangeDark: "C4600A",    // Darker Orange
  orangeLight: "F5A623",   // Lighter Orange
  orangePale: "FFF3E0",    // Very pale orange (backgrounds)
  dark: "1A1A1A",          // Near Black (titles)
  text: "333333",          // Body text
  lightText: "666666",     // Muted text
  mutedText: "999999",     // Very muted
  white: "FFFFFF",
  cream: "FFF8F0",         // Light orange-cream background
  cardBg: "FFFFFF",        // White cards
  cardBorder: "F5DEB3",    // Warm orange-tinted border
  green: "E97B1F",         // Replaced green with orange
  greenLight: "F5A623",    // Replaced with lighter orange
  teal: "D4760A",          // Deep warm orange
  blue: "E8860F",          // Warm orange variant
  purple: "C4600A",        // Dark burnt orange
  red: "DC2626",           // Red accent
  divider: "E97B1F",       // Orange divider line
  topBar: "E97B1F",        // Top bar orange
  sideBar: "F5A623",       // Left sidebar golden orange
  statBar: "C4600A",       // Dark orange stat bar
};

// ------ PRESENTATION SETTINGS ------
pres.defineLayout({ name: "CUSTOM", width: 13.33, height: 7.5 });
pres.layout = "CUSTOM";
pres.author = "Team TwinTech - Yashvant & Shivani";
pres.company = "TwinTech";
pres.subject = "Hackathon Round 1 - Idea Submission";
pres.title = "SmartHire AI - AI-Powered Placement Preparation Platform";

// ------ HELPER: Slide base (cream bg + top bar + side stripe) ------
function addSlideBase(slide) {
  // Cream background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: C.cream },
  });
  // Orange top bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 0.07,
    fill: { color: C.topBar },
  });
  // Green left stripe
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 0.08, h: 7.5,
    fill: { color: C.sideBar },
  });
}

function addFooter(slide, num, total) {
  slide.addText("SmartHire AI \u00B7 AI-Powered Placement Preparation Platform", {
    x: 0.5, y: 7.15, w: 8, h: 0.3,
    fontSize: 8, color: C.mutedText, fontFace: "Segoe UI",
  });
  slide.addText(`${num} / ${total}`, {
    x: 11.5, y: 7.15, w: 1.5, h: 0.3,
    fontSize: 8, color: C.mutedText, align: "right", fontFace: "Segoe UI",
  });
}

function addSectionHeader(slide, sectionLabel, title) {
  // Section label (orange, small uppercase)
  slide.addText(sectionLabel.toUpperCase(), {
    x: 0.7, y: 0.35, w: 10, h: 0.4,
    fontSize: 12, bold: true, color: C.orange,
    fontFace: "Segoe UI",
  });
  // Big title (black, bold)
  slide.addText(title, {
    x: 0.7, y: 0.75, w: 12, h: 0.9,
    fontSize: 32, bold: true, color: C.dark,
    fontFace: "Segoe UI",
  });
  // Orange divider line
  slide.addShape(pres.ShapeType.rect, {
    x: 0.7, y: 1.65, w: 12, h: 0.03,
    fill: { color: C.divider },
  });
}

const TOTAL = 15;

// ============================================================
// SLIDE 1: TITLE / HERO (Dark green background like reference)
// ============================================================
const slide1 = pres.addSlide();
// Light orange background
slide1.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 7.5,
  fill: { color: C.orangeDark },
});
// Orange top bar
slide1.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.07,
  fill: { color: C.topBar },
});
// Orange left accent stripe
slide1.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: 0.08, h: 7.5,
  fill: { color: C.orange },
});

// Logo badge
slide1.addShape(pres.ShapeType.roundRect, {
  x: 0.6, y: 0.4, w: 0.55, h: 0.55,
  fill: { color: C.orange }, rectRadius: 0.08,
});
slide1.addText("S", {
  x: 0.6, y: 0.4, w: 0.55, h: 0.55,
  fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
});
slide1.addText("SmartHire AI", {
  x: 1.3, y: 0.42, w: 4, h: 0.5,
  fontSize: 16, color: C.white, fontFace: "Segoe UI",
});

// Hackathon badge
slide1.addShape(pres.ShapeType.roundRect, {
  x: 0.6, y: 1.3, w: 4.5, h: 0.5,
  fill: { color: C.orange }, rectRadius: 0.04,
});
slide1.addText("HACKATHON ROUND 1 \u00B7 2026", {
  x: 0.8, y: 1.3, w: 4.3, h: 0.5,
  fontSize: 11, bold: true, color: C.white, valign: "middle", fontFace: "Segoe UI",
});

// Main title
slide1.addText("AI-Powered Placement\nPreparation Platform", {
  x: 0.6, y: 2.2, w: 10, h: 1.6,
  fontSize: 42, bold: true, color: C.white,
  fontFace: "Segoe UI", lineSpacingMultiple: 1.1,
});

// Tagline in orange italic
slide1.addText("\"Prepare. Perform. Get Placed.\"", {
  x: 0.6, y: 3.9, w: 8, h: 0.5,
  fontSize: 16, italic: true, color: "FFE0B2",
  fontFace: "Segoe UI",
});

// Description
slide1.addText("Transform placement preparation from scattered guesswork to\nAI-driven, structured, personalized career readiness.", {
  x: 0.6, y: 4.5, w: 8, h: 0.7,
  fontSize: 12.5, color: "FFCC80",
  fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
});

// Team info
slide1.addText("Team TwinTech  |  Yashvant & Shivani", {
  x: 0.6, y: 5.4, w: 8, h: 0.4,
  fontSize: 11, color: "FFCC80", fontFace: "Segoe UI",
});

// Bottom stat cards (orange themed)
const stats1 = [
  { val: "80%", label: "Students feel\nunprepared" },
  { val: "75%", label: "Resumes rejected\nby ATS" },
  { val: "5-10", label: "Platforms juggled\nfor prep" },
  { val: "$2.1B", label: "Ed-tech placement\nmarket" },
];
stats1.forEach((s, i) => {
  const x = 0.6 + i * 3.15;
  slide1.addShape(pres.ShapeType.roundRect, {
    x: x, y: 6.1, w: 2.95, h: 1.1,
    fill: { color: C.orange }, rectRadius: 0.06,
  });
  slide1.addText(s.val, {
    x: x + 0.2, y: 6.15, w: 2.55, h: 0.5,
    fontSize: 20, bold: true, color: C.white, fontFace: "Segoe UI",
  });
  slide1.addText(s.label, {
    x: x + 0.2, y: 6.6, w: 2.55, h: 0.5,
    fontSize: 9, color: "FFE0B2", fontFace: "Segoe UI",
  });
});

// ============================================================
// SLIDE 2: EXECUTIVE SUMMARY
// ============================================================
const slide2 = pres.addSlide();
addSlideBase(slide2);
addSectionHeader(slide2, "EXECUTIVE SUMMARY", "The Big Picture at a Glance");

// Problem card
slide2.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 1.9, w: 5.9, h: 2.2,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide2.addText("THE PROBLEM", {
  x: 1.0, y: 2.1, w: 5.3, h: 0.35,
  fontSize: 11, bold: true, color: C.orange, fontFace: "Segoe UI",
});
slide2.addText("Students preparing for campus placements face a fragmented ecosystem \u2014 juggling 5-10 platforms for mock interviews, resume building, and job tracking. 75% of resumes are rejected by ATS systems, and most students lack affordable access to quality interview coaching.", {
  x: 1.0, y: 2.6, w: 5.3, h: 1.3,
  fontSize: 10.5, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
});

// Solution card
slide2.addShape(pres.ShapeType.roundRect, {
  x: 6.8, y: 1.9, w: 5.9, h: 2.2,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide2.addText("OUR SOLUTION", {
  x: 7.1, y: 2.1, w: 5.3, h: 0.35,
  fontSize: 11, bold: true, color: C.orange, fontFace: "Segoe UI",
});
slide2.addText("SmartHire AI \u2014 an integrated AI platform that combines Mock Interview Chatbot, Intelligent Resume Analyzer, and Smart Job Tracker into one unified experience. Powered by Google Gemini AI, NLP, and MERN stack for personalized, data-driven placement preparation.", {
  x: 7.1, y: 2.6, w: 5.3, h: 1.3,
  fontSize: 10.5, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
});

// Technology stack pills
slide2.addText("TECHNOLOGY STACK", {
  x: 0.7, y: 4.4, w: 5, h: 0.35,
  fontSize: 11, bold: true, color: C.orange, fontFace: "Segoe UI",
});
const techPills = ["React.js", "Node.js", "MongoDB", "Gemini AI", "NLP Engine", "Tailwind CSS", "Socket.io"];
techPills.forEach((t, i) => {
  const x = 0.7 + i * 1.75;
  slide2.addShape(pres.ShapeType.roundRect, {
    x: x, y: 4.85, w: 1.6, h: 0.45,
    fill: { color: C.white },
    line: { color: C.greenLight, width: 1 },
    rectRadius: 0.22,
  });
  slide2.addText(t, {
    x: x, y: 4.85, w: 1.6, h: 0.45,
    fontSize: 9, color: C.text, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
});

// Projected Impact section
slide2.addText("PROJECTED IMPACT", {
  x: 0.7, y: 5.6, w: 5, h: 0.35,
  fontSize: 11, bold: true, color: C.orange, fontFace: "Segoe UI",
});
const impacts = [
  { val: "60%", label: "Prep Time\nReduction" },
  { val: "3x", label: "Interview\nConfidence" },
  { val: "85%+", label: "ATS-Ready\nResumes" },
  { val: "40%", label: "Higher Placement\nSuccess" },
];
impacts.forEach((imp, i) => {
  const x = 0.7 + i * 3.15;
  slide2.addShape(pres.ShapeType.roundRect, {
    x: x, y: 6.0, w: 2.95, h: 1.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  slide2.addText(imp.val, {
    x: x + 0.2, y: 6.05, w: 2.55, h: 0.45,
    fontSize: 18, bold: true, color: C.greenLight, fontFace: "Segoe UI",
  });
  slide2.addText(imp.label, {
    x: x + 0.2, y: 6.5, w: 2.55, h: 0.45,
    fontSize: 9, color: C.lightText, fontFace: "Segoe UI",
  });
});

addFooter(slide2, 2, TOTAL);

// ============================================================
// SLIDE 3: THE PROBLEM
// ============================================================
const slide3 = pres.addSlide();
addSlideBase(slide3);
addSectionHeader(slide3, "THE PROBLEM", "Placement Preparation Faces a Multi-Dimensional Crisis");

// Subtitle
slide3.addText("Students are trapped in a cycle of scattered preparation. Without unified AI tools, they face compounding challenges from fragmented resources, interview anxiety, and missed opportunities.", {
  x: 0.7, y: 1.8, w: 12, h: 0.5,
  fontSize: 10.5, color: C.lightText, fontFace: "Segoe UI",
});

// 4 problem cards with colored top bars
const problems = [
  { num: "1", title: "Resource\nFragmentation", items: "\u2022 5-10 different platforms\n\u2022 No unified progress tracking\n\u2022 Context-switching overhead\n\u2022 Inconsistent quality", barColor: C.orange },
  { num: "2", title: "Interview\nAnxiety", items: "\u2022 78% report high stress\n\u2022 Coaching costs \u20B910K-50K+\n\u2022 No realistic practice access\n\u2022 No feedback on performance", barColor: C.blue },
  { num: "3", title: "ATS Resume\nRejection", items: "\u2022 75% never reach recruiters\n\u2022 Wrong keywords & format\n\u2022 No professional feedback\n\u2022 Generic templates fail", barColor: C.teal },
  { num: "4", title: "Zero\nVisibility", items: "\u2022 20-50+ applications untracked\n\u2022 Missed deadlines & follow-ups\n\u2022 No analytics on success rate\n\u2022 Lost opportunities", barColor: C.purple },
];

problems.forEach((p, i) => {
  const x = 0.7 + i * 3.15;
  // Card
  slide3.addShape(pres.ShapeType.roundRect, {
    x: x, y: 2.5, w: 2.95, h: 3.6,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  // Colored top bar
  slide3.addShape(pres.ShapeType.rect, {
    x: x, y: 2.5, w: 2.95, h: 0.06,
    fill: { color: p.barColor },
  });
  // Number circle
  slide3.addShape(pres.ShapeType.ellipse, {
    x: x + 0.2, y: 2.75, w: 0.5, h: 0.5,
    fill: { color: p.barColor },
  });
  slide3.addText(p.num, {
    x: x + 0.2, y: 2.75, w: 0.5, h: 0.5,
    fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
  // Title
  slide3.addText(p.title, {
    x: x + 0.8, y: 2.75, w: 2.0, h: 0.6,
    fontSize: 12, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  // Items
  slide3.addText(p.items, {
    x: x + 0.2, y: 3.6, w: 2.6, h: 2.3,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.5,
  });
});

// Bottom stat bar (dark green)
slide3.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 6.4, w: 12, h: 0.8,
  fill: { color: C.statBar }, rectRadius: 0.05,
});
slide3.addText("\u20B950,000+ Crore", {
  x: 1.0, y: 6.45, w: 3, h: 0.7,
  fontSize: 18, bold: true, color: C.orangeLight, valign: "middle", fontFace: "Segoe UI",
});
slide3.addText("Annual productivity lost by Indian students due to poor placement preparation, scattered resources, and lack of affordable coaching. AI-driven platforms can directly recover this potential.", {
  x: 4.2, y: 6.45, w: 8.2, h: 0.7,
  fontSize: 9.5, color: "CCCCCC", valign: "middle", fontFace: "Segoe UI",
});

addFooter(slide3, 3, TOTAL);

// ============================================================
// SLIDE 4: MARKET NEED & OPPORTUNITY
// ============================================================
const slide4 = pres.addSlide();
addSlideBase(slide4);
addSectionHeader(slide4, "MARKET NEED & OPPORTUNITY", "Why This Problem Demands an AI Solution Now");

// Two cards side by side
// Left - Global
slide4.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 1.9, w: 5.9, h: 2.8,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide4.addText("\uD83C\uDF0D  Global Imperative", {
  x: 1.0, y: 2.1, w: 5.3, h: 0.4,
  fontSize: 13, bold: true, color: C.green, fontFace: "Segoe UI",
});
const globalPoints = [
  "\u2022 4.5M+ engineering graduates annually in India",
  "\u2022 Only 20% are considered employable (NASSCOM)",
  "\u2022 \u20B915,000 Cr+ spent on coaching & prep yearly",
  "\u2022 Digital hiring growing 35% post-pandemic",
  "\u2022 AI-powered career tools market booming globally",
];
globalPoints.forEach((p, i) => {
  slide4.addText(p, {
    x: 1.0, y: 2.6 + i * 0.38, w: 5.3, h: 0.35,
    fontSize: 10, color: C.text, fontFace: "Segoe UI",
  });
});

// Right - India-specific
slide4.addShape(pres.ShapeType.roundRect, {
  x: 6.8, y: 1.9, w: 5.9, h: 2.8,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide4.addText("\uD83C\uDDEE\uD83C\uDDF3  India-Specific Challenges", {
  x: 7.1, y: 2.1, w: 5.3, h: 0.4,
  fontSize: 13, bold: true, color: C.green, fontFace: "Segoe UI",
});
const indiaPoints = [
  "\u2022 50K+ engineering colleges, uneven placement support",
  "\u2022 Tier 2-3 colleges lack placement training infrastructure",
  "\u2022 Average coaching cost: \u20B910,000-50,000 per student",
  "\u2022 75% resumes rejected by ATS before human review",
  "\u2022 Only 8% students use AI-based prep tools",
];
indiaPoints.forEach((p, i) => {
  slide4.addText(p, {
    x: 7.1, y: 2.6 + i * 0.38, w: 5.3, h: 0.35,
    fontSize: 10, color: C.text, fontFace: "Segoe UI",
  });
});

// THE AI OPPORTUNITY section
slide4.addText("THE AI OPPORTUNITY", {
  x: 0.7, y: 5.0, w: 5, h: 0.35,
  fontSize: 11, bold: true, color: C.orange, fontFace: "Segoe UI",
});

const opp = [
  { val: "$2.1B", label: "Ed-Tech Placement\nmarket (2025)" },
  { val: "$5.8B", label: "Projected market\nby 2030" },
  { val: "28%+", label: "CAGR growth\n(2025-2030)" },
  { val: "750M+", label: "Smartphone users\nin India" },
];
opp.forEach((o, i) => {
  const x = 0.7 + i * 3.15;
  slide4.addShape(pres.ShapeType.roundRect, {
    x: x, y: 5.45, w: 2.95, h: 1.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  slide4.addText(o.val, {
    x: x + 0.2, y: 5.5, w: 2.55, h: 0.45,
    fontSize: 18, bold: true, color: C.orange, fontFace: "Segoe UI",
  });
  slide4.addText(o.label, {
    x: x + 0.2, y: 5.95, w: 2.55, h: 0.42,
    fontSize: 9, color: C.lightText, fontFace: "Segoe UI",
  });
});

// Source
slide4.addText("Sources: NASSCOM, Straits Research, India Skills Report 2025-26", {
  x: 0.7, y: 6.7, w: 10, h: 0.3,
  fontSize: 8, italic: true, color: C.mutedText, fontFace: "Segoe UI",
});

addFooter(slide4, 4, TOTAL);

// ============================================================
// SLIDE 5: OUR SOLUTION
// ============================================================
const slide5 = pres.addSlide();
addSlideBase(slide5);
addSectionHeader(slide5, "OUR SOLUTION", "SmartHire AI \u2014 A Complete Placement Preparation Ecosystem");

slide5.addText("An integrated AI platform that transforms scattered preparation into a structured, personalized, and intelligent placement readiness journey for every student.", {
  x: 0.7, y: 1.8, w: 12, h: 0.4,
  fontSize: 10.5, color: C.lightText, fontFace: "Segoe UI",
});

// 3 top feature cards + 3 bottom
const features = [
  { icon: "\uD83E\uDD16", title: "MOCK INTERVIEW", desc: "AI-powered chatbot conducts\nrealistic technical & HR interviews\nwith adaptive difficulty & scoring", barColor: C.green },
  { icon: "\uD83D\uDCDD", title: "RESUME ANALYZER", desc: "ATS scoring engine with keyword\noptimization, format validation\n& actionable recommendations", barColor: C.orange },
  { icon: "\uD83D\uDCCB", title: "JOB TRACKER", desc: "Kanban dashboard to manage\napplications, deadlines, interviews\nwith analytics & calendar sync", barColor: C.teal },
  { icon: "\u26A1", title: "AI FEEDBACK", desc: "Personalized improvement plans\nbased on interview performance\n& resume quality analysis", barColor: C.orangeLight },
  { icon: "\uD83D\uDCCA", title: "ANALYTICS", desc: "Progress tracking, success rates,\nweakness identification & skill\ngap analysis over time", barColor: C.orangeLight },
  { icon: "\uD83C\uDF99\uFE0F", title: "VOICE MODE", desc: "Speech-to-text interview practice\nwith pronunciation feedback &\nconfidence scoring", barColor: C.orangeLight },
];

features.forEach((f, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.7 + col * 4.15;
  const y = 2.4 + row * 2.45;

  slide5.addShape(pres.ShapeType.roundRect, {
    x: x, y: y, w: 3.95, h: 2.2,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  // Colored top bar on card
  slide5.addShape(pres.ShapeType.rect, {
    x: x, y: y, w: 3.95, h: 0.06,
    fill: { color: f.barColor },
  });
  // Icon + Title
  slide5.addText(`${f.icon}    ${f.title}`, {
    x: x + 0.25, y: y + 0.2, w: 3.5, h: 0.5,
    fontSize: 12, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  // Description
  slide5.addText(f.desc, {
    x: x + 0.25, y: y + 0.85, w: 3.5, h: 1.2,
    fontSize: 10, color: C.lightText, fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
  });
});

addFooter(slide5, 5, TOTAL);

// ============================================================
// SLIDE 6: SYSTEM WORKFLOW
// ============================================================
const slide6 = pres.addSlide();
addSlideBase(slide6);
addSectionHeader(slide6, "SYSTEM WORKFLOW", "End-to-End Pipeline \u2014 From Student Input to AI Guidance");

// 5 step cards
const steps = [
  { step: "STEP 1", num: "1", title: "USER\nINPUT", items: "Resume upload\nDomain selection\nDifficulty preference\nProfile setup\nGoal setting", barColor: C.green },
  { step: "STEP 2", num: "2", title: "DATA\nPROCESSING", items: "Resume parsing\nKeyword extraction\nProfile analysis\nSkill mapping\nGap identification", barColor: C.teal },
  { step: "STEP 3", num: "3", title: "AI\nENGINE", items: "Gemini API analysis\nNLP scoring\nPattern matching\nAdaptive questions\nFeedback generation", barColor: C.blue },
  { step: "STEP 4", num: "4", title: "INTELLIGENCE\nLAYER", items: "ATS score (0-100)\nInterview evaluation\nSkill gap report\nPriority suggestions\nProgress tracking", barColor: C.orange },
  { step: "STEP 5", num: "5", title: "DELIVER\n& IMPROVE", items: "Dashboard results\nPersonalized roadmap\nEmail notifications\nWeekly progress\nAdaptive learning", barColor: "DC2626" },
];

steps.forEach((s, i) => {
  const x = 0.5 + i * 2.55;
  // Card
  slide6.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.9, w: 2.35, h: 4.3,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  // Colored header
  slide6.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.9, w: 2.35, h: 0.5,
    fill: { color: s.barColor },
    rectRadius: 0.06,
  });
  // Fix bottom corners of header
  slide6.addShape(pres.ShapeType.rect, {
    x: x, y: 2.2, w: 2.35, h: 0.2,
    fill: { color: s.barColor },
  });
  slide6.addText(s.step, {
    x: x, y: 1.9, w: 2.35, h: 0.5,
    fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
  // Number circle
  slide6.addShape(pres.ShapeType.ellipse, {
    x: x + 0.8, y: 2.6, w: 0.7, h: 0.7,
    fill: { color: C.cream },
  });
  slide6.addText(s.num, {
    x: x + 0.8, y: 2.6, w: 0.7, h: 0.7,
    fontSize: 16, color: C.lightText, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
  // Title
  slide6.addText(s.title, {
    x: x + 0.15, y: 3.4, w: 2.05, h: 0.6,
    fontSize: 10, bold: true, color: C.dark, align: "center", fontFace: "Segoe UI",
  });
  // Items
  slide6.addText(s.items, {
    x: x + 0.15, y: 4.2, w: 2.05, h: 1.8,
    fontSize: 9, color: C.lightText, align: "center", fontFace: "Segoe UI", lineSpacingMultiple: 1.5,
  });
  // Arrow between cards
  if (i < 4) {
    slide6.addText("\u203A", {
      x: x + 2.25, y: 3.8, w: 0.4, h: 0.5,
      fontSize: 20, bold: true, color: C.orange, align: "center", valign: "middle",
    });
  }
});

// Bottom metrics bar (dark green)
slide6.addShape(pres.ShapeType.roundRect, {
  x: 0.5, y: 6.5, w: 12.3, h: 0.7,
  fill: { color: C.statBar }, rectRadius: 0.05,
});
const metrics6 = [
  { val: "Real-time", label: "AI Processing" },
  { val: "<2 sec", label: "Response time" },
  { val: "24/7", label: "Availability" },
  { val: "Cloud + Edge", label: "Hybrid deployment" },
];
metrics6.forEach((m, i) => {
  const x = 0.8 + i * 3.1;
  slide6.addText(m.val, {
    x: x, y: 6.5, w: 2.5, h: 0.35,
    fontSize: 12, bold: true, color: C.orangeLight, fontFace: "Segoe UI",
  });
  slide6.addText(m.label, {
    x: x, y: 6.85, w: 2.5, h: 0.3,
    fontSize: 8.5, color: "CCCCCC", fontFace: "Segoe UI",
  });
});

addFooter(slide6, 6, TOTAL);

// ============================================================
// SLIDE 7: AI ARCHITECTURE
// ============================================================
const slide7 = pres.addSlide();
addSlideBase(slide7);
addSectionHeader(slide7, "AI ARCHITECTURE", "Multi-Model Intelligence \u2014 Powering Every Feature");

slide7.addText("SmartHire AI employs specialized AI models optimized for each placement preparation task, working together to deliver comprehensive career intelligence.", {
  x: 0.7, y: 1.8, w: 12, h: 0.4,
  fontSize: 10.5, color: C.lightText, fontFace: "Segoe UI",
});

// Top row - 3 main models
const models = [
  { title: "Mock Interview Engine", items: "\u2022 Gemini Pro for question generation\n\u2022 NLP answer evaluation\n\u2022 Adaptive difficulty (ML)\n\u2022 STAR method coaching", badge: "92% relevance", barColor: C.orange },
  { title: "Resume Scoring Model", items: "\u2022 spaCy entity extraction\n\u2022 TF-IDF keyword matching\n\u2022 Section structure analysis\n\u2022 Grammar & tone scoring", badge: "95% ATS accuracy", barColor: C.blue },
  { title: "Career Recommendation", items: "\u2022 Collaborative filtering\n\u2022 Skill-gap analysis ML\n\u2022 Job matching algorithm\n\u2022 Progress prediction", badge: "88% match rate", barColor: "DC2626" },
];

models.forEach((m, i) => {
  const x = 0.7 + i * 4.15;
  slide7.addShape(pres.ShapeType.roundRect, {
    x: x, y: 2.4, w: 3.95, h: 2.7,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  slide7.addShape(pres.ShapeType.rect, {
    x: x, y: 2.4, w: 3.95, h: 0.06,
    fill: { color: m.barColor },
  });
  slide7.addText(m.title, {
    x: x + 0.25, y: 2.6, w: 3.5, h: 0.4,
    fontSize: 12, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  slide7.addText(m.items, {
    x: x + 0.25, y: 3.1, w: 3.5, h: 1.3,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.5,
  });
  // Badge
  slide7.addShape(pres.ShapeType.roundRect, {
    x: x + 0.25, y: 4.5, w: 1.8, h: 0.4,
    fill: { color: "E8F5E9" }, rectRadius: 0.2,
  });
  slide7.addText(m.badge, {
    x: x + 0.25, y: 4.5, w: 1.8, h: 0.4,
    fontSize: 9, bold: true, color: C.green, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
});

// Bottom row - 3 supporting systems
const support = [
  { title: "Voice Processing Engine", desc: "Web Speech API + Whisper for voice-based interview mode with pronunciation & confidence analysis", barColor: C.orange },
  { title: "Personalization AI", desc: "Learning path optimization using reinforcement learning \u2014 adapts difficulty, focus areas & pacing per student", barColor: C.teal },
  { title: "Analytics & Insights", desc: "Time-series progress tracking, predictive success scoring, weakness detection & peer benchmarking", barColor: C.purple },
];

support.forEach((s, i) => {
  const x = 0.7 + i * 4.15;
  slide7.addShape(pres.ShapeType.roundRect, {
    x: x, y: 5.3, w: 3.95, h: 1.4,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  slide7.addShape(pres.ShapeType.rect, {
    x: x, y: 5.3, w: 3.95, h: 0.06,
    fill: { color: s.barColor },
  });
  slide7.addText(s.title, {
    x: x + 0.25, y: 5.45, w: 3.5, h: 0.35,
    fontSize: 11, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  slide7.addText(s.desc, {
    x: x + 0.25, y: 5.85, w: 3.5, h: 0.7,
    fontSize: 9, color: C.lightText, fontFace: "Segoe UI", lineSpacingMultiple: 1.3,
  });
});

addFooter(slide7, 7, TOTAL);

// ============================================================
// SLIDE 8: TECHNOLOGY STACK
// ============================================================
const slide8 = pres.addSlide();
addSlideBase(slide8);
addSectionHeader(slide8, "TECHNOLOGY STACK", "Enterprise-Grade, Modern & Scalable Infrastructure");

// 5 tech columns with colored headers (like reference)
const techCols = [
  { title: "FRONTEND", items: "\u2022 React 18 + Vite\n\u2022 Tailwind CSS\n\u2022 Shadcn/UI\n\u2022 Redux Toolkit\n\u2022 Chart.js / Recharts", color: C.green },
  { title: "BACKEND", items: "\u2022 Node.js 20 LTS\n\u2022 Express.js\n\u2022 Socket.io\n\u2022 JWT + OAuth 2.0\n\u2022 REST APIs", color: C.teal },
  { title: "AI / ML", items: "\u2022 Google Gemini Pro\n\u2022 spaCy (NLP)\n\u2022 TensorFlow.js\n\u2022 Web Speech API\n\u2022 LangChain.js", color: C.orange },
  { title: "DATABASE", items: "\u2022 MongoDB Atlas\n\u2022 Redis (Caching)\n\u2022 AWS S3 (Storage)\n\u2022 Cloudinary\n\u2022 Pinecone (Vector)", color: C.blue },
  { title: "DEVOPS", items: "\u2022 Docker + K8s\n\u2022 GitHub Actions\n\u2022 Vercel + Render\n\u2022 Jest + Cypress\n\u2022 SonarQube", color: C.purple },
];

techCols.forEach((t, i) => {
  const x = 0.5 + i * 2.55;
  // Card
  slide8.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.9, w: 2.35, h: 3.8,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  // Colored header
  slide8.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.9, w: 2.35, h: 0.55,
    fill: { color: t.color },
    rectRadius: 0.06,
  });
  slide8.addShape(pres.ShapeType.rect, {
    x: x, y: 2.25, w: 2.35, h: 0.2,
    fill: { color: t.color },
  });
  slide8.addText(t.title, {
    x: x, y: 1.9, w: 2.35, h: 0.55,
    fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
  // Items
  slide8.addText(t.items, {
    x: x + 0.15, y: 2.7, w: 2.1, h: 2.8,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.6,
  });
});

// Bottom metrics (dark green)
slide8.addShape(pres.ShapeType.roundRect, {
  x: 0.5, y: 6.1, w: 12.3, h: 0.8,
  fill: { color: C.statBar }, rectRadius: 0.05,
});
const techMetrics = [
  { val: "99.9%", label: "Platform uptime" },
  { val: "<200ms", label: "API response" },
  { val: "100K+", label: "Concurrent users" },
  { val: "Auto-scale", label: "Cloud infrastructure" },
];
techMetrics.forEach((m, i) => {
  const x = 0.8 + i * 3.1;
  slide8.addText(m.val, {
    x: x, y: 6.15, w: 2.5, h: 0.35,
    fontSize: 13, bold: true, color: C.orangeLight, fontFace: "Segoe UI",
  });
  slide8.addText(m.label, {
    x: x, y: 6.55, w: 2.5, h: 0.3,
    fontSize: 8.5, color: "CCCCCC", fontFace: "Segoe UI",
  });
});

addFooter(slide8, 8, TOTAL);

// ============================================================
// SLIDE 9: NEXT-GENERATION FEATURES
// ============================================================
const slide9 = pres.addSlide();
addSlideBase(slide9);
addSectionHeader(slide9, "NEXT-GENERATION FEATURES", "AI Innovations That Set SmartHire Apart");

// 2 rows x 5 columns of feature cards (like reference page 8)
const nextGenFeatures = [
  { title: "AI Interview Copilot", desc: "Real-time hints & coaching during live mock sessions" },
  { title: "Company-Specific Prep", desc: "Curated question banks for TCS, Infosys, Google, Amazon" },
  { title: "Peer Benchmarking", desc: "Compare progress with anonymous cohort performance data" },
  { title: "Smart Notifications", desc: "AI-prioritized alerts for deadlines, new openings & follow-ups" },
  { title: "LinkedIn Integration", desc: "Auto-optimize LinkedIn profile based on resume analysis" },
  { title: "Video Interview Mode", desc: "Camera-based practice with body language & eye contact scoring" },
  { title: "Skill Gap Roadmap", desc: "Personalized learning path with resource recommendations" },
  { title: "Group Mock Sessions", desc: "Collaborative interview practice with peer feedback loops" },
  { title: "Portfolio Generator", desc: "Auto-generate project portfolio website from resume data" },
  { title: "Placement Analytics", desc: "College-level dashboards for TPOs with cohort insights" },
];

nextGenFeatures.forEach((f, i) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  const x = 0.5 + col * 2.55;
  const y = 1.9 + row * 2.6;

  slide9.addShape(pres.ShapeType.roundRect, {
    x: x, y: y, w: 2.35, h: 2.3,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  slide9.addText(f.title, {
    x: x + 0.2, y: y + 0.3, w: 2.0, h: 0.5,
    fontSize: 10.5, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  slide9.addText(f.desc, {
    x: x + 0.2, y: y + 1.0, w: 2.0, h: 1.1,
    fontSize: 9, color: C.lightText, fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
  });
});

addFooter(slide9, 9, TOTAL);

// ============================================================
// SLIDE 10: COMPETITIVE ADVANTAGE
// ============================================================
const slide10 = pres.addSlide();
addSlideBase(slide10);
addSectionHeader(slide10, "COMPETITIVE ADVANTAGE", "Why SmartHire AI Wins \u2014 Full-Stack Integration");

slide10.addText("Others solve one piece of the puzzle. SmartHire AI is the only platform that fuses mock interviews, resume intelligence, and job tracking into a single, student-friendly AI experience.", {
  x: 0.7, y: 1.8, w: 12, h: 0.4,
  fontSize: 10.5, color: C.lightText, fontFace: "Segoe UI",
});

// Comparison table
const tableRows = [
  [
    { text: "Feature", options: { bold: true, color: "FFFFFF", fill: { color: C.green } } },
    { text: "Generic\nPlatforms", options: { bold: true, color: "FFFFFF", fill: { color: C.green } } },
    { text: "Interview\nApps", options: { bold: true, color: "FFFFFF", fill: { color: C.green } } },
    { text: "Resume\nTools", options: { bold: true, color: "FFFFFF", fill: { color: C.green } } },
    { text: "SmartHire\nAI", options: { bold: true, color: "FFFFFF", fill: { color: C.green } } },
  ],
  [{ text: "AI Mock Interviews" }, { text: "\u274C" }, { text: "\u26A0\uFE0F" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "ATS Resume Scoring" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u26A0\uFE0F" }, { text: "\u2705" }],
  [{ text: "Job Application Tracker" }, { text: "\u26A0\uFE0F" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Adaptive AI Difficulty" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Voice Interview Mode" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Cross-Feature Intelligence" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u274C" }, { text: "\u2705" }],
  [{ text: "Free for Students" }, { text: "\u274C" }, { text: "\u26A0\uFE0F" }, { text: "\u274C" }, { text: "\u2705" }],
];

slide10.addTable(tableRows, {
  x: 0.7, y: 2.4, w: 12, h: 4.0,
  fontSize: 10, fontFace: "Segoe UI",
  border: { type: "solid", pt: 0.5, color: C.cardBorder },
  colW: [3.2, 2.2, 2.2, 2.2, 2.2],
  rowH: [0.5, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44],
  align: "center", valign: "middle",
});

// Our moat
slide10.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 6.6, w: 12, h: 0.6,
  fill: { color: "FFF8E1" },
  line: { color: C.orangeLight, width: 1 },
  rectRadius: 0.04,
});
slide10.addText("Our Moat: Unified AI ecosystem where interview performance informs resume improvements, and job tracking drives preparation priorities \u2014 creating a continuous feedback loop.", {
  x: 1.0, y: 6.6, w: 11.5, h: 0.6,
  fontSize: 9.5, italic: true, color: C.text, valign: "middle", fontFace: "Segoe UI",
});

addFooter(slide10, 10, TOTAL);

// ============================================================
// SLIDE 11: BUSINESS MODEL
// ============================================================
const slide11 = pres.addSlide();
addSlideBase(slide11);
addSectionHeader(slide11, "BUSINESS MODEL", "Multiple Revenue Streams, Sustainable Growth");

// 4 revenue stream cards
const revenueStreams = [
  { num: "1", title: "Student\nFreemium", desc: "Free basic tier; Pro plan at \u20B9199/month for unlimited AI interviews, advanced resume scoring & priority support.", color: C.green },
  { num: "2", title: "College\nLicense", desc: "Institutional bulk licensing for placement cells. \u20B950K-2L/year per college with admin analytics dashboard.", color: C.teal },
  { num: "3", title: "B2B API\nServices", desc: "Resume scoring & interview intelligence API for HR tech platforms, job portals & recruitment agencies.", color: C.orange },
  { num: "4", title: "Sponsored\nPrep Tracks", desc: "Company-sponsored preparation tracks with direct hiring pipeline. Premium placement for job listings.", color: C.orangeLight },
];

revenueStreams.forEach((r, i) => {
  const x = 0.7 + i * 3.15;
  slide11.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.9, w: 2.95, h: 2.6,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  // Number circle
  slide11.addShape(pres.ShapeType.ellipse, {
    x: x + 0.2, y: 2.1, w: 0.5, h: 0.5,
    fill: { color: r.color },
  });
  slide11.addText(r.num, {
    x: x + 0.2, y: 2.1, w: 0.5, h: 0.5,
    fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
  slide11.addText(r.title, {
    x: x + 0.85, y: 2.1, w: 1.9, h: 0.55,
    fontSize: 11, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  slide11.addText(r.desc, {
    x: x + 0.2, y: 2.85, w: 2.6, h: 1.5,
    fontSize: 9, color: C.lightText, fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
  });
});

// 3-YEAR REVENUE PROJECTION
slide11.addText("3-YEAR REVENUE PROJECTION", {
  x: 0.7, y: 4.8, w: 5, h: 0.35,
  fontSize: 11, bold: true, color: C.orange, fontFace: "Segoe UI",
});

// Revenue cards
slide11.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 5.2, w: 6.0, h: 2.0,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
const revYears = [
  { year: "Year 1", bar: 1.5, val: "\u20B95 Lakhs", desc: "MVP: 5 colleges, 2K students" },
  { year: "Year 2", bar: 3.0, val: "\u20B930 Lakhs", desc: "Scale: 25 colleges, B2B launch" },
  { year: "Year 3", bar: 5.0, val: "\u20B92+ Crores", desc: "National: Partnerships, API revenue" },
];
revYears.forEach((r, i) => {
  slide11.addText(r.year, {
    x: 0.9, y: 5.35 + i * 0.58, w: 1.0, h: 0.4,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", valign: "middle",
  });
  slide11.addShape(pres.ShapeType.roundRect, {
    x: 2.0, y: 5.4 + i * 0.58, w: r.bar, h: 0.3,
    fill: { color: C.green }, rectRadius: 0.15,
  });
  slide11.addText(r.val, {
    x: 2.1 + r.bar, y: 5.35 + i * 0.58, w: 1.5, h: 0.4,
    fontSize: 10, bold: true, color: C.green, fontFace: "Segoe UI", valign: "middle",
  });
  slide11.addText(r.desc, {
    x: 3.8 + r.bar, y: 5.35 + i * 0.58, w: 2.5, h: 0.4,
    fontSize: 8.5, color: C.mutedText, fontFace: "Segoe UI", valign: "middle",
  });
});

// Go-to-Market Strategy
slide11.addShape(pres.ShapeType.roundRect, {
  x: 7.0, y: 5.2, w: 5.7, h: 2.0,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide11.addText("Go-to-Market Strategy", {
  x: 7.2, y: 5.3, w: 5.3, h: 0.35,
  fontSize: 11, bold: true, color: C.dark, fontFace: "Segoe UI",
});
const gtm = [
  "1. Pilot with 5 college placement cells",
  "2. Prove placement uplift \u2192 word-of-mouth",
  "3. College partnerships at scale",
  "4. B2B API for HR tech platforms",
  "5. National platform + marketplace",
];
gtm.forEach((g, i) => {
  slide11.addText(g, {
    x: 7.3, y: 5.7 + i * 0.28, w: 5.2, h: 0.28,
    fontSize: 9, color: C.text, fontFace: "Segoe UI",
  });
});

addFooter(slide11, 11, TOTAL);

// ============================================================
// SLIDE 12: EXPECTED IMPACT
// ============================================================
const slide12 = pres.addSlide();
addSlideBase(slide12);
addSectionHeader(slide12, "SOCIAL & ECONOMIC IMPACT", "Empowering Students, Strengthening Institutions");

// 3 Impact cards with colored top bars
const impactCats = [
  {
    title: "Student Impact",
    barColor: C.orange,
    items: [
      { val: "60%", desc: "Reduction in preparation time" },
      { val: "3x", desc: "Higher interview confidence" },
      { val: "85%+", desc: "ATS-compatible resumes created" },
    ],
  },
  {
    title: "Institutional Impact",
    barColor: C.blue,
    items: [
      { val: "40%", desc: "Higher placement success rate" },
      { val: "Digital", desc: "Data-driven placement analytics" },
      { val: "Better", desc: "Institutional reputation & ranking" },
    ],
  },
  {
    title: "Industry Impact",
    barColor: C.teal,
    items: [
      { val: "50%", desc: "Reduced recruiter screening time" },
      { val: "Higher", desc: "Quality of incoming candidates" },
      { val: "Access", desc: "Tier 2-3 college talent pipeline" },
    ],
  },
];

impactCats.forEach((cat, i) => {
  const x = 0.7 + i * 4.15;
  slide12.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.9, w: 3.95, h: 3.2,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  slide12.addShape(pres.ShapeType.rect, {
    x: x, y: 1.9, w: 3.95, h: 0.06,
    fill: { color: cat.barColor },
  });
  slide12.addText(cat.title, {
    x: x + 0.25, y: 2.1, w: 3.5, h: 0.4,
    fontSize: 12, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  cat.items.forEach((item, j) => {
    slide12.addText(item.val, {
      x: x + 0.25, y: 2.65 + j * 0.75, w: 1.2, h: 0.4,
      fontSize: 14, bold: true, color: C.green, fontFace: "Segoe UI",
    });
    slide12.addText(item.desc, {
      x: x + 1.5, y: 2.65 + j * 0.75, w: 2.2, h: 0.4,
      fontSize: 9.5, color: C.text, fontFace: "Segoe UI", valign: "middle",
    });
  });
});

// SDG alignment
slide12.addText("ALIGNED WITH UN SUSTAINABLE DEVELOPMENT GOALS", {
  x: 0.7, y: 5.4, w: 10, h: 0.35,
  fontSize: 10, bold: true, color: C.orange, fontFace: "Segoe UI",
});
const sdgs = [
  { num: "SDG 4", label: "Quality Education" },
  { num: "SDG 8", label: "Decent Work" },
  { num: "SDG 9", label: "Innovation" },
  { num: "SDG 10", label: "Reduced Inequality" },
];
sdgs.forEach((s, i) => {
  const x = 0.7 + i * 3.15;
  slide12.addShape(pres.ShapeType.roundRect, {
    x: x, y: 5.85, w: 2.95, h: 0.8,
    fill: { color: C.statBar }, rectRadius: 0.06,
  });
  slide12.addText(s.num, {
    x: x, y: 5.88, w: 2.95, h: 0.4,
    fontSize: 11, bold: true, color: C.orangeLight, align: "center", fontFace: "Segoe UI",
  });
  slide12.addText(s.label, {
    x: x, y: 6.28, w: 2.95, h: 0.3,
    fontSize: 9, color: "CCCCCC", align: "center", fontFace: "Segoe UI",
  });
});

addFooter(slide12, 12, TOTAL);

// ============================================================
// SLIDE 13: BEFORE vs AFTER
// ============================================================
const slide13 = pres.addSlide();
addSlideBase(slide13);
addSectionHeader(slide13, "TIME & EFFORT SAVINGS", "How SmartHire AI Transforms the Student Experience");

slide13.addText("Traditional placement preparation wastes hours on scattered tools. SmartHire AI automates the intelligence layer \u2014 students focus on learning, not logistics.", {
  x: 0.7, y: 1.8, w: 12, h: 0.4,
  fontSize: 10.5, color: C.lightText, fontFace: "Segoe UI",
});

// Before card (left)
slide13.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 2.4, w: 6.0, h: 3.8,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide13.addShape(pres.ShapeType.rect, {
  x: 0.7, y: 2.4, w: 6.0, h: 0.06,
  fill: { color: "DC2626" },
});
slide13.addText("\u274C  BEFORE (Without SmartHire AI)", {
  x: 0.9, y: 2.55, w: 5.6, h: 0.4,
  fontSize: 11, bold: true, color: "DC2626", fontFace: "Segoe UI",
});

const befores = [
  { time: "2-3 hrs", desc: "Searching for practice questions online" },
  { time: "1-2 hrs", desc: "Formatting resume (still gets rejected)" },
  { time: "1 hr", desc: "Tracking applications in spreadsheets" },
  { time: "1 hr", desc: "Finding mock interview partners" },
  { time: "1 hr", desc: "Researching company-specific questions" },
  { time: "1 hr", desc: "Worrying about what to improve next" },
];
befores.forEach((b, i) => {
  slide13.addText(b.time, {
    x: 0.9, y: 3.1 + i * 0.5, w: 1.2, h: 0.4,
    fontSize: 10, bold: true, color: "DC2626", fontFace: "Segoe UI", valign: "middle",
  });
  slide13.addText(b.desc, {
    x: 2.2, y: 3.1 + i * 0.5, w: 4.3, h: 0.4,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", valign: "middle",
  });
});
slide13.addText("= 7-10 hours/day wasted on logistics, not learning", {
  x: 0.9, y: 6.0, w: 5.6, h: 0.3,
  fontSize: 9, bold: true, italic: true, color: "DC2626", fontFace: "Segoe UI",
});

// After card (right)
slide13.addShape(pres.ShapeType.roundRect, {
  x: 6.9, y: 2.4, w: 5.9, h: 3.8,
  fill: { color: C.cardBg },
  line: { color: C.cardBorder, width: 1 },
  rectRadius: 0.06,
});
slide13.addShape(pres.ShapeType.rect, {
  x: 6.9, y: 2.4, w: 5.9, h: 0.06,
  fill: { color: C.green },
});
slide13.addText("\u2705  AFTER (With SmartHire AI)", {
  x: 7.1, y: 2.55, w: 5.5, h: 0.4,
  fontSize: 11, bold: true, color: C.green, fontFace: "Segoe UI",
});

const afters = [
  { time: "2 min", desc: "AI generates domain-specific questions" },
  { time: "1 min", desc: "Upload resume \u2192 instant ATS score" },
  { time: "Auto", desc: "Dashboard tracks all applications" },
  { time: "1 min", desc: "Start AI mock interview anytime" },
  { time: "Auto", desc: "Company-specific prep auto-curated" },
  { time: "Auto", desc: "AI identifies weaknesses & priorities" },
];
afters.forEach((a, i) => {
  slide13.addText(a.time, {
    x: 7.1, y: 3.1 + i * 0.5, w: 1.0, h: 0.4,
    fontSize: 10, bold: true, color: C.green, fontFace: "Segoe UI", valign: "middle",
  });
  slide13.addText(a.desc, {
    x: 8.2, y: 3.1 + i * 0.5, w: 4.4, h: 0.4,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", valign: "middle",
  });
});
slide13.addText("= 5 minutes/day \u2014 rest is focused preparation", {
  x: 7.1, y: 6.0, w: 5.5, h: 0.3,
  fontSize: 9, bold: true, italic: true, color: C.green, fontFace: "Segoe UI",
});

// Bottom quote
slide13.addShape(pres.ShapeType.roundRect, {
  x: 0.7, y: 6.5, w: 12, h: 0.6,
  fill: { color: "FFF8E1" },
  line: { color: C.orangeLight, width: 1 },
  rectRadius: 0.04,
});
slide13.addText("\"SmartHire AI gives students 10+ hours back every week \u2014 time for actual skill-building, projects, and personal growth.\"", {
  x: 1.0, y: 6.5, w: 11.5, h: 0.6,
  fontSize: 9.5, italic: true, color: C.text, valign: "middle", fontFace: "Segoe UI",
});

addFooter(slide13, 13, TOTAL);

// ============================================================
// SLIDE 14: ROADMAP & VISION
// ============================================================
const slide14 = pres.addSlide();
addSlideBase(slide14);
addSectionHeader(slide14, "ROADMAP & VISION", "From Prototype to National Scale \u2014 Our Path Forward");

// Timeline dots & line
slide14.addShape(pres.ShapeType.rect, {
  x: 1.5, y: 2.15, w: 10.5, h: 0.04,
  fill: { color: C.cardBorder },
});
const phaseColors = [C.green, C.teal, C.orange, C.orangeLight];
phaseColors.forEach((clr, i) => {
  slide14.addShape(pres.ShapeType.ellipse, {
    x: 1.5 + i * 3.5, y: 2.0, w: 0.35, h: 0.35,
    fill: { color: clr },
  });
});

// Phase cards
const roadmap = [
  { phase: "PHASE 1  0-3 Months", title: "Prototype", items: "\u2022 Requirements & system design\n\u2022 Core API development\n\u2022 Mock interview MVP\n\u2022 Resume parser v1", color: C.green },
  { phase: "PHASE 2  3-6 Months", title: "Beta Launch", items: "\u2022 Full feature development\n\u2022 AI model fine-tuning\n\u2022 5 college pilot testing\n\u2022 User feedback iteration", color: C.teal },
  { phase: "PHASE 3  6-12 Months", title: "Scale", items: "\u2022 25+ college deployment\n\u2022 Voice + vernacular support\n\u2022 Mobile app (React Native)\n\u2022 B2B API launch", color: C.orange },
  { phase: "PHASE 4  1-3 Years", title: "National", items: "\u2022 1L+ students served\n\u2022 Pan-India coverage\n\u2022 Full AI ecosystem\n\u2022 Marketplace & partnerships", color: C.orangeLight },
];

roadmap.forEach((r, i) => {
  const x = 0.5 + i * 3.2;
  // Card
  slide14.addShape(pres.ShapeType.roundRect, {
    x: x, y: 2.6, w: 3.0, h: 3.5,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06,
  });
  // Colored header
  slide14.addShape(pres.ShapeType.roundRect, {
    x: x, y: 2.6, w: 3.0, h: 0.55,
    fill: { color: r.color },
    rectRadius: 0.06,
  });
  slide14.addShape(pres.ShapeType.rect, {
    x: x, y: 2.95, w: 3.0, h: 0.2,
    fill: { color: r.color },
  });
  slide14.addText(r.phase, {
    x: x, y: 2.6, w: 3.0, h: 0.55,
    fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
  });
  // Title
  slide14.addText(r.title, {
    x: x + 0.2, y: 3.3, w: 2.6, h: 0.4,
    fontSize: 14, bold: true, color: C.dark, fontFace: "Segoe UI",
  });
  // Items
  slide14.addText(r.items, {
    x: x + 0.2, y: 3.8, w: 2.6, h: 2.0,
    fontSize: 9.5, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.6,
  });
});

// Vision bar
slide14.addShape(pres.ShapeType.roundRect, {
  x: 0.5, y: 6.4, w: 12.3, h: 0.8,
  fill: { color: C.statBar }, rectRadius: 0.05,
});
slide14.addText("VISION 2030", {
  x: 0.8, y: 6.43, w: 2, h: 0.35,
  fontSize: 11, bold: true, color: C.orangeLight, fontFace: "Segoe UI",
});
slide14.addText("SmartHire AI becomes India's most trusted AI-powered placement preparation platform \u2014 serving 1 Million+ students across 1000+ colleges, transforming campus hiring forever.", {
  x: 0.8, y: 6.78, w: 11.8, h: 0.35,
  fontSize: 9, color: "CCCCCC", fontFace: "Segoe UI",
});

addFooter(slide14, 14, TOTAL);

// ============================================================
// SLIDE 15: THANK YOU / CLOSING (Dark green hero)
// ============================================================
const slide15 = pres.addSlide();
// Light orange background
slide15.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 7.5,
  fill: { color: C.orangeDark },
});
slide15.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.07,
  fill: { color: C.orangeLight },
});
slide15.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: 0.08, h: 7.5,
  fill: { color: C.orangeLight },
});

// Logo
slide15.addShape(pres.ShapeType.roundRect, {
  x: 5.9, y: 0.6, w: 0.55, h: 0.55,
  fill: { color: C.orange }, rectRadius: 0.08,
});
slide15.addText("S", {
  x: 5.9, y: 0.6, w: 0.55, h: 0.55,
  fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Segoe UI",
});
slide15.addText("SmartHire AI", {
  x: 6.6, y: 0.62, w: 4, h: 0.5,
  fontSize: 14, color: C.dark, fontFace: "Segoe UI",
});

// Main thank you
slide15.addText("Thank You!", {
  x: 0, y: 1.5, w: 13.33, h: 1.0,
  fontSize: 44, bold: true, color: C.dark, align: "center", fontFace: "Segoe UI",
});
slide15.addText("\"Prepare. Perform. Get Placed.\"", {
  x: 0, y: 2.5, w: 13.33, h: 0.5,
  fontSize: 16, italic: true, color: C.orange, align: "center", fontFace: "Segoe UI",
});

// Summary box
slide15.addShape(pres.ShapeType.roundRect, {
  x: 2.5, y: 3.2, w: 8.3, h: 2.2,
  fill: { color: C.orange },
  rectRadius: 0.08,
});
const summaryLines = [
  "\uD83E\uDD16  AI Mock Interview \u2014 NLP + Voice + Adaptive Difficulty",
  "\uD83D\uDCDD  Resume Analyzer \u2014 ATS Scoring + ML Optimization",
  "\uD83D\uDCCB  Job Tracker \u2014 Kanban + Analytics + Calendar Sync",
  "\u2699\uFE0F  MERN Stack + Gemini AI + Microservices + DevOps",
  "\uD83C\uDF1F  Freemium Model  |  1L+ Users Target  |  College Partnerships",
];
summaryLines.forEach((s, i) => {
  slide15.addText(s, {
    x: 2.8, y: 3.35 + i * 0.38, w: 7.7, h: 0.36,
    fontSize: 10.5, color: C.white, fontFace: "Segoe UI",
  });
});

// Team card
slide15.addShape(pres.ShapeType.roundRect, {
  x: 3.5, y: 5.7, w: 6.3, h: 1.3,
  fill: { color: C.orangeDark },
  rectRadius: 0.08,
  line: { color: C.orangeLight, width: 1 },
});
slide15.addText("Team TwinTech", {
  x: 3.8, y: 5.8, w: 5.7, h: 0.45,
  fontSize: 15, bold: true, color: C.white, align: "center", fontFace: "Segoe UI",
});
slide15.addText("Yashvant  \u2022  Shivani", {
  x: 3.8, y: 6.2, w: 5.7, h: 0.35,
  fontSize: 12, color: "FFE0B2", align: "center", fontFace: "Segoe UI",
});
slide15.addText("Hackathon Round 1  |  June 2026", {
  x: 3.8, y: 6.55, w: 5.7, h: 0.3,
  fontSize: 9, color: "FFE0B2", align: "center", fontFace: "Segoe UI",
});

slide15.addText(`15 / ${TOTAL}`, {
  x: 11.5, y: 7.15, w: 1.5, h: 0.3,
  fontSize: 8, color: "777777", align: "right", fontFace: "Segoe UI",
});

// ============================================================
// SAVE PRESENTATION
// ============================================================
const outputPath = "./SmartHire_AI_Orange_Final.pptx";
pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log("");
    console.log("  ================================================");
    console.log("  |  SmartHire AI - AgroVision Style PPT          |");
    console.log("  |  Team: TwinTech (Yashvant & Shivani)         |");
    console.log("  ================================================");
    console.log(`  File: ${outputPath}`);
    console.log("  Slides: 15");
    console.log("  Theme: Orange + Cream Light (AgroVision format)");
    console.log("  ================================================");
    console.log("");
  })
  .catch((err) => {
    console.error("Error generating presentation:", err);
  });
