const mongoose = require('mongoose')

const paintingSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: [true, 'painting name is missing!'],
        maxlength: [50, 'Title can not be more than 50 characters'],
    },
    categories:
    {
        type: Array,
        required: [true, 'category is missing!']
    },
    price:
    {
        type: Number,
        required: [true, 'price is missing!']
    },
    image:
    {
        type: String,
        required: [true, 'image is missing!']
    },
    quantity:
    {
        type: Number,
        required: [true, 'quantity is missing!']
    },
    description:
    {
        type: String,
        required: [true, 'product description is missing'],
        maxlength: [1000, 'Description can not be more than 1000 characters'],
    }

}, {timestamps: true})

const Painting = mongoose.model("painting", paintingSchema)
module.exports = Painting