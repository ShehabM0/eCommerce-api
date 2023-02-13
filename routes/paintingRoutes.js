const { createPainting, updatePainting, deletePainting,  getPainting, getAllPainting } = require('../controllers/painting');
const express = require('express');
const router = express.Router();

router.delete("/delete/:id", deletePainting);
router.patch("/update/:id", updatePainting);
router.post("/create" , createPainting);
router.get("/getAll", getAllPainting);
router.get("/get/:id", getPainting);

module.exports = router;