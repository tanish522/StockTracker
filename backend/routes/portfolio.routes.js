const express = require("express");
const router = express.Router();
const {
    insertPortfolio,
    getPortfolio,
} = require("../controller/portfolio.controller");

router.post("/", insertPortfolio);

router.get("/:id", getPortfolio);

module.exports = router;
