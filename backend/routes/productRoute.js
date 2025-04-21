const express = require("express");
const Product = require("../models/productModel");
const { protectRouter, admin } = require("../middleware/authMiddleware");
const { createProducts } = require("../controllers/productController");

const router = express.Router();

router.post("/create-product",protectRouter,admin, createProducts )

module.exports = router;