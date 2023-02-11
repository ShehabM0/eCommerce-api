const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    cart_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    total_cash:
    {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Purchase = mongoose.model("purchase", purchaseSchema)
module.exports = Purchase