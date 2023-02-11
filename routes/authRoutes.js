const register = require('../controllers/authentication');
const express = require('express');
const router = express.Router();

router.post('/signup', register);

module.exports = router;