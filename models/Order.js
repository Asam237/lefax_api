const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    products: [
        {
            product: {type: Object, required: true},
            quantity: {type: Number, required: true}
        }
    ],
    user: {
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }
    }
})

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order