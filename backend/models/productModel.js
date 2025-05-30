const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  sizes: {
    type: [String],
    required: true,
  },
  colors: { 
    type: [String],
    required: true,
  },
  collections: {
    type: [String], // Change this from String to [String] to allow an array of collections
    required: true,
  },
  material: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex"],
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText : {
        type: String,
      }
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },

  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },

  tags: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  dimensions: {
    length:Number,
    width: Number,
    height: Number
  },
  weight: Number,
},{timestamps: true});

module.exports = mongoose.model("Product", productSchema);
