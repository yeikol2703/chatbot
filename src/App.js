import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/logo.svg";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const baseURL = "https://chatbot-yv-0103faf0a110.herokuapp.com/api";
  
  useEffect(() => {
    setMessages([{ text: "¡Bienvenido! Empieza a chatear.", user: false }]);
  }, []);

  const handleSend = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, user: true }]);
      setInput("");
      try {
        const response = await axios.post(`${baseURL}/chatbot`, {
          question: input,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.answer, user: false },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: El servidor no responde. Por favor, inténtalo de nuevo más tarde.", user: false },
        ]);
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Logo" />
        <h1>Chatbot</h1>
      </header>
      
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user ? 'user' : 'bot'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            placeholder="Escribe tu prompt..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
