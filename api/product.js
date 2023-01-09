const express = require('express');
const productModel = require("../modules/productModule");
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dbjrcyxsc',
    api_key: '536155681762353',
    api_secret: 'p6rxH5zff9mC7uI7TW18svzeNKo',
    secure: true
});
mongoose.set('strictQuery', true);

const product = express.Router();

//get request
product.get("/product", async(request, response) => {

    const getProduct = await productModel.find({});
    try {
        response.status(200).send(getProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
//filter  get request by  product Categories:
product.get("/product/:category", async(request, response) => {
    let category = request.params.category;

    const getProduct = await productModel.find({ category: category });
    try {
        response.status(200).send(getProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
//filter  get request by product Id:
product.get("/products/:id", async(request, response) => {
    let id = request.params.id;
    const getProduct = await productModel.find({ _id: id });
    try {
        response.status(200).send(getProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
//post request
product.post("/product", async(request, response) => {
    let file = request.files.file;
    let image_url = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            console.log(err.message)
        } else { console.log(result); }
    });
    const post = await productModel({
        name: request.body.name,
        price: request.body.price,
        image: image_url.url,
        category: request.body.category
    });
    try {
        let data = await post.save();
        response.status(201).send(data);
    } catch (err) {
        response.status(500).send(err.message);
    }
})

//connection
const client = mongoose.connect("mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`mongoose product connection successfull!!`); }).catch((err) => { console.log(`mongoose product connection error `); })

module.exports = product;
product