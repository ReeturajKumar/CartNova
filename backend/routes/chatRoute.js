const express = require('express');
const router = express.Router();

const productInfo = {
  "product1": "Product 1 is a great item for your needs. It costs $25.",
  "product2": "Product 2 is available in various colors. It costs $40."
};

//greet words
const greetings = ['hello', 'hi', 'hey', 'good morning',"how are you" ,'good evening', "what's up"];

// Chatbot POST route
router.post('/', (req, res) => {
  const { query, isFirstMessage } = req.body;

  //first message
  if (isFirstMessage) {
    return res.json({ response: "👋 Welcome to CartNova! Ask me anything about our products." });
  }

  const userMessage = query.toLowerCase();

  //Greet
  if (greetings.some(greeting => userMessage.includes(greeting))) {
    return res.json({ response: "Hello! How can I assist you today?" });
  }

  // 3. Product Search Detection
  if (userMessage.includes("product1")) {
    return res.json({ response: productInfo.product1 });
  }
  if (userMessage.includes("product2")) {
    return res.json({ response: productInfo.product2 });
  }

  return res.json({ response: "I'm sorry, I didn't understand that. Can you ask about our products?" });
});

module.exports = router;
