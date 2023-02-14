const { createPainting, updatePainting, deletePainting,  getPainting, getAllPainting } = require('../controllers/painting');
const { admin, currUserOradmin } = require("../middleware/authorization");
const verifyToken = require("../middleware/TokenVerification");
const express = require('express');
const router = express.Router();

router.delete("/delete/:id", [verifyToken, admin], deletePainting);
router.patch("/update/:id", [verifyToken, admin], updatePainting);
router.post("/create" , [verifyToken, admin], createPainting);
router.get("/getAll", [verifyToken, admin],  getAllPainting);
router.get("/get/:id", [verifyToken, admin], getPainting);

module.exports = router;