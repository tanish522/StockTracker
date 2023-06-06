const User = require("../models/user");

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

module.exports = {
    insertUser,
    getUser,
};
