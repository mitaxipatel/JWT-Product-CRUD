const mongoose = require("mongoose");

const onedaouser = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        requred: true
    },
    password: {
        type: String,
        requred: true
    },
});

module.exports = mongoose.model("onedaouser", onedaouser);