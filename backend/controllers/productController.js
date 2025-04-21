const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");

const createProducts = async (req, res) => {
  try {
    const {name,description, price,discountPrice,countInStock,category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku} = req.body;


    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


module.exports = { createProducts }