const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  phone: { type: String },
  password: { type: String, minlength: 8, select: false },
  role: { type: String, enum: ['student', 'admin', 'tpo', 'recruiter'], default: 'student' },
  profilePicture: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastActivity: { type: Date, default: Date.now },

  // OAuth
  googleId: { type: String },
  linkedinId: { type: String },

  // Profile (FR-1.3)
  profile: {
    headline: String,
    summary: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { city: String, state: String, country: String, pincode: String },
    education: [{
      institution: String, degree: String, field: String,
      startYear: Number, endYear: Number, cgpa: Number, percentage: Number,
    }],
    skills: { technical: [String], soft: [String], tools: [String] },
    experience: [{
      company: String, role: String, type: { type: String, enum: ['fulltime', 'internship', 'freelance'] },
      startDate: Date, endDate: Date, description: String, current: Boolean,
    }],
    projects: [{
      title: String, description: String, technologies: [String],
      link: String, github: String, startDate: Date, endDate: Date,
    }],
    certifications: [{
      title: String, issuer: String, issueDate: Date, expiryDate: Date, credentialId: String, url: String,
    }],
    achievements: [{ title: String, description: String, date: Date }],
    languages: [{ name: String, proficiency: String }],
    socialLinks: { github: String, linkedin: String, portfolio: String, leetcode: String },
  },

  // Career preferences (FR-5.1)
  careerGoals: {
    shortTerm: [String],
    longTerm: [String],
    targetRoles: [String],
    targetCompanies: [String],
    preferredLocations: [String],
    expectedSalary: { min: Number, max: Number },
    workMode: { type: String, enum: ['remote', 'hybrid', 'onsite', 'any'] },
  },

  // Placement readiness (FR-5.3)
  placementReadiness: {
    score: { type: Number, default: 0 },
    lastAssessed: Date,
    strengths: [String],
    weaknesses: [String],
  },

  // Profile completion
  profileCompletion: { type: Number, default: 0 },

  // OTP for verification
  otp: { code: String, expiresAt: Date },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // Notification preferences (FR-7.10)
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
    categories: {
      interviews: { type: Boolean, default: true },
      applications: { type: Boolean, default: true },
      recommendations: { type: Boolean, default: true },
      system: { type: Boolean, default: true },
    },
  },
}, { timestamps: true });

// Hash password before save (NFR-13.4.2)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT (NFR-13.4.1)
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Calculate profile completion
UserSchema.methods.calculateCompletion = function () {
  let score = 0;
  const checks = [
    this.name, this.email, this.phone, this.profilePicture,
    this.profile?.education?.length > 0, this.profile?.skills?.technical?.length > 0,
    this.profile?.projects?.length > 0, this.profile?.summary,
    this.careerGoals?.targetRoles?.length > 0,
  ];
  checks.forEach((c) => { if (c) score += 11; });
  this.profileCompletion = Math.min(score, 100);
  return this.profileCompletion;
};

module.exports = mongoose.model('User', UserSchema);
