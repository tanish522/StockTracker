const mongoose = require("mongoose");

// creating schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
    },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
