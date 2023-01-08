const mongoose = require('mongoose');


//creating schema for cart 

const cart = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: null
    }
});

const cartModel = new mongoose.model("cartItem", cart);

module.exports = cartModel;