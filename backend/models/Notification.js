const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['interview_reminder', 'deadline_alert', 'follow_up', 'progress_report', 'recommendation', 'achievement', 'system', 'placement_opportunity', 'recruiter_interaction', 'status_update'],
    required: true,
  },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  channel: { type: String, enum: ['email', 'sms', 'push', 'in_app'], default: 'in_app' },
  isRead: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  readAt: Date,
  actionUrl: String,
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

NotificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
