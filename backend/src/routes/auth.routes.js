const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();


// Users Auth APIs
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// FoodPartner Auth APIs
router.post("/foodpartner/register", authController.foodPartnerRegister);
router.post("/foodpartner/login", authController.foodPartnerLogin);
router.get("/foodpartner/logout", authController.foodPartnerLogout);
router.get("/foodpartner/:id", authController.getFoodPartnerById)

module.exports = router;