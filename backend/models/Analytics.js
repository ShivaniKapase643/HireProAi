const mongoose = require('mongoose');

// FR-6: Analytics & Insights Module
const AnalyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['resume', 'skill', 'academic', 'aptitude', 'coding', 'interview', 'communication', 'project', 'internship', 'certification', 'learning', 'job_match', 'placement_readiness', 'selection', 'rejection', 'success_factor', 'placement_probability', 'application', 'historical_trend', 'peer_benchmark', 'company_preference', 'career_path', 'strength', 'weakness', 'predictive'],
    required: true,
  },
  period: { startDate: Date, endDate: Date },
  metrics: { type: Map, of: mongoose.Schema.Types.Mixed },
  scores: {
    overall: Number,
    breakdown: { type: Map, of: Number },
  },
  insights: [{ title: String, description: String, priority: String, actionable: Boolean }],
  recommendations: [String],
  comparisonData: { peerAverage: Number, topPercentile: Number, userRank: Number },
  trendData: [{ date: Date, value: Number }],
  generatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

AnalyticsSchema.index({ user: 1, type: 1, generatedAt: -1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
