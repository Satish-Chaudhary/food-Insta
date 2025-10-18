const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
    }
}, {
    timestamps: true,
})
const userModel = mongoose.model("user", userSchema);

const loginUser = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
})
const loginModel = mongoose.model("login", loginUser);

module.exports = {
    userModel,
    loginModel
};