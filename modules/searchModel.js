const mongoose = require('mongoose');

const search = mongoose.Schema({
    searchText: {
        type: String,
        required: true
    }
});

const searchModel = new mongoose.model("searchText", search);

module.exports = searchModel;