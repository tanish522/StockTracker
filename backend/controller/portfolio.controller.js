const Portfolio = require("../models/portfolio");

// creating collections using imported models (Stock)

const insertPortfolio = async () => {
    try {
        // creating object for document/data
        const p1 = new Portfolio({
            stockId: 2,
            buyPrice: 300,
            buyQyantity: 200,
        });
        // save() - inserting document/data
        const result = await p1.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

const getPortfolio = async () => {
    try {
        // running find querry to get data
        const result = await Portfolio.find({ stockId: 1 }).select({
            buyPrice: 1,
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// insertDocument();

module.exports = {
    insertPortfolio,
    getPortfolio,
};
