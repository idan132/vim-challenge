const express = require('express');
const router = express.Router();
const chatService = require('../controllers/chat.js')

router.post('/', chatService)

module.exports = router;