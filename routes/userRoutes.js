const { updateUserPass, getAllUsers, updateUser, deleteUser,  getUser } = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.patch('/updatePass/:id', updateUserPass);
router.delete('/delete/:id', deleteUser);
router.patch('/update/:id', updateUser);
router.get('/getAll', getAllUsers);
router.get('/get/:id', getUser);

module.exports = router;