const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');
//needs validation and authentication

router.get('/', messagesController.getAllMessages);
router.get('/:id', messagesController.getMessageById);
router.get('/displayName/:displayName', messagesController.getMessagesByDisplayName);
router.post('/', messagesController.createMessage);
router.put('/:id', messagesController.updateMessage);
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;