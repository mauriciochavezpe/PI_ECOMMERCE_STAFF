import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";

import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/layout/NotFound";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact/>
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
