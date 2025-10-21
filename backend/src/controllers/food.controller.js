const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {

    const uploadFileResult = await uploadFile(req.file.buffer, uuid());
    console.log(req.body);
    

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: uploadFileResult.url,
        foodpartner: req.foodPartner._id,
    })
    console.log(foodItem);
    
    res.status(201).json({
        message: "Food Item Created Successfully",
        food: foodItem
    })
    
}

async function getFoodItems(req, res){
    const foodItems = await foodModel.find();
    res.status(200).json({
        message: "Food Items Fetched Successfully",
        foodItems: foodItems,
    })
}
module.exports = {
    createFood,
    getFoodItems,
}