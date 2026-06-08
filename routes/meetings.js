
const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings');
const validate = require('../helpers/validateMeeting');
//needs authentication

router.get('/', meetingsController.getAllMeetings);

router.get('/month/:month/:year',validate.validateMonthYear, meetingsController.getMeetingByMonth);
router.get('/:id', validate.checkId, meetingsController.getSingleMeetingById);
router.post('/', validate.saveMeeting, meetingsController.createMeeting);
router.put('/:id', validate.checkId, validate.updateMeeting,meetingsController.updateMeeting);
router.delete('/:id', validate.checkId, meetingsController.deleteMeeting);

module.exports = router;