const express = require("express");
const Product = require("../models/productModel");
const { protectRouter, admin } = require("../middleware/authMiddleware");
const { createProducts, updateProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/create-product",protectRouter,admin, createProducts);
router.put("/update-product/:id", protectRouter, admin, updateProduct);

module.exports = router;