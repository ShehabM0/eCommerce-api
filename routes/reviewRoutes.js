const { currUserOradmin } = require("../middleware/authorization");
const verifyToken = require("../middleware/TokenVerification");
const { addReview, editReview, deleteReview } = require("../controllers/review");
const express = require("express");
const router = express.Router();

router.delete("/delete/:id", [verifyToken, currUserOradmin], deleteReview);
router.patch("/edit/:id", [verifyToken, currUserOradmin], editReview);
router.post("/add/:id", [verifyToken, currUserOradmin], addReview);
module.exports = router;