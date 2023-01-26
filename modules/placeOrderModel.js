const mongoose = require('mongoose');


const placeOrder = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }

});


const placeOrderModel = new mongoose.model("placeOrder", placeOrder);

module.exports = placeOrderModel;