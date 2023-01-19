const express = require('express');
const mongoose = require('mongoose');
const cartModel = require('../modules/cartModel');
mongoose.set('strictQuery', true);

const cart = express.Router();


//get reuest for cart
cart.get("/cart", async(request, response) => {
        const getItems = await cartModel.find({});
        try {
            response.status(200).send(getItems);
        } catch (error) {
            response.status(500).send(error.message);
        }
    })
    //get cart item by product id:
cart.post("/get_product", async(request, response) => {
        console.log("prinitng request body", request.body.productId);
        let product_id = request.body.productId;
        const getItems = await cartModel.findOne({ productId: product_id });
        try {
            response.status(200).send(getItems);
        } catch (error) {
            response.status(500).send(error.message);
        }
    })
    //update price and quantity
cart.patch("/update_cart", async(request, response) => {
        console.log(request.body);
        let productId = request.body.productId;
        let price = request.body.price;
        let quantity = request.body.quantity;
        const updatedItem = await cartModel.findOneAndUpdate({ productId: productId }, { price: price, quantity: quantity });
        try {
            response.status(200).send(updatedItem);
        } catch (error) {
            response.status(500).send(error.message);
        }
    })
    //removeItems from cart:
cart.patch("/removeItems", async(request, response) => {
    let id = request.body._id;
    const updateCart = await cartModel.findByIdAndRemove(id);
    try {
        response.status(200).send(updateCart);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//post request for cart:
cart.post("/cart", async(request, response) => {
    const cartItems = await cartModel({
        name: request.body.name,
        price: request.body.price,
        fixedPrice: request.body.fixedPrice,
        image: request.body.image,
        productId: request.body.productId,
        quantity: request.body.quantity,
        userId: request.body.userId,
        address: request.body.address
    });
    try {
        let data = cartItems.save();
        response.status(201).send(data);
    } catch (err) {
        response.status(500).send(err.message);
    }
})

//connection :
const client = mongoose.connect("mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`mongoose  cart connection successfull!!`); }).catch((err) => { console.log(`mongoose  cart connection error `); })

module.exports = cart;