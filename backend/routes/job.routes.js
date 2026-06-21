const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getJobs, getJobById, createJob, updateJob, deleteJob,
  getRecommendedJobs, getJobMatchScore, searchJobs, getCareerPaths,
  getSalaryPrediction, getTrendingSkills, getInternships,
} = require('../controllers/job.controller');

router.use(protect);

router.get('/', getJobs);
router.get('/recommended', getRecommendedJobs);
router.get('/search', searchJobs);
router.get('/career-paths', getCareerPaths);
router.get('/salary-prediction', getSalaryPrediction);
router.get('/trending-skills', getTrendingSkills);
router.get('/internships', getInternships);
router.get('/:id', getJobById);
router.get('/:id/match-score', getJobMatchScore);
router.post('/', authorize('admin', 'recruiter'), createJob);
router.put('/:id', authorize('admin', 'recruiter'), updateJob);
router.delete('/:id', authorize('admin', 'recruiter'), deleteJob);

module.exports = router;
