const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const JWT_SECRET = "Pratish";


//Protects from any unauthorized user to change details
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        try {
            //verifying by removing bearer
            token = req.headers.authorization.split(" ")[1];
            //decoding token
            const decoded = jwt.verify(token, JWT_SECRET);
            //if found we get details other than password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, token failed");
        }
    }
});

module.exports = { protect };