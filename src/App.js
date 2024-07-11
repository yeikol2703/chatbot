import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/logo.svg";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([{ text: "¡Bienvenido! Empieza a chatear.", user: false }]);
  }, []);

  const handleSend = async () => {
    if (input.trim() !== "") {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        question: input,
      });
      setMessages([
        ...messages,
        { text: input, user: true },
        { text: response.data.answer, user: false },
      ]);
      setInput("");
    }
  };

  return (
    <div className="App">
    
   <div>
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
          placeholder="Escribe tu prompt.."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
   </div>
    </div>
  );
}

export default App;
