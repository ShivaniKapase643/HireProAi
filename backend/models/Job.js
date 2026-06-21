/**
 * Job Model
 * 
 * Schema for job postings, including detailed requirements,
 * company info, application tracking, and AI-powered matching.
 */

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  // Basic Job Information
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: 200,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    minlength: 100,
    maxlength: 10000
  },
  shortDescription: {
    type: String,
    maxlength: 500
  },

  // Company Information
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  companyName: {
    type: String,
    required: true,
    index: true
  },
  companyLogo: String,

  // Posted By
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Job Details
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote', 'hybrid', 'freelance']
  },
  category: {
    type: String,
    enum: ['engineering', 'design', 'product', 'marketing', 'sales', 'hr', 'finance', 'operations', 'data', 'other']
  },
  level: {
    type: String,
    enum: ['entry', 'junior', 'mid', 'senior', 'lead', 'principal', 'director', 'vp', 'c-level']
  },
  department: String,

  // Location
  location: {
    type: { type: String, enum: ['onsite', 'remote', 'hybrid'], default: 'onsite' },
    city: String,
    state: String,
    country: { type: String, default: 'India' },
    remote: { type: Boolean, default: false }
  },

  // Compensation
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'INR' },
    period: { type: String, enum: ['annual', 'monthly', 'hourly'], default: 'annual' },
    isNegotiable: { type: Boolean, default: false },
    showOnListing: { type: Boolean, default: true }
  },
  benefits: [String],
  perks: [String],

  // Requirements
  requirements: {
    experience: {
      min: { type: Number, default: 0 },
      max: Number,
      preferred: String
    },
    education: {
      minimum: { type: String, enum: ['high_school', 'bachelors', 'masters', 'phd', 'any'] },
      preferred: [String],
      fields: [String]
    },
    skills: {
      required: [{
        name: String,
        level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] }
      }],
      preferred: [{
        name: String,
        level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] }
      }]
    },
    certifications: [String],
    languages: [{
      language: String,
      proficiency: { type: String, enum: ['basic', 'conversational', 'fluent', 'native'] }
    }]
  },

  // Responsibilities
  responsibilities: [String],

  // Application Settings
  applicationSettings: {
    deadline: Date,
    maxApplications: Number,
    requireResume: { type: Boolean, default: true },
    requireCoverLetter: { type: Boolean, default: false },
    customQuestions: [{
      question: String,
      type: { type: String, enum: ['text', 'multiple_choice', 'yes_no'] },
      required: Boolean,
      options: [String]
    }],
    autoScreening: { type: Boolean, default: false },
    screeningCriteria: {
      minExperience: Number,
      requiredSkills: [String],
      minEducation: String,
      minAtsScore: Number
    }
  },

  // Interview Process
  interviewProcess: [{
    round: Number,
    type: { type: String, enum: ['phone_screen', 'technical', 'coding', 'system_design', 'behavioral', 'hr', 'panel', 'case_study'] },
    description: String,
    duration: Number, // minutes
    interviewers: Number
  }],

  // Statistics
  stats: {
    views: { type: Number, default: 0 },
    applications: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    interviewed: { type: Number, default: 0 },
    offered: { type: Number, default: 0 },
    hired: { type: Number, default: 0 },
    averageAtsScore: Number
  },

  // AI-Generated Insights
  aiInsights: {
    marketDemand: { type: String, enum: ['high', 'medium', 'low'] },
    competitionLevel: { type: String, enum: ['high', 'medium', 'low'] },
    salaryBenchmark: {
      percentile25: Number,
      median: Number,
      percentile75: Number
    },
    skillTrends: [{
      skill: String,
      trend: { type: String, enum: ['rising', 'stable', 'declining'] }
    }],
    matchingCandidates: Number,
    estimatedTimeToFill: Number // days
  },

  // Status & Visibility
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'closed', 'filled', 'expired'],
    default: 'draft',
    index: true
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'institution_only'],
    default: 'public'
  },
  featured: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false },

  // Tags & Search
  tags: [String],
  searchKeywords: [String],

  // Placement Drive (for TPO)
  placementDrive: {
    isDrive: { type: Boolean, default: false },
    driveDate: Date,
    eligibilityCriteria: {
      minCGPA: Number,
      branches: [String],
      maxBacklogs: Number,
      batch: [String]
    },
    registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }

}, {
  timestamps: true
});

// Indexes for search and filtering
jobSchema.index({ title: 'text', description: 'text', tags: 'text' });
jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ companyName: 1, status: 1 });
jobSchema.index({ 'location.city': 1, type: 1 });
jobSchema.index({ 'requirements.skills.required.name': 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });
jobSchema.index({ 'applicationSettings.deadline': 1 });

module.exports = mongoose.model('Job', jobSchema);
