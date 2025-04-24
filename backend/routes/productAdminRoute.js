const express = require("express");
const { protectRouter, admin } = require("../middleware/authMiddleware");
const { getAllProducts } = require("../controllers/productAdminController");


const router = express.Router();

router.get("/all-products", protectRouter,admin, getAllProducts)


module.exports = router;