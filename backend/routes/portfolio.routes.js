const express = require("express");
const router = express.Router();
const {
    insertPortfolio,
    getPortfolio,
} = require("../controller/portfolio.controller");

router.post("/", insertPortfolio);

router.get("/", getPortfolio);

module.exports = router;
