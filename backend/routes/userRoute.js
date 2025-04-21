const express = require("express");
const { registerUser, loginUser, userProfile,} = require("../controllers/userController");
const { protectRouter} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protectRouter, userProfile);

module.exports = router;