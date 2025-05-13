const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// Greet
const greetings = [
  "hello",
  "hi",
  "hey",
  "good morning",
  "how are you",
  "good evening",
  "what's up",
];

const productList = [
  {
    name: "Classic Oxford Button-Down Shirt",
    description:
      "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton...",
    price: 39.99,
    discountPrice: 34.99,
    countInStock: 20,
    sku: "OX-SH-001",
    category: "Top Wear",
    brand: "Urban Threads",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Yellow"],
    material: "Cotton",
  },
  {
    name: "Slim-Fit Stretch Shirt",
    description:
      "A versatile slim-fit shirt perfect for business or evening events...",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 35,
    sku: "SLIM-SH-002",
    category: "Top Wear",
    brand: "Modern Fit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy Blue", "Burgundy"],
    material: "Cotton Blend",
    gender: "Men",
  },
  {
    name: "Casual Denim Shirt",
    description:
      "This casual denim shirt is made from lightweight cotton denim...",
    price: 49.99,
    discountPrice: 44.99,
    countInStock: 15,
    sku: "CAS-DEN-003",
    category: "Top Wear",
    brand: "Street Style",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Light Blue", "Dark Wash"],
    material: "Denim",
    gender: "Men",
  },
  {
    name: "Printed Resort Shirt",
    description:
      "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways...",
    price: 29.99,
    discountPrice: 22.99,
    countInStock: 25,
    sku: "PRNT-RES-004",
    category: "Top Wear",
    brand: "Beach Breeze",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Tropical Print", "Navy Palms"],
    material: "Viscose",
    gender: "Men",
  },
  {
    name: "Slim-Fit Easy-Iron Shirt",
    description:
      "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette...",
    price: 34.99,
    discountPrice: 29.99,
    countInStock: 30,
    sku: "SLIM-EIR-005",
    category: "Top Wear",
    brand: "Urban Chic",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Orange", "Gray"],
    material: "Cotton",
    gender: "Men",
  },
];

let isProductReady = true;
router.post("/", (req, res) => {
  const { query, isFirstMessage } = req.body;
  console.log(query);
  if (isFirstMessage) {
    if (productList.length > 0) {
      const product =
        productList[Math.floor(Math.random() * productList.length)];
      const response = [
        "👋 Welcome to CartNova!",
        "Here's something you might like:",
        `🛍️ *${product.name}*`,
        `💬 ${product.description}`,
        `💰 Price: ₹${product.price}`,
        `🏷️ Brand: ${product.brand}`,
      ].join("\n\n");

      return res.json({ response });
    } else {
      return res.json({
        response: "Sorry, no products available at the moment.",
      });
    }
  }

  const userMessage = query.toLowerCase();

  // Greet detect
  const isGreeting = greetings.some((greeting) => {
    return new RegExp(`\\b${greeting}\\b`).test(userMessage);
  });

  if (isGreeting) {
    return res.json({ response: "Hello! How can I assist you today?" });
  }

  // Track order logic
  if (userMessage.includes("track order")) {
    const randomOrderNumber = Math.floor(Math.random() * 1000000);
    const product = productList[Math.floor(Math.random() * productList.length)];
    const response = [
      `🚚 Your order is being processed.`,
      `Order number: #${randomOrderNumber}`,
      `We are currently shipping: ${product.name}`,
      `🛍️ The product will be delivered within 7 working days.`,
    ].join("\n\n");
    return res.json({ response });
  }

  // Cancel order logic
  if (userMessage.includes("cancel order")) {
    const response = [
      "❌ Are you sure you want to cancel your order?",
      "Please reply with 'Yes' to confirm or 'No' to cancel the request.",
    ].join("\n\n");
    return res.json({ response });
  }

  if (userMessage.includes("yes")) {
    const response = "✅ Your order has been successfully cancelled.";
    return res.json({ response });
  }

  if (userMessage.includes("no")) {
    const response = "🟢 No problem your order is still active.";
    return res.json({ response });
  }

  const keywords = userMessage
    .split(/\W+/)
    .map((word) => word.toLowerCase())
    .filter((word) => word.length > 2); 

  console.log("Extracted keywords:", keywords);

  if (keywords.length > 0) {
    const scoredProducts = productList.map((product) => {
      const searchable = [
        product.name,
        product.description,
        product.brand,
        product.category,
        product.material,
        ...(product.colors || []),
        ...(product.sizes || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchedKeywords = keywords.filter((keyword) =>
        searchable.includes(keyword)
      );

      return {
        product,
        score: matchedKeywords.length,
        matchedKeywords,
      };
    });

    scoredProducts.sort((a, b) => b.score - a.score);
    const bestMatch = scoredProducts.find((p) => p.score > 0);

    if (bestMatch) {
      const { name, description, price, brand, colors, sizes } =
        bestMatch.product;
      console.log("✅ Best matched keywords:", bestMatch.matchedKeywords);

      const response = [
        `*${name}*`,
        description,
        `Price: ₹${price}`,
        `Brand: ${brand}`,
        colors?.length ? `Colors: ${colors.join(", ")}` : "",
        sizes?.length ? `Sizes: ${sizes.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      return res.json({ response });
    }

    if (matchedProduct) {
      const { name, description, price, brand, colors, sizes } = matchedProduct;

      console.log("Matched product:", matchedProduct);

      const response = [
        `*${name}*`,
        description,
        `Price: ₹${price}`,
        `Brand: ${brand}`,
        colors?.length ? `Colors: ${colors.join(", ")}` : "",
        sizes?.length ? `Sizes: ${sizes.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      return res.json({ response });
    }
  }

  // Fallback if no product matched
  return res.json({
    response:
      "I'm sorry, I didn't understand that. Can you ask about our products?",
  });
});

module.exports = router;
