const { createPainting, getPainting, getAllPainting } = require('../controllers/painting');
const express = require('express');
const router = express.Router();

router.post("/create" , createPainting);
router.get("/getAll", getAllPainting);
router.get("/get/:id", getPainting);

module.exports = router;