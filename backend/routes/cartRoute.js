const express = require("express");
const { protectRouter} = require("../middleware/authMiddleware");
const { addToCart, updateCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add-to-cart",addToCart);
router.put("/", updateCart)

module.exports = router;