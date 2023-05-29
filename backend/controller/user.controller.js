const User = require("../models/user");

const insertUser = async () => {
    try {
        // creating object for document/data;
        // save() - inserting document/data

        const u = new User({
            userName: "tanish",
            email: "tanishp2020@gmail.com",
            password: "tanish123",
            portfolioId: "64720e538305129d2d4fdf5d",
        });
        const result = await u.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

const getUser = async () => {
    try {
        const result = await User.find().populate("portfolioId");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertUser,
    getUser,
};
