const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', true);
const signupModel = require('../modules/signupModel');
const { response } = require('express');

const signup = express.Router()

//get request:

signup.get("/signup", async(request, response) => {
    const signup = await signupModel.find({});
    try {
        response.status(200).send(signup);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//find user by username:
signup.get("/get_user/:username", async(request, response) => {
        let username = request.params.username;
        const detail = await signupModel.findOne({ username: username });
        try {
            response.status(200).send(detail);
        } catch (error) {
            response.status(500).send(error.message);
        }
    })
    //patch request
signup.patch("/reset/:username", async(request, response) => {
    let username = request.params.username;
    let plainPassword = request.body.password;
    let newPassword = await bcrypt.hash(plainPassword, 10, );
    console.log("newPassword", newPassword);
    const userlogin = await signupModel.findOneAndUpdate(username, { password: newPassword });
    try {
        response.status(200).send(userlogin);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//patch request for address change:
signup.patch("/change_address/:username", async(request, response) => {
    console.log(request.body, request.params);
    let username = request.params.username;
    let newAddress = request.body.address;
    const data = await signupModel.findOneAndUpdate({ username: username }, { address: newAddress });
    try {
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//post request
signup.post("/signup", async(request, response) => {
    const post = await signupModel({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        mobile: request.body.mobile,
        address: request.body.address,
        username: request.body.username,
        password: request.body.password
    });
    try {
        let userCredentials = await post.save();
        response.status(201).send(userCredentials);
    } catch (error) {
        response.status(500).send(error.message);
    }
})





//connection
const client = mongoose.connect("mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`mongoose signup connection successfull!!`); }).catch((err) => { console.log(`mongoose signup connection error `); })


module.exports = signup;