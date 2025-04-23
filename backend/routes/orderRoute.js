const express = require("express");
const { protectRouter } = require("../middleware/authMiddleware");
const { myOrders, getOrderById } = require("../controllers/orderController");



const router = express.Router();

router.get("/my-orders",protectRouter, myOrders);
router.get("/my-orders/:id",protectRouter, getOrderById);

module.exports = router;