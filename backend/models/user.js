const mongoose = require("mongoose");

// creating schema
const userSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    PortfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
    },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
