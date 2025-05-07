const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const handleValidationErrors = require('../middlewares/handleValidationErrors');
const { validateMessage } = require('../middlewares/validators/messageValidator');

router.get('/all', messageController.getAllMessages);
router.get('/', messageController.getMessages);
router.post('/', validateMessage, handleValidationErrors, messageController.sendMessage);
router.patch('/:id/read', messageController.markAsRead);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
