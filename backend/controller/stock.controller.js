const Stock = require("../models/stock");

const insertStocks = async (req, res) => {
    try {
        // creating object for document/data;
        // save() - inserting document/data

        const body = new Stock(req.body); // sending body data in json obj format
        const result = await body.save();
        req.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getStocks = async (req, res) => {
    try {
        const result = await Stock.find().populate("sectorId");
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertStocks,
    getStocks,
};
