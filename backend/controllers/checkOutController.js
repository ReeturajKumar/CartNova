const CheckOut = require("../models/checkOutModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");


// checkOut session
const createCheckOutSession = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if(!checkoutItems || !shippingAddress || !paymentMethod || !totalPrice) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if(checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in cart" });
  }

  try {
    const newCheckOut = await CheckOut.create({
      user : req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending", 
    })
    console.log(`CheckOut session created for user: ${req.user._id}`);
    res.status(201).json(newCheckOut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

// update checkOut session payment status
const updateCheckOutSession = async (req, res) => {
  const { paymentDetails, paymentStatus } = req.body;
  try {
    const checkOut = await CheckOut.findById(req.params.id);
    if(!checkOut) {
      return res.status(404).json({ message: "CheckOut session not found" });
    }
    if (paymentStatus === "Paid") {
      checkOut.isPaid = true;
      checkOut.paymentStatus = paymentStatus;
      checkOut.paymentDetails = paymentDetails;
      checkOut.paidAt = Date.now();
      await checkOut.save();
      res.status(200).json(checkOut);
    } else {
      res.status(400).json({message: "Invalid payment Status"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


// finalize checkout conver order after payment
const finalizeCheckOutSession = async (req, res) => {
  try {
    const checkout = await CheckOut.findById(req.params.id);
    if(!checkout) {
      return res.status(404).json({ message: "CheckOut session not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
        deliveredAt: checkout.deliveredAt,
      })

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      await Cart.findOneAndDelete ({ user: checkout.user });

      res.status(200).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout not paid or not finalized" });
    }
  }
  catch{
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCheckOutSession,
  updateCheckOutSession,
  finalizeCheckOutSession,
};