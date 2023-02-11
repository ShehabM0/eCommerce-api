const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    painting_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Painting",
        required: true
    },
    review:
    {
        type: String,
        required: [true, "review content is missing!"],
        maxlength: [1000 ,"Review text can not be more than 1000 characters"]
    }
})

const Review = mongoose.model("review", reviewSchema)
module.exports = Review