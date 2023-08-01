const express = require("express");
const { authUser, updateUserProfile } = require('../controller/auth.controller')
const router = express.Router();
const { signUp } = require("../controller/user.controller");
const { registerUser } = require("../controller/auth.controller");
const { protect } = require("../middlewares/authMiddleware");

//router.post("/sign-up", signUp);

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
module.exports = router;
