const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // FR-4.1 Job Application Management
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  salary: { min: Number, max: Number, currency: { type: String, default: 'INR' } },
  jobDescription: String,
  jobUrl: String,
  jobType: { type: String, enum: ['fulltime', 'parttime', 'internship', 'contract'] },
  workMode: { type: String, enum: ['remote', 'hybrid', 'onsite'] },
  applicationDate: { type: Date, default: Date.now },

  // FR-4.2 Kanban stages
  stage: {
    type: String,
    enum: ['applied', 'under_review', 'shortlisted', 'assessment', 'interview_scheduled', 'hr_round', 'selected', 'offer_received', 'rejected', 'withdrawn'],
    default: 'applied',
  },
  stageHistory: [{
    stage: String,
    date: { type: Date, default: Date.now },
    notes: String,
  }],

  // FR-4.3 Deadlines
  deadlines: [{
    title: String,
    date: Date,
    type: { type: String, enum: ['application', 'assessment', 'interview', 'document', 'other'] },
    completed: { type: Boolean, default: false },
    reminded: { type: Boolean, default: false },
  }],

  // FR-4.4 Interview Schedules
  interviews: [{
    round: Number,
    type: { type: String, enum: ['technical', 'hr', 'managerial', 'coding', 'system_design'] },
    date: Date,
    time: String,
    mode: { type: String, enum: ['online', 'offline', 'phone'] },
    interviewer: String,
    platform: String,
    link: String,
    notes: String,
    feedback: String,
    result: { type: String, enum: ['passed', 'failed', 'pending'] },
  }],

  // FR-4.5 Follow-ups
  followUps: [{
    date: Date,
    type: { type: String, enum: ['email', 'call', 'message'] },
    notes: String,
    completed: { type: Boolean, default: false },
  }],

  // Documents
  documents: [{
    title: String,
    type: { type: String, enum: ['resume', 'cover_letter', 'certificate', 'other'] },
    url: String,
  }],

  // FR-4.6 Calendar sync
  calendarEventId: String,
  calendarSynced: { type: Boolean, default: false },

  // AI matching score (FR-4.9.6)
  matchScore: { type: Number, default: 0 },
  matchDetails: { skillMatch: Number, experienceMatch: Number, qualificationMatch: Number },

  // Notes & tags
  notes: String,
  tags: [String],
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  isArchived: { type: Boolean, default: false },

  // Recruiter info
  recruiterName: String,
  recruiterEmail: String,
  recruiterPhone: String,
}, { timestamps: true });

ApplicationSchema.index({ user: 1, stage: 1 });
ApplicationSchema.index({ user: 1, createdAt: -1 });
ApplicationSchema.index({ user: 1, company: 1 });

module.exports = mongoose.model('Application', ApplicationSchema);
