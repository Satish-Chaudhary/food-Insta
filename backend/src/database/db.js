const mongoose = require("mongoose");
function connectDB() {
    mongoose.connect(process.env.MOBGODB_URL)
        .then(() => {
            console.log("MongoDB connected.");
        })
        .catch((err) => {
            console.log("MongoDB connection error", err);
        })
}
module.exports = connectDB;