const { register, logout,  login } = require('../controllers/authentication');
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.get('/logout', logout);
router.post('/login', login);

module.exports = router;