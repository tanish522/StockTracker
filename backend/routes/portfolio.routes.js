const express = require("express");
const router = express.Router();
const {
    insertPortfolio,
    updateStocksInPortfolio,
} = require("../controller/portfolio.controller");

router.post("/", insertPortfolio);
router.put("/updateStock/:id", updateStocksInPortfolio);

module.exports = router;
