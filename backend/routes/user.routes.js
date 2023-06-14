const express = require("express");
const router = express.Router();
const { insertUser, getUser } = require("../controller/user.controller");

router.get("/", getUser);

router.post("/", insertUser);

module.exports = router;
