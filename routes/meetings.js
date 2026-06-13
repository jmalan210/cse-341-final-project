
const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings');
const validate = require('../helpers/validateMeeting');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', meetingsController.getAllMeetings);

router.get('/month/:year/:month',validate.validateMonthYear, meetingsController.getMeetingByMonth);
router.get('/:id', validate.checkId, meetingsController.getSingleMeetingById);
router.post('/', isAuthenticated, validate.saveMeeting, meetingsController.createMeeting);
router.put('/:id', isAuthenticated, validate.checkId, validate.updateMeeting, meetingsController.updateMeeting);
router.delete('/:id', isAuthenticated,validate.checkId, meetingsController.deleteMeeting);

module.exports = router;