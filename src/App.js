 
import "./App.css";
import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/layout/NotFound";
import ProductListAdmin from "./components/ProductListAdmin";
import HomeScreen from "./screens/HomeScreen";
import Logout from "./screens/Logout";
import Login from "./screens/Login";
import ChatbotComponet from './components/ChatbotToggle'


function App() {

const [chatbotOpen, setChatbotOpen] = useState(false);
const toggleChatbot = () => {
  console.log("click");
  setChatbotOpen(!chatbotOpen);
};

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact/>
        <Route path="/login" element={<Login />} exact/>
        <Route path="/logout" element={<Logout />} exact/>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/admin/products" element={<ProductListAdmin />} />
      </Routes>
      <ChatbotComponet onToggle={toggleChatbot} isOpen={chatbotOpen}/>
      <Footer />
    </HashRouter>
    
  );
}

export default App;
