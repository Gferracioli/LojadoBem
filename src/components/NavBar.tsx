import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import data from "../data/produtos.json";
import { CiMenuBurger } from "react-icons/ci"; // Importar o ícone do react-icons

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-violet-950 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome da Loja */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="/assets/img/logo.png" alt="Logo" className="w-25 h-25" />
          </Link>
          <h1 className="text-2xl font-bold text-white hidden">Loja do Bem</h1>
        </div>

        {/* Menu Hambúrguer */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <CiMenuBurger className="w-8 h-8" /> {/* Ícone de menu hambúrguer */}
          </button>
        </div>

        {/* Links das Categorias */}
        <div className="hidden md:flex space-x-8 text-white">
          {data.categorias.map((categoria) => (
            <Link
              key={categoria.id}
              to={`/categoria/${categoria.id}`}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              {categoria.nome}
            </Link>
          ))}
        </div>

       
        <CartWidget />
      </div>

      {/* Menu dropdown Hamburguer */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-green-500 text-white space-y-2 p-4">
          {data.categorias.map((categoria) => (
            <Link
              key={categoria.id}
              to={`/categoria/${categoria.id}`}
              onClick={() => setMenuOpen(false)}  // Fecha o menu ao clicar em um link
              className="block hover:text-gray-300 transition-colors"
            >
              {categoria.nome}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
