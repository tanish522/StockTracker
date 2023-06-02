const express = require("express");
const router = express.Router();
const { insertStocks, getStocks } = require("../controller/stock.controller");

router.post("/", insertStocks);

router.get("/", getStocks);

module.exports = router;
