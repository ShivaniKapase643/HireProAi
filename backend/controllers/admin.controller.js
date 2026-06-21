const User = require('../models/User');

const getDashboard = async (req, res, next) => { try { const [totalUsers, students, tpos, recruiters] = await Promise.all([User.countDocuments(), User.countDocuments({ role: 'student' }), User.countDocuments({ role: 'tpo' }), User.countDocuments({ role: 'recruiter' })]); res.json({ success: true, data: { totalUsers, students, tpos, recruiters } }); } catch (e) { next(e); } };
const getUsers = async (req, res, next) => { try { const users = await User.find().select('-password').limit(100); res.json({ success: true, data: users }); } catch (e) { next(e); } };
const updateUser = async (req, res, next) => { try { const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: user }); } catch (e) { next(e); } };
const deleteUser = async (req, res, next) => { try { await User.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } };
const getSystemHealth = async (req, res, next) => { try { res.json({ success: true, data: { status: 'healthy', uptime: process.uptime(), memory: process.memoryUsage() } }); } catch (e) { next(e); } };
const getAuditLogs = async (req, res, next) => { try { res.json({ success: true, data: [] }); } catch (e) { next(e); } };
const manageRoles = async (req, res, next) => { try { const user = await User.findByIdAndUpdate(req.params.userId, { role: req.body.role }, { new: true }); res.json({ success: true, data: user }); } catch (e) { next(e); } };
const getReports = async (req, res, next) => { try { res.json({ success: true, data: [] }); } catch (e) { next(e); } };
const manageContent = async (req, res, next) => { try { res.json({ success: true }); } catch (e) { next(e); } };
const getAnalytics = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };

module.exports = { getDashboard, getUsers, updateUser, deleteUser, getSystemHealth, getAuditLogs, manageRoles, getReports, manageContent, getAnalytics };
