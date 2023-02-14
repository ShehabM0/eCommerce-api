const { admin, currUserOradmin } = require("../middleware/authorization");
const { AddToCart, deleteFromCart } = require("../controllers/cart");
const verifyToken = require("../middleware/TokenVerification");
const express = require("express");
const router = express.Router();

router.delete("/delete/:id", [verifyToken, currUserOradmin], deleteFromCart);
router.post("/add/:id", [verifyToken, currUserOradmin], AddToCart);

module.exports = router;