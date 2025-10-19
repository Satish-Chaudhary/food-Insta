const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})

// (/) route ka matlab hai ki iske pahale (/api/food) routes prefix hai already.
//  [protected] rakhna hai is route ko kyuki koi normal user fooditems upload na kar paye.

// route setup karne karne ke liye "foodController.createFood" setup karenge.
// route ko protected karne ke liye "foodMiddleware.foodPartnerMiddleawre" setup karenge.

// *Food* /api/food [protected]
router.post("/",authMiddleware.foodPartnerMiddleawre,upload.single("video"),foodController.createFood);


module.exports = router;