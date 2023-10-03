const express = require('express');
const router = express.Router();
const loginService = require('../controllers/login.js')

router.post('/', loginService)

module.exports = router;