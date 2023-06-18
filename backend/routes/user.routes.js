const express = require("express");
const router = express.Router();
const {
    insertUser,
    getUser,
    getPortfolioByUserId,
} = require("../controller/user.controller");

router.get("/", getUser);

router.post("/", insertUser);

router.get("/:id", getPortfolioByUserId);

module.exports = router;
