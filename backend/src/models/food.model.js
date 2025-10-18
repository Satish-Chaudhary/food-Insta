const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    video: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    foodpartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner",
        require: true,
    }
})

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;