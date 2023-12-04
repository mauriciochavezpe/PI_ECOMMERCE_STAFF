import React, { useState } from "react";

import Chatbot from "react-chatbot-kit";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import config from "../chatbot/config";
import "react-chatbot-kit/build/main.css";
import "../App.css";
import iconClose from "../images/close.png";
import iconShowBot from "../images/test3.png";

const ChatbotToggle = ({ onToggle, isOpen }) => {
  
  // const [isOpen, setIsOpen] = useState(true);{isOpen ? <button> X</button> : null}*/}
  return (
    <div className="componet-fix">
      {isOpen ? (
        <button className="btn-close-chat" onClick={onToggle}>
          <img src={iconClose} className="btn-close-chat-img" />
        </button>
      ) : null}
      {isOpen ? (<div className="chatbot-boxshadow" >
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          placeholderText='Input placeholder'
        />
      </div>) : null}
      {!isOpen ? (
        <button className="btn-show-chat" onClick={onToggle}>
          <img src={iconShowBot} className="btn-show-chat-show" />
        </button>
      ) : null}
    </div>
  );
};
export default ChatbotToggle;
