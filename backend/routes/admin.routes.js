const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboard, getUsers, updateUser, deleteUser, getSystemHealth,
  getAuditLogs, manageRoles, getReports, manageContent, getAnalytics,
} = require('../controllers/admin.controller');

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/system-health', getSystemHealth);
router.get('/audit-logs', getAuditLogs);
router.put('/roles/:userId', manageRoles);
router.get('/reports', getReports);
router.post('/content', manageContent);
router.get('/analytics', getAnalytics);

module.exports = router;
