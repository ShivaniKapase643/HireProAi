const Resume = require('../models/Resume');
const geminiAI = require('../services/geminiAI.service');

const uploadResume = async (req, res, next) => { try { const resume = await Resume.create({ user: req.user._id, fileUrl: req.body.fileUrl || 'pending', fileName: req.body.fileName, fileType: req.body.fileType, title: req.body.title }); res.status(201).json({ success: true, data: resume }); } catch (e) { next(e); } };
const analyzeResume = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); if (!resume) return res.status(404).json({ success: false, message: 'Not found' }); resume.analysisStatus = 'processing'; await resume.save(); const analysis = await geminiAI.analyzeResume(JSON.stringify(resume.parsedData), req.body.targetRole); Object.assign(resume, { parsedData: analysis.parsedData || resume.parsedData, atsScore: analysis.atsScore, keywordAnalysis: analysis.keywords, formattingAnalysis: analysis.formatting, grammarAnalysis: analysis.grammar, suggestions: analysis.suggestions, analysisStatus: 'completed', lastAnalyzedAt: new Date() }); await resume.save(); res.json({ success: true, data: resume }); } catch (e) { next(e); } };
const getResumes = async (req, res, next) => { try { const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 }); res.json({ success: true, data: resumes }); } catch (e) { next(e); } };
const getResumeById = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); res.json({ success: true, data: resume }); } catch (e) { next(e); } };
const deleteResume = async (req, res, next) => { try { await Resume.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } };
const getATSScore = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); res.json({ success: true, data: resume.atsScore }); } catch (e) { next(e); } };
const getKeywordAnalysis = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); res.json({ success: true, data: resume.keywordAnalysis }); } catch (e) { next(e); } };
const matchJobDescription = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); const match = await geminiAI.matchJobDescription(JSON.stringify(resume.parsedData), req.body.jobDescription); resume.jdMatches.push({ jobTitle: req.body.jobTitle, jobDescription: req.body.jobDescription, ...match }); await resume.save(); res.json({ success: true, data: match }); } catch (e) { next(e); } };
const getSkillGap = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); res.json({ success: true, data: resume.skillGap }); } catch (e) { next(e); } };
const getCompanyAnalysis = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };
const optimizeResume = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };
const compareResumes = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };
const getVersionHistory = async (req, res, next) => { try { const resumes = await Resume.find({ user: req.user._id }).sort({ version: -1 }); res.json({ success: true, data: resumes }); } catch (e) { next(e); } };
const restoreVersion = async (req, res, next) => { try { res.json({ success: true }); } catch (e) { next(e); } };
const getSuccessPrediction = async (req, res, next) => { try { const resume = await Resume.findById(req.params.id); res.json({ success: true, data: resume.successPrediction }); } catch (e) { next(e); } };
const generateResume = async (req, res, next) => { try { res.json({ success: true, data: {} }); } catch (e) { next(e); } };

module.exports = { uploadResume, analyzeResume, getResumes, getResumeById, deleteResume, getATSScore, getKeywordAnalysis, matchJobDescription, getSkillGap, getCompanyAnalysis, optimizeResume, compareResumes, getVersionHistory, restoreVersion, getSuccessPrediction, generateResume };
