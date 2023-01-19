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
    fixedPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    productId: {
        type: String,
    },
    quantity: {
        type: Number,
        default: null
    },
    userId: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    }
});

const cartModel = new mongoose.model("cartItem", cart);

module.exports = cartModel;