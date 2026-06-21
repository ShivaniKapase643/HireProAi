const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getNotifications, markAsRead, markAllRead, deleteNotification,
  getUnreadCount, updatePreferences,
} = require('../controllers/notification.controller');

router.use(protect);

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllRead);
router.delete('/:id', deleteNotification);
router.put('/preferences', updatePreferences);

module.exports = router;
