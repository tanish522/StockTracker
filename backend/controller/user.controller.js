const User = require("../models/user");
const { insertPortfolio } = require("../controller/portfolio.controller");
const Portfolio = require("../models/portfolio");

const insertUser = async (req, res) => {
    try {
        const body = User(req.body);
        const result = await body.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getUser = async (req, res) => {
    try {
        const result = await User.find().populate("portfolioId");
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getPortfolioByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.find({ _id: id })
            .populate("portfolioId")
            .select("portfolioId");
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const signUp = async (req, res) => {
    try {
        const portfolioBody = Portfolio({});
        const portfolio = await portfolioBody.save();
        const id = portfolio._id;
        req.body.portfolioId = id; // adding portfolio id as foreign key to user obj
        const body = User(req.body);
        const result = await body.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    insertUser,
    getUser,
    signUp,
    getPortfolioByUserId,
};
