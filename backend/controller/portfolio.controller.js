const Portfolio = require("../models/portfolio");

// creating collections using imported models (Stock)

const insertPortfolio = async (req, res) => {
    try {
        // creating Portfolio object for storing document/data
        const body = new Portfolio(req.body);
        const result = await body.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getPortfolio = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Portfolio.find({ UserId: id });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertPortfolio,
    getPortfolio,
};
