import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

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
      try {
        const response = await fetch("http://localhost:8000/api/v1/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: "", isFirstMessage: true }),
        });

        const data = await response.json();

        setMessages([{ sender: "bot", text: data.response }]);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    try {
      setIsBotTyping(true);
      const response = await fetch("http://localhost:8000/api/v1/chat", {
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

  return (
    <>
      {/* Chatbot Icon */}
      <div className={`chatbot-icon ${isChatOpen ? "open" : ""}`} onClick={toggleChat}>
        <img src="https://www.svgrepo.com/show/310556/bot.svg" alt="bot" width="50" height="50" />
      </div>

      {/* Full Chatbot Container */}
      <div className={`chat-container ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header">
          CartNova Support
          <span className="close-chat" onClick={toggleChat}>X</span>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "bot" ? "bot" : "user"}`}
            >
              {message.text}
            </div>
          ))}

          {/* Typing dots animation */}
          {isBotTyping && (
            <div className="message bot typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}

          <div ref={messagesEndRef} /> {/* For auto scroll */}
        </div>
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
