import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Detalhes from "./pages/detalhes";
import Cart from "./pages/cart";
import { LoadingProvider } from "../src/context/LoadingContex"; // Importa o hook do contexto de Loading
import { CartProvider } from "../src/context/CartContext"; // importa cart
import PaginaInstitucional from "./pages/AboutUs";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <CartProvider>
      <LoadingProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:id" element={<Home />} />
          <Route path="/item/:id" element={<Detalhes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/PaginaInstitucional" element= {<PaginaInstitucional />} />
        </Routes>
      </LoadingProvider>
    </CartProvider>
  </BrowserRouter>
);
