const User = require('../models/User');

const getProfile = async (req, res, next) => { try { res.json({ success: true, data: req.user }); } catch (e) { next(e); } };
const updateProfile = async (req, res, next) => { try { const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }); user.calculateCompletion(); await user.save(); res.json({ success: true, data: user }); } catch (e) { next(e); } };
const uploadProfilePicture = async (req, res, next) => { try { const image = req.body.image || req.body.profilePicture; if (!image) return res.status(400).json({ success: false, message: 'No image provided' }); req.user.profilePicture = image; req.user.calculateCompletion(); await req.user.save(); res.json({ success: true, data: { profilePicture: req.user.profilePicture }, message: 'Picture uploaded' }); } catch (e) { next(e); } };
const deleteProfilePicture = async (req, res, next) => { try { req.user.profilePicture = ''; await req.user.save(); res.json({ success: true }); } catch (e) { next(e); } };
const getProfileCompletion = async (req, res, next) => { try { const completion = req.user.calculateCompletion(); res.json({ success: true, data: { completion } }); } catch (e) { next(e); } };
const updateCareerGoals = async (req, res, next) => { try { const user = await User.findByIdAndUpdate(req.user._id, { careerGoals: req.body }, { new: true }); res.json({ success: true, data: user.careerGoals }); } catch (e) { next(e); } };
const changePassword = async (req, res, next) => { try { const user = await User.findById(req.user._id).select('+password'); if (!(await user.matchPassword(req.body.currentPassword))) return res.status(400).json({ success: false, message: 'Incorrect current password' }); user.password = req.body.newPassword; await user.save(); res.json({ success: true, message: 'Password changed' }); } catch (e) { next(e); } };
const getPlacementReadiness = async (req, res, next) => { try { res.json({ success: true, data: req.user.placementReadiness }); } catch (e) { next(e); } };
const updateNotificationPreferences = async (req, res, next) => { try { const user = await User.findByIdAndUpdate(req.user._id, { notificationPreferences: req.body }, { new: true }); res.json({ success: true, data: user.notificationPreferences }); } catch (e) { next(e); } };
const getActivityHistory = async (req, res, next) => { try { res.json({ success: true, data: [] }); } catch (e) { next(e); } };

module.exports = { getProfile, updateProfile, uploadProfilePicture, deleteProfilePicture, getProfileCompletion, updateCareerGoals, changePassword, getPlacementReadiness, updateNotificationPreferences, getActivityHistory };
