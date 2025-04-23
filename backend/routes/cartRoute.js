const express = require("express");
const { protectRouter} = require("../middleware/authMiddleware");
const { addToCart, updateCart, deleteFromCart, getAllCart, mergeCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add-cart",addToCart);
router.put("/update-cart", updateCart);
router.delete("/delete-cart", deleteFromCart);
router.get("/all-cart",getAllCart);
router.post("/merge-cart", protectRouter, mergeCart);

module.exports = router;