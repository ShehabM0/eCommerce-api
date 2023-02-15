const { admin, currUserOradmin } = require("../middleware/authorization");
const verifyToken = require("../middleware/TokenVerification");
const purchase = require("../controllers/purchase");
const express = require("express");
const router = express.Router();

router.get("/purchase", [verifyToken, currUserOradmin], purchase);

module.exports = router;