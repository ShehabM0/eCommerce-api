const { updateUserPass, getAllUsers, updateUser, deleteUser,  getUser } = require('../controllers/user');
const { admin, currUserOradmin } = require("../middleware/authorization");
const verifyToken = require("../middleware/TokenVerification");
const express = require('express');
const router = express.Router();

router.patch('/updatePass/:id', [verifyToken, currUserOradmin], updateUserPass);
router.patch('/update/:id', [verifyToken, currUserOradmin], updateUser);
router.delete('/delete/:id', [verifyToken, admin], deleteUser);
router.get('/getAll', [verifyToken, admin], getAllUsers);
router.get('/get/:id', [verifyToken, admin], getUser);

module.exports = router;