const { getAllUsers, updateUser,  getUser } = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.patch('/update/:id', updateUser);
router.get('/getAll', getAllUsers);
router.get('/get/:id', getUser);

module.exports = router;