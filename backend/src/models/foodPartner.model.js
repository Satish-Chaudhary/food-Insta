const mongoose = require("mongoose");

const foodPartnerRegister = new mongoose.Schema({
    businessName: {
        type: String,
        require: true,
    },
    contactName:{
        type: String,
        require: true,
    },
    phoneNumber:{
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        requuire: true,
    }
}, {
    timestamps: true,
})
const foodPartnerModel = mongoose.model("foodpartner", foodPartnerRegister);

const foodPartnerLogin = new mongoose.Schema({
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
const foodPartnerLoginModel = mongoose.model("foodpartnerlogin", foodPartnerLogin);

module.exports = {
    foodPartnerModel,
    foodPartnerLoginModel,
};