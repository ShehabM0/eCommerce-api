const mongoose = require('mongoose')
const Painting = require('./Painting')

const purchaseSchema = new mongoose.Schema({
    cart_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    success:
    {
        type: Boolean,
        required: true
    },
    failureCause:
    [
        {
            error:
            {
                type: String
            },
            painting:
            {
                type: mongoose.Schema.Types.Object,
                ref: "Painting"
            }
        }
    ],
    total_cash:
    {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Purchase = mongoose.model("purchase", purchaseSchema)
module.exports = Purchase