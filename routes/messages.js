const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');
const validate = require('../helpers/validateMessage');
//needs validation and authentication

router.get('/', messagesController.getAllMessages);
router.get('/displayName/:displayName', validate.validateDisplayName, messagesController.getMessagesByDisplayName);
router.get('/:id', validate.checkId, messagesController.getMessageById);

router.post('/', validate.saveMessage, messagesController.createMessage);
router.put('/:id', validate.updateMessage, messagesController.updateMessage);
router.delete('/:id', validate.checkId,messagesController.deleteMessage);

module.exports = router;