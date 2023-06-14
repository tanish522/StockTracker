const mongoose = require("mongoose");

// creating schema
const portfolioSchema = mongoose.Schema({
    stocks: [
        {
            stockId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Stock",
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
            profitLoss: {
                type: Number,
                required: true,
            },
        },
    ],

    totalInvestment: {
        type: Number,
    },

    totalPnL: {
        type: Number,
    },
});

const Portfolio = new mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
