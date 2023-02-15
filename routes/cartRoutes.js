const { admin, currUserOradmin } = require("../middleware/authorization");
const { AddToCart, deleteFromCart, getCart, getUserCart, getAllCarts,} = require("../controllers/cart");
const verifyToken = require("../middleware/TokenVerification");
const express = require("express");
const router = express.Router();

router.delete("/delete/:id", [verifyToken, currUserOradmin], deleteFromCart);
router.post("/add/:id", [verifyToken, currUserOradmin], AddToCart);
router.get("/getCart", [verifyToken, currUserOradmin], getCart);
router.get("/getUserCart", [verifyToken, admin], getUserCart);
router.get("/getAllCarts", [verifyToken, admin], getAllCarts);

module.exports = router;