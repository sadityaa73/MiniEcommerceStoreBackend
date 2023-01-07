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
    //get cart item by userId:
cart.get("/cart/:id", async(request, response) => {
        let userId = request.params.userId;
        const getItems = await cartModel.find({ userId: userId });
        try {
            response.status(200).send(getItems);
        } catch (error) {
            response.status(500).send(error.message);
        }
    })
    //removeItems from cart:
cart.patch("/removeItems", async(request, response) => {
    let id = request.body._id;
    console.log("printing id", id);
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
        image: request.body.image,
        userId: request.body.userId
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