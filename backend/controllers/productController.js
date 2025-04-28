const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");


// create product
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


// update product
const updateProduct = async (req, res) => {
  try {
    const {name,description, price,discountPrice,countInStock,category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku} = req.body;

    const product = await Product.findById(req.params.id);
  
    if (product){
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =  isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
  
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


// delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// query and search filter products & all products
const filterProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit
    } = req.query;

    let query = {};
    if(collection && collection.toLocaleLowerCase() !== 'all'){
      query.collection = collection;
    }
    if(material){
      query.material = {$in: material.split(',')};
    }

    if(category){
      query.category = {$in: category.split(',')};
    }

    if(brand){  
      query.brand = {$in: brand.split(',')};
    }

    if(size){
      query.sizes = {$in: size.split(',')};
    }

    if(color){
      query.colors = {$in: [color]};
    }

    if(gender){
      query.gender = gender;
    }

    if(minPrice || maxPrice){
      query.price = {};
      if(minPrice){
        query.price.$gte = Number(minPrice);
      }
      if(maxPrice){
        query.price.$lte = Number(maxPrice);
      }
    }

    if(search){
      query.$or = [
        {name: {$regex: search, $options: 'i'}},
        {description: {$regex: search, $options: 'i'}},
      ]
    }

    let sort = {};
    if(sortBy){
     switch (sortBy) {
      case 'priceAsc':
        sort = {price: 1};
        break;
      case 'priceDesc':
        sort = {price: -1};
        break;
      case 'popularity':
       sort = {rating: -1};
        break;
      default:
        break;
     }
    }

    const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }); 
  }
}


// Best Seller products
const bestSellers = async (req, res) => {
  try {
    const product = await Product.findOne().sort({ rating: -1 });

    if (product) {
      if (!Array.isArray(product.images)) {
        product.images = [];
      }
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Best Sellers not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};



// New Arrivals products
const newArrivals = async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
      res.status(200).json(newArrivals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// Single product
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


// Similar products
const similarProducts = async (req, res) => {
  const {id} = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
      gender: product.gender,
    }).limit(4);

    res.status(200).json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


// adding reviews and rating to product
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// fetching review
// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;

    // Assuming you have a Product model with reviews embedded
    const product = await Product.findById(productId).select('reviews');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { createProducts, updateProduct, deleteProduct,filterProducts, singleProduct, similarProducts, bestSellers, newArrivals, createProductReview, getProductReviews };