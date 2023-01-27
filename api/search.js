const express = require('express');
const mongoose = require('mongoose');
const searchModel = require('../modules/searchModel');
const productModel = require("../modules/productModule");
mongoose.set('strictQuery', true);

const searched = express.Router();

//get request

searched.get("/search", async(request, response) => {
    const data = await searchModel.find({});
    try {
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

// post request

searched.post("/search", async(request, response) => {
    const post = await searchModel({
        searchText: request.body.searchText
    });
    const search = await productModel.find({ category: request.body.searchText });
    try {
        if (!search) {
            response.status(301).send("not found");
            return;
        }
        if (search) {
            post.save();
            response.status(200).send(search);
            return;
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//connection 
mongoose.connect("mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("mongoose search connction successfull!!");
}).catch((err) => {
    console.log("mongoose search conneciton error !!");
})

module.exports = searched;