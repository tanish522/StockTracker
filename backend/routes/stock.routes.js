const express = require("express");
const router = express.Router();
const { getStocks } = require("../controller/stock.controller");

router.get("/", getStocks);

module.exports = router;
