import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/layout/NotFound";
import ProductListAdmin from "./components/ProductListAdmin";
import OrderCreate from "./components/createOrder";
import Myprofile from "./screens/Myprofile";
import HomeScreen from "./screens/HomeScreen";
import Logout from "./screens/Logout";
import Login from "./screens/Login";
import ChatbotComponet from "./components/ChatbotToggle";
import Orders from "./screens/Orders";
import ListConversationGPT from "./components/listConversationGPT";

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const toggleChatbot = () => {
    console.log("click");
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/products" element={<ProductListAdmin />} />
        <Route path="/user/myprofile" element={<Myprofile />} />
        <Route path="/order/myorders" element={<Orders />} />
        <Route path="/order/createOrder" element={<OrderCreate />} />
        <Route path="/chatgpt/conversation" element={<ListConversationGPT />} />
      </Routes>
      <Footer />
      <ChatbotComponet onToggle={toggleChatbot} isOpen={chatbotOpen} />
    </Router>
  );
  // return (
  //   <HashRouter>
  //     <Header />
  //     <Routes>
  //       <Route path="/" element={<HomeScreen />} exact/>
  //       <Route path="/login" element={<Login />} exact/>
  //       <Route path="/logout" element={<Logout />} exact/>
  //       <Route path="/not-found" element={<NotFound />} />
  //       <Route path="/admin/products" element={<ProductListAdmin />} />
  //     </Routes>
  //     <Footer />
  //     <ChatbotComponet onToggle={toggleChatbot} isOpen={chatbotOpen}/>
  //   </HashRouter>

  // );
}

export default App;
