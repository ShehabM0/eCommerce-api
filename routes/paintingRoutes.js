const createPainting = require('../controllers/painting');
const express = require('express');
const router = express.Router();

router.post("/create" , createPainting);

module.exports = router;