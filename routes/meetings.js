const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings');
//needs validation and authentication

router.get('/', meetingsController.getAllMeetings);
router.get('/:id', meetingsController.getSingleMeetingById);
router.get('/month/:month/:year', meetingsController.getMeetingByMonth);
router.post('/', meetingsController.createMeeting);
router.put('/:id', meetingsController.updateMeeting);
router.delete('/:id', meetingsController.deleteMeeting);

module.exports = router;