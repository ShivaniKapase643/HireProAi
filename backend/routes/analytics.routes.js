const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getDashboardAnalytics, getResumeAnalytics, getSkillAnalytics, getInterviewAnalytics,
  getPlacementReadiness, getCareerAnalytics, getPeerBenchmark, getPredictiveAnalytics,
  getStrengthWeakness, getApplicationAnalytics, getProgressTrends,
} = require('../controllers/analytics.controller');

router.use(protect);

router.get('/dashboard', getDashboardAnalytics);
router.get('/resume', getResumeAnalytics);
router.get('/skills', getSkillAnalytics);
router.get('/interviews', getInterviewAnalytics);
router.get('/placement-readiness', getPlacementReadiness);
router.get('/career', getCareerAnalytics);
router.get('/peer-benchmark', getPeerBenchmark);
router.get('/predictive', getPredictiveAnalytics);
router.get('/strength-weakness', getStrengthWeakness);
router.get('/applications', getApplicationAnalytics);
router.get('/progress-trends', getProgressTrends);

module.exports = router;
