const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId }).populate("products.productId");
  } else {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Adding product to cart (guest & login user)
const addToCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ 
          productId, 
          name: product.name, 
          image: product.images[0].url,
          price: product.price,
          quantity, 
          size, 
          color 
        });
      }
    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId : guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            quantity,
            size,
            color,
          },
        ],
        totalPrice: product.price * quantity,
      });
      res.status(200).json(newCart );
      }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update cart (guest & login user)
const updateCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex((item) => {
      const itemId = item.productId._id ? item.productId._id : item.productId;
      return (
        itemId.toString() === productId.toString() &&
        item.size === size &&
        item.color === color
      );
    });
    

    if (productIndex > -1) {
     if (quantity > 0) {
      cart.products[productIndex].quantity = quantity;
      } else {
      cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addToCart,
  updateCart
};
