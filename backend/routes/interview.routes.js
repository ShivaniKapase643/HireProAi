const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const {
  startInterview, sendMessage, endInterview, getInterviewHistory,
  getInterviewById, generateReport, getCompanyQuestions, evaluateVoiceResponse,
  getPreparationTracker, getInterviewAnalytics, deleteInterview,
} = require('../controllers/interview.controller');

router.use(protect);

router.post('/start', aiLimiter, startInterview);
router.post('/:id/message', aiLimiter, sendMessage);
router.put('/:id/end', endInterview);
router.get('/history', getInterviewHistory);
router.get('/analytics', getInterviewAnalytics);
router.get('/preparation-tracker', getPreparationTracker);
router.get('/company/:company', getCompanyQuestions);
router.get('/:id', getInterviewById);
router.get('/:id/report', generateReport);
router.post('/:id/voice-evaluate', aiLimiter, evaluateVoiceResponse);
router.delete('/:id', deleteInterview);

module.exports = router;
