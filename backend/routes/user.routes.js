const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProfile, updateProfile, uploadProfilePicture, deleteProfilePicture,
  getProfileCompletion, updateCareerGoals, changePassword, getPlacementReadiness,
  updateNotificationPreferences, getActivityHistory,
} = require('../controllers/user.controller');

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/profile/picture', uploadProfilePicture);
router.delete('/profile/picture', deleteProfilePicture);
router.get('/profile/completion', getProfileCompletion);
router.put('/career-goals', updateCareerGoals);
router.put('/change-password', changePassword);
router.get('/placement-readiness', getPlacementReadiness);
router.put('/notification-preferences', updateNotificationPreferences);
router.get('/activity-history', getActivityHistory);

module.exports = router;
