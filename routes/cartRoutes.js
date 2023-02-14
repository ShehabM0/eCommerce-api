const { admin, currUserOradmin } = require("../middleware/authorization");
const verifyToken = require("../middleware/TokenVerification");
const AddToCart = require("../controllers/cart");
const express = require("express");
const router = express.Router();

router.post("/add/:id", [verifyToken, currUserOradmin], AddToCart);

module.exports = router;