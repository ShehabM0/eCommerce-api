const Painting = require("../models/Painting");
const Review = require("../models/Review");
const User = require("../models/User");

const addReview = async (req, res) => {
    const painting_id = req.params.id;
    const review_text = req.body.review;
    const review_stars = req.body.stars;
    const user_id = req.user.id;
    try {
        const findPainting = await Painting.findById(painting_id);
        if(!findPainting)
            return res.status(404).send({ status: "error", message: "Painting not found!"});
        const rev = {
            user_id: user_id,
            painting_id: painting_id,
            stars: review_stars,
            review:  review_text
        };
        const addReview = new Review(rev);
        await addReview.save();
        res.status(200).send({ status: "ok", message: "Review added successfully."})
    } catch (error) {
        const err = error.message;
        res.status(501).send({ status: "error", message:err });
    }
}

const editReview = async (req, res) => {
    const review_id = req.params.id;
    try {
        const findReview = await Review.findById(review_id);
        if(!findReview)
            return res.status(404).send({ status: "error", message: "Review not found!"});
        
        const updateReview = await Review.updateOne( { _id: review_id }, req.body ,{ runValidators: true })
        if(updateReview.modifiedCount == 1)
            res.status(200).send({ status: "ok", message: "Review edited successfully."})
        else
            res.status(200).send({ statusbar: "error", message: "Review text and stars are required!"});
    } catch (error) {
        const err = error.message;
        res.status(501).send({ status: "error", message:err });
    }
}

const deleteReview = async (req, res) => {
    const review_id = req.params.id;
    try {
        const findReview = await Review.findById(review_id);
        if(!findReview)
            return res.status(404).send({ status: "error", message: "Review not found!"});
        
        const deleteReview = await Review.deleteOne({ _id: review_id });
        if(deleteReview.deletedCount == 1)
            res.status(200).send({ status: "ok", message: "Review deleted successfully."})
        else
            res.status(200).send({ statusbar: "error", message: "Couldn't delete review!"});
    } catch (error) {
        const err = error.message;
        res.status(501).send({ status: "error", message:err });
    }
}


module.exports = {
    deleteReview,
    editReview,
    addReview
}