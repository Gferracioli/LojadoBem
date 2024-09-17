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
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/index";
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration - importado diretamente do passo a passo do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgMdiX9dRu2qMhEVk0W9p8fRwMs0emOzE",
  authDomain: "lojadobem-439b7.firebaseapp.com",
  projectId: "lojadobem-439b7",
  storageBucket: "lojadobem-439b7.appspot.com",
  messagingSenderId: "697033291477",
  appId: "1:697033291477:web:c0824c26723ca75597545c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
          <Route path="/oprojeto" element={<PaginaInstitucional />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </LoadingProvider>
    </CartProvider>
  </BrowserRouter>
);
