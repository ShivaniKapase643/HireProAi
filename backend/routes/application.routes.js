const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createApplication, getApplications, getApplicationById, updateApplication,
  deleteApplication, updateStage, addInterview, addFollowUp, addDeadline,
  getAnalytics, getKanbanBoard, syncCalendar, archiveApplication,
} = require('../controllers/application.controller');

router.use(protect);

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/analytics', getAnalytics);
router.get('/kanban', getKanbanBoard);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);
router.put('/:id/stage', updateStage);
router.post('/:id/interviews', addInterview);
router.post('/:id/follow-ups', addFollowUp);
router.post('/:id/deadlines', addDeadline);
router.post('/:id/sync-calendar', syncCalendar);
router.put('/:id/archive', archiveApplication);

module.exports = router;
