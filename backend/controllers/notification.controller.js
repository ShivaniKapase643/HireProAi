const Notification = require('../models/Notification');

const getNotifications = async (req, res, next) => { try { const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50); res.json({ success: true, data: notifications }); } catch (e) { next(e); } };
const getUnreadCount = async (req, res, next) => { try { const count = await Notification.countDocuments({ user: req.user._id, isRead: false }); res.json({ success: true, data: { count } }); } catch (e) { next(e); } };
const markAsRead = async (req, res, next) => { try { await Notification.findByIdAndUpdate(req.params.id, { isRead: true, readAt: new Date() }); res.json({ success: true }); } catch (e) { next(e); } };
const markAllRead = async (req, res, next) => { try { await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true, readAt: new Date() }); res.json({ success: true }); } catch (e) { next(e); } };
const deleteNotification = async (req, res, next) => { try { await Notification.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } };
const updatePreferences = async (req, res, next) => { try { res.json({ success: true }); } catch (e) { next(e); } };

module.exports = { getNotifications, getUnreadCount, markAsRead, markAllRead, deleteNotification, updatePreferences };
