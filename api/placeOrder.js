const express = require('express');
const mongoose = require('mongoose');
const placeOrderModel = require('../modules/placeOrderModel');
mongoose.set('strictQuery', true);

const placeOrder = express.Router();

//get request:

placeOrder.get("/placeOrder", async(request, response) => {
    const orders = await placeOrderModel.find({});
    try {
        response.status(200).send(orders);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//post request

placeOrder.post("/placeOrder", async(request, response) => {

    const postOrders = await placeOrderModel({
        image: request.body.image,
        product: request.body.product,
        quantity: request.body.quantity,
        price: request.body.price
    });
    try {
        let post = await postOrders.save();
        response.status(201).send(post);
    } catch (error) {
        response.status(500).send(error.message)
    }
})


//connection:
const client = mongoose.connect("mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`mongoose placeOrder connection successfull!!`); }).catch((err) => { console.log(`mongoose placeOrder connection error `); })

module.exports = placeOrder;