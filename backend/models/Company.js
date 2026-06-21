const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: String,
  website: String,
  industry: String,
  size: { type: String, enum: ['startup', 'small', 'medium', 'large', 'enterprise'] },
  description: String,
  locations: [String],
  hiringStatus: { type: String, enum: ['active', 'inactive', 'upcoming'], default: 'active' },
  interviewPatterns: { rounds: [String], difficulty: String, commonTopics: [String] },
  averageSalary: { fresher: Number, experienced: Number },
  recruitmentHistory: [{
    year: Number, studentsHired: Number, roles: [String], packages: { min: Number, max: Number },
  }],
  recruiterContacts: [{
    name: String, email: String, phone: String, designation: String,
  }],
  ratings: { overall: Number, workLifeBalance: Number, growth: Number },
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
