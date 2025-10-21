const { foodPartnerModel, foodPartnerLoginModel } = require("../models/foodPartner.model");
const { userModel, loginModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function foodPartnerMiddleawre(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please Login First",
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token",
        })

    }
}

async function userMiddleawre(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please login First",
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);

        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({
            message: "Invalid token",
        })

    }
}

module.exports = {
    foodPartnerMiddleawre,
    userMiddleawre,
}