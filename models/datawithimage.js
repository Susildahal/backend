// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String ,
    age: Number,
    address: String,
    imageurl: String,
})

const User = mongoose.model("datawithimahges", userSchema);

module.exports = User;
