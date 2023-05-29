const mongoose = require("mongoose");
// creating schema
const stockSchema = mongoose.Schema({
    stockName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sector",
    },
});

const Stock = new mongoose.model("Stock", stockSchema);
module.exports = Stock;
