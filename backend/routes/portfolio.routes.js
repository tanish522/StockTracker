const express = require("express");
const router = express.Router();
const {
    insertPortfolio,
    addStockToPortfolio,
} = require("../controller/portfolio.controller");

router.post("/", insertPortfolio);
router.put("/addStock/:id", addStockToPortfolio);

module.exports = router;
