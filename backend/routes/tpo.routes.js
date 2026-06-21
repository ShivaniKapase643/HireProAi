const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboard, getStudents, getStudentReadiness, getBatchAnalytics,
  getPlacementReports, manageDrives, getEligibleStudents, getCompanyShortlist,
  getPlacementStats, exportData,
} = require('../controllers/tpo.controller');

router.use(protect, authorize('tpo', 'admin'));

router.get('/dashboard', getDashboard);
router.get('/students', getStudents);
router.get('/students/:id/readiness', getStudentReadiness);
router.get('/batch-analytics', getBatchAnalytics);
router.get('/placement-reports', getPlacementReports);
router.post('/drives', manageDrives);
router.get('/eligible-students', getEligibleStudents);
router.get('/company-shortlist/:companyId', getCompanyShortlist);
router.get('/placement-stats', getPlacementStats);
router.get('/export', exportData);

module.exports = router;
