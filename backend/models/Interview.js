const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // FR-2.1 Interview Setup
  domain: { type: String, required: true, enum: ['dsa', 'dbms', 'os', 'webdev', 'ml', 'systemdesign', 'hr', 'aptitude', 'behavioral'] },
  company: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  interviewType: { type: String, enum: ['technical', 'hr', 'managerial', 'aptitude', 'systemdesign', 'behavioral'], default: 'technical' },
  mode: { type: String, enum: ['text', 'voice'], default: 'text' },
  round: { type: String },

  // FR-2.2 Questions & Responses
  questions: [{
    question: String,
    expectedAnswer: String,
    userAnswer: String,
    score: { type: Number, min: 0, max: 10 },
    feedback: String,
    difficulty: String,
    topic: String,
    timestamp: { type: Date, default: Date.now },
    evaluationMetrics: {
      relevance: Number,
      correctness: Number,
      clarity: Number,
      completeness: Number,
    },
  }],

  // FR-2.3 Adaptive difficulty state
  adaptiveState: {
    currentDifficulty: { type: Number, default: 5 }, // 1-10
    consecutiveCorrect: { type: Number, default: 0 },
    consecutiveWrong: { type: Number, default: 0 },
  },

  // FR-2.7 Performance Scoring
  scores: {
    overall: { type: Number, default: 0 },
    technical: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    problemSolving: { type: Number, default: 0 },
    sectionWise: { type: Map, of: Number },
  },

  // FR-2.8 AI Feedback
  feedback: {
    strengths: [String],
    weaknesses: [String],
    improvements: [String],
    overallRemarks: String,
    starMethodScore: Number,
  },

  // FR-2.5 Voice data
  voiceMetrics: {
    speakingPace: Number,
    fillerWords: Number,
    clarity: Number,
    fluency: Number,
    pronunciation: Number,
    confidence: Number,
  },

  // Metadata
  status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' },
  duration: { type: Number }, // in seconds
  totalQuestions: { type: Number },
  questionsAnswered: { type: Number, default: 0 },
  resumeUsed: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  reportGenerated: { type: Boolean, default: false },
  reportUrl: String,
}, { timestamps: true });

// Index for performance (NFR-13.1.5)
InterviewSchema.index({ user: 1, createdAt: -1 });
InterviewSchema.index({ user: 1, domain: 1 });
InterviewSchema.index({ status: 1 });

module.exports = mongoose.model('Interview', InterviewSchema);
