const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // FR-3.1 Resume Upload
  title: { type: String, default: 'My Resume' },
  fileUrl: { type: String, required: true },
  fileName: { type: String },
  fileType: { type: String, enum: ['pdf', 'docx'] },
  version: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },

  // FR-3.2 Parsed Data
  parsedData: {
    name: String,
    email: String,
    phone: String,
    summary: String,
    education: [{ institution: String, degree: String, field: String, year: String, cgpa: String }],
    experience: [{ company: String, role: String, duration: String, description: String }],
    skills: { technical: [String], soft: [String], tools: [String] },
    projects: [{ title: String, description: String, technologies: [String] }],
    certifications: [{ title: String, issuer: String, year: String }],
    achievements: [String],
    languages: [String],
  },

  // FR-3.3 ATS Score
  atsScore: {
    overall: { type: Number, default: 0 },
    keywords: { type: Number, default: 0 },
    formatting: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    skills: { type: Number, default: 0 },
    sections: { type: Number, default: 0 },
  },

  // FR-3.4 Keyword Analysis
  keywordAnalysis: {
    matched: [String],
    missing: [String],
    recommended: [String],
    density: { type: Map, of: Number },
  },

  // FR-3.5 Formatting Analysis
  formattingAnalysis: {
    score: Number,
    issues: [{ type: String, severity: String, description: String }],
    suggestions: [String],
  },

  // FR-3.6 Grammar Analysis
  grammarAnalysis: {
    score: Number,
    errors: [{ text: String, suggestion: String, type: String }],
    toneScore: Number,
  },

  // FR-3.7 Improvement Suggestions
  suggestions: [{
    section: String,
    priority: { type: String, enum: ['high', 'medium', 'low'] },
    suggestion: String,
    example: String,
  }],

  // FR-3.11 Company-specific analysis
  companyAnalysis: [{
    company: String,
    matchScore: Number,
    missingKeywords: [String],
    recommendations: [String],
  }],

  // FR-3.12 Job Description Matching
  jdMatches: [{
    jobTitle: String,
    jobDescription: String,
    matchScore: Number,
    matchedSkills: [String],
    missingSkills: [String],
    recommendations: [String],
  }],

  // FR-3.15 Skill Gap
  skillGap: {
    missingTechnical: [String],
    missingSoft: [String],
    recommendedCourses: [{ title: String, platform: String, url: String }],
    recommendedCertifications: [String],
  },

  // FR-3.16 Success Prediction
  successPrediction: {
    shortlistProbability: Number,
    factors: { type: Map, of: Number },
    recommendations: [String],
  },

  // History tracking (FR-3.9)
  changeHistory: [{
    date: { type: Date, default: Date.now },
    changes: String,
    previousScore: Number,
    newScore: Number,
  }],

  analysisStatus: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  lastAnalyzedAt: Date,
}, { timestamps: true });

ResumeSchema.index({ user: 1, isActive: 1 });
ResumeSchema.index({ user: 1, version: -1 });

module.exports = mongoose.model('Resume', ResumeSchema);
