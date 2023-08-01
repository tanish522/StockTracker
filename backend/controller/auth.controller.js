const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const { insertPortfolio } = require("../controller/portfolio.controller");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const portfolioId = await insertPortfolio();
    const user = await User.create({
        username,
        email,
        password,
        portfolioId,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            portfolioId: portfolioId,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Error Occured! ");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password! ");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    //only the logged in user be able to change its details
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        //send back updated info
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        })

    }
    else {
        res.status(404);
        throw new Error("User Not Found!");
    }
});

module.exports = { registerUser, authUser, updateUserProfile };

