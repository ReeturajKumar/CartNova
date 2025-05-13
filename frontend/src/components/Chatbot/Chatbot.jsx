import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const toggleChat = async () => {
    setIsChatOpen(!isChatOpen);

    if (!isChatOpen && messages.length === 0) {
      const introMessage = [
        "👋 Hi! I'm your CartNova shopping assistant.",
        "I'm here to help you find the best products and manage your orders.",
      ];

      setMessages([ { sender: "bot", text: introMessage.join("\n\n") } ]);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "How can I help you today? You can ask about our products!" },
        ]);
      }, 1500);
    }
  };

  const handleOptionClick = async (optionText) => {
    const userMessage = { sender: "user", text: optionText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (optionText.toLowerCase() === "cancel order") {
      setShowCancelConfirm(true);
      return;
    }

    try {
      setIsBotTyping(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: optionText }),
      });

      const data = await response.json();

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.response },
        ]);
        setIsBotTyping(false);
      }, 1200);
    } catch (error) {
      console.error("Error sending button message:", error);
      setIsBotTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    if (userInput.toLowerCase() === "what is my last product") {
      const randomProduct = getRandomProduct();
      const response = `
        📦 <strong>Your Last Product:</strong>
        
        <strong>${randomProduct.name}</strong> – A perfect blend of style and comfort.
        
        ✨ <strong>Product Details</strong>:
        - <strong>Description</strong>: ${randomProduct.description}
        - <strong>Price</strong>: ₹${randomProduct.price}
        - <strong>Brand</strong>: ${randomProduct.brand}
    
        Would you like more details or help with your order? 😃
      `;
    
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response },
      ]);
      return;
    }

    try {
      setIsBotTyping(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await response.json();

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.response },
        ]);
        setIsBotTyping(false);
      }, 1200);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsBotTyping(false);
    }
  };

  // Helper function to get a random product
  const getRandomProduct = () => {
    const productList = [
      {
        name: "Classic Oxford Button-Down Shirt",
        description:
          "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton...",
        price: 39.99,
        brand: "Urban Threads",
      },
      {
        name: "Slim-Fit Stretch Shirt",
        description:
          "A versatile slim-fit shirt perfect for business or evening events...",
        price: 29.99,
        brand: "Modern Fit",
      },
      {
        name: "Casual Denim Shirt",
        description:
          "This casual denim shirt is made from lightweight cotton denim...",
        price: 49.99,
        brand: "Street Style",
      },
      {
        name: "Printed Resort Shirt",
        description:
          "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways...",
        price: 29.99,
        brand: "Beach Breeze",
      },
      {
        name: "Slim-Fit Easy-Iron Shirt",
        description:
          "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette...",
        price: 34.99,
        brand: "Urban Chic",
      },
    ];
    return productList[Math.floor(Math.random() * productList.length)];
  };

  const handleConfirmationResponse = (responseText) => {
    const userMessage = { sender: "user", text: responseText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setShowCancelConfirm(false);

    if (responseText.toLowerCase() === "yes") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Your order has been cancelled successfully." },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Your order remains intact." },
      ]);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div
        className={`chatbot-icon ${isChatOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        <img
          src="https://www.svgrepo.com/show/310556/bot.svg"
          alt="bot"
          width="50"
          height="50"
        />
      </div>

      {/* Full Chatbot Container */}
      <div className={`chat-container ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header">
          CartNova Support
          <span className="close-chat" onClick={toggleChat}>
            X
          </span>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "bot" ? "bot" : "user"}`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
          ))}
          {/* Typing dots animation */}
          {isBotTyping && (
            <div className="message bot typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Buttons */}
        <div className="chat-buttons">
          {showCancelConfirm ? (
            <>
              <button
                className="chat-option-button"
                onClick={() => handleConfirmationResponse("yes")}
              >
                Yes
              </button>
              <button
                className="chat-option-button"
                onClick={() => handleConfirmationResponse("no")}
              >
                No
              </button>
            </>
          ) : (
            <>
              <button
                className="chat-option-button"
                onClick={() => handleOptionClick("track order")}
              >
                Track Order
              </button>
              <button
                className="chat-option-button"
                onClick={() => handleOptionClick("cancel order")}
              >
                Cancel Order
              </button>
            </>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Ask me anything about our products!"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 cursor-pointer"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
