const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const products = require("./data/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});

    const createdUsers = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // assign default user ID to products
    const userId = createdUsers._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedData();
