const { getAllUsers, getUser } = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/getAll', getAllUsers);
router.get('/get/:id', getUser);

module.exports = router;