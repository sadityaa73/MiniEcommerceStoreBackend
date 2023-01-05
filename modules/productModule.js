const mongoose = require('mongoose');

// creating schema for product

const product = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const productModel = new mongoose.model("product", product);

module.exports = productModel;