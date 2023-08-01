const Portfolio = require("../models/portfolio");
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// creating collections using imported models (Stock)

const insertPortfolio = async (req, res) => {
    try {
        // creating Portfolio object for storing document/data
        const body = new Portfolio({});
        const result = await body.save();
        return result._id;
    } catch (error) {
        console.log(error);
    }
};

const updateStocksInPortfolio = async (req, res) => {
    try {
        const body = new Portfolio(req.body);
        const id = req.params.id;
        const filter = { _id: id };
        const result = await Portfolio.findOneAndUpdate(
            filter,
            body,
            { new: true },
            { upsert: true }
        ); // find object with filter, and replace its body
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertPortfolio,
    updateStocksInPortfolio,
};
