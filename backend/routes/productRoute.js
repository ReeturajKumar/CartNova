const express = require("express");
const Product = require("../models/productModel");
const { protectRouter, admin } = require("../middleware/authMiddleware");
const { createProducts, updateProduct, deleteProduct, filterProducts, singleProduct, similarProducts, bestSellers, newArrivals } = require("../controllers/productController");

const router = express.Router();

router.post("/create-product",protectRouter,admin, createProducts);
router.put("/update-product/:id", protectRouter, admin, updateProduct);
router.delete("/delete-product/:id", protectRouter,admin, deleteProduct);
router.get("/",filterProducts);
router.get("/best-seller", bestSellers);
router.get("/new-arrival", newArrivals);
router.get("/:id",singleProduct);
router.get("/similar-products/:id",similarProducts);

module.exports = router;