const { userModel, loginModel } = require("../models/user.model");
const { foodPartnerModel, foodPartnerLoginModel } = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


// User Authentication APIs controllers
async function registerUser(req, res) {

    const { fullName, email, password} = req.body;

    const isUserAlreayExist = await userModel.findOne({ email });

    if (isUserAlreayExist) {
        return res.status(400).json({
            message: "User Already Exist",
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword,
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        }
    })
}
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token);
    res.status(201).json({
        message: "User login Successfully",
        user: {
            _id: user._id,
            fullname: user.fullName,
            email: user.email,
        }
    })
}
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(201).json({
        message: "User logout Successfully",
    })
}

// Food Partner Authentication APIs controllers

async function foodPartnerRegister(req, res) {
    const { fullName, email, password,contactName,phoneNumber,address  } = req.body;

    const isUserAlreadyexist = await foodPartnerModel.findOne({ email });

    if (isUserAlreadyexist) {
        return res.status(400).json({
            message: "Food PartnerAccount Alreay Exists"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        fullName,
        email,
        password: hashPassword,
        contactName,
        phoneNumber,
        address,
    });

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);
    res.status(201).json({
        message: "User Registered Successfully",
        foodPartner: {
            _id: foodPartner._id,
            fullName: foodPartner.fullName,
            email: foodPartner.email,
        }
    })
}

async function foodPartnerLogin(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid foodPartner email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid foodPartner email or password"
        })
    }
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token);

    res.status(201).json({
        message: "foodPartner login Successfully",
        foodPartner: {
            id: foodPartner._id,
            fullName: foodPartner.fullName,
            email: foodPartner.email,
        }

    })

}
function foodPartnerLogout(req, res) {
    res.clearCookie("token");
    res.status(201).json({
        message: "Food Partner Logout Successfully"
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    foodPartnerRegister,
    foodPartnerLogin,
    foodPartnerLogout,
}