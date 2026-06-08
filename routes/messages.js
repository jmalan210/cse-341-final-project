const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');
const validate = require('../helpers/validateMessage');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', messagesController.getAllMessages);
router.get('/displayName/:displayName', validate.validateDisplayName, messagesController.getMessagesByDisplayName);
router.get('/:id', validate.checkId, messagesController.getMessageById);

router.post('/', isAuthenticated, validate.saveMessage, messagesController.createMessage);
router.put('/:id', isAuthenticated, validate.updateMessage, messagesController.updateMessage);
router.delete('/:id', isAuthenticated, validate.checkId,messagesController.deleteMessage);

module.exports = router;