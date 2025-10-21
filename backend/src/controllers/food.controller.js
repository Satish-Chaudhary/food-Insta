const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {

    const uploadFileResult = await uploadFile(req.file.buffer, uuid());
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: uploadFileResult.url,
        foodpartner: req.foodpartner._id,
    })
    res.status(201).json({
        message: "Food Item Created Successfully",
        food: foodItem
    })
    
}
module.exports = {
    createFood,
}