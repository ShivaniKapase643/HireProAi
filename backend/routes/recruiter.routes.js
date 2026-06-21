const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboard, postJob, getJobs, searchCandidates, screenResumes,
  getRecommendedCandidates, scheduleInterview, managePipeline,
  getHiringAnalytics, manageOffers, getTalentPool,
} = require('../controllers/recruiter.controller');

router.use(protect, authorize('recruiter', 'admin'));

router.get('/dashboard', getDashboard);
router.post('/jobs', postJob);
router.get('/jobs', getJobs);
router.get('/candidates/search', searchCandidates);
router.post('/candidates/screen', screenResumes);
router.get('/candidates/recommended/:jobId', getRecommendedCandidates);
router.post('/interviews/schedule', scheduleInterview);
router.get('/pipeline/:jobId', managePipeline);
router.get('/analytics', getHiringAnalytics);
router.post('/offers', manageOffers);
router.get('/talent-pool', getTalentPool);

module.exports = router;
