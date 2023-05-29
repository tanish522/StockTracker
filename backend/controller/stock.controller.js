const Stock = require("../models/stock");

const insertStocks = async () => {
    try {
        // creating object for document/data;
        // save() - inserting document/data

        const s = new Stock({
            stockName: "infy",
            price: 1400,
            sectorId: "647351d1c1dcb35dabc15842",
        });
        const result = await s.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

const getStocks = async () => {
    try {
        const result = await Stock.find().populate("sectorId");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertStocks,
    getStocks,
};
