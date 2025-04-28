const Cart = require("../models/cartModel");
const Product = require("../models/productModel");


// helper function
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


// Update cart drawer (guest & login user)
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

// Deleting product from cart (guest & login user)
const deleteFromCart = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
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
    cart.products.splice(productIndex, 1);
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


// Display cart drawer products (guest & login user)
const getAllCart = async (req, res) => {
  const { guestId, userId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if(cart) return res.status(200).json(cart);
    else return res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}


// merging guest user cart with login user cart
const mergeCart = async (req, res) => {
  const { guestId} = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if(guestCart){
      if(guestCart.products.length === 0){
        return res.status(404).json({ message: "Guest cart is empty" });
      }

      if(userCart){
        guestCart.products.forEach(async (product) => {
         const productIndex = userCart.products.findIndex((item) => {
          const itemId = item.productId._id ? item.productId._id : item.productId;
          return (
            itemId.toString() === product.productId._id.toString() &&
            item.size === product.size &&
            item.color === product.color
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += product.quantity;
          } else {
            userCart.products.push(product);
          }
        });

        userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await userCart.save();
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.log(error, "Error Deleteing guest Cart");
        }
        return res.status(200).json(userCart);
        });
      } else{
       guestCart.user = req.user._id;
       guestCart.guestId = undefiend;
       await guestCart.save();
       return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "guest Cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


// clear cart (guest & login user)
const clearCart = async (req, res) => {
  const { guestId, userId } = req.body;

  try {
    if (userId) {
      await Cart.findOneAndUpdate(
        { user: userId },
        { products: [] }
      );
    } else if (guestId) {
      await Cart.findOneAndUpdate(
        { guestId },
        { products: [] }
      );
    }
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};



module.exports = {
  addToCart,
  updateCart,
  deleteFromCart,
  getAllCart,
  mergeCart,
  clearCart
};
