const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

const placeOrder = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    cart_items: [cartSchema],
    user_address: {
        type: String,
        required: true
    }
});


const placeOrderModel = new mongoose.model("placeOrder", placeOrder);

module.exports = placeOrderModel;