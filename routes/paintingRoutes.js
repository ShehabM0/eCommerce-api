const addImage = require('../controllers/painting');
const express = require('express');
const router = express.Router();

router.post("/add" , addImage);

module.exports = router;