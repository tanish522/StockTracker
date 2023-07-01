const express = require("express");
const { authUser } = require('../controller/auth.controller')
const router = express.Router();
const { signUp } = require("../controller/user.controller");
const { registerUser } = require("../controller/auth.controller");

//router.post("/sign-up", signUp);

router.route("/").post(registerUser);
router.route("/login").post(authUser);
module.exports = router;
