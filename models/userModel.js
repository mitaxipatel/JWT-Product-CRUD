const mongoose = require("mongoose");

const onedaouser = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        requred: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        requred: true,
        minlength: [6, 'Password must be at least 6 characters long.'], 
        maxlength: [20, 'Password cannot exceed 20 characters.'], 
    },
});

module.exports = mongoose.model("onedaouser", onedaouser);