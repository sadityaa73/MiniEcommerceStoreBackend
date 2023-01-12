const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const loginModel = require("../modules/loginModel");
const signupModel = require("../modules/signupModel");


mongoose.set('strictQuery', true);

const userlogin = express.Router();

//get request
userlogin.get("/login", async(request, response) => {
    const userlogin = await loginModel.find({});
    try {
        response.status(200).send(userlogin);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//post request
userlogin.post("/login", async(request, response) => {
    console.log("printing request", request.body);
    let hashedPassword = await bcrypt.hash(request.body.password, 10);
    const login = await loginModel({
        username: request.body.username,
        password: hashedPassword
    });
    try {
        let user = await signupModel.findOne({ username: request.body.username });
        console.log("user", user);
        if (!user) {
            response.status(401).send("user not found");
            return
        } else {
            user.checkPassword(request.body.password, (error, result) => {
                if (error) {
                    console.log(`printing error ${error.message} `);
                    return next(error);
                }
                if (result) {
                    console.log("login successfull", result);
                    login.save()
                    response.status(201).send(result);
                } else {
                    console.log("invalid password");
                    let invalid = {
                        resultStatus: result,
                        reason: "password is Invalid"
                    }
                    return response.status(401).send(invalid);
                }
            });
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//connection
const client = mongoose.connect("mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`mongoose login connection successfull!!`); }).catch((err) => { console.log(`mongoose login connection error `); })

module.exports = userlogin;