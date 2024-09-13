import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import data from "../data/produtos.json";
import { CiMenuBurger } from "react-icons/ci"; // Importar o ícone do react-icons
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <footer className="bg-violet-950 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome da Loja */}
        <div className="flex items-center space-x">
          <Link to="/">
            <img src="/assets/img/logo.png" alt="Logo" className="w-25 h-25" />
          </Link>
        </div>

        <div>
          {/* Adicionando o link para a página institucional */}
          <Link
            to="/oprojeto"
            className="text-lg hover:text-gray-300 transition-colors"
          >
            O Projeto
          </Link>
        </div>
        <a href="https://github.com/Gferracioli/LojadoBem"><FaGithub className="text-white w-8 h-8" /></a>
        <a href="https://www.linkedin.com/in/gustavo-ferracioli/"><FaLinkedin className="text-white w-8 h-8" /></a>

        
        
      </div>

      {/* Menu dropdown Hamburguer (Mobile) */}
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
          {/* Adicionando o link para a página institucional no menu dropdown */}
          <Link
            to="/oprojeto"
            onClick={() => setMenuOpen(false)}  // Fecha o menu ao clicar no link
            className="block hover:text-gray-300 transition-colors"
          >
            O Projeto
          </Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
