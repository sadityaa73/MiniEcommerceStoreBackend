const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const signup = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

signup.pre('save', function(next) {
    if (this.password || this.isModified) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) return next(err)
            this.password = hash;
            next();
        })
    }
});

signup.methods.checkPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
};

const signupModel = new mongoose.model("login", signup);

module.exports = signupModel;