const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const login = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});



const loginModel = new mongoose.model("userLogin", login);

module.exports = loginModel;