const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const {
  uploadResume, analyzeResume, getResumes, getResumeById, deleteResume,
  getATSScore, getKeywordAnalysis, matchJobDescription, getSkillGap,
  getCompanyAnalysis, optimizeResume, compareResumes, getVersionHistory,
  restoreVersion, getSuccessPrediction, generateResume,
} = require('../controllers/resume.controller');

router.use(protect);

router.post('/upload', uploadResume);
router.post('/:id/analyze', aiLimiter, analyzeResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.delete('/:id', deleteResume);
router.get('/:id/ats-score', getATSScore);
router.get('/:id/keywords', getKeywordAnalysis);
router.post('/:id/match-jd', aiLimiter, matchJobDescription);
router.get('/:id/skill-gap', getSkillGap);
router.post('/:id/company-analysis', aiLimiter, getCompanyAnalysis);
router.post('/:id/optimize', aiLimiter, optimizeResume);
router.post('/compare', compareResumes);
router.get('/:id/versions', getVersionHistory);
router.put('/:id/restore/:version', restoreVersion);
router.get('/:id/success-prediction', getSuccessPrediction);
router.post('/generate', aiLimiter, generateResume);

module.exports = router;
