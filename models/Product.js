const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductShema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Product = mongoose.model("Product", ProductShema)
module.exports = Product
