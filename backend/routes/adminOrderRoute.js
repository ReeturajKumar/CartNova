const express = require("express");
const { protectRouter, admin } = require("../middleware/authMiddleware");
const { getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/adminOrderController");

const router = express.Router();

router.get("/all-orders",protectRouter,admin, getAllOrders)
router.put("/update-status/:id",protectRouter,admin, updateOrderStatus)
router.delete("/:id",protectRouter,admin, deleteOrder)

module.exports = router;