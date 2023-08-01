const mongoose = require("mongoose");

// creating schema
const portfolioSchema = mongoose.Schema({
    stocks: [
        {
            stockName: {
                type: String,
                ref: "Stock",
            },
            buyPrice: {
                type: Number,
                required: true,
            },
            buyQuantity: {
                type: Number,
                required: true,
            },
            buyDate: {
                type: Date,
                default: Date.now(),
            },
            profitLoss: {
                type: Number,
            },
        },
    ],
});

const Portfolio = new mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
