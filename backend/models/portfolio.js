const mongoose = require("mongoose");

// creating schema
const portfolioSchema = mongoose.Schema({
    stockId: {
        type: Number,
        required: true,
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    buyQyantity: {
        type: Number,
        required: true,
    },
    buyDate: {
        type: Date,
        default: Date.now,
    },
});

const Portfolio = new mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
