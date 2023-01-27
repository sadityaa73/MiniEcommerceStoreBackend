const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const port = 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));


const product = require("./api/product");

app.use("/api/product", product);

const cart = require("./api/cart");

app.use("/api/cart", cart);

const login = require('./api/signup');

app.use('/api/signup', login);

const userLogin = require("./api/login");

app.use("/api/login", userLogin);

const placeOrder = require("./api/placeOrder");

app.use("/api/placeOrder", placeOrder);

const payment = require("./api/payment");

app.use("/api/payment", payment);

const search = require("./api/search");

app.use("/api/search", search);

app.listen(port, (err) => {
    if (!err) {
        console.log(`express connection successfull at port ${port}!!`);
    } else {
        console.log(`express connection error at port ${port}`);
    }
})