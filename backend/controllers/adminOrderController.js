const Order = require("../models/orderModel");


// get all orders
const getAllOrders = async (req, res) => {
  try {
    const cart = await Order.find({}).populate("user", "name email");
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
 getAllOrders,
 updateOrderStatus,
 deleteOrder
};