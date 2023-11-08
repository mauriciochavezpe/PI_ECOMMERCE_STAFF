import logo from "./logo.svg";
import "./App.css";

import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/layout/NotFound";
import ProductListAdmin from "./components/ProductListAdmin";
import HomeScreen from "./screens/HomeScreen";
import {Container ,ToastContainer ,Toast} from 'react-bootstrap';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact/>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/admin/products" element={<ProductListAdmin />} />
      </Routes>
      <Footer />
    </HashRouter>
    
  );
}

export default App;
