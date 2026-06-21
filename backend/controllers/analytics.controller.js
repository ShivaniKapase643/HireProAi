const Analytics = require('../models/Analytics');
const Interview = require('../models/Interview');
const Resume = require('../models/Resume');
const Application = require('../models/Application');

const getDashboardAnalytics = async (req, res, next) => { try { const [interviews, resumes, applications] = await Promise.all([Interview.countDocuments({ user: req.user._id }), Resume.countDocuments({ user: req.user._id }), Application.countDocuments({ user: req.user._id })]); res.json({ success: true, data: { interviews, resumes, applications } }); } catch (e) { next(e); } };
const getResumeAnalytics = async (req, res, next) => { try { const resumes = await Resume.find({ user: req.user._id }); res.json({ success: true, data: resumes.map(r => ({ id: r._id, atsScore: r.atsScore, title: r.title })) }); } catch (e) { next(e); } };
const getSkillAnalytics = async (req, res, next) => { try { res.json({ success: true, data: req.user.profile?.skills || {} }); } catch (e) { next(e); } };
const getInterviewAnalytics = async (req, res, next) => { try { const interviews = await Interview.find({ user: req.user._id, status: 'completed' }).select('scores domain createdAt'); res.json({ success: true, data: interviews }); } catch (e) { next(e); } };
const getPlacementReadiness = async (req, res, next) => { try { res.json({ success: true, data: req.user.placementReadiness }); } catch (e) { next(e); } };
const getCareerAnalytics = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };
const getPeerBenchmark = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };
const getPredictiveAnalytics = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };
const getStrengthWeakness = async (req, res, next) => { try { res.json({ success: true, data: { strengths: [], weaknesses: [] } }); } catch (e) { next(e); } };
const getApplicationAnalytics = async (req, res, next) => { try { const apps = await Application.find({ user: req.user._id }); res.json({ success: true, data: { total: apps.length } }); } catch (e) { next(e); } };
const getProgressTrends = async (req, res, next) => { try { res.json({ success: true, data: [] }); } catch (e) { next(e); } };

module.exports = { getDashboardAnalytics, getResumeAnalytics, getSkillAnalytics, getInterviewAnalytics, getPlacementReadiness, getCareerAnalytics, getPeerBenchmark, getPredictiveAnalytics, getStrengthWeakness, getApplicationAnalytics, getProgressTrends };
