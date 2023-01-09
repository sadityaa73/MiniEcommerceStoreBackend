const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

const port = 4000;

const app = express();
var store = new mongoDBStore({
    uri: "mongodb+srv://aditya:24EF1N9xtddYqOIv@cluster0.olyfynt.mongodb.net/?retryWrites=true&w=majority",
    collection: 'mySessions'
});

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false, maxAge: 60000 }
}));

const product = require("./api/product");

app.use("/api/product", product);

const cart = require("./api/cart");

app.use("/api/cart", cart);

const login = require('./api/signup');

app.use('/api/signup', login);

const userLogin = require("./api/login");

app.use("/api/login", userLogin);
app.listen(port, (err) => {
    if (!err) {
        console.log(`express connection successfull at port ${port}!!`);
    } else {
        console.log(`express connection error at port ${port}`);
    }
})