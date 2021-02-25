const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, minlength: 3, maxlength: 10, lowercase: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 3},
    token: String,
    tokenExpiration: Date
})

const User = mongoose.model("user", userSchema);

module.exports = User; 